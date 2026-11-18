# Website Quality Gate — Site Completeness Before Page Scores

**Website-first validation extension** (v3.0 proposal). This is **in addition to** the existing [100-point Scorecard](SCORECARD.md). **Keep its 20 criteria, 25/25/20/20/10 weights, 85 threshold and G01–G07 meanings unchanged.** Historic v2.1 runs remain pinned to their original criteria.

## 1. Why a new gate is necessary

A polished single-page Homepage can earn 95/100 for an assignment that requires **a connected multi-page website**. This is a *scope-validity failure*, not evidence that its layout tests or score arithmetic were wrong.

**Evaluate website coverage before a numeric PASS.** Site completeness is **non-compensatory**; it cannot be bought back with excellent functional tests or token compliance.

## 2. Mandatory website gates (W01–W06)

| ID | Check | PASS evidence | FAIL condition |
|---|---|---|---|
| **W01 Scope** | Website / explicit Landing / Web App type correctly recognized | frozen scope and decision provenance, required routes | requested website reduced to single long Home; invented route count/content |
| **W02 Architecture** | Sitemap, Route Inventory, Page Specs and real user journeys cover requirements | blueprint with distinct route IDs, purpose, content status, CTA and flow | missing mandatory page/role/spec/flow; orphaned required content |
| **W03 Route coverage** | **100% mandatory routes** work as intended with direct URL, reload and correct not-found behavior | tested route matrix and actual URL/refresh evidence | missing route, all menu items return Home, direct deep link breaks |
| **W04 Journeys and interactions** | **100% essential journeys** connect working pages, CTA and valid/error states | browser-executed route transitions, test output | dead navigation, fake result, broken end-to-end purchase/inquiry path |
| **W05 Page/site design** | each distinct page family serves its task; shared style is coherent without cloning | actual 390/768/1440 renders per page family, page/element/site Anti-Slop assessment | filler routes, identical template repeated regardless of purpose, unauthorized theme drift |
| **W06 Content & technical readiness** | sourced/truthful content, real title/meta/linking/SEO where applicable, accessibility and security/performance checks appropriate to requested scope | page content/source registry, metadata, browser and manual evidence, identified release blockers | fictitious evidence presented as real, broken accessibility-critical action, publicly claimed unimplemented feature |

W01–W06 must each be **CLEAR / VIOLATION / UNVERIFIED**, with evidence and accountable source. A confirmed hard failure -> **FAIL**. Missing required proof -> **PENDING** unless already FAIL. An explicitly approved Landing Page can use W01 CLEAR with only one route; W02/W03/W04 evaluate its genuinely required scope, not pretend it is a website.

**Blueprint existence is not implementation proof.** A Page Spec that says '/products' exists but a browser that serves only '/' is a route FAIL.

## 3. Frozen acceptance and coverage matrix

Before coding, freeze mandatory routes and user journeys from the user brief:

| Route ID | URL | Page role/type | Unique sourced content | Primary CTA & next route | Mandatory | Acceptance |
|---|---|---|---|---|---|---|
| HOME | / | site entry | overview and route pathways | browse categories -> /products | yes | test entry and link |
| PRODUCT_INDEX | /products | list/index | categories and examples | select category detail | yes, if in scope | test list and route |
| CONTACT | /contact | task/form | truthful inquiry form | draft/copy or real submit | yes, if in scope | test validation/result |

These are examples, not automatic requirements. A site may need a detail, guide, publication, 404 or CMS states **only when the brief justifies them**.

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
- **V1–V5** across Home **and representative page families**: task-specific hierarchy, varied but consistent compositions, product detail usefulness, site-wide editorial quality. A good Home cannot mask unusable detail pages.
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
