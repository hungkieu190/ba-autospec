# Product Documentation Generator Skills

This skill package supports a Product Documentation & Discovery Generator that creates discovery, product planning, UX, QA, documentation, SEO, and marketing deliverables for commercial software products.

## Skill Index

| Skill | Path | Purpose | Use When |
| --- | --- | --- | --- |
| Product Documentation Generator Core | `core/product-documentation-generator.md` | Orchestrates the full generation workflow and output package. | Always load first. |
| Quality Review | `core/quality-review.md` | Checks completeness, evidence quality, actionability, and consistency. | Always load before final delivery. |
| Assumption Mapping | `discovery/assumption-mapping.md` | Identifies and prioritizes risky product assumptions using VUBF. | Before market validation or when evidence is weak. |
| Market Validation | `discovery/market-validation.md` | Scores opportunity and decides build recommendation. | Before producing product execution docs. |
| Search Demand Analysis | `research/search-demand-analysis.md` | Maps keywords by intent and monetization potential. | For search demand and SEO planning. |
| Competitor Analysis | `research/competitor-analysis.md` | Profiles competitors, alternatives, gaps, and opportunities. | For competitor landscape, gap analysis, and feature comparison. |
| Product Strategy | `product/product-strategy.md` | Defines positioning, USP, differentiation, revenue model, roadmap, and metrics. | After discovery and before PRD. |
| Product Brief | `product/product-brief.md` | Aligns stakeholders on problem, solution, audience, value, scope, and out-of-scope. | For the product brief deliverable. |
| PRD | `product/prd.md` | Converts strategy into user stories, requirements, permissions, acceptance criteria, and success metrics. | For engineering, QA, design, and docs readiness. |
| User Flow | `ux/user-flow.md` | Defines role-based flows and Mermaid diagrams. | Before wireframes and PRD validation. |
| Wireframe Specification | `ux/wireframe-specification.md` | Plans screen list and per-screen requirements. | For screen inventory and state planning. |
| HTML Wireframe | `ux/html-wireframe.md` | Renders HTML5 + Tailwind CSS wireframes. Load when wireframes are produced. | Whenever wireframes are part of the deliverable. |
| WordPress Admin UI | `ux/wp-admin-ui.md` | Defines WP admin chrome (sidebar, admin bar, tabs, notices) for Tailwind wireframes. | When product type is WordPress Plugin or LMS Add-on and screens live in wp-admin. |
| Test Plan | `qa/test-plan.md` | Creates functional, permission, regression, security, performance, and edge-case test plans. | After PRD and flows exist. |
| Documentation Outline | `docs/documentation-outline.md` | Plans user, admin, developer, support, and changelog documentation. | For documentation package generation. |
| Product Page Outline | `seo/product-page-outline.md` | Builds SEO-ready and conversion-focused product page structure. | For product page deliverable. |
| SEO Content Plan | `seo/seo-content-plan.md` | Generates content topics for demand capture and product education. | For SEO content roadmap. |
| Positioning and Copy | `marketing/positioning-and-copy.md` | Generates names, taglines, descriptions, and launch assets. | For marketing assets. |
| Growth Loops | `marketing/growth-loops.md` | Designs acquisition and expansion loops. | For growth strategy and launch planning. |

## Dependencies

| Dependent Skill | Requires |
| --- | --- |
| Market Validation | Assumption Mapping, Search Demand Analysis, Competitor Analysis |
| Product Strategy | Market Validation, Competitor Analysis, Search Demand Analysis |
| Product Brief | Product Strategy |
| PRD | Product Brief, Product Strategy, User Flow |
| User Flow | Product Brief, PRD assumptions when available |
| Wireframe Specification | User Flow, Product Brief |
| HTML Wireframe | Wireframe Specification, User Flow, Product Brief |
| WordPress Admin UI | HTML Wireframe (provides base rendering), Wireframe Specification |
| Test Plan | PRD, User Flow, Wireframe Specification |
| Documentation Outline | PRD, User Flow, Test Plan |
| Product Page Outline | Search Demand Analysis, Competitor Analysis, Product Strategy, Positioning and Copy |
| SEO Content Plan | Search Demand Analysis, Competitor Analysis, Product Strategy |
| Positioning and Copy | Product Strategy, Product Brief, Product Page Outline |
| Growth Loops | Product Strategy, Market Validation |
| Quality Review | All generated documents |

## Recommended Loading Order

1. `core/product-documentation-generator.md`
2. `discovery/assumption-mapping.md`
3. `discovery/market-validation.md`
4. `research/search-demand-analysis.md`
5. `research/competitor-analysis.md`
6. `product/product-strategy.md`
7. `product/product-brief.md`
8. `product/prd.md`
9. `ux/user-flow.md`
10. `ux/wireframe-specification.md`
11. `ux/html-wireframe.md`
12. `ux/wp-admin-ui.md` (WordPress/LMS products only)
11. `qa/test-plan.md`
12. `docs/documentation-outline.md`
13. `seo/product-page-outline.md`
14. `seo/seo-content-plan.md`
15. `marketing/positioning-and-copy.md`
16. `marketing/growth-loops.md`
17. `core/quality-review.md`

## Source Skills Consolidated

This package was derived from selected material in `08-business-product/`, especially product management, business analysis, UX research, technical writing, content marketing, content quality editing, assumption mapping, growth loops, legal risk thinking, backlog readiness, and QA-related delivery standards.
