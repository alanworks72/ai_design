# Anti-Slop Design Governance

Version: **1.1**  
Scope: Websites, components, templates, interactive demos, screenshots, and AI-assisted frontend design in this repository.  
Status: **Mandatory default**. Explicit user requirements may authorize scoped exceptions.

## 1. Objective and priorities

Build interfaces that let real users **understand, navigate, decide, and act**. A visually pleasing appearance is not a substitute for working software or useful content.

Priorities, in order:
1. User requirements and actual task completion.
2. Familiar and predictable interaction patterns.
3. Legibility, accessibility, responsive behavior, and accurate content.
4. Consistency in typography, spacing, color, and components.
5. Novelty or stylistic expression **only when the user explicitly requests it**.

Anti-Slop is not a mandate to make every website identical or unfinished. Quality comes from content hierarchy, alignment, proportion, usable controls, and meticulous execution—not extra decorations.

## 2. Define the task before designing

Identify the intended user, what they need to accomplish, required information, the primary action, and relevant states (empty, loading, error, success, mobile, etc.).

Do not create decorative material to occupy whitespace or conceal missing content. Choose an established interface pattern that supports the task.

### Missing content decision rule

- **Mockup/sample page with enough structure:** fill necessary fields with concise, natural, **clearly fictional example values** rather than visible `[Placeholder]` text or notes about replacing information. Examples: `가온유통`, `Tel. 02-000-0000`, `서울특별시 OO구 OO로 123, 3층`, `contact@example.com`. Document their fictional nature **outside the rendered page**, in project/review notes.
- **Prototype:** use realistic fictional example data and distinguish actual working controls from mocked behavior. If the interface simulates rather than performs an action, name that action honestly.
- **Behavioral examples:** use small, realistic sample data and avoid implying that an example belongs to a real customer. Do not add gratuitous on-page disclaimers such as “design review sample,” “replace with real company information,” or “not connected to a server” to fill UI space. If a limitation materially affects user action (such as a send button that does not send), the UI must communicate it or the control must be redesigned to honestly perform its labeled action.
- **Production/real organization:** do not publish fictional contact, company, product, or legal details as genuine; obtain and verify actual information before release.
- **Content would materially change the page structure, features, or primary action:** ask the user a concise, targeted question before making the consequential choice.
- Never manufacture real-sounding testimonials, statistics, customers, reviews, prices, product capabilities, or endorsements as if verified. Do not use marketing fluff to fill space.

Do not ask for every missing detail when clearly fictional sample content is sufficient for a mockup. Never treat mockup content as verified production information.

## 3. Typography

- Use at most **two font families** in general UI: headings and body. One family is preferable if it works.
- An actual code editor, code sample, or terminal can use monospace as a **functional exception**. Do not add a third family solely to create a code-like visual style.
- Define a compact type scale and intentional heading hierarchy; choose line height and weight for legibility.
- Do not add tiny uppercase eyebrow labels, exaggerated letter spacing, or arbitrary font changes just to imitate editorial design.
- Support Korean/English glyph rendering and content wrapping.

## 4. Functional copy only

Every visible string must help a user understand, decide, navigate, provide input, or interpret an outcome.

**Do not add by default:**
- Invented numbering: `01 / SHOWCASE`, `INTERACTIVE PRODUCT DEMO / 001`, `VOL. 01`.
- Decorative eyebrow, kicker, overline, uppercase caption, or arbitrary category labels.
- Performative metadata: `LIVE COMPONENT · NO BACKEND REQUIRED`, `USE CASE: DEVELOPER TOOLS` where not required for a decision.
- Development/template terminology: `REUSABLE INTERACTIVE DEMO BLOCK`, `COMPONENT SHOWCASE` as customer-facing content.
- Unsupported claims, artificial counters, generic slogans, invented proof points.
- Development-only or preview disclaimers in rendered UI that do not help a real visitor, including “실제 정보로 교체 예정”, “디자인 검토용 예제”, “이 미리보기에서만 유지됩니다”. Keep such notices in delivery notes unless they are genuinely required to prevent misleading user actions.

Real workflow step numbering, meaningful filters/categories, required technical compatibility notes, form labels, status/error feedback, and accessibility text are functional and allowed.

**Deletion test:** If removing the text causes no meaningful loss of understanding, navigation, or decision quality, remove it unless the user explicitly requested that copy.

## 5. Decoration: explicit opt-in

**Default rule: Do not add nonfunctional decoration.** Brand identity alone, a desire for uniqueness, or adjectives such as “premium” do not grant the agent permission to add ornaments.

