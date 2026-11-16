# Pilot — independent design critic for the existing Gaon v2 output

**Status:** Protocol prepared; no local critic or revision run has been executed. Source website remains unchanged.

## Hypothesis

A critic who sees the actual screenshots and brief **without the creator's art-direction justifications** may recognize whole-page Slop, duplicated information and disproportionate emphasis that the original agent's self-review missed. Then a separate implementer can test whether a focused revision improves visual quality.

## Prerequisite: actual run artifacts on this device

Do **not** assume `~/project/design_test/governed-v2-methodology` exists. The original output was created on a different PC and is not contained in `ai_design/main`.

Before running the critic, use [Multi-device workflow](../MULTI_DEVICE_WORKFLOW.md) to restore the **actual original** source and 390/768/1440 screenshots from the prior PC or a synchronized experiment repository. If neither exists, generate a new **clearly labeled independent** v2.0 run and archive it first. A regenerated result must not be represented as the historical original.

All commands below assume the original project has actually been restored to the stated directory. Check it first:

```bash
test -f ~/project/design_test/governed-v2-methodology/package.json &&
  test -d ~/project/design_test/governed-v2-methodology/evidence/final &&
  echo "Run available" || echo "Original artifacts missing: restore or regenerate"
```

## Execution (working directory: ~/project/design_test)

1. Preserve original `governed-v2-methodology` as read-only reference.
2. Create empty `critic-pilot/`; start a **new Codex session** there. Paste all of [GAON_V2_CRITIC_PROMPT.md](GAON_V2_CRITIC_PROMPT.md). The critic reads screenshots but may NOT inspect the creator's explanation in its first pass.
3. Inspect and retain `critic-pilot/CRITIC_FIRST_PASS.md`. If the critic did not actually open 390/768/1440 screenshots, discard the outcome as NOT TESTED.
4. Copy `governed-v2-methodology` to a new `critic-revision/` directory. Start a separate Codex session there; paste [GAON_V2_IMPLEMENTER_PROMPT.md](GAON_V2_IMPLEMENTER_PROMPT.md).
5. Compare the original and revision screenshots **blind**, using human scoring on: domain recognition, information gain, whole-page coherence, visual polish, copy, and Slop. Track functionality/axe independently.

### CLI setup

```bash
cd ~/project/design_test/reference/ai_design
git switch main
git pull --ff-only origin main
cd ~/project/design_test
mkdir -p critic-pilot
cd critic-pilot
codex
```

After the first report is saved, in another terminal:

```bash
cd ~/project/design_test
cp -a governed-v2-methodology critic-revision
cd critic-revision
codex
```

**Do not automatically continue to the implementer if the screenshot evidence cannot be verified.**

## Evidence requirements

- Critic report names screenshot paths and screenshot-specific elements, not code guesses.
- The critic's first report is timestamped and frozen before design explanation is shown.
- Each revision maps back to the critique, not ad hoc decoration.
- Tests must be re-run on the revision. Existing tests are not evidence of a new build.
- One pilot is diagnostic, not causal evidence. Repeat controlled trials before scaling to orchestration.

## Success / failure

Success: fewer confirmed whole-page Slop issues and improved human-rated professional quality **without** degrading category recognition, inquiry task, accessibility or truthful content. Failure: critic provides generic praise, merely restates author reasoning, rewards more ornament, or revisions do not materially improve independent ratings.

If the critic consistently finds useful problems, evaluate a lightweight orchestrator + designer/implementer + isolated critic. Do not build an elaborate multi-agent system before measuring the gain.
