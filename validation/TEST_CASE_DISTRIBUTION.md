# Pilot — Distribution Company Website

## Fixed task brief

Create a responsive Korean-language homepage for a **fictional B2B distribution company** named 가온유통. The site must serve business purchasing staff wanting to identify product categories and make a supply inquiry.

Required sections: company introduction, categories (식품·식자재; 생활용품; 기업 운영용품), procurement process and inquiry form. Use realistic **fictional** address (서울특별시 OO구 OO로 123, 3층), phone (02-000-0000) and reserved example email (contact@example.com). Do not invent revenue, customers, certifications, delivery speed or satisfaction claims. Do not add developer notes or template metadata to rendered UI.

Required behavior: menu navigation and mobile menu, form validation, and an inquiry action that **really works within its declared scope** (e.g. draft summary + copy; never pretend to send to a server). Display success/error feedback appropriate to the actual action. Keyboard and responsive support are required.

Design not explicitly specified beyond familiarity and usability. This keeps Baseline unconstrained while Governed receives the repository rules. The task brief and content examples must be **identical** in both conditions.

## Experiment controls

- Baseline: use the fixed task brief only. Run in a clean project **outside** any ancestor path containing ai_design/AGENTS.md; prevent retrieval of Governance docs.
- Governed: use the **identical** task brief; require reading the pinned ai_design commit's AGENTS.md plus Governance and Design System before generating.
- Pin model, effort, runtime and dependency versions; no previous conversation context; same number of tool calls/time budget; record CLI settings and token use if available.
- Start with one pair for pilot (1 baseline + 1 governed). Repeat each at least 3 times for variance if pilot is interpretable.

## Evidence and scoring

Store source revision, prompt, configuration, generated code, render/screenshots at 390/768/1440, computed styles, functional test results, axe-core results and reviewer notes.

Record separately:
1. **Rule compliance**: known explicit violations (fake status dots, decorative metadata, unjustified imagery, filler cards, unsupported claims, more than two ordinary UI font families).
2. **Functionality**: primary form action, navigation, error recovery, mobile adaptation.
3. **Visual quality** (blind human scores): hierarchy 25%, usability 25%, typography/spacing polish 25%, consistency 15%, content appropriateness 10%.

No results exist until independent generation and tests run. Do not classify a difference of one sample as reproducible improvement.
