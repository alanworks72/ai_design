# Anti-Slop Review Checklist

Aligned with [Governance](ANTI_SLOP.md) and [Validation Protocol](../validation/README.md).
Record **Pass / Fail / N/A / Not tested** with evidence. A test not run is never Pass.

## A. Static checks (machine-assisted)

- [ ] The page/component purpose, task, primary action and required content are recorded.
- [ ] A visual-communication plan identifies the first-screen message, informative assets or a justified text-only choice, important content order, and primary CTA.
- [ ] For domains that can benefit from photos/screenshots/diagrams, compare an informative-visual option against a text-only option; record what the visual adds and whether claims, asset rights or accuracy prevent using it. Lack of organization-owned photos alone is not a complete comparison.
- [ ] Editorial notes contain a concrete original-versus-revised hero headline and supporting sentence (or a specific explanation for retaining them), not merely a claim that copy was read aloud.
- [ ] CSS uses approved semantic tokens; unexplained hard-coded values are flagged for review.
- [ ] Normal UI uses <= 2 font families; true code/terminal text is an explicit functional exception.
- [ ] The required Typography/Spacing default values are respected where applicable.
- [ ] Scan for fabricated numbered sections, decorative eyebrow/kicker metadata and status-dot selectors; **flags require contextual HITL review** rather than automatic condemnation.
- [ ] Sample values and sources are noted outside the preview; never present invented performance, certification, customer proof or technical capability as factual.
- [ ] Functional CTA/control is linked to an implementation or documented as a scoped simulation.
- [ ] Validate build/lint/typecheck when applicable; report actual command and exit status.

## B. Browser checks (automated + manual evidence)

- [ ] Record screenshots and computed styles at 390, 768 and 1440px; check critical content around layout breakpoints.
- [ ] No unintended horizontal scrolling or clipped controls; reading order preserved.
- [ ] Navigation, mobile menu, primary task, form validation and error recovery work.
- [ ] Keyboard access, focus visibility and accessible labels work.
- [ ] axe-core report contains no unresolved serious or critical issues; do not treat this as comprehensive WCAG compliance.
- [ ] Actual text/background and focus/control contrast pairs are checked; subtle borders are not assumed sufficient.
- [ ] Motion is functional; reduced-motion preference is honored where relevant.

## C. HITL review (human approval required)

- [ ] A first-time visitor can recognize what the organization/product does from the opening screen without needing to read every paragraph.
- [ ] Images, screenshots and diagrams communicate the actual domain, offering or task; if text-only, inspect the recorded text-only vs informative-visual comparison and independently confirm that avoiding visuals does not materially weaken first-screen comprehension. Generic stock images are not presented as evidence of the real organization.
- [ ] Important content and the primary CTA are distinguishable; not every section is given identical visual weight without reason.
- [ ] Customer-facing copy is natural, specific, grammatically sound and free of repetitive/template-like claims or invented capabilities; verify actual rendered headline, supporting copy, category explanations and CTA for repetitive calls to action and awkward literal phrases.
- [ ] User and main task are clear without extraneous marketing filler.
- [ ] Typography, alignment, section spacing, content hierarchy and visual polish look production-appropriate.
- [ ] No purposeless cards, dots, labels, imagery, glows, gradients or animation; each doubtful element has a specific user/task reason.
- [ ] Familiar interaction patterns are used unless user requests originality.
- [ ] Fictional examples are plausible yet cannot be confused with verified real-company claims; no unnecessary preview notices appear in the UI.
- [ ] Asset rights and font licenses are reviewed before sale.
- [ ] Reviewer records the decision and all major unresolved concerns.

## Approval gates

- **STATIC PASS:** zero confirmed hard-rule violations; any unreviewed suspicious flags -> PENDING.
- **BROWSER PASS:** zero broken primary actions; zero unresolved serious/critical known accessibility issues; required viewports tested.
- **HITL PASS:** zero unresolved major design/content issues and explicit human approval.
- **RELEASE PASS:** all three pass. Any unrun critical gate -> PENDING; any confirmed critical failure -> FAIL.

## Review record

```md
# Review: <page>
Task, audience and primary action:
Governance revision / Design System revision:
Sample values and provenance (off-page):
Static checks (command, output, flags):
Browser checks (viewports, screenshots, functional results, axe):
HITL reviewer / blind rating / issue list:
Explicit user-authorized exceptions:
Open blockers and tests not run:
Decision: PASS / FAIL / PENDING
```

Never invent test evidence or claim that subjective visual design has been automatically validated.
