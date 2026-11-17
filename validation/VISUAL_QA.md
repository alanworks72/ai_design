# Visual QA — Anti-Slop and Professional Finish

Version: **2.1 normalized**. A practical screen-based inspection for ordinary Code Agent work.

## Two independent questions

**A. Anti-Slop:** Is there irrelevant, deceptive, repetitive or template-like design noise?  
**B. Visual quality:** Can a visitor recognize the offering, understand the action, and see a coherent, balanced, professional page using the approved Design System?

A high A score does not imply B. A minimalist wireframe and a decorated AI landing page can both fail.

## Normal single-agent check

Open actual 390/768/1440px screenshots after implementation (and transition widths when applicable). In a short review, check:

| Dimension | Main question |
|---|---|
| Approved system | Are colors, background, fonts and type/spacing roles consistent with the user's selected system and [approved baseline](../governance/PROJECT_CHARTER.md)? |
| Recognition | What business/product/action can a new visitor identify immediately? |
| Hierarchy | Are image/text proportions and section emphasis proportional to actual information value? |
| Imagery | Does it add real understanding? Does it overrepresent one category or invent company evidence? |
| Duplication | Does each region add information beyond earlier sections? |
| Editorial quality | Is copy natural, specific, nonrepetitive and truthful about the CTA? |
| Interaction/accessibility | Is the reading order coherent and the UI usable on narrow screens, with meaningful focus/labels? |
| Anti-Slop | Are labels, dots, arrows, cards, effects or placeholder-style phrases merely ornamental? |

For routine tasks, record **the top 1–3 meaningful observations and fixes**, not a lengthy mandatory audit essay. If nothing material is wrong, don't invent changes.

## Non-regression for revisions (mandatory)

Before editing, list:
- **Preserve:** useful existing images, strengths of visual hierarchy, approved tokens, functioning controls.
- **Change:** a specific observed problem and the smallest substantive fix.
- **Avoid:** unnecessary new Slop, removing meaningful information or silently changing style tokens.

After editing, inspect the same before/after screen widths. Judge **both** (1) issue resolved and (2) overall visual quality maintained or improved. **Reject or revert** patches that resolve the complaint by degrading composition or information value. A new independent Critic is optional when the choice is uncertain or recurring failure occurs.

## Reporting and approval

Report actual captured evidence, known limitations and functional tests separately. Static/axe success does not establish visual quality; independent human sign-off is required for final commercial release, not for delivering a reviewable preview. Multi-agent escalation is optional and must carry the same Preserve/Change/Avoid contract and before/after non-regression gate.
