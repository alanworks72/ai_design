# Anti-Slop AI Design Governance

Version: **2.1 (normalized)**  
Scope: Agent-generated web pages, components, prototypes and sellable design packs.  
Decision authority: [Project Charter](PROJECT_CHARTER.md), including the **approved Design System v1.0**.

## 1. Objective

Stop **meaningless or deceptive AI-generated design patterns** without stripping a page of useful visual communication or professional finish. **Anti-Slop is not Minimalism.** More/less decoration is not the score; clarity, relevance, consistency, authenticity and usable function are the criteria.

Keep separate:
- **Design System compliance:** approved palette, typography, spacing, components and user-authorized overrides.
- **Anti-Slop:** remove filler, generic copied conventions, fabricated information and unrelated visual noise.
- **Visual quality:** content-specific composition, meaningful imagery, hierarchy, readability and polish.
- **Functional quality:** real interaction, accessibility, responsive performance and truthful status.

A page can be free of Slop yet visually poor. Passing one dimension does not imply passing another.

## 2. Hard prohibitions

- Fabricated companies/customers, metrics, certifications, reviews, status/activity indicators, product capabilities, inventory, facilities or guarantees.
- False functionality: buttons that pretend to submit, canned AI outputs presented as real, success states without real success.
- Gratuitous editorial metadata such as `01 / SHOWCASE`, decorative uppercase English eyebrows, generic meaningless slogans or development/template notes displayed to customers.
- Arbitrary floating graphics, status dots, repeated shadow/glow/gradient motifs, unrelated imagery, or a Card around every section **with no justified communication or interaction purpose**.
- Unsupported asset/trademark claims or distribution rights.

**Deletion test:** if removing an element loses no useful communication, task support, coherent brand expression or visual hierarchy, remove it. Real process numbers, meaningful labels, actual state indicators and icons needed for clarity are not decorative merely because they are visual.

## 3. Positive design permission (within the approved Design System)

The agent **may independently compose** an effective Hero, useful category/content imagery, editorial rows, asymmetrical text/image layouts, varied section emphasis, whitespace and proportion. None requires a separate “novel layout” approval if it preserves familiar interactions and user comprehension.

This permission **does not** grant the agent authority to select a different primary color, background, font, typography scale, spacing system or framework contrary to [approved defaults](../design-system/TOKENS.md). Existing customer branding and explicitly chosen customization take precedence. Changing an approved style decision requires user authorization.

- Information-rich **photos or diagrams are permitted**, sometimes preferable to text-only pages; use [Assets](../design-system/ASSETS.md) and ask the user about images **only when beneficial and undecided**.
- Gradients/glows/3D/ornamental animation and decorative stock art are **off by default**. Functional layering/focus/shadows/short feedback transitions are allowed when needed; an aesthetic effect is not justified by the word “professional” alone.
- Avoid both generic “Hero + three decorative cards” formulas **and** over-sanitized black-text wireframes. Make composition content-specific without inventing unnecessary components.

## 4. Truthfulness and user content

- **Fictional preview**: natural, obviously fictional sample contact/content values when needed; note provenance outside the rendered UI. Do not invent real-sounding proof or credentials.
- **Production**: verify company-specific claims and asset ownership; ask when missing information changes the page meaningfully.
- **Forms**: actual labeled action matches implemented behavior; local draft-copy is not an email submission.
- **Copy**: concise idiomatic language, no repeated generic descriptions. A factual subtitle is permitted; an ornamental label stack is not.

## 5. Review and revisions

Work from the task and approved style → [Art Direction](../design/ART_DIRECTION.md) → implementation → [Visual QA](../validation/VISUAL_QA.md) → functional/style validation.

The implementation must preserve the value of existing informative assets and content unless changing them demonstrably improves **overall** quality. Correcting a misleading stock image by simply deleting all imagery and leaving a blank composition is not automatically an improvement. Criticism must identify what to preserve and what to change.

**Regressions are rejected:** compare original and revised screens; if the patch fixes a local complaint but makes the page worse globally, keep the original and propose a better alternative. An agent's own rationale or automated axe/build PASS is not an independent aesthetic endorsement.

## 6. Approvals and escalation

- Approved colors, fonts and style defaults remain binding unless explicitly changed by the user. A user-approved image sourcing route does not approve a new color theme.
- Ask at most one concise image-use question when informative imagery would materially help and the user has not already decided. Record the decision; avoid re-asking.
- Default to **one Code Agent** and one brief screenshot critique. A separated Critic or multi-agent workflow is an optional escalation, not mandatory bureaucracy.
- For a commercial release, final independent human review checks visual suitability, asset rights and open concerns. Unverified states are **PENDING**, never invented PASS.

See [Review Checklist](REVIEW_CHECKLIST.md).

## Website-wide Anti-Slop application (proposed v3.0)

The original element/page prohibitions apply across the **site**. The companion [Website-wide Governance](WEBSITE_ANTI_SLOP.md) rejects fake multi-page navigation using Home anchors, invented news/client cases or other filler routes, identical Hero/cards templates cloned everywhere, and arbitrary route-level style drift. Purposeful page-family differences and informative media remain **allowed**. These extra checks neither loosen factual rules nor override approved colors, typography or spacing.
