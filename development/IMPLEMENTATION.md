# Implementation Method — Turning a Frozen Plan into a Working Web Page

Status: **normative execution guidance** for [WORKFLOW.md](WORKFLOW.md). Follow [Project Charter](../governance/PROJECT_CHARTER.md) and **approved Design System v1.0**; do not replace its defaults with current framework examples.

## 0. Preflight before touching UI

1. Locate the task project and the **actual** `ai_design/AGENTS.md`. Read the linked authoritative files; note their paths, revision, and applicable local/global agent overrides. A sibling repo is **not** in Codex's automatic instruction scope by default ([source](../research/REFERENCES.md)).
2. Inspect existing source, lockfile, runtime, scripts, existing styles and assets. Do not assume OS, Node, React, Tailwind or shadcn versions. Identify `src`, public assets, app entry, routes and test setup.
3. Protect current user files/branches. Do not overwrite prior pilots, reset worktrees, add new dependencies, publish or push without authorization.
4. Write `docs/AI_DESIGN_PLAN.md` **and freeze** `docs/AI_DESIGN_SCORECARD.md` project-specific evidence targets **before** coding the UI. See [templates](PROJECT_TEMPLATES.md).
5. Decide the known palette: established user theme → preserve; approved new-project default → white/Neutral; otherwise ask once. For materially useful but undecided images, ask once by [ASSETS](../design-system/ASSETS.md); do not silently re-theme or remove imagery.

## 1. Convert requirements into information architecture

Build a small **content-to-component map** before choosing visuals:

| Task input | UI decision | How to verify |
|---|---|---|
| Audience + offering | First screen must identify service/product and primary action | 390 and 1440 screenshots |
| Required categories/content | Sections or comparison/list with new information per section | Visible text inventory and section map |
| Real action (submit/copy/navigate) | Named control, actual behavior and clear status | Browser action test, including failure |
| Images/assets | Informative role, source, rights, and accuracy of representation | Asset log + screenshot |
| Responsive/accessibility | Semantic headings, labels, focus, reading order, real tap targets | Keyboard/axe/manual + breakpoints |

Do not automatically generate `hero + three cards + badges + about + generic form`. Choose components because the data and user tasks need them.

## 2. Implement within locked tokens

- Prefer the existing/requested stack. For a new project without contrary requirements, the **established direction** is React + shadcn/ui + Tailwind; **inspect versions first**. An exceptional alternative must be documented before building; framework boilerplate alone does not require adopting shadcn's default visual tokens.
- Use **semantic CSS tokens** mapped from approved [Colors](../design-system/COLORS.md), [Typography](../design-system/TYPOGRAPHY.md), [Layout](../design-system/LAYOUT.md), [Components](../design-system/COMPONENTS.md). Framework defaults and prebuilt examples are **not design authority**.
- Reuse actual shadcn primitives where helpful; don't describe hand-written lookalikes as imported shadcn components. Keep native semantics when simpler and appropriate.
- Separate structure, visuals and behavior: section semantics/real text → responsive grid/typography → actual function/state → source-backed images. Prefer understandable code; no arbitrary proliferation of custom components.
- All visible interactive controls must work. Form actions must truthfully describe their behavior (e.g. creating a local draft is **not** sending an email). Validate input and give recovery feedback. No made-up success, stock photos as claimed real facilities, fake metrics or placeholder-like customer-facing copy.
- Maintain keyboard and focus behavior, readable contrast, responsive flow and reduced motion where relevant.

## 3. Anti-Slop at the point of creation

For each **visually prominent** Hero ornament, panel, vertical accent border, background tile, status dot, icon, shadow or illustrative image:

1. **Content:** What actual information or task does the interior content support?
2. **Treatment:** What additional benefit does the *border/background/icon itself* add beyond text, spacing, grouping and approved tokens?
3. **Deletion test:** If only that treatment is removed (content kept), is useful hierarchy, meaning or brand expression demonstrably lost? If not, remove/simplify the treatment.
4. **Repetition:** Is this an unearned copy of adjacent sections or generic AI layout conventions?
5. **Visual regression:** Does removal make the page under-designed? If so, find a better informative composition rather than stripping visuals globally.

Example: useful purchasing instructions can sit in a split Hero; that does **not** automatically justify both a grey `aside` background **and** a black left border. Check each layer independently. Conversely, a real error alert may need a distinguishable surface/edge for rapid recognition.

The goal is **judgement grounded in the rendered screen**, not banning all borders or creating audit paperwork for every CSS rule.

## 4. Real render and browser checks

Use the project's existing commands where available; otherwise implement minimal checks suited to the stack. Suggested order:

```bash
npm ci                    # only if npm/lockfile is actually the project manager
npm run build             # inspect package.json first
npm test                  # if configured; record exact command/outcome
```

For Playwright projects: start the **actual app being tested** with a dedicated port and `reuseExistingServer: false` if using Playwright webServer; verify `baseURL` and the served content. Capture **full-page** actual browser screenshots at 390/768/1440 with the same browser/environment when comparing revisions. Validate transition widths near actual breakpoints. Confirm webfont loaded and inspect computed styles if checking Design System fidelity. Match source to rendered page; do not accidentally capture an unrelated dev server.

Test **required actions**, not only rendering:
- Navigation and primary action actually reach their intended destination.
- Form required/email/whitespace/error recovery, submission or draft behavior, status, clipboard failure fallback where applicable.
- Keyboard Tab, focus, menu Escape/return, semantic labels/reading order.
- No unintended horizontal overflow, clipped controls or missing images/fonts.
- `@axe-core/playwright` and manual high-risk review; **0 violations is not WCAG full conformance**.
- If requested, browser console/network and production preview checks. Record unrun tests as PENDING.

[Playwright visual comparison](https://playwright.dev/docs/test-snapshots) cautions that OS/browser/graphics differences alter pixels; **never judge aesthetics by pixel diff alone**.

## 5. First review and refinement

First review uses the frozen scorecard to identify **top-impact defects**. Inspect the whole page and, in particular, whether an individual high-attention visual device is *doing something*, not just whether many cards or false claims are absent. Generate reasoned findings with a screenshot/selector/section location.

On revisions write:
- **PRESERVE:** approved tokens, accurate images, useful copy and strong composition.
- **CHANGE:** the exact unsupported/redundant/misleading item and required functional behavior.
- **AVOID:** re-theming, indiscriminate image deletion, new ornamental noise and regressions.

Capture before/after matched screens, rerun affected functional/axe checks and judge overall quality. A repair that removes all imagery to resolve a single photo's representativeness **fails the regression check** if it substantially worsens comprehension/visual quality.

## 6. Final quality decision and delivery

Complete [SCORECARD.md](../validation/SCORECARD.md) **without changing the frozen criteria**. Score only evaluated criteria with file+viewport+source/test evidence. Apply hard gates and category floors **before** claiming completion. On FAIL/PENDING after the normal two refinement passes, **stop** and give the user actionable blockers, not a false PASS.

Report:
- Actual implementation, chosen Art Direction and image/source decisions.
- Build/browser test commands and outputs, screenshots inspected and major visual findings.
- Design System, Anti-Slop, Functional, Visual and Accessibility scores; overall status and unresolved risks.
- An **agent-provisional** result, distinct from **independent human release approval**.

Do not claim successful tests, actual deployment, asset ownership or human review without evidence.
