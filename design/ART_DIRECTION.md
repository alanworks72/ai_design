# Art Direction — Composition inside the Approved Design System

Status: **Active** under Governance v2.1 and [Project Charter](../governance/PROJECT_CHARTER.md).

## Responsibility

Art Direction chooses **what to emphasize and how to arrange it**. It cannot independently replace the project's approved palette, font, type scale or spacing; a **user-selected, project-scoped Look** may explicitly authorize different values and becomes the approved identity for that one project. The job is to generate an informative, professionally finished layout while respecting existing customer branding or the v1.0 Design System.

### Quick design plan (normal workflow)

1. Determine audience, first-screen recognition goal and next user action.
2. Rank what matters: offering/category, supporting business context, evidence, workflow, CTA.
3. Give visuals purposeful roles when appropriate: e.g., a business/context image can show **what type of work**, product/category imagery can show **what is offered**. Do not make photos mandatory.
4. Choose a coherent **composition**: text/image balance, content width, hero proportion, section rhythm and visual hierarchy using approved tokens.
5. If imagery materially helps and user preference is missing, ask the [one image question](../design-system/ASSETS.md), then use the chosen sourcing policy.

**One well-supported direction is sufficient** for normal requests. Compare two directions only if there is a material ambiguity, the user asks for alternatives, or visual QA reveals a substantive concept problem. Do not substitute two written paragraphs for actually good design. **Either way, render a concrete opening and representative internal-page target before building every route**, per [Visual-first](VISUAL_FIRST.md).

## Pre-implementation design plan (required)

Before UI implementation, write the compact project-side [DESIGN_PLAN template](../development/PROJECT_TEMPLATES.md) and identify specific acceptance/evidence targets in the frozen [SCORECARD](../validation/SCORECARD.md). The design plan names:
- Real audience, first-screen message, necessary content sections, actual CTA.
- Chosen composition, intended image/text roles and responsive rearrangement (390/768/1440).
- Locked user-selected colors, fonts and layout tokens; known image rights/choices.
- Project risks: misleading imagery, repeated copy, purposeless Hero accents, weak functional feedback or visually empty sections.

**The plan does not invent palette/font exceptions.** An explicitly approved project Look may supply recorded different tokens; never silently alter v1.0 default for unrelated sites. Its corresponding checklist must be frozen **before** creating UI source. A new user-approved requirement may be recorded as a new plan revision; an agent may not silently rewrite prior expectations after viewing its output.

## Corporate website composition — business meaning before decoration

For a corporate site, start with the **Company Profile**, adequate source-backed content and [Reference Findings](../research/CORPORATE_SITE_REFERENCE_ANALYSIS.md) from the Site Blueprint. Do not design a beautiful `Home → three cards → generic process → contact` shell and then fill it with invented or repetitive sentences.

Define **one concise content-to-expression plan per page family**, e.g.:

| Page role | What must be understood | Possible appropriate form — not mandated |
|---|---|---|
| **Home** | what business this is, whom it serves, how to enter its offering | substantive enterprise message, relevant business/domain image/graphic where justified, clear real pathways |
| **Company** | actual enterprise identity, scope of service, business model | explanatory editorial hierarchy or process/business-model diagram **only if facts support it**; not mostly a buyer checklist |
| **Offering/index** | areas served and useful distinctions | comparison categories, representative context, concise sourced differences |
| **Product/category detail** | what is specifically different about this offering, how to assess it | meaningful examples, criteria/specifications, diagrams or images suited to that **specific category**; shared template is fine if information is genuinely unique |
| **Process** | how the interaction/work progresses and what the customer prepares | a readable sequence, decision/requirement points, exceptions where relevant |
| **Contact/task** | how to complete a valid action and recover from errors | focused form/instructions with truthful status, not decorative enterprise claims |

Decide the **information hierarchy first**, then choose visual media/shape to help visitors comprehend that information. A monochrome palette can support professional enterprise visuals; it does **not** require every page to be black headline + grey paragraph + thin rule + large blank space. An original editorial composition is permitted within locked type/color/spacing. Image-free layouts are acceptable only if they still communicate enough substance.

