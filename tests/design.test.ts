import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp,readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { WorkbenchService } from '../src/server/service.js';
import { directionRule } from '../src/server/model.js';
import { profileTokens,referenceRule } from '../src/design/library.js';
import { referenceCandidate } from '../src/design/render.js';
import { screenHtml,snapshot,validateSnapshot } from '../src/server/screens.js';

test('reference proposals preserve provenance in the pack and handoff without accepting a user preference',async()=>{
  const service=await WorkbenchService.create(await mkdtemp(path.join(tmpdir(),'design-reference-')));
  const work=await service.create('소개');
  const generated=await service.submit({sessionId:work.session.id,expectedRevision:0,feedbackIds:[],selected:'workspace',libraryProfile:'workspace',
    rules:[referenceRule(directionRule('workspace'),'workspace')],tokens:profileTokens('workspace'),screens:[referenceCandidate('workspace','소개')],reason:'참고 기반 제안'});
  assert.equal(generated.selected,null);assert.equal(generated.session.acceptances.length,0);
  assert.equal(generated.draft.sources.find(source=>source.id==='refero-workspace')!.adopted,true);
  assert.equal(generated.draft.sources.find(source=>source.id==='mobbin-patterns')!.adopted,false);
  const handoff=JSON.parse(await readFile(path.join(service.sessions.root,'handoffs',`${work.session.id}.json`),'utf8'));
  assert.equal(handoff.rendererVersion,'blocks-2.0');assert.equal(handoff.library.guidance.pattern.origin,'locally-authored');
  assert.ok(handoff.library.supportedTokens.includes('text.secondary'));
});
test('legacy renderer and snapshot hashes survive validation and import',async()=>{
  const service=await WorkbenchService.create(await mkdtemp(path.join(tmpdir(),'design-legacy-')));
  const work=await service.create('소개');
  work.session.revision=1;work.draft.rules=[directionRule('editorial')];work.session.rules=work.draft.rules;
  const old=snapshot(referenceCandidate('editorial','소개'),work.draft,1,'이전 제안','blocks-1.0');work.generation.history=[old];
  assert.deepEqual(validateSnapshot(old,work.draft),old);
  assert.match(screenHtml(old),/Arial/);assert.doesNotMatch(screenHtml(old),/PretendardVariable/);
  const imported=await service.import(work);assert.equal(imported.generation.history[0]!.rendererVersion,'blocks-1.0');
  assert.doesNotMatch(screenHtml(imported.generation.history[0]!),/PretendardVariable/);
});
