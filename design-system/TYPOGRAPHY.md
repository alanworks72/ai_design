# Design System — Typography

- Version: **1.0**
- Status: type scale approved; **Wanted Sans selected as default** (webfont packaging and rendering need technical verification).

## 1. Font policy

- Start with **one sans-serif family** for normal UI; maximum **two** (heading and body) only if a real need emerges.
- Actual code editor, code block or terminal content may use a monospace family as a **functional exception**, never for pseudo-technical decoration.
- Default family: **Wanted Sans** for Korean/English UI. The official family is licensed under SIL OFL 1.1; preserve license and copyright notices when redistributing font files. Prefer an appropriately tested WOFF2/subset webfont and a system sans-serif fallback. **Asta Sans (42dot)** remains an optional alternative on explicit request. Verify actual font package, glyph coverage, network load, and redistribution bundle before selling.
- Keep readable Korean fallback glyphs; do not introduce extra font families section-by-section.

## 2. Approved type tokens

| Token | Size | Line height | Weight | Intended role |
|---|---:|---:|---:|---|
| `display` | 40px | 48px | 600 | Major website heading; not every screen |
| `heading-lg` | 32px | 40px | 600 | Product page title / section overview |
| `heading-md` | 24px | 32px | 600 | Section heading |
| `heading-sm` | 20px | 28px | 600 | Subsection heading |
| `body` | 16px | 24px | 400 | Content-heavy website text |
| `body-sm` | 14px | 20px | 400 | Dense product UI and supporting text |
| `label` | 14px | 20px | 500 | Field label, navigation, button |

The approved default weights are **400, 500, 600**. Do not add 700+ by default. These are our design decisions, not a measured average of award-winning sites.

## 3. Contextual usage

- Website: prefer `body` (16/24) for paragraphs; use 40/48 only for a genuinely primary headline.
- Product UI: `body-sm` (14/20) is acceptable for information-dense controls; use 16/24 for long prose.
- Use semantic HTML headings (h1–h6) according to document structure; the visual token and HTML tag are **not** the same concept.
- Keep label text immediately associated with its input. Do not reduce essential text to tiny captions to create a designed appearance.
- Mobile: use responsive, content-driven heading reduction if the large heading causes wraps or overflow. Exact mobile heading values must be verified with actual screens, not assumed from one screenshot.

## 4. Copy and hierarchy

- No decorative eyebrows, kickers, metadata, invented section numbering or gratuitous uppercase labels.
- Prefer a useful heading and a concise explanatory sentence over a decorative heading stack.
- Use weight, spacing and actual content priority before introducing accent colors.
- Check Korean/English long words, numbers, mixed scripts, and truncation.

## 5. Verification

At implementation: capture computed font family, font size, weight and line height at 390px and 1440px widths; visually inspect real text wrapping, weight support, and loading. Do not mark these tests as passed without running them.

## 6. Reference basis

Approved scale is informed by publicly documented typography roles in **Vercel Geist**, **GitHub Primer**, and **IBM Carbon**. Award-winning sites such as Dropbox Brand and Exat were assessed for **purpose and typography usage**, but their browser computed style values were **not directly measured**.