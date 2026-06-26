SELF-UPDATE RULE
This file is the single source of truth for ba-autospec architecture.
Any AI agent that modifies architecture, rules, workflow, features, output structure, script logic, or skill system MUST update this file in the same session before finishing.
No exception. Stale documentation is a bug.

---

PROJECT: ba-autospec
Purpose: AI-powered Business Analyst toolkit. Turns product ideas into complete discovery, documentation, and marketing packages via human-AI collaboration.
Runtime: Node.js >= 18, ES Modules
External deps: None (zero npm runtime deps)
PDF export: WeasyPrint (Python CLI, optional)
Output language: Vietnamese (technical terms stay in English)
Repo root: /home/ecommercelife/Desktop/ba-works/ba-autospec

---

DIRECTORY STRUCTURE

scripts/shared.js       — constants, utilities, input templates, skill loaders
scripts/init.js         — npm run init: create new project
scripts/start.js        — npm run start: generate question prompt for AI agent
scripts/create.js       — npm run create: generate document creation prompt for AI agent
scripts/pdf.js          — npm run pdf: export markdown to PDF via WeasyPrint

product-documentation-generator/skills/    — Tool 1 skill package
  README.md             — skill index, dependency graph, recommended load order
  mandatory-skills.md   — skills that must be loaded before any generation
  skill-map.md          — maps each output document to required skills
  core/                 — product-documentation-generator.md, quality-review.md
  discovery/            — assumption-mapping.md, market-validation.md
  research/             — competitor-analysis.md, search-demand-analysis.md
  product/              — product-strategy.md, product-brief.md, prd.md
  ux/
    user-flow.md
    wireframe-specification.md
    html-wireframe.md          — NEW: HTML5+Tailwind wireframe rendering rules
    wp-admin-ui.md             — NEW: WordPress admin chrome rules for wireframes
  qa/                   — test-plan.md
  docs/                 — documentation-outline.md
  seo/                  — product-page-outline.md, seo-content-plan.md
  marketing/            — positioning-and-copy.md, growth-loops.md

product-content-generator/skills/          — Tool 2 skill package
  mandatory-skills.md, skill-map.md
  product-analysis.md, customer-persona.md, seo-keyword-research.md
  wordpress-addon-specialist.md, product-copywriter.md, landing-page-writer.md
  competitor-comparison.md, blog-content-generator.md, faq-generator.md
  brand-voice-mamflow.md
product-content-generator/woocommerce-style-reference.md  — local WooCommerce style cache

all-skills/             — raw source skill library (10 categories, not directly used by tools)
  08-business-product/  — origin of Tool 1 skills

projects/               — per-project data
  <slug>/
    project.json        — { "tool": "product-documentation-generator" }
    input.md            — user fills product info
    questions.md        — AI creates, user answers
    create-question-by-agent.md   — prompt file (step 1 output)
    create-documents-by-agent.md  — prompt file (step 2 output)
    output/             — Tool 1 final documents
    content-output/     — Tool 2 final documents

---

TWO TOOLS

TOOL 1: product-documentation-generator
Name: Product Documentation & Discovery Generator
Skills dir: product-documentation-generator/skills/
Output dir: projects/<slug>/output/

Output files (exactly 7 main + 3 supporting, NEVER more):
01-discovery.md         — market validation, search demand, competitor landscape, gap analysis, risk, Market Opportunity Score, Build Recommendation
02-product-strategy.md  — positioning, USP, differentiators, revenue model, roadmap v1/v1.1/v2
03-prd.md               — user stories, functional/non-functional requirements, permission matrix, acceptance criteria, success metrics
04-ux-and-wireframe.md  — Mermaid user flow, role-based flows, screen list, HTML5+Tailwind wireframes (wp-admin chrome for WordPress products, design system for non-WP products), empty/error states
05-qa-and-documentation.md — test plan (functional/permission/regression/security/perf), documentation outline, FAQ
06-seo-and-marketing.md — SEO title, meta description, product page outline, keyword groups, >=25 content ideas, names/taglines, launch assets
07-build-or-not-build.md — Build Now / Build Later / Validate First / Reject + ROI + cost + strategic fit
index.md                — file list
quality-report.md       — quality check, open assumptions, evidence gaps
asana-task.html         — browser-friendly Asana task with Copy for Asana button


---

TOOL 2: product-content-generator
Name: Product Content Generator
Skills dir: product-content-generator/skills/
Output dir: projects/<slug>/content-output/

