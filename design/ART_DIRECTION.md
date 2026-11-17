# Art Direction — Composition inside the Approved Design System

Status: **Active** under Governance v2.1 and [Project Charter](../governance/PROJECT_CHARTER.md).

## Responsibility

Art Direction chooses **what to emphasize and how to arrange it**, not the project's approved color palette, font family, type scale or spacing tokens. The job is to generate an informative, professionally finished layout while respecting existing customer branding or the v1.0 Design System.

### Quick design plan (normal workflow)

1. Determine audience, first-screen recognition goal and next user action.
2. Rank what matters: offering/category, supporting business context, evidence, workflow, CTA.
3. Give visuals purposeful roles when appropriate: e.g., a business/context image can show **what type of work**, product/category imagery can show **what is offered**. Do not make photos mandatory.
4. Choose a coherent **composition**: text/image balance, content width, hero proportion, section rhythm and visual hierarchy using approved tokens.
5. If imagery materially helps and user preference is missing, ask the [one image question](../design-system/ASSETS.md), then use the chosen sourcing policy.

**One well-supported direction is sufficient** for normal requests. Compare two directions only if there is a material ambiguity, the user asks for alternatives, or visual QA reveals a substantive concept problem. Do not substitute two written paragraphs for actually good design.

## Pre-implementation design plan (required)

Before UI implementation, write the compact project-side [DESIGN_PLAN template](../development/PROJECT_TEMPLATES.md) and identify specific acceptance/evidence targets in the frozen [SCORECARD](../validation/SCORECARD.md). The design plan names:
- Real audience, first-screen message, necessary content sections, actual CTA.
- Chosen composition, intended image/text roles and responsive rearrangement (390/768/1440).
- Locked user-selected colors, fonts and layout tokens; known image rights/choices.
- Project risks: misleading imagery, repeated copy, purposeless Hero accents, weak functional feedback or visually empty sections.

**The plan does not invent palette/font exceptions.** Its corresponding checklist must be frozen **before** creating UI source. A new user-approved requirement may be recorded as a new plan revision; an agent may not silently rewrite prior expectations after viewing its output.

## Permitted creative choices

- Content-driven split Hero vs concise text-led introduction; editorial image-and-text rows vs product directory; navigation labels and information groupings.
- Responsive image crops/proportions, content-specific use of whitespace, relative visual emphasis and credible layout variation.
- Informative imagery, functional panels/dividers, real workflow numbers, meaningful hierarchy.

Do not conflate a creative **visual composition** with unfamiliar **navigation or form behavior**. Do not alter approved Neutral/white colors or Wanted Sans merely to make the output appear distinctive; a site can be visually excellent within them.

## Anti-pattern checks

- A large hero image representing only one of several equal business categories.
- Repeating the same category descriptions/images in Hero and subsequent sections without any new information.
- A large colored company-description band with little substance.
- Generic photo/illustration aesthetics or repeated hover arrows used as an AI landing-page recipe.
- Disproportionately empty or uniform sections when the task requires visual recognition.

These are **review prompts**, not categorical bans. Decide from actual content and screen evidence.

## Revision contract

Before changing a rendered page, record **Preserve / Change / Do not introduce** (1–3 items each). Prioritize resolving the issue without removing the original's informative/visual strengths. If a photo conveys useful context but is misleading, evaluate an equivalent replacement, rearrangement or more accurate visual treatment. Avoid automatic deletion.

Inspect actual 390/768/1440px screenshots and use [Visual QA](../validation/VISUAL_QA.md). Compare against the original for both Anti-Slop and professional finish. If neither candidate is clearly better, retain the original and report the tradeoff.

The art director **cannot override** approved Design System rules on its own.
