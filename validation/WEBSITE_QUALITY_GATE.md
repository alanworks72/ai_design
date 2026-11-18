# Website Quality Gate — Site Completeness Before Page Scores

**Website-first validation extension** (v3.0 proposal). This is **in addition to** the existing [100-point Scorecard](SCORECARD.md). **Keep its 20 criteria, 25/25/20/20/10 weights, 85 threshold and G01–G07 meanings unchanged.** Historic v2.1 runs remain pinned to their original criteria.

## 1. Why a new gate is necessary

A polished single-page Homepage can earn 95/100 for an assignment that requires **a connected multi-page website**. This is a *scope-validity failure*, not evidence that its layout tests or score arithmetic were wrong.

**Evaluate website coverage before a numeric PASS.** Site completeness is **non-compensatory**; it cannot be bought back with excellent functional tests or token compliance.

## 2. Mandatory website gates (W01–W06)

| ID | Check | PASS evidence | FAIL condition |
|---|---|---|---|
| **W01 Scope** | Website / explicit Landing / Web App type correctly recognized | frozen scope and decision provenance, required routes | requested website reduced to single long Home; invented route count/content |
| **W02 Architecture** | Sitemap, Route Inventory, Page Specs, company identity/business model and real user journeys cover requirements **with enough distinct sourced content** | blueprint, source/status, reference findings, distinct visitor question/content for every route | missing company/offer definition or mandatory page/role/spec/flow; route padded with invented text |
| **W03 Route coverage** | **100% mandatory routes** work as intended with direct URL, reload and correct not-found behavior | tested route matrix and actual URL/refresh evidence | missing route, all menu items return Home, direct deep link breaks |
| **W04 Journeys and interactions** | **100% essential journeys** connect working pages, CTA and valid/error states | browser-executed route transitions, test output | dead navigation, fake result, broken end-to-end purchase/inquiry path |
| **W05 Page/site design** | each page **actually fulfils its content purpose**, with meaningful business/industry fit, adequate information and useful visual composition | page-spec-to-render content checks, real 390/768/1440 family renders, content/visual differentiation notes and reference-grounded observations | Company page mostly a buyer checklist; empty/relabelled category details; content-free template cloning; unapproved theme drift |
| **W06 Content & technical readiness** | sourced/truthful content, real title/meta/linking/SEO where applicable, accessibility and security/performance checks appropriate to requested scope | page content/source registry, metadata, browser and manual evidence, identified release blockers | fictitious evidence presented as real, broken accessibility-critical action, publicly claimed unimplemented feature |

### W05: Content/meaning test **before** aesthetic polish

A compliant number of routes **does not prove** good corporate information architecture. Assess three independent questions **on the actual content and screenshots**:

1. **Corporate identity and business model:** can a reader say what this company actually does, for whom and what scope/value it genuinely offers? Is Company/About primarily an enterprise description rather than another purchase-preparation guide?
2. **Page-specific information value:** does each required page answer a distinct visitor question and add credible/synthetic-authorized substantive information beyond changing a title, three examples and a reused table? Do Home/Index/Detail/Process/Contact *each* serve the role frozen in the Blueprint?
3. **Purposeful visual communication:** are layout, typography, media and information density appropriate to those page tasks? Are there major generic cloned layouts, unexplained whitespace, tiny image/illustration reuse, empty panels or brand drift? A shared template is **allowed**, but a change of title alone does not establish a useful separate page.

**Grounded review steps:** compare each page's frozen visitor question, 2–5 meaningful content points and intended visual form against the final HTML and screenshots. Cite the route, screenshot/section, missing or misassigned content and relevant source/status. Summarize the prior [Corporate Reference Analysis](../research/CORPORATE_SITE_REFERENCE_ANALYSIS.md) as **observations about industry information needs**, not as a requirement to copy another company's site. Reviewers may disagree on aesthetics; keep aesthetic polish in V1–V5 and human acceptance.

**Decision boundary:**
- **W05 VIOLATION** when a *fundamental page role is not fulfilled*, e.g., corporate About is mostly a buyer checklist or several required detail routes have no distinct substantive information, **even if every URL works**. A failed site role is not offset by excellent tests.
- **W05 UNVERIFIED/PENDING** when crucial company/offer facts are absent, a necessary asset/source cannot be reviewed, or relevant page renders were not inspected. Do **not fabricate** content or make up a company track record to obtain CLEAR.
- **W05 CLEAR** when required page purposes and distinctive meaning are supported by sources/authorized samples and their rendered compositions permit the intended user tasks, with remaining *minor aesthetic improvements* measured under the numeric Scorecard. **A neutral/no-photo style is not itself a violation.**

