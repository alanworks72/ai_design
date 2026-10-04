import { Ajv } from 'ajv';
import { schemas } from '../schemas/contracts.js';
import type { ChangeProposal, Conflict, DesignSession, PackAcceptance, PackDraft, PackVersion, ProjectBinding, ValidationReport } from './types.js';

export class ContractError extends Error {
  constructor(message: string) { super(message); this.name = 'ContractError'; }
}
interface Contracts {
  packDraft: PackDraft; packVersion: PackVersion; session: DesignSession; project: ProjectBinding;
  acceptance: PackAcceptance; change: ChangeProposal; report: ValidationReport;
  conflict: Conflict;
}
const ajv = new Ajv({ allErrors: true, strict: true, allowUnionTypes: true });
const validators = Object.fromEntries(Object.entries(schemas).map(([name, schema]) => [name, ajv.compile(schema)]));
export function parseContract<K extends keyof Contracts>(kind: K, input: unknown): Contracts[K] {
  const validate = validators[kind]!;
  if (!validate(input)) throw new ContractError(`${kind}: ${ajv.errorsText(validate.errors)}`);
  return structuredClone(input) as unknown as Contracts[K];
}
export function unique(items: readonly { id: string }[], label: string): void {
  if (new Set(items.map(item => item.id)).size !== items.length) throw new ContractError(`Duplicate ${label} id`);
}
export function requireRef(ids: string[], available: Set<string>, label: string): void {
  for (const id of ids) if (!available.has(id)) throw new ContractError(`Missing ${label}: ${id}`);
}
export function assertRuleScopes(rules: PackDraft['rules']): void {
  for (const rule of rules) {
    if ((rule.scope === 'personal') !== (rule.projectId === null)) throw new ContractError(`Invalid scope: ${rule.id}`);
  }
}
export function validateDraft(input: unknown): PackDraft {
  const draft = parseContract('packDraft', input);
  for (const [name, items] of Object.entries({ rules: draft.rules, tokens: draft.tokens, assets: draft.assets,
    sources: draft.sources, baselines: draft.baselines })) unique(items, name);
  assertRuleScopes(draft.rules);
  if (draft.rules.some(rule => rule.scope !== 'personal')) throw new ContractError('Personal pack cannot contain project rules');
  const ruleIds = new Set(draft.rules.map(rule => rule.id));
  const tokenIds = new Set(draft.tokens.map(token => token.id));
  const sourceIds = new Set(draft.sources.map(source => source.id));
  for (const rule of draft.rules) if (rule.origin.type === 'framework-reference') {
    requireRef([rule.origin.referenceId], sourceIds, 'rule source');
  }
  const cssNames = new Set<string>();
  for (const token of draft.tokens) {
    const name = token.id.replaceAll('.', '-');
    if (cssNames.has(name)) throw new ContractError(`CSS token collision: ${token.id}`);
    cssNames.add(name);
    requireRef(token.ruleIds, ruleIds, 'token rule');
    const patterns = {
      color: /^#[a-fA-F0-9]{6}$/, dimension: /^(?:0|(?:\d+(?:\.\d+)?)(?:px|rem|em))$/,
      duration: /^\d+(?:\.\d+)?(?:ms|s)$/,
      font: /^[a-zA-Z][a-zA-Z0-9 -]*(?:,\s*[a-zA-Z][a-zA-Z0-9 -]*)*$/,
    };
    if (!patterns[token.kind].test(token.value)) throw new ContractError(`Unsupported ${token.kind} token: ${token.id}`);
  }
  for (const asset of draft.assets) {
    requireRef([asset.sourceId], sourceIds, 'asset source');
    requireRef(asset.tokenIds, tokenIds, 'asset token');
    requireRef(asset.ruleIds, ruleIds, 'asset rule');
  }
  return draft;
}
