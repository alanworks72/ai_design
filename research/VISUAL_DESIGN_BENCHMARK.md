# Visual Design Benchmark — DesignPrompts Findings (2026-11-23)

**Scope:** Design-development methodology research for `ai_design`, which is a **rulebook** for Code Agents and future website-building tools. This file **does not specify or implement a website-builder product**. The owner's long-term interest in a service like Ostra is context only, not a scope change for this repository.

## Why this research matters to the rules

- The owner rates all browsed [DesignPrompts](https://designprompts.dev/) Looks as **90+** in visual quality.
- Historic industrial website A: Agent self-score **95**, user **70–75** (too generic, safe).
- Visual Art Direction Skill B: Agent **93.75**, user **82–84** (clear composition improvement, some repetitive icon/arrow Slop).
- These observations indicate the current rules need **concrete visual targets, permissioned Look variation and better independent visual evaluation**, not a bigger catalogue of hard bans. One pair cannot prove universal Skill effectiveness.

## Relevant verified design references

| Reference | Observed principle | Application to ai_design rules |
|---|---|---|
| [DesignPrompts](https://designprompts.dev/) | Page Template (purpose) and Look (visual identity) are separate selections | Keep page-role/IA and project Look as separate design inputs |
| [DesignPrompts Builder](https://designprompts.dev/builder) | An ordered section plan, visual layout preview and concrete Look specification guide generation | Record page-specific structure and **rendered** visual targets before full implementation |
| Owner-supplied Developer Tool × Draft Room prompt | Detailed composition, typography, images, responsive checks, actual brand/opening references and approval checkpoint | Adapt **the method**, not the copyrighted prompt: intent → Brand Kit → render opening/internal page → implement → compare |
| [Ostra](https://ostrablueprint.com/) | End users can request website generation/revision via a service | External **future consumer** of these rules; **no product architecture, UI or publishing features** belong in ai_design |

The supplied Draft Room example uses warm neutral surfaces, sans display + readable technical mono, framed diagrams and square controls. These are **a project-specific chosen Look**, not approval to replace the repo-wide white/Neutral/Wanted Sans v1.0 defaults.

## Generalizable design insights

1. **Composition is not a stack of bands.** Set relationships among content, shared edges, imagery, relative emphasis, reading order and changes in density before styling individual cards.
2. **Purposeful emptiness is different from under-design.** Every major whitespace region should contribute to emphasis, readability, pacing or spatial relation; a huge empty area with no reason is not automatically minimalism.
3. **Real images and demonstrations have appropriate scale.** Do not shrink the most important product proof into a tiny thumbnail while giving generic headlines the entire screen.
4. **Responsive layout is re-composition, not just vertical stacking.** Inspect navigation, visual weight, comparison tables, focus, breaks and mobile reading order at real widths.
5. **Specific typography and icon craft matter.** Test loaded fonts, optical line breaks, source/rights, contrast, arrow semantics and consistent cap height before calling a screen finished.
6. **Image-first means a visually inspectable target.** When generated imagery is unavailable, a real HTML/CSS prototype plus browser screenshots is equivalent; a Markdown design description alone is not.
7. **Anti-Slop is not anti-style.** A coherent Look can use visual expressiveness; generic icon/border/badge repetition and fictional trust evidence still fail.
8. **Page content precedes design slots.** The supplied template lists logo cloud, trust captions, comparative numbers and blog entries with an empty brief. Those slots do **not** justify inventing customer logos, financial/performance figures or articles.

## Intellectual property and asset boundaries

Review [DesignPrompts Terms](https://designprompts.dev/terms) before using any original Builder prompt or purchased system. Do **not** bundle its raw prompt catalogues, premium components, source code, screenshots, media, brand marks or generated reference assets into ai_design. We write **our own methodology** from observed general design principles.

A user may separately use authorized third-party assets in a *specific project* when its license and rights permit. The reusable rules must not depend on that vendor's paid package or an unavailable MCP.

## Changes informed by this benchmark

- [Look Contract](../design/LOOK_CONTRACT.md): approved per-project visual identity while keeping v1.0 defaults unchanged.
- [Visual-first Method](../design/VISUAL_FIRST.md): Brand Kit, rendered opening and inner-page target, whole-site implementation, visual comparison.
- [Visual Acceptance](../validation/VISUAL_ACCEPTANCE.md): independent user acceptance and page-type evidence separate from generous self-scores.
- Existing [Website Workflow](../development/WORKFLOW.md): content first, one-prompt agent use preserved; no mandatory multi-agent system or service UI.
- Existing [Anti-Slop](../governance/WEBSITE_ANTI_SLOP.md): prohibit nonfunctional, misleading visual patterns while preserving intentional expressive design.

**Experimental validation still needed:** test at least one approved Look/reference and rich business brief through a real multi-route Code Agent build, inspect 390/768/1440 renders, compare to frozen visual targets, gather blind user ratings. No improved score or finished service is claimed from this document.

**Source note:** this summary uses the user-provided DesignPrompts prompt and research observations already discussed. It intentionally does not reproduce the long Builder prompt, preview URL payload or proprietary assets.
