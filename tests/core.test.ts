import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, readFile, readdir, writeFile, symlink } from 'node:fs/promises';
import path from 'node:path';
import { tmpdir } from 'node:os';
import {
  acceptRules, answerConflict, contentHash, ContractError, detectConflicts, PackStore, parseContract, proposeChange,
  resolveRules, validateBinding, validateDraft, validateSession, WorkspaceBusyError,
} from '../src/core/index.js';
import type { ConflictAnswer, Rule } from '../src/core/types.js';
import { acceptedFixture, baseRule, brief, makeDraft, makeSession } from '../examples/fixtures.js';

async function storage() { return PackStore.create(await mkdtemp(path.join(tmpdir(), 'ai-design-test-'))); }
function contrastingRule(): Rule { return { ...baseRule, id: 'reference-motion', origin: { type: 'framework-reference', referenceId: 'refero-direction' },
  effect: { key: 'motion.decorative', value: true }, statement: '장식 모션을 적용한다.' }; }
function answerFor(rules: Rule[]): ConflictAnswer {
  const conflict = detectConflicts(rules, brief.id)[0]!;
  return { id: 'answer-one', actor: 'user', conflictId: conflict.id, projectId: brief.id,
    leftHash: conflict.leftHash, rightHash: conflict.rightHash, selectedRuleId: baseRule.id,
    scope: 'project-exception', explanation: '사용자 요청 유지' };
}

