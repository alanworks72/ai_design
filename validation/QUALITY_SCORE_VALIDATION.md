# Quality & Score Reliability Pilot — 2026-11-17

Status: **FROZEN EXPERIMENT PROTOCOL**. Goal: test the **actual generation workflow** separately from **evaluation consistency/validity**. This is **not** a Governance change.

## 0. Pinned source and what remains untouched

- Normative methodology: [ai_design at `4409d6d3c94f736342c39f5bad043d2c845d8c8f`](https://github.com/alanworks72/ai_design/commit/4409d6d3c94f736342c39f5bad043d2c845d8c8f) — Governance v2.1, locked Design System v1.0, Development Workflow and 100-point Scorecard.
- New protocol and optional scorer tool may be added in a **later commit**, but must not change existing normative criteria or the pinned content for this trial.
- Task: **only the Fixed task brief** in [TEST_CASE_DISTRIBUTION.md](TEST_CASE_DISTRIBUTION.md), not its older Baseline/Governed experiment-control instructions.
- Style: approved **white + Neutral, Wanted Sans** (already selected); no brand palette invention.
- Images: rights-checked illustrative media is **permitted, not required** if the Agent judges it adds relevant information; do not present stock imagery as actual company facilities. Record this as a known image-sourcing decision; do not force a photo-heavy or text-only result.
- Existing `v21-single-agent` outcome is a **retrospective comparison/reference**. It was created with different instructions and choices, so a difference is **not proof of causal effect** from the new workflow.

## 1. Pilot first; only then repeat

**Phase 1: procedure + one new generation**

1. Start **a fresh Codex CLI session in a new empty directory**. Use the generation prompt below. Do not let the Agent inspect earlier pilots or their critiques. It may read the pinned `ai_design` rules and the fixed brief.
2. Verify that `docs/AI_DESIGN_PLAN.md` and the **frozen common/project scorecard targets** exist **before the first application UI file**. Audit the actual session log/file history; a retrospective claim is not proof of ordering.
3. Obtain the app/source, build logs, working behavior, real screenshots (390/768/1440 and relevant breakpoint widths), first-pass and final QA, plus final self-scores.
4. Preserve the **initial first-pass screenshots** separately from post-refinement final screenshots; don't polish indefinitely to force a PASS.
5. Record actual runtime, model/effort **if known**, lockfile, reference revision, chosen image source and rights, and environment/tool limitations.

**Phase 2: score reliability on the *same frozen artifact***

6. Save the finished artifact read-only. Do **not** improve the site while scoring.
7. Run **two independent fresh reviewer sessions** against the exact same screenshots, task, fixed rubric and source/test evidence. Reviewers must **not** read the Designer's self-score, critique rationale, prior negative findings or each other's reviews **before** submitting their own ratings.
8. Reviewers **first view the actual screenshots** and record a concise visual impression; **then** inspect code, computed CSS, functional test evidence, license provenance and the canonical rubric. No functional or style scores may be inferred from screenshots alone.
9. Each reviewer rates the **same 20 items (0–4)** and G01–G07, project mandatory acceptance, with evidence. Never invent an unrun test or award numeric points to UNVERIFIED.
10. Have a human judge (user) review the page for **B2B recognition, conspicuous AI-Slop, under-design, professional finish and accept/reject**, **before** showing that judge numeric AI scores. Human review is essential for *score validity*, although the small pilot is not a statistically calibrated benchmark.
11. Compare self / reviewer 1 / reviewer 2 scores with [scorecard_check.py](tools/scorecard_check.py); record individual-item differences, total/category gaps and gate/decision disagreements. Reconcile disagreements with evidence, **not by asking reviewers to converge**.

**Phase 3: generation stability only if Phase 1–2 is interpretable**

12. Run the **same pinned task and rubric in two more fresh sessions** (`run02`, `run03`) and repeat evidence capture. Hold image authorization, prompt and runtime stable when possible. **Three runs are a small pilot**, not a claim of statistical significance.
13. Compare style/Anti-Slop critical failures, evidence completeness, human acceptability and score calibration. Never adjust the rubric mid-cohort.

## 2. Generation prompt — one ordinary user request

Run from an **empty** directory, for example `~/project/design_test/pilot/quality-run01` (if the reference repo is at `~/project/design_test/reference/ai_design`):

```text
../../reference/ai_design/AGENTS.md를 적용하여 새 프로젝트에 가온유통 B2B 홈페이지를 구현해.

요구사항은 ../../reference/ai_design/validation/TEST_CASE_DISTRIBUTION.md의
"Fixed task brief" 섹션만 사용해. 해당 파일의 과거 Baseline/Governed
실험 절차나 기존 파일·디자인 결과는 이번 생성 요구사항이 아니야.

디자인 결정: 승인된 흰색 + Neutral Color System을 사용해.
권리가 확인된 예시 이미지는 정보 전달에 유용하다고 판단하면 사용해도 돼.
이미지 사용을 강제하지 않으며 실제 기업의 시설·재고 증거로 표현하지 마.

나머지 화면 구성과 구현은 ai_design Development Method에 따라 자율적으로 수행해.
최초 구현 전 디자인 계획과 고정 평가 체크리스트를 작성하고, 실제 화면 검토,
문제 수정, 최종 점수 평가까지 내부 절차대로 진행해.
최종 자체 평가를 이 문서 4절 형식으로 reviews/self.json에도 출력해.
각 평가 항목의 실제 증거를 작성하되 검증하지 못한 항목은 null로 남겨.

기존 pilot 결과물, 기존 Critic 보고서, 다른 생성물의 소스/스크린샷은 열람하지 마.
현재 디렉터리 외부 프로젝트의 소스를 수정하지 마.
Git commit/push, 외부 배포는 하지 마.
```

The brief intentionally does **not** predefine a Hero layout, number of photographs, callout, card composition, or allowed grade. Those are what the methodology should decide.

## 3. Independent reviewer prompt — do not contaminate the blind review

Use a **separate Codex session and separate review directory** (replace `<ARTIFACT_PATH>` with the exact frozen implementation directory). Use the same prompt for reviewer-1 and reviewer-2:

```text
당신은 AI Design 결과물의 독립적인 평가자야. 생성·수정 작업은 하지 마.

평가 대상: <ARTIFACT_PATH>
참조 규칙 저장소: ~/project/design_test/reference/ai_design (실제 위치 확인)
고정 요구사항: ai_design/validation/TEST_CASE_DISTRIBUTION.md의 Fixed task brief
디자인 정책: ai_design/4409d6d의 Governance v2.1 및 Design System v1.0
공통 평가 규정: ai_design/validation/SCORECARD.md (20개 항목, G01–G07)

작업 순서:
1. 먼저 대상의 실제 final 스크린샷 390/768/1440을 열고
   업종 인식, 시각적 완성도, 불필요한 장식과 Under-design 여부에 대한
   독립적 첫인상을 기록해.
2. 이후 실제 코드, 적용된 CSS 토큰, 테스트 결과, 이미지 권리 기록을 확인해.
3. 고정된 20개 항목을 각각 0–4점으로 평가하되 코드/화면/테스트 증거를 남겨.
   검증할 수 없으면 rating=null (UNVERIFIED)로 처리해.
4. G01–G07 위반 여부와 필수 과제의 실제 구현을 확인해.
5. 자체 평가를 참고하거나 점수를 맞추려 하지 마.
6. 프로젝트를 수정하지 않고 scorecard JSON과 짧은 근거 보고서를
   현재 별도 리뷰 디렉터리에 생성해.

중요:
- 생성 Agent의 docs/AI_DESIGN_SCORECARD.md 최종 채점 구간,
  DESIGN_PLAN의 선택 근거, Critic/Revision 로그, 기존 실험 결과,
  다른 리뷰어의 결과를 본인 평가 전에 읽지 마.
- 규칙의 적용 예시가 특정 장식을 언급한다고 해서 그 사례만 검사하지 마.
  모든 두드러진 시각 장치를 독립적으로 검토해.
- 스크린샷만으로 기능·접근성·라이선스 적합을 단정하지 마.
- 인간 HITL 승인을 했다고 주장하지 마.
- 점수 JSON은 아래 4절의 형식을 따르고, Git commit/push하지 마.
```

**Important:** The rubric itself currently includes a grey callout/left-border example derived from earlier failures. A reviewer using that rubric is **not fully blind to that pattern**. Detecting exactly that known example alone does not prove generalized Anti-Slop discrimination; inspect other unscripted elements and test a different task later.

## 4. Machine-readable reviewer contract

Each reviewer exports `reviews/self.json`, `reviews/blind-1.json`, or `reviews/blind-2.json` in the same structure:

```json
{
  "artifact_id": "quality-run01",
  "reviewer_id": "self",
  "ratings": {
    "A1": {"rating": 3, "evidence": ["evidence/final/1440.png", "src/styles.css:.hero"]},
    "A2": {"rating": 4, "evidence": ["evidence/final/390.png"]}
  },
  "gates": {
    "G01": {"status": "CLEAR", "evidence": ["src/main.tsx", "test-results.json"]}
  },
  "acceptance": [
    {"id": "P01", "mandatory": true, "status": "PASS", "evidence": ["tests/acceptance.spec.ts"]}
  ],
  "major_regression": "NONE"
}
```

**The displayed JSON is abbreviated**: every actual review must include **all 20** ratings (`A1–A5, V1–V5, D1–D4, F1–F4, R1–R2`) and **all seven** gates (`G01–G07`). Ratings are integers 0–4 or `null` (UNVERIFIED). Gate statuses: `CLEAR`, `VIOLATION`, `UNVERIFIED`. Mandatory acceptance: `PASS`, `FAIL`, `UNVERIFIED` with referenced evidence. `major_regression`: `NONE`, `PRESENT`, `UNVERIFIED` or `NOT_APPLICABLE` (no revision).

```bash
python3 ~/project/design_test/reference/ai_design/validation/tools/scorecard_check.py \
  /actual/path/to/run01/reviews/self.json \
  /actual/path/to/run01/reviews/blind-1.json \
  /actual/path/to/run01/reviews/blind-2.json > score-comparison.json
```

The script validates **score arithmetic, allowed ratings, stated evidence presence, category floors, hard-gate status and between-rater differences**. It **cannot verify that cited screenshots actually show the claimed facts**; reviewers and a human must inspect them. Missing references prevent PASS.

## 5. Frozen pilot hypotheses / decision criteria

### Generation-quality candidate

- The plan and rubric genuinely precede implementation, and all required behavior/design evidence exists.
- No confirmed critical gates, 20 completed ratings, >=85/100 overall, >=70% in each category.
- The page has **no prominent purposeless accents** and is not a text-only under-designed shell; actual human visual acceptance remains decisive for calling it ready for broader testing.

### Provisional score-consistency targets (not validated standards)

- Independent reviewers **agree on PASS/FAIL/PENDING** and confirmed critical-gate classification.
- Difference between self and each blind reviewer **<=10 total points**, mean absolute per-item rating difference **<=1 level** (0–4 scale).
- If a known visible defect is missed or the human considers the page unacceptable while both AIs award PASS, treat this as a **false-PASS candidate and rubric/judge calibration failure**, even when numeric differences are small.
- Agreement among AIs alone demonstrates **consistency**, not truth. Human disagreement and item-level evidence take precedence.

These are **pilot thresholds we are testing**, not an industry-valid reliability coefficient. If the first run fails them, preserve the raw outputs and diagnose **instructions, generation, missing evidence, judge bias, or rubric ambiguity** separately. **Do not rewrite the approved Design System or change the rubric during the experiment.**

## 6. Store without losing prior experiments

Suggested private `ai_design_pilot` layout (new experiment branch, no mutation of historical `main` runs):

```text
quality-score-pilot/
  run01/
    app/                # source, lockfile, assets, tests; exclude node_modules/dist
    evidence/           # initial/final screens, tests and screenshots metadata
    docs/               # frozen plan, scorecard + source/license records
    reviews/            # self.json, blind-1.json, blind-2.json
    score-comparison.json
  human-review.md       # without exposing AI grades until independent impression
  experiment-notes.md   # environment, conditions and decisions
```

Keep the original `v21-single-agent` artifacts as a named historical comparator if available; never label a regenerated site as the original. Do not include secrets, unlicensed assets, `.env`, `node_modules`, binary browser installs or replay logs containing sensitive information.

## 7. What the first completed cycle can / cannot establish

A single successful generation demonstrates **feasibility for that one task**. Self + two blind reviews estimate **within-artifact judge agreement**, not broad score validity. Multiple independent runs and unrelated web task types are needed to assess generation stability and generalization. Report this honestly before changing methodology rules.