When several detail pages share a component, audit **content and composition together**:
- Do the visitors learn different facts/criteria on each page, beyond a changed title or repeated procurement advice?
- Does the type and depth of information justify a table, illustration, photograph, comparison, short form, or different order?
- Is the same image/card/arrow pattern repeated because of the brand system, or because the Agent copied a generic template with no communication value?

**What not to do:** copying the source website's layout/brand, forcing stock photography, fabricating customer stories/enterprise KPIs, changing Wanted Sans/Neutral tokens, or requiring an arbitrary "creative accent" for every route.

### Before/after visual evaluation contract

The first screenshot review must inspect **representative page families**, not only the global Homepage. For Company, ask whether the layout successfully communicates **company identity/business**, not simply whether the heading says "회사 소개". For category details, evaluate the usefulness of the distinct information. If a source is too sparse, escalate a **content gap**, not an empty ornamental panel or random filler. Distinguish a real page-purpose failure (Website W05) from local polish deficits (V1–V5 weighted score).

## Permitted creative choices

- Content-driven split Hero vs concise text-led introduction; editorial image-and-text rows vs product directory; navigation labels and information groupings.
- Responsive image crops/proportions, content-specific use of whitespace, relative visual emphasis and credible layout variation.
- Informative imagery, functional panels/dividers, real workflow numbers, meaningful hierarchy.

Do not conflate a creative **visual composition** with unfamiliar **navigation or form behavior**. Use [Project Look Contract](LOOK_CONTRACT.md) for approved style variation. The goal is visually distinctive composition, not a clone of any reference site or the mere absence of Slop. Do not alter approved Neutral/white colors or Wanted Sans merely to make the output appear distinctive; a site can be visually excellent within them.

## Anti-pattern checks

- A large hero image representing only one of several equal business categories.
- Repeating the same category descriptions/images in Hero and subsequent sections without any new information.
- A large colored company-description band with little substance.
- Generic photo/illustration aesthetics or repeated hover arrows used as an AI landing-page recipe.
- Disproportionately empty or uniform sections when the task requires visual recognition.

These are **review prompts**, not categorical bans. Decide from actual content and screen evidence.

## Visual target and icon/art-direction discipline (v3.2 extension)

Before full UI implementation, produce a compact Brand Kit and actually render (not just describe) a high-fidelity opening and one representative internal page. Define first-screen subject, shared alignment edges, text/media proportions, whitespace purpose and mobile rearrangement. Compare final screenshots to those targets. The target is AGENT_PROPOSED in one-shot CLI mode unless a person actually approves it.

Treat icons, arrows, metadata labels and decorative borders in context. An icon can communicate product semantics or a coherent visual vocabulary; a generic arrow following every link because of an AI UI recipe is suspect. Removing all icons/imagery is not a design improvement if it erases meaningful character. See [Visual-first](VISUAL_FIRST.md) and [Visual Acceptance](../validation/VISUAL_ACCEPTANCE.md).

## Revision contract

Before changing a rendered page, record **Preserve / Change / Do not introduce** (1–3 items each). Prioritize resolving the issue without removing the original's informative/visual strengths. If a photo conveys useful context but is misleading, evaluate an equivalent replacement, rearrangement or more accurate visual treatment. Avoid automatic deletion.

Inspect actual 390/768/1440px screenshots and use [Visual QA](../validation/VISUAL_QA.md). Compare against the original for both Anti-Slop and professional finish. If neither candidate is clearly better, retain the original and report the tradeoff.

The art director **cannot override** approved Design System rules on its own.

## Site-wide Art Direction (proposed extension)

[Site Architecture](SITE_ARCHITECTURE.md) fixes route families before visual composition. Define one shared brand language **within approved Design System v1.0**, but choose content-specific layouts for Home, index, detail, process, contact and other actually required pages. Reuse Header/Footer and semantic tokens without duplicating generic Hero/cards/CTA strips on all routes. Evaluate visual quality across representative **page families**, not just Home. Record the page-family composition matrix in the pre-code Site Blueprint; see [Site System](../design-system/SITE_SYSTEM.md).
