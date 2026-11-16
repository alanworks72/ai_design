# Visual QA — Anti-Slop AI Design

Version **2.0**. Review actual **rendered** screens, not just DOM/code. Independent HITL remains mandatory for final approval.

## Two-sided review

| AI-Slop (too much) | Under-designed (too little/undirected) |
|---|---|
| Fake status dots / decorative eyebrow labels | No business/product recognition |
| Unsupported proof, filler counters | Wireframe-like generic brand identity |
| Unrelated imagery/ornamental blobs | Useful imagery/diagrams omitted without compelling reason |
| Arbitrary glow, gradient, shadow, cards | Weak hierarchy, undifferentiated section rhythm |
| Effects that obscure real actions | Blank hero or wasted space delaying important content |

**Neither column sets image quotas or mandates decoration.** A simple operational UI can be excellent; richer commercial sites can be excellent.

## Adversarial direction review

Before looking for small bugs, act as a **skeptical reviewer of the chosen design**, not as its author. State the strongest argument that the entire direction is wrong for this audience. Compare it against the documented rejected alternative. Inspect the whole-page combination of image style, palette, headline, category structure, company band, process and form. A plausible rationale for each element does **not** amount to a convincing whole.

For each significant visual grouping, ask:
- Does this section add information not already present above? If not, simplify, merge or give it another role.
- Is its visual prominence proportional to information value and user priority? A large color band for thin company copy may fail even if it creates separation.
- Is the combination of illustration, accents, section background and cards a deliberate coherent expression—or a familiar generic AI landing-page recipe?
- Would a different image medium, a different information strategy or a text-only explanation better suit the real task?
- If an independent reviewer saw it without the author's reasoning document, would the design still explain itself? Do not answer by citing the existence of the design plan.

Identify at least one meaningful **counterargument** to the selected direction, and record the response using screenshot-specific evidence. If the counterargument stands, change the direction or mark the result PENDING for human intervention. Never manufacture a defect purely to satisfy a count.

## Review questions
1. On first screen, can a new visitor recognize what this product/business does and where to act?
2. Does the chosen composition support the page's information priorities? Are Hero proportions, crop and whitespace deliberate?
3. Are context imagery, offering/product detail and any workflow visuals distinct and useful?
4. Is typography/contrast/spacing intentional, responsive and coherent?
5. Is the page's visual identity credible and appropriate to this specific audience, rather than generic or arbitrarily novel?
6. Does the whole page use natural, informative, nonrepetitive language and truthful actions?
7. Does the composition survive 390/768/1440px, keyboard and reduced motion?
8. Are any elements there solely to seem “designed,” or has too much been removed?

## Workflow
- Capture and OPEN screenshot evidence at 390, 768 and 1440px, including breakpoint transitions.
- Record at least 3 screenshot-specific observations about visual composition and content, not only pixel/crop bugs. At least one must assess **global art-direction coherence / duplication**, not technical correctness. Inspect whether Hero and downstream sections repeat one another.
- Fix major high-impact issues; re-render before/after. If a systemic issue persists (generic illustration style, arbitrary strong band, duplicate category communication), **revise or replace the overall direction** rather than adjusting only fonts or spacing. If visual uncertainty remains, present it for HITL instead of claiming PASS.
- Separate static checks and browser accessibility tests from aesthetic approval. Zero axe violations ≠ professional polish.

## Review record

```md
Design concept and audience:
Image decision (not needed / asked and supplied / illustrative assets / declined / PENDING):
Initial screenshots and evidence:
Concrete visual and editorial findings:
Strongest counterargument to selected direction and evidence:
Page-wide repetition / disproportionate emphasis:
Was a direction-level revision needed? Why or why not:
Revision and final screenshots:
Open Anti-Slop or under-design issues:
Independent human approval: PENDING / APPROVED with reviewer:
```
