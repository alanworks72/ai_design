# Visual-first Website Design — Decide the Visual Target Before Building

**Purpose:** Stop a website generator from producing clean but interchangeable Hero/cards/CTA sites. Build and **inspect a concrete visual target**, then implement the site against it. Use with [Look Contract](LOOK_CONTRACT.md), [Site Architecture](SITE_ARCHITECTURE.md), [Art Direction](ART_DIRECTION.md) and the existing website hard gates.

This workflow is **one agent's internal design job**, not a mandatory separate user prompt, mandatory Figma file or demand for three full alternative websites.

## What changes from the old workflow

Old failure mode: gather business facts → make Sitemap → follow default tokens → implement routes → call the screenshots "polished" on a generous self-score.

Visual-first: business/content and Site Blueprint → **project-approved Look** → compact Brand Kit / visual direction → **rendered opening and representative internal page** → visual acceptance against content and Look → **then** implement the whole site → screenshot comparison and QA.

A written Art Direction or a pair of near-identical wireframes is **not** visual evidence.

## Stage 0 — Ground facts and page purpose

Before designing: identify actual business/service, audience, top actions, content rights, adequate per-page facts, required routes and source confidence. Review relevant industry reference websites when available for *information architecture and information needs*. Do not copy their imagery or business claims.

The selected Look is either an explicitly approved client Look, a preserved established brand, or the v1.0 default. See [Look Contract](LOOK_CONTRACT.md). Do not silently invent a new palette.

## Stage 1 — Compact Brand Kit (one short project artifact)

Express the **approved** identity as a visible sheet or prototype:
- color combinations and actual UI text on surfaces;
- display/body/technical text roles (font rights and actual availability);
- button, form, focus and navigation treatments;
- imagery/diagram crops and licensing; how a product interface is presented;
- a clear visual premise: what will make **this site** recognizable.

A Brand Kit may be rendered HTML/CSS if image generation is unavailable, or a reference image if image generation is appropriate and authorized. **It is not itself a site and does not prove final implementation.**

## Stage 2 — Visual target: opening **and one representative inner page**

Render the **complete opening** (navigation, Hero, visible actions, first meaningful media/product demonstration), not just text and rectangles. The opening may extend beyond one viewport if the content needs it.

Choose **one interior page family** that tests the Look's ability to support real information (Product Detail, Docs, Company or Task depending on site). Render actual content, not generic placeholders.

**Pre-render composition decisions**:
1. What is the primary visual subject and first message?
2. Where do title, media and action align? Which edges are shared?
3. How much scale belongs to each task? Which whitespace has an explainable role?
4. What varies in density, background and layout; why?
5. How does it recompose at 390px rather than merely stacking everything?
6. How do content-specific comparisons, specifications or forms look under this identity?

Use a **real browser** to render at 1440 and 390 (768 for responsive QA as normal). Open screenshots. If rendering cannot be performed, record `VISUAL_TARGET_UNVERIFIED`, do not call an unviewed sketch an approved design.

### Quality checks before implementation

- First-screen recognition: can a visitor tell **what the business/product actually is** and what to do?
- Strong *content-specific* focal element: meaningful interface, diagram, product/context image or typographic relationship. No invented proof.
- **Whole-page composition:** adjacent areas form a reading flow, not an automatic sequence of identical bands.
- Contrast in information density and media scale where content benefits; no uniformly empty sections.
- Visible color/typographic hierarchy, actual intended font, optical line breaks and readable small labels.
- Each prominent icon/arrow/dot/border has a role in navigation, system status, comparison **or intentional design language**. Repeated decorative arrows are suspect, **not every icon forbidden**.
- Inner page carries the same identity but has a different task-appropriate composition.
- Narrow layout is actually usable, with clear focus, actions and text.

**Do not approve the target because it simply matches the chosen hex values.** The target must be visually composed and relevant to the content.

## Stage 3 — Approval without breaking one-prompt UX

- **CLI/one-shot mode (default):** perform internal visual critique, correct material issues within a bounded iteration, freeze visual target as `AGENT_PROPOSED`, then continue implementation and present the result as a **review candidate**. Do not claim human acceptance.
- **Explicitly staged review mode:** only when the user requests a checkpoint, show the rendered opening and Look and pause for actual approval; otherwise continue the one-shot implementation. Record `APPROVED_BY_USER` only after a real approval action.
- **Explicit approval-required brief:** pause once at that checkpoint. No publish, payment or external action without user authorization.

These are development rules, not requirements to implement an editor, approval UI or other website-building product features. An ordinary code task should not become a long requirements interview.

## Stage 4 — Whole-site implementation against the target

Create a **page-family expression map**. Reuse site identity/tokens and working shared controls; vary composition with real content:

| Page role | Visual emphasis / task | Regression to avoid |
|---|---|---|
| Home | opening premise and offering pathways | target shrinks to generic split Hero |
| Company | what the actual organization does and how | another "buyer preparation" checklist |
| Offering index | comparative distinctions and meaningful entry routes | uniform filler cards |
| Product/detail | useful diagrams, specifications and context | identical sparse title/table/CTA for every detail |
| Guide/docs | readable sequences/code/examples with real actions | decorative numbers without meaning |
| Contact/task | short, clear validation and actual result states | attractive but fake submission |

Do not enforce identical section sequence, 3-column cards or decorative dividers across page families. Preserve the approved Look's *visual relationships*, not its sample content slots.

## Stage 5 — Compare final builds to the visual target

After actual implementation:
1. Open real screenshots of opening, representative inner page, and the other required page families at 390/768/1440.
2. Compare against the **frozen target**: leading subject, text/media ratios, alignment, typographic character, spacing rhythm, background relationships, and informative image treatments.
3. Identify at most three **material gaps**, not a list of random CSS preferences. Preserve what already works.
4. Refine in at most two normal targeted passes; check before/after and functional regression.
5. Record `TARGET_MATCHED`, `PARTIAL`, or `UNVERIFIED` with screenshot evidence. **Matching a target cannot alone certify a high-quality or correct website.**

Then run existing [W01–W06](../validation/WEBSITE_QUALITY_GATE.md), [Visual QA](../validation/VISUAL_QA.md), functional/accessible tests and unchanged historic [Scorecard](../validation/SCORECARD.md).

## Smallest durable output

Use the existing project `docs/AI_DESIGN_PLAN.md` to include the Look Contract, Brand Kit reference, visual target paths, page-family expression map and target approval state; use the existing `docs/WEBSITE_QA.md` for rendered comparison. **No mandatory extra planning files**.

If tool access makes prototypes impossible, do not fake them; report the limitation. An explicit user-supplied visual reference can seed the target if its rights and content are understood.
