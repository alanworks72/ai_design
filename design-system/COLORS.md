# Design System — Colors

- Version: **1.0**
- Source of truth for approved default palette values and explicitly identified experimental candidates. Use with `TOKENS.md`.

## 1. Default neutral palette

| Semantic role | Value | Usage | Status |
|---|---|---|---|
| `background` | `#FFFFFF` | Main page background | **Agreed** |
| `foreground` | `#171717` | Main content text | Approved |
| `muted-foreground` | `#737373` | Supporting text on white only (4.74:1 on white); use `#525252` on surface | Approved |
| `surface` | `#F5F5F5` | Functional surface separation only | Approved |
| `border` | `#E5E5E5` | Subtle decoration/group separation only; not the sole control edge | Approved |
| `primary` | `#171717` | Main action when no branded accent is requested | Approved |
| `primary-foreground` | `#FFFFFF` | Text on primary actions | Approved |

Only use a surface or boundary when content grouping or focus is improved; no automatic card/badge styling.

## 2. Functional colors

Bright display colors communicate state; darker text companions carry legible text on white backgrounds.

| State | Indicator/fill | Text on white | Status |
|---|---|---|---|
| Success | `#22C55E` | `#15803D` | Proposed; brighter direction agreed |
| Warning | `#F59E0B` | `#92400E` | Proposed; brighter direction agreed |
| Error | `#EF4444` | `#B91C1C` | Proposed; brighter direction agreed |

Colors are not the only indicator: use readable text/iconography for completion, caution and errors. Never use bright fills as small text. Contrast checks for proposed interaction values are documented below; verify focus, control boundaries, disabled behavior and actual UI contexts in the browser before release.

## 3. Proposed interaction tokens (contrast-screened candidates)

| Role | Value | Scope / contrast check |
|---|---|---|
| `accent` | `#171717` | Neutral action default; white text 17.93:1 |
| `accent-foreground` | `#FFFFFF` | On neutral accent |
| `focus-ring` | `#2563EB` | Against white 5.17:1; against `#F5F5F5` 4.74:1 |
| `hover-surface` | `#F5F5F5` | Surface feedback; never the sole indicator of focus |
| `disabled-foreground` | `#737373` | Against white 4.74:1; if on `#F5F5F5`, use `#525252` (7.17:1) |
| `disabled-surface` | `#F5F5F5` | Pair with disabled semantics; do not rely on color alone |
| `surface-muted-foreground` | `#525252` | On `#F5F5F5`: 7.17:1 |
| `success-subtle` | `#F0FDF4` | Paired with state text/icon, not used as sole status indicator |
| `warning-subtle` | `#FFFBEB` | Paired with state text/icon |
| `error-subtle` | `#FEF2F2` | Paired with state text/icon |

These are **computed contrast-screened candidates**, not completed browser or WCAG audits. A color ratio alone does not establish a component's full accessibility. `#737373` on `#F5F5F5` is ~4.35:1, below 4.5:1 normal text contrast.

## 4. Color selection workflow

For a new project with no prior color decision, first offer **Default Template (white + neutral)** or **Custom Color Palette**. Ask once, not on every edit. Default background = `#FFFFFF`; change it only by explicit request. If customized, ask whether only accent/actions or the whole theme should change. Check text, controls, focus, status and disability states before accepting final color combinations.

Semantic roles remain stable when values change. Never hardcode one-off hex values inside repeated components if a token exists. Preserve existing themes when working on established projects.

## 5. Accessibility requirements

Target WCAG AA: normal text contrast ≥ 4.5:1; large text ≥ 3:1; essential non-text UI components/states ≥ 3:1, subject to applicable criterion. Validate actual pairs at implementation time and document failures. A subtle border **does not** automatically qualify as the sole visible control boundary. Labels, shape, and text should convey state without depending on color alone.

## 6. No implied decoration

A user requesting a brand color is **not** automatically requesting gradients, glows, illustrations, multicolor surfaces, backgrounds, or animations. Purely decorative effects remain opt-in under Governance v2.1; purposeful imagery and composition do not themselves count as decoration.

## 7. Evidence

Reference methodologies: Vercel Geist color roles, GitHub Primer functional color tokens, IBM Carbon theme/color rules, Dropbox Brand core/accent usage. This document does not claim those products use our proposed hex values.