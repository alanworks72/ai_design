# Design System — Whole-site Composition and Component Contracts

**Extension, not a re-theme.** The binding baseline remains **approved Design System v1.0**:
[Tokens](TOKENS.md) · [Colors](COLORS.md) · [Typography](TYPOGRAPHY.md) · [Layout](LAYOUT.md) · [Components](COMPONENTS.md) · [Assets](ASSETS.md).

No change to the white `#FFFFFF` + Neutral **defaults**, Wanted Sans **default**, type/spacing defaults, card/radius policy or asset licensing. Existing user branding takes priority. An **explicitly user-approved project Look** may supply scoped token overrides through [Look Contract](../design/LOOK_CONTRACT.md); this does not change v1.0 itself. This document defines **how a multi-route website applies those decisions consistently**.

## 1. Shared site elements (when justified)

| Role | Reusable behavior | What not to do |
|---|---|---|
| Global Header/Nav | logo/home link, actual route targets, active route state, responsive menu and keyboard/focus | anchors impersonating independent pages, ornament-only nav items |
| Footer | legitimate contact/legal links and secondary navigation | fabricated contact/legal details, duplicated slogan/filler |
| Page frame | content max-width, responsive gutters, heading semantics, skip/main landmark | arbitrary layout widths and font/color changes per route |
| Breadcrumb | show parent-child relation when depth warrants | fake hierarchy or breadcrumb on every trivial page |
| List/index | records and categories with actual destinations and distinct details | identical filler cards used to imitate volume |
| Detail layout | useful metadata, sourced content, related links and next action | reusing Home's Hero unchanged for every detail |
| Forms/status | accessible inputs, real submitted/draft states, errors/fallbacks | fake success and unvalidated client-only action claims |
| Loading/empty/not-found | truthful states with recovery path | fabricated results, false busy animations, fake 200 not-found |

A site may use **different visual compositions** across page families while sharing tokens and controls. Component reuse is about accessibility and consistency, **not visual sameness**.

## 2. Page-family design system

Before implementation establish a small **composition matrix**, e.g.:

| Page family | Information priority | Typical composition choice |
|---|---|---|
| Home | offering + useful route selection | distinctive opening plus concise pathways; no obligation to repeat all detail |
| Index/category | compare and select | list/grid/table according to actual content density |
| Detail/article | understand one item | legible long-form, media/spec tables if sourced, related routes |
| Process/guide | follow steps | truthful sequence, preparation/FAQ only when needed |
| Contact/task | finish action | clear form, errors, focus, honest result and recovery |

These are patterns to consider, **not templates that must all exist**. Avoid making every page a Hero + three cards + CTA clone. Use whitespace and meaningful visual contrast within the same approved palette.

## 3. Site-wide typography/color/spacing consistency

- Use the same **project-approved Look or v1.0 default** semantic roles across all routes. Inspect actual computed font/color on a representative page **and at least one page of each distinct family**.
- Larger display headings may not silently invent a new global type scale; mobile reductions/content-driven exceptions must be recorded as exceptions, not rebranded defaults.
- Functional panels/borders are allowed only when they communicate real boundaries/state/reading structure; apply deletion test to conspicuous extra wrappers per [Website-wide Anti-Slop](../governance/WEBSITE_ANTI_SLOP.md).
- Design references, stock assets and source files must be properly licensed and not represented as real facilities, clients or inventory.

## 4. Page-level metadata and output expectations

- Each public indexable route gets meaningful, distinct `title`, heading and description; meaningful internal links and stable URL. Use canonical when URL duplicates exist; handle noindex for nonpublic/internal routes by requirement. Structured data requires truthful sources.
- The shared navigation and responsive menu should be tested once for behavior and spot-checked across routes; page-specific states should be tested on the actual pages that use them.
- For responsive typography/layout, sample **390/768/1440px** on representative page families, plus direct route/interaction checks for every mandatory page. Do not treat one Home screenshot as whole-site QA.
- Keep assets/media purposeful, consistent in art direction and bounded by rights. Do not remove them by default just to increase an Anti-Slop score.

## 5. Implementation boundary

Use existing/current stack where legitimate. The project technology direction is React + shadcn/ui + Tailwind when appropriate, with native controls allowed when simpler and appropriate per [Implementation](../development/IMPLEMENTATION.md). **A framework's starter theme cannot override our approved values**.

Separate **shared shell/navigation**, **page-family layouts**, **route-specific content**, and **state/data services**. A Header/Footer component is shared; a category detail is not a copy of Home.

The same rules apply if a site uses framework routing, a static multi-page build, or a documented client router. Select architecture from required content, indexability, deployment and maintenance needs—not from a preference for decorative landing-page boilerplate.
