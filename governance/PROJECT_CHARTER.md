# AI Design — Project Charter & Decision Register

Status: **NORMATIVE / locked project decisions**  
Methodology version: **2.1 normalization**  
Approved Design System: **v1.0**, reference commit `852ebd4ef6ee67678480e0790ad3e3a0bd2478aa`

## Mission

Specify a **simple, reusable set of development rules for Codex, Claude and other Code Agents** to build meaningful, reliable, professionally finished web pages **without AI-Slop**. An agent should normally need only the task brief + entrypoint `AGENTS.md`; users should not have to manually manage an agent team or provide a detailed layout prompt for routine work.

Anti-Slop means eliminating purposeless, deceptive, cliché, or repeated visual noise. It **does not mean removing design**. Functional accuracy, approved design consistency, Anti-Slop compliance, and visual quality are **separate** requirements.

## Invariant decisions — do not silently rewrite

| Area | Approved default / status | Change authority |
|---|---|---|
| Background | White `#FFFFFF` | User-requested/custom theme, or preserve an established project theme |
| Neutral palette | `#171717` foreground/primary; `#737373` muted on white, `#525252` on `#F5F5F5`; `#E5E5E5` border; `#F5F5F5` surface | User-approved palette customization |
| State colors | Bright success `#22C55E`, warning `#F59E0B`, error `#EF4444` are **proposed candidates**, not automatically approved for every text/fill context | Test contrast, verify context and explicitly record final state colors |
| Typeface | **Wanted Sans** default; normal UI at most 2 families; monospace only for actual code. Asta Sans is an optional explicit-request alternative | User request / existing brand design |
| Type scale | `40/48/600`, `32/40/600`, `24/32/600`, `20/28/600`, `16/24/400`, `14/20/400`, `14/20/500` | Preserve hierarchy; responsive/content necessities are reasoned exceptions, not permission to invent a new brand scale |
| Spacing | `4,8,12,16,24,32,48,64,80,96px` | Content-driven exceptions justified within the same project |
| Layout | Optional 12/8/4 grid; max desktop content 1280px; horizontal padding mobile/tablet/desktop 20/32/48px; verify real breakpoints | Content and responsive needs within existing system |
| Cards/radius | Do not wrap everything in Cards; no global border-radius scale approved | Functional component needs / explicitly revised design decision |
| Technology direction | React + shadcn/ui + Tailwind CSS where appropriate; installed versions verified | Different existing stack or explicitly justified/approved project choice |
| Imagery | Purposeful images **allowed**, not required. **Ask user once** if agent finds images materially valuable and preference is unknown | User chooses source / licensed illustrative / no-image; preserve prior choice |
| Brand/color setup | On new projects without a known palette choice, offer **default neutral vs custom palette once**. Existing theme is preserved | User selection |

The source files under `design-system/` remain the authoritative detailed values. This table protects **decisions**, not a claim that every state-color candidate has passed a complete accessibility audit.

## Responsibility boundaries

1. **Governance**: factual integrity, usability/accessibility, Anti-Slop prohibitions; may **not** change approved design tokens.
2. **Design System**: approved values and component conventions; project styling changes require the authority above.
3. **Art Direction**: content priority, original visual **composition**, meaningful image/text relationships, proportion and section rhythm **within** the Design System. It cannot decide a new palette, font or global scale on its own.
4. **Implementation**: working controls, semantics, responsive behavior, source/evidence and rights.
5. **Validation**: separately assess Design System compliance, Anti-Slop, functionality/accessibility and visual quality. Aesthetic regression can reject an otherwise correct edit.

An innovative but legible composition does not require user permission. Arbitrary gradients, fake status dots, English label stacks and irrelevant pictures do not become valid simply because someone can invent an aesthetic rationale.

## Default workflow — minimal interaction

Brief → read Governance + approved Design System → one palette question **if needed** → one image-use question **if triggered** → select purposeful composition → implement → inspect actual rendered viewports → make **targeted** fixes → run functional/static checks → report outstanding subjective approval.

One direction is sufficient for ordinary requests. Additional alternatives, isolated Critic or multi-agent stages are **optional escalation**, not a requirement for every website.

When revising existing work, write a short **Preserve / Change / Do not introduce** contract. Never remove approved informative imagery, typography or other strengths merely to silence a criticism. If the revision loses important visual quality, **do not adopt it**; compare with the original and revert/refine.

## What went wrong, and permanent safeguards

1. **v1.x overconstraint:** “smallest practical interface” and “novel layout only on request” could suppress legitimate composition. Remove those constraints on **composition** while retaining familiar **interaction** patterns.
2. **v2.0 scope error:** relaxing the Governance led to reclassifying previously approved design tokens as freely alterable “starters.” Restore v1.0 tokens; Art Direction cannot override them.
3. **Uncontrolled iteration:** many variables (rules, visuals, prompts, models and revisions) changed together. Preserve pinned baseline, task and evidence; do not infer reproducible improvement from one screenshot.
4. **Critic/Implementer gap:** criticism was “solved” by removing a useful image, creating an under-designed result. Critique must preserve strengths and compare actual before/after quality.
5. **Workflow sprawl:** special prompts and multiple agents became the default. Keep single-entry agent rules usable; introduce further agents only when the user or measurable failure warrants it.

## Change control

Before editing a normative document: identify its owner, compare against this charter and v1.0 baseline, distinguish **clarification vs changing an approved decision**, and record exact impact. **Do not modify approved Color, Font, Type Scale, Spacing or baseline component policy without explicit user approval.** Any user-approved change should be scoped and recorded rather than silently propagated to unrelated work.

Archive experiment-specific prompts and evidence under `validation/`; historical runs keep their original pinned governance versions. Neither a high build-test pass count nor zero decorative elements proves a finished design.

This charter is a decision record designed to prevent silent regression of the project's agreed goals.
