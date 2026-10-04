import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { WorkbenchService } from '../src/server/service.js';
import { directionRule } from '../src/server/model.js';
import { validateBinding } from '../src/core/index.js';
import type { Screen } from '../src/server/screens.js';
import type { WorkSession } from '../src/server/model.js';

const screen:Screen={direction:'editorial',eyebrow:'EXAMPLE',title:'소개 페이지',summary:'목적과 내용을 설명합니다.',action:'연락 안내',sections:[{id:'work',layout:'text',title:'작업 소개',body:'작업을 설명합니다.',items:[]}]};
async function fixture() {
  const root=await mkdtemp(path.join(tmpdir(),'design-changes-'));const service=await WorkbenchService.create(root);
  const source=await service.create('서비스 소개');await service.select(source.session.id,0,'editorial');
  const saved=await service.save(source.session.id,1);const pack=await service.packs.read(saved.saved!.id,1);
  let project=await service.reuse(source.session.id,'포트폴리오');
  project=await service.submit({sessionId:project.session.id,expectedRevision:0,feedbackIds:[],selected:'editorial',rules:project.draft.rules,tokens:project.draft.tokens,screens:[screen],reason:'기존 스타일로 작업을 소개합니다.'});
  project=await service.select(project.session.id,1,'editorial');
  project=await service.feedback(project.session.id,2,'정보를 빠르게 훑도록 배치를 바꾸고 싶습니다.');
  return {root,service,source,saved,pack,project};
}
function proposal(work:WorkSession) {
  const rule={...directionRule('workspace'),origin:{type:'user-feedback' as const,referenceId:work.session.feedback.at(-1)!.id}};
  return {sessionId:work.session.id,expectedRevision:work.session.revision,feedbackIds:[work.session.feedback.at(-1)!.id],selected:'workspace' as const,rules:[rule],
    tokens:work.draft.tokens.map(token=>({...token,value:token.kind==='color'?'#334455':token.kind==='dimension'?'24px':token.value})),screens:[{...screen,direction:'workspace' as const}],reason:'빠르게 훑는 배치와 좁은 간격으로 변경합니다. 기존 읽기 중심 규칙과 달라 적용 범위 선택이 필요합니다.'};
}
test('agent change remains unapplied until an exact revision and proposal-bound user scope decision',async()=>{
  const {service,project,pack}=await fixture();const changed=await service.submit(proposal(project));
  assert.deepEqual(changed.draft,project.draft);assert.equal(changed.selected,'editorial');assert.equal(changed.generation.history.length,1);
  assert.equal(changed.generation.change!.status,'proposed');assert.equal(service.view(changed).pendingFeedbackIds.length,1);
  await assert.rejects(service.save(project.session.id,4),/변경 범위/);
  await assert.rejects(service.decideChange(project.session.id,3,changed.generation.change!.proposal.id,'project-exception'),/갱신/);
  await assert.rejects(service.decideChange(project.session.id,4,'change-stale','project-exception'),/최신 변경/);
  const kept=await service.decideChange(project.session.id,4,changed.generation.change!.proposal.id,'keep');
  assert.equal(kept.generation.change!.status,'rejected');assert.deepEqual(kept.draft,project.draft);
  assert.deepEqual(await service.packs.read(pack.id,1),pack);assert.equal(service.view(kept).pendingFeedbackIds.length,0);
});
test('project exception is scoped, reviewed and accepted without changing any personal pack version',async()=>{
  const {service,project,pack}=await fixture();const changed=await service.submit(proposal(project));
  const scoped=await service.decideChange(project.session.id,4,changed.generation.change!.proposal.id,'project-exception');
  assert.equal(scoped.selected,'workspace');assert.equal(scoped.generation.accepted,false);assert.equal(scoped.generation.history.length,2);
  const accepted=await service.save(project.session.id,5);
  assert.equal(accepted.generation.change!.status,'accepted');assert.equal(accepted.generation.accepted,true);assert.equal(accepted.saved,null);
  assert.equal(accepted.generation.binding!.packHash,pack.hash);assert.equal(accepted.generation.binding!.overrides[0]!.scope,'project');
  assert.equal(accepted.generation.binding!.answers[0]!.scope,'project-exception');
  validateBinding(accepted.generation.binding,pack);assert.deepEqual(await service.packs.read(pack.id,1),pack);
  const revised=await service.revise(project.session.id);assert.notEqual(revised.session.id,project.session.id);
  assert.equal(revised.generation.accepted,false);assert.equal(revised.session.acceptances.length,0);assert.equal(revised.selected,'workspace');
  assert.deepEqual(revised.draft.tokens,accepted.draft.tokens);assert.equal((await service.sessions.read(project.session.id)).generation.accepted,true);
});
test('personal change publishes a new version only after screen acceptance and leaves existing projects pinned',async()=>{
  const {service,source,project,pack}=await fixture();const sibling=await service.reuse(source.session.id,'다른 소개 페이지');
  const changed=await service.submit(proposal(project));
  const scoped=await service.decideChange(project.session.id,4,changed.generation.change!.proposal.id,'pack-change');
  assert.equal(scoped.generation.binding,null);assert.equal(scoped.saved,null);assert.deepEqual(await service.packs.read(pack.id,1),pack);
  const accepted=await service.save(project.session.id,5);assert.equal(accepted.saved!.id,pack.id);assert.equal(accepted.saved!.version,2);
  const second=await service.packs.read(pack.id,2);assert.equal(second.parentHash,pack.hash);assert.equal(second.rules[0]!.effect.value,'workspace');
  assert.deepEqual(await service.packs.read(pack.id,1),pack);assert.equal((await service.sessions.read(sibling.session.id)).generation.binding!.packVersion,1);
  assert.deepEqual((await service.save(project.session.id,5)).saved,accepted.saved);
});
test('cancelling a scoped change restores exact style, selection and preview without publishing',async()=>{
  const {root,service,project,pack}=await fixture();const changed=await service.submit(proposal(project));
  await service.decideChange(project.session.id,4,changed.generation.change!.proposal.id,'pack-change');
  const restored=await service.cancelChange(project.session.id,5);
  assert.equal(restored.generation.change!.decision!.revision,6);
  assert.deepEqual(restored.draft,project.draft);assert.equal(restored.selected,'editorial');assert.equal(restored.generation.history.length,1);
  assert.equal(restored.generation.change!.status,'rejected');assert.equal(restored.generation.binding!.packHash,pack.hash);
  const restarted=await WorkbenchService.create(root);assert.deepEqual((await restarted.sessions.read(project.session.id)).draft,project.draft);
});
test('failed personal publication retries the same user acceptance',async()=>{
  const {service,project,pack}=await fixture();const changed=await service.submit(proposal(project));
  await service.decideChange(project.session.id,4,changed.generation.change!.proposal.id,'pack-change');
  const original=service.packs.save.bind(service.packs);let fail=true;
  service.packs.save=async input=>{if(fail){fail=false;throw Error('Temporary disk failure');}return original(input);};
  await assert.rejects(service.save(project.session.id,5),/Temporary/);
  const pending=await service.sessions.read(project.session.id);assert.ok(pending.publication);assert.equal(pending.session.acceptances.length,1);
  const saved=await service.save(project.session.id,pending.session.revision);assert.equal(saved.saved!.version,2);assert.equal(saved.session.acceptances.length,1);
  assert.deepEqual(await service.packs.read(pack.id,1),pack);
});
test('a stale base asks for a new discussion before accepting or publishing another personal version',async()=>{
  const {service,source,project,pack}=await fixture();
  let sibling=await service.reuse(source.session.id,'다른 프로젝트');
  await service.submit({sessionId:sibling.session.id,expectedRevision:0,feedbackIds:[],selected:'editorial',rules:sibling.draft.rules,tokens:sibling.draft.tokens,screens:[screen],reason:'기존 팩을 사용합니다.'});
  await service.select(sibling.session.id,1,'editorial');sibling=await service.feedback(sibling.session.id,2,'배치를 바꿉니다.');
  const first=await service.submit(proposal(project));const second=await service.submit(proposal(sibling));
  await service.decideChange(project.session.id,4,first.generation.change!.proposal.id,'pack-change');await service.save(project.session.id,5);
  await assert.rejects(service.decideChange(sibling.session.id,4,second.generation.change!.proposal.id,'pack-change'),/새 버전/);
  const unchanged=await service.sessions.read(sibling.session.id);assert.equal(unchanged.generation.change!.status,'proposed');assert.equal(unchanged.session.acceptances.length,0);
  assert.equal((await service.packs.latest(pack.id)).version,2);assert.deepEqual(await service.packs.read(pack.id,1),pack);
  const scoped=await service.decideChange(sibling.session.id,4,second.generation.change!.proposal.id,'project-exception');assert.equal(scoped.generation.binding!.packVersion,1);
});
test('token-only changes do not describe proposal status as a design rule change',async()=>{
  const {service,project}=await fixture();const input=proposal(project);
  const changed=await service.submit({...input,selected:'editorial',rules:project.draft.rules,screens:[screen]});
  assert.deepEqual(changed.generation.change!.proposal.changedPaths,['tokens']);
});
