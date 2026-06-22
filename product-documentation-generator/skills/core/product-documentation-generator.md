# Product Documentation Generator Core

## Purpose

Use this skill as the orchestration layer for generating complete product discovery, product documentation, and marketing packages for WordPress plugins, WordPress themes, Shopify themes, Shopify apps, SaaS products, LMS add-ons, and eCommerce extensions.

## Operating Principles

- Read the product idea and all relevant skills before writing final documents.
- Follow specific skill instructions before generic product knowledge.
- Validate whether the product should be built before writing execution documents.
- Mark assumptions explicitly when source evidence is unavailable.
- Do not invent fake competitors, metrics, search volume, pricing, or customer evidence.
- Prefer actionable decisions, checklists, tables, and concrete acceptance criteria.
- Think commercially: viability, revenue, support cost, SEO potential, and defensibility matter as much as technical feasibility.
- Keep every document useful for a real team: product, design, engineering, QA, docs, marketing, SEO, and leadership.

## Required Workflow

1. Parse the product idea, target platform, target users, business model, constraints, and unknowns.
2. Run discovery: market validation, search demand, competitors, gaps, revenue potential, complexity, risks, and strategy.
3. Decide whether to build before continuing.
4. Generate product documentation: brief, competitor analysis, feature comparison, flows, PRD, wireframes, test plan, docs outline, and product page outline.
5. Generate marketing assets: naming, taglines, descriptions, SEO content plan, launch assets, and build-or-not-build report.
6. Run quality review against completeness, evidence quality, actionability, and consistency.

## Minimum Evidence Rules

- Use public research when available.
- If web research is not available, label competitor/search/market content as assumptions or hypotheses.
- Separate facts from recommendations.
- Never present estimated demand as verified search volume unless the source provides it.

## Standard Output Package

- `01-discovery.md`
- `02-product-strategy.md`
- `03-prd.md`
- `04-ux-and-wireframe.md`
- `05-qa-and-documentation.md`
- `06-seo-and-marketing.md`
- `07-build-or-not-build.md`

## Output Constraints

- Generate exactly 7 main documents by default.
- Do not split the package into the older 23-file structure.
- Add only `index.md` and `quality-report.md` as supporting files.
- Consolidate related sections into the closest matching document instead of creating new files.
- Every document must include `Assumptions And Open Questions` and `Next Actions`.
