# Design System — Tokens

Version **2.0**. [Governance](../governance/ANTI_SLOP.md) defines integrity constraints; [Art Direction](../design/ART_DIRECTION.md) chooses a project-appropriate visual identity.

## Principles
**Tokens ensure internal consistency; they must not force every website to look identical.** Preserve existing brand design systems. Default values are starters, and deliberate project-level adaptations are allowed when appropriate to audience, brand and content.

Ownership: [Colors](COLORS.md), [Typography](TYPOGRAPHY.md), [Layout](LAYOUT.md), [Assets](ASSETS.md), [Components](COMPONENTS.md).

## Starter tokens
| Role | Neutral starter | Policy |
|---|---|---|
| Background | #FFFFFF | May adapt within coherent project theme |
| Main foreground / primary | #171717 | May use approved project accent |
| Muted foreground | #737373 on white; #525252 on #F5F5F5 | Contrast verified in context |
| Border / surface | #E5E5E5 / #F5F5F5 | Functional or coherent visual grouping |
| Typography | Website body 16/24, product dense 14/20; Wanted Sans | Default, not mandatory brand identity |
| Weights | 400 / 500 / 600 | Can extend intentionally in project typography |
| Spacing | 4,8,12,16,24,32,48,64,80,96px | Starter scale, composition-aware |
| Radius | No mandatory global scale | Component/project consistency |

Use CSS variables / semantic Tailwind mapping; check actual installed Tailwind/shadcn version. Verify contrast, disabled/focus states and loading in browser.

## Project initialization
- Existing theme: preserve.
- User has chosen palette: respect it.
- No prior preference: if brand/palette materially affects the design, ask one concise question about neutral starter vs project-specific color direction. **If the user delegates styling decisions**, choose a restrained direction and document it rather than forcing Neutral everywhere.
- White is a safe starter, not a compulsory backdrop. Choose accents and surfaces coherently, avoiding arbitrary colors and unverified brand marks.

Project overrides are design decisions, not automatically prohibited decoration. Actual commercial releases require rights/accessibility review.
