# Fixed Pilot Brief — Gaon Distribution **Multi-page Website**

**New experiment**, not a rewrite of [old single-Homepage test](TEST_CASE_DISTRIBUTION.md). Intended for Website-first v3.0 verification, **not yet executed**.

## Fixed task brief

Build a responsive **Korean multi-page corporate website** for the **fictional B2B distribution company 가온유통**. Audience: business purchasing managers. They need to understand the company's service categories, browse item examples and supply inquiry conditions, understand the procurement process and prepare an inquiry. **The deliverable is a WEBSITE, not a single scroll-page landing page.**

Use user-approved **white + Neutral Design System v1.0**, Wanted Sans and approved size/spacing tokens. Preserve Anti-Slop; allow helpful legally sourced illustrative photography/diagrams if the agent judges they add real meaning; never imply the stock photo shows actual company facilities/inventory.

### Required information and behavior

- Company: fictional company name and explicitly fictional contact: 서울특별시 OO구 OO로 123, 3층 / 02-000-0000 / contact@example.com. Do not invent real customers, certifications, product guarantees, stock, claims about delivery times, financial figures, company history, blog/news, logos or testimonials.
- Categories: 식품·식자재, 생활용품, 기업 운영용품, with plausible **illustrative** examples and buyer-preparation conditions, not confirmed inventory.
- Procurement: meaningful, truthful description of general inquiry → condition consultation → quotation review → order coordination. Do not guarantee real prices/availability.
- Inquiry: required field validation, clear errors and recovery; a working **local inquiry draft + copy** with truthful no-send language (no backend submission or fabricated receipt). Clipboard denied fallback.
- Navigation: semantic responsive menus, keyboard/Escape/focus, **real route links**, direct URL and refresh. Shared brand/design tokens across pages, no copied content-free placeholder routes.
- Content and technical expectations: per-route titles, unique content/h1, meaningful accessible navigation, valid responsive layouts, proper not-found route/HTTP behavior where host supports it. No CMS/auth/backend requirement.

### Required route families (do not collapse to Home anchors)

| Route | Distinct responsibility |
|---|---|
| / | **Home:** company/offering overview, priority navigation to actual detail pages; not all sections duplicated |
| /company | **Company:** company role and supported purchasing context, no invented timeline/awards |
| /products | **Index:** three categories, examples and entry points to more specific information |
| /products/food | **Category detail:** 식품·식자재 examples, packaging/storage questions, inquiry deep link |
| /products/daily | **Category detail:** 생활용품 use cases/units, inquiry deep link |
| /products/operations | **Category detail:** 기업 운영용품 use cases/material requirements, inquiry deep link |
| /process | **Guide:** procurement process, what buyers prepare and the next action |
| /contact | **Task:** inquiry form, result and error states, real contact information |

Unknown URL must yield a truthful not-found experience, not a functional impersonation of Home. The site's actual routing/hosting solution must support direct deep URLs and refresh.

### Mandatory user journeys

- **J01:** Home → Products → one category detail → Inquiry, including useful category pre-selection when carried across routes.
- **J02:** Home → Company → Process → Inquiry.
- **J03:** Direct load on a detail route → visit contact → validation error → fix → generate draft → copy and, on denial, manual fallback.
- **J04:** Mobile navigation to a secondary route, Escape close/focus return; unknown-route recovery.

## Fixed evaluation constraints

1. Start from a **new clean session and folder**; read the pinned chosen Website-first revision and task brief. Do not inspect previous Pilot screenshots/critic reports before design.
2. Before UI code, write Site Blueprint with Scope/Sitemap/Page Specs/Flow/Wireframe and freeze site-specific checks plus existing fixed 20-item Scorecard.
3. Build all eight routes with distinct page-specific purposes and shared system. No fabricated cases/news pages.
4. Capture real full-page 390/768/1440 for **each required page family**, not Home only; test direct URL/refresh on **every mandatory route** and run J01–J04.
5. Check [Website Quality Gate](WEBSITE_QUALITY_GATE.md) W01–W06 and existing numerical Scorecard independently, plus user visual/functional acceptance. If any mandatory route fails, total score cannot override FAIL.
6. Record source, lockfile, runtime, actual commands, screenshots, content rights, pre/post QA, module/platform limits and reviewer scores. Do not fake independent human approval.
7. Do not change Governance/Design System or the frozen brief to obtain a PASS. Repeated runs should hold these inputs fixed and label stochastic variability.

This fixed brief intentionally specifies a site architecture **because the experiment tests website development**, not whether the Agent can guess the deliverable from ambiguous language.
