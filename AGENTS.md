# AI Design — Code Agent Instructions

**Mission:** Build meaningful, reliable, professionally designed web pages **without AI-Slop**, from **one user development brief**. Anti-Slop is **not** an instruction to remove design.

## Authoritative contract (read once per run)

1. [Project Charter — locked decisions](governance/PROJECT_CHARTER.md).
2. [Anti-Slop Governance](governance/ANTI_SLOP.md) and **approved Design System v1.0**: [Tokens](design-system/TOKENS.md), [Colors](design-system/COLORS.md), [Typography](design-system/TYPOGRAPHY.md), [Layout](design-system/LAYOUT.md), [Assets](design-system/ASSETS.md), [Components](design-system/COMPONENTS.md).
3. [Development Workflow](development/WORKFLOW.md), [Implementation Method](development/IMPLEMENTATION.md) and **fixed [Quality Scorecard](validation/SCORECARD.md)**.
4. [Art Direction](design/ART_DIRECTION.md), [Visual Communication](governance/VISUAL_COMMUNICATION.md), [Visual QA](validation/VISUAL_QA.md) and [Review Checklist](governance/REVIEW_CHECKLIST.md) as relevant to the task.

**Priority:** explicit user requirements and truthful/accessible function > **user-approved Design System** > purposeful Art Direction within that system > optional presentation details. Governance blocks Slop; it never changes approved style tokens. Preserve any established customer theme; for a new project ask once about Neutral/white versus custom only if not already decided. Ask once about **materially useful imagery** only if sourcing preference is unknown.

**Instruction loading:** If this `AGENTS.md` is in a *sibling reference repository*, do not assume Codex/Claude automatically loaded it. **Explicitly open** the specified paths, record the ai_design revision and check conflicting project/global instructions. Refer to [R01](research/REFERENCES.md).

## Required six-stage workflow — internal to the Agent

1. **Understand:** read task, actual files/environment, locked palette/type/spacing, mandatory user actions and content/rights limitations.
2. **Plan and freeze:** **before implementing UI**, write `docs/AI_DESIGN_PLAN.md` and prefill/freeze `docs/AI_DESIGN_SCORECARD.md` with the 20 fixed rubric criteria, **project-specific** acceptance/evidence targets and blockers. Use [templates](development/PROJECT_TEMPLATES.md). Do **not** assign scores yet.
3. **Implement:** produce actual working, responsive UI with approved tokens, meaningful image/text composition and true behaviors. Preferred new-project direction remains React + shadcn/ui + Tailwind; inspect installed versions; document necessary existing-stack exceptions.
4. **First review:** run real build/actions, **open** 390/768/1440 screenshots, check Design System, Anti-Slop **including individual conspicuous borders/panels/callouts**, visual quality, function and accessibility **separately**. Record defect locations and first-pass ratings.
5. **Refine:** fix observed problems with **Preserve / Change / Avoid**, compare matching before/after renders and rerun relevant tests; **do not strip useful visuals** to make a checklist pass.
6. **Final Quality Gate:** grade the **same frozen 100-point rubric** with evidence, mandatory user acceptance, critical non-compensatory gates and numeric thresholds. Output **PASS / FAIL / PENDING**, never a self-declared independent human approval. See [Scorecard](validation/SCORECARD.md).

**Provisional threshold:** >=85/100, every category >=70%, **all required evidence and acceptance complete**, no critical violation, no major regression. Ratings without evidence are **UNVERIFIED**, so do not claim PASS. Default at most two targeted refinement rounds; if still below gate, report actual FAIL/PENDING rather than silently weaken criteria.

## Non-negotiable quality boundaries

- **No** fake company claims, status dots, ornamental eyebrow stacks, purposeless accent borders/callouts/cards, unlicensed assets, dead buttons, fake form submissions or misleading outcomes.
- **Yes** to informative photography, useful illustrations, content-specific composition, true groups and appropriate emphasis. Not every border/image is Slop; test its independent contribution. **Inspect wrapper effects separately from the content inside.**
- **Visual quality and Anti-Slop are independent.** Build/axe success does not establish design success or WCAG conformance. Preserve existing informative assets and strong composition when fixing a defect.
- Do not change user-approved colors, fonts, weight/spacing scale or existing project stack without an authorized reason/decision.
- Do not edit methodology rules, commit/push or publish as a side effect of generating a page unless asked.

## Optional escalation and delivery

Use one Code Agent by default. An isolated Critic or multi-agent split may follow [optional evaluation](validation/MULTI_AGENT_EVALUATION.md), using the **same frozen requirements, rubric and non-regression gate**. Never make the user orchestrate routine QA.

Deliver actual output, brief Design Plan, screenshot/test evidence, computed rubric category scores, status and limitations. Human commercial-release approval is separate. Research basis: [verified references](research/REFERENCES.md).
