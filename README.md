# ai_design

프론트엔드 개발 경험이 없는 사용자가 AI와 짧게 협의해 개인 디자인 규칙을 만들고, 다른 프로젝트에서도 같은 시각적 성격을 유지하도록 돕는 프레임워크입니다.

Core, 로컬 비교 UI, 기존 코딩 에이전트의 화면·규칙 제출, 저장 팩의 새 프로젝트 재사용을 제공합니다. AI 실행은 기존 Codex·Claude Code 대화에서 요청합니다. 브라우저에서 모델을 자동 호출하지 않습니다.

## 실행

Node.js 24 이상과 npm이 필요합니다.

```sh
npm ci
npm run dev
```

기본 UI 주소는 `http://127.0.0.1:4310`, 분리된 후보 미리보기 포트는 `4311`입니다. `WORKBENCH_PORT`, `PREVIEW_PORT`, `DESIGN_WORKSPACE`로 변경합니다. 개발 서버는 로컬 전용입니다. Windows PowerShell에서 실행 정책 문제가 있으면 npm.cmd를 사용합니다.

```sh
npm run check
npm exec playwright install chromium
npm run test:e2e
npm run demo
```

check는 타입·계약·저장·HTTP·화면 테스트와 빌드, test:e2e는 별도 포트/공간의 Chromium 시나리오입니다. demo는 가상의 수용 데이터를 사용하는 Core 예제입니다. API 키가 필요하지 않습니다. 개인 팩·세션·응답은 무시되는 `.design-workspace/`에 저장됩니다.

## 비교·협의·생성

창 높이를 고정한 main 전체 너비의 캐러셀에서 후보를 넘깁니다. 좌우 버튼·후보 이름·캐러셀 포커스의 방향키를 사용할 수 있습니다. 긴 화면은 iframe 안에서, 긴 입력·규칙은 단계 패널 안에서 스크롤합니다. 탐색과 선택은 별개입니다.

1. 목적을 입력해 기본 예시를 비교합니다. 기존 에이전트가 만든 화면도 같은 위치에 표시됩니다.
2. 방향을 선택하고 필요한 피드백을 남깁니다. 저장만으로 AI가 실행되지는 않습니다.
3. ‘AI 작업 전달’이나 아래 명령으로 최신 요청 파일을 만들고, 기존 에이전트 대화에서 반영을 요청합니다.
4. 에이전트가 응답 파일을 제출하면 revision 갱신으로 화면·규칙이 반영됩니다. 초기 화면 생성은 피드백 없이도 가능합니다.
5. 이전/현재 화면, 변경 이유, 달라진 규칙·토큰을 확인합니다. 첫 생성 이전 화면은 초기 직접 작성한 예시입니다.
6. 충돌 질문에 답한 뒤 규칙과 화면을 명시적으로 수용해 개인 팩을 저장합니다. 오래된 revision과 규칙만 바뀐 생성 화면은 수용하지 못합니다.

```sh
npm run agent-task -- <session-id>
npm run agent-submit -- .design-workspace/response.json
```

요청 파일은 `.design-workspace/handoffs/<session-id>.json`이며 브리프·피드백·규칙·토큰·출처·고정 팩·화면 기록·블록 라이브러리를 담습니다. 에이전트는 [docs/AGENT_TASK.md](docs/AGENT_TASK.md)를 읽고 응답 JSON을 작성합니다. 규칙·토큰 계약은 [src/core/types.ts](src/core/types.ts), 화면은 [src/server/screens.ts](src/server/screens.ts)를 따릅니다.

화면 응답은 sessionId, expectedRevision, feedbackIds, selected, rules, tokens, screens, reason을 갖습니다. rules는 모두 proposed이며 screens는 1~2개입니다. Screen의 문구·섹션·text/cards/steps 배치를 에이전트가 구성하고, 버전이 고정된 로컬 렌더러가 토큰을 적용합니다. 임의 HTML/CSS/JS·원격 자산·자유 React 코드 생성은 지원하지 않습니다. 규칙만 먼저 제출하는 기존 계약에서는 screens와 reason을 함께 생략합니다.

