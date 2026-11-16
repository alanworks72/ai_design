# Design System — Assets

- Version: **1.0**
- Applies under Governance v1.3: decoration is **explicit opt-in**.

## 1. Selection rule

Before adding an image, icon, illustration, chart, video or animation, write one sentence answering: **What will the user understand or do better because of this asset?** If there is no concrete answer, omit it. Empty space is acceptable.

**Do not interpret this as an image-minimization target.** First identify whether a first-time visitor needs to *see* the product, environment, process, or interface to understand the offering. If yes, choose the smallest informative set of appropriate visuals; avoiding all imagery can itself be a design failure.

### Stock photo classification

- **Informative stock photography** (conditional default): Depicts a generic product category, workplace setting or common process to help identify the offering; use only when it adds meaning, matches the stated scope and has appropriate rights. Example: a generic warehouse aisle as logistics context on a fictional B2B distributor mockup, **not** a claim that the company owns that facility.
- **Decorative stock hero** (explicit opt-in): Mood-only imagery with no meaningful connection to the visitor's decision, or any photograph used solely to occupy a hero slot. A stock photo is not automatically decorative because it is in the hero, nor informative merely because it depicts the industry.
- **Actual-organization evidence** (requires verification): Real facilities, employees, inventory, branded products, delivery fleet, client work or other claims of fact. Do not replace missing evidence with stock assets.

Compare the informative-asset and text-only alternatives before choosing a text-only layout for a domain where visual examples may aid recognition. Record the user benefit and representation/licensing constraints, not merely “no real photos provided.”

## 2. Allowed use cases

| Asset | Functional reason | Default |
|---|---|---|
| Product screenshot | Shows actual interface and workflow | Use when necessary; otherwise omit |
| Product photo | Shows physical product or relevant usage | Use when necessary |
| Photography | Demonstrates a real environment or use case | Use when it meaningfully clarifies the business; distinguish illustrative stock from actual company evidence |
| Icon | Distinguishes actions/status, supports scanning | Use sparingly and consistently |
| Illustration | Explains an idea that text/UI cannot explain efficiently | Case-by-case; no decorative filler |
| Chart | Shows measured data or comparisons | Only with real or explicitly labeled example data |
| Video/animation | Demonstrates behavior or gives meaningful feedback | Only when required; respect reduced motion |
| Abstract art, mood-only stock hero, 3D background | Decorative identity without information value | **Off by default**, user opt-in |

An actual product screenshot is more informative than an invented dashboard mockup. Do not claim a static preview represents working functionality.

## 3. Consistent usage

- Start with one icon library when icons are needed; **Lucide** is a candidate compatible with the shadcn/ui ecosystem. Verify installed version and license for commercial redistribution.
- Do not mix unrelated illustration or icon styles on one page.
- Preserve intrinsic image proportions and provide appropriate alt text; purely decorative images (when explicitly requested) should not clutter assistive narration.
- Do not add unnecessary borders, background cards or captions around every asset.
- Use authentic product material or clearly fictional preview examples. Record the fictional source in design/review notes **outside rendered UI**; do not insert decorative on-page 'sample' or 'replace later' disclosures. Never invent visual evidence, certification, performance claims or customer logos. Production assets must be verified.

## 4. Licensing checklist

Before including an asset in a **sold** design pack, confirm: source, author, license, modification rights, redistribution rights, commercial use, attribution obligation and any trademark constraints. Reference-only screenshots from third-party sites are **not automatically licensed for resale**.

| Asset | Source | License | Redistribution allowed? | Attribution | Status |
|---|---|---|---|---|---|
| `[Asset]` | `[URL/source]` | `[License]` | `[Yes/No/Unknown]` | `[Requirement]` | Pending |

Do not bundle third-party brand assets into a pack without explicit rights.

## 5. Provenance

The guidelines are informed by *Dropbox Brand imagery/iconography*, *GitHub Primer*, *Vercel Geist* and *IBM Carbon*. They describe our usage decisions, not proof that these references apply identical policies to every site.