import { contentHash } from './hash.js';
import { resolveRules } from './rules.js';
import { assertRuleScopes, ContractError, parseContract, unique, validateDraft } from './validation.js';
import type { ChangeProposal, PackDraft, PackVersion, ProjectBinding, ValidationReport } from './types.js';

export function validateBinding(input: unknown, pack: PackVersion): ProjectBinding {
  const project = parseContract('project', input);
  if (project.packId !== pack.id || project.packVersion !== pack.version || project.packHash !== pack.hash) {
    throw new ContractError('Project pack identity/version/hash mismatch');
  }
  if (project.id !== project.brief.id) throw new ContractError('Project brief identity mismatch');
  unique(project.overrides, 'project rule');
  assertRuleScopes(project.overrides);
  for (const rule of project.overrides) if (rule.scope !== 'project' || rule.projectId !== project.id || rule.status !== 'accepted') {
    throw new ContractError('Project overrides must be accepted project-scoped rules');
  }
  const resolution = resolveRules([...pack.rules, ...project.overrides], project.id, project.answers);
  if (resolution.pending.length) throw new ContractError('Unanswered project conflicts');
  return project;
}
export function proposeChange(base: PackVersion, draft: PackDraft, projects: ProjectBinding[], reason: string): ChangeProposal {
  draft = validateDraft(draft);
  if (base.id !== draft.id) throw new ContractError('Cannot change pack identity');
  const changedPaths = (['name', 'rules', 'tokens', 'assets', 'sources', 'baselines'] as const)
    .filter(key => contentHash(base[key]) !== contentHash(draft[key]));
  const changedRules = new Set([...base.rules, ...draft.rules].filter(rule => {
    const before = base.rules.find(item => item.id === rule.id);
    const after = draft.rules.find(item => item.id === rule.id);
    return !before || !after || contentHash(before) !== contentHash(after);
  }).map(rule => rule.id));
  const changedTokens = new Set([...base.tokens, ...draft.tokens].filter(token => {
    const before = base.tokens.find(item => item.id === token.id);
    const after = draft.tokens.find(item => item.id === token.id);
    return !before || !after || contentHash(before) !== contentHash(after);
  }).map(token => token.id));
  const impactedAssetIds = [...new Set([...base.assets, ...draft.assets].filter(asset =>
    asset.ruleIds.some(id => changedRules.has(id)) || asset.tokenIds.some(id => changedTokens.has(id))
    || contentHash(base.assets.find(item => item.id === asset.id) ?? null) !== contentHash(draft.assets.find(item => item.id === asset.id) ?? null)
    || changedPaths.includes('sources')).map(asset => asset.id))];
  return parseContract('change', {
    id: `change-${contentHash({ baseHash: base.hash, draft, reason }).slice(0,24)}`, packId: base.id,
    baseVersion: base.version, baseHash: base.hash, draftHash: contentHash(draft), reason, changedPaths,
    changes: changedPaths.map(key => ({ path: key, before: structuredClone(base[key]), after: structuredClone(draft[key]) })),
    impactedAssetIds, impactedProjectIds: projects.filter(project => project.packId === base.id).map(project => project.id), status: 'proposed',
  });
}
export function createReviewReport(pack: PackVersion): ValidationReport {
  return parseContract('report', {
    id: `report-${pack.hash.slice(0,24)}`, targetHash: pack.hash,
    checks: pack.rules.map(rule => ({ ruleId: rule.id, result: rule.verification.method === 'automated' ? 'not-run' : 'needs-review',
      method: rule.verification.method, evidence: '구조 검증은 완료했지만 실제 화면·동작은 아직 검수하지 않았습니다.' })),
  });
}
