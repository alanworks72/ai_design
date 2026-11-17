# AI Design Review Checklist — normalized v2.1

Separate **Design System compliance**, **Anti-Slop**, **functionality**, and **visual quality**. Record PASS / FAIL / PENDING / N/A with evidence; don't claim unrun tests or independent HITL approval.

## A. Contract / Static review
- [ ] Audience, main task/action and required truthful content identified.
- [ ] Existing brand theme preserved; otherwise user chose default Neutral/white or custom colors **once**.
- [ ] Approved v1.0 [Typography](../design-system/TYPOGRAPHY.md), [Colors](../design-system/COLORS.md), [Layout](../design-system/LAYOUT.md) and [Components](../design-system/COMPONENTS.md) used. Document actual user-authorized exceptions.
- [ ] If imagery would materially help and is not decided, one image question asked; chosen rights and roles recorded.
- [ ] No unsupported business claims, fake statuses, dead controls, meaningless ornamental labels or unexplained repeated effects.
- [ ] Project technology follows the established/requested stack; deviations are explicit rather than silent.

## B. Actual browser review
- [ ] Screens at 390, 768 and 1440px inspected; mobile overflow and reading order checked.
- [ ] Navigation and primary interaction genuinely work; form validation, errors and recovery verified.
- [ ] Keyboard, focus, contrast, labels, relevant states and reduced motion checked as applicable.
- [ ] Serious/critical unresolved accessibility problems and tool limitations recorded accurately.

## C. Visual & editorial QA
- [ ] Both decorative **AI-Slop** and **under-designed** output reviewed using [Visual QA](../validation/VISUAL_QA.md).
- [ ] First-screen recognition, category accuracy and CTA emphasis are appropriate.
- [ ] Image/copy/section roles do not unnecessarily repeat; the result is not a sterile template.
- [ ] In revisions: Preserve / Change / Avoid documented; **before/after non-regression** completed. A worsened design is not adopted.
- [ ] Briefly record meaningful findings and fixes. Independent Critic is optional, not a universal gate.

## D. Delivery and final commercial release
- [ ] Commands actually run and failures/not-tested limitations reported.
- [ ] Mockup facts and asset provenance documented outside rendered preview.
- [ ] For an actual sold/released pack: independent human approval of visual/editorial quality and rights completed, or Release = PENDING.

**Release PASS** requires approved style, functional/accessibility and Anti-Slop requirements, visual suitability and independent commercial review when relevant. An exploratory page can be delivered for review with PENDING items clearly reported.
