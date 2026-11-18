# Design System — Component Rules

- Version: **1.0**
- Technology direction: **React + shadcn/ui + Tailwind CSS**; installed versions must be inspected before implementation.

## 1. Build from user actions

For each component define:
1. User and real task.
2. Necessary input/data and realistic fictional examples for mockups; verified data for production.
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

For a **preview page**, use concise, realistic but obviously fictional values where a finished UI needs content: `가온유통`, `02-000-0000`, `서울특별시 OO구 OO로 123, 3층`, `contact@example.com`. Do **not** insert on-page messages like “replace with actual data,” “design preview,” or “local-only data”; record preview assumptions in development notes instead. Do not fabricate performance figures, customer proof, certifications, testimonials, or technical capabilities. For **production**, use verified information rather than fictional values. If missing information materially changes the flow, ask a focused question.

## 5. Implementation checklist

- [ ] Purpose/user action documented.
- [ ] Familiar interaction behavior chosen; purposeful visual composition is allowed within approved Design System.
- [ ] UI fonts within limit; typography tokens used.
- [ ] No purposeless decorative text/assets/effects or repetitive filler cards; informative assets and functional interaction feedback remain allowed.
- [ ] Colors and spacing follow approved tokens.
- [ ] Component states, responsive behavior and keyboard usability reviewed.
- [ ] Actual implementation tests run or **Not tested** accurately recorded.
- [ ] Separate static checks, browser tests and human-in-the-loop review per `../governance/REVIEW_CHECKLIST.md`; never report unrun checks as Passed.

## 6. Reference implementation boundary

Do not treat static design boards, generated screenshots or third-party award pages as reusable source components. Only the project's reviewed and licensed implementations can become sellable assets.

## Whole-site component contracts (proposed extension)

Apply [Site System](SITE_SYSTEM.md): shared accessible Header/Footer, real route navigation, truthful active state, hierarchical breadcrumb when relevant, real error/not-found behavior, and distinct Page Types from the frozen Sitemap. **Reuse components for behavior and consistency, not to clone one visual page template across routes.** Native accessible controls remain acceptable when appropriate under existing implementation rules. Every mandatory URL requires a Page Spec and direct URL/browser evidence; see [Website Gate](../validation/WEBSITE_QUALITY_GATE.md).
