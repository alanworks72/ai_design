# AI Design Quality Scorecard — 100 points with non-compensatory gates

Status: **v1.0 provisional evaluation policy**. Authority: [Project Charter](../governance/PROJECT_CHARTER.md) and [Development Workflow](../development/WORKFLOW.md). This rubric **does not change** Governance v2.1 or approved Design System v1.0.

## 1. Fixed common rubric (freeze before implementation)

Rate **20 fixed criteria**, each **0–4**. Each is worth **5 points** (`criterion_points = rating × 1.25`). Do not change names, criterion count, weights, thresholds, critical gates or scoring anchors during a run.

| ID | Category | Criterion — what to observe in actual rendered UI/source |
|---|---|---|
| A1 | Anti-Slop | **Conspicuous visual devices**: borders, callouts, background panels, accent lines, icons, dots, effects individually pass the deletion test; inspect content **separately** from wrapper decoration |
| A2 | Anti-Slop | No formulaic, gratuitous visual patterns, fake editorial labels, badge/card duplication or meaningless ornamental repetition |
| A3 | Anti-Slop | No deceptive business proof, statuses, imagery ownership or simulated outcomes presented as real |
| A4 | Anti-Slop | Copy/labels are purposeful, natural, non-duplicative; CTA and link affordances match real actions |
| A5 | Anti-Slop | Asset choices and visual emphasis suit the actual domain; no unrelated stock/misleading category imagery |
| V1 | Visual quality | First screen communicates **who/what** clearly, and orients visitors to the main task |
| V2 | Visual quality | Text/image hierarchy and CTA prominence match informational importance |
| V3 | Visual quality | Informative imagery or purposeful text-led visual alternative; composition neither empty nor misleading |
| V4 | Visual quality | Whole-page section rhythm, density, distinct content roles, responsiveness of composition |
| V5 | Visual quality | Editorial polish: natural copy, typography hierarchy, coherent professional finish |
| D1 | Design System | Approved/selected palette and backgrounds; no unauthorized re-theme |
| D2 | Design System | Wanted Sans/default family, coherent approved type sizes/weights/line heights, verified rendering |
| D3 | Design System | Spacing, grid/container and responsive decisions remain within approved constraints |
| D4 | Design System | Components, radius/card policy, assets/source/licensing and framework direction respect user-approved system |
| F1 | Requirements/function | All explicitly required user jobs/content/acceptance cases implemented (not merely described) |
| F2 | Requirements/function | Navigation and primary CTA lead to real, correctly named actions |
| F3 | Requirements/function | Form/interaction states: valid/invalid/recovery, or for static sites honest navigation/error/empty-state behavior appropriate to scope |
| F4 | Requirements/function | End-to-end task, output/feedback truthfulness and regression-free state updates |
| R1 | Responsive/accessibility | Render at 390/768/1440 + actual breakpoints; no clipped controls/overflow, correct mobile ordering |
| R2 | Responsive/accessibility | Keyboard, labels, focus, contrast, reduced motion and accessibility evidence appropriate to task (axe **plus manual** review) |

**Category maximums:** A = 25, V = 25, D = 20, F = 20, R = 10; **Total = 100**.

Do not award full points to empty screens. A criterion remains applicable even when there are no images or forms: assess whether **the chosen alternative is appropriate** (e.g. V3) and the applicable interaction truth/error handling (F3). Write specific task acceptance targets in the project checklist instead of silently assigning N/A.

## 2. Common rating anchors

| Rating | Meaning | Evidence condition |
|---|---|---|
| 4 | Strong, task-appropriate implementation; no material issue observed within verified scope | Target actually inspected; screenshot + code/test where relevant |
| 3 | Good with minor identifiable improvement | Target inspected and minor issue recorded |
| 2 | Partial; visible problem or incomplete goal | Defect specifically documented; remediation needed |
| 1 | Weak; significant loss of clarity/function/visual appropriateness | Screenshot/selector/behavior supporting serious concern |
| 0 | Clear failure of criterion within scope | Evidence of wrong/unsafe/nonfunctional or wholly absent essential treatment |
| **UNVERIFIED** | Evidence missing, test not executed, or unresolved material judgment | **No numeric rating**. Overall outcome **PENDING** (or FAIL if a known hard failure already exists) |

Use actual screenshot references (`evidence/390.png`), selectors (`.hero-aside`) or file and line (`src/styles.css`), and actual test outputs. A statement such as “no fake metrics/cards” **does not score A1** unless conspicuous borders/panels/callouts were inspected.

**Example A1:** A Hero callout has useful text, a grey fill and an extra black left border. Evaluate **text, fill, and border separately**. If deleting the border loses no meaningful communication/visual hierarchy, A1 should be downgraded and the border changed; do not justify its existence merely because the text inside is useful.

## 3. Project-specific frozen acceptance (additive, not re-weighted)

Before implementation, extract **3–8 concrete cases** (`P01`…) and associate each with `F1/F2/F3/F4` or another applicable fixed criterion:
- Example `P01`: On desktop and mobile, three equal supplier categories are identifiable without inventing company stock.
- Example `P02`: Category click preselects a valid inquiry choice.
- Example `P03`: Draft-generation control does **not** imply an email was sent; copy handles rejection.
- Example `P04`: Locked white/Neutral + Wanted Sans confirmed in actual computed styles.

