# Design System — Component Rules

- Version: **1.0**
- Technology direction: **React + shadcn/ui + Tailwind CSS**; installed versions must be inspected before implementation.

## 1. Build from user actions

For each component define:
1. User and real task.
2. Necessary input/data and clearly labeled placeholders.
3. Primary action and feedback.
4. Empty, error, loading, success, disabled states as applicable.
5. Keyboard/focus/label requirements.
6. Responsive behavior.

Do not create a component merely to increase pack inventory or appear visually sophisticated.

## 2. Composition rules

- Start with shadcn/ui primitives for buttons, input fields, labels, menus, dialogs and tables as appropriate. Use versions documented by the installed project.
- Use a **Card only if the content has a real conceptual/interaction boundary**; don't build a page by wrapping every section in a Card.
- Do not add badges, icons, separators, tabs, fake navigation, dummy CTAs or ornamental borders solely to fill an interface.
- Never use decorative status dots beside text/navigation (such as a green dot next to a page label). For genuine system status, show a clear textual state. Add a dot only when specifically requested and it reflects real application data; color alone must not convey meaning.
- Use meaningful text labels. Avoid fabricated editorial metadata, section numbers and internal developer terms in customer-facing UI.
- Styling references semantic color, type and spacing tokens, not arbitrary values.
- Radius is left to component necessity/library defaults until a shared policy is approved.

## 3. Interaction baseline

- Every visible button/link should perform a meaningful action. Nonfunctional prototypes must be clearly identified and should avoid misleading interactive affordances.
- Forms: label, validation, error recovery and success feedback.
- Modals/dropdowns: accessible names, keyboard behavior, focus management and dismissal.
- Tables: meaningful headers and accessible data relationships.
- Display real results for a working demo; do not imitate AI behavior with fixed canned outputs unless disclosed as simulation.

## 4. Copy and empty content

When content is unknown, use minimal explicit placeholders (`[Product name]`, `[Description]`) and do not invent customer proof, pricing, reviews or technical specifications. If information changes the whole flow, ask a focused question before making the design decision.

## 5. Implementation checklist

- [ ] Purpose/user action documented.
- [ ] Familiar UX pattern chosen; no unsolicited novelty.
- [ ] UI fonts within limit; typography tokens used.
- [ ] No unauthorized decorative text, assets, gradients, glows, animation, card repetition.
- [ ] Colors and spacing follow approved tokens.
- [ ] Component states, responsive behavior and keyboard usability reviewed.
- [ ] Actual implementation tests run or **Not tested** accurately recorded.
- [ ] Review complete per `../governance/REVIEW_CHECKLIST.md` before release.

## 6. Reference implementation boundary

Do not treat static design boards, generated screenshots or third-party award pages as reusable source components. Only the project's reviewed and licensed implementations can become sellable assets.