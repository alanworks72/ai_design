# Anti-Slop Review Checklist

Aligned with [Governance v1.1](ANTI_SLOP.md). Review every new page, component, or major redesign. Mark **Pass / Fail / N/A / Not tested** with evidence. Applicable hard-gate failures or untested release-critical checks block release.

## A. Purpose and content — hard gate

- [ ] Intended user, primary task, and main action are clear.
- [ ] Every visible element helps the task, navigation, comprehension, or interaction.
- [ ] Preview-only content uses natural, visibly fictional example values rather than bracket placeholders or explanatory filler; sample status is recorded in review notes outside the rendered UI.
- [ ] Production-facing content is verified. No fictitious performance metrics, certifications, customer proof, testimonials, or technical claims appear factual.
- [ ] No unnecessary on-page notices such as “실제 자료로 교체 예정”, “디자인 검토용 예제”, or “서버에 저장되지 않습니다”; meaningful limitations of interactive controls are disclosed when needed.
- [ ] If missing information materially changes the structure/behavior, the user has been asked rather than the agent guessing.
- [ ] Visible copy passes the deletion test; no invented section numbers, arbitrary eyebrows/kickers/metadata, or internal component jargon.

## B. Typography and visuals — hard gate

- [ ] At most two standard UI font families (actual code/terminal monospace exceptions noted).
- [ ] Type hierarchy and readable Korean/English rendering are checked.
- [ ] Design tokens for colors, spacing, type, and other used properties remain consistent.
- [ ] No nonfunctional gradients, glows, textures, shapes, shadows, images, dividers, badges, or animations **unless explicitly requested**.
- [ ] Any decoration exception cites a specific user instruction or supplied brand specification and is limited to that scope.
- [ ] Functional grouping, borders, icons, status colors, and feedback remain understandable; minimalism has not removed necessary cues.
- [ ] Whitespace contains no gratuitous filler.
- [ ] No decorative status dots, colored circles, or fake online/active indicators; any expressly requested status indicator is tied to real data and accompanied by understandable status text.

## C. Familiar interaction patterns — hard gate

- [ ] Familiar UX patterns are used by default.
- [ ] Unconventional layout/interaction is only introduced upon an explicit request for originality.
- [ ] Novelty does not impair readability, navigation, feedback, or task completion.

## D. Function and accessibility — hard gate

- [ ] Primary interactions have meaningful working outcomes.
- [ ] Prototype-only or simulated behavior is clearly disclosed.
- [ ] Keyboard navigation and visible focus are checked.
- [ ] Semantic markup, accessible labels, contrast, and error messages are checked.
- [ ] Desktop/mobile layout is inspected.
- [ ] Realistic long/short content and empty/error states are checked.
- [ ] Motion has a purpose, with reduced-motion support where applicable.

## E. Commercial/reuse quality

- [ ] Realistic purchaser/user scenario exists.
- [ ] Core components can be reused without rewriting the entire component.
- [ ] Variants change meaningful structure or behavior, not just ornamental styling.
- [ ] Claims, licensing assumptions, and test results are described accurately.

## Review record template

```md
# Review: <page or component>
User / task / primary action:
Content source, fictional preview values, and production verification:
Any question needed for structure/behavior:
UI font families:
Decoration or novelty requested by user (source + scope):
Decorative copy/elements removed:
Interaction tests performed:
Accessibility and responsive checks performed:
Exceptions:
Outstanding tests / blockers:
Decision: PASS / FAIL / PENDING
```

**Release rule:** Fail and Not tested are never silently treated as Pass. Mark the deliverable PENDING if release-critical verification remains undone. Governance is not a substitute for human visual review.