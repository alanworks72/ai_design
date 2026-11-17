# AI Design — Validation and Reproducible Experiments

Distinguish **routine Code Agent work** from **controlled methodology experiments**.

For ordinary work, start from [AGENTS.md](../AGENTS.md), use the [Review Checklist](../governance/REVIEW_CHECKLIST.md) and [Visual QA](VISUAL_QA.md), and deliver with accurate PASS/FAIL/PENDING notes. One task prompt and one agent is the default; extra agents and independent model evaluations are optional escalations.

## Experiments (explicitly requested)

1. Pin methodology revision, fixed brief, model/effort when observable, runtime, source and asset rights. Historical Baseline/Governed tasks retain their original pinned rule versions.
2. Change **one declared variable** at a time where practical. Separate Governance effects from Design System, visual direction, initial code reuse, extra user prompts and model stochasticity.
3. Preserve source/lockfile, initial/final screenshots (390/768/1440), computed styles, functional checks, axe data and actual commands.
4. Evaluate independently:
   - **Design System compliance** (approved style values, no unauthorized re-theme),
   - **Anti-Slop** (deceptive/unrelated/generic effects),
   - **Functional/accessibility** (actions/states/responsive),
   - **Visual quality** (domain recognition, coherent composition, editorial polish).
5. If a Critic proposes revisions, require explicit **Preserve / Change / Avoid** and evaluate actual original-vs-revision quality. **Reject design regressions**, even when individual complaints were resolved.
6. Use independent human HITL for commercial visual release. A model's self-critique or another model's review does not count as human approval.

Repeat matched conditions when claiming reproducible improvements; one well-designed screenshot is not a causal estimate. Unrun tests are PENDING, not PASS.

[Multi-agent evaluation](MULTI_AGENT_EVALUATION.md) is an **optional research workflow**, not a requirement to produce a basic webpage. Multi-device artifacts may be managed using [MULTI_DEVICE_WORKFLOW.md](MULTI_DEVICE_WORKFLOW.md).
