# Optional Multi-Agent Design Evaluation — Escalation Only

Status: **OPTIONAL / not part of default Code Agent workflow**. See the [Project Charter](../governance/PROJECT_CHARTER.md).

## Why separate roles?

A Designer can rationalize its own visual choices. An isolated Critic may discover substantive issues that self-review misses. **More agents do not automatically improve design**, and deleting a problematic image or section is not inherently a good revision.

## Smallest viable roles

- **Designer/Implementer:** receives brief + approved Design System + Governance, makes purposeful composition, implements working UI and initial Visual QA.
- **Independent Critic:** receives brief, locked style contract and rendered screenshots before Designer's rationale. Reports **observed problems, existing strengths to preserve, proposed changes, tradeoffs and uncertainty**.
- **Orchestrator:** accepts/rejects revision proposals against factual/functional constraints, approved tokens, and **before/after visual non-regression**. Not a new visual design authority.

Functional Playwright/build/axe checks can be tools, not separate LLM agents.

## Mandatory handoff contract

1. **Preserve:** approved colors, font, spacing, user-approved imagery and useful original composition, functional interactions.
2. **Change:** concrete screenshot-grounded problems, ordered by user impact.
3. **Avoid:** unapproved theme changes, meaningless AI ornaments and reductions in information/visual quality.
4. Re-render original and revision with matched viewport/conditions. Judge issue resolution **and** overall quality. Revert/revise a worsened solution; never approve solely because critique items are marked solved.
5. If both directions remain subjective, request human HITL. Models cannot self-certify human approval.

## Evaluation before automation

Compare a single-agent baseline against an isolated-Critic approach with matched briefs, pinned rules, observable execution budgets and blind human quality ratings across multiple trials. Track Anti-Slop, Design System compliance and visual quality separately.

Only if it consistently improves results should orchestration tooling (e.g. LangGraph) be implemented. Code Agents must remain usable with **one prompt** when no escalation is needed.
