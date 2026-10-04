import type { DesignSession, PackAcceptance, PackDraft, ProductBrief, Rule, Source } from '../src/core/types.js';
import { acceptRules, contentHash } from '../src/core/index.js';

export const sources: Source[] = [
  { id: 'impeccable-context', layer: 'context', title: 'Impeccable', url: 'https://github.com/pbakaus/impeccable', revision: 'reviewed-2026-10-04', usage: 'design-reference', license: 'Reference only; no code copied', adopted: true },
  { id: 'refero-direction', layer: 'direction', title: 'Refero Styles', url: 'https://styles.refero.design/', revision: 'reviewed-2026-10-04', usage: 'design-reference', license: 'Reference only; no screenshots copied', adopted: false },
  { id: 'carbon-tokens', layer: 'tokens', title: 'Carbon token roles', url: 'https://www.carbondesignsystem.com/', revision: 'reviewed-2026-10-04', usage: 'design-reference', license: 'Reference only; no palette copied', adopted: true },
  { id: 'spectrum-tokens', layer: 'tokens', title: 'Spectrum token structure', url: 'https://spectrum.adobe.com/', revision: 'reviewed-2026-10-04', usage: 'design-reference', license: 'Reference only', adopted: false },
  { id: 'mobbin-patterns', layer: 'patterns', title: 'Mobbin pattern organization', url: 'https://mobbin.com/', revision: 'reviewed-2026-10-04', usage: 'design-reference', license: 'Reference only; no service connection', adopted: false },
  { id: 'refero-patterns', layer: 'patterns', title: 'Refero pattern references', url: 'https://refero.design/', revision: 'reviewed-2026-10-04', usage: 'design-reference', license: 'Reference only', adopted: false },
  { id: 'shadcn-assets', layer: 'assets', title: 'shadcn registry design', url: 'https://ui.shadcn.com/docs/registry', revision: 'reviewed-2026-10-04', usage: 'design-reference', license: 'Reference only; no component code copied', adopted: false },
  { id: 'vercel-validation', layer: 'validation', title: 'Vercel Web Interface Guidelines', url: 'https://github.com/vercel-labs/web-interface-guidelines', revision: 'reviewed-2026-10-04', usage: 'design-reference', license: 'Reference only', adopted: true },
];
export const brief: ProductBrief = { id: 'service-page', audience: '서비스에 관심 있는 일반 방문자', purpose: '서비스를 이해하고 문의하도록 돕는다',
  tasks: ['소개 읽기', '문의 시작'], content: ['한국어 소개', '사례', '연락 방법'], environment: ['데스크톱 웹', '모바일 웹'], constraints: ['이미지가 없는 콘텐츠도 있다'] };
export const baseRule: Rule = { id: 'quiet-motion', statement: '장식적인 자동 모션을 사용하지 않는다.', intent: '사용자가 내용과 주요 행동에 집중한다.',
  scope: 'personal', projectId: null, strength: 'preferred', status: 'proposed', layer: 'direction',
  origin: { type: 'user-feedback', referenceId: 'feedback-motion' }, appliesWhen: ['콘텐츠 소개 화면'],
  effect: { key: 'motion.decorative', value: false }, verification: { method: 'human-visual', description: '첫 화면에서 장식 모션 여부 확인' } };
export function makeSession(rule: Rule = baseRule): DesignSession {
  return { schemaVersion: '1.0', id: 'session-demo', revision: 0, brief: structuredClone(brief),
    feedback: [{ id: 'feedback-motion', text: '과한 움직임은 싫어요.', targetId: 'candidate-quiet' }],
    sources: structuredClone(sources), rules: [structuredClone(rule)], answers: [], acceptances: [] };
}
export function makeDraft(rule: Rule = baseRule): PackDraft {
  return { schemaVersion: '1.0', id: 'personal-demo', name: '차분한 개인 스타일', rules: [structuredClone(rule)],
    tokens: [
      { id: 'text.primary', kind: 'color', value: '#24303a', ruleIds: [] },
      { id: 'space.section', kind: 'dimension', value: '32px', ruleIds: [] },
      { id: 'motion.feedback', kind: 'duration', value: '150ms', ruleIds: ['quiet-motion'] },
    ], assets: [], sources: structuredClone(sources), baselines: [] };
}
export function acceptedFixture(rule: Rule = baseRule) {
  const draft = makeDraft(rule);
  const session = acceptRules(makeSession(rule), 0, [rule.id], 'decision-demo');
  const acceptance: PackAcceptance = { id: 'acceptance-demo', actor: 'user', draftHash: contentHash(draft),
    sessionId: session.id, revision: session.revision, acceptedRuleIds: [rule.id], reason: '예시 사용자 수용. 실제 사용자 평가를 의미하지 않음.' };
  return { draft, session, acceptance, requestId: 'request-demo', expectedBaseVersion: 0 };
}
