# Website Development Method — Structure First, Design with Purpose

**Website-first v3.0 proposal.** Original Anti-Slop protections, approved Design System v1.0 and the numerical 100-point evaluation rubric remain intact. The default user experience remains **one website brief, one Code Agent**.

## Default scope

"Website" means a connected site with real information architecture, distinct pages and working journeys. A one-route Landing Page is an **explicitly requested or approved exception**. Do not add arbitrary routes or fictitious content just to inflate the site. For an existing site, preserve the actual site map and approved brand decisions before proposing changes.

## Nine phases with four exit gates

| Phase | What the Code Agent does | Evidence | Exit |
|---|---|---|---|
| **01 Scope** | Identify audience, goals, deliverable type, required pages/functions, facts, constraints and approval owner | site scope in AI_DESIGN_PLAN.md | **G0 Scope** — website vs landing distinguished; blocking ambiguity identified |
| **02 Requirements/content** | Inventory mandatory functional and nonfunctional requirements, content/asset sources, statuses VERIFIED / FICTIONAL_SAMPLE / TBD | content/requirements matrix | Each mandatory item has acceptance criteria; no invented proof |
| **03 IA/Sitemap** | Design content hierarchy, independent routes, main/sub navigation, index/detail/404 needs | Sitemap + route inventory | Mandatory site content maps to distinct meaningful destinations |
| **04 Flows and Page Specs** | Define page purpose, unique content, CTA destination, states, metadata and acceptance for **every required route**; define cross-route user journeys | Page Specs + flow map | **G1 Architecture** — routes, requirements, pages and journeys traceable |
| **05 Wireframe/UX** | Decide shared shell, distinct page-family information order and desktop/mobile reading sequence | compact wireframe descriptions | Page types differ where their user jobs differ |
| **06 UI/Art Direction** | Apply locked colors, fonts, spacing and site-wide component contracts; plan informative media/rights and visual hierarchy; **freeze checklist before coding** | site composition matrix + AI_DESIGN_SCORECARD.md | **G2 Design** — approval constraints and test targets frozen |
| **07 Implementation** | Build real routing, shared layout, distinct pages, functional navigation/CTAs, content sources and actual states; CMS/API only if required | code, route and requirements coverage | Real routes/critical actions work; no content fabrication |
| **08 QA → targeted refinement → final scoring** | Test direct URL/refresh for every required route, representative viewports per page family, cross-page journeys, accessibility, SEO/security/performance as applicable; preserve strengths when fixing | WEBSITE_QA + existing 100-point Scorecard | **G3 Acceptance** — site hard gates and weighted score both pass |
| **09 Delivery/operation** | Report routes, verified functionality, missing decisions, licensing and release readiness; deploy only with explicit authorization | delivery and optional runbook | No false release or human sign-off |

The prior six-step flow (brief, plan, build, first QA, refine, score) is now the **high-level grouping** of these website phases, not a reason to skip Site Architecture. Small sites use **one concise planning file**, not nine separate user-facing documents.

## Default project records

1. **docs/AI_DESIGN_PLAN.md:** a compact Site Blueprint containing Scope, content provenance, Sitemap, route table, Page Specs, cross-page flows, wireframe and Art Direction.
2. **docs/AI_DESIGN_SCORECARD.md:** frozen common 20 scoring criteria and website hard gate targets, first/final ratings with evidence.
3. **docs/WEBSITE_QA.md:** executed route/requirements matrix, journeys, screenshots and technical findings. For small sites this can be a scorecard section; larger sites can split per-page documents.

Templates: [PROJECT_TEMPLATES.md](PROJECT_TEMPLATES.md). Page Specs and wireframes may be Markdown/text diagrams rather than mandatory Figma. Neither CMS, backend nor separate Agent team is automatically required.

## Non-compensatory scope and quality decisions

**A site requiring independent routes cannot PASS with one long Home and anchors.** Before using the numeric Scorecard, apply the [Website Quality Gate](../validation/WEBSITE_QUALITY_GATE.md): route/page completeness, real browser navigation, distinct page roles, evidence and actual journeys. An excellent landing-page score cannot compensate for missing site structure.

First visual QA is diagnostic. After at most two normal targeted repair passes, re-test affected routes, preserve existing informative visuals and reject regressions. Then apply the unchanged 100-point score (85 minimum, 70% per area, critical gates clear), plus mandatory site hard gates. **FAIL or PENDING cannot be re-labelled PASS by the agent.**

Major IA/brand/real content decisions remain accountable to the user/PO. The Code Agent may draft and implement approved assumptions, but cannot sign off on behalf of a human.

## Optional multi-agent arrangement

A single Agent may perform UX planning, design, frontend and QA responsibilities in order; distinguish *functions* from distinct human approvals. Use [Role Boundaries](RESPONSIBILITIES.md) for human Accountable vs Agent Responsible decisions. A separate Critic is optional, receives the frozen Sitemap/Page Specs and screenshots first, and uses the **same rules**. Do not ask the user to coordinate routine agent steps.

This methodology was expanded using the user-supplied Corporate Website Standard Procedure & R&R. See [Website References](../research/WEBSITE_REFERENCES.md).
