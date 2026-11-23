# Visual QA — Evidence First, Not a Decoration Ban

Applies with [Anti-Slop Governance v2.1](../governance/ANTI_SLOP.md), [Art Direction](../design/ART_DIRECTION.md), [Development Workflow](../development/WORKFLOW.md) and the **frozen 100-point [SCORECARD](SCORECARD.md)**.

## Visual-first target comparison (v3.2 extension)

Use the project's [Look Contract](../design/LOOK_CONTRACT.md) and [Visual-first Method](../design/VISUAL_FIRST.md). Before final UI implementation, retain an **actually rendered** opening and representative inner-page target at 1440 and 390 where tools allow. Compare final screens and report TARGET_MATCHED, PARTIAL or UNVERIFIED. Similarity to a flawed reference is **not** proof of design quality.

For high-salience icons, arrows, eyebrow labels and framing: ask if they communicate navigation, state, hierarchy, subject or a coherent approved visual language. Repeated arrows on unrelated internal links and mixed-weight decorative symbols are suspect. Do not forbid all icons/borders or remove useful media to increase Anti-Slop score.

Record [independent human visual acceptance](VISUAL_ACCEPTANCE.md) apart from the fixed Scorecard; the owner's A/B ratings (70–75 vs 82–84) demonstrate why a self-reported 95 is not design approval.

## Why this review is necessary

A Code Agent may receive the right rules, implement a grey Hero callout with an unnecessary black accent line, view the screenshot and still claim “Anti-Slop PASS: no fake metrics and no repeated cards.” That **does not** verify whether the callout border itself has a purpose.

Anti-Slop and visual finish are two separate evaluation dimensions. A beautiful-looking but misleading design and an empty sanitized wireframe can both fail.

## Review 1 — immediately after first implementation

Actually **open** full-page screenshots at **390, 768 and 1440px** with the correct running app, browser/fonts and source. Inspect transitional viewport widths where layouts change. Check the following separately:

| Probe | Evidence question |
|---|---|
| First-screen meaning | Can a visitor tell what the offering is and what to do next? |
| Information hierarchy | Do Hero/sections/CTA have emphasis proportional to meaning? |
| Domain/imagery | Does the image show relevant information without falsely claiming business evidence or unfairly elevating one category? |
| Copy | Is each line natural, specific and *incrementally informative* rather than repeated generic wording? |
| **Conspicuous decoration (A1)** | **For an accent border, callout, panel, dot, icon, visual separator or effect: what independent information/hierarchy does this *wrapper* provide?** |
| Under-design (V3–V5) | If imagery/character was removed, does the page still convey the business and have credible professional finish? |
| Function/accessibility | Do actual actions, mobile reading order, labels, focus and error recovery work? |

### Conspicuous visual device probe (operational Deletion Test)

Choose **up to three high-salience candidates** after actually looking at the screen; if none is seen, explicitly record "No conspicuous suspect device observed" and state which screens were checked.

1. Identify exact target, screen viewport and CSS/component selector.
2. Separate **usefulness of its content** from **usefulness of its decoration**. A useful instruction paragraph does **not** justify its grey background *and* left border by default.
3. Check whether spacing, text hierarchy or an existing surface **already** communicates the same grouping. If so, ask what additional value the extra effect provides.
4. Remove or simplify **only the questionable layer**, preserving content and actions, when it has no independent benefit. Prefer a matched rendered comparison when the hierarchy tradeoff is uncertain.
5. Check the **whole page** after the change: do not fix a decorative border by deleting all images or undermining the page's identity.

**Conditional permission remains:** a border/panel is useful when it differentiates an actual error/state, interaction boundary, comparison or meaningful group that spacing alone cannot communicate well. Never make the presence of a border automatic failure.

Record **finding → evidence → judgement → target change**. A generic claim like "no decorative metadata or repeated cards" **cannot justify A1 PASS** if an untested prominent callout is still visible.

## Score and remedy

Use the **pre-frozen targets** from project `docs/AI_DESIGN_SCORECARD.md`; never create easier criteria after implementation. Give first-pass ratings 0–4 per [fixed rubric](SCORECARD.md), or **UNVERIFIED** where evidence is missing. First-pass numbers are **diagnostic**, not completion status.

For each substantial fix record **Preserve / Change / Avoid**. Save matched before and after screens and rerun affected tests. Explicitly consider whether Anti-Slop increased but overall visual quality decreased (or vice versa). **Reject/revert degraded revisions.**

## Final Quality Gate — separate from first review

Open the **final actual render**, inspect affected screens, score all 20 common items and verify the mandatory project acceptance and hard gates. A field with no evidence is **UNVERIFIED**. Apply >=85 total, >=70% per category, no critical violation, no major regression. Otherwise **FAIL / PENDING** as specified in [SCORECARD](SCORECARD.md).

A build PASS or axe zero violations is **not** a full accessibility certificate, editorial review or aesthetic approval. Human release review is separately PENDING unless actually performed.

## Efficiency contract

This is not a request for a long report on every CSS declaration. The code agent normally records **1–3 high-impact findings**, full-page screenshots, relevant test commands and the fixed score table. An independent Critic is optional, especially when uncertainty remains, and must use the same design locks and criteria.

## Whole-site Visual QA (proposed v3.0)

Apply element, page **and site** Anti-Slop inspection. Open actual 390/768/1440 screenshots of **every required distinct page family** and check each mandatory URL separately. A polished Home screenshot is not website-wide evidence. Verify page role differentiation, truthful content, image value, stable shared design tokens, accessible nav, and absence of repeated generic Hero/cards/CTA templates across unrelated routes. Do not delete useful images or pages solely to simplify the layout.

Before claiming PASS, also clear [Website Quality Gate](WEBSITE_QUALITY_GATE.md) W01–W06 (real IA, route specs, direct URL/refresh, journeys, content and site-wide visual QA). Preserve the original 20-item Scorecard for numerical evaluation.

## Corporate-site meaning and under-design probe (v3.x clarification)

On representative screenshots and actual page text/source, before declaring W05 CLEAR or V1–V5 high:
- **Home:** can a visitor identify the **business itself** and why/where to explore its offerings? Is it mostly an "instructions for buyers" homepage?
- **Company:** is there actual source-backed/synthetic-authorized **business identity, operating/service model and value** beyond a heading and a supplier/buyer checklist?
- **Category details:** do they convey **different useful information** about their subject, or only swap name/image in the same generic description-table-CTA layout? A shared table can still be valuable if entries serve specific decisions.
- **Presentation:** is there purposeful use of imagery/illustrations, text hierarchy, comparison and whitespace suited to the **available content**? A black headline + grey paragraph + border on every page is not automatically a polished enterprise site.
- **Source adequacy:** if essential company details are absent, mark a `CONTENT_GAP`; do **not** fill with fake company history, customer proof or boilerplate claims.

Record **the route, frozen Page Spec question, observed actual content/screenshot and why it fulfils/fails the role**. Use [Corporate Reference Analysis](../research/CORPORATE_SITE_REFERENCE_ANALYSIS.md) for transferable industry observations, not screenshot similarity scoring.

**W05** handles failure of a fundamental page purpose; **V1–V5** handle weighted visual/editorial quality once a substantive page is present. A mere aesthetic disagreement does not automatically create a W05 hard violation. Human acceptance is separate.
