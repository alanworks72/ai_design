# Website Implementation Method — Route Coverage and Real User Journeys

**Website-first v3.0 proposal.** Apply [WORKFLOW](WORKFLOW.md), [Site Architecture](../design/SITE_ARCHITECTURE.md), [Site System](../design-system/SITE_SYSTEM.md), [Website Quality Gate](../validation/WEBSITE_QUALITY_GATE.md) and the approved project [Look Contract](../design/LOOK_CONTRACT.md) or unchanged v1.0 default tokens.

## 1. Before touching UI

- Inspect actual project, global/local AGENTS instructions, existing stack, lockfile, routes, source files and deployment needs. Explicitly load external sibling ai_design instructions; record the pinned revision.
- Classify static informational site, CMS site, service-connected site or web app **from real requirements**. Do not invent a backend, login, dynamic search or publishing system.
- Freeze the Site Blueprint and acceptance **before full UI implementation**: Sitemap, required routes, Page Specs, truthful content/source status, journeys, **approved Look/default**, rendered [Visual-first](../design/VISUAL_FIRST.md) opening and inner-page target (or explicit UNVERIFIED), and test expectations.
- Treat content not supplied as **TBD in project notes**, not invented public facts. Explicit fictional samples are allowed only within stated brief; assets require user-authorized rights.
- Choose one coherent routing/deployment strategy. The React + shadcn/ui + Tailwind direction remains where appropriate, but existing stack and justified native semantics are allowed. Framework boilerplate does not override approved tokens.

## Corporate content-to-code contract

Before creating routes/templates, read the Site Blueprint's **Company Profile, source status, Reference Findings and per-route visitor question** ([Site Architecture](../design/SITE_ARCHITECTURE.md)). Convert them to a concrete **page-content inventory**:

- **Home:** a truthful organization/business proposition, target visitors and real destinations to business areas; never only a procurement worksheet.
- **Company/About:** what the company does, its customers, operating/service model and supported offering. Do **not** automatically place a buyer's packaging/quantity checklist here.
- **Index and detail:** real/authorized fictional category differences, useful examples/specification criteria and next actions. A reusable component is fine, but different titles with identical generic details are **not** an adequate website.
- **Process:** what happens after an inquiry, responsibility boundaries and relevant customer preparation.
- **Contact:** the action that is actually implemented, with honest error/success/fallback.

Where a required page lacks adequate approved content, retain `CONTENT_GAP` in planning/QA and seek material input or mark PENDING; **do not fabricate an About-history, certifications, supplier network or company KPIs** to make the layout look complete. Illustrative test fixture facts are allowed only as explicitly authorized synthetic inputs.

Implementation must not turn **page layout and route coverage into proxy measures for enterprise content quality**. Test source-backed page role before polishing borders, color and imagery.

## 2. Build order

1. Implement the **frozen route structure**, including a truthful not-found behavior. Use independent URLs, not fake hash routes or one Home with section anchors standing in for real pages.
2. Build accessible global Header/Footer, route navigation, mobile menu, focus/skip, and breadcrumbs only for actual hierarchy.
3. **Using the already-rendered visual target** and frozen Look/default, build one representative page per required family (Home, index, detail, guide, task/contact, article where justified). Reuse navigation and identity roles without cloning one Hero/three-cards composition.
4. Populate route-specific content and truthful CTA destinations, accessible states, page titles and metadata. Separate verified sources from example data and pending production copy.
5. Implement required cross-page workflows, including form validation/recovery and real API/CMS integration **only** if explicitly required.
6. Confirm every required route is directly reachable, the browser refreshes into the same page, and unknown URLs do not silently look like Home.

Possible code separation: shared site layout + components; page-family templates; route-specific pages and sourced data; optional service adapters. The actual framework is project-specific, not prescribed by this folder suggestion.

## 3. Website-wide Anti-Slop during implementation

Inspect three scopes:
- **Element:** each prominent accent border, callout, icon, dot, panel, image, arrow or animation has independent purpose beyond its content.
- **Page:** section order and content are meaningful; not every route gets the same Hero/cards/CTA template.
- **Site:** no fake navigation depth, empty route shells, duplicated marketing copy, invented case studies or changing palette per route.

Do not delete informative images or entire pages merely to silence a critique. Use Preserve / Change / Avoid; compare before/after professional quality across representative routes.

## 4. Browser and technical test matrix

For **every mandatory route**:
- Direct browser URL and refresh; 404/redirect semantics where server supports them.
- Destination reachable via intended navigation; real title/h1 and unique purpose/content; correct CTA action/destination.
- Applicable states, accurate content, navigation and no dead primary control.

For **each distinct page family**:
- Actual full-page 390/768/1440px screenshots, plus relevant breakpoint edges. Compare to the **pre-built visual target**; check semantics, approved project Look/default tokens, imagery, responsive layout, focus/keyboard, contrast and purposeful composition.
- One Home screenshot cannot stand in for the entire website.

For **each mandatory end-to-end user journey**:
- Execute navigation across routes, including required input and failure recovery when applicable.
- Record tests and their actual result. Verify changed journeys after modifications.

For public/production-oriented work, additionally inspect unique page title/description, crawlable links and stable URLs, canonical/robots/sitemap where applicable, truthful SEO content, appropriate performance and security. For CMS/backends, test real data/authorization/error handling. A purely local mockup cannot claim production readiness.

Use an **isolated local server/port** for browser checks to avoid testing a different app. A zero-violation axe run is not WCAG certification. Do not invent Core Web Vitals field results or deployment success.

## 5. Final delivery

Output route coverage, requirement coverage, executed journeys, per-family screenshot references, correct build/functional/accessibility outcomes, the existing frozen Scorecard and website hard-gate results, **visual-target match and independent human visual acceptance status**. Unverified evidence is PENDING. Human/brand/content approval is separate.

**Do not commit, push or deploy unless the user asked for those actions.** Local implementation and demonstration are not an authorized production release.
