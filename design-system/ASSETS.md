# Design System — Assets

- Version: **1.0**
- Applies under Governance v2.1: **purposeless decoration is opt-in; informative assets are permitted**.

## 1. Selection rule

Before adding an image, icon, illustration, chart, video or animation, write one sentence answering: **What will the user understand or do better because of this asset?** If there is no concrete answer, omit it. Empty space is acceptable.

## 2. Image consultation

When Codex, Claude or another Code Agent **itself determines that imagery would materially help** a new page and the user has not specified image handling, ask one focused question before final asset selection:

> 이 페이지는 [정보 전달 목적]을 더 명확하게 보여주는 이미지가 도움이 될 것 같습니다. 이미지는 ① 직접 제공 ② 제가 권리를 확인한 예시 이미지를 선정·제작 ③ 이미지 없이 구성 중 어떤 방식으로 진행할까요?

Explain the concrete purpose and recommend an option. **Ask once, only when needed**. Respect previously supplied image instructions without repeating the question. Approval to source illustrative imagery does not grant permission to imply actual company inventory/facilities, use restricted trademarks, buy assets or assume resale rights. Record the choice. If the choice materially changes the design and no answer is available, mark it PENDING; unrelated reversible work may proceed.

When revising an existing page, **preserve approved informative assets by default**. If an image is inaccurate, propose a replacement or other equivalent way of conveying its information; do not silently delete the image solely to eliminate a critique item. Compare before and after comprehension and visual quality.

## 3. Allowed use cases

| Asset | Functional reason | Default |
|---|---|---|
| Product screenshot | Shows actual interface and workflow | Use when necessary; otherwise omit |
| Product photo | Shows physical product or relevant usage | Use when necessary |
| Photography | Demonstrates a real environment or use case | Only when content supports it |
| Icon | Distinguishes actions/status, supports scanning | Use sparingly and consistently |
| Illustration | Explains an idea that text/UI cannot explain efficiently | Case-by-case; no decorative filler |
| Chart | Shows measured data or comparisons | Only with real or explicitly labeled example data |
| Video/animation | Demonstrates behavior or gives meaningful feedback | Only when required; respect reduced motion |
| Abstract art, stock hero, 3D background | Decorative identity | **Off by default**, user opt-in |

An actual product screenshot is more informative than an invented dashboard mockup. Do not claim a static preview represents working functionality.

## 4. Consistent usage

- Start with one icon library when icons are needed; **Lucide** is a candidate compatible with the shadcn/ui ecosystem. Verify installed version and license for commercial redistribution.
- Do not mix unrelated illustration or icon styles on one page.
- Preserve intrinsic image proportions and provide appropriate alt text; purely decorative images (when explicitly requested) should not clutter assistive narration.
- Do not add unnecessary borders, background cards or captions around every asset.
- Use authentic product material or clearly fictional preview examples. Record the fictional source in design/review notes **outside rendered UI**; do not insert decorative on-page 'sample' or 'replace later' disclosures. Never invent visual evidence, certification, performance claims or customer logos. Production assets must be verified.

## 5. Licensing checklist

Before including an asset in a **sold** design pack, confirm: source, author, license, modification rights, redistribution rights, commercial use, attribution obligation and any trademark constraints. Reference-only screenshots from third-party sites are **not automatically licensed for resale**.

| Asset | Source | License | Redistribution allowed? | Attribution | Status |
|---|---|---|---|---|---|
| `[Asset]` | `[URL/source]` | `[License]` | `[Yes/No/Unknown]` | `[Requirement]` | Pending |

Do not bundle third-party brand assets into a pack without explicit rights.

## 6. Provenance

The guidelines are informed by *Dropbox Brand imagery/iconography*, *GitHub Primer*, *Vercel Geist* and *IBM Carbon*. They describe our usage decisions, not proof that these references apply identical policies to every site.