# Optional Multi-Agent Design Evaluation — Pilot Plan

Status: **PROPOSED / NOT IMPLEMENTED**. Use this only if the strengthened single-agent Art Direction + adversarial Visual QA still produces repeatable slop or weak visual quality. A multi-agent setup is **not automatically better**: agents sharing the same model, prompts or context may repeat the same biases.

## Goal
Separate **creation** from **criticism** without creating an unstructured group chat. One orchestrator owns gates and artifacts. Independent critique receives the brief, governance and screenshots, **not the designer's written justifications before its first verdict**.

## Roles and responsibilities

| Role | Input | Output | Authority |
|---|---|---|---|
| Orchestrator / Gatekeeper | Brief, chosen constraints, artifacts and test state | Work order; accept/revise/escalate decisions | Coordinates; never invents aesthetic PASS |
| Art Director | Brief, content, brand, asset authorization | 2 distinct *whole-page* directions, selected hierarchy, visual language | Proposes, not self-approves |
| UI Implementer | Selected direction and design-system tokens | Working frontend, screenshots, code | Implements and fixes; no self-certification |
| Independent Visual Critic | Brief + required constraints + **rendered screenshots first** | Ranked design-specific defects, strongest direction-level critique and alternatives | May request revision; cannot rewrite facts |
| Functional/Accessibility Validator | Code, rendered app and test criteria | Build/browser/axe reports, honest PASS/PENDING/FAIL | Blocks broken or unsafe work |

Start with 3 logical roles in practice: **Designer+Implementer**, **Independent Critic**, **Orchestrator**. Functional validation can be a tool-running stage rather than a fourth LLM. Additional agents should be added only when they close a measured failure.

## Isolation and decision gate

1. Designer drafts directions and implements. Follow conditional image question; user preference is authoritative.
2. Orchestrator delivers the running page's 390/768/1440 screenshots, fixed brief and v2.0 constraints to Critic. **Withhold author's art-direction rationale initially** to reduce confirmation bias.
3. Critic marks concrete issues with screenshot regions, ranks by impact, and explicitly checks AI-template look and under-design. Critic must say *what should change* and *what should remain*.
4. Designer revises **only validated, high-impact items**. Orchestrator compares before/after and checks Anti-Slop, factual claims, assets and function.
5. If disagreement remains or design quality cannot be established, escalate to human HITL. Never allow agents to vote themselves into Release PASS.

## Evaluation before building infrastructure

Run the same brief/model conditions across:
- **A** single agent + v2.0 strengthened self-critique
- **B** designer and isolated critic, same total approximate token/time budget where feasible
- **C** designer + separate critic model (only if available and B fails to show an improvement)

Compare blind human visual scores (purpose recognition, composition, visual identity, editorial quality and Slop) separately from build/axe/function results. Use multiple trials, preserve screenshots and judge whether improvement justifies extra cost/latency. No causal claim from a single run.

## Disqualifying patterns
- Critic only repeats the creator's rationale or gives generic “looks good” feedback.
- Critic rewards more decoration or always favors photos.
- Many agents make inconsistent edits with no accountable final owner.
- Agent says independent HITL is complete when only AI models reviewed.

The recommended next step is **one documented independent-critic pilot**, not a production LangGraph system. Orchestration can be implemented later if the trial outperforms a single-agent process.
