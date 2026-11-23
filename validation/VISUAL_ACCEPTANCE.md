# Visual Acceptance — Human-Calibrated, Page-aware Review (v3.2 proposal)

**A high Code Agent self-score does not equal great design.** Keep the historic [20-item Scorecard](SCORECARD.md) and Website Gates W01–W06 **unchanged** for historical comparability. Record **independent visual/user acceptance as a separate measure** until a new rubric is empirically validated.

## Known calibration examples — user ratings, not a universal scale

| Historical result | Agent self-score | Actual user rating | What the user observed |
|---|---:|---:|---|
| Industrial vision A (v3.1) | 95.00 | **70–75** | Clean, functional, but formulaic/safe and visually too conventional |
| Industrial vision B (Visual Art Direction Skill) | 93.75 | **82–84** | Layout and page composition substantially better; remaining icon/arrow slop and limited finish |

The order is **reversed** between self-score and user preference. These are one person's subjective judgments in one industry, under different sessions. **Do not retroactively change old scores**, infer numerical measurement error from unlike rubrics or claim generalizable effectiveness from one pair.

The user rates **all looks on [DesignPrompts](https://designprompts.dev/) at 90+** as a visual-quality reference pool. This establishes a preferred *level of design craft and diversity*, not a command to copy each template or score every project 90+ automatically.

## Separate evaluation questions

**A. Functional / integrity gate (not compensated by aesthetics):** honest facts, rights, actual page roles/routes, working CTAs/forms/states, mobile/readability/accessibility/security as applicable. Existing W and G gates control release eligibility.

**B. Visual craft assessment (independent; across page families):**
1. **Identity & differentiation:** would the site still look distinctly connected to its content if the logo/name were removed? Does it merely use an AI-generated generic layout?
2. **Composition & editorial rhythm:** one coherent reading flow, meaningful edge alignment, deliberate media/typographic scale and density shifts rather than section stacks.
3. **Information expression:** meaningful diagrams, product demos, specific comparative data, visuals that explain **this** business; no invented figures/clients.
4. **Page-family expression:** Home/Company/Index/Detail/Contact each solve their own reading task **within the same Look**; not cloned.
5. **Finishing & Anti-Slop:** purpose of icons/arrows, placeholder copy, decorations, borders, empty space, weak footer, cropped images, responsive details.

**C. Visual target fidelity:** did implementation preserve the frozen Look Contract, Brand Kit and opening/inner-page prototypes **without losing useful detail**? Fidelity is a separate diagnostic; a poorly composed target should not pass purely on similarity.

**D. Human acceptability:** would a real owner publish this design with no or minor revisions? What exact visual change would be needed?

## Proposed user score anchors (for visual review only)

| Range | Human-readable acceptance meaning |
|---|---|
| **95–100** | Distinctive, cohesive, strongly finished; almost no meaningful design revisions |
| **90–94** | Would choose for a real customer project with minor polish; purpose-specific visual identity across page families |
| **80–89** | Good direction; substantive polish, repetition or page-family issues still block high confidence |
| **70–79** | Clean/basic and usable but visibly generic, formulaic or under-composed |
| **<70** | Major design/content presentation issues or obvious unfinished treatment |

**These are proposed qualitative descriptions, not a validated conversion formula from the 100-point rubric.** The score must be supported by screenshots and page-specific reasons, not just a number.

## Page-aware visual review probes

| Page family | Positive evidence | High-score blocker |
|---|---|---|
| Home/entry | Distinct first-screen idea; business recognition; deliberate story and action | hero and three cards interchangeable with unrelated products |
| Company/about | Expresses real organization and operating model through legible editorial composition | thin generic About content / oversized decorative void |
| Product/index | Enables real scanning/comparison and useful distinctions | repeated equal-weight cards with no new information |
| Detail/docs | Clear specs, examples, diagrams/code, helpful technical reading | same empty detail shell repeated per item |
| Service/process | Understandable flow with task-specific visuals or states | numbered decoration/rows without task relevance |
| Contact/task | Trustworthy labeling, input focus, real validation and result | purely aesthetic form/fake success |

Do not score layout novelty alone: a familiar composition can be 90+ when content, type, interaction and art direction are unusually well executed. Do not award 90 merely for maximal decoration or high density.

## Practical reviewer procedure

1. Hide the creator Scorecard and implementation rationale.
2. Review **real rendered screens** at matching widths, across page families, not a collage of tiny thumbnails only.
3. Record a numerical **range** (e.g., 82–84) and **up to three evidence-based reasons** for/against adoption. Optionally compare two candidates side by side.
4. Inspect source/QA and any selected visual target; distinguish unseen or unverified items.
5. Reveal the Agent score last. Record false positive/false negative on **human adoption**, rather than forcing the same grading number.
6. Use repeated sites/domains and independent reviewers **before** proposing new numeric weights/thresholds. Keep original 85 threshold as provisional **agent-candidate** policy, not a 90+ design quality guarantee.

### Report fields

```text
Design condition / task:
Screens reviewed (route, viewport):
Look Contract + visual target state:
Visual user rating: __–__ / 100 or UNRATED
Would publish this design: YES / NO / AFTER_CHANGES / NOT_ASKED
Top visual strength:
Top visual defects:
Residual AI Slop:
Code Agent self-score: __ /100 (revealed after blind review)
Website/G gates: CLEAR / VIOLATION / UNVERIFIED
Release approval: APPROVED_BY_USER / PENDING / REJECTED
```

**Do not equate** AI rubric PASS, visual user score above 90, and production release. All are different decisions.
