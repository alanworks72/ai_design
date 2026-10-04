import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { WorkbenchService } from '../src/server/service.js';
import { directionRule, validateWork } from '../src/server/model.js';
import { screenHtml, validateScreen } from '../src/server/screens.js';
import type { Screen } from '../src/server/screens.js';

export const sampleScreen:Screen={direction:'editorial',title:'작업을 소개하는 페이지',eyebrow:'WORK / ABOUT',summary:'관심 있는 방문자가 작업을 이해하도록 돕습니다.',action:'연락 방법 보기',sections:[{id:'work',layout:'cards',title:'대표 작업',body:'해결한 문제와 과정을 소개합니다.',items:[{title:'첫 번째 작업',body:'목적과 기여 내용을 정리합니다.'}]}]};
async function setup(){return WorkbenchService.create(await mkdtemp(path.join(tmpdir(),'design-screens-')));}
function input(id:string,revision:number){return {sessionId:id,expectedRevision:revision,selected:'editorial' as const,feedbackIds:[],rules:[directionRule('editorial')],tokens:[{id:'text.primary',kind:'color' as const,value:'#123456',ruleIds:['layout-direction']}],screens:[sampleScreen],reason:'큰 제목과 작업 목록으로 목적을 설명합니다.'};}

test('generated screen is rendered with tokens without fabricating a user choice or acceptance',async()=>{
  const service=await setup();const work=await service.create('소개');
  const generated=await service.submit(input(work.session.id,0));
  assert.equal(generated.selected,null);assert.equal(generated.session.acceptances.length,0);
  assert.match(screenHtml(generated.generation.history[0]!),/--text-primary:#123456/);
  assert.match(screenHtml(generated.generation.history[0]!),/대표 작업/);
  await assert.rejects(service.save(work.session.id,1),/후보 선택/);
  const selected=await service.select(work.session.id,1,'editorial');
  assert.equal(selected.draft.tokens[0]!.value,'#123456');
  assert.ok((await service.save(work.session.id,2)).saved);
});
test('screen contract rejects executable fields and preserves escaped content and evidence hashes',async()=>{
  assert.throws(()=>validateScreen({...sampleScreen,script:'alert(1)'}),/fields/);
  assert.throws(()=>validateScreen({...sampleScreen,sections:[...sampleScreen.sections,...sampleScreen.sections]}),/identifier/);
  const service=await setup();const work=await service.create('소개');
  await assert.rejects(service.submit({...input(work.session.id,0),tokens:[{id:'text.primary',kind:'dimension',value:'12px',ruleIds:['layout-direction']}]}),/token kind mismatch/);
  const generated=await service.submit({...input(work.session.id,0),screens:[{...sampleScreen,title:'<script>"hello"</script>'}]});
  assert.match(screenHtml(generated.generation.history[0]!),/&lt;script&gt;/);
  generated.generation.history[0]!.screen.title='변조';
  assert.throws(()=>validateWork(generated),/hash mismatch/);
});
test('revisions preserve before and after screens and stale or direction-changing agent responses fail',async()=>{
  const service=await setup();const work=await service.create('소개');
  await service.submit(input(work.session.id,0));await service.select(work.session.id,1,'editorial');
  const feedback=await service.feedback(work.session.id,2,'제목을 더 구체적으로');
  const update={...input(work.session.id,3),feedbackIds:feedback.session.feedback.map(item=>item.id),screens:[{...sampleScreen,title:'대표 작업과 경험을 소개합니다.'}]};
  await assert.rejects(service.submit({...update,selected:'workspace'}),/선택을 변경/);
  const revised=await service.submit(update);
  assert.equal(revised.generation.history.length,2);assert.equal(revised.generation.history[0]!.screen.title,sampleScreen.title);
  await assert.rejects(service.submit(update),/갱신/);
  const imported=await service.import(await service.save(work.session.id,4));
  assert.equal(imported.session.acceptances.length,0);assert.equal(imported.generation.history[0]!.rules[0]!.status,'proposed');
});
test('rule-only updates cannot accept an outdated generated screen',async()=>{
  const service=await setup();const work=await service.create('소개');await service.submit(input(work.session.id,0));await service.select(work.session.id,1,'editorial');
  const feedback=await service.feedback(work.session.id,2,'글자 색 변경');
  const {screens,reason,...rulesOnly}=input(work.session.id,3);
  await service.submit({...rulesOnly,feedbackIds:feedback.session.feedback.map(item=>item.id),tokens:[{...rulesOnly.tokens[0]!,value:'#abcdef'}]});
  await assert.rejects(service.save(work.session.id,4),/최신 규칙을 적용한 화면/);
});
test('reuse pins the pack and persists project acceptance without publishing a new personal version',async()=>{
  const service=await setup();const work=await service.create('서비스');await service.submit(input(work.session.id,0));await service.select(work.session.id,1,'editorial');
  const saved=await service.save(work.session.id,2);const packBefore=await service.packs.read(saved.saved!.id,1);
  const project=await service.reuse(work.session.id,'개인 포트폴리오');
  assert.equal(project.generation.binding!.packHash,packBefore.hash);
  const submission={...input(project.session.id,0),rules:project.draft.rules,tokens:project.draft.tokens};
  const {screens,reason,...ruleOnly}=submission;
  await assert.rejects(service.submit({...ruleOnly,tokens:[{...submission.tokens[0]!,value:'#ffffff'}]}),/피드백 목록/);
  await service.submit(submission);await service.select(project.session.id,1,'editorial');
  const accepted=await service.save(project.session.id,2);
  assert.equal(accepted.generation.accepted,true);assert.equal(accepted.saved,null);
  assert.deepEqual(await service.packs.read(saved.saved!.id,1),packBefore);
  assert.equal((await service.sessions.read(project.session.id)).generation.accepted,true);
  await assert.rejects(service.feedback(project.session.id,3,'새 요청'),/변경할 수 없/);
});
test('legacy sessions remain readable with empty generation state',async()=>{
  const service=await setup();const work=await service.create('기존 협의');
  const {generation,...legacy}=work;
  assert.deepEqual(validateWork(legacy).generation,{history:[],binding:null,accepted:false,change:null});
});

test('screen submission preserves the rule chosen in a conflict instead of silently replacing it',async()=>{
  const service=await setup();const work=await service.create('소개');await service.select(work.session.id,0,'editorial');
  const feedback=await service.feedback(work.session.id,1,'레이아웃을 다시 확인');
  const base=directionRule('editorial');const opposite={...base,id:'other-layout',effect:{key:base.effect.key,value:'workspace'}};
  await service.submit({sessionId:work.session.id,expectedRevision:2,selected:'editorial',feedbackIds:feedback.session.feedback.map(item=>item.id),rules:[base,opposite],tokens:[]});
  const current=await service.sessions.read(work.session.id);const conflict=service.view(current).conflicts[0]!;
  await service.conflict(work.session.id,3,conflict.id,base.id);
  await assert.rejects(service.submit({...input(work.session.id,4),rules:[{...base,statement:'다른 해석으로 대체'}]}),/선택한 규칙/);
  const generated=await service.submit(input(work.session.id,4));
  assert.equal(generated.generation.history.length,1);assert.equal(generated.session.rules[0]!.id,base.id);
});
