# Corporate-site Pilot V2 — Fixed Rich-Content Brief (NEW EXPERIMENT)

**Status: NOT EXECUTED.** This is a **new test case / separate input condition** and **does not replace** [the eight-route v3.0 test](TEST_CASE_DISTRIBUTION_WEBSITE.md) or historical `quality-run01`. The purpose is to remove the artificial lack of corporate content while testing whether a Code Agent can produce a substantive and convincingly corporate website **without fabricating evidence**.

## 0. How to use the fixture

Build a Korean **multi-page B2B corporate website** for the **explicitly fictional** company 가온유통. All business claims in this section are **authorized fictional scenario facts** for this local prototype, **not real-world observations or customer claims**. The current website must truthfully indicate it is a fictional/example enterprise where appropriate. Do not put developer metadata, grading explanations or `TBD` labels into customer-facing UI as decorative badges.

Use approved white/Neutral + Wanted Sans + unchanged Design System v1.0. Media can be **originally created or rights-cleared** and used only when informative; not necessarily photographic or numerous. Do not use competitor logos, actual facility photographs presented as Gaon's, invented KPIs, certifications, clients, years of operation or external customer quotes.

### Authorized synthetic Company Profile (FICTIONAL_SAMPLE)

- **Identity / business model:** 가온유통은 국내 사업장에서 사용하는 식품·식자재, 위생·생활 소모품, 사무·포장·작업 소모품을 대상으로 **기업 구매 요청을 받아 공급 가능성과 거래 조건을 조율하는 B2B 유통 사업자**라는 가상 설정이다.
- **Who uses the service (target segments, not claimed customers):** 구내식당 운영 담당자, 사무실 및 시설 관리 담당자, 물류·현장 운영 구매 담당자. These are *potential user groups*, not actual client references.
- **What the company does:** (1) 여러 품목군의 상담 창구 제공, (2) 사용 목적·규격·수량·납품 조건을 정리, (3) 조건에 맞는 거래 및 납품 가능성을 협의. It does **not** claim live inventory, prices, guaranteed lead times, nationwide infrastructure, proprietary logistics, delivery tracking or real supplier integration.
- **Service boundary:** 상담 및 조건 협의 중심. 실시간 주문·결제·계약·조회 서비스는 제공하지 않는 시나리오. 문의 폼은 **로컬 초안 생성 및 복사만** 하고 메일 전송/서버 저장을 하지 않는다.
- **Business positioning (fictional copy direction, not a slogan to copy verbatim):** 여러 업무 분야의 기업 구매자가 요구 조건을 정리하고 공급 상담을 시작할 수 있도록 연결하는 기업용 유통 서비스. Do not transform this into an unsupported "industry leader" boast.
- **Contact (fixed fictional data):** 서울특별시 OO구 OO로 123, 3층 / 02-000-0000 / contact@example.com.
- **Explicitly not provided:** actual company history, staff/facilities, client lists, certifications, market share, sales/revenues, inventory or guaranteed fulfillment. Do not compensate by fabricating them.

## 1. Distinct content sources by route / visitor question

The **route structure is fixed** for methodological comparability with the prior eight-route task. Each route still needs **real distinct content and meaningful composition**, not a forced shared layout.

| Required URL | Visitor question and information unique to this route |
|---|---|
| `/` | What B2B business is this, who does it serve and what can I explore? Explain **actual fictional enterprise offer** first, then link to the real service categories, business model/process and contact. Home is not the complete buyer instruction guide. |
| `/company` | **What does the company do and how does its business model work?** Explain its three coordination functions, audiences and service boundary as a coherent corporate overview. Buyer packaging/quantity checklists are **not the principal About content**. |
| `/products` | Which three product domains are covered, how do their business uses and inquiry requirements differ, and where is the detail? Provide an informative comparison, not three identical cards merely to fill a landing page. |
| `/products/food` | 식품·식자재 example groups: 쌀·잡곡(포장 중량/월 사용량), 소스·조미료(포장 단위/보관 조건), 냉동 채소(냉동 보관 조건/입고 시 취급). Explain **food-specific** questions: storage, packaging, receiving conditions. These are fictional *inquiry examples*, not a stock catalog. |
| `/products/daily` | 위생·생활소모품 example groups: 손 세정·리필(용기/디스펜서 호환), 종이 타월·화장지(규격/묶음 수), 청소용 소모품(사용 구역/교체 주기). Explain **facility-use and replenishment** decisions, not cold-chain questions. |
| `/products/operations` | 기업 운영용품 example groups: 복사용지·라벨(크기/인쇄기 호환), 골판지 상자·완충재(내부 치수/포장 대상), 포장 테이프·작업 소모품(재질/작업 환경). Explain **dimensions/material compatibility** and planning requirements, not repeated hygiene or storage copy. |
| `/process` | How does an inquiry proceed? Distinguish the **company's coordination stages** (request intake → specification clarification → trade/quotation condition review → agreement and order coordination) from what buyers should prepare at each stage. No guaranteed quote/delivery claims. |
| `/contact` | How do I complete the next action? Required company/contact/email/category/request input, whitespace/email validation, clear error/recovery, category preselection from product details, local draft and real clipboard copy or denied fallback; **no fake email delivery**. |

