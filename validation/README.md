# AI Design — Validation Protocol

This folder defines tests **before** generating UI. It does not claim any test has passed.

## Sequence

1. Static document audit: compare Governance and Design System for contradictions, links, confirmed tokens and unresolved candidates.
2. Independent generation: same brief, model, version, dependency lockfile, execution budget and fresh session for Baseline and Governed. Repeat three times per condition when possible.
3. Static implementation checks: verify font-family declarations, CSS tokens, prohibited decorative copy patterns and unsupported page claims. Flag suspicious elements for human review; regex cannot establish design intent.
4. Browser checks: test 390, 768 and 1440px; record screenshots, layout overflow, actions, forms, errors, keyboard operation and axe-core results.
5. Visual QA: open and critique real screenshots for both unwanted AI-Slop and overly generic/under-designed results; revise major issues using [VISUAL_QA.md](VISUAL_QA.md).
6. HITL: independent blind visual/content approval; examine art direction, imagery rights, commercial appropriateness and visual finish.

## Release decision

- Static: **0 confirmed hard-rule violations** (unreviewed flags are pending).
- Browser: **0 broken primary actions, 0 critical/serious known accessibility defects**; all mandatory viewports tested.
- HITL: **0 unresolved major content/design issues**, reviewer approval recorded; sparse but rule-compliant pages are not automatically acceptable.
- Release = PASS only when all three gates pass; use PENDING for unrun or unverified gates.

## Important notes

- Synthetic sample information belongs in review records, not as decorative notices on mockup pages.
- Simulated operations must not look like working backend operations. A local-only utility must label its actions accurately.
- Test outcomes and measurements must be recorded with reproducible evidence.
- Current typography/spacing/layout approvals are **design defaults**, not proof that live award sites use these measured values.
