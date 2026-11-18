# Website Development Roles & Decision Rights

Derived from the user-supplied *기업 웹사이트 개발 표준 절차 및 R&R*. Role boundaries apply **even when one person or one Code Agent performs several roles**. The Agent can create drafts and evidence; it **cannot impersonate a human sign-off**.

| Role | Owns / decides | Code Agent may do | Must not claim |
|---|---|---|---|
| PM / Product Owner | site purpose, scope, required routes, final acceptance | draft Scope and unresolved decisions | scope/launch approval without a human decision |
| UX / Website Planner | IA, Sitemap, navigation, Page Specs, user flows | propose and document structure, draft tests | unsupported business requirements or approval |
| UI/UX Designer | coherent design language and page-family composition | plan/render within approved v1.0 tokens, critique visuals | brand re-theme permission or independent human design review |
| Content Owner | accurate copy, media and source-of-truth, legal claims | inventory and edit supplied text, label fictional samples/TBD | customer cases, certifications, stock, history or other invented proof |
| Frontend / Backend | working routes, components, APIs, input/state and tests | implement, inspect code, test and fix | real integration or delivery when only a local mock exists |
| QA | route/requirements coverage, actual evidence, defect status | write/run repeatable browser checks and scorecards | broad PASS for tests not actually executed |
| Operations / DevOps | real deployment, secrets, HTTPS, monitoring, rollback | prepare scripts/runbooks when authorized | live deployment/operational readiness without verification |

## Compact decision responsibility (RACI)

A = **Accountable human decision owner**, R = Responsible implementer, C = Consulted, I = Informed.

| Decision | Human owner (A) | Agent responsibilities (R) | Escalation |
|---|---|---|---|
| Site type/scope, mandatory pages | User / designated PO | Analyze brief, draft Sitemap, flag conflicts | Ask one targeted question if ambiguity changes site architecture |
| Public content, legal/brand claims | User / content owner | Track verified/source/fictional/TBD, no invention | Hold publication when source is unconfirmed |
| Color/font/branding overrides | User / brand owner | Preserve approved DS, document requested changes | Do not change until authorized |
| Page design & interactions | User/PO owns acceptance; UX/design role drafts | Implement and visually inspect, apply site-wide Anti-Slop | Surface unresolved mismatch or aesthetic regression |
| Test evidence and preliminary grades | QA role (can be agent-run) | Execute and record verifiable results | Agent-only PASS is provisional |
| Production deployment/release | User/PO / operations owner | Handoff after explicit request, run tests | No automatic deploy or false customer sign-off |

**Approval practicality:** routine Code Agent use must remain possible with **one prompt**. If the user has provided clear scope, source content and palette choices, the Agent proceeds internally. Only material unknown scope/fact/branding/release decisions require approval. Agent may produce a **reviewable provisional Site Blueprint** when details are missing, but cannot silently turn that into a completed customer-approved website.

A separate Designer/Critic/Tester Agent is optional. Their existence does not change the human Accountable role.

References: [Website Workflow](WORKFLOW.md), [Site Architecture](../design/SITE_ARCHITECTURE.md), [Website Quality Gate](../validation/WEBSITE_QUALITY_GATE.md).