This is **not** a minimum word count, mandatory photo rule, reference screenshot-similarity test, requirement for a certain number of sections, or separate arbitrary 90-point aesthetic threshold.

W01–W06 must each be **CLEAR / VIOLATION / UNVERIFIED**, with evidence and accountable source. A confirmed hard failure -> **FAIL**. Missing required proof -> **PENDING** unless already FAIL. An explicitly approved Landing Page can use W01 CLEAR with only one route; W02/W03/W04 evaluate its genuinely required scope, not pretend it is a website.

**Blueprint existence is not implementation proof.** A Page Spec that says '/products' exists but a browser that serves only '/' is a route FAIL.

## 3. Frozen acceptance and coverage matrix

Before coding, freeze mandatory routes and user journeys from the user brief:

| Route ID | URL | Page role/type | Unique sourced content | Primary CTA & next route | Mandatory | Acceptance |
|---|---|---|---|---|---|---|
| HOME | / | site entry | overview and route pathways | browse categories -> /products | yes | test entry and link |
| PRODUCT_INDEX | /products | list/index | categories and examples | select category detail | yes, if in scope | test list and route |
| CONTACT | /contact | task/form | truthful inquiry form | draft/copy or real submit | yes, if in scope | test validation/result |

These are examples, not automatic requirements. A site may need a detail, guide, publication, 404 or CMS states **only when the brief justifies them**. Each route must additionally have a **company/content source and enough unique decision-useful material**. An eight-route plan with only three categories and a generic procurement checklist may pass mechanical route testing but still fail W02/W05 or remain PENDING due to a content gap.

At QA, complete per required route:
- direct URL GET/render + refresh/revisit in the **actual deployment architecture**
- unique heading/title/content, relevant CTA action, navigation target
- no unexpected Home fallback for unknown route; correct 404 semantics as appropriate to hosting
- representative responsive/accessible screenshot by page family, plus route-level checks
- content source/provenance and metadata appropriate to public indexing

**Coverage = verified mandatory routes / frozen mandatory routes.** All mandatory routes must be verified for W03 CLEAR. A route hidden because its content is TBD remains pending, not magically complete. A required user journey counts only if it is executed and the declared result really occurred.

## 4. How to apply the existing Scorecard to a full site

Do **not** score Home only and extrapolate to the whole website.

- **A1–A5** across element, page and site: misleading/filler navigation, repeated identical page treatments, unnecessary accents and unsupported case-study/news pages.
- **V1–V5** across Home **and representative page families**: a clear enterprise identity/offer, appropriate page information density and context, useful original composition (image-based or text-led), accurate category/detail information, and site-wide editorial quality. A good Home cannot mask a poor Company page or three near-identical empty details.
- **D1–D4** across shared shell and at least one instance of each distinct family; preserve locked v1.0 tokens, accessible components and legitimate media rights.
- **F1–F4** across **all mandatory routes, essential page-to-page journeys** and relevant valid/error states. Route coverage is not optional.
- **R1–R2** across representative page-family widths and actual interactive states; accessible common navigation must also work outside Home.

Continue applying the Scorecard's total >=85, each category >=70%, and G01–G07 critical gates. **Pass = Scorecard PASS AND all W gates CLEAR AND required human product acceptance when a final release is claimed**. Distinguish agent-internal candidate from production/customer approval.

A user may reject an otherwise numerically passing site. Record that as **user acceptance FAIL** for that requested deliverable; do not rewrite the frozen scores to fit the outcome. Treat it as a calibration datum.

## 5. Website deployment / operations boundary

Previews and locally implemented sites may complete the **implementation candidate** gate without claiming production deployment. If the user requested public launch, verify actual hosting URLs, 404 HTTP response, HTTPS, links, form/API delivery, content sign-off, robots/canonical/sitemap and rollback/operator ownership as applicable. Mark release readiness **PENDING** otherwise. Do not deploy by default.

## 6. Review of historical tests

- Older [single-homepage distribution task](TEST_CASE_DISTRIBUTION.md) and quality-run01 remain legitimate **one-route** experiments at their pinned version, **not** evidence of whole-site capacity.
- New full-site test: [Distribution Website Test Case](TEST_CASE_DISTRIBUTION_WEBSITE.md).
- Research basis: [Website References](../research/WEBSITE_REFERENCES.md).

**Exit:** no website-level PASS based only on page aesthetics, a build log, a 404-looking React component with HTTP 200, or self-reported route coverage.
