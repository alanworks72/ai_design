# AI Design — Website-first Anti-Slop Development Methodology

**Goal:** A Code Agent (Codex, Claude Code and equivalents) takes **one website brief** and develops a **meaningful, coherent, usable website**, not merely a convincing single-scroll landing screen. Anti-Slop, approved Design System consistency, actual route/function completeness and visual quality are independent duties.

**Website-first v3.0 is being reviewed in a proposal branch.** The locked user-approved **Design System v1.0 tokens remain unchanged**. Existing single-page quality-run01 and historic experiments remain pinned to their original rule versions.

## Start with one file

Use [AGENTS.md](AGENTS.md) as the entrypoint. It explicitly loads the applicable rules even if ai_design is in a sibling repository.

## Four normative layers + execution & evaluation

| Layer | Responsibility | Document |
|---|---|---|
| Anti-Slop Governance | Stop fake data, purposeless visual elements, fake route depth and copied page templates; **allow purposeful design** | [Original v2.1](governance/ANTI_SLOP.md) + [Website Anti-Slop](governance/WEBSITE_ANTI_SLOP.md) |
| Approved Design System | Preserve white/Neutral/Wanted Sans and approved tokens; add **shared site-shell and page-family conventions** without re-theming | [Tokens](design-system/TOKENS.md), [Site System](design-system/SITE_SYSTEM.md), original Colors/Typography/Layout/Assets/Components |
| Design Method | Scope, content, IA, Sitemap, Page Specs, user journeys, wireframe, page-specific Art Direction | [Site Architecture](design/SITE_ARCHITECTURE.md), [Art Direction](design/ART_DIRECTION.md) |
| Development Method | Nine practical phases with gates: scope/content → IA/spec → UX/design → routes/feature implementation → QA/fix → delivery | [Workflow](development/WORKFLOW.md), [Implementation](development/IMPLEMENTATION.md), [Templates](development/PROJECT_TEMPLATES.md), [Role Boundaries](development/RESPONSIBILITIES.md) |
| Quality Evaluation | **Site completeness W01–W06 first**; then the **unchanged 100-point rubric**; page-family visual QA and real route/journey tests | [Website Gate](validation/WEBSITE_QUALITY_GATE.md), [Scorecard](validation/SCORECARD.md), [Visual QA](validation/VISUAL_QA.md) |

## Website is not the Home page

For a full site, define real URL routes and distinct Page Specs before coding. A Home page summarizes and links to substantive secondary pages. Related pages share Header/Footer and style tokens but do **not** clone the same Hero/cards layout. A single landing page is appropriate only when explicitly requested or approved as the actual scope.

### Minimal Agent workflow

```text
One brief
  → Scope and source-backed content
  → Sitemap / Page Specs / user journeys / text wireframe
  → Locked Design System + purposeful Art Direction + frozen Scorecard
  → Shared shell + individual route/page-family implementation
  → Verify every mandatory URL and cross-page journey
  → Anti-Slop at Element / Page / Site levels; fix with non-regression
  → Website Gate (W01–W06) AND 100-point Gate → final status
```

## Research and experiments

The attached user-supplied [기업 웹사이트 개발 표준 절차 및 R&R](research/WEBSITE_REFERENCES.md) provided the principal phases, gate and role distinctions. Additional verified standards: [Website References](research/WEBSITE_REFERENCES.md), including Nielsen Norman Group (IA), Google Search Central (URLs/SEO), W3C (accessibility), OWASP (security), Playwright (browser checks).

New reproducible **multi-page** fixed brief: [TEST_CASE_DISTRIBUTION_WEBSITE.md](validation/TEST_CASE_DISTRIBUTION_WEBSITE.md). Historic [single-page pilot](validation/TEST_CASE_DISTRIBUTION.md) remains unchanged. **No new website generation or score validity is claimed until a controlled run is executed.**

The 85/100 and category floor numbers are **provisional project policies**; a high page score cannot override missing mandatory site routes. The user is responsible for business, brand, content and final release approval; an Agent's PASS is a reviewable candidate, not a human endorsement.
