import { validateDraft, ContractError } from './validation.js';
import type { PackDraft, PackVersion } from './types.js';
function escapeMarkdown(text: string): string { return text.replace(/[\r\n]+/g, ' ').replace(/([\\`*_{}\[\]<>#|])/g, '\\$1'); }
export function renderDesign(input: PackDraft): string {
  const pack = validateDraft(input);
  if (pack.rules.some(rule => rule.status !== 'accepted')) throw new ContractError('Export requires accepted rules');
  return [
    `# ${escapeMarkdown(pack.name)}`, '', '이 문서는 개인 디자인 팩에서 생성한 읽기용 결과다.',
    '새 충돌은 사용자에게 질문한다. 원문 레퍼런스는 자동으로 사용자 요구보다 우선하지 않는다.', '',
    '## 확정된 개인 규칙', '',
    ...pack.rules.flatMap(rule => [
      `- **${escapeMarkdown(rule.id)}** (${rule.strength} / ${rule.layer}): ${escapeMarkdown(rule.statement)}`,
      `  - 목적: ${escapeMarkdown(rule.intent)}`,
      `  - 조건: ${rule.appliesWhen.map(escapeMarkdown).join(', ') || '전역'}`,
      `  - 출처: ${rule.origin.type} / ${escapeMarkdown(rule.origin.referenceId)}`,
      `  - 구현 효과: ${escapeMarkdown(rule.effect.key)} = ${escapeMarkdown(JSON.stringify(rule.effect.value))}`,
      `  - 검수: ${rule.verification.method} / ${escapeMarkdown(rule.verification.description)}`,
    ]), '', '## 참고 출처', '',
    ...pack.sources.map(source => `- ${escapeMarkdown(source.title)}: ${source.url} (${escapeMarkdown(source.revision)}; ${source.usage}; ${source.adopted ? '채택' : '미채택 참고'})`), '',
  ].join('\n');
}
export function renderTokens(input: PackDraft): string {
  const pack = validateDraft(input);
  if (pack.rules.some(rule => rule.status !== 'accepted')) throw new ContractError('Export requires accepted rules');
  return ['/* Generated from the accepted pack. */', ':root {',
    ...pack.tokens.map(token => `  --${token.id.replaceAll('.', '-')}: ${token.value};`), '}', ''].join('\n');
}
export function renderChangelog(pack: PackVersion): string {
  return `# 변경 기록\n\n- 버전: ${pack.version}\n- 이전 해시: ${pack.parentHash ?? '첫 버전'}\n- 이유: ${escapeMarkdown(pack.acceptance.reason)}\n- 사용자 결정: ${pack.acceptance.id}\n`;
}
