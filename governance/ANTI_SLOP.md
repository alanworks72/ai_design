# Anti-Slop AI Design Governance

Version: **2.0**. Applies to websites, components, templates and AI-generated frontend work.

## 1. Objective and distinction
Build **coherent, expressive, professional UI without generic AI embellishments or deception**. Anti-Slop is not a requirement to minimize images, colors, visual variety or design elements.

| Category | Policy | Examples |
|---|---|---|
| Information and interaction | Use when valuable | Useful images/screenshots, meaningful borders, categories, authentic feedback |
| Purposeful aesthetic expression | **Allowed without separate opt-in** | Brand accents, editorial layout, intentional typographic contrast, appropriate illustration, restrained depth and motion |
| Nonfunctional AI-Slop | **Prohibited** | Fake online dots, decorative English eyebrow stacks, invented metrics, arbitrary orbit art, repeated filler cards, unrelated images, random glow |

A gradient, shadow, rounded corner, illustration, photo or asymmetrical composition is not inherently Slop. Judge **purpose, coherence, prominence and repetition**. Identical-looking, under-designed white pages can also fail professional quality.

**Local usefulness does not prove global quality.** Each element can have a plausible purpose while their combined arrangement still creates an AI-template look. Evaluate page-wide duplication, disproportionate emphasis, generic illustration aesthetics, visual clichés and evidence density. A green palette, category drawings, a dark brand band and a card may each be defensible yet still form an unconvincing landing-page composition together.

## 2. Work order
Define user, task, necessary/verified facts, primary action and real states. Follow [Art Direction](../design/ART_DIRECTION.md) before UI code and [Visual Communication](VISUAL_COMMUNICATION.md) for image/copy meaning. Choose design based on audience, material and task, not minimum element count.

If images would improve understanding and user has not decided, **ask the user** as specified in [ASSETS.md](../design-system/ASSETS.md); record user decision. Contextual illustrative stock imagery can support a fictional mockup but may not be presented as actual company-owned inventory or facilities.

## 3. Honest content
- Mockups: use natural fictional company/contact examples; document their status outside customer UI. No intrusive "replace later" labels.
- Production: use verified company-specific facts and assets; ask when missing data materially affects truthful content.
- No invented customers, testimonials, metrics, certifications, guarantees, inventory or abilities.
- Name controls by real action: copying a draft is not submitting an inquiry.
- Copy should be idiomatic and useful; remove redundant instructions and unsupported generic slogans. Real step numbers and category labels are legitimate.

## 4. Visual standards
- Allow purposeful brand/style expression and content-driven compositions even without explicit style instructions.
- Reject ornamental status dots without real state, fabricated metadata, arbitrary shapes, unrelated stock art, unjustified glow, forced card repetition and purely decorative UI copy.
- Purposeful images, accent colors, editorial asymmetry, restrained shadows/gradients and motion may be used when coherent, relevant and accessible. No blanket prior approval required for every visual choice.
- Preserve familiar navigation/forms and correct keyboard/action semantics; visual originality must not obstruct use.
- A visually empty wireframe is not a successful finished site simply because it contains zero forbidden ornaments.

## 5. Design systems
Use semantic tokens and internally consistent typography, colors, spacing and components. [Design System](../design-system/TOKENS.md) values are starters, not mandatory identical branding across projects. Allow a deliberate project-specific system, respecting existing user branding and contrast/accessibility.

## 6. Verification gates
- **Brief:** truth, task, actions and audience understood.
- **Direction:** purposeful visual concept; appropriate hierarchy, images and user image decision (if triggered).
- **Implementation:** real interactions, semantics, responsive behavior and contrast verified.
- **Visual QA:** inspect actual desktop/mobile screenshots for both over-design and under-design; conduct a skeptical *direction-level* review of whole-page composition, including whether the original strategy should be rejected, and revise substantive defects per [VISUAL_QA.md](../validation/VISUAL_QA.md).
- **HITL:** independent human aesthetic/editorial approval separate from static/browser PASS.

Hard failure: misleading content/functionality, fake status, unlicensed asset distribution, known broken/inaccessible primary action, demonstrably purposeless recurring UI garnish. Quality failure: generic, visually underdeveloped composition, incoherent hierarchy or awkward copy. **Novel layout alone is not a failure.**

Design quality is not guaranteed by the absence of Slop; an independent reviewer must assess it. See [REVIEW_CHECKLIST.md](REVIEW_CHECKLIST.md).
