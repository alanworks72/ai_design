# Codex prompt — Design Direction experimental treatment

You are in a NEW, EMPTY project directory. Build the Korean fictional B2B company website defined in:

`../reference/ai_design/validation/TEST_CASE_DISTRIBUTION.md`

Read and follow these documents **before planning or writing UI code**:

- `../reference/ai_design/AGENTS.md`
- All Governance and Design System files referenced there, including Anti-Slop and Visual Communication & Editorial Quality.

This is an independent first-generation experiment. **Do not open, read or use** sibling folders `baseline`, `governed`, `governed-v2`, `governed-v3`, `refined`, `editorial-test`, or `layout-test`. Do not copy their code or visuals.

## Primary design objective

Create a **visually convincing, finished B2B business website**, not merely a technically correct page or a low-fidelity wireframe. At a glance a visitor should recognize the type of company and its product categories, understand what they can inquire about, and find the primary action. Preserve simplicity and avoid every unnecessary decoration prohibited by Governance.

**Important distinctions:**
- Minimalism and white space are tools, not quality scores. Do not maximize emptiness.
- Do not equate informative product/category photography with decorative stock art. Properly licensed illustrative imagery can clarify a fictional site's industry **without claiming it documents that company's actual inventory or facility**.
- A text-only treatment is acceptable if it genuinely communicates the domain just as well. Record the argument; do not default to it solely because no company-owned photographs were supplied.
- Do not add invented numbers, proof, testimonials, brand logos, capabilities, decorative eyebrow labels, arbitrary status dots, gradients, glows or filler cards.
- Don't force imagery, asymmetry, color or an unusual layout merely to satisfy the experiment.

## Mandatory design workflow

**Phase 1: Direction before code.** Briefly outline TWO genuinely different, Governance-compliant visual compositions for this brief. For each, state hero arrangement, how product categories become recognizable, useful assets if any, copy approach, content hierarchy and limitations. Choose one based on first-screen comprehension, visual communication and professional polish. Record in `docs/DESIGN_DIRECTION.md` before writing UI files.

**Phase 2: Build.** Implement the selected direction with the required working navigation, responsive behavior, inquiry form, validation and honest draft/copy actions. Use project-approved typography and tokens. If using visuals, verify provenance and use/license/redistribution constraints, and distinguish illustrative context from real-company proof. Do not present an unknown asset license as cleared.

**Phase 3: Actual visual critique and revision.** Run the website in a browser and CAPTURE screenshots at 390, 768 and 1440px. Open and inspect them, do not only save them. Evaluate (a) whether the first screen communicates the industry and relevant categories, (b) large empty or overstuffed regions, (c) text vs imagery balance, (d) clarity of hierarchy and (e) awkward/repetitive Korean. Record at least three concrete observations, including positives or issues as actually seen. Make ONE targeted visual/editorial revision addressing the most important real finding(s); do not invent changes when nothing is wrong. Capture the final screenshots and document before/after. Do not call an inspection or a revision complete without observable evidence.

**Phase 4: Verify.** Run build and applicable browser tests; report true outcomes and uncertainties. Run accessible contrast, keyboard and responsive checks where practical. Do not claim HITL PASS — only a human reviewer can decide.

## Deliverables and boundaries

- `docs/DESIGN_DIRECTION.md`: directions, selection and actual revision evidence.
- `docs/ASSETS.md`: actual image/font sources and rights, or explicit reason no images are used.
- `docs/VALIDATION.md`: commands, outcomes, screenshot paths, remaining issues.
- Final usable UI, with no debug/preview disclaimers in the page.
- Only modify files in the current project. Do not edit Governance, fixed brief or sibling projects.
- Do not commit or push to Git.
