# Skill Selection Report

## Source Library

Scanned folder: `08-business-product/`

## Skills Found

| Source Skill | File | Relevance |
| --- | --- | --- |
| README | `README.md` | Useful as source index and integration context. |
| assumption-mapping | `assumption-mapping.md` | High relevance for product validation and risk discovery. |
| backlog-grooming | `backlog-grooming.md` | Partial relevance for story readiness, acceptance criteria, and QA readiness. |
| business-analyst | `business-analyst.md` | High relevance for requirements, process analysis, user stories, acceptance criteria, and test plans. |
| content-marketer | `content-marketer.md` | High relevance for SEO, product pages, content planning, and launch assets. |
| content-quality-editor | `content-quality-editor.md` | Medium relevance for final content quality standards. |
| customer-success-manager | `customer-success-manager.md` | Partial relevance for onboarding, adoption, retention, feedback, and support-driven documentation. |
| growth-loops | `growth-loops.md` | High relevance for product-led growth and marketing strategy. |
| legal-advisor | `legal-advisor.md` | Partial relevance for legal risk assessment, privacy, IP, and compliance considerations. |
| license-engineer | `license-engineer.md` | Low to partial relevance for licensing risk and distribution strategy. |
| product-manager | `product-manager.md` | High relevance for strategy, roadmap, market analysis, prioritization, and launch planning. |
| project-manager | `project-manager.md` | Partial relevance for scope, risk, timeline, stakeholder alignment, and quality gates. |
| sales-engineer | `sales-engineer.md` | Partial relevance for value demonstration, objections, comparisons, and buyer enablement. |
| scrum-master | `scrum-master.md` | Partial relevance for story readiness, backlog refinement, and delivery quality. |
| technical-writer | `technical-writer.md` | High relevance for documentation architecture, user guides, API docs, and clarity standards. |
| ux-researcher | `ux-researcher.md` | High relevance for user research, personas, journeys, usability, and competitive UX analysis. |
| wordpress-master | `wordpress-master.md` | Excluded except contextual platform awareness; mostly implementation-specific. |

## Skills Selected

| Generated Skill | Source Inputs | Reason |
| --- | --- | --- |
| `core/product-documentation-generator.md` | README, product-manager, business-analyst, content-quality-editor | Provides orchestration and critical generation rules. |
| `core/quality-review.md` | content-quality-editor, technical-writer, business-analyst | Ensures final content is actionable, consistent, and non-filler. |
| `discovery/assumption-mapping.md` | assumption-mapping | Preserves VUBF and validation prioritization framework. |
| `discovery/market-validation.md` | product-manager, ux-researcher, business-analyst, legal-advisor | Supports build-or-not-build decisions and risk-aware validation. |
| `research/search-demand-analysis.md` | content-marketer, product-manager | Supports SEO demand and intent analysis. |
| `research/competitor-analysis.md` | product-manager, ux-researcher, content-marketer, sales-engineer | Supports competitor landscape, gap analysis, and feature comparison. |
| `product/product-strategy.md` | product-manager, business-analyst, growth-loops | Supports positioning, differentiation, roadmap, revenue model, and prioritization. |
| `product/product-brief.md` | product-manager, business-analyst | Supports concise stakeholder alignment. |
| `product/prd.md` | business-analyst, product-manager, backlog-grooming, scrum-master | Supports requirements, user stories, acceptance criteria, and permissions. |
| `ux/user-flow.md` | ux-researcher, business-analyst | Supports role-based flows and journey clarity. |
| `ux/wireframe-specification.md` | ux-researcher, business-analyst | Supports low-fidelity UI specification. |
| `qa/test-plan.md` | business-analyst, project-manager, backlog-grooming, scrum-master | Supports QA planning and testability. |
| `docs/documentation-outline.md` | technical-writer, customer-success-manager, business-analyst | Supports documentation planning and support reduction. |
| `seo/product-page-outline.md` | content-marketer, technical-writer, product-manager | Supports SEO and conversion-ready product pages. |
| `seo/seo-content-plan.md` | content-marketer, product-manager | Supports long-term SEO growth and demand capture. |
| `marketing/positioning-and-copy.md` | content-marketer, product-manager, sales-engineer | Supports naming, taglines, descriptions, and launch assets. |
| `marketing/growth-loops.md` | growth-loops, product-manager, business-analyst | Supports PLG, SEO loops, viral loops, and acquisition strategy. |

## Skills Excluded

| Source Skill | Reason |
| --- | --- |
| wordpress-master | Primarily implementation, architecture, performance, security, and DevOps for WordPress. Not required for generic product discovery/documentation generation. |
| license-engineer | Too specialized for the core package. Only broad licensing/distribution risk ideas were considered through market/legal risk framing. |
| project-manager | Not kept as a standalone skill because delivery management is not the generator's core output; useful quality and risk concepts were merged into QA and strategy. |
| scrum-master | Not kept as standalone; backlog/story readiness content was merged into PRD and test planning. |
| sales-engineer | Not kept as standalone; buyer objection and value-demonstration concepts were merged into competitor, product page, and marketing copy skills. |
| customer-success-manager | Not kept as standalone; onboarding, adoption, retention, and support ideas were merged into docs and strategy. |

## Skills Merged

| Merged Area | Sources |
| --- | --- |
| Product strategy and brief | product-manager, business-analyst, growth-loops |
| Requirements and PRD | business-analyst, product-manager, backlog-grooming, scrum-master |
| UX flows and wireframes | ux-researcher, business-analyst |
| QA planning | business-analyst, project-manager, scrum-master, backlog-grooming |
| Documentation planning | technical-writer, customer-success-manager, business-analyst |
| SEO and product page planning | content-marketer, technical-writer, product-manager |
| Marketing assets | content-marketer, product-manager, sales-engineer |
| Final quality review | content-quality-editor, technical-writer, business-analyst |

## Coverage Analysis

| Required Capability | Covered By | Status |
| --- | --- | --- |
| Market Validation | `discovery/market-validation.md`, `discovery/assumption-mapping.md` | Covered |
| Search Demand Analysis | `research/search-demand-analysis.md`, `seo/seo-content-plan.md` | Covered |
| Competitor Analysis | `research/competitor-analysis.md` | Covered |
| Product Brief | `product/product-brief.md` | Covered |
| Feature Comparison | `research/competitor-analysis.md`, `product/prd.md` | Covered |
| User Flow | `ux/user-flow.md` | Covered |
| PRD | `product/prd.md` | Covered |
| Wireframe | `ux/wireframe-specification.md` | Covered |
| Test Plan | `qa/test-plan.md` | Covered |
| Documentation Outline | `docs/documentation-outline.md` | Covered |
| Product Page Outline | `seo/product-page-outline.md` | Covered |
| Marketing Assets | `marketing/positioning-and-copy.md` | Covered |
| Build-or-Not-Build Report | `discovery/market-validation.md`, `product/product-strategy.md`, `core/quality-review.md` | Covered |
| Quality Requirements | `core/quality-review.md`, `qa/test-plan.md`, `product/prd.md` | Covered |

## Final Assessment

The final skill package is minimal, reusable, non-duplicated, easy to maintain, and focused on product documentation and discovery. It avoids retaining implementation-heavy, delivery-heavy, or role-specific skills unless their rules directly improve product planning, documentation, QA, SEO, marketing, or validation output.
