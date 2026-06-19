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

## Recommended Tool Shape

Create a self-contained Python CLI because the repo has no existing Node, Python package, or app framework.

Recommended path:

```text
product-documentation-generator/
bin/
  generate-product-docs.py
templates/
  optional-template-files.md
examples/
  sample-idea.md
  sample-output/
```

## CLI Interface

Recommended command:

```bash
python product-documentation-generator/bin/generate-product-docs.py \
  --idea "Create a LearnPress Chat Room Add-on that allows instructors and enrolled students to communicate in real time inside a course." \
  --output ./output/learnpress-chat-room
```

Optional flags:

```bash
--idea-file ./idea.md
--product-name "LearnPress Chat Room"
--platform wordpress-plugin
--assumptions-mode explicit
--overwrite
```

## Required Behavior

The CLI should:

1. Read either `--idea` or `--idea-file`.
2. Load mandatory skills from `skills/mandatory-skills.md`.
3. Load skill-to-document mapping from `skills/skill-map.md`.
4. Create the output directory.
5. Generate all required markdown files:
   - `00-market-validation.md`
   - `01-search-demand-analysis.md`
   - `02-competitor-landscape.md`
   - `03-competitor-gap-analysis.md`
   - `04-revenue-potential.md`
   - `05-product-complexity.md`
   - `06-risk-assessment.md`
   - `07-product-strategy.md`
   - `08-product-brief.md`
   - `09-competitor-analysis.md`
   - `10-feature-comparison.md`
   - `11-user-flow.md`
   - `12-prd.md`
   - `13-wireframe.md`
   - `14-test-plan.md`
   - `15-documentation-outline.md`
   - `16-product-page-outline.md`
   - `17-product-naming.md`
   - `18-taglines.md`
   - `19-product-descriptions.md`
   - `20-seo-content-plan.md`
   - `21-launch-assets.md`
   - `22-build-or-not-build.md`
6. Generate an `index.md` that links all output files.
7. Mark unsupported market/search/competitor claims as assumptions.

## Implementation Phases

### Phase 1: Deterministic Template Generator

Build a non-AI template generator first.

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

- All 23 files exist.
- Required headings exist.
- No empty critical sections.
- Assumptions are explicitly marked.
- Build recommendation is consistent across `00-market-validation.md` and `22-build-or-not-build.md`.

Generate:

```text
quality-report.md
```

## Suggested Python Structure

```text
product-documentation-generator/
bin/
  generate-product-docs.py
src/
  product_docs_generator/
    __init__.py
    cli.py
    config.py
    skills.py
    documents.py
    templates.py
    quality.py
    providers/
      __init__.py
      base.py
```

If keeping the first implementation minimal, start with a single script in `bin/` and refactor later only when needed.

## Minimum Viable Implementation

The first working version should include:

- `argparse` CLI.
- File-safe product slug generation.
- Output directory creation.
- Static list of 23 document filenames.
- Template functions for each document.
- Skill loader that reads markdown files and embeds skill references into generated docs.
- `index.md` generation.
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

After implementation, run:

```bash
python product-documentation-generator/bin/generate-product-docs.py --help
python product-documentation-generator/bin/generate-product-docs.py --idea "Create a LearnPress Chat Room Add-on" --output /tmp/opencode/learnpress-chat-room-docs --overwrite
```

Then verify:

```bash
ls /tmp/opencode/learnpress-chat-room-docs
```

Expected result: 23 numbered markdown documents plus `index.md` and optionally `quality-report.md`.

## Important Rules To Preserve

- Read all relevant skills before generation.
- Skill instructions override generic knowledge.
- Never generate filler content.
- Never invent fake competitors.
- Explicitly mark assumptions.
- Every document must be actionable.
- Optimize for viability, development efficiency, support cost, SEO potential, and revenue.

## Next Step

Start by implementing the deterministic CLI in `product-documentation-generator/bin/generate-product-docs.py`.