Without an explicit user request, do not add:
- Gradients, glow, decorative blur, textures, geometric background shapes, visual noise, ornate shadows.
- Decorative 3D, animations, illustrations, unrelated photos, decorative icons or badges. Brief, purposeful hover/focus/state-feedback transitions are allowed; the 120–180ms default is a candidate, not a hard duration limit.
- Separators, cards, ornamental borders, or empty panels solely to make the page look designed.
- Fabricated visual labels to balance a layout.
- Decorative status dots (e.g., a green dot next to '내 작업 목록'), colored circles, or online/active indicators that do not reflect real, changing application state. Do not use them to imply connectivity, availability, progress, or activity. When genuine status must be conveyed, use a clear text label by default; a dot or equivalent visual marker may be added only if explicitly requested by the user and backed by real state.

**Allowed by default when functionally necessary:** clear grouping, input boundaries, meaningful dividers, hover/focus/disabled/error/success indicators, useful icons, product images needed to understand the product, and motion needed to communicate an interaction or state change.

**Explicit authorization:** A direct user instruction or provided brand/design specification can authorize a decorative element within its stated scope. A broad request for a "beautiful" or "professional" page does not automatically authorize gradients, animation, or decorative labels.

Record authorized exceptions as a short note describing the request and where it was applied. Do not spread a scoped exception across unrelated components.

## 6. Familiarity before originality

- Default to familiar, understandable navigation, forms, content patterns, and interaction behavior.
- Use existing proven UI patterns where appropriate; avoid novelty for its own sake.
- Do not introduce unusual composition, unconventional navigation, gratuitous interactive experiments, or deliberate layout disruption unless requested.
- If a user requests originality, explore alternatives **while retaining understandable labels, controls, feedback, accessibility, and task completion**.
- A request for originality is **not** blanket permission to add decorative text, decorative visual effects, or invented content. Confirm the specific treatment only when it materially affects the result.

The goal is not to clone other creators' distinctive designs. Familiar UX patterns are a starting point, not authorization to copy proprietary assets or exact artwork.

## 7. Design tokens and component standards

- Define semantic colors and consistent spacing and type scales; avoid arbitrary style values. Radius is optional and must not be introduced as a global scale unless needed for component consistency.
- Choose composition based on actual content rather than defaulting to hero + three cards + fake dashboard.
- Reuse functioning components; no nominal variants made only to inflate a marketplace catalog.
- Components must have a user task, input/content contract, and realistic empty/error/success states where applicable.
- Whitespace is acceptable. Do not fill it with captions, dots, figures, icons, lines, or decorative images.

## 8. Interaction, accessibility, and honesty

- Primary actions must work, or the interface must transparently disclose prototype/simulated behavior.
- Do not present static mockups, fake AI responses, or predetermined output as live features.
- Use semantic HTML, labels, keyboard interaction, visible focus, sufficient contrast, and responsive layouts.
- Check realistic lengths and wrapping in actual target languages.
- Motion needs an interaction purpose and should respect reduced-motion settings where applicable.
- Report verification precisely; a file created or a screenshot generated does **not** prove browser function, accessibility compliance, or production readiness.

## 9. Design and release gates

**Gate A — Purpose:** user, primary task, action, content, and unresolved structure-changing questions recorded.

**Gate B — Design:** familiar pattern selected; typography <= 2 families (functional code exception); no unauthorized decoration, fabricated content, editorial filler, or novelty.

**Gate C — Implementation:** semantic tokens, working controls, states, responsive layout, and accessibility considered.

**Gate D — Review:** evaluate at desktop/mobile widths, verify mockup data is documented outside the page, check the copy deletion test, inspect for unauthorized ornamentation and novelty, and execute [REVIEW_CHECKLIST.md](REVIEW_CHECKLIST.md). Review consists of static checks, browser checks and HITL review; none is interchangeable with the others.

For applicable hard-gate failures, remove or correct the issue before release. Untested requirements remain **Not tested**, not Pass.

## 10. Exception record

Exceptions exist for **explicit user requests or provided design/brand requirements**, not the agent's independent aesthetic preference.

Document only actual exceptions:
- Relevant user instruction or design specification:
- Affected element and component:
- Scope (where allowed, where not):
- Functional/accessibility considerations:
- Review decision:

Functional necessities listed in section 5 do **not** require exception records.

## 11. Definition of done

Not ready for release when:
- Unrequested decoration or invented metadata is present.
- More than two ordinary UI font families are used without a documented functional exception.
- Fictional preview content is presented as actual production information, or development-only disclaimers clutter the rendered UI.
- A novel layout was introduced without being requested.
- A primary action is broken or presented misleadingly as working.
- Responsive and accessibility checks are missing or falsely reported as passed.

Governance prevents recurring design mistakes; it does not guarantee originality, visual excellence, or commercial performance. Human review remains necessary.