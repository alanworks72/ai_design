# Design System — Colors

- Version: **1.0**
- Source of truth for proposed palette values. Use with `TOKENS.md`.

## 1. Default neutral palette

| Semantic role | Value | Usage | Status |
|---|---|---|---|
| `background` | `#FFFFFF` | Main page background | **Agreed** |
| `foreground` | `#171717` | Main content text | Proposed |
| `muted-foreground` | `#737373` | Supplementary copy; validate contrast at actual text size | Proposed |
| `surface` | `#F5F5F5` | Functional surface separation only | Proposed |
| `border` | `#E5E5E5` | Boundaries if necessary | Proposed |
| `primary` | `#171717` | Main action when no branded accent is requested | Proposed |
| `primary-foreground` | `#FFFFFF` | Text on primary actions | Proposed |

Only use a surface or boundary when content grouping or focus is improved; no automatic card/badge styling.

## 2. Functional colors

Bright display colors communicate state; darker text companions carry legible text on white backgrounds.

| State | Indicator/fill | Text on white | Status |
|---|---|---|---|
| Success | `#22C55E` | `#15803D` | Proposed; brighter direction agreed |
| Warning | `#F59E0B` | `#92400E` | Proposed; brighter direction agreed |
| Error | `#EF4444` | `#B91C1C` | Proposed; brighter direction agreed |

Colors are not the only indicator: use readable text/iconography for completion, caution and errors. Never use the bright fill values as small text without checking contrast. Dedicated light status backgrounds, hover states and focus ring colors remain **TBD until tested**. Avoid silently inventing them in production.

## 3. Color selection workflow

For a new project, first offer **Default Neutral** or **Brand Customization**. Default background = `#FFFFFF`; change it only by explicit request. If customized, ask whether only accent/actions or the whole theme should change. Check text, controls, focus, status and disability states before accepting final color combinations.

Semantic roles remain stable when values change. Never hardcode one-off hex values inside repeated components if a token exists. Preserve existing themes when working on established projects.

## 4. Accessibility requirements

Target WCAG AA: normal text contrast ≥ 4.5:1; large text ≥ 3:1; essential non-text UI components/states ≥ 3:1, subject to applicable criterion. Validate actual pairs at implementation time and document failures. A subtle border **does not** automatically qualify as the sole visible control boundary. Labels, shape, and text should convey state without depending on color alone.

## 5. No implied decoration

A user requesting a brand color is **not** automatically requesting gradients, glows, illustrations, multicolor surfaces, backgrounds, or animations. Those remain explicitly opt-in under Governance v1.1.

## 6. Evidence

Reference methodologies: Vercel Geist color roles, GitHub Primer functional color tokens, IBM Carbon theme/color rules, Dropbox Brand core/accent usage. This document does not claim those products use our proposed hex values.