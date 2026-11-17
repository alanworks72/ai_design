# AI Design

**Anti-Slop AI Design Methodology — normalized Governance v2.1 / approved Design System v1.0**

Goal: enable Codex, Claude and other Code Agents to produce meaningful, reliable, professionally finished web pages with **one task prompt** and a reusable set of development rules.

**Anti-Slop means removing pointless AI-generated embellishments, not removing design itself.** Quality requires *both* Anti-Slop compliance and useful visual composition.

## Single entrypoint

Read [AGENTS.md](AGENTS.md), which links the normative references below. Specify the page brief; agents handle purposeful layout and actual implementation without a multi-agent ceremony by default.

## Normative references

- [Project Charter & locked decisions](governance/PROJECT_CHARTER.md) — mission, historical errors, approval policy and the immutable decision boundary.
- [Anti-Slop Governance](governance/ANTI_SLOP.md) — content integrity, no fake/decorative filler, permissible purposeful visual expression.
- [Design System v1.0](design-system/TOKENS.md) — approved baseline values, with [Colors](design-system/COLORS.md), [Typography](design-system/TYPOGRAPHY.md), [Layout](design-system/LAYOUT.md), [Assets](design-system/ASSETS.md), and [Components](design-system/COMPONENTS.md).
- [Art Direction](design/ART_DIRECTION.md) — composition and hierarchy **within** the approved system.
- [Visual Communication & Editorial](governance/VISUAL_COMMUNICATION.md) — natural copy and informative image roles.
- [Review Checklist](governance/REVIEW_CHECKLIST.md), [Visual QA](validation/VISUAL_QA.md) — separate rule compliance, browser function and visual finish.

## Visual assets and style

New projects: offer **default white + Neutral** or a custom color palette once, unless already specified. Never silently invent a branded palette. If the agent finds images materially helpful and image preferences are undecided, ask once whether the user will supply assets, permit suitably rights-cleared illustrative media, or prefers no imagery.

The default typeface is **Wanted Sans**; typography and spacing follow v1.0. Familiar navigation/form behavior is required; original, content-specific visual compositions are allowed. An existing customer style overrides the generic default and must be preserved.

## Optional quality escalation and research

Regular projects should use one Code Agent and brief screenshot QA. If persistent issues warrant it, an [isolated Critic](validation/MULTI_AGENT_EVALUATION.md) can assist, with Preserve/Change/Avoid and **before/after non-regression** checks.

[Validation experiments](validation/README.md) and [multi-device guidance](validation/MULTI_DEVICE_WORKFLOW.md) remain available. Historical experiments are pinned to their original Governance revisions; restoring v1.0 does not retroactively relabel past results.

This repository contains a design methodology and experimental documentation, not a released commercial component catalogue.
