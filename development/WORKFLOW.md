# Website Development Method — Structure First, Design with Purpose

**Website-first v3.0 proposal.** Original Anti-Slop protections, approved Design System v1.0 and the numerical 100-point evaluation rubric remain intact. The default user experience remains **one website brief, one Code Agent**.

## Default scope

"Website" means a connected site with real information architecture, distinct pages and working journeys. A one-route Landing Page is an **explicitly requested or approved exception**. Do not add arbitrary routes or fictitious content just to inflate the site. For an existing site, preserve the actual site map and approved brand decisions before proposing changes.

## Nine phases with four exit gates

| Phase | What the Code Agent does | Evidence | Exit |
|---|---|---|---|
| **01 Scope** | Identify audience, goals, deliverable type, required pages/functions, facts, constraints and approval owner | site scope in AI_DESIGN_PLAN.md | **G0 Scope** — website vs landing distinguished; blocking ambiguity identified |
| **02 Requirements/content + reference check** | Establish company identity, actual business model/offer, visitors and content sufficiency; inventory facts/assets; review comparable company sites (or pinned reference pack) **before IA** | company profile + content/source matrix + short reference findings | Each required page has prospective source-backed purpose, not invented credentials/filler |
| **03 IA/Sitemap** | Design content hierarchy **from available business facts and real user questions**, independent routes, main/sub navigation, index/detail/404 needs | Sitemap + route inventory | Mandatory content maps to distinct meaningful pages; no route exists only to fill a menu |
| **04 Flows and Page Specs** | Define distinct visitor question, **adequate unique content/source**, CTA, states, metadata and acceptance for **every required route**; record content gaps and user journeys | Page Specs + flow map | **G1 Architecture** — route substance and user goals verified, not merely Route IDs mapped |
| **05 Wireframe/UX** | Translate meaningful page content into **appropriate information forms**, shared shell, page-family hierarchies and desktop/mobile reading order | content-to-presentation matrix + wireframe descriptions | A corporate About page communicates the company, a buying guide the buying process, and details deliver unique information |
| **06 UI/Art Direction** | Apply locked colors, fonts, spacing and site-wide component contracts; plan informative media/rights and visual hierarchy; **freeze checklist before coding** | site composition matrix + AI_DESIGN_SCORECARD.md | **G2 Design** — approval constraints and test targets frozen |
| **07 Implementation** | Build real routing, shared layout, distinct pages, functional navigation/CTAs, content sources and actual states; CMS/API only if required | code, route and requirements coverage | Real routes/critical actions work; no content fabrication |
| **08 QA → targeted refinement → final scoring** | Test routes/flows and **page purpose, content substance, reference-grounded industry fit, visual composition and Anti-Slop**, responsive/accessibility/SEO as relevant; preserve strengths when fixing | WEBSITE_QA + W05 evidence + existing 100-point Scorecard | **G3 Acceptance** — site hard gates and weighted score both pass, not just tests/route count |
| **09 Delivery/operation** | Report routes, verified functionality, missing decisions, licensing and release readiness; deploy only with explicit authorization | delivery and optional runbook | No false release or human sign-off |

The prior six-step flow (brief, plan, build, first QA, refine, score) is now the **high-level grouping** of these website phases, not a reason to skip Site Architecture. Small sites use **one concise planning file**, not nine separate user-facing documents.

## Reference check and content-first design (inside Phase 02)

Follow [Corporate Website Reference Analysis](../research/CORPORATE_SITE_REFERENCE_ANALYSIS.md): inspect **2–3 relevant real sites when available**, or a pinned, sourced offline reference pack when browsing is unavailable. Record observed page roles, content types, CTA targets and meaningful visual communication, then explicitly state **what applies and what must not be copied**.

This is **not a separate user prompt, mandatory multi-agent review, website clone or design approval meeting**. In the same Site Blueprint, record a **Company Profile** (business identity, customers, genuine services/operating model, sources) and **content adequacy** before creating the Sitemap. For a fictional experiment, use an **authorized and fixed synthetic content fixture**; never make up public credentials to increase page count. If essential business information is missing in a production request, mark CONTENT_GAP / PENDING or ask only a consequential question instead of inventing it.

**Do not make the Agent create a number of routes first and then fill them with procurement advice.** A route's purpose and unique content must be established together, with a meaningful user need.

## Default project records

1. **docs/AI_DESIGN_PLAN.md:** a compact Site Blueprint containing Scope, content provenance, Sitemap, route table, Page Specs, cross-page flows, wireframe and Art Direction.
2. **docs/AI_DESIGN_SCORECARD.md:** frozen common 20 scoring criteria and website hard gate targets, first/final ratings with evidence.
3. **docs/WEBSITE_QA.md:** executed route/requirements matrix, journeys, screenshots and technical findings. For small sites this can be a scorecard section; larger sites can split per-page documents.

Templates: [PROJECT_TEMPLATES.md](PROJECT_TEMPLATES.md). Page Specs and wireframes may be Markdown/text diagrams rather than mandatory Figma. Neither CMS, backend nor separate Agent team is automatically required.

## Non-compensatory scope and quality decisions

**A site requiring independent routes cannot PASS with one long Home and anchors, nor can a full set of routes PASS if their page-purpose content is empty or incorrectly reassigned.** Before using the numeric Scorecard, apply the [Website Quality Gate](../validation/WEBSITE_QUALITY_GATE.md): route/page completeness, real browser navigation, distinct page roles, evidence and actual journeys. An excellent landing-page score cannot compensate for missing site structure.

First visual QA is diagnostic. After at most two normal targeted repair passes, re-test affected routes, preserve existing informative visuals and reject regressions. Then apply the unchanged 100-point score (85 minimum, 70% per area, critical gates clear), plus mandatory site hard gates. **FAIL or PENDING cannot be re-labelled PASS by the agent.**

Major IA/brand/real content decisions remain accountable to the user/PO. The Code Agent may draft and implement approved assumptions, but cannot sign off on behalf of a human.

## Optional multi-agent arrangement

A single Agent may perform UX planning, design, frontend and QA responsibilities in order; distinguish *functions* from distinct human approvals. Use [Role Boundaries](RESPONSIBILITIES.md) for human Accountable vs Agent Responsible decisions. A separate Critic is optional, receives the frozen Sitemap/Page Specs and screenshots first, and uses the **same rules**. Do not ask the user to coordinate routine agent steps.

This methodology was expanded using the user-supplied Corporate Website Standard Procedure & R&R. See [Website References](../research/WEBSITE_REFERENCES.md).
