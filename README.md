# ai_design

프론트엔드 개발 경험이 없는 사용자가 AI와 짧게 협의해 개인 디자인 규칙을 만들고, 다른 프로젝트에서도 같은 시각적 성격을 유지하도록 돕는 프레임워크입니다.

Core와 로컬 브라우저 비교 UI를 제공합니다. 직접 작성한 후보 비교, 피드백·충돌 답변·규칙 수용, 팩 저장과 협의 재개를 사용할 수 있습니다. 실제 AI 후보 생성과 Codex·Claude Code별 실행 어댑터는 후속 단계입니다.

## 실행

Node.js 24 이상과 npm이 필요합니다.

```sh
npm ci
npm run dev
```

출력된 로컬 주소를 열면 비교 UI와 API가 시작됩니다. 기본 주소는 `http://127.0.0.1:4310`, 후보 미리보기는 별도 포트 `4311`을 사용합니다. 환경 변수 `WORKBENCH_PORT`, `PREVIEW_PORT`, `DESIGN_WORKSPACE`로 변경할 수 있습니다. 개발 서버는 로컬 전용이며 공개 호스팅용 서버가 아닙니다.

검증:

```sh
npm run check
npm exec playwright install chromium
npm run test:e2e
npm run demo
```

PowerShell에서 실행 정책으로 npm 실행이 제한되면 `npm.cmd`를 사용합니다.

`check`는 타입 검사, 21개 계약·저장·HTTP 테스트, Core와 UI 빌드를 실행합니다. `test:e2e`는 별도 포트와 작업 공간에서 7개 Chromium 브라우저 테스트를 실행합니다. `demo`는 가상의 사용자 수용 데이터를 이용하는 Core 예제입니다. 모델 API를 호출하지 않으므로 API 키가 필요하지 않습니다.

데모 출력은 `.design-workspace/core-demo/packs/personal-demo/v1/`에 저장됩니다. 같은 요청으로 다시 실행하면 기존 버전을 반환합니다. `.design-workspace/`, 환경 변수 파일과 빌드 출력은 Git에서 제외됩니다.

## 현재 구현

- 팩·세션·프로젝트·충돌·수용·변경·검수의 JSON Schema와 참조 검증.
- 충돌 시 질문과 추천 생성, 사용자 답변의 범위·내용 해시 기록.
- 사용자 수용 없이 규칙 확정 거부, 오래된 revision과 바뀐 규칙에 대한 기존 승인 거부.
- 팩 버전·내용 해시 고정, 프로젝트 예외 분리, 전후 변경과 영향 제안.
- 불변 버전 저장, 중복 요청 처리, 동시 쓰기 잠금, 경로와 관리 디렉터리 검증.
- `pack.json`, `DESIGN.md`, `tokens.css`, `sources.json`, `CHANGELOG.md` 내보내기.

충돌 탐지는 구조화된 effect 키/값에 한정됩니다. 자연어 해석, 조건 평가, 실제 화면 품질 검사는 아직 구현하지 않았습니다. Core의 사용자 이벤트는 신뢰된 호출자가 공급해야 하며 브라우저 인증 기능은 아닙니다. 외부 참고 출처는 여섯 계층에 맞춰 예제로 연결했고 원문·유료 화면·외부 코드는 복제하지 않았습니다.

로컬 서비스는 브라우저 수용과 에이전트 제출을 별도 경로로 처리합니다. 브라우저 요청은 로컬 Host·Origin과 HttpOnly 쿠키를 확인하며, 에이전트 제출에서는 수용 이벤트를 받지 않습니다. 이는 로컬 단일 사용자 흐름의 경계이며 계정 기반 인증 시스템은 아닙니다.

## 브라우저에서 협의하기

1. 페이지의 목적을 입력하고 같은 콘텐츠의 두 후보를 비교합니다.
2. 방향을 선택합니다. 후보의 규칙은 직접 작성한 예시이며 아직 수용 전입니다.
3. 필요하면 자연어 피드백을 저장합니다. 이때 ‘AI 반영 대기’가 표시되며 기존 에이전트의 다음 턴이 필요합니다.
4. 에이전트 규칙 제안이 제출되면 UI가 주기적으로 조회해 갱신합니다. 충돌에 답하고 규칙을 확인한 뒤 명시적으로 수용합니다.
5. 팩 저장 후 새로고침·서비스 재시작에도 기록을 이어갈 수 있습니다. 협의 JSON 가져오기는 새 세션을 만들며 기존 수용·저장 상태를 계승하지 않습니다.

규칙 제안 반영은 후보 화면 재생성과 별개입니다. 현재 iframe은 직접 작성한 두 예시를 표시하며 제출된 토큰·규칙으로 자동 렌더링하지 않습니다. 문의 안내 역시 메시지를 전송하지 않는 예시입니다.

## 기존 에이전트에 피드백 전달하기

피드백을 저장하면 `.design-workspace/handoffs/<session-id>.json`에 현재 브리프·규칙·토큰과 반영 대기 피드백을 기록합니다. 브라우저의 ‘전달 파일 확인’으로 최신 파일을 다시 만들 수 있습니다. 요청 파일에는 사용자 수용 기록이나 실행 자격 증명이 포함되지 않습니다.

기존 코딩 에이전트는 이 파일을 읽고 다음 형식의 응답 JSON을 작업 공간에 작성합니다. 아래 값은 형식 설명용입니다. 실제 ID·revision·규칙·토큰은 해당 요청과 Core 계약을 사용해야 합니다.

```json
{
  "sessionId": "session-example",
  "expectedRevision": 2,
  "feedbackIds": ["feedback-example"],
  "selected": "editorial",
  "rules": [],
  "tokens": []
}
```

`rules`는 하나 이상의 `proposed` 규칙을 포함해야 합니다. 규칙·토큰의 전체 필드는 [src/core/types.ts](src/core/types.ts)를 따릅니다. `selected`는 `editorial` 또는 `workspace`이며 임의 HTML·스크립트는 제출할 수 없습니다. 현재 대기 중인 피드백 ID를 모두 포함해야 하고 오래된 revision은 거부됩니다.

```sh
npm run agent-submit -- .design-workspace/response.json
```

이 명령은 검증된 규칙 제안을 세션에 반영합니다. 모델을 호출하거나 사용자 대신 수용하지 않습니다. 도구별 자동 실행과 실제 AI 생성 화면의 검증은 아직 제공하지 않습니다.

저장 중 프로세스가 강제 종료되면 `.write-lock`이 남을 수 있습니다. 자동 삭제하지 않습니다. 쓰기 프로세스가 없음을 확인하고 남은 잠금·임시 폴더와 마지막 완료 버전을 확인한 후 복구해야 합니다.

## 문서와 코드

- [PRODUCT.md](PRODUCT.md): 대상·목적·사용자 경험.
- [ARCHITECTURE.md](ARCHITECTURE.md): 구조·계약·현재 한계.
- [PLAN.md](PLAN.md): 구현 단계와 완료 기준.
- [AGENTS.md](AGENTS.md): 개발 규칙과 검증 명령.
- [src/core](src/core): 규칙·수용·검증·저장·내보내기.
- [src/schemas/contracts.ts](src/schemas/contracts.ts): 실제 JSON Schema.
- [examples/core-demo.ts](examples/core-demo.ts): 개발용 계약 데모.
- [tests/core.test.ts](tests/core.test.ts): 계약과 실패 경계 검증.

다음 단계는 실제 에이전트의 후보 생성과 도구별 전달 지침, 다른 제품에 팩을 적용하는 흐름입니다.
