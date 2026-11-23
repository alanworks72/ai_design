# Project Templates — Website-first, compact by default

These are **internal Code Agent artifacts**, not customer-facing pages. One user development prompt should normally suffice. For a small website, maintain **one pre-code Site Blueprint and one Scorecard**, with a site QA record after implementation. Split into many Page Spec/Figma files only when project complexity demands it.

## A. Before UI: docs/AI_DESIGN_PLAN.md (Site Blueprint)

```markdown
# AI Design — Website Blueprint
- Brief / fixed source:
- ai_design commit + exact instruction paths:
- Type: WEBSITE / explicitly approved LANDING / WEB_APP / existing-site revision
- Scope authorization: explicit brief / user confirmation / provisional assumption
- Audience and top user jobs:
- Site purpose / priority CTA / what is out of scope:
- Approver for material IA, brand and real content:
- Company Profile: organization type, actual business/service model, target customers, provided scope, supported value (with source per claim):
- Required facts and source status: VERIFIED / FICTIONAL_SAMPLE / TBD
- Content adequacy: what business information is available; what is missing; what cannot be claimed:
- Corporate prototype disclaimer: development notes, not invented enterprise proof in public UI
- Locked Design System: existing theme / **explicitly approved project Look Contract** / approved v1.0 white-Neutral + Wanted Sans default (record which applies)
- Technology and actual installed versions (when known):
- Image policy and rights decision (user choice or pending):
- Look source/status: existing brand / approved Look / unchanged v1.0 DEFAULT / PROPOSED / PENDING:
- Approved project token overrides, if any (background, type, rhythm, media, controls):
- Visual premise and real content-derived focal point:
- Brand Kit, opening and representative inner-page visual target references (actual 1440/390 captures):
- Visual target status: AGENT_PROPOSED / APPROVED_BY_USER / VISUAL_TARGET_UNVERIFIED:
- Visual target's alignment, typography/media hierarchy, density and mobile recomposition:

## Reference findings (pre-IA, brief and grounded)
- Reference 1: official URL, inspected date, observed Home/Company/offering content roles:
- Reference 2 (and 3 when useful): official URL, comparable business model/user need, observed page/content/media roles:
- Transferable *principles*: which user-task/content patterns inform this site:
- NOT to copy: competitor brand assets, copy, layouts, real company claims, KPI, page count:
- Availability: LIVE_INSPECTED / PINNED_REFERENCE / NOT_AVAILABLE (do not claim unperformed browsing):
- Resulting impact on company identity, page content and Site Map:

## Sitemap + route inventory (frozen before coding)
| ID | URL | Parent/menu | Page family | Distinct visitor question + unique information | Mandatory | Source / adequacy |
| HOME | / | root | home | overview & real route entry | yes | ... |
| ... | ... | ... | ... | ... | ... | ... |

## Cross-page user journeys (frozen)
| ID | Start → intermediate → finish | Real expected action/result | Mandatory |
| J01 | / → /products → /contact | browse real content then inquiry | yes |

## Page Spec per mandatory route
### HOME /
- Distinct visitor question and **why this is a separate page**:
- Corporate/industry role: identity / business offering / specific category / guide / task / other:
- Unique information (3–5 concise claims, facts or authorized sample details) + source:
- Content gap/TBD that would make this route a misleading shell:
- What belongs on a different page and must NOT be repeated here:
- Audience / purpose / primary content with source:
- Entry / primary CTA text, action and destination:
- States and response to errors:
- Page-specific title/description/h1 and internal links:
- Content-to-expression: narrative / meaningful photo or illustration / comparison / steps / form; why it helps:
- Desktop/mobile wireframe: content order and prominence:
- **Differentiation from sibling page layouts** (shared component allowed; generic filler cloning not):
- Acceptance/evidence method:

### ... repeat one compact Page Spec per mandatory route ...

## Shared UX / Art Direction
- Header/nav/footer, active state, breadcrumb rules:
- Page family composition matrix: content purpose, information density, meaningful media, Home/Company/Index/Detail/Process/Task differentiation as required; maintain selected Look without repeating identical sections
- Approved project Look/default token and assets usage, factual constraints and target revision:
- Responsive 390/768/1440 design approach:
- Preserve / Change / Avoid if revising an existing site:

## Exit gates
- G0 Scope / G1 Architecture / G2 Pre-code design & checklist:
- G1 company-identity adequacy, each route's unique content, Reference Analysis recorded or OFFLINE_REFERENCE disclosed:
- W05 expected page-purpose/content-value evidence targets frozen before coding:
- Open questions / blocking content decisions:
- Blueprint status: READY / PENDING
```