test('JSON contracts reject unknown fields and unsupported schema versions without coercion', () => {
  assert.throws(() => validateDraft({ ...makeDraft(), schemaVersion: '9.0' }), ContractError);
  assert.throws(() => validateDraft({ ...makeDraft(), secret: 'not-allowed' }), ContractError);
  assert.throws(() => parseContract('session', { ...makeSession(), revision: '0' }), ContractError);
});
test('missing references, duplicate ids and CSS injection/collisions are rejected', () => {
  const draft = makeDraft(); draft.tokens[0]!.ruleIds = ['missing'];
  assert.throws(() => validateDraft(draft), /Missing token rule/);
  draft.tokens[0]!.ruleIds = []; draft.tokens[0]!.value = '#fff; } body { display:none';
  assert.throws(() => validateDraft(draft), /Unsupported color/);
  const collision = makeDraft(); collision.tokens.push({ ...collision.tokens[0]!, id: 'text-primary' });
  assert.throws(() => validateDraft(collision), /CSS token collision/);
  const duplicate = makeDraft(); duplicate.rules.push(duplicate.rules[0]!);
  assert.throws(() => validateDraft(duplicate), /Duplicate rules/);
});
test('AI cannot mark rules accepted without a matching user decision', () => {
  const session = makeSession(); session.rules[0]!.status = 'accepted';
  assert.throws(() => validateSession(session), /lacks user decision/);
});
test('acceptance is revision-bound and an accepted rule cannot be silently rewritten', () => {
  assert.throws(() => acceptRules(makeSession(), 1, ['quiet-motion'], 'decision-one'), /Stale session/);
  const session = acceptRules(makeSession(), 0, ['quiet-motion'], 'decision-one');
  session.rules[0]!.statement = '수용 이후 임의 변경';
  assert.throws(() => validateSession(session), /lacks user decision/);
});
test('framework/user conflict asks before acceptance and recommends user intent', () => {
  const session = makeSession(); session.rules.push(contrastingRule());
  const conflict = detectConflicts(session.rules, brief.id)[0]!;
  assert.equal(conflict.recommendedId, baseRule.id);
  assert.equal(resolveRules(session.rules, brief.id, []).effective.length, 0);
  assert.throws(() => acceptRules(session, 0, ['quiet-motion'], 'decision-one'), /Answer conflicts/);
});
test('answered conflicts are not asked again and modified rule invalidates old answers', () => {
  const rules = [baseRule, contrastingRule()]; const answer = answerFor(rules);
  assert.equal(resolveRules(rules, brief.id, [answer]).pending.length, 0);
  assert.equal(resolveRules(rules, 'another-project', []).pending.length, 1);
  const changed = structuredClone(rules); changed[1]!.statement = '조건이 달라짐';
  assert.throws(() => resolveRules(changed, brief.id, [answer]), /Stale or invalid/);
});
test('conflict answers are revision-bound, recorded with scope, and not duplicated', () => {
  const session = makeSession(); session.rules.push(contrastingRule());
  const conflict = detectConflicts(session.rules, brief.id)[0]!;
  const decision = { id: 'answer-one', conflictId: conflict.id, selectedRuleId: baseRule.id,
    scope: 'project-exception' as const, explanation: '이번 프로젝트에서 사용자 요청 유지' };
  assert.throws(() => answerConflict(session, 1, decision), /Stale session/);
  const resolved = answerConflict(session, 0, decision);
  assert.equal(resolved.revision, 1); assert.equal(resolveRules(resolved.rules, brief.id, resolved.answers).pending.length, 0);
  assert.throws(() => answerConflict(resolved, 1, decision), /already answered/);
  assert.equal(acceptRules(resolved, 1, [baseRule.id], 'decision-after-answer').rules[0]!.status, 'accepted');
});
test('same-rank contradictions and incompatible pairwise answers never silently select a winner', () => {
  const a = { ...baseRule, status: 'accepted' as const, effect: { key: 'layout.density', value: 'compact' } };
  const b = { ...a, id: 'rule-b', effect: { key: 'layout.density', value: 'spacious' } };
  const c = { ...a, id: 'rule-c', effect: { key: 'layout.density', value: 'medium' } };
  const conflicts = detectConflicts([a,b,c], brief.id);
  assert.equal(conflicts.length, 3);
  const answers = conflicts.map((conflict, index): ConflictAnswer => ({ id: `answer-${index}`, actor: 'user',
    conflictId: conflict.id, projectId: brief.id, leftHash: conflict.leftHash, rightHash: conflict.rightHash,
    selectedRuleId: index === 2 ? c.id : conflict.leftId, scope: 'project-exception', explanation: '다른 선택' }));
  assert.throws(() => resolveRules([a,b,c], brief.id, answers), /incompatible/);
});
test('pack save rejects unaccepted draft, wrong revision and changed payload hash', async () => {
  const store = await storage(); const fixture = acceptedFixture();
  await assert.rejects(store.save({ ...fixture, session: makeSession() }), /different draft or revision/);
  await assert.rejects(store.save({ ...fixture, acceptance: { ...fixture.acceptance, revision: 99 } }), /different draft or revision/);
  fixture.draft.tokens[0]!.value = '#112233';
  await assert.rejects(store.save(fixture), /different draft or revision/);
});
test('version saving is immutable and retries are idempotent across store instances', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'ai-design-test-'));
  const store = await PackStore.create(root); const fixture = acceptedFixture();
  const first = await store.save(fixture);
  const secondStore = await PackStore.create(root);
  assert.deepEqual(await secondStore.save(fixture), first);
  assert.equal((await readdir(path.join(root, 'packs', fixture.draft.id))).filter(name => /^v\d+$/.test(name)).length, 1);
  const changed = structuredClone(fixture); changed.draft.name = '수정 스타일';
  changed.acceptance = { ...changed.acceptance, id: 'acceptance-second', draftHash: contentHash(changed.draft), reason: '이름 수정' };
  await assert.rejects(store.save({ ...changed, requestId: fixture.requestId }), /reused with different payload/);
  await assert.rejects(store.save({ ...changed, requestId: 'request-second' }), /Stale base/);
  const next = await store.save({ ...changed, requestId: 'request-second', expectedBaseVersion: 1 });
  assert.equal(next.version, 2); assert.equal(next.parentHash, first.hash);
  assert.deepEqual(await store.read(first.id, 1), first);
  assert.match(await readFile(path.join(root, 'packs', first.id, 'v1', 'tokens.css'), 'utf8'), /--space-section: 32px;/);
  assert.match(await readFile(path.join(root, 'packs', first.id, 'v1', 'DESIGN.md'), 'utf8'), /확정된 개인 규칙/);
});
test('concurrent writers cannot publish two versions for the same request', async () => {
  const store = await storage(); const results = await Promise.allSettled([store.save(acceptedFixture()), store.save(acceptedFixture())]);
  assert.ok(results.some(result => result.status === 'fulfilled'));
  for (const result of results) if (result.status === 'rejected') assert.ok(result.reason instanceof WorkspaceBusyError);
  const pack = await store.save(acceptedFixture()); assert.equal(pack.version, 1);
});
test('project exception preserves personal rules and pinned pack', async () => {
  const store = await storage(); const pack = await store.save(acceptedFixture());
  const override: Rule = { ...baseRule, id: 'project-motion', status: 'accepted', scope: 'project', projectId: brief.id,
    effect: { key: 'motion.decorative', value: true } };
  const rules = [...pack.rules, override];
  const answer = answerFor(rules); answer.selectedRuleId = override.id;
  const binding = { schemaVersion: '1.0', id: brief.id, brief, packId: pack.id, packVersion: 1, packHash: pack.hash,
    overrides: [override], answers: [answer] };
  assert.equal(validateBinding(binding, pack).answers[0]!.scope, 'project-exception');
  assert.equal(pack.rules[0]!.effect.value, false);
  assert.throws(() => validateBinding({ ...binding, answers: [] }, pack), /Unanswered/);
  assert.throws(() => validateBinding({ ...binding, packVersion: 2 }, pack), /mismatch/);
});
test('change proposal identifies affected assets and projects without mutating base', async () => {
  const store = await storage(); const fixture = acceptedFixture();
  fixture.draft.assets = [{ id: 'example-pattern', type: 'pattern', version: '1', sourceId: 'shadcn-assets', tokenIds: ['space.section'], ruleIds: [] }];
  fixture.acceptance.draftHash = contentHash(fixture.draft);
  const pack = await store.save(fixture); const draft = makeDraft(); draft.assets = pack.assets;
  draft.rules = pack.rules; draft.tokens[1]!.value = '40px';
  const report = proposeChange(pack, draft, [], '여백 확대');
  assert.ok(report.changedPaths.includes('tokens')); assert.deepEqual(report.impactedAssetIds, ['example-pattern']);
  assert.equal(pack.tokens[1]!.value, '32px');
});
test('unsafe identifiers and tampered saved packs are rejected', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'ai-design-test-')); const store = await PackStore.create(root);
  await assert.rejects(store.save({ ...acceptedFixture(), requestId: '../outside' }), /Invalid storage/);
  const pack = await store.save(acceptedFixture()); const file = path.join(root, 'packs', pack.id, 'v1', 'pack.json');
  const tampered = { ...pack, name: '변조' }; await writeFile(file, JSON.stringify(tampered));
  await assert.rejects(store.read(pack.id, 1), /integrity mismatch/);
});
test('storage rejects managed symlink/junction directories', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'ai-design-test-')); const store = await PackStore.create(root);
  const outside = await mkdtemp(path.join(tmpdir(), 'ai-design-outside-'));
  await symlink(outside, path.join(root, 'packs', 'personal-demo'), process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(store.save(acceptedFixture()), /must not be a link/);
  assert.deepEqual(await readdir(outside), []);
});
