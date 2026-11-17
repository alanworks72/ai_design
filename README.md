# AI Design — Anti-Slop Web Development Methodology

**Goal:** Give Codex, Claude and other Code Agents a **simple, repeatable development method** to build functional, coherent, visually finished web pages without AI Slop. The user normally supplies **one task brief**, not a series of designer/critic prompts.

**Normative style remains the user-approved Design System v1.0. Governance v2.1 is unchanged; the new Development Method operationalizes it.**

## How to use

Give the Code Agent the path to [AGENTS.md](AGENTS.md) and a normal page brief. When `ai_design` lives outside the implementation project's directory tree, instruct the agent to **open that file explicitly**; do not assume sibling files are automatically loaded.

The Agent internally performs:

```text
Understand → freeze DESIGN_PLAN + SCORECARD before implementation
           → Implement → first browser/Anti-Slop QA
           → targeted refinement → final 100-point Quality Gate
           → evidence-qualified PASS / FAIL / PENDING
```

User decisions are requested **only when material and unknown**, for example default Neutral vs branded colors or rights-checked images vs user-provided assets vs no imagery. Previously supplied decisions must not be re-asked.

## Responsibility map

| Layer | Source of truth | What it does |
|---|---|---|
| Mission & locked decisions | [Project Charter](governance/PROJECT_CHARTER.md) | Preserve originally approved style and learn from prior methodology failures |
| Anti-Slop | [Governance v2.1](governance/ANTI_SLOP.md) | Forbid purposeless/deceptive effects and fake functionality; permit purposeful design |
| Design System | [Tokens](design-system/TOKENS.md), [Colors](design-system/COLORS.md), [Typography](design-system/TYPOGRAPHY.md), [Layout](design-system/LAYOUT.md), [Components](design-system/COMPONENTS.md), [Assets](design-system/ASSETS.md) | **Locked** white/Neutral and Wanted Sans defaults, scales, component/asset policy |
| Design Method | [Art Direction](design/ART_DIRECTION.md) + [Visual Communication](governance/VISUAL_COMMUNICATION.md) | Content, imagery, page composition and hierarchy **within approved tokens** |
| **Development Method** | [WORKFLOW.md](development/WORKFLOW.md), [IMPLEMENTATION.md](development/IMPLEMENTATION.md), [PROJECT_TEMPLATES.md](development/PROJECT_TEMPLATES.md) | Plan → freeze quality checks → build → inspect → refine → conclude |
| **Quality Evaluation** | [SCORECARD.md](validation/SCORECARD.md), [VISUAL_QA.md](validation/VISUAL_QA.md), [REVIEW_CHECKLIST.md](governance/REVIEW_CHECKLIST.md) | 20 evidence-anchored criteria, hard blockers, thresholds and visual non-regression |

## Quality Gate: provisional working policy

100 points: Anti-Slop 25, Visual Quality 25, Design System 20, Functional Requirements 20, Responsive/Accessibility 10. Initial acceptance: **>=85 total AND >=70% per category**, no critical violation, verified mandatory acceptance, no unresolved major regression. An unassessed item is **UNVERIFIED**, not free credit. Actual screenshot, code and behavior evidence is required.

These weights and cutoffs are **project hypotheses**, not calibrated industry standards. AI self-assessment is **provisional**, not independent human approval.

## References and evaluation

[Research References](research/REFERENCES.md) catalogues official Codex/Claude/GitHub/Playwright/W3C/shadcn sources and relevant HCI/Code Agent research, with a mapping from evidence to our **own** design decisions.

[Validation Protocol](validation/README.md) keeps historical controlled experiments and pilot evidence separate from normative rules. [Optional multi-agent review](validation/MULTI_AGENT_EVALUATION.md) uses the same frozen scorecard; additional agents are not required for basic web development.

**Never treat the absence of decoration, a passing build, or 0 axe violations as evidence of complete professional web design.** Never silently rewrite user-approved Design System values.
