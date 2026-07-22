# code-to-document

CLI tool that scaffolds a project from a feature idea, generates an **AI Agent prompt**, and standardizes dual-language product request docs (`sample-request.md` format).

**Engine:** AI Agent (paste prompt). CLI does **not** call LLM APIs in phase 1.

## Layout

```
code/                 # put LearnPress (or related) source here — Agent read-only
skills/               # required skill pack (Agent must read)
projects/<slug>/      # one job per folder
  input.md            # you write the request
  agent-prompt.md     # generated for Agent
  RUN.txt             # paste helper
  output/
    product-request.vi.md
    product-request.en.md
sample-request.md     # output schema
```

## Setup

```bash
node -v   # >= 18
npm run setup:skills
```

Put reference code under `code/` (e.g. `code/learnpress/`).

## Workflow

### 1) Init project

```bash
npm run init
# or non-interactive:
node src/cli.js init --name lp-ie-quiz --title "LP Interactive Quiz"
```

Creates `projects/<slug>/input.md`.

### 2) Write request

Edit `projects/<slug>/input.md` — describe the concept in detail.

### 3) Generate Agent pack

```bash
npm run generate -- --project lp-ie-quiz
```

Creates:

- `agent-prompt.md`
- `RUN.txt`

### 4) Run AI Agent

Open this repo in your AI Agent. Paste `RUN.txt` (or: read and execute `projects/<slug>/agent-prompt.md`).

Agent will:

1. Load `skills/`
2. Read `code/` + `input.md`
3. Write VI + EN outputs under `output/`

### 5) Review & validate

- Review `output/product-request.vi.md`
- Use `output/product-request.en.md` as FINAL
- `npm run validate -- --project lp-ie-quiz`

### 6) List projects

```bash
npm run list
```

## npm scripts

| Script | Purpose |
|--------|---------|
| `npm run init` | Create project |
| `npm run generate -- --project <slug>` | Build agent prompt |
| `npm run validate -- --project <slug>` | Check sections |
| `npm run list` | List projects |
| `npm run setup:skills` | Copy required skills from `all-skills/` |

## Skills

Required pack lives in `skills/` (subset of `all-skills/`). See `skills/README.md` for mandatory read order.

## Notes

- `code/` is read-only for the Agent.
- EN = final handoff; VI = human review.
- If a field is unknown, output must say `Unknown`.
