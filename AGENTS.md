# AI Design — Agent Instructions

Goal: **Anti-Slop AI Design** produces polished, purposeful, distinctive, accessible UI. Anti-Slop is not anti-design or mandatory minimalism.

## Mandatory workflow
1. Read [Governance](governance/ANTI_SLOP.md); identify audience, task, truthful content, key action and states.
2. Establish **Art Direction** using [ART_DIRECTION.md](design/ART_DIRECTION.md): information priority, concept, imagery roles, composition, visual hierarchy, identity.
3. **Image consultation:** if the agent judges that images would materially improve the page and the user has not already specified image preferences, ask one concise question offering (a) user images, (b) appropriately licensed illustrative images selected/created by the agent, or (c) no images. Explain why; record the answer. Follow [ASSETS.md](design-system/ASSETS.md). Do not assume no assets means no imagery. If consequential, resolve the choice before final design; do not block unrelated reversible work.
4. Implement with project-specific semantic tokens and [Design System](design-system/TOKENS.md). Familiar interaction semantics remain; thoughtful original composition is allowed.
5. Open real rendered screenshots and evaluate **both AI-Slop and under-design** using [VISUAL_QA.md](validation/VISUAL_QA.md). Revise high-impact visual/editorial failures and recheck.
6. Verify functionality and accessibility using [REVIEW_CHECKLIST.md](governance/REVIEW_CHECKLIST.md). Independent HITL approval remains separate.

## Hard boundaries
- No fabricated metrics, customers, partnerships, facilities, certifications, inventory, live states or technical claims.
- No fake status dots, ornamental English eyebrow labels, invented section indices, generic meaningless slogans, decorative card stacks or unrelated stock scenery.
- **Purposeful design expression is allowed by default**: coherent visual composition, relevant photography, intentional typography and layout proportions, project accents, restrained depth or motion when justified. Don't automatically remove an element because it is visually expressive.
- Honest actions, keyboard access, focus, contrast, mobile reading order, appropriate motion and responsive behavior are required.
- Preview content may use natural fictional values documented outside rendered UI; real production claims must be verified.
- At most two UI font families by default, with functional monospace for actual code.

## Precedence
User requirements, factual integrity, accessibility and real function > Anti-Slop ban on misleading/purposeless choices > chosen project Art Direction > starter Design System tokens. Existing brand themes are preserved. Original visual composition needs no special opt-in; unfamiliar interactions and paid asset acquisition do.

## Reporting
Describe purpose, art direction, image question/decision and rights, assumed facts, visual revisions, actual tests and unresolved HITL issues. Do not claim visual excellence from tests alone.
