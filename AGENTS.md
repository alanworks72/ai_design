# AI Design — Website-first Code Agent Instructions

**Mission:** Given **one normal website brief**, build a coherent, reliable, professionally designed **website** with Anti-Slop, not just a polished Landing Page. Keep the user's original design approvals. A single Code Agent can perform the workflow internally; extra agents are optional.

## Read this hierarchy first

1. [Project Charter / immutable user decisions](governance/PROJECT_CHARTER.md). Explicit user requirements, truthful working behavior and accessibility win; **approved Design System v1.0 tokens** must not be silently changed.
2. [Anti-Slop v2.1](governance/ANTI_SLOP.md) + [Website-wide Anti-Slop](governance/WEBSITE_ANTI_SLOP.md). Guard against fake corporate information, purposeless elements, **fake page depth**, duplicate templates and under-design.
3. [Design System v1.0](design-system/TOKENS.md) with [Colors](design-system/COLORS.md), [Typography](design-system/TYPOGRAPHY.md), [Layout](design-system/LAYOUT.md), [Assets](design-system/ASSETS.md), [Components](design-system/COMPONENTS.md), plus [Site System](design-system/SITE_SYSTEM.md). Lock white/Neutral + Wanted Sans and existing user theme unless explicitly customized.
4. [Site Architecture](design/SITE_ARCHITECTURE.md), [Art Direction](design/ART_DIRECTION.md), [Website Workflow](development/WORKFLOW.md), [Implementation](development/IMPLEMENTATION.md), [Project Templates](development/PROJECT_TEMPLATES.md) and [Role Boundaries](development/RESPONSIBILITIES.md).
5. [Website Quality Gate](validation/WEBSITE_QUALITY_GATE.md) **before** [unchanged 100-point Scorecard](validation/SCORECARD.md), with [Visual QA](validation/VISUAL_QA.md).

When ai_design is a sibling reference repository, **explicitly read these actual file paths** and record the revision. Do not assume the CLI loaded them automatically. Do not re-ask a known palette/image preference.

## Default workflow, performed without repeated user prompts

1. **Scope / content:** identify whether the user requested a **multi-page website** (default when they say website), explicitly authorized Landing Page or Web App; record audience, tasks, supplied facts and missing/TBD content. No arbitrary route inflation.
2. **IA / Page Specs:** before writing UI, freeze a real Sitemap, required URL routes, unique purposes/content/CTA per route and at least the essential **cross-page user journeys** in a compact Site Blueprint.
3. **Wireframe / design:** plan shared navigation/layout and distinct composition for each page family, within approved v1.0 tokens. Images may be useful; ask once **only when source preference is undecided and materially affects design**. Do not invent claims or over-sanitize meaningful visuals.
4. **Pre-code checklist:** freeze the 20 common Scorecard targets and W01–W06 whole-site hard gates; ensure they assess **all required routes**, not just Home. Write project-side blueprint and scorecard before coding.
5. **Implement:** real routes/direct URLs/refresh, shared Header/Footer, purposeful differentiated pages, working links/CTAs/forms/states; CMS/API/SEO/security detail only where the scope warrants. Prefer approved React + shadcn/ui + Tailwind direction unless project technology or a documented justified choice calls for another; native semantics are allowed when appropriate.
6. **First QA:** inspect rendered 390/768/1440 screenshots for representative page families; test **every required route**, direct entry/refresh, actual cross-page journeys and unknown-route recovery. Assess Anti-Slop at element/page/site levels and design under-development.
7. **Fix + final QA:** fix substantive failures without deleting strengths. Recheck affected routes and before/after visual quality. **No PASS** if required site scope or W gates are missing, even if the old 100-point rubric yields 95.
8. **Report:** implemented routes, route/requirement coverage, real tests, 100-point grades, W01–W06, unresolved TBD and approval/release state. No independent human approval or deployment claim unless actually obtained/performed.

For an **explicit Landing Page** request, record that scope decision and evaluate its actual required single route; do not arbitrarily create multiple pages. For **website** requests, a single Home with anchors is not a completed site.

## Non-negotiables

- No fake stats, customers, certifications, news, case studies, stock, facility evidence, success messages, links, empty depth or ornamental slop.
- No arbitrary brand colors/typography changes; no identical Hero/cards page template copied across routes.
- Purposeful photos, clear comparison tables, editorial composition, meaningful section differences **are permitted**. Anti-Slop is not Minimalism.
- Build/axe success and a high self-score do not prove website completion or human acceptance. A changed plan/IA must be disclosed rather than silently reconstructed to pass QA.
- Do not commit/push/deploy as a side effect of implementation unless asked.

An isolated Critic may participate only as an optional escalation, using the same frozen Site Blueprint, tokens, scorecard and regression requirements.
