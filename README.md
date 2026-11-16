# AI Design

**Anti-Slop AI Design Methodology — Governance v2.0**

Purpose: produce polished, purposeful, distinctive, usable frontends without generic AI decoration, fabricated content or misleading interactions. **Anti-Slop does not mean removing visual design.**

## Core documents

- [AGENTS.md](AGENTS.md): agent workflow and conditional user consultation about images.
- [Anti-Slop Governance](governance/ANTI_SLOP.md): the boundary between purposeful design and Slop.
- [Art Direction](design/ART_DIRECTION.md): visual identity, information priority, composition and image roles.
- [Visual Communication & Editorial Quality](governance/VISUAL_COMMUNICATION.md): useful assets and natural, accurate copy.
- [Review Checklist](governance/REVIEW_CHECKLIST.md): release gates.
- [Visual QA](validation/VISUAL_QA.md): screenshot critique for both over-styling and under-design.

## Design System starters

[TOKENS](design-system/TOKENS.md) · [TYPOGRAPHY](design-system/TYPOGRAPHY.md) · [LAYOUT](design-system/LAYOUT.md) · [COLORS](design-system/COLORS.md) · [ASSETS](design-system/ASSETS.md) · [COMPONENTS](design-system/COMPONENTS.md)

Project-specific, coherent styling decisions are allowed. Preserve existing brand identity and verify accessibility. Neutral is a starter, not the compulsory appearance of every website.

## Image decision

When the agent independently judges informative images to be useful and the user has not already decided, it **asks one concise question**: user-provided assets, properly licensed agent-sourced/created illustrative assets, or no images. No unnecessary image question for interfaces that would not benefit from imagery. Never imply that stock imagery proves real-company facilities or products; check rights for sold design packs.

## Workflow

Brief → Art Direction → conditional image question → implementation → actual screenshot visual review/revision → browser/static QA → independent HITL.

Historical experiments under [validation](validation/README.md) remain pinned to their original Governance revisions. Their evidence must not be relabeled as v2.0 results.

This repository currently contains design methodology and experimental protocols, not a commercially approved component catalogue.
