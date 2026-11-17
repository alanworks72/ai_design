# Development Method — Plan, Build, Verify, Refine, Score

Status: **normative workflow / v1.0 proposal**, under [Project Charter](../governance/PROJECT_CHARTER.md). The **approved Design System remains v1.0**; no palette/font/spacing override is introduced here.

## Purpose and operating mode

A user supplies **one normal web-development brief**. A single Code Agent must execute the stages internally; it should ask only the already-required questions about unknown user decisions (e.g., a new project's neutral/custom palette and useful imagery). The user does **not** have to manage Critic and Implementer prompts.

Two small project-side records are enough by default:
- `docs/AI_DESIGN_PLAN.md` — written **before UI implementation**; design plan, style lock, user jobs and project-specific acceptance.
- `docs/AI_DESIGN_SCORECARD.md` — the **pre-implementation frozen criteria** plus first-pass evidence, fixes and final grades. Use [project templates](PROJECT_TEMPLATES.md).

Use the same [fixed common rubric](../validation/SCORECARD.md) for each task. The agent may add *project-specific acceptance cases and evidence targets*, **not alter the 100-point rubric, weights, threshold or critical failures** to benefit its own output.

## Six mandatory stages

| Stage | Agent action | Required artifact or evidence | Exit rule |
|---|---|---|---|
| 1. Brief intake | Read applicable instructions and [Charter](../governance/PROJECT_CHARTER.md); lock Design System; extract audience, jobs, required features and truth constraints. Ask only material unresolved user decisions. | Brief summary, instruction paths + revision, locked style, technology decision | Unknown blocking brand/asset choices resolved or flagged as PENDING; no silent defaults contradict user |
| 2. Pre-implementation plan | Create design plan: IA, first-screen intent, image decision/role, content→section mapping, layout at 390/768/1440, exact CTA behavior, Preserve/Change/Avoid for revisions. Freeze rubric + **specific evidence targets** for the actual task. | Plan + checklist **before editing UI files** | Criteria frozen; required tasks and risks covered; no invented quality claims |
| 3. Implementation | Build with approved React/shadcn/ui/Tailwind direction, or documented existing/necessary stack exception. Implement semantic tokens, real responsive behavior and user interactions. | Code, source/asset provenance, functional states | Required behaviors implemented; unresolved blockers disclosed |
| 4. First review | Build/test as available; **open** actual screenshots and examine **individual conspicuous visual elements** (border/panel/dot/callout/icon/image), copy and layout; run check against frozen criteria. | Screenshot and test evidence; first-pass score/status; prioritized findings | Never set final PASS here; defects identified with filenames/element IDs |
| 5. Targeted refinement | Fix high-impact defects; keep original strengths and approved assets. Compare before/after actual screens on same environment; rerun affected tests. | Fix log, matched screenshots, regression check | Both issue improvement **and** overall visual quality preservation shown; otherwise revert |
| 6. Final Quality Gate | Re-score the **same frozen** common rubric and project acceptance; check critical gates and evidence. Emit PASS / FAIL / PENDING with reasons. | Completed `AI_DESIGN_SCORECARD.md`; short final report | PASS only under [SCORECARD](../validation/SCORECARD.md) formula and mandatory gates |

**Important:** The checklist is created and fixed *before* implementation. First review is **diagnostic**; Final Quality Gate is the completion decision. A locally written `PASS` is an **agent-internal, evidence-qualified candidate**, never a human aesthetic sign-off.

## Failures, budget and stop conditions

- **Critical violation** (fake submission, nonfunctional required CTA, unsupported claims, unapproved user style change, unlawful assets, known blocking accessibility issue): **FAIL regardless of numeric score** until fixed.
- **Missing required evidence** (no actual render, no relevant functional test) or unresolved material user decision: **PENDING**, not an invented PASS. If a known severe defect is found, record FAIL even when other evidence is missing.
- **Below 85/100**, any category below **70%**, any mandatory acceptance unsatisfied, or unresolved major design regression: **FAIL** (the numeric values are provisional, project policy; not a research result).
- Default to **two targeted refinement passes** per normal delivery to avoid endless circular iteration; if still below gate, **stop and report FAIL/PENDING with specific issues**. User-requested extra revisions can continue; never silently lower the bar.
- A "fix" that removes a useful photo, content section or distinctive information is **not** accepted unless the resulting whole page is at least as good.
- An automated passing test is evidence only for what it tested. Neither an agent's own score nor independent AI criticism is human release approval.

## Practical execution contract

```text
INPUT: task + explicit path to ai_design/AGENTS.md
READ: Charter → Governance + approved Design System → Workflow + Scorecard
PLAN: docs/AI_DESIGN_PLAN.md and frozen docs/AI_DESIGN_SCORECARD.md
BUILD: actual responsive UI with working actions
REVIEW 1: screenshot 390/768/1440 + code + functional/axe evidence + suspect decoration
FIX: targeted changes with Preserve/Change/Avoid, compare before/after
REVIEW 2: same scorecard, hard gates, evidence and stop decision
OUTPUT: user-visible page + concise PASS/FAIL/PENDING and files/limits
```

Instructions in a sibling reference repository are **not necessarily auto-loaded** into the implementation project. Explicitly open the files named by the prompt, record their revision, and check for conflicting closer/global instructions before declaring readiness. See [R01–R02](../research/REFERENCES.md).

## Optional escalation

An isolated Critic or multi-agent orchestration can perform the same stages, but must share the **frozen design constraints, rubric, task/evidence IDs, and non-regression policy**. Agent count is not an evaluation outcome.

A design problem need not trigger a new Governance revision. Diagnose failure as **instruction transport / interpretation / implementation / QA / scoring** first; change only the responsible layer.
