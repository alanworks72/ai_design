# AI Design

Reusable frontend components and website design packs with a shared **Anti-Slop Governance v1.1**.

## Governance

- [AGENTS.md](AGENTS.md) — entrypoint and instructions for AI coding agents.
- [ANTI_SLOP.md](governance/ANTI_SLOP.md) — normative design, content, interaction, typography, decoration and originality rules.
- [REVIEW_CHECKLIST.md](governance/REVIEW_CHECKLIST.md) — implementation/release review and evidence record.

## Design System

- [Tokens](design-system/TOKENS.md) — shared values, ownership and project initialization.
- [Typography](design-system/TYPOGRAPHY.md) — type scale and font policy.
- [Layout](design-system/LAYOUT.md) — spacing, grid and card-minimal layout.
- [Colors](design-system/COLORS.md) — neutral palette, semantic state colors and customization.
- [Assets](design-system/ASSETS.md) — purposeful imagery, icons and license checks.
- [Components](design-system/COMPONENTS.md) — functional component rules for shadcn/ui and Tailwind CSS.

## Default approach

1. Start with the user's task, necessary content, and primary action.
2. Use familiar interface patterns and at most **two standard UI font families** (functional code/terminal font exception).
3. **Do not add nonfunctional decoration or novel design patterns unless the user explicitly requests them.**
4. Use minimal, visibly labeled placeholders when content is missing. Ask only if missing information changes the structure or behavior materially.
5. Build meaningful, accessible interactions, then review and report actual test results.

Visual effects, decorative UI copy, and originality are **opt-in**, not agent defaults. Functional borders, feedback, icons, and product imagery remain acceptable when required for the task.

## Working with coding agents

Open the repository root so compatible coding agents can discover `AGENTS.md`. Other agents must be instructed to read `AGENTS.md` and the Governance file directly. Always consult `governance/REVIEW_CHECKLIST.md` before declaring a result ready.

## Project status

Governance documents maintained here; production design components are not yet committed.