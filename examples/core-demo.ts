import path from 'node:path';
import { PackStore, createReviewReport, detectConflicts, proposeChange, ruleHash, toDraft, validateBinding } from '../src/core/index.js';
import { acceptedFixture, baseRule, brief } from './fixtures.js';
import type { ConflictAnswer, ProjectBinding, Rule } from '../src/core/types.js';

const store = await PackStore.create(path.resolve('.design-workspace/core-demo'));
const pack = await store.save(acceptedFixture());
const secondRule: Rule = { ...baseRule, id: 'portfolio-motion', scope: 'project', projectId: 'portfolio', status: 'accepted',
  statement: '이 포트폴리오에서는 장식 모션을 사용한다.', effect: { key: 'motion.decorative', value: true } };
const conflict = detectConflicts([...pack.rules, secondRule], 'portfolio')[0]!;
console.log('충돌 질문:', conflict.question);
const answer: ConflictAnswer = { id: 'answer-demo', actor: 'user', conflictId: conflict.id, projectId: 'portfolio',
  leftHash: conflict.leftHash, rightHash: conflict.rightHash, selectedRuleId: secondRule.id,
  scope: 'project-exception', explanation: '예제에서는 이 프로젝트만 변경하는 사용자 답변을 가정한다.' };
const project: ProjectBinding = validateBinding({ schemaVersion: '1.0', id: 'portfolio', packId: pack.id,
  packVersion: pack.version, packHash: pack.hash, brief: { ...brief, id: 'portfolio', purpose: '개인 작업 소개' },
  overrides: [secondRule], answers: [answer] }, pack);
console.log('저장 버전:', pack.version, '해시:', pack.hash);
console.log('프로젝트 예외:', project.answers[0]!.scope, '개인 규칙 유지:', pack.rules[0]!.effect.value === false);
console.log('검수 상태:', createReviewReport(pack).checks.map(check => check.result).join(', '));
const draft = structuredClone(toDraft(pack));
draft.tokens[1]!.value = '40px';
console.log('변경 제안:', JSON.stringify(proposeChange(pack, draft, [project], '영역 사이 여백 확대'), null, 2));
console.log('규칙 의미 해시:', ruleHash(pack.rules[0]!));
console.log('내보내기 위치:', path.resolve('.design-workspace/core-demo/packs', pack.id, `v${pack.version}`));
console.log('이 실행은 가상의 수용 데이터를 사용하는 Core 예제입니다. AI 호출·화면 생성·실제 사용자 수용은 수행하지 않았습니다.');
