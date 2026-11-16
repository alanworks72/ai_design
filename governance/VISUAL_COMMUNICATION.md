# Visual Communication & Editorial Quality

Status: **Mandatory design review** under Anti-Slop Governance v1.2. This guide adds positive quality criteria without relaxing any ban on purposeless decoration.

## 1. Principle

Minimalism is a method, not the objective. Create interfaces that communicate the offering and guide decisions **without looking like either a generic AI landing page or an empty wireframe**.

An asset is **informative content** when it improves recognition, comparison, verification, task completion or comprehension. It does not require decorative opt-in. An asset is **ornament** when it merely fills space, adds a fashionable mood or mimics a template; section 5 of [ANTI_SLOP.md](ANTI_SLOP.md) still applies.

## 2. Required pre-design decisions

Record briefly in development/review notes (not in rendered customer UI):

1. **First-screen recognition:** What should a first-time visitor recognize before scrolling? State the actual offering, audience and primary action in plain language.
2. **Evidence and assets:** Would a photo, actual product/UI screenshot, diagram or example materially improve understanding? For each proposed asset, state the information it carries. If no asset helps, explicitly choose text-only.
3. **Content priority:** Rank the page's primary action and the two or three most important information groups. Use type scale, alignment, proportion, contrast and whitespace to distinguish them.
4. **Editorial plan:** Write a concrete headline, supporting explanation, section titles and action labels. Identify any missing business facts rather than inventing differentiators.
5. **Rights and accuracy:** Identify actual organization-owned content versus illustrative preview content. Check asset licensing and redistribution rights for commercial packs.

These decisions are lightweight notes, not new obligatory on-page labels or meta sections.

## 3. Visual selection examples

| Context | Often informative | Avoid without explicit request |
|---|---|---|
| B2B distributor | Actual products, product categories, relevant logistics context | Decorative orbit graphics, unrelated factory shots, generic credibility claims |
| Manufacturer | Products, verified process/site imagery | Decorative machinery imagery that implies unverified capabilities |
| SaaS | Actual UI screenshots or a truthful workflow diagram | Fabricated dashboards, stock laptop mockups masquerading as the product |
| Portfolio | Real project outputs and role-specific evidence | Generic stock hero, meaningless badges |
| Forms or settings | Usually clear controls and contextual examples | Forced stock photos, decorative illustration |

Do not turn examples into mandatory page templates. Avoid claiming a stock image is a photo of the company's facilities or staff. Illustrative images must remain honestly contextualized. If assets are unavailable or redistribution rights are unknown, use truthful diagrams, text, or appropriately licensed alternatives instead of false evidence.

## 4. Editorial quality

- Prefer a **clear customer-facing proposition**, not a description such as “B2B distribution company website.”
- Write concise, idiomatic Korean where the audience is Korean. Read main headings, explanatory sentences and CTAs aloud for unnatural particles, repetition or unnecessary jargon.
- Write actions as the action the interface genuinely performs: “문의 내용 복사” if the app only copies a draft; do not label it “문의 전송” without sending.
- Remove claims not supported by the brief, including speed, nationwide distribution, cost savings, certifications, number of clients or guaranteed supply.
- Do not fix weak copy by adding decorative English eyebrows, slogans or invented statistics.
- In a sample, natural fictional contact details are acceptable under Governance rules, but do not invent differentiating capabilities.

## 5. Hierarchy without visual clutter

- Make the **primary value and CTA** visually easy to locate. Not every content block needs equal size or emphasis.
- Use approved typography and spacing tokens. Use emphasis (size/weight/contrast) deliberately, and functional semantic colors as defined in the Design System.
- Vary composition only when content meaningfully warrants it; repeating identical rows can be correct for equally ranked items. Do not force asymmetry merely to hide an AI-generated appearance.
- Use images selectively in the hero and content sections when the image actually teaches or distinguishes. Do not create a mandatory hero/photo/cards pattern.
- Maintain accessibility, text contrast, responsive reading order and honest controls.

## 6. Final HITL questions

Before delivery, record **Pass / Fail / PENDING** and evidence for:

1. Can a first-time visitor identify the business or product without reading the entire page?
2. Does each major visual convey useful information? Would removing it harm understanding? If nothing visual is used, is that justified?
3. Is the primary action obvious and accurately labeled?
4. Are Korean copy and section headings specific, natural and free from unsupported claims?
5. Does the page have meaningful hierarchy without invented labels, arbitrary cards, gradients or status dots?

**Do not self-certify visual excellence from source inspection, automated tests or this checklist.** Human review is required. Refer to [REVIEW_CHECKLIST.md](REVIEW_CHECKLIST.md).
