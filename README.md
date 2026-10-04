# ai_design

프론트엔드 개발 경험이 없는 사용자가 AI와 짧게 협의해 개인 디자인 규칙을 만들고, 다른 프로젝트에서도 같은 시각적 성격을 유지하도록 돕는 프레임워크입니다.

현재는 단계 1의 Core를 구현했습니다. 브라우저 비교 UI와 실제 코딩 에이전트 전달 흐름은 다음 단계입니다.

## 실행

Node.js 24 이상과 npm이 필요합니다.

```sh
npm ci
npm run check
npm run demo
```

PowerShell에서 실행 정책으로 npm 실행이 제한되면 `npm.cmd`를 사용합니다.

`check`는 타입 검사, 계약·저장 테스트, 빌드를 실행합니다. `demo`는 가상의 사용자 수용 데이터를 이용해 팩 저장, 프로젝트 예외, 변경 제안을 보여줍니다. AI 호출·화면 생성·실제 사용자 수용을 수행하지 않으며 API 키가 필요하지 않습니다.

데모 출력은 `.design-workspace/core-demo/packs/personal-demo/v1/`에 저장됩니다. 같은 요청으로 다시 실행하면 기존 버전을 반환합니다. `.design-workspace/`, 환경 변수 파일과 빌드 출력은 Git에서 제외됩니다.

## 현재 구현

- 팩·세션·프로젝트·충돌·수용·변경·검수의 JSON Schema와 참조 검증.
- 충돌 시 질문과 추천 생성, 사용자 답변의 범위·내용 해시 기록.
- 사용자 수용 없이 규칙 확정 거부, 오래된 revision과 바뀐 규칙에 대한 기존 승인 거부.
- 팩 버전·내용 해시 고정, 프로젝트 예외 분리, 전후 변경과 영향 제안.
- 불변 버전 저장, 중복 요청 처리, 동시 쓰기 잠금, 경로와 관리 디렉터리 검증.
- `pack.json`, `DESIGN.md`, `tokens.css`, `sources.json`, `CHANGELOG.md` 내보내기.

충돌 탐지는 구조화된 effect 키/값에 한정됩니다. 자연어 해석, 조건 평가, 실제 화면 품질 검사는 아직 구현하지 않았습니다. Core의 사용자 이벤트는 신뢰된 호출자가 공급해야 하며 브라우저 인증 기능은 아닙니다. 외부 참고 출처는 여섯 계층에 맞춰 예제로 연결했고 원문·유료 화면·외부 코드는 복제하지 않았습니다.

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

다음 단계는 로컬 비교 UI와 세션 저장입니다. 대화는 기존 Codex·Claude Code에서 진행하고 브라우저에는 후보 비교·피드백·충돌 답변·수용 상태를 제공합니다. 초기에는 브라우저 피드백 저장 후 기존 대화의 다음 턴에서 반영하는 방식입니다.
