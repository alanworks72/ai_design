# Anti-Slop Review Checklist — v2.0

This checklist separates functional correctness, Anti-Slop constraints, **visual finish**, and independent human approval. Mark PASS/FAIL/PENDING/N/A with evidence; never self-certify HITL.

## A. Plan and static implementation
- [ ] User, primary task, content, verifiable facts and actions identified.
- [ ] [Art Direction](../design/ART_DIRECTION.md) documented a coherent page purpose, content priorities, composition and style; rejected directions include specific tradeoffs, not only presence/absence of imagery.
- [ ] If agent judges informative imagery important and user has not decided, **image question asked** and response recorded; otherwise record why no question was needed.
- [ ] Semantic tokens are internally consistent and preserve supplied brand identity.
- [ ] Font and asset rights, sample/prod claims and controls are honest.
- [ ] No fabricated proof, meaningless statuses, generic decorative metadata, repeated purposeless ornaments.
- [ ] Build/lint/typecheck actual commands and outcomes recorded.

## B. Browser/functional
- [ ] 390, 768, 1440px screenshots and breakpoint checks; no unintended overflow.
- [ ] Primary navigation, mobile menu, form/action, validation and error recovery tested.
- [ ] Focus, keyboard, labels, semantic HTML, meaningful contrast and reduced motion tested where applicable.
- [ ] axe results checked for serious/critical, incomplete and limitations; automated passes do not prove WCAG.

## C. Rendered visual QA
- [ ] [VISUAL_QA.md](../validation/VISUAL_QA.md) executed using opened, actual screenshots.
- [ ] First-screen business/product recognition and main action apparent.
- [ ] Layout, information density, image/text roles and hierarchy follow chosen direction; the reviewer also critically examined whether that direction itself fits the audience.
- [ ] Hero and later sections do not duplicate the same three facts/images without new information; large color bands, illustrations and cards earn their prominence as a coherent whole.
- [ ] A meaningful counterargument to the selected style was recorded and answered with actual screenshot evidence, not merely the author's intent.
- [ ] Copy is natural, not generic/repetitive, with truthful CTA labels.
- [ ] No ornamental AI-Slop **or** unresolved wireframe-like under-design.
- [ ] Relevant actual visual issues addressed in a revision; initial/final evidence recorded.

## D. Independent HITL
- [ ] Reviewer explicitly approves usefulness, visual identity, polished composition, copy and consistency.
- [ ] Asset licenses and redistribution rights checked before sale.
- [ ] Major issues resolved or decision remains PENDING.

## Decision
Static PASS = no confirmed hard-rule failures. Browser PASS = tested required interactions/layout with no serious/critical unresolved defects. Visual agent critique = evidence for HITL, **not** independent PASS. Release PASS requires static, browser and independent HITL approval. No test performed -> PENDING.
