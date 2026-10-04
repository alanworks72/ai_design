export type RuleStatus = 'proposed' | 'accepted' | 'rejected';
export type Layer = 'context' | 'direction' | 'tokens' | 'patterns' | 'assets' | 'validation';
export type RuleValue = string | number | boolean;
export interface Source {
  id: string;
  layer: Layer;
  title: string;
  url: string;
  revision: string;
  usage: 'design-reference' | 'code-reuse' | 'live-connection';
  license: string;
  adopted: boolean;
}
export interface Rule {
  id: string;
  statement: string;
  intent: string;
  scope: 'personal' | 'project';
  projectId: string | null;
  strength: 'required' | 'preferred';
  status: RuleStatus;
  layer: Layer;
  origin: { type: 'user-feedback' | 'framework-reference' | 'ai-proposal'; referenceId: string };
  appliesWhen: string[];
  effect: { key: string; value: RuleValue };
  verification: { method: 'automated' | 'human-visual'; description: string };
}
export interface Token {
  id: string;
  kind: 'color' | 'dimension' | 'duration' | 'font';
  value: string;
  ruleIds: string[];
}
export interface Asset {
  id: string;
  type: 'pattern' | 'component';
  version: string;
  sourceId: string;
  tokenIds: string[];
  ruleIds: string[];
}
export interface Baseline {
  id: string;
  label: string;
  sourceHash: string;
  viewport: { width: number; height: number };
}
export interface PackDraft {
  schemaVersion: '1.0';
  id: string;
  name: string;
  rules: Rule[];
  tokens: Token[];
  assets: Asset[];
  sources: Source[];
  baselines: Baseline[];
}
export interface ProductBrief {
  id: string;
  audience: string;
  purpose: string;
  tasks: string[];
  content: string[];
  environment: string[];
  constraints: string[];
}
export interface Feedback {
  id: string;
  text: string;
  targetId: string;
}
export interface Conflict {
  id: string;
  projectId: string;
  key: string;
  leftId: string;
  rightId: string;
  leftHash: string;
  rightHash: string;
  question: string;
  recommendedId: string;
  recommendedReason: string;
  options: { ruleId: string; statement: string; sourceType: Rule['origin']['type'] }[];
}
export interface ConflictAnswer {
  id: string;
  actor: 'user';
  conflictId: string;
  projectId: string;
  leftHash: string;
  rightHash: string;
  selectedRuleId: string;
  scope: 'project-exception' | 'pack-change';
  explanation: string;
}
export interface DesignSession {
  schemaVersion: '1.0';
  id: string;
  revision: number;
  brief: ProductBrief;
  feedback: Feedback[];
  sources: Source[];
  rules: Rule[];
  answers: ConflictAnswer[];
  acceptances: { id: string; actor: 'user'; ruleIds: string[]; ruleHashes: { id: string; hash: string }[]; revision: number }[];
}
export interface PackAcceptance {
  id: string;
  actor: 'user';
  draftHash: string;
  sessionId: string;
  revision: number;
  acceptedRuleIds: string[];
  reason: string;
}
export interface PackVersion extends PackDraft {
  version: number;
  hash: string;
  parentHash: string | null;
  requestId: string;
  acceptance: PackAcceptance;
}
export interface ProjectBinding {
  schemaVersion: '1.0';
  id: string;
  packId: string;
  packVersion: number;
  packHash: string;
  brief: ProductBrief;
  overrides: Rule[];
  answers: ConflictAnswer[];
}
export interface ChangeProposal {
  id: string;
  packId: string;
  baseVersion: number;
  baseHash: string;
  draftHash: string;
  reason: string;
  changedPaths: string[];
  changes: { path: string; before: unknown; after: unknown }[];
  impactedAssetIds: string[];
  impactedProjectIds: string[];
  status: 'proposed' | 'accepted' | 'rejected';
}
export interface ValidationReport {
  id: string;
  targetHash: string;
  checks: {
    ruleId: string;
    result: 'pass' | 'fail' | 'needs-review' | 'not-run';
    method: 'automated' | 'human-visual';
    evidence: string;
  }[];
}