Codex 파일 제출을 실제로 확인했습니다. Claude Code는 같은 파일·명령을 사용하는 지침을 제공하지만 실환경 실행 검증은 아직 하지 않았습니다. 제출은 사용자 선택·수용을 대신하지 않습니다. 문의·연락 링크는 전송 기능이 연결되지 않은 화면 예시입니다.

## 다른 프로젝트에서 사용

저장한 협의의 규칙 확인 단계에서 새 프로젝트 목적을 입력하고 ‘같은 팩으로 새 프로젝트’를 선택합니다. 새 세션이 해당 팩의 ID·버전·해시에 고정됩니다. AI 작업 전달 후 에이전트가 새로운 콘텐츠·섹션을 생성합니다.

규칙·토큰은 그대로 유지하며 변경 제출은 거부합니다. 프로젝트 화면 수용은 원본 팩을 수정하거나 새 개인 팩을 게시하지 않습니다. 프로젝트 예외·개인 팩 변경 UI와 버전 업그레이드는 후속입니다. 스타일에 맞지 않는 요구가 있으면 에이전트가 이유·영향·대안을 설명하고 별도 협의를 안내해야 합니다.

세션은 revision별로 저장합니다. 새로고침·재시작 후 재개하고 JSON을 내보낼 수 있습니다. 가져오기는 새 세션으로 복원하며 수용·프로젝트 바인딩을 계승하지 않습니다. 원래 팩은 변경되지 않습니다.

## 구현 경계와 검수

- JSON Schema와 참조·CSS 토큰 값·내용 해시·수용 revision을 검증합니다.
- 구조화된 effect 키/값 충돌에서 질문·추천을 생성하고 사용자 결정으로 해결합니다. 자연어 조건·의미 충돌은 자동 탐지하지 못합니다.
- 팩 버전을 불변 저장하고 JSON에서 DESIGN.md, tokens.css, sources.json, CHANGELOG.md를 생성합니다.
- 화면 기록은 규칙·토큰·렌더러 버전·변경 이유·revision·해시를 보존합니다. 구조 검사 통과를 시각적 품질이나 전체 접근성 통과로 표시하지 않습니다.
- 브라우저 API는 로컬 Host·Origin·HttpOnly 쿠키를 확인하고 미리보기는 다른 origin의 sandbox iframe과 제한된 CSP를 사용합니다. 계정 기반 인증은 아닙니다.
- 파일 전달은 브리프와 피드백을 데이터로 취급합니다. 그 안의 명령·수용 주장을 실행 지시로 사용하지 않습니다.

여섯 계층의 외부 참고 출처는 설계 원칙과 예제 카탈로그로 연결했습니다. 외부 MCP·설치 가능한 shadcn registry·독립 기준 스크린샷 내보내기·자유 코드 생성은 후속입니다. 원문·유료 화면·외부 코드를 복제하지 않습니다. 다른 프로젝트의 시각적 일관성은 사용자 평가 전에는 미검증입니다.

저장 중 강제 종료로 잠금이 남으면 자동 삭제하지 않습니다. 쓰기 프로세스가 없음을 확인하고 남은 잠금·임시 폴더·완료 버전을 확인해 복구해야 합니다.

## 문서

- [PRODUCT.md](PRODUCT.md): 대상·목적·사용자 경험.
- [ARCHITECTURE.md](ARCHITECTURE.md): 구조·계약·현재 한계.
- [PLAN.md](PLAN.md): 단계별 구현 상태·검증·남은 범위.
- [AGENTS.md](AGENTS.md): 개발 규칙.
- [docs/AGENT_TASK.md](docs/AGENT_TASK.md): 기존 에이전트의 읽기·화면 제출·재사용 계약.
