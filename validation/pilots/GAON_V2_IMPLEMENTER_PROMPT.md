# Codex revision handoff — Step 2 (AFTER independent critic report)

Current working directory: `~/project/design_test/critic-revision`. This is a **copy** of `governed-v2-methodology`, not the original.

Read in order:
1. `../critic-pilot/CRITIC_FIRST_PASS.md` — independent screenshot-based critique
2. `../reference/ai_design/AGENTS.md` and the latest Governance / Art Direction / Design System
3. Existing current project's design notes and implementation

## Task
Make **one cohesive direction-level design revision**, addressing the critic's strongest supported concerns while preserving what works. Do not merely adjust typography, shadows or crop if the core issue is duplicated information and disproportional composition.

- Decide separately whether the Hero should convey business context and whether the category section should convey offering detail; remove redundant visual/text content.
- Match section emphasis to user priority. Do not let a small generic company description dominate the page merely because a large band looks polished.
- Keep the user-approved image handling choice (agent-sourced/created illustrations allowed), but do **not** treat that choice as permission to add assets or invent claims. Existing assets may be reused or removed. If materially different new imagery or paid assets are needed, ask the user as specified in ASSETS.md.
- Preserve honest inquiry draft and clipboard actions, working form, accessibility, responsive behavior, existing real/fictitious data boundaries and rights.
- Avoid replacing current Slop with sterile all-white wireframes; purposeful design is permitted.

## Evidence
- Capture screenshots BEFORE and AFTER at 390, 768, 1440 in `evidence/critic-revision/`, and open them.
- Write `docs/CRITIC_REVISION.md` mapping each independent critique item to action, preservation, reason, and remaining disagreement.
- Run actual build and existing functional/browser tests; distinguish PASS, FAIL and NOT RUN and do not self-certify aesthetic or HITL PASS.
- Record which files changed. No changes to sibling projects, `../reference/ai_design`, Git commit or push.

Finish by reporting the before/after visual differences and test evidence. If the independent critique lacks concrete support, say so rather than making random design changes.
