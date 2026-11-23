# Design System — Tokens

- Version: **1.0**
- Status: **Version 1.0; proposed values explicitly marked**
- Applies with: `../governance/ANTI_SLOP.md` (v2.1; original v1.0 approved token values preserved)

## 1. Principles

Tokens encode repeated **functional choices**, not decoration. Defaults are fixed across projects unless the user opts to customize colors at project start. Existing project tokens take precedence: never silently overwrite them.

**Token ownership**
- `COLORS.md`: semantic colors and state colors.
- `TYPOGRAPHY.md`: font, size, weight, line-height.
- `LAYOUT.md`: spacing, max-width, breakpoints, grid.
- `COMPONENTS.md`: behavior and component usage, referencing these tokens.

## 2. Defaults

| Domain | Default | Status |
|---|---|---|
| Background | `#FFFFFF` | **Agreed** |
| Primary foreground/action | `#171717` | **Approved default** |
| Neutral supporting text | `#737373` on white; use `#525252` on surface | **Approved default; contrast checked** |
| Neutral border/surface | `#E5E5E5` / `#F5F5F5` | **Approved default** |
| Functional colors | Green `#22C55E`, amber `#F59E0B`, red `#EF4444` | **Proposed values; direction agreed** |
| Body typography | Product UI 14/20; Website 16/24 | **Approved default** |
| Font weight | 400 / 500 / 600 | **Approved default** |
| Spacing | 4, 8, 12, 16, 24, 32, 48, 64, 80, 96px | **Approved default** |
| Radius | **No shared radius scale yet** | **Agreed** |
| Card layout | Not a default layout tool | **Agreed** |

Do not introduce a `radius` scale just because shadcn/ui exposes radius-related CSS variables. A component may retain a necessary library default; document any product-wide deviations rather than using rounded cards as a style language.

## 3. Tailwind / shadcn/ui binding

Use **CSS variables with semantic names** and map them to Tailwind utilities. Check actual installed Tailwind/shadcn versions before generating exact configuration code; v3/v4 configuration conventions differ.

Example *conceptual mapping*:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --surface: #f5f5f5;
  --border: #e5e5e5;
  --primary: #171717;
  --primary-foreground: #ffffff;
}
```

These tokens alone are **not** a complete shadcn/ui theme: required component tokens and contrast combinations must be defined and tested in the actual project before use.

## 4. Project-scoped Look selection (v3.2 extension; approved defaults unchanged)

A customer may explicitly select or approve a visual Look. For **that project only**, record the selected [Look Contract](../design/LOOK_CONTRACT.md): exact tokens actually approved, rationale, rights and scope. Precedence: established project theme or explicit user selection > v1.0 defaults. **Without that authorization, this file's default remains binding.**

A Look is broader than a palette: it defines relationships among type, imagery, spatial rhythm, section composition and controls. It does not authorize copying a third-party's source/template or inventing client logos. An Agent may recommend visual options within a future Builder, but cannot treat a recommendation as consent.

A selected Look's font and type scale may differ from Wanted Sans/v1.0 **only when explicitly included in authorized project customization**. This is no global token revision.

## 5. Project initialization policy

1. Check whether the existing project has an established design system. If yes, preserve it; never silently replace colors.
2. When starting a **new project** and no preference has already been stated, present two choices once: **“기본 템플릿(흰색 + Neutral) / 사용자 정의 컬러 팔레트 중 무엇을 사용할까요?”**. Do not ask again when the user has already made the choice.
3. If default: use the approved neutral palette. If custom: obtain the brand color(s), requested scope (accent only or whole theme), and background preference.
4. Keep `#FFFFFF` background unless the user specifically requests another color or a dark theme.
5. Generate semantic tokens and verify readable foreground/background, border, hover, focus, disabled, and feedback states.
6. Do not ask for each hex value individually when one representative brand color suffices to prepare a **proposal**; proposed derivative colors still require validation.

## 6. Exceptions and release

An explicitly requested alternate theme changes concrete color values, **not** Governance prohibitions on decorative copy, effects, or fabricated content. Document the selection. No UI is release-ready until the repository Governance checklist is executed.

## 7. Research provenance

Based on our prior comparisons of the *officially published* systems of GitHub Primer, IBM Carbon, and Vercel Geist, plus user decisions. The values listed as proposed are **our chosen defaults**, not measured averages of award-winning websites. Computed styles of awarded sites remain unmeasured.