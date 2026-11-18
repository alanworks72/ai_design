# Website-wide Anti-Slop Governance

**Proposal:** Website-first extension of [Anti-Slop Governance v2.1](ANTI_SLOP.md). The original hard prohibitions and **approved Design System v1.0 values remain unchanged**.

## 1. What this protects

A website is a connected set of pages, user journeys, navigation, content and working features—not a collection of unrelated Hero screenshots. **A clean landing page is not a substitute for a requested website.** A single-page site is valid **only when the brief explicitly calls for it or the user approves the scope**.

Evaluate Anti-Slop at **three levels**:
1. **Element:** pointless status dots, decorative accents, fake buttons, filler cards, duplicate icons/eyebrows and unjustified image treatments.
2. **Page:** content-free large sections, generic Hero + three cards, repeated slogans, disproportionate emphasis and missing task value.
3. **Site:** fake depth (menus leading to the same Home anchors), empty or fabricated pages, near-identical layout copied across unrelated page types, invented case studies/testimonials/news/metrics and CTAs that do not complete a cross-page journey.

Both **over-decoration** and **under-design** are failures. Making everything plain text or removing informative imagery does not by itself meet this Governance.

## 2. Website-specific hard failures

- **Scope substitution:** when a multi-page website is required, building one long Home page and labeling its sections as navigation destinations. Intra-page anchors are allowed for actual sections, but never to counterfeit independent routes.
- **Fabricated breadth:** creating an About timeline, client portfolio, news archive, solution/product details, CMS, search results, login, checkout or FAQ content that has no credible supplied source. Record missing facts as `TBD` in project planning; do not publish fabricated claims.
- **Fake navigation and features:** menu labels with no distinct meaningful destination, links to empty page shells, filter/search controls with no real behavior, “sent successfully” for local-only forms.
- **Template cloning:** applying an identical page structure, Hero, Callout, three-card grid and CTA stack to every route irrespective of that page's user task.
- **Brand drift:** changing user-approved colors, type scale or design tokens across routes or introducing arbitrary page-specific visual themes under the pretext of differentiation.
- **Unreviewed coverage:** claiming the site is done when required routes, direct URL access, navigation paths, responsive states or essential content remain unverified.

A bare route count does **not** show website quality. Meaningful pages are justified by the content and user journeys in a frozen Sitemap and Page Spec.

## 3. Positive design freedom

- A coherent shared Header/Footer/navigation can coexist with **different page templates**: introduction, category listing, detail, process/guide, contact, articles when backed by content.
- Use informative category photography, product/context imagery, comparison layouts, diagrams, typography hierarchy, editorial spacing and functional panels **within the selected Design System and image rights**.
- Reuse components **for consistent behavior**, not to make every page look identical. Distinct page roles should produce meaningful composition differences.
- A Homepage may summarize and link to detail pages without reproducing all their content. Repeated *navigation labels* are allowed; repeated substantive text that adds no new information is suspect.
- Accessible links, breadcrumbs, filters and page indicators are not decorations when they convey real position, relationships or state.

## 4. Specific deletion / replacement test

For a questionable Border, Callout, Arrow, Badge, repeated section **or entire route**:
1. Identify the user task, meaning and evidence supporting it.
2. Inspect the content **separately** from its wrapper or template.
3. Ask whether the treatment/route adds a distinct function, discoverability or visual comprehension.
4. Compare a minimal alteration **without deleting useful content or site depth**. If a meaningful image is misleading, prefer a more representative, rights-cleared substitute rather than indiscriminate removal.
5. Inspect actual renders across representative routes and breakpoints; reject regressions.

A secondary About page is not Slop merely because its title appears on Home; it is Slop if it exists only as an empty duplicate to inflate the route count.

## 5. Responsibility / evidence

- **Governance:** applies these prohibitions and grants **no authority** to rewrite approved tokens.
- **Site Architecture:** owns the route inventory, Page Specs and content sources. See [SITE_ARCHITECTURE.md](../design/SITE_ARCHITECTURE.md).
- **Design System:** owns coherent site-wide component/style contracts. See [SITE_SYSTEM.md](../design-system/SITE_SYSTEM.md).
- **Development Method:** enforces implementation order, real interactions and route coverage.
- **Validation:** inspects Element + Page + Site and distinguishes self-review from user acceptance.

Never convert a real unknown business fact into a plausible-looking website claim in order to pass a design or completion score.
