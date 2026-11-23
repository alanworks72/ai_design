# Project Look Contract — Selected Visual Identity Across Pages

A **Look** is a project-approved set of relationships between color, typography, spatial rhythm, image treatment, controls and page composition. It is **not** a fixed Section list and not a demand to copy a third-party template.

## Authority and precedence

1. Explicit current customer/project approvals and established existing-site identity.
2. A **user-selected or explicitly authorized project Look**, recording which token values it supersedes.
3. The locked **Design System v1.0 default** (white, Neutral, Wanted Sans and its existing type/spacing values).

Without a selected/authorized Look, **continue using v1.0 unchanged**. No agent may silently re-theme a project by calling a Look "more creative." A new look may supersede v1.0 **for the named project only**, not globally. Brand/custom requirements can prevent a suggested Look from being used.

The default v1.0 is a strong baseline, **not a rule that every future customer website must look the same**. A user-selected Draft Room-like direction might use warm neutrals, display sans and readable mono for technical notes *if specifically approved*; this does **not** replace the global Wanted Sans default or legal font-use checks.

## The compact contract

Record the following in `docs/AI_DESIGN_PLAN.md` before final UI implementation (a separate JSON file is optional, not required).

| Field | Question / example | Evidence |
|---|---|---|
| `look_source` | Existing brand / user-selected external Look / user custom / approved v1.0 default | User choice or versioned brief |
| `look_name` | Meaningful project identifier; not a trademark claim | Choice snapshot |
| `status` | APPROVED / DEFAULT / PROPOSED / PENDING | Approval owner and revision |
| `visual_premise` | One useful design idea that expresses this business | Content-derived reason |
| `tokens` | Background, text, accent, font families/roles, scale, spacing, width, corners, controls | Exact authorized values or reference to v1.0 |
| `composition` | Hero focus, shared alignments, density changes, transition grammar and purposeful whitespace | Rendered visual target |
| `media` | Product interface, diagram, photography, illustration; role and rights/provenance | Asset registry |
| `page_families` | How Home, Company, Index, Detail, Guide, Contact inherit identity **without identical compositions** | Sitemap/Page Specs |
| `interaction` | Actual navigation, menus, focus/hover/motion; reduced motion | Behavior/QA contract |
| `constraints` | Verified business facts, content gaps, accessibility, no-deceptive-proof rules | Source registry / Governance |

The Look is an **aesthetic contract with evidence**, not a guarantee of good output merely because every CSS value is followed.

## Example of usage, not a default change

A client selects a technical "Draft Room" direction for a developer tool. The contract could describe a warm-grey page, large display typography, mono labels for actual technical metadata, square controls, framed diagrams and a strong useful product demonstration. Concrete values must come from what the **user actually approved** and legally usable fonts/assets.

The same Look does not mean the same page layout:
- **Home:** convey the software's central workflow in a large meaningful demonstration, with a real entry action.
- **Comparison:** concise data-dense matrix and relevant competing workflow facts, **only if supplied**.
- **Docs/Guide:** readable code/example layout suited to searching and copying.
- **Download:** real installation/platform instructions and feedback states.
- **Contact/Support:** focused task interface without generic marketing sections.

Do not automatically create a six-logo cloud, deployment statistics, blog or testimonials just because a Page Template includes placeholders. A provided reference is **composition evidence**, never permission to invent business facts.

## Selecting and applying a Look within Code Agent rules

1. Use the user's selected Look or established brand. If none was selected, preserve the approved v1.0 default; suggest alternatives only when design direction is materially unresolved.
2. Record approval and overridden values. An Agent's own recommendation is not project approval.
3. Produce an actual rendered opening and one representative internal page; verify the identity and role differentiation before implementing the full site.
4. Apply the selected Look to the whole sitemap; freeze design decisions in the Site Blueprint before implementation/QA.
5. For requested Look changes, record the new approval and rerun affected visual/accessibility checks.

A Code Agent in one-prompt mode may choose **composition within the approved identity**. It must not infer permission to change approved typography/colors from an example screenshot alone.

## Rights and external design references

DesignPrompts' free Builder prompt may be used in an authorized customer project according to its [Terms](https://designprompts.dev/terms), but **do not bundle/publish the prompts as a catalogue**, re-host paid Components/Systems as a competing template/asset service, or reuse third-party product marks as client brand. ai_design rules should express **independently written design principles**, not copy proprietary content/code. Fonts and imagery require their own rights verification.

## Acceptance

A selected Look can be implemented correctly and still feel generic. At final QA judge actual **visual character, craft, page-family consistency and information value**, not CSS token equality alone. See [Visual-first](VISUAL_FIRST.md) and [Visual Acceptance](../validation/VISUAL_ACCEPTANCE.md).
