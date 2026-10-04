# 디자인 라이브러리와 적용 근거

현재 범위는 소개 페이지용 참고 프로필 두 개와 로컬 컴포넌트다. 외부 제품 전체가 통합된 디자인 엔진이 아니다. 출처 표시, 원칙 적용, 코드 재사용, 외부 연결을 구분한다.

`src/design/library.ts`는 출처·적용 상태·역할별 토큰·생성 지침을 제공한다. `src/design/render.ts`는 토큰을 읽어 후보와 새 생성 결과를 구성한다. `agent-task`의 `library.guidance`에 같은 자료를 전달한다. 참고 프로필은 기존 팩을 자동으로 덮어쓰지 않는다.

| 계층 | 실제 반영 | 현재 경계 |
|---|---|---|
| 제품 맥락 | [Impeccable](https://github.com/pbakaus/impeccable)의 제품 목적과 화면 과제 구분을 지침에 반영. 사용자·목적·핵심 행동을 브리프로 전달 | 설치된 에이전트·후크 실행은 아님. 자연어 브리프 완성은 기존 에이전트의 작업 |
| 디자인 방향 | [Refero Intercom](https://styles.refero.design/style/12255b63-e506-4bc1-a4cd-d05487de32f3)의 밝은 종이·가벼운 제목·큰 여백과 [Refero Linear](https://styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1)의 어두운 표면·경계·절제된 행동 강조를 자체 구성에 적용 | 상표·스크린샷·DESIGN.md 복제 없음. 한국어와 대비를 로컬 조건에 맞게 조정. 프로필은 취향 제안 |
| 디자인 토큰 | [Carbon 간격](https://www.carbondesignsystem.com/building-blocks/foundations/spacing/overview/)과 [Spectrum 역할 구분](https://spectrum.adobe.com/foundations/design-data/design-tokens/)을 참고. 본문·보조 글·표면·테두리·행동, 간격·크기·반경·모션을 CSS에서 소비 | 전체 컴포넌트 설치나 alias·토큰 표준 지원은 아님 |
| 화면 패턴 | 서비스 이해→제공 내용→진행 방식→문의. 목록·번호 있는 과정·긴 콘텐츠·좁은 화면·미연결 문의를 자체 제작 | [Mobbin](https://mobbin.com/discover/apps/web)·[Refero](https://refero.design)의 라이선스 화면·실제 흐름은 미연결. 검색·가입·설정 패턴 미구현 |
| 코드 공급 | 공식 [shadcn Button registry](https://ui.shadcn.com/r/styles/new-york/button.json)의 variant·Slot·ref 구조를 React 워크벤치에 재사용. Tailwind 클래스는 로컬 CSS로 수정 | 생성 미리보기의 정적 블록은 자체 코드. shadcn 블록으로 표시하지 않음. MCP·개인 팩 registry는 후속 |
| 검수 | Impeccable·[Vercel 지침](https://github.com/vercel-labs/web-interface-guidelines)을 참고한 대비·폰트·포커스·키보드·넘침·모바일 검사 | 전체 접근성·모든 상태 통과나 시각 만족도를 자동 선언하지 않음 |

## 버전과 수용

새 `blocks-2.0`은 `text.secondary`, `type.body`, `type.heading`, `layout.measure`, `motion.duration`을 추가한다. 기존 `blocks-1.0`은 이전 렌더러를 보존한다. 읽기·가져오기·수용 프로젝트 수정 시작에서 버전을 유지한다.

참고 프로필 제출은 선택 필드 `libraryProfile`로 출처를 기록한다. 규칙·토큰은 제출자가 구성한다. 출처의 adopted는 참고 채택이며 사용자 수용이 아니다. 기존 스타일 변경은 제안과 화면 수용을 요구하며 재사용 프로젝트는 변경 범위도 선택한다.

## 품질 확인

`npm run check`는 계약·출처·이전 렌더러 보존을 검사한다. `npm run test:e2e`는 협의 흐름과 두 참고 후보를 360/768/1280px에서 확인한다. 로컬 폰트 로딩, 본문·보조 글·버튼 대비 4.5:1 이상, 가로 넘침, main 고정 높이, 긴 콘텐츠와 근거 패널을 검사한다. 임의 사용자 색 조합 전체를 인증하는 검사는 아니다.

시각 검수에서는 제목·설명의 위계, 읽는 길이, 정보 그룹, 근거 없는 문구, 좁은 화면의 의미 유지, 후보 사이 차이를 확인한다. 시각 만족도는 사용자 판단으로 남긴다.

## 코드와 폰트 출처

Button 원본: `third-party/shadcn-button.registry.json`. MIT: `third-party/shadcn-LICENSE.txt`. 원본 SHA-256: `4d8f39c3bd25e630b5962667722e8707e7b18122ad6842a5c22acf8a3ff9f93a`. 자동 갱신하지 않는다. 수정 컴포넌트는 `src/workbench/components/button.tsx`, 의존성 버전은 package-lock.json에 고정한다.

[Pretendard](https://github.com/orioncactus/pretendard/tree/v1.3.9) v1.3.9 가변 WOFF2를 변경 없이 포함한다. OFL: `third-party/Pretendard-LICENSE.txt`. SHA-256: `9599f12fd42fc0bce1cd50b47a0c022e108d7aa64dd0d1bb0ed44f3282d900b4`. 원본: `packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2`. 런타임 CDN 호출 없음. 파일 약 2MB이며 배포용 서브셋 최적화는 후속이다.
