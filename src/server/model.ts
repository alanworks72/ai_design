import { randomUUID } from 'node:crypto';
import { ContractError, parseContract, ruleHash, validateDraft, validateSession } from '../core/index.js';
import type { DesignSession, PackAcceptance, PackDraft, Rule, ProjectBinding } from '../core/types.js';
import { validateSnapshot } from './screens.js';
import type { ScreenSnapshot } from './screens.js';

export type Direction = 'editorial' | 'workspace';
export interface WorkSession {
  schemaVersion: '1.0';
  session: DesignSession;
  selected: Direction | null;
  draft: PackDraft;
  processedFeedbackIds: string[];
  lastSubmission: string | null;
  publication: { acceptance: PackAcceptance; requestId: string } | null;
  saved: { id: string; version: number; hash: string } | null;
  generation: { history:ScreenSnapshot[]; binding:ProjectBinding|null; accepted:boolean };
}
export const uid = (prefix: string) => `${prefix}-${randomUUID()}`;
export function directionRule(direction: Direction): Rule {
  return { id: 'layout-direction', statement: direction === 'editorial'
    ? '넓은 여백과 큰 제목으로 읽는 순서를 만든다.' : '핵심 요약과 세부 정보를 나눠 빠르게 훑을 수 있게 한다.',
    intent: '선택한 화면의 정보 위계를 다른 프로젝트에서도 유지한다.', scope: 'personal', projectId: null,
    strength: 'preferred', status: 'proposed', layer: 'direction', origin: { type: 'ai-proposal', referenceId: 'authored-candidate' },
    appliesWhen: ['서비스나 활동 소개 페이지'], effect: { key: 'layout.direction', value: direction },
    verification: { method: 'human-visual', description: '제목·요약·세부 정보의 순서와 배치 확인' } };
}
export function createSession(purpose: string): WorkSession {
  if (!purpose.trim() || purpose.length > 1000) throw new ContractError('목적은 1~1000자로 입력해 주세요.');
  const id = uid('session');
  return { schemaVersion: '1.0', session: { schemaVersion: '1.0', id, revision: 0,
    brief: { id: 'service-page', audience: '서비스를 알아보고 싶은 방문자', purpose: purpose.trim(), tasks: ['서비스 이해', '문의 시작'],
      content: ['서비스 소개', '제공 내용', '진행 방식', '문의 안내'], environment: ['모바일 웹', '데스크톱 웹'], constraints: ['문의는 전송되지 않는 예시'] },
    feedback: [], sources: [], rules: [], answers: [], acceptances: [] }, selected: null,
    draft: { schemaVersion: '1.0', id: `pack-${id.slice(8)}`, name: '나의 디자인 팩', rules: [],
      tokens: [], assets: [], sources: [], baselines: [] }, processedFeedbackIds: [], lastSubmission: null, publication: null, saved: null,
    generation:{history:[],binding:null,accepted:false} };
}
export function validateWork(input: unknown): WorkSession {
  try { return validateWorkRecord(input); }
  catch(error) { if(error instanceof ContractError) throw error; throw new ContractError('Invalid work session structure'); }
}
function validateWorkRecord(input: unknown): WorkSession {
  if (!input || typeof input !== 'object') throw new ContractError('Invalid work session');
  const value = structuredClone(input) as WorkSession;
  // Old revision files remain readable without rewriting their history.
  if(!('generation' in value)) (value as WorkSession).generation={history:[],binding:null,accepted:false};
  const keys = ['schemaVersion','session','selected','draft','processedFeedbackIds','lastSubmission','publication','saved','generation'];
  if (Object.keys(value).length !== keys.length || keys.some(key => !(key in value)) || value.schemaVersion !== '1.0') throw new ContractError('Invalid work session fields');
  value.session = validateSession(value.session); value.draft = validateDraft(value.draft);
  const generation=value.generation;
  if(!generation || Object.keys(generation).sort().join(',')!=='accepted,binding,history' || typeof generation.accepted!=='boolean'
    || !Array.isArray(generation.history) || generation.history.length>40) throw new ContractError('Invalid generation state');
  generation.history=generation.history.map(item=>validateSnapshot(item,value.draft));
  if(generation.history.some(item=>item.revision>value.session.revision)) throw new ContractError('Future screen revision');
  if(generation.binding!==null) {
    generation.binding=parseContract('project',generation.binding);
    if(generation.binding.id!==value.session.brief.id || generation.binding.brief.purpose!==value.session.brief.purpose
      || generation.binding.overrides.length || generation.binding.answers.length || value.saved || value.publication) throw new ContractError('Invalid reused project');
  } else if(generation.accepted) throw new ContractError('Project acceptance requires a binding');
  if (value.draft.rules.some(rule=>!value.session.rules.some(item=>item.id===rule.id && ruleHash(item)===ruleHash(rule)))) throw new ContractError('Draft rule differs from session');
  if (![null,'editorial','workspace'].includes(value.selected)) throw new ContractError('Invalid candidate');
  if (!Array.isArray(value.processedFeedbackIds) || new Set(value.processedFeedbackIds).size !== value.processedFeedbackIds.length
    || value.processedFeedbackIds.some(id => !value.session.feedback.some(item => item.id === id))) throw new ContractError('Invalid processed feedback');
  if (value.lastSubmission !== null && (typeof value.lastSubmission !== 'string' || value.lastSubmission.length > 100)) throw new ContractError('Invalid submission id');
  if (value.publication !== null) {
    if(typeof value.publication !== 'object') throw new ContractError('Invalid publication');
    if (Object.keys(value.publication).sort().join(',') !== 'acceptance,requestId' || !/^request-[a-z0-9-]+$/.test(value.publication.requestId)) throw new ContractError('Invalid publication');
    value.publication.acceptance = parseContract('acceptance', value.publication.acceptance);
  }
  if (value.saved !== null && (typeof value.saved !== 'object' || Object.keys(value.saved).sort().join(',') !== 'hash,id,version' || value.saved.id !== value.draft.id
    || !Number.isSafeInteger(value.saved.version) || value.saved.version < 1 || !/^[a-f0-9]{64}$/.test(value.saved.hash))) throw new ContractError('Invalid saved pack');
  return value;
}
export function pendingFeedback(work: WorkSession): string[] {
  return work.session.feedback.filter(item => !work.processedFeedbackIds.includes(item.id)).map(item => item.id);
}
