# Research References — Code Agent Anti-Slop Development

Reviewed: **2026-11-17 (KST)**. This is a curated, verified reading list, **not** a claim that third-party authors endorse the AI Design methodology, weights or pass threshold.

## Selection method

Prefer original vendor specifications, standards and paper/benchmark pages. For each reference record: the actual finding, how we adapt it, and what it **does not establish**. Keep (a) externally supported facts, (b) our engineering decisions, and (c) untested hypotheses separate.

### A. Agent instructions and engineering workflow

| ID | Verified primary reference | Supported takeaway | Our use / limitation |
|---|---|---|---|
| R01 | [OpenAI, Codex AGENTS.md guidance](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | Instruction discovery has scope, precedence, overrides and size limits; instructions external to an active project tree may require explicit loading. | `AGENTS.md` is the small entrypoint; explicitly open our normative references and record the resolved reference HEAD. Don't assume a sibling `ai_design` repo is automatically loaded. |
| R02 | [OpenAI, Codex customization overview](https://learn.chatgpt.com/docs/customization/overview) | Durable project guidance should be concise; reusable multi-step workflows may live in Skills; specialized subagents are an optional layer. | Keep `AGENTS.md` short, link to `development/WORKFLOW.md`. Packaging as a Skill is a **future option**, not required in this iteration. |
| R03 | [Anthropic, Claude Code: Best Practices (2025)](https://www.anthropic.com/research/claude-code-best-practices) | `CLAUDE.md` can document project commands/conventions; feedback and verification support agentic coding. | Reusable, concise guidance with tests; vendor article reports engineering experience, not proof of a universal optimum workflow. |
| R04 | [GitHub, repository custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/customize-copilot/configure-custom-instructions/add-repository-instructions-in-your-ide) | Repository/path-scoped instructions supply project build and validation context. | Make rules portable; no assumption every assistant reads `AGENTS.md` at an identical external path. |

### B. Design and implementation

| ID | Verified primary reference | Supported takeaway | Our use / limitation |
|---|---|---|---|
| R05 | [Nielsen Norman Group, 10 usability heuristics (reviewed 2024)](https://www.nngroup.com/articles/ten-usability-heuristics/) | Consistency, real-world language, user control, error recovery, and *aesthetic and minimalist design* support focused task UIs. | Apply to real user tasks and purposeful hierarchy. “Minimalist” **does not mean** remove informative photography or layout character. |
| R06 | [shadcn/ui, Theming](https://ui.shadcn.com/docs/theming) | Semantic CSS variables map component roles such as background/foreground/primary and states. | Implement the **already approved AI Design v1.0 token values**; never copy current shadcn default theme values or radius scale as permission to change our decisions. |
| R07 | [Tailwind CSS, Theme variables](https://tailwindcss.com/docs/theme/) | Theme variables can create reusable CSS utilities and shared style contracts. | Use variables for consistency; check installed Tailwind version before applying its syntax. |

### C. Validation and measurement

| ID | Verified primary reference | Supported takeaway | Our use / limitation |
|---|---|---|---|
| R08 | [Playwright, Visual comparisons](https://playwright.dev/docs/test-snapshots) | Screenshots can be captured and compared; rendering differs across OS/browser/environments. | Inspect 390/768/1440px; pin browser/version/fonts for comparable captures. A pixel diff **does not measure aesthetic quality**. |
| R09 | [Playwright, Accessibility testing](https://playwright.dev/docs/accessibility-testing) | `@axe-core/playwright` detects many but not all accessibility issues; manual assessment remains necessary. | Automate visible states, keyboard workflows and axe; do not call 0 axe violations full WCAG conformity. |
| R10 | [W3C, WCAG 2.2](https://www.w3.org/TR/wcag/) and [Understanding conformance](https://www.w3.org/WAI/WCAG22/Understanding/conformance) | WCAG uses testable success criteria, with automated **and** human evaluation needed. | Accessibility checks are evidence-based hard requirements; incomplete coverage is disclosed, not silently scored as complete. |
| R11 | [Google, Lighthouse performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring) | Category metrics are weighted and score distributions can vary. | **Inspiration for transparent arithmetic only.** Our proposed 25/25/20/20/10 weights, 85 threshold and 70% floors are **our hypotheses**, not Lighthouse or an empirical UX standard. |

### D. Research and benchmarks

| ID | Paper/benchmark | Actual evidence | Relevance / caveat |
|---|---|---|---|
| R12 | [Design2Code (Si et al., 2024)](https://arxiv.org/abs/2403.03163), [project + code](https://salt-nlp.github.io/Design2Code/) | 484 real-world web-page screenshots; automatic visual metrics supplemented with human comparisons. | Rendered layout and element recovery should be evaluated **from images**. Screenshot similarity is not the same as Anti-Slop or task fitness. |
| R13 | [Vibe Code Bench (Tran et al., 2026)](https://arxiv.org/abs/2603.04601) | 100 end-to-end web specs, browser-based workflows and evaluator alignment analysis; self-testing correlates with success in their study. | Verify deployed behavior, not code presence. Their correlation is **not causal evidence** that our exact plan/scorecard raises quality. |
| R14 | [Asuka-Bench (Wang et al., 2026)](https://arxiv.org/abs/2606.05920) | 50 underspecified web tasks studied under multi-round refinement grounded in browser outcomes. | Iterative feedback is a meaningful evaluation problem. Does **not** justify unlimited retries or adding agents by default. |
| R15 | [Chen et al., *Humans or LLMs as the Judge?* (EMNLP 2024)](https://aclanthology.org/2024.emnlp-main.474/) | Human and LLM judgements can be affected by multiple biases. | A generating agent's aesthetic score is **provisional**; blind independent or human review can calibrate it. Paper is not a direct evaluation of web design. |

## Traceability: what entered ai_design

| Document | Adopted engineering pattern | References |
|---|---|---|
| `AGENTS.md` | Small entrypoint → explicit workflow/reference loading; one user prompt | R01–R04 |
| `development/WORKFLOW.md` | Plan/freeze criteria → implement → evidence → repair → final gate, bounded attempts | R01–R05, R13–R14 (**our synthesis**) |
| `development/IMPLEMENTATION.md` | Semantic tokens, actual UI states, reproducible viewport/screenshots and tests | R06–R10, R12–R13 |
| `validation/SCORECARD.md` | Weighted transparent evaluation, hard gate, evidence and judge calibration | R08–R11, R15 (**weights invented here**) |
| `validation/VISUAL_QA.md` | Deletion test **per visible device**, inspect content vs surrounding decoration, avoid under-design | R05, R08, R12 (**our operationalization**) |

## Important boundaries

- Neither the references nor the present pilot establish that **85/100** is optimal or that a one-agent rubric is an unbiased judge.
- “Build PASS”, “axe 0 violations”, “no gradients”, and “fewer images” are **not** valid proxies for a well-designed page.
- We preserve **user-approved Design System v1.0** values. Vendor framework defaults are implementation examples, not policy overrides.
- Multi-agent design is optional and its incremental effectiveness must be tested against a matched single-agent baseline, not assumed.
- References and links were checked on the review date. Vendor docs and project APIs may evolve; verify them again before implementation against a concrete installed version.

## Additional whole-site references

The website-first extension draws on the user-supplied *기업 웹사이트 개발 표준 절차 및 R&R* and curated [Website References](WEBSITE_REFERENCES.md): Nielsen Norman Group IA/Sitemap, Google Search Central descriptive URLs/crawlable links, Next.js route/layout patterns, Playwright real route tests, W3C accessibility, OWASP risk-based security and web.dev performance guidance. These support **specific practices**, not an empirical claim that our exact workflow/scorecard is optimal.
