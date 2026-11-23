# AI Design — Website-first Code Agent Instructions

**Mission:** Given **one normal website brief**, build a coherent, reliable, professionally designed **website** with Anti-Slop, not just a polished Landing Page. **This repository defines reusable Code Agent rules, not a website-building product or its technical architecture.** The rules may later be used by an external easy website-builder service. Keep the user's original design approvals. A single Code Agent can perform the workflow internally; extra agents are optional.

## Read this hierarchy first

1. [Project Charter / immutable user decisions](governance/PROJECT_CHARTER.md). Explicit user requirements, truthful working behavior and accessibility win; **approved Design System v1.0 tokens** must not be silently changed.
2. [Anti-Slop v2.1](governance/ANTI_SLOP.md) + [Website-wide Anti-Slop](governance/WEBSITE_ANTI_SLOP.md). Guard against fake corporate information, purposeless elements, **fake page depth**, duplicate templates and under-design.
3. [Design System v1.0](design-system/TOKENS.md) with [Colors](design-system/COLORS.md), [Typography](design-system/TYPOGRAPHY.md), [Layout](design-system/LAYOUT.md), [Assets](design-system/ASSETS.md), [Components](design-system/COMPONENTS.md), plus [Site System](design-system/SITE_SYSTEM.md) and the **project-scoped [Look Contract](design/LOOK_CONTRACT.md)**. Keep approved white/Neutral + Wanted Sans as the default; **a specifically user-approved Look may override only the documented project-level values**, never silently change global v1.0.
4. [Site Architecture](design/SITE_ARCHITECTURE.md), [Corporate Reference Analysis](research/CORPORATE_SITE_REFERENCE_ANALYSIS.md), [Art Direction](design/ART_DIRECTION.md), **[Visual-first Method](design/VISUAL_FIRST.md)**, [Website Workflow](development/WORKFLOW.md), [Implementation](development/IMPLEMENTATION.md), [Project Templates](development/PROJECT_TEMPLATES.md) and [Role Boundaries](development/RESPONSIBILITIES.md).
5. [Website Quality Gate](validation/WEBSITE_QUALITY_GATE.md) **before** [unchanged historic 100-point Scorecard](validation/SCORECARD.md), with [Visual QA](validation/VISUAL_QA.md) and **independent [Visual Acceptance](validation/VISUAL_ACCEPTANCE.md)**. The owner's acceptance, not the agent's self-score, is the design quality judgment.

When ai_design is a sibling reference repository, **explicitly read these actual file paths** and record the revision. Do not assume the CLI loaded them automatically. Do not re-ask a known palette/image preference.

## Default workflow, performed without repeated user prompts

1. **Scope / company model / content:** identify Website vs explicitly approved Landing Page vs Web App; for a corporate site, state **what business the company actually conducts, for whom, what it provides and which claims have sources**. Do not inflate route count or fabricate missing enterprise identity.
2. **Industry reference → IA / Page Specs:** study **2–3 comparable, real corporate sources when available**, otherwise use and label pinned/offline observations. Capture transferable content and navigation principles, **not copied visuals or competitor claims**. Before coding, freeze Sitemap, routes, **distinct visitor questions and adequate sourced content** for each Page Spec, plus cross-page journeys in one compact Site Blueprint.
3. **Look Contract + Visual-first Art Direction:** map real company/category content to page roles. Preserve the approved theme, or apply an explicitly selected **project-scoped Look** with recorded token overrides. Before whole-site UI, create a compact visible Brand Kit, **render a finished opening and representative inner page**, and inspect their desktop/mobile screenshots as the implementation target. An About page explains the enterprise; detail pages provide category-specific value. Informative imagery is allowed with rights, never fabricated business proof.
4. **Pre-code checklist:** record the Look source/approval, visual target state, page-family expression map, 20 unchanged Scorecard criteria and W01–W06 hard gates. Freeze route/content/quality acceptance targets **before final implementation**. Keep this in the compact project-side Blueprint and Scorecard, not mandatory extra documentation.
5. **Implement:** real routes/direct URLs/refresh, shared Header/Footer, purposeful differentiated pages, working links/CTAs/forms/states; CMS/API/SEO/security detail only where the scope warrants. Prefer approved React + shadcn/ui + Tailwind direction unless project technology or a documented justified choice calls for another; native semantics are allowed when appropriate.
6. **First QA:** inspect rendered 390/768/1440 screenshots for representative page families; **compare the finished opening and internal page against the earlier visual target**, testing whether the selected Look's visual identity survived. Test every route, direct entry/refresh, cross-page journeys and unknown-route recovery. Audit W05 content adequacy alongside element/page/site Anti-Slop, repeated ornamental icons/arrows and under-design; route existence alone cannot establish W05 CLEAR.
7. **Fix + final QA:** fix substantive failures without deleting strengths. Recheck affected routes and before/after visual quality. **No PASS** if required site scope or W gates are missing, even if the old 100-point rubric yields 95.
8. **Report:** implemented routes, selected Look/approval source, visual target match, route/requirement coverage, actual tests, **unchanged historic** 100-point grades, W01–W06, **human visual acceptance separately**, unresolved TBD and release state. No human approval, saved chat edit, hosted preview or deployment claim unless actually obtained/performed.

For an **explicit Landing Page** request, record that scope decision and evaluate its actual required single route; do not arbitrarily create multiple pages. For **website** requests, a single Home with anchors is not a completed site.

## Non-negotiables

- No fake stats, customers, certifications, news, case studies, stock, facility evidence, success messages, links, empty depth or ornamental slop.
- No arbitrary brand colors/typography changes: only explicitly approved **project-scoped Look** changes may supersede the v1.0 defaults; no identical Hero/cards template copied across routes.
- Purposeful photos, clear comparison tables, editorial composition, meaningful section differences **are permitted**. Anti-Slop is not Minimalism.
- Build/axe success, 8/8 routes and a high self-score do **not** prove useful corporate content, credible page purposes or human acceptance. If a fixed route lacks adequate approved information, mark **CONTENT_GAP / PENDING**, not fabricated metrics or filler. A changed plan/IA must be disclosed rather than silently reconstructed to pass QA.
- Do not commit/push/deploy as a side effect of implementation unless asked.

**Approval mode:** In a normal one-prompt Code Agent run, create and inspect visual targets internally and label them `AGENT_PROPOSED`; do not pause for routine approvals. When the **user explicitly requests staged approval**, show the visual target and pause before the full build. This rulebook does not define any Builder UI, persistent project store or publishing feature.

An isolated Critic may participate only as an optional escalation, using the same frozen Site Blueprint, project Look, visual targets, scorecard and regression requirements.
