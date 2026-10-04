import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, readFile, readdir, symlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { request } from 'node:http';
import { WorkbenchService } from '../src/server/service.js';
import { startWorkbench } from '../src/server/http.js';
import type { Rule } from '../src/core/types.js';

async function fixture() {
  const root=await mkdtemp(path.join(tmpdir(),'design-workbench-'));
  return {root,service:await WorkbenchService.create(root)};
}
test('browser decisions persist across restart and save the exact accepted pack once',async()=>{
  const {root,service}=await fixture();const work=await service.create('소개와 문의');
  const selected=await service.select(work.session.id,0,'editorial');
  assert.equal(selected.session.rules[0]!.status,'proposed');
  const restarted=await WorkbenchService.create(root);
  assert.deepEqual(await restarted.sessions.read(work.session.id),selected);
  const saved=await restarted.save(work.session.id,1);
  assert.ok(saved.saved); assert.equal(saved.session.acceptances.length,1);
  assert.deepEqual((await restarted.save(work.session.id,1)).saved,saved.saved);
  assert.equal((await readdir(path.join(root,'packs',saved.saved!.id))).filter(item=>/^v/.test(item)).length,1);
  const imported=await restarted.import(saved);
  assert.equal(imported.saved,null);assert.equal(imported.publication,null);
  assert.equal(imported.session.acceptances.length,0);assert.equal(imported.session.rules[0]!.status,'proposed');
});
test('feedback handoff cannot be confused with AI reflection or user acceptance',async()=>{
  const {root,service}=await fixture();const work=await service.create('소개');
  await service.select(work.session.id,0,'workspace');
  const feedback=await service.feedback(work.session.id,1,'조금 더 넓은 여백으로');
  assert.equal(service.view(feedback).pendingFeedbackIds.length,1);
  await assert.rejects(service.save(work.session.id,2),/피드백/);
  const handoff=JSON.parse(await readFile(path.join(root,'handoffs',`${work.session.id}.json`),'utf8'));
  assert.equal(handoff.expectedRevision,2);assert.equal(handoff.pendingFeedbackIds.length,1);
  const input={sessionId:work.session.id,expectedRevision:2,selected:'workspace' as const,feedbackIds:handoff.pendingFeedbackIds,
    rules:feedback.session.rules,tokens:feedback.draft.tokens};
  await assert.rejects(service.submit({...input,rules:input.rules.map(rule=>({...rule,status:'accepted'}))}),/only submit proposed/);
  await assert.rejects(service.submit({...input,feedbackIds:[]}),/피드백 목록/);
  const proposed=await service.submit(input);
  assert.equal(proposed.session.revision,3);assert.equal(service.view(proposed).pendingFeedbackIds.length,0);
  assert.equal(proposed.session.rules[0]!.status,'proposed');assert.ok(proposed.lastSubmission);
  await assert.rejects(service.submit(input),/화면이 갱신/);
  await assert.rejects(service.save(work.session.id,2),/최신 규칙/);
  assert.ok((await service.save(work.session.id,3)).saved);
});
test('conflict answers preserve evidence and suppressed proposals stay out of the personal pack',async()=>{
  const {service}=await fixture();const work=await service.create('소개');
  await service.select(work.session.id,0,'editorial');const feedback=await service.feedback(work.session.id,1,'짧은 글 위주');
  const first=feedback.session.rules[0]!;
  const other:Rule={...first,id:'opposite-layout',statement:'정보를 나눠 보여준다.',effect:{key:first.effect.key,value:'workspace'}};
  const submitted=await service.submit({sessionId:work.session.id,expectedRevision:2,feedbackIds:feedback.session.feedback.map(item=>item.id),selected:'editorial',rules:[first,other],tokens:feedback.draft.tokens});
  const conflict=service.view(submitted).conflicts[0]!;
  await assert.rejects(service.save(work.session.id,3),/충돌/);
  const resolved=await service.conflict(work.session.id,3,conflict.id,first.id);
  assert.equal(service.view(resolved).conflicts.length,0);assert.equal(resolved.session.answers[0]!.scope,'pack-change');
  const saved=await service.save(work.session.id,4);const pack=await service.packs.read(saved.saved!.id,1);
  assert.deepEqual(pack.rules.map(rule=>rule.id),[first.id]);
  assert.equal(saved.session.rules.find(rule=>rule.id===other.id)!.status,'proposed');
});
test('concurrent feedback and interrupted publication preserve a single accepted version',async()=>{
  const {service}=await fixture();const work=await service.create('소개');await service.select(work.session.id,0,'editorial');
  const outcomes=await Promise.allSettled([service.feedback(work.session.id,1,'여백'),service.feedback(work.session.id,1,'제목')]);
  assert.equal(outcomes.filter(item=>item.status==='fulfilled').length,1);
  const fresh=await service.create('재시도');await service.select(fresh.session.id,0,'editorial');
  const original=service.packs.save.bind(service.packs);let fail=true;
  service.packs.save=async options=>{if(fail){fail=false;throw Error('Disk temporarily unavailable');}return original(options);};
  await assert.rejects(service.save(fresh.session.id,1),/Disk/);
  const interrupted=await service.sessions.read(fresh.session.id);
  assert.ok(interrupted.publication);assert.equal(interrupted.session.acceptances.length,1);
  const saved=await service.save(fresh.session.id,interrupted.session.revision);
  assert.ok(saved.saved);assert.equal(saved.session.acceptances.length,1);
});
test('missing reads do not create phantom sessions and managed junctions are rejected',async()=>{
  const {root,service}=await fixture();
  await assert.rejects(service.sessions.read('session-missing'));assert.deepEqual(await service.sessions.list(),[]);
  await assert.rejects(service.sessions.read('../escape'));
  const outside=await mkdtemp(path.join(tmpdir(),'design-outside-'));
  await symlink(outside,path.join(root,'sessions','session-linked'),process.platform==='win32'?'junction':'dir');
  await assert.rejects(service.sessions.read('session-linked'),/link/);
  assert.deepEqual(await readdir(outside),[]);
});
test('local HTTP validates Host, cookies, Origin, request fields, preview isolation and export access',async()=>{
  const root=await mkdtemp(path.join(tmpdir(),'design-http-'));
  const app=await startWorkbench({root,port:0,previewPort:0,vite:false});
  try {
    assert.equal((await fetch(`${app.origin}/api/sessions`)).status,401);
    const boot=await fetch(app.origin);const cookie=boot.headers.get('set-cookie')!.split(';')[0]!;
    const headers={Cookie:cookie,Origin:app.origin,'X-Workbench':'1','Content-Type':'application/json'};
    const wrongHost=await new Promise<number>(resolve=>{const req=request(`${app.origin}/api/sessions`,{headers:{Cookie:cookie,Host:'evil.example'}},res=>{res.resume();resolve(res.statusCode!);});req.end();});
    assert.equal(wrongHost,403);
    assert.equal((await fetch(`${app.origin}/api/sessions`,{method:'POST',headers:{...headers,Origin:'https://evil.example'},body:JSON.stringify({purpose:'소개'})})).status,403);
    assert.equal((await fetch(`${app.origin}/api/sessions`,{method:'POST',headers,body:JSON.stringify({purpose:'소개',actor:'user'})})).status,409);
    const created=await (await fetch(`${app.origin}/api/sessions`,{method:'POST',headers,body:JSON.stringify({purpose:'<script>alert(1)</script>'})})).json();
    const view=await (await fetch(`${app.origin}/api/sessions/${created.session.id}`,{headers:{Cookie:cookie}})).json();
    const preview=await fetch(`${app.previewOrigin}/preview/${created.session.id}/editorial?token=${view.previewToken}`);
    assert.equal(preview.status,200);assert.match(preview.headers.get('content-security-policy')!,/default-src 'none'/);
    assert.match(await preview.text(),/&lt;script&gt;/);
    assert.equal((await fetch(`${app.previewOrigin}/preview/${created.session.id}/editorial`)).status,403);
    assert.equal((await fetch(`${app.origin}/api/sessions/${created.session.id}/export`)).status,401);
    assert.equal((await fetch(`${app.origin}/api/sessions/${created.session.id}/export`,{headers:{Cookie:cookie}})).status,200);
    await writeFile(path.join(root,'sessions',created.session.id,'r0.json'),'{}');
    assert.equal((await fetch(`${app.origin}/api/sessions/${created.session.id}`,{headers:{Cookie:cookie}})).status,409);
  } finally {await app.close();}
});
