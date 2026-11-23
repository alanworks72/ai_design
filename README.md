# AI Design — Visual-first Website Design and Development Rules

**Goal:** A Code Agent (Codex, Claude Code and equivalents) takes **one website brief** and develops a **meaningful, visually distinctive, coherent and usable multi-page website**, not merely a convincing single-scroll landing screen. **ai_design is a reusable rulebook, not a website-building service, website-builder implementation or product architecture**. A future tool may consume these rules without changing their responsibility. Anti-Slop, approved project Look, actual route/function completeness and user-judged visual quality are independent duties.

**Proposal v3.2:** built on unmerged corporate-content v3.1 (PR #2), itself based on Website-first v3.0. The user-approved **Design System v1.0 remains the default, unchanged**. A new explicitly authorized **project-scoped Look** can supersede only recorded project tokens. Prior experiments remain pinned; they are not rescored.

## Start with one file

Use [AGENTS.md](AGENTS.md) as the entrypoint. It explicitly loads the applicable rules even if ai_design is in a sibling repository. A single coding request still works; staged approval is optional and used only when requested.

**Repository boundary:** rules for Code Agents and design/QA teams only. User-facing Builder, chat-edit service, backend, persistence, payment, deployment and hosting belong to a **separate future product repository**, not this one. [Visual design benchmark research](research/VISUAL_DESIGN_BENCHMARK.md).

## Four normative layers + execution & evaluation

| Layer | Responsibility | Document |
|---|---|---|
| Anti-Slop Governance | Stop fake data, purposeless visual elements, fake route depth and copied page templates; **allow purposeful design** | [Original v2.1](governance/ANTI_SLOP.md) + [Website Anti-Slop](governance/WEBSITE_ANTI_SLOP.md) |
| Approved Design System | Preserve white/Neutral/Wanted Sans and approved tokens; add **shared site-shell and page-family conventions** without re-theming | [Tokens](design-system/TOKENS.md), [Site System](design-system/SITE_SYSTEM.md), original Colors/Typography/Layout/Assets/Components |
| Design Method | Scope, content, IA, Sitemap, Page Specs, **project Look Contract**, visible Brand Kit and **rendered opening + internal visual target** before full-site implementation | [Site Architecture](design/SITE_ARCHITECTURE.md), [Look Contract](design/LOOK_CONTRACT.md), [Visual-first](design/VISUAL_FIRST.md), [Art Direction](design/ART_DIRECTION.md) |
| Development Method | Nine practical phases with gates: scope/content → IA/spec → UX/design → routes/feature implementation → QA/fix → delivery | [Workflow](development/WORKFLOW.md), [Implementation](development/IMPLEMENTATION.md), [Templates](development/PROJECT_TEMPLATES.md), [Role Boundaries](development/RESPONSIBILITIES.md) |
| Quality Evaluation | **Site completeness W01–W06 first**; then the **unchanged historical 100-point rubric**; screenshot/target comparison, independent user visual acceptance and real journeys | [Website Gate](validation/WEBSITE_QUALITY_GATE.md), [Scorecard](validation/SCORECARD.md), [Visual QA](validation/VISUAL_QA.md), [Visual Acceptance](validation/VISUAL_ACCEPTANCE.md) |

## Website is not the Home page

For a full site, define real URL routes and distinct Page Specs before coding. A Home page summarizes and links to substantive secondary pages. Related pages share Header/Footer and style tokens but do **not** clone the same Hero/cards layout. A single landing page is appropriate only when explicitly requested or approved as the actual scope.

### Minimal Agent workflow

```text
One brief
  → Scope, company identity/business model and source-backed content
  → Comparable corporate-site research (or verifiable offline reference pack)
  → Sitemap / substantial Page Specs / user journeys / text wireframe
  → Approved project Look (or unchanged v1.0 default) + compact Brand Kit
  → Render opening + representative inner page; inspect before coding all routes
  → Freeze visual target and common Scorecard/Gates
  → Shared shell + individual route/page-family implementation
  → Verify every mandatory URL and cross-page journey
  → Compare implementation to visual target; Anti-Slop and non-regression fix
  → Website Gate (W01–W06) AND historic 100-point Gate
  → Separate user visual acceptance and release readiness
```

## Corporate content and industry fit

Before Sitemap and visual styling, establish the organization's **real business identity, offer, audiences, service model and sourced facts**, then inspect relevant comparable official sites for **page-purpose, content and media** patterns. See [Corporate Reference Analysis](research/CORPORATE_SITE_REFERENCE_ANALYSIS.md).

A full website cannot pass on route count and functional tests alone. [Website W05](validation/WEBSITE_QUALITY_GATE.md) checks whether Company truly describes the company and detail pages provide **unique decision-useful content**; false corporate content and visually cloned empty routes remain unacceptable. The existing Style/Design System tokens and 100-point scores are **unchanged**.

## Research and experiments

The attached user-supplied [기업 웹사이트 개발 표준 절차 및 R&R](research/WEBSITE_REFERENCES.md) provided the principal phases, gate and role distinctions. Additional verified standards: [Website References](research/WEBSITE_REFERENCES.md), including Nielsen Norman Group (IA), Google Search Central (URLs/SEO), W3C (accessibility), OWASP (security), Playwright (browser checks).

A separate [rich-content fictional enterprise fixture](validation/TEST_CASE_DISTRIBUTION_CORPORATE_V2.md) is available for matched design-method comparison, to avoid accidentally penalizing an Agent for missing client data. It is **not a rewrite or rescore** of prior experiments.

New reproducible **multi-page** fixed brief: [TEST_CASE_DISTRIBUTION_WEBSITE.md](validation/TEST_CASE_DISTRIBUTION_WEBSITE.md). Historic [single-page pilot](validation/TEST_CASE_DISTRIBUTION.md) remains unchanged. **No new website generation or score validity is claimed until a controlled run is executed.**

The 85/100 and category floor numbers are **provisional, uncalibrated agent-candidate policies**; a high score cannot override missing routes or independent human design rejection. Industrial A scored **95** by Agent vs **70–75** by user; Skill B **93.75** vs **82–84**. See [Visual Acceptance](validation/VISUAL_ACCEPTANCE.md). The user is responsible for business, brand, content and final release approval; an Agent's PASS is a reviewable candidate, not a human endorsement.
