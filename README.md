# ba-autospec
Your AI-Powered Business Analyst — Turn Ideas into Complete Features &amp; Documentation Instantly

## Usage

Create a new project input file:

```bash
npm run init
```

The interactive command lets you choose one of the available tools:

```text
1. Product Documentation & Discovery Generator
2. Product Content Generator
```

You can also create one non-interactively:

```bash
npm run init -- "LearnPress Chat Room"
npm run init -- --tool product-content-generator "Woo Add-on Product Page"
```

The command creates:

```text
projects/<project-name>/input.md
```

Fill in `input.md`, then generate the prompt for your AI agent:

```bash
npm run start -- <project-name>
```

Example:

```bash
npm run start -- learnpress-chat-room
```

This creates:

```text
projects/<project-name>/create-question-by-agent.md
```

Paste the full content of `create-question-by-agent.md` into your AI agent chat. The AI agent will read `input.md` and the skill package, then create:

```text
projects/<project-name>/questions.md
```

Answer the questions directly in `questions.md`, then generate the final document-creation prompt:

```bash
npm run create -- <project-name>
```

This creates:

```text
projects/<project-name>/create-documents-by-agent.md
```

Paste that prompt into your AI agent chat. The AI agent will create the final documentation in Vietnamese under:

```text
projects/<project-name>/output/
```

The final package must contain exactly 7 main documents:

```text
01-discovery.md
02-product-strategy.md
03-prd.md
04-ux-and-wireframe.md
05-qa-and-documentation.md
06-seo-and-marketing.md
07-build-or-not-build.md
```

It must also contain:

```text
index.md
quality-report.md
asana-task.html
```

`asana-task.html` is a browser-friendly Asana task preview with a `Copy for Asana` button. It contains these sections:

```text
1. Business Goal
2. Problem Statement
3. Target Users
4. Functional Requirements
5. UI References
6. Technical Notes
7. Acceptance Criteria
8. Subtasks
9. Release Notes
```

The old 23-file structure is intentionally not used by the default workflow.

Technical terms such as PRD, roadmap, user flow, wireframe, acceptance criteria, SEO, LTV, CAC, MVP, API, and webhook can stay in English.

To generate the current deterministic document skeletons directly, use:

```bash
npm run start -- <project-name> --generate-docs
```

Generated 7-file skeletons are written to:

```text
projects/<project-name>/output/
```

The current tool is `Product Documentation & Discovery Generator`.

## Product Content Generator

The second workflow creates product marketing content using skills in:

```text
product-content-generator/skills/
```

It generates AI-agent prompts for WooCommerce-style product content. The generated content prompt asks the AI agent to create:

```text
content-output/01-product-analysis.md
content-output/02-seo-keyword-plan.md
content-output/03-product-page-copy.md
content-output/04-landing-page.html
content-output/05-comparison-faq.md
content-output/06-blog-content-plan.md
content-output/index.md
content-output/quality-report.md
```

The style reference is WooCommerce product pages, especially WooCommerce Subscriptions: product promise, pricing/CTA block, trust/support modules, compatibility, feature bullets, benefit-led sections, getting started, FAQ, and related/comparison content.
