# AI Design — Agent Instructions

This repository produces reusable, production-oriented frontend assets. Functional clarity and familiar interaction patterns are the default. **Do not add decoration or novelty unless the user explicitly asks for it.**

## Mandatory workflow

1. Read [Anti-Slop Governance](governance/ANTI_SLOP.md) before planning, creating, or modifying any UI.
2. Define the user, task, necessary content, primary action, and relevant states. Ask a focused question only when missing information materially changes the structure or behavior; otherwise use clearly marked placeholders.
3. Start from established, usable interface patterns. Build the smallest practical interface. Do not introduce creative/novel layout treatments unless explicitly requested.
4. Add only visual elements needed for interaction, communication, navigation, grouping, state, or accessibility. Decorative elements require explicit user authorization, including a user-provided brand guide that specifies them.
5. Follow [Review Checklist](governance/REVIEW_CHECKLIST.md), fix violations, and report tests honestly before claiming completion.

## Mandatory defaults

- Use at most **two font families** across normal UI: one for headings and one for body; one is preferred if sufficient. A monospace face is a functional exception **only inside actual code, editor, or terminal content**.
- No invented section numbering, editorial kickers/eyebrows/overlines, decorative metadata, labels, or template-maker jargon in customer UI.
- **Never add ornamental status dots/colored indicators** next to headings, navigation items, or labels to imply activity, connectivity, or progress without a real corresponding state. Prefer plain text. Even when status exists, use an explicit status label; only add a graphical indicator if the user specifically requests it.
- Do not add gradients, glow, blur, decorative shadow, patterns, textures, irrelevant imagery, 3D, motion, ornamental icons/badges/cards, or background shapes without an explicit user request.
- Functional borders, focus outlines, status colors, meaningful icons, and accessible interaction feedback are allowed when needed; they are not automatically decorative.
- Do not infer permission for decoration or novelty from vague adjectives such as “modern,” “premium,” “clean,” or “professional.”
- Start with familiar navigation, forms, controls, and information hierarchy. Do not change proven behavior merely to look different.
- Use only genuine, user-provided information as factual product content. If data is missing, use a minimal **visibly identified placeholder** such as `[Product name]`; never fabricate metrics, testimonials, logos, claims, or technical capabilities. For demos, identify synthetic examples as examples.
- Use a small semantic token system and reuse suitable components. No filler content or purposeless variants.
- Make primary interactions work; never present dummy controls, fake AI outputs, or simulated functionality as real.
- Ensure responsive behavior, keyboard access, visible focus, semantic HTML, usable contrast, and meaningful states.

## Overrides and decision order

User-provided requirements and explicit brand specifications may authorize an otherwise restricted visual element. Record which requirement authorizes the exception. A user request for originality authorizes exploration **only within the stated scope**; it does not authorize unrelated decorative copy or fabricated information.

When a requirement is unclear but does not materially change the result, choose the simpler familiar pattern, not an invented flourish. When it materially changes the design, ask one focused question.

## Delivery report

For each new page or substantial revision, report briefly:
- **Purpose** — user, task, primary action.
- **Content assumptions** — real content vs labeled placeholders, any open question.
- **Exceptions** — specifically requested stylistic elements, or none.
- **Validation** — checklist result, tests actually performed, remaining limitations.

Source of truth: [governance/ANTI_SLOP.md](governance/ANTI_SLOP.md).

Use the corresponding references in [design-system/TOKENS.md](design-system/TOKENS.md), [TYPOGRAPHY.md](design-system/TYPOGRAPHY.md), [LAYOUT.md](design-system/LAYOUT.md), [COLORS.md](design-system/COLORS.md), [ASSETS.md](design-system/ASSETS.md), and [COMPONENTS.md](design-system/COMPONENTS.md) for concrete UI choices. The Governance rules take precedence if documents conflict.