Output files (exactly 6 main + 2 supporting):
01-product-analysis.md  — product summary, personas, feature-benefit table, differentiators, proof gaps
02-seo-keyword-plan.md  — keyword groups, search intent, funnel stage, schema recommendations
03-product-page-copy.md — hero headline, CTA copy, descriptions (short/medium/long), feature blurbs, trust modules
04-landing-page.html    — standalone WooCommerce-style HTML (no build step, no CDN)
05-comparison-faq.md    — competitor comparison, buyer objections, FAQ
06-blog-content-plan.md — >=20 blog ideas, 3 detailed article briefs, launch announcement, internal linking plan
index.md                — file list
quality-report.md       — quality check

Style reference: product-content-generator/woocommerce-style-reference.md (local cache, do not web search WooCommerce per run)

---

WORKFLOW

Step 1 — npm run init
  Interactive or non-interactive: select tool, enter project name
  Creates: projects/<slug>/input.md, projects/<slug>/project.json
  Does NOT overwrite existing input.md

Step 2 — User fills input.md

Step 3 — npm run start -- <slug>
  Reads input.md → parses answers → detects weak fields
  Tool 1: renders create-question-by-agent.md (question prompt, embeds mandatory-skills + skill-map)
  Tool 2: renders create-content-question-by-agent.md (embeds full skill files + mandatory-skills + skill-map)
  Flag --generate-docs (Tool 1 only): skips AI, writes 7 skeleton documents directly

Step 4 — AI Agent reads prompt, reads input.md + skills, creates questions.md

Step 5 — User answers questions.md

Step 6 — npm run create -- <slug>
  Validates input.md and questions.md exist
  Tool 1: renders create-documents-by-agent.md (full doc spec, mapping, asana HTML spec)
  Tool 2: renders create-product-content-by-agent.md (content spec, HTML landing page spec)

Step 7 — AI Agent reads prompt, creates final output files

