# Experiment — Why Refined outperforms autonomous Governed

Status: **READY TO RUN — no local generation or outcome claim**  
Frozen governance: **v1.3, commit `9fcfbbbf90fb67ae2da272aa4aabc73abc7810c6`**  
Fixed brief: [TEST_CASE_DISTRIBUTION.md](TEST_CASE_DISTRIBUTION.md)

## Research question

Does an explicit **positive design-direction + visual critique workflow** help Codex produce a substantially more convincing, polished B2B website *without relaxing Anti-Slop*?

Do **not** mistake an improved Refined screenshot for causal evidence: Refined continued an existing implementation and received specific visual instructions, unlike independent first-generation projects. It is a **quality reference**, not a controlled experimental arm.

## Arms and controls

- **Reference:** existing `governed-v3` (frozen). It demonstrates a prior autonomous result, not a paired randomized sample.
- **New treatment, `direction-test`:** clean, independent implementation from the **same fixed brief** and pinned v1.3 Governance, plus only [DESIGN_DIRECTION_PROMPT.md](DESIGN_DIRECTION_PROMPT.md). No use of screenshots/source from baseline, governed, refined or governed-v2/v3.
- **Recommended causal replication:** create a fresh **`control-test`** at the same time with the identical fixed brief, same pinned v1.3 Governance, **without** the design-direction prompt. Use the same model, effort, context settings, generation budget, runtime and dependency versions; ideally repeat at least three matched pairs. Until this is done, compare treatment against governed-v3 only as a directional diagnostic.

Do not update Governance or Design System during this experiment. Do not show Codex previous generated screenshots, audit verdicts or desired result labels. No image quota, no color change mandate, no custom layout template, no copying a named website.

## What the treatment changes

It asks Codex to:
1. Produce a concrete design direction (first-screen message, purchase-decision evidence, visual treatment, section priorities) **before code**, with 2 viable directions and selection rationale.
2. Execute a first implementation that feels like a finished company site rather than a sparse wireframe; choose licensed information assets when helpful, or a similarly informative text-only treatment.
3. Inspect **rendered screenshots** at 390/768/1440, critique visual hierarchy, natural Korean, visual evidence and composition, and perform **one meaningful visual revision** before finishing.
4. Keep all existing safety, honesty, usability, licensing, Anti-Slop and verification gates; do not equate fewer elements with higher quality.

This tests design **selection and revision workflow**, not just whether adding images helps. A subsequent isolated asset-only test could distinguish these factors.

## Local execution (from ~/project/design_test)

```bash
cd ~/project/design_test/reference/ai_design
git fetch origin main
git checkout 9fcfbbbf90fb67ae2da272aa4aabc73abc7810c6
cd ~/project/design_test
mkdir -p direction-test
cd direction-test
codex
```

Paste the entire contents of `../reference/ai_design/validation/DESIGN_DIRECTION_PROMPT.md` as the **first message** in a new Codex session. The prompt instructs Codex to read the fixed brief and governance. Make sure no project-specific AGENTS.md from a parent folder overrides the intended instruction set; document any such path. Do not reuse/resume past sessions.

**Optional control:** new empty `control-test`, same pinned governance + original fixed brief, without the new direction prompt. If the directory exists and contains prior output, do not overwrite it.

## Evidence to collect from the treatment

- `docs/DESIGN_DIRECTION.md` — two options, choice, explicit intended first-screen comprehension, image/content rights and source, initial critique, implemented revision.
- First and revised **actual screenshot files** at 390, 768, 1440px.
- Build/test commands and **actual** exit statuses, axe reports if available. Functional PASS does not imply design PASS.
- Model identifier/effort, CLI version, run timestamp, locked dependencies, prompt content and exact governance revision.
- Before/after code changes; no modifications to the fixed brief or governance.

If the model cannot obtain rights-cleared appropriate images, document that and choose an accurate alternative. Do not misrepresent third-party facilities as those of the fictional business. Do not include dev disclaimers or fabricated credentials in the on-page content.

## Independent evaluation

Use a blind screenshot comparison, without implementation labels, and rate each 1–5:

| Dimension | What a reviewer can judge |
|---|---|
| Purpose recognition | Recognize the business/product categories and available action within seconds |
| Visual communication | Images, actual UI, diagrams or well-designed text convey relevant concrete information |
| Editorial quality | Natural Korean, specific headings, nonrepetitive sections, truthful CTA |
| Visual hierarchy | Content priority, hero sizing, section proportion, clarity of reading path |
| Professional polish | Balanced composition, legible type, thoughtful image treatment, consistent details |
| Anti-Slop compliance | No fabricated labels, ornamental embellishment, unsupported claims |

Report each dimension separately (do not collapse Anti-Slop compliance into aesthetic quality). Also report missing source/rights evidence. The evaluator must not infer a business benefit solely from photographic presence.

### Decision

- If treatment clearly wins on communication/polish while staying compliant, **design selection + screenshot critique is a promising lever**. Replicate against new paired control before saying it is causal.
- If treatment remains sparse, inspect its design-direction plan, screenshots and actual critique/revision actions to identify whether prompt priority, model capability or unavailable assets blocked progress.
- If treatment looks elaborate but reintroduces slop, tighten **specific** failure cases, not blanket anti-minimalism rules.
- Do not modify v1.3 or ship a v1.4 based on a single outcome.
