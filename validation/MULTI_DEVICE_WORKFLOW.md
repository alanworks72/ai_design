# Multi-device workflow — Anti-Slop AI Design

Status: **Recommended operating procedure**, not a claim that previous local experiments have been synchronized.

## Problem and source of truth

The methodology repository is `alanworks72/ai_design`. Local directories under `~/project/design_test` on one PC are **not available on another PC** merely because the methodology has been pulled. The earlier `governed-v2-methodology` project exists only wherever it was saved; its source/screenshots are not currently in the methodology repository.

Keep two independent types of state:

1. **Methodology / prompts**: `ai_design/main` (versioned, shared).
2. **Experiment runs**: a separate **private Git repository** (recommended name `ai_design_runs`), with the source, dependency lockfile, prompts, metadata, screenshot evidence and critique reports needed to reproduce or inspect each run.

Do not assume a private experiment repository already exists. Create it only when explicitly set up; otherwise use a temporary local run and report that it is unsynchronized.

## Recommended run layout (experiment repository)

```text
ai_design_runs/
  README.md
  runs/
    gaon-v2-original/
      app/                   # src, public, index.html, package*.json, config, tests
      evidence/              # 390, 768, 1440 PNG; test summaries
      docs/                  # art direction, asset licenses, visual QA
      RUN.md                 # exact brief, model, effort, governance commit, execution steps
    gaon-critic-pilot/
      CRITIC_FIRST_PASS.md
    gaon-critic-revision/
      app/
      evidence/
      docs/
```

Persist original run **before** starting a critic/revision. The critic should first see brief and screenshots, **not** the original designer's notes.

### Files to commit and exclude

**Keep:** source, `public` assets (subject to redistribution/privacy rights), `package.json`, `package-lock.json` or equivalent, `README`, tests, screenshots/evidence small enough for Git, design/QA notes and the exact prompt and pinned governance commit.

**Exclude:** `node_modules/`, `dist/` (rebuildable), `.cache/`, browser binaries, `.env*` with secrets, credential files, private customer data, temporary/large traces and raw model session JSONL that might include private information. Keep public sample data clearly fictional. Do not commit screenshots containing personal or sensitive material. For genuinely large assets prefer an approved external storage location or Git LFS with rights and quota reviewed.

Sample `.gitignore`:

```gitignore
**/node_modules/
**/dist/
**/.cache/
**/test-results/
**/playwright-report/
**/.env
**/.env.*
!**/.env.example
*.log
```

A source-pack license review is different from the ability to view an asset in a local prototype.

## On each PC

If the shared repos are already cloned:

```bash
cd ~/project/design_test/reference/ai_design
git pull --ff-only origin main
cd ~/project/design_test/ai_design_runs
git pull --ff-only origin main
```

Otherwise clone the repos from their actual URLs. The second URL is an **example only until that private repository exists**. Do not run a made-up URL:

```bash
git clone https://github.com/alanworks72/ai_design.git ~/project/design_test/reference/ai_design
# Only after ai_design_runs is created:
# git clone <actual-private-experiment-repo-url> ~/project/design_test/ai_design_runs
```

Work on a run-specific Git branch or directory. Save and `git push` completed checkpoints; pull on the next device before continuing. Avoid simultaneous unmerged edits on different machines. Record each run's governance commit explicitly so later `git pull` does not silently change evaluation conditions. Use `npm ci` to restore dependencies instead of copying `node_modules`.

## Laptop fallback when the v2.0 original is unavailable

1. **Preferred:** transfer or push the actual original `governed-v2-methodology` source, screenshots and evidence from the PC where it exists. Preserve its original timestamps/revision.
2. **If original is inaccessible:** do **not** present a new generated page as the original. Start a **new independent v2.0 run** from the pinned methodology and fixed brief; archive its source and screenshots in the run repository, then run the independent critic on that newly captured version.
3. An image pasted into ChatGPT can be used for a qualitative conversation critique, but it does not restore the source project, full viewport evidence or ability to reproduce the browser tests.

## Checkpoint before switching computers

Record and push: current branch+commit, exact model/effort/brief, governance commit, image-use decision, app sources/lockfile, latest screenshots and test evidence, current outstanding task, and the next command to run. Confirm `git status` and that `git push` succeeded. Never claim synchronization because a local file was merely saved.

Use `validation/pilots/GAON_V2_PILOT.md` for the critic experiment. The pilot must refer to **persisted evidence that is actually accessible on the current machine**.