Step 8 — npm run pdf -- <slug>  (Tool 1 only, optional)
  Detects WeasyPrint in PATH or exits with install instructions
  Auto-detects project if only one project has output markdown
  Reads output/*.md only (flat, non-recursive)
  Skips: quality-report.md (explicit), output/wireframes/*.html (different type+dir — no code change needed)
  04-ux-and-wireframe.md is included in PDF (flows + screen list in markdown)
  Wireframes HTML files are browser-only; not converted to PDF
  Outputs: output/pdf/product-documentation.pdf + individual PDFs per file

---

SCRIPT LOGIC

shared.js constants:
  ROOT_DIR = process.cwd()
  PROJECTS_DIR = ROOT_DIR/projects
  DEFAULT_TOOL_ID = "product-documentation-generator"
  TOOLS = { id, name, skillsDir } for both tools
  DOCUMENTS = array of [filename, title] for 7 main docs

shared.js functions:
  slugify(value)          — lowercase, NFKD normalize, strip diacritics, non-alphanumeric→hyphen, max 80 chars, fallback "untitled-project"
  ensureDir(dir)          — fs.mkdirSync recursive
  readIfExists(path)      — read file or return ""
  inputTemplate(name, id) — returns markdown template for input.md per tool
  parseInputMarkdown(str) — parses "## Section\ncontent" → { "Section": "content" }
  readProjectConfig(dir)  — reads project.json → { tool }, fallback DEFAULT_TOOL_ID
  getTool(id)             — returns tool config, fallback DEFAULT_TOOL_ID
  loadSkillMap(id)        — reads skills/skill-map.md
  loadMandatorySkills(id) — reads skills/mandatory-skills.md
  listSkillFiles(id)      — lists all .md in skills dir, sorted
  loadSkillFilesSummary(id) — concat all skill files with "## <relative-path>" headers

init.js:
  Parses --tool <id> flag and positional project name
  Interactive fallback via readline if no args
  Creates project.json and input.md from template

start.js:
  findWeakFields(answers) — checks 13 required fields: Product Idea, Product Type, Target Users, User Roles, Core Problem, Proposed Solution, Must-Have Features, Competitors Or Alternatives, Pricing Or Revenue Model, SEO Keywords, Business Goals, Success Metrics, Risks Or Constraints
  Field is weak if: empty, "Unknown", "TODO", "N/A", or contains original template placeholder text

create.js:
  Requires both input.md and questions.md to exist before rendering
  Tool 1 prompt embeds: mandatory-skills + skill-map
  Tool 2 prompt embeds: mandatory-skills + skill-map + full skill files

pdf.js:
  Custom markdown-to-HTML renderer (no external lib): h1-h4, paragraphs, ul/ol, tables, fenced code, blockquotes, inline bold/italic/code/links
  HTML format: A4, Inter font, purple accent #7f56d9, dark code blocks
  Joins markdown files with <div class="page-break"> between them

---

INPUT TEMPLATES

Tool 1 sections (17):
  Project Name, Product Idea, Product Type, Target Users, User Roles, Core Problem, Proposed Solution, Must-Have Features, Nice-To-Have Features, Out Of Scope, Competitors Or Alternatives, Integrations, Pricing Or Revenue Model, SEO Keywords, Business Goals, Success Metrics, Risks Or Constraints, Notes

  Product Type options: WordPress Plugin, WordPress Theme, Shopify Theme, Shopify App, SaaS Product, LMS Add-on, eCommerce Extension, Other
  User Roles examples: Admin, Instructor, Student, Customer, Guest, Manager, Developer

Tool 2 sections (18):
  Project Name, Product URL Or Reference, Product Name, Product Type, Product One-Liner, Target Customers, Customer Problems, Core Features, Key Benefits, Differentiators, Competitors Or Alternatives, Pricing And License, Compatibility And Requirements, Proof Points, SEO Keywords, Brand Voice Notes, Required Assets, Notes

project.json format: { "tool": "<toolId>", "toolName": "<toolName>" }

---

SKILL SYSTEM

Skills are markdown instruction sets for AI agents. Not executable code.
Skill instructions override AI general knowledge.

Tool 1 mandatory load order (17 skills):
1  core/product-documentation-generator.md  — orchestration, operating principles (always load first)
2  discovery/assumption-mapping.md           — VUBF framework for assumptions
3  discovery/market-validation.md            — Market Opportunity Score, build recommendation
4  research/search-demand-analysis.md        — keyword intent, monetization potential
5  research/competitor-analysis.md           — competitor profiles, gap analysis
6  product/product-strategy.md               — positioning, USP, roadmap
7  product/product-brief.md                  — stakeholder alignment
8  product/prd.md                            — user stories, requirements, acceptance criteria
9  ux/user-flow.md                           — role-based flows, Mermaid diagrams
10 ux/wireframe-specification.md             — screen list planning, per-screen requirements
11 ux/html-wireframe.md                      — HTML5+Tailwind wireframe rendering (Tailwind CDN, self-contained, no build step)
12 ux/wp-admin-ui.md                         — WP admin chrome: sidebar, admin bar, tabs, form tables, notices; load when product is WordPress Plugin or LMS Add-on
13 qa/test-plan.md                           — functional/permission/regression/security/perf tests
14 docs/documentation-outline.md             — documentation package planning
15 seo/product-page-outline.md               — SEO-ready product page structure
16 seo/seo-content-plan.md                   — content topics, demand capture
17 marketing/positioning-and-copy.md         — names, taglines, descriptions, launch assets
18 marketing/growth-loops.md                 — acquisition and expansion loops
19 core/quality-review.md                    — completeness, evidence quality, consistency (always load last)

Tool 1 skill-to-document map:
01-discovery.md          → core, assumption-mapping, market-validation, search-demand-analysis, competitor-analysis, product-strategy, test-plan
02-product-strategy.md   → product-strategy, product-brief, competitor-analysis, search-demand-analysis, growth-loops
03-prd.md                → prd, product-brief, product-strategy, competitor-analysis, user-flow
04-ux-and-wireframe.md   → user-flow, wireframe-specification, html-wireframe, wp-admin-ui (WordPress/LMS only), product-brief, prd
05-qa-and-documentation.md → test-plan, documentation-outline, prd, user-flow, wireframe-specification
06-seo-and-marketing.md  → product-page-outline, seo-content-plan, positioning-and-copy, growth-loops, search-demand-analysis, competitor-analysis, product-strategy
07-build-or-not-build.md → market-validation, assumption-mapping, product-strategy, test-plan, quality-review
Cross-cutting: quality-review applied to ALL documents before final delivery

Tool 2 mandatory skills (10, all required):
product-analysis.md, customer-persona.md, seo-keyword-research.md, wordpress-addon-specialist.md, product-copywriter.md, landing-page-writer.md, competitor-comparison.md, blog-content-generator.md, faq-generator.md, brand-voice-mamflow.md

Tool 2 skill-to-asset map:
01-product-analysis.md   → product-analysis, customer-persona, wordpress-addon-specialist
02-seo-keyword-plan.md   → seo-keyword-research, competitor-comparison, blog-content-generator
03-product-page-copy.md  → product-copywriter, landing-page-writer, brand-voice-mamflow, wordpress-addon-specialist
04-landing-page.html     → landing-page-writer, product-copywriter, brand-voice-mamflow, faq-generator
05-comparison-faq.md     → competitor-comparison, faq-generator, seo-keyword-research
06-blog-content-plan.md  → blog-content-generator, seo-keyword-research, product-copywriter
brand-voice-mamflow: apply across ALL assets
wordpress-addon-specialist: apply for compatibility, technical notes, WP/WooCommerce/LearnPress buyer concerns
product-analysis: apply to prevent unsupported claims

---

PROMPT ARCHITECTURE

Two prompt file types per project:

create-question-by-agent.md (header: [create-question-by-agent] or [create-content-question-by-agent])
Structure:
  1. AI role declaration
  2. Task: create questions.md at specific path
  3. Required files to read list
  4. Input summary table (table-escaped values)
  5. Auto-detected weak fields list
  6. Rules for questions.md (7-8 rules)
  7. Mandatory questions.md structure (hardcoded sections)
  8. Embedded mandatory-skills.md content
  9. Embedded skill-map.md content
  10. Tool 2 only: embedded full skill files

create-documents-by-agent.md (header: [create-documents-by-agent] or [create-product-content-by-agent])
Structure:
  1. AI role declaration
  2. Task: create full output in output/ or content-output/
  3. Required files to read list
  4. Exact output file paths (absolute from repo root)
  5. Strict output rules (10-12 rules)
  6. Per-document mapping with required sections (Tool 1) or per-asset spec (Tool 2)
  7. Asana Task HTML spec (Tool 1 only)
  8. Output language rules
  9. Quality rules (12 rules)
  10. Mandatory workflow order
  11. Quality report spec
  12. Embedded mandatory-skills content
  13. Embedded skill-map content

---

AI AGENT RULES (applies to all prompts)

FORBIDDEN:
- Fabricate competitors, search volume, pricing, customer evidence, market data
- Create files outside the specified output list
- Write filler content ("powerful solution", "seamless experience")
- Web search WooCommerce unless explicitly requested
- Copy verbatim from any source

REQUIRED:
- Read all specified skills before writing any document
- Skill instructions take priority over general AI knowledge
- Mark missing data as: Assumption, Can validate, or Open question — never invent
- Every document must have sections: Assumptions And Open Questions + Next Actions
- Use tables, checklists, Mermaid diagrams, HTML5+Tailwind wireframes where appropriate
- Every recommendation must state reason: user value, business value, technical feasibility, risk reduction, or SEO/revenue potential
- Run 01-discovery.md first; use its conclusions to write subsequent documents
- Write 07-build-or-not-build.md last

LANGUAGE:
- Final documents: Vietnamese
- Technical terms stay in English: PRD, roadmap, user flow, wireframe, acceptance criteria, SEO, conversion, churn, LTV, CAC, MVP, API, webhook
- Filenames stay in English as listed

---

ASANA TASK HTML SPEC

File: asana-task.html (Tool 1 only)
Type: standalone HTML, no external deps, no CDN

Required 9 sections in order:
1. Business Goal
2. Problem Statement
3. Target Users
4. Functional Requirements
5. UI References
6. Technical Notes
7. Acceptance Criteria
8. Subtasks
9. Release Notes

Technical requirements:
  id="asana-content" on task content container
  id="copy-button" on copy button
  Clipboard: copy rich text (HTML) via ClipboardItem if supported, fallback to innerText plain text
  After copy: button text → "Copied" for 1600ms then revert
  No markdown in HTML; render as headings/paragraphs/ul/ol/li
  No remote scripts, no CDN

---

WOOCOMMERCE STYLE REFERENCE

File: product-content-generator/woocommerce-style-reference.md
Purpose: local cache of WooCommerce product page pattern; use instead of web searching each run

Page structure (11 sections):
1. Marketplace context: breadcrumbs, product icon, one-sentence promise, hero image
2. Purchase panel: pricing, CTA, reviews (only when verified data exists)
3. Trust block: product updates, support, guarantee, docs link, feature requests link
4. Compatibility/quality: PHP/WP/WooCommerce requirements, HPOS, Cart/Checkout Blocks (never claim without evidence)
5. Top feature bullets: practical, high-value, near the top
6. Benefit-led narrative: start with business pain, explain outcome, tie to revenue/automation/admin effort
7. Feature sections: heading + short paragraph + optional docs link
8. Outcome CTA: restate business outcome after features
9. Getting started: numbered install/configure/customize/sell steps
10. FAQ: direct support-oriented answers
11. Reviews/related products: only when verified data exists, never fabricate

Required content output order:
product header → pricing/CTA/trust → compatibility → feature bullets → benefit narrative → feature sections → getting started → FAQ → related/comparison

Tone: practical, clear, marketplace-oriented, merchant-focused, confident, short paragraphs, concrete outcomes, no hype

Evidence rules: ratings, active installs, version, compatibility, pricing, guarantee all require source data; mark missing as "Can validate" or omit from buyer-facing copy

---

PDF EXPORT

Tool: Tool 1 only
Dependency: WeasyPrint in system PATH (python -m pip install weasyprint)
Auto-detect: if only one project has output markdown, project arg is optional
Source: reads output/*.md — flat directory only, non-recursive
Excludes automatically:
  quality-report.md (explicit filter in code)
  output/wireframes/*.html (not .md files, subdirectory — never touched by pdf.js)
Page break separator: <div class="page-break"> between files
CSS: A4, Inter/"Noto Sans" font, #172033 text, #7f56d9 blockquote accent, dark code blocks (#101828 bg)
Output: output/pdf/product-documentation.pdf + output/pdf/<basename>.pdf per file

Wireframe delivery model:
  04-ux-and-wireframe.md → included in PDF (contains flows, screen list, state definitions in markdown)
  output/wireframes/wireframes.html → browser-only deliverable, NOT in PDF
  No code change needed in pdf.js to support this — the separation is architectural by file type and directory

Custom markdown-to-HTML renderer (no external lib):
Supports: h1-h4, paragraphs, ul/ol/li, tables (GitHub pipe style), fenced code blocks, blockquotes, inline **bold**, *italic*, `code`, [link](url)

---

EXTENDING THE PROJECT

To add a new tool:
1. Add entry to TOOLS object in scripts/shared.js with id, name, skillsDir
2. Create <tool-id>/skills/ with mandatory-skills.md and skill-map.md
3. Add inputTemplate() branch by toolId in shared.js
4. Add question prompt renderer in start.js
5. Add document creation prompt renderer in create.js
6. Update init.js interactive menu if needed
7. UPDATE THIS FILE (technology.md) to document the new tool

---

NPM SCRIPTS

npm run init                                    — create project (interactive)
npm run init -- "Name"                          — create project (non-interactive, default tool)
npm run init -- --tool product-content-generator "Name"  — create with specific tool
npm run start -- <slug>                         — generate question prompt
npm run start -- <slug> --generate-docs         — generate skeleton docs directly (Tool 1 only)
npm run create -- <slug>                        — generate document creation prompt
npm run pdf -- <slug>                           — export to PDF
npm run pdf                                     — export to PDF (auto-detect single project)

---

REAL PROJECT EXAMPLE

projects/learnpress-membership/
Tool: product-documentation-generator
Product: Upgrade Memberships & Subscriptions Add-on for LearnPress
  Module 1: Membership Restriction Engine (restrict content by plan: post/page/course/lesson/quiz, hide/redirect modes, Gutenberg block/shortcode, admin rule UI)
  Module 2: WooCommerce Membership Purchase (buy plan via WooCommerce cart/checkout, map Woo order to LP order with _plan_id, lifecycle sync)
Status: output/ complete with all 7 main docs + asana-task.html + index.md + quality-report.md
Tech context: WordPress 6.x+, PHP 8.x+, LearnPress core, WooCommerce, learnpress-woo-payment, WooCommerce Subscriptions (optional), Gutenberg

---

SELF-UPDATE CHECKLIST (run before finishing any session that changes the project)

After any change to architecture, rules, workflow, output structure, script logic, skill system, or new tool/feature:
[ ] Update relevant section in this file
[ ] Verify section headings still match actual file/folder names
[ ] Remove any section that is no longer accurate
[ ] Do not add new sections for minor implementation details; keep this file scannable
