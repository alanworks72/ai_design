# Website Information Architecture & Page Design Method

**Website-first norm:** Decide the **website's structure** before drawing the Homepage. Source: user-supplied enterprise website process & R&R document, complemented by [NN/g IA vs Sitemap](https://www.nngroup.com/articles/information-architecture-sitemaps/). A Sitemap is **one artifact of IA**, not IA itself.

## 1. Scope decision

Classify the requested deliverable:
- **Website (default for 'website'):** multiple routes whose pages have distinct purposes; a coherent navigation system and connected user journeys.
- **Explicit landing page:** one approved route intended for a narrow conversion flow. Do not silently interpret a website request as this.
- **Web application:** route structure plus state/data/auth/workflows appropriate to the request; page structures and backend needs must be decided from requirements, not invented.
- **Existing site revision:** start from its current route map and content, preserve approved contracts and only expand scope with permission.

Determine audience, site goal, business/content facts, essential actions and what is **out of scope**. Do **not** default to an arbitrary fixed page count; derive routes from distinct user tasks and source material. If the user asks for a multi-page website but specific routes are not supplied, draft a minimal coherent Sitemap and document assumptions. Ask one concise question only if an unknown decision materially changes IA/legality/required functionality.

## 2. Required pre-code site blueprint

In one compact project-side `docs/AI_DESIGN_PLAN.md`, preserve the distinct roles:

| Artifact / section | It answers | Minimum content |
|---|---|---|
| Scope & content inventory | What are we building, and which facts exist? | site type, audience, required/optional content with `VERIFIED / FICTIONAL_SAMPLE / TBD`, non-goals |
| **IA and Sitemap** | Which pages are needed, and how are they related? | top-level areas, hierarchy, navigation grouping, required routes |
| **Route inventory** | What concrete URL can a visitor open? | Route ID, URL, page type, nav parent, direct-link behavior, status |
| **User journeys** | How does a visitor finish a task across routes? | entry → intermediate → target, each action and expected result |
| **Page Specs** | What does each route do and contain? | audience, distinct purpose, unique content + source, primary/secondary CTA and destination, states, page title/meta, acceptance |
| **Wireframe / UX** | How is information arranged before styling? | textual or diagrammatic desktop/mobile hierarchy, header/footer/breadcrumb rules, state placement |
| **Art Direction** | How should it look, within approved design? | page-family compositions, shared visual language, informed media choice, responsive variants |
| **Frozen acceptance** | What demonstrates this website exists and works? | route/function coverage and per-page evidence linked to [Website Quality Gate](../validation/WEBSITE_QUALITY_GATE.md) |

Keep this **one blueprint** for a modest site; split into `pages/*.md`, Figma or separate content inventory only when the project scale requires it. A Code Agent does not need nine user-facing documents to implement a five-page website.

## 3. Page types and template responsibilities

| Type | Typical purpose | Distinct content / interaction |
|---|---|---|
| Home `/` | explain offering, establish hierarchy, direct users | overview, differentiated links to real secondary pages; not a copy of all detail pages |
| Company/About | who the organization is | verified identity/role, services, relevant verified evidence; no invented timeline/team |
| Category/index | explore available areas | scannable comparison, meaningful category links and next action |
| Detail | understand one specific subject | distinct details, examples/specifications with source, related pages and conversion |
| Process/Guide | understand procedures | actual stages, required preparation, exceptions and next step |
| Contact/Inquiry | complete a task | real form/contact channels, validation, states and truthful confirmation |
| Article/news/case | read source-backed content | actual source, dates and author/provenance; don't invent cases to fill a navigation template |
| Not-found `404` | recover from missing route | truthful missing-state + helpful navigation; correct HTTP semantics where deployment allows |

Use **site-specific page types**; do not generate the entire table as empty placeholders. Shared layout and component styles are reused, but each route's composition follows its purpose.

## 4. Site-level navigation contract

- Every navigation label points to an **existing, meaningful route**, or a legitimate on-page anchor within that route. Menu sections cannot counterfeit a multi-route website.
- Links to substantive pages use real URL paths (not `#/company` as a stand-in for separate pages). Direct URL load and refresh work on the chosen deployment architecture.
- One global navigation model; page-aware active state only when true; mobile menu, focus and keyboard semantics. Breadcrumbs/back links where hierarchy warrants them, not as filler.
- For public indexable sites: descriptive URLs, per-route title/description, crawlable `<a href>` links, canonical/robots/sitemap when applicable. A client-rendered SPA may work but requires a deliberate SEO/indexability decision.
- No dead-end CTA. A browser journey must connect the Home, relevant detail and the final task.

## 5. Change control and content integrity

Do not invent logo/customer names, case studies, certifications, stock, capabilities or publishing dates. For missing information, preserve `TBD` in **planning** and explicitly designate reviewable mock data or content-blocking status. Do not display a fact as verified merely because a site needs more content.

If requested scope/required routes change after blueprint freeze, update the relevant Page Specs, route matrix and acceptance criteria **with the user decision documented**. Do not silently compress multiple pages into Home to shorten implementation.

## 6. Concrete website acceptance example

For fictional B2B `가온유통`, a *possible* structure is Home `/`, Company `/company`, Categories `/products`, category detail routes (only if unique category data exists), Process `/process`, and Inquiry `/contact`. Each has different content and CTA, and flows such as **Home → Products → Contact**. This is an example; freeze the actual brief before implementation.

**Exit Gate:** every mandatory route has a purpose, page spec, content source/status and a testable role in a user journey. Do not start UI implementation while a material scope question is unresolved.
