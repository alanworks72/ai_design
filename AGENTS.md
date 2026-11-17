# AI Design — Code Agent Instructions

**Mission:** Create meaningful, reliable, professionally designed web pages with **Anti-Slop**. This is a simple, reusable rule set for Codex, Claude and other Code Agents—not an instruction to produce empty wireframes.

## Required references and priority

Read [Project Charter & locked decisions](governance/PROJECT_CHARTER.md), then [Anti-Slop Governance](governance/ANTI_SLOP.md), the approved [Design System](design-system/TOKENS.md) and its [Typography](design-system/TYPOGRAPHY.md), [Layout](design-system/LAYOUT.md), [Colors](design-system/COLORS.md), [Assets](design-system/ASSETS.md) and [Components](design-system/COMPONENTS.md). Use [Art Direction](design/ART_DIRECTION.md) for composition and [Visual Communication](governance/VISUAL_COMMUNICATION.md) for content.

**Priority:** user-approved project requirements and factual/functional/accessibility integrity > locked Design System choices > purposeful Art Direction within those choices > optional visual embellishment. Governance forbids Slop; it may not silently overwrite Design System decisions.

## Default workflow (one task prompt is enough)

1. **Understand the brief:** audience, real action, necessary content and states; do not invent factual claims or fake function.
2. **Respect the approved style:** keep an existing project's theme. For a new project lacking a palette decision, ask **once** whether to use the default white/Neutral system or user-defined colors; don't ask again when already chosen.
3. **Consider images:** if imagery materially improves understanding and the user has not decided its use, ask **one concise question** offering user-provided assets, agent-selected/created rights-checked illustrations/photos, or no imagery. If already decided, proceed. [Details](design-system/ASSETS.md).
4. **Design and implement:** choose a good, content-specific layout and image/text hierarchy **using the approved tokens**. Original composition is allowed; unconventional interaction patterns require separate justification. Use the agreed React + shadcn/ui + Tailwind direction by default; document a necessary stack exception rather than silently changing the target.
5. **Review visually:** open actual 390/768/1440 screenshots. Check **both Slop and under-design**; fix substantive problems without deleting useful strengths. See [Visual QA](validation/VISUAL_QA.md).
6. **Verify and report:** build/function/accessibility, Design System compliance, Anti-Slop and visual quality are distinct checks; never claim unrun tests or independent human HITL approval. [Checklist](governance/REVIEW_CHECKLIST.md).

## Non-negotiables

No fabricated metrics, facilities, customer proof, false active-state indicators, decorative editorial junk, filler cards, irrelevant visuals, fake AI output or dead primary controls. Purposeful **images, visual contrast, layout variety and composition are allowed**. More decoration is not automatically better; less design is not automatically safer.

When revising an existing page, preserve valuable assets, information and functional behavior by default. A critique item is not permission to indiscriminately remove images or change an approved palette. **Reject/revert a revision if it lowers overall quality.**

## Escalation

A single Code Agent is the normal path. A separate Critic or multi-agent process is optional for persistent quality problems or explicit user request, with a **before/after non-regression gate**. Do not make users manage a chain of agents for routine work.

## Delivery

Briefly record the chosen composition, image/palette decisions, source and rights, implemented actions, screenshots/QA, tests actually run and remaining limitations. Mockup-only factual disclosures belong in development notes, not as decorative page text.
