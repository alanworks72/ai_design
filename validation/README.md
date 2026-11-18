# AI Design — Validation and Reproducible Experiments

Distinguish **routine Code Agent work** from **controlled methodology experiments**.

For ordinary work, start from [AGENTS.md](../AGENTS.md) and the **mandatory internal [Development Workflow](../development/WORKFLOW.md)**. Before UI code, freeze a project plan/checklist using [Templates](../development/PROJECT_TEMPLATES.md). After actual screens and tests, grade the **fixed [100-point Scorecard](SCORECARD.md)**. [Visual QA](VISUAL_QA.md) and [Review Checklist](../governance/REVIEW_CHECKLIST.md) operationalize the same contract.

A user provides **one brief**, and a single agent normally handles the stages internally. Scores are agent-provisional, with 85/100 and 70%-per-category as **hypothesized project cutoffs**, not empirically validated standards. Independent agents are optional; unverified evidence is PENDING.

## Experiments (explicitly requested)

1. Pin methodology revision, fixed brief, model/effort when observable, runtime, source and asset rights. Historical Baseline/Governed tasks retain their original pinned rule versions.
2. Change **one declared variable** at a time where practical. Separate Governance effects from Design System, visual direction, initial code reuse, extra user prompts and model stochasticity.
3. Preserve source/lockfile, initial/final screenshots (390/768/1440), computed styles, functional checks, axe data and actual commands.
4. Apply the **same frozen rubric** and evaluate independently:
   - **Design System compliance** (approved style values, no unauthorized re-theme),
   - **Anti-Slop** (deceptive/unrelated/generic effects),
   - **Functional/accessibility** (actions/states/responsive),
   - **Visual quality** (domain recognition, coherent composition, editorial polish).
5. If a Critic proposes revisions, require explicit **Preserve / Change / Avoid** and evaluate actual original-vs-revision quality. **Reject design regressions**, even when individual complaints were resolved.
6. Record full category scores, critical-gate status and evidence, plus human/agent assessment origin. Use independent human HITL for commercial visual release. A model's self-critique or another model's review does not count as human approval.

Repeat matched conditions when claiming reproducible improvements; one well-designed screenshot is not a causal estimate. Unrun tests are PENDING, not PASS.

[Multi-agent evaluation](MULTI_AGENT_EVALUATION.md) is an **optional research workflow**, not a requirement to produce a basic webpage. Multi-device artifacts may be managed using [MULTI_DEVICE_WORKFLOW.md](MULTI_DEVICE_WORKFLOW.md).


## Current controlled pilot (optional)

[Generation quality and score reliability protocol](QUALITY_SCORE_VALIDATION.md) pins the existing normative methodology and separates **fresh creation**, **independent scoring of the same artifact**, **human calibration**, and **repeat-run stability**. It includes one generation prompt and one blind-review prompt, plus an optional [arithmetical scorecard checker](tools/scorecard_check.py). **This experiment does not alter the normal Code Agent workflow or approved Design System.**

## Website-first validation (earlier experiments preserved)

Use [Website Quality Gate](WEBSITE_QUALITY_GATE.md) W01–W06 before the unchanged [100-point Scorecard](SCORECARD.md) for website requests. [Site Architecture](../design/SITE_ARCHITECTURE.md) and [Site System](../design-system/SITE_SYSTEM.md) are the new normative scope and shared component sources. [Multi-page Gaon test](TEST_CASE_DISTRIBUTION_WEBSITE.md) is an **independent website experiment**. Earlier [single-Homepage tests](TEST_CASE_DISTRIBUTION.md) and quality-run01 retain their original scope, prompt and scores; they must never be relabeled as whole-site tests. See [Website References](../research/WEBSITE_REFERENCES.md).

## Corporate information quality and matched-case pilot

Read [Corporate Reference Analysis](../research/CORPORATE_SITE_REFERENCE_ANALYSIS.md) for grounded official B2B sites and UX findings. [Corporate-content V2 task](TEST_CASE_DISTRIBUTION_CORPORATE_V2.md) provides **authorized fictional company identity/business model and differentiating category details** to avoid empty company pages. It is a **new fixed input condition**, not a retrofit of historical v3.0 run01. Use it in both pinned v3.0 and candidate instructions if making a matched methodology comparison; do not compare the old sparse-content 93.75 to a newly enriched prompt as if only rules changed.
