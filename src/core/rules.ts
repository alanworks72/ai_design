import { contentHash } from './hash.js';
import { assertRuleScopes, ContractError, parseContract, requireRef, unique } from './validation.js';
import type { Conflict, ConflictAnswer, DesignSession, Rule } from './types.js';

export function ruleHash(rule: Rule): string {
  // Proposal acceptance changes status, not the meaning of a conflict.
  const { status: _status, ...meaning } = rule;
  return contentHash(meaning);
}
function priority(rule: Rule): number {
  return (rule.origin.type === 'user-feedback' ? (rule.scope === 'project' ? 40 : 30)
    : rule.status === 'accepted' ? 20 : rule.origin.type === 'framework-reference' ? 10 : 0)
    + (rule.strength === 'required' ? 2 : 0);
}
export function detectConflicts(rules: Rule[], projectId: string): Conflict[] {
  unique(rules, 'rule');
  assertRuleScopes(rules);
  const applicable = rules.filter(rule => rule.status !== 'rejected' && (rule.scope === 'personal' || rule.projectId === projectId))
    .sort((a, b) => a.id.localeCompare(b.id, 'en'));
  const result: Conflict[] = [];
  for (let i = 0; i < applicable.length; i++) for (let j = i + 1; j < applicable.length; j++) {
    const left = applicable[i]!, right = applicable[j]!;
    if (left.effect.key !== right.effect.key || left.effect.value === right.effect.value) continue;
    const leftHash = ruleHash(left), rightHash = ruleHash(right);
    const recommended = priority(left) >= priority(right) ? left : right;
    result.push(parseContract('conflict', {
      id: `conflict-${contentHash({ projectId, leftHash, rightHash }).slice(0,24)}`, projectId,
      key: left.effect.key, leftId: left.id, rightId: right.id, leftHash, rightHash,
      question: `「${left.statement}」와 「${right.statement}」가 다릅니다. 이번 프로젝트에서 무엇을 적용할까요?`,
      recommendedId: recommended.id,
      recommendedReason: recommended.origin.type === 'user-feedback'
        ? '명시적으로 표현한 사용자 의도를 유지하는 안을 우선 추천합니다. 적용 범위는 답변으로 정합니다.'
        : '같은 수준의 규칙에서는 필수 여부를 추천 근거로만 사용합니다. 자동으로 확정하지 않습니다.',
      options: [left, right].map(rule => ({ ruleId: rule.id, statement: rule.statement, sourceType: rule.origin.type })),
    }));
  }
  return result;
}
export function matchesAnswer(conflict: Conflict, answer: ConflictAnswer): boolean {
  return answer.actor === 'user' && answer.conflictId === conflict.id && answer.projectId === conflict.projectId
    && answer.leftHash === conflict.leftHash && answer.rightHash === conflict.rightHash
    && [conflict.leftId, conflict.rightId].includes(answer.selectedRuleId);
}
export function resolveRules(rules: Rule[], projectId: string, answers: ConflictAnswer[]) {
  const conflicts = detectConflicts(rules, projectId);
  const suppressed = new Set<string>();
  const pending: Conflict[] = [];
  for (const conflict of conflicts) {
    const matched = answers.filter(answer => matchesAnswer(conflict, answer));
    const selections = new Set(matched.map(answer => answer.selectedRuleId));
    if (selections.size > 1) throw new ContractError(`Contradictory user answers: ${conflict.id}`);
    const answer = matched[0];
    if (!answer) pending.push(conflict);
    else suppressed.add(answer.selectedRuleId === conflict.leftId ? conflict.rightId : conflict.leftId);
  }
  for (const answer of answers) if (answer.projectId === projectId && !conflicts.some(conflict => matchesAnswer(conflict, answer))) {
    throw new ContractError(`Stale or invalid conflict answer: ${answer.id}`);
  }
  // Cyclic/inconsistent pair choices must not silently suppress all user intent.
  for (const conflict of conflicts) {
    const answer = answers.find(item => matchesAnswer(conflict, item));
    if (answer && suppressed.has(answer.selectedRuleId)) throw new ContractError('Conflict answers select incompatible rules');
  }
  return {
    pending,
    effective: pending.length ? [] : rules.filter(rule => rule.status === 'accepted'
      && (rule.scope === 'personal' || rule.projectId === projectId) && !suppressed.has(rule.id)),
  };
}
export function validateSession(input: unknown): DesignSession {
  const session = parseContract('session', input);
  unique(session.rules, 'rule'); unique(session.sources, 'source'); unique(session.feedback, 'feedback');
  unique(session.answers, 'answer'); unique(session.acceptances, 'acceptance');
  assertRuleScopes(session.rules);
  const feedback = new Set(session.feedback.map(item => item.id));
  const sources = new Set(session.sources.map(item => item.id));
  for (const rule of session.rules) {
    if (rule.scope === 'project' && rule.projectId !== session.brief.id) throw new ContractError(`Wrong project: ${rule.id}`);
    if (rule.origin.type === 'user-feedback') requireRef([rule.origin.referenceId], feedback, 'feedback');
    if (rule.origin.type === 'framework-reference') requireRef([rule.origin.referenceId], sources, 'source');
    if (rule.status === 'accepted' && !session.acceptances.some(event => event.revision <= session.revision && event.ruleIds.includes(rule.id)
      && event.ruleHashes.some(item => item.id === rule.id && item.hash === ruleHash(rule)))) {
      throw new ContractError(`Accepted rule lacks user decision: ${rule.id}`);
    }
  }
  const ids = new Set(session.rules.map(rule => rule.id));
  for (const event of session.acceptances) {
    if (event.revision > session.revision) throw new ContractError('Future acceptance revision');
    requireRef(event.ruleIds, ids, 'accepted rule');
    unique(event.ruleHashes, 'accepted rule hash');
    if (contentHash([...event.ruleIds].sort()) !== contentHash(event.ruleHashes.map(item => item.id).sort())) {
      throw new ContractError('Acceptance hash list mismatch');
    }
  }
  resolveRules(session.rules, session.brief.id, session.answers);
  return session;
}
export function answerConflict(input: unknown, expectedRevision: number, decision: {
  id: string; conflictId: string; selectedRuleId: string; scope: ConflictAnswer['scope']; explanation: string;
}): DesignSession {
  const session = validateSession(input);
  if (session.revision !== expectedRevision) throw new ContractError('Stale session revision');
  if (session.answers.some(answer => answer.id === decision.id || answer.conflictId === decision.conflictId)) {
    throw new ContractError('Conflict already answered');
  }
  const conflict = detectConflicts(session.rules, session.brief.id).find(item => item.id === decision.conflictId);
  if (!conflict || ![conflict.leftId, conflict.rightId].includes(decision.selectedRuleId)) throw new ContractError('Invalid conflict selection');
  session.answers.push({ ...decision, actor: 'user', projectId: session.brief.id, leftHash: conflict.leftHash, rightHash: conflict.rightHash });
  session.revision++;
  return validateSession(session);
}
export function acceptRules(input: unknown, expectedRevision: number, ruleIds: string[], decisionId: string): DesignSession {
  const session = validateSession(input);
  if (session.revision !== expectedRevision) throw new ContractError('Stale session revision');
  if (!/^[a-z][a-z0-9-]{0,63}$/.test(decisionId)) throw new ContractError('Invalid decision id');
  if (session.acceptances.some(event => event.id === decisionId)) throw new ContractError('Decision id already used');
  if (!ruleIds.length || new Set(ruleIds).size !== ruleIds.length) throw new ContractError('Select distinct proposed rules');
  requireRef(ruleIds, new Set(session.rules.filter(rule => rule.status === 'proposed').map(rule => rule.id)), 'proposed rule');
  if (resolveRules(session.rules, session.brief.id, session.answers).pending.length) throw new ContractError('Answer conflicts before accepting rules');
  session.revision++;
  session.rules = session.rules.map(rule => ruleIds.includes(rule.id) ? { ...rule, status: 'accepted' } : rule);
  session.acceptances.push({ id: decisionId, actor: 'user', ruleIds,
    ruleHashes: session.rules.filter(rule => ruleIds.includes(rule.id)).map(rule => ({ id: rule.id, hash: ruleHash(rule) })), revision: session.revision });
  return validateSession(session);
}
