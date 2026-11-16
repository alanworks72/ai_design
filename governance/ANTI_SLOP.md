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

- **Enough information to design the structure:** proceed with minimal, **explicitly labeled placeholders** (`[Product name]`, `[Description]`, `[Price]`) only where needed.
- **Examples needed to demonstrate behavior:** use small, realistic data clearly labeled **example / sample**, not implied to be a real customer's content.
- **Content would materially change the page structure, features, or primary action:** ask the user a concise, targeted question before making the consequential choice.
- Never manufacture real-sounding testimonials, statistics, customers, reviews, prices, product capabilities, or endorsements as if verified. Do not use marketing fluff to fill space.

Do not ask for every missing detail when a usable neutral placeholder is sufficient.

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

Real workflow step numbering, meaningful filters/categories, required technical compatibility notes, form labels, status/error feedback, and accessibility text are functional and allowed.

**Deletion test:** If removing the text causes no meaningful loss of understanding, navigation, or decision quality, remove it unless the user explicitly requested that copy.

## 5. Decoration: explicit opt-in

**Default rule: Do not add nonfunctional decoration.** Brand identity alone, a desire for uniqueness, or adjectives such as “premium” do not grant the agent permission to add ornaments.

Without an explicit user request, do not add:
- Gradients, glow, decorative blur, textures, geometric background shapes, visual noise, ornate shadows.
- Decorative 3D, animations, illustrations, unrelated photos, decorative icons or badges.
- Separators, cards, ornamental borders, or empty panels solely to make the page look designed.
- Fabricated visual labels to balance a layout.

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

- Define semantic colors and consistent spacing, radius, and type scales; avoid arbitrary style values.
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

**Gate D — Review:** evaluate at desktop/mobile widths, check copy deletion test and placeholder labels, inspect for unauthorized ornamentation and novelty, execute [REVIEW_CHECKLIST.md](REVIEW_CHECKLIST.md).

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
- Unverified content appears as fact instead of being labeled as placeholder/sample.
- A novel layout was introduced without being requested.
- A primary action is broken or presented misleadingly as working.
- Responsive and accessibility checks are missing or falsely reported as passed.

Governance prevents recurring design mistakes; it does not guarantee originality, visual excellence, or commercial performance. Human review remains necessary.