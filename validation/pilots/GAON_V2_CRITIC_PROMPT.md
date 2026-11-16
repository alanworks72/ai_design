# Codex independent-critic pilot — Step 1 (READ ONLY)

You are acting as an **independent visual design critic**, not the original designer. Evaluate the existing website in `../governed-v2-methodology`.

## Rules
- **Do not edit the website, governance, design system, tests or source.**
- **Do not read** `../governed-v2-methodology/docs/ART_DIRECTION.md`, design rationale, the creator's visual QA, prior critique transcripts, or sibling experiment screenshots **until your first critique is written**. This prevents adopting the author's justifications.
- Read the fixed task brief at `../reference/ai_design/validation/TEST_CASE_DISTRIBUTION.md` and the nondeceptive/functional boundaries in `../reference/ai_design/governance/ANTI_SLOP.md`. These describe constraints, not a visual answer key.
- First inspect actual existing screenshot files in `../governed-v2-methodology/evidence/final/` at 390/768/1440. If filenames differ, locate them only within that project's evidence folder. If no screenshots can be found or opened, report the blocker and STOP; do not infer appearance from code. Work only with actual images for phase one.
- A clean screenshot does not prove functionality or rights. Do not claim HITL PASS or current accessibility PASS from screenshots.
- Output only `./CRITIC_FIRST_PASS.md` in the current `critic-pilot` directory.

## Critique (before seeing original design reasoning)
Write in Korean with evidence rooted in each viewport:
1. What the user perceives in the first 5 seconds; whether it resembles a credible B2B distribution site.
2. **Whole-page coherence:** do the color, illustration/photo style, typography, category list, company band, process and inquiry form feel like one art direction?
3. **Duplicated communication:** does the Hero depict the same categories that the next section repeats, without adding information?
4. **Proportional emphasis:** which section occupies more attention than the actual decision value it provides? Specifically evaluate the large company-introduction band.
5. **AI-Slop vs appropriate expression:** name concrete elements, differentiate severe issues from harmless style choices. Do not treat green, illustrations or rounded corners as automatic Slop.
6. **Counterfactual alternatives:** propose TWO meaningfully different ways to resolve the top problems, each keeping the user task and truthful content. No automatic preference for more photography.
7. Give **top 3 changes** with screenshots/sections cited and expected impact; list what should be preserved.
8. Mark each conclusion **Observed / Inferred / Not verifiable**. Rate confidence.
9. End with **Verdict: ACCEPT / REVISE / RE-DIRECT / PENDING**, where RE-DIRECT means rethinking the entire direction rather than tweaking CSS.

**Do not peek at the designer's rationale before writing the verdict.** It may be read in a separate second phase only after the first-pass file is saved.

## Output
`CRITIC_FIRST_PASS.md` with first-view observations (390/768/1440), whole-page diagnosis, 2 alternatives, ranked issues, preserved strengths, evidence limitations and verdict. Do not modify the website.
