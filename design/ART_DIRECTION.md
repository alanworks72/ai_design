# Art Direction — Anti-Slop AI Design

Status: **Mandatory** under Governance v2.0.

## 1. Objective
Choose a compelling and truthful visual direction rather than defaulting to the smallest technically acceptable interface. The goal is recognizability, coherence, clarity and professional finish—not ornamental novelty.

## 2. Plan before code
Document: audience/decision; first-screen recognition goal; 2–3 main information priorities; actual product/service/category evidence; intended visual identity; image/text roles; composition and section rhythm; typography/contrast; key CTA.

## 3. Explore genuinely different strategies
Compare at least two **information strategies**, not only "with image" vs "without image":
- **Corporate/context-led:** visual business context explains what the organization does; offer details follow.
- **Product/catalogue-led:** visuals or clear product information make categories and options immediately identifiable.
- **Task/workflow-led:** requirements, process and action define the composition.

These are examples, never mandatory layouts. For dashboards and technical tools, a photo-free information-first layout often wins.

**Decision test (mandatory before build):** For each candidate, outline the *entire page*, not merely Hero and asset choice. Identify (a) what context the Hero conveys, (b) what the offering/category section adds **that the Hero does not**, (c) whether a large band/card/photo repeats information or draws more attention than its importance warrants, (d) intended image medium (photography, original illustration, UI screenshot, diagram, none) and its fit for the audience, and (e) the meaningful tradeoff against the other option. Reject an option whose elements are individually explainable but whose combination resembles a generic landing-page recipe.

Choose on **relative suitability**, not merely whether both directions satisfy Governance. If several options are viable, prefer the one with clearer evidence, less duplication, appropriate visual language and a stronger content-to-emphasis fit. Document a specific reason the rejected design was worse. Do not claim a score or user benefit was measured if no actual user study was run.

## 4. Compose
- Give images distinct jobs when useful: context can show *business domain*, product/category imagery can show *offering*. Don't repeat three equal cards by habit. **If Hero images already explain all categories, do not repeat them unchanged in the next section; add useful detail or choose a different information role.**
- Use typography scale, element proportions, white space, density and section differences to align with content priority.
- A coherent branded accent, purposeful asymmetry, varied image/text ratios and restrained depth can be appropriate. Do not add them merely to avoid looking plain.
- Different sections need not all carry the same weight; repetitive company-introduction filler should not delay high-priority content.
- Preserve accessible focus/contrast/reading order and familiar controls.
- Evaluate the *combined visual language*: colors, image medium, headline treatment, bands, dividers, cards and steps must feel appropriate together. A plausible individual purpose is insufficient. Avoid an illustration aesthetic that looks like a generic AI template merely because the drawings accurately depict category names.

## 5. Image consultation
If the agent concludes images materially help and no user image decision exists, ask **one direct question** before selecting them: user-provided assets, agent-selected/generated properly licensed illustrative assets, or no images. Explain use and recommend an option. Follow [ASSETS.md](../design-system/ASSETS.md). A declined image option calls for a compelling alternative, not an unfinished wireframe.

## 6. Validate in the browser
Open 390/768/1440px screenshots, compare implementation with the chosen concept **and with the rejected strategy**, flag substantive visual issues, revise and re-render. Use [VISUAL_QA.md](../validation/VISUAL_QA.md). When evidence shows the selected strategy itself is wrong, **switch direction** rather than repairing only typography and cropping. Written alternative concepts are not proof of professional visual quality. Human HITL sign-off remains separate.