Handle unknown URLs truthfully (404 response where server allows), with useful recovery.

### Example context is NOT actual catalog data

The product examples above are **fictional prompts for useful information design**. No route may state these are currently in stock, priced, certified, available for specific delivery, contractually guaranteed or supplied to named customers.

## 2. User journeys and technical requirements — unchanged intent

- **J01:** Home → Products → any category detail → Contact, carrying selected category.
- **J02:** Home → Company → Process → Contact.
- **J03:** direct detail URL → Contact → empty/invalid field errors → recovery → draft → real clipboard success + denied fallback.
- **J04:** mobile keyboard menu open/Escape/focus return → secondary route; unknown-route recovery.

Each required route works by **direct URL, refresh and navigation**. Desktop/mobile reading order and keyboard/focus work. Every page has meaningful title/h1, truthful unique content and suitable CTA. Capture full-page 390/768/1440px for representative families and, when practical, all eight routes. Test actual journeys, not merely link presence. Report built app, source, evidence, actual tests, unresolved limitations and independent human approval status.

## 3. Reference Analysis control

**Comparable public references permitted** (source observations, no copying):
- [CJ프레시웨이 Home](https://www.cjfreshway.com/index.jsp) and [Company](https://www.cjfreshway.com/solution/company.jsp).
- [동원홈푸드 Home](https://www.dwhf.co.kr/kor/main) and [Company](https://www.dwhf.co.kr/kor/about/intro).
- [Bunzl About](https://www.bunzl.com/about-us/).
- [NN/g corporate About Us usability research](https://www.nngroup.com/articles/about-us-information-on-websites/).

The Agent must report **which sites it truly inspected and what it inferred**. If browsing is unavailable, it may use [pinned observations](../research/CORPORATE_SITE_REFERENCE_ANALYSIS.md) and must record OFFLINE_REFERENCE; no fake fresh research. These sources are for **what corporate content and navigation accomplish**, not a design to visually clone. These real companies' achievements and statistics are **not Gaon's**.

## 4. Frozen experiment and acceptance

- **Before UI:** one compact Blueprint containing fictional Company Profile, sourced Reference Findings, Sitemap, all Page Specs and their unique visitor questions/content, content-to-expression plan and frozen checklist.
- **Site Gate:** W01–W06 must be CLEAR **with actual content-role evidence**, especially W05 Company identity and category-specific information. Do not count `/company` as substantive merely because it has a title and a purchasing checklist.
- **Numeric gate:** unchanged 20 items, same 85/100 total, category floors, G01–G07. Self PASS is provisional, not human acceptance.
- **Compare fairly:** To isolate the methodology, run the **same entire V2 fixture** under pinned prior Website-first v3.0 instructions and the updated candidate instructions, with fresh workspaces/model/tool budget where practicable. The old sparse-content 93.75/100 result is a **historical diagnostic**, not a matched baseline. Never claim a causal improvement from comparing unlike briefs.
- **No forced visual answer:** this brief provides the business content and constraints, **not** an exact Hero image, card layout, photo count, accent border, page-level template or visual score. The Agent chooses purposeful Art Direction.

## 5. What counts as a failure

A website that technically implements eight paths but presents a generic "기업 구매 안내서" as the entire enterprise identity, replaces About with buyer prep advice, or clones three detail pages with only relabelled generic statements **does not meet this fixture's page-purpose requirements**. Report the actual W05 and V scores transparently instead of inventing additional company proof or lowering the gate.