**No route may exist only to make the site appear large.** Required unique detail/data and Page Spec determine necessity. Never silently turn a WEBSITE into one Home with anchors.

## B. Before UI: docs/AI_DESIGN_SCORECARD.md

- Pin the common [20-item 100-point Scorecard](../validation/SCORECARD.md), **without changing IDs, weights, minimums or G01–G07**.
- Freeze the 20 criteria with **website-wide evidence** planned: per-page family screenshots, source paths, design tokens and real browser actions. Use 0–4 or UNVERIFIED **after** implementation only.
- Freeze the [Website Quality Gate W01–W06](../validation/WEBSITE_QUALITY_GATE.md) targets and actual route/requirement/journey IDs (not only Home). **W05 must name the corporate identity/content-value checks for each page family and intended visual roles**, not just "different route h1".
- For V1–V5, specify intended evidence of actual offering/identity, information density, composition value and cross-page differentiation; a token-perfect empty About page is not a 4.
- Freeze project-specific mandatory acceptance **before UI code**. Examples: route coverage, product category path, contact validation, no invented case study, unknown route behavior.
- Record exact freeze point, approved sources, content/TBD, W-gate status and later evidence. Do **not** fill results at plan time.

Suggested small table:

| ID | Pre-frozen target | Evidence method | First grade | Final grade | Actual evidence |
|---|---|---|---|---|---|
| A1–R2 | 20 exact criteria, each interpreted across actual site | screenshot(s) + code/tests | UNASSESSED | UNVERIFIED | ... |
| W01–W06 | 6 site-level hard gates | Blueprint + route matrix + journeys | UNASSESSED | UNVERIFIED | ... |
| P01... | mandatory project tests | actual test/report | UNASSESSED | UNVERIFIED | ... |

Final score **PASS** requires clear W gates **and** the original 85/100, 70%-per-area and G01–G07 rules. Unknown/missing evidence -> PENDING, confirmed failures -> FAIL. Independently recorded user acceptance can override a provisional agent PASS.

## C. After UI: docs/WEBSITE_QA.md

```markdown
# Website QA
- Tested server, URL, browser, font, code revision; QA commands actually executed
- Per-required-route test table:
| Route | Direct URL | Refresh | Title/content | Menu/CTA | Functional state | Evidence |
- J01/J02... actual end-to-end journeys and results
- Real 390/768/1440 screenshots **per distinct page family** + breakpoint checks
- 404/unknown route behavior and actual HTTP semantics where relevant
- Cross-page style/typography, imagery rights and content provenance
- **Visual target-to-final inspection**: screenshots vs frozen opening and representative inner page (alignment, typography, meaningful media, rhythm, mobile); TARGET_MATCHED / PARTIAL / UNVERIFIED; preserve strengths when revising
- **User visual acceptance**: human score range or UNRATED, YES / NO / AFTER_CHANGES / NOT_ASKED; independent of historic self-score
- **Content-versus-Page Spec inspection**: Home actually describes enterprise offer; Company explains actual business/service model; each Detail adds decision-useful information; Process alone owns buyer prep
- Reference-grounded review: cite which industry reference patterns were applied, not how closely the UI was copied; note observed content gaps
- Accessibility (axe plus manual), SEO/metadata, performance/security by project scope
- First QA: top 1–3 meaningful Anti-Slop and under-design issues with exact page/selector
- Fixes: Preserve / Change / Avoid and before/after proof
- W01–W06: CLEAR / VIOLATION / UNVERIFIED with evidence
- Final 20-item scoring, acceptance, human/release status and limitations
```

Keep per-page notes short. A Code Agent may maintain these three records internally without turning normal development into a PM paperwork exercise.
