# AI Design Review Checklist — Execution & Completion

This is a **quick operational companion** to the normative [100-point Scorecard](../validation/SCORECARD.md), not a substitute for it. Read [Project Charter](PROJECT_CHARTER.md), [Development Workflow](../development/WORKFLOW.md) and [Visual QA](../validation/VISUAL_QA.md).

## A. Before implementation: mandatory

- [ ] Read applicable `AGENTS.md`, Governance, Design System, Art Direction, Workflow and Scorecard **from actual paths**; record the methodology revision.
- [ ] Preserve the existing design theme or confirm the known default Neutral vs custom decision; no silent color/font/token overrides.
- [ ] Determine whether informative images would materially help; ask the user about image sourcing **only if relevant and undecided**.
- [ ] Write **`docs/AI_DESIGN_PLAN.md`** with real users, content, layout, image/CTA roles, responsive plan and truth constraints.
- [ ] Freeze **`docs/AI_DESIGN_SCORECARD.md`**: 20 fixed common criteria and 3–8 project-specific acceptance/evidence targets; identify mandatory user requirements, blocking conditions and actual evidence methods.
- [ ] Do **not** assign scores to unbuilt UI; no score/weight/threshold editing after the plan is frozen.

## B. First review: implementation evidence

- [ ] Actual app built/run; correct site/server and locked CSS/font observed in browser.
- [ ] Opened and visually inspected **390/768/1440** full-page renders and key transition widths.
- [ ] Tested required navigation, primary action, validation/recovery, real result and failure states as applicable.
- [ ] Checked keyboard/focus/semantics/contrast and axe where available, with manual limitations stated.
- [ ] Inspected high-attention border/panel/callout/icon/image effects **independently of their interior content**. Applied Deletion Test; recorded up to three suspect elements and evidence, or that no suspects were observed.
- [ ] Scored initial 20 criteria **with evidence**; recorded UNVERIFIED instead of guessing.

## C. Refinement and final gate

- [ ] For meaningful fixes: Preserve / Change / Avoid logged; original visual strengths and approved assets not silently removed.
- [ ] Compared before/after **actual screens** and reran relevant action/accessibility tests; regression rejected or reverted.
- [ ] Same frozen 20 criteria rescored with actual source/screenshot/test evidence; all project mandatory cases verified.
- [ ] Computed A/25, V/25, D/20, F/20, R/10 and Total/100 exactly per Scorecard.
- [ ] Checked critical gates G01–G07, category floors **70%**, provisional total cutoff **85**, and no unresolved major regression.
- [ ] Status: **PASS** (agent-provisional, evidence complete) / **FAIL** (confirmed defect or threshold unmet) / **PENDING** (required evidence/decision absent).
- [ ] Reported real test command outcomes, file locations, evidence and limitations; did **not** claim independent human approval.

**Evidence over assertions:** "No fake metrics" does not verify whether a decorative Hero border is purposeless. "Axe 0" does not verify total accessibility. "Uses tokens" does not prove good visual composition.

Normal task = one brief, one Code Agent, two small project records. Independent Critic/multi-agent work is optional. No extra default agent or checklist creation ceremony.

## Mandatory Website-first checks (v3.0 proposal)

- [ ] Scope recognized: a website is not silently reduced to one Landing Page; single page requires explicit scope.
- [ ] Before UI: Sitemap, route inventory, Page Specs, sourced content/TBD, user journeys, page-family wireframes and frozen test targets.
- [ ] Every **mandatory route** has distinct content and purpose; direct URL/refresh and navigation tested.
- [ ] Every essential **cross-page journey** is actually executed; no fake Home-anchor menu, broken deep link, or fake interaction.
- [ ] Real 390/768/1440 screenshots **per page family**, consistent locked Design System and no repeated generic page template.
- [ ] **Corporate Identity + reference analysis** recorded before IA: what business, for whom, source-backed services; 2–3 comparable official sites or honestly labelled offline reference findings.
- [ ] **W05 page-purpose check:** Home presents enterprise business, Company explains business/service model, Detail routes add meaningful unique information; repeated buyer checklists or relabelled generic tables do not pass as substantive pages.
- [ ] Website Quality Gate **W01–W06 all CLEAR** with route/requirements coverage evidence, before weighted score PASS.
- [ ] Existing 20-item/100-point/85 threshold and G01–G07 unchanged, user/PO acceptance separate.
- [ ] SEO/metadata, security, accessibility, performance and production release checked to the extent required by actual scope; no unverified claims of deployment.
