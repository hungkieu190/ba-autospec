# Product Documentation Generator Tool Implementation Plan

## Goal

Build a local CLI tool that turns a product idea into the full Product Discovery, Product Documentation, and Marketing Package defined in `product-documentation-generator.md`.

The tool must use the skill package in `product-documentation-generator/skills/` as its operating knowledge base.

## Current State

- Skill extraction is complete.
- Consolidated skills are available under `product-documentation-generator/skills/`.
- Required mapping files exist:
  - `skills/README.md`
  - `skills/skill-map.md`
  - `skills/mandatory-skills.md`
  - `skill-selection-report.md`
- No application framework currently exists in this repo.

## Implemented Tool Shape

Use a simple npm workflow with no external dependencies.

Implemented paths:

```text
package.json
scripts/
  init.js
  start.js
  shared.js
projects/
  <project-name>/
    input.md
    output/
```

## CLI Interface

Create a project:

```bash
npm run init
```

Or create a project without prompts:

```bash
npm run init -- "LearnPress Chat Room"
```

Generate the prompt that asks the AI agent to create follow-up questions after filling `input.md`:

```bash
npm run start -- <project-name>
```

This creates:

```text
projects/<project-name>/create-question-by-agent.md
```

Paste `create-question-by-agent.md` into the AI agent chat. The AI agent then creates:

```text
projects/<project-name>/questions.md
```

After the user answers `questions.md`, generate the prompt that asks the AI agent to create the final documents:

```bash
npm run create -- <project-name>
```

This creates:

```text
projects/<project-name>/create-documents-by-agent.md
```

Paste `create-documents-by-agent.md` into the AI agent chat. The AI agent then uses `input.md`, `questions.md`, and all skills to produce the final Vietnamese documentation.

Generate deterministic skeleton documents only when explicitly requested:

```bash
npm run start -- <project-name> --generate-docs
```

## Required Behavior

The CLI does:

1. Create `projects/<project-name>/input.md` through `npm run init`.
2. Load mandatory skills from `skills/mandatory-skills.md`.
3. Load skill-to-document mapping from `skills/skill-map.md`.
4. Read `projects/<project-name>/input.md` through `npm run start -- <project-name>`.
5. Generate `projects/<project-name>/create-question-by-agent.md` for pasting into the AI agent chat.
6. Generate `projects/<project-name>/create-documents-by-agent.md` through `npm run create -- <project-name>` after `questions.md` exists.
7. Keep final documents in Vietnamese, while preserving English technical terms where clearer.
8. Generate all required markdown files only when running `npm run start -- <project-name> --generate-docs`:
   - `01-discovery.md`
   - `02-product-strategy.md`
   - `03-prd.md`
   - `04-ux-and-wireframe.md`
   - `05-qa-and-documentation.md`
   - `06-seo-and-marketing.md`
   - `07-build-or-not-build.md`
9. Generate an `index.md` that links all output files.
10. Generate a basic `quality-report.md`.
11. Generate `asana-task.html` with a `Copy for Asana` button and the required task sections.
12. Mark unsupported market/search/competitor claims as assumptions.
13. Do not use the old 23-file output structure unless explicitly reintroduced later.

## Implementation Phases

### Phase 1: Deterministic Template Generator

Status: implemented as npm scripts behind `--generate-docs`.

The default `start` workflow now creates an AI-agent prompt because the intended runtime is an AI-agent environment such as Codex, Antigravity, or Claude. The external AI agent is the reasoning engine; this repo prepares structured prompts, project files, and skill references.

It should create structured markdown files with:

- Product idea summary.
- Required section headings.
- Tables matching each skill.
- `Assumptions` blocks where evidence is missing.
- TODO prompts for research-heavy sections.

This gives the project a usable baseline without requiring an API key or external model.

### Phase 2: AI Provider Integration

Add optional AI generation after deterministic output works.

Recommended abstraction:

```text
providers/
  base.py
  openai.py
  anthropic.py
  local.py
```

Recommended flags:

```bash
--provider openai
--model gpt-5.5
--dry-run
```

The prompt should include:

- Product idea.
- Relevant skill files for the target document.
- Critical rules from `core/product-documentation-generator.md`.
- Quality review rules from `core/quality-review.md`.
- Output filename and required structure.

### Phase 3: Research Mode

Add optional web research support.

Recommended behavior:

- If research is disabled, label market, competitor, and keyword outputs as assumptions.
- If research is enabled, require citations or source notes.
- Never invent competitors or search volume.

Recommended flag:

```bash
--research web
```

### Phase 4: Quality Review Pass

Add a final pass that checks:

- All 7 main files exist.
- `asana-task.html` exists and includes a working copy button.
- Required headings exist.
- No empty critical sections.
- Assumptions are explicitly marked.
- Build recommendation is consistent across `01-discovery.md` and `07-build-or-not-build.md`.

Generate:

```text
quality-report.md
```

## Current JavaScript Structure

```text
scripts/
  init.js
  start.js
  shared.js
```

Keep this structure until AI provider integration or richer templates require refactoring.

## Minimum Viable Implementation

The current working version includes:

- npm scripts.
- File-safe product slug generation.
- Output directory creation.
- Static list of 7 document filenames.
- Template sections for each document.
- Skill loader that reads markdown files and embeds skill references into generated docs.
- `index.md` generation.
- `quality-report.md` generation.
- `asana-task.html` generation.
- Basic existence checks.

## Example Generated Header

Every generated document should start with:

```markdown
# Document Title

## Product Idea

<original product idea>

## Evidence Status

This document contains assumptions where market, keyword, competitor, or pricing evidence has not been independently verified.

## Skills Used

- <skill path>
```

## Validation Commands

Run:

```bash
npm run init
npm run start -- <project-name>
```

Then verify:

```bash
ls projects/<project-name>/create-question-by-agent.md
```

Expected result: a paste-ready `[create-question-by-agent]` prompt.

After the AI agent creates and the user answers `questions.md`, run:

```bash
npm run create -- <project-name>
ls projects/<project-name>/create-documents-by-agent.md
```

Expected result: a paste-ready `[create-documents-by-agent]` prompt.

For skeleton documents:

```bash
npm run start -- <project-name> --generate-docs
ls projects/<project-name>/output
```

Expected result: 7 numbered markdown documents plus `index.md`, `quality-report.md`, and `asana-task.html`.

## Important Rules To Preserve

- Read all relevant skills before generation.
- Skill instructions override generic knowledge.
- Never generate filler content.
- Never invent fake competitors.
- Explicitly mark assumptions.
- Every document must be actionable.
- Optimize for viability, development efficiency, support cost, SEO potential, and revenue.

## Next Step

Improve templates and optionally add AI provider integration.
