# Design System — Layout & Spacing

- Version: **1.0**

## 1. Spacing tokens (approved)

Use only these common distances unless the actual content requires a justified exception:

`4, 8, 12, 16, 24, 32, 48, 64, 80, 96px`

| Relationship | Typical starting distance | Notes |
|---|---|---|
| Icon and short text | 4–8px | Only when icon is functional |
| Label to input | 8px | Keep semantic association |
| Related elements | 12–16px | Establish one visual group |
| Independent form fields | 24px | Give controls breathing room |
| Independent content sections | 32–48px | Separate by distance before borders/cards |
| Major website sections | 64–96px | Not mandatory in dense product UI |

**Balanced** is the default density. Compact and Generous remain **comparison variants**, not official multipliers or alternative token scales.

## 2. Grid and containers

- Start with the simplest layout that serves content: single column for forms, split view for input/output or comparison, and tables for aligned records.
- The approved optional grid for complex pages is **12 desktop / 8 tablet / 4 mobile columns**. Do not enforce a grid on every page.
- Approved desktop content max-width: **1280px**. Default horizontal padding: **mobile 20px / tablet 32px / desktop 48px**. Treat them as starting values; preserve content and prevent overflow when a page requires adjustments.
- Use the **installed Tailwind CSS version's default breakpoints** as initial responsive thresholds; verify the installed values, and move the threshold if content requires. Validate at **390px, 768px and 1440px** widths plus points around any actual layout change.
- CSS Grid/Flexbox and conventional navigation patterns first; no deliberately broken grids or experimental navigation without an explicit user request.

## 3. Card-minimal layout policy

- **Do not put every section or metric inside a Card**. Group content using spacing, alignment, and typographic hierarchy first.
- Add a border, background panel or Card only when it conveys a true boundary, separated interaction, comparison or status.
- Keep meaningful dividers; avoid repeated ornamental horizontal rules.
- Prefer content-driven composition rather than automatic hero + three cards + generic mock dashboard.

## 4. Border radius policy

The Design System **does not define a global radius scale in v1.0**. This does **not** require all components to have square corners. Existing shadcn/ui component behavior may be retained for usability, but do not introduce large rounded Card surfaces as decoration. Revisit only if real component consistency issues arise.

**Governance alignment:** The global radius scale is intentionally deferred. Governance permits this when radius is not a necessary design token.

## 5. Responsive and accessibility checks

- Prevent horizontal overflow and clipped controls at 390px.
- Preserve reading order when columns collapse.
- Keep labels, errors, buttons and keyboard focus clear at all sizes.
- Validate long localized strings and realistic empty/error states.

## 6. Reference basis

Spacing defaults are informed by public scales in **IBM Carbon** and **GitHub Primer**. Layout candidates are our own design decisions; they are **not claimed to be measured values** from award-winning live pages. Carbon has its own grid; our 12/8/4 proposal is not Carbon's implementation.