Requirements explicitly marked **mandatory** are **hard acceptance gates**; weaker supporting checks inform the corresponding rating. **Do not invent extra easy items** just to inflate the score or shift category weights. Freeze exact targets, evidence methods and critical flags in `docs/AI_DESIGN_SCORECARD.md` **before UI code**. User-requested changes to the brief can trigger a documented *new* plan version, not a silent edit.

## 4. Deterministic calculation

For each verified criterion `i`: `points_i = rating_i * 5 / 4` (possible values 0, 1.25, 2.50, 3.75, 5.00). Sum by category, then total. **Do not round until reporting** (two decimals max). Scores reflect a **human-readable rubric assessment**, not a calibrated measurement of aesthetic truth.

**Provisional gate:** all of the following are necessary:
1. No **critical gate violation** (section 5).
2. All 20 criteria have ratings **and evidence**; all mandatory project acceptance cases were verified.
3. **Total >= 85 / 100.**
4. **A >= 17.5, V >= 17.5, D >= 14, F >= 14, R >= 7** (each >=70% of its category).
5. When revising an existing candidate, **no major unresolved regression** in actual before/after visual/function quality.

Failing any numerical/category/mandatory gate => **FAIL**. Unresolved required evidence/decision => **PENDING**, not PASS. A known hard failure takes precedence over PENDING. `PASS` means an **agent-internal candidate** ready for user review; only actual independent human approval can close subjective commercial release review.

### Why these numbers?

The 25/25/20/20/10 split, 85 total and 70%-per-category floors are **AI Design starting policies**, **not** thresholds from Lighthouse, WCAG or a paper. They must be calibrated later against blind human judgements, domain differences and repeated projects. Track false PASS/false FAIL rather than gaming the threshold.

## 5. Critical (non-compensatory) gates

`G01` Deceptive/unsupported business claims or fictional evidence treated as real.  
`G02` Primary required task/CTA broken, fake success or action semantics contradict actual behavior.  
`G03` Unapproved changes to locked user colors, font, theme or essential Design System; prohibited unsafe framework deviation.  
`G04` Unlicensed/unverified redistribution of relevant asset when ownership/rights are required.  
`G05` Known serious or critical accessibility blocker, inaccessible primary action or unresolved high-impact WCAG failure in tested scope.  
`G06` **A prominent purposeless visual device** (e.g., a hero accent border/callout) **shown by the deletion test to add no independent value**, remains unresolved after first-pass QA. Do not classify every border/panel as G06; require an actual screenshot-grounded test of importance and impact.  
`G07` Missing a user-specified mandatory acceptance requirement or unresolved major revision regression.

If any G gate is **confirmed**, decision = **FAIL** regardless of aggregate. If a gate cannot be evaluated because evidence is unavailable, decision = **PENDING** unless an actual failure is already confirmed. Missing required screenshots, tests and source evidence are **not** assigned a generous score.

## 6. Preflight → first pass → final assessment

**Preflight (before implementation):**
- Pin source `ai_design` HEAD and task, approved Design System choices, image authorization and intended app stack.
- Copy [project template](../development/PROJECT_TEMPLATES.md); fill targets/evidence for every common criterion, plus P01… and G01–G07.
- Freeze rubric/acceptance. Put `UNASSESSED` placeholders; **do not pre-award scores**.

**First review (after build and actual render):**
- Inspect complete screens 390/768/1440, action states, code and automated/manual results.
- List the **top 1–3 suspicious prominent visual devices** (or explicitly “none observed after review”), with selector/screenshot, purpose, deletion-test result and alternatives. This is the **A1 probe**.
- Record initial ratings/status and ordered defects. A low/unknown grade is a fix target, not final acceptance.

**Refinement:** preserve strengths; compare same screens before/after; rerun relevant tests. Up to two normal targeted passes unless user asks for more.

**Final gate:** rescore against **unchanged** criteria, record evidence and blocker resolution; calculate exact totals; label `PASS` / `FAIL` / `PENDING`. Record human approval separately. Do not mark human HITL complete by agent self-score.

## 7. Calibration and bias limits

- Scores for art direction, copy and composition are **subjective proxy evaluations**. Self-evaluation may be biased; see [R15](../research/REFERENCES.md).
- To validate methodology improvements: matched task/inputs and pinned versions, independent blind review of at least original and revision, human ratings when practical, multiple tasks and repeated runs.
- An isolated Critic is **optional**, but cannot overwrite frozen weights or auto-approve release; it must inspect screenshots before reading implementation rationale.
- **No numeric score substitutes for actual page functionality or an informed visual review.**

## Website-first application (proposed v3.0) — no numerical rubric changes

**Keep the existing 20 items, weights (25/25/20/20/10), rating anchors, 85 threshold, 70% per-category floors and G01–G07 unchanged.** For a **whole website** request, [Website Quality Gate](WEBSITE_QUALITY_GATE.md) W01–W06 must clear **before** the numeric PASS can represent a finished site.

Evaluate Anti-Slop at element/page/site levels, Visual Quality on **representative page families**, Design System consistently across routes, Functions on **all mandatory routes and cross-route journeys**, and Responsive/Accessibility on each relevant family/state. A polished Home score does not substitute for page/route completeness. If the required site is replaced by one Home with anchors, verdict **FAIL despite a high numeric score**. Record user acceptance separately from the self-score. Historic one-route runs keep their original scope and pinned rules.
