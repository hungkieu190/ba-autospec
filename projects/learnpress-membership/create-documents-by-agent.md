# [create-documents-by-agent]

Bạn là AI agent đang làm việc trực tiếp trong repo này.

## Nhiệm vụ

Hãy đọc input, câu trả lời trong questions.md, và toàn bộ skill package. Sau đó tạo bộ tài liệu cuối cùng bằng tiếng Việt tại:

`projects/learnpress-membership/output/`

## Files Bắt Buộc Phải Đọc

1. `projects/learnpress-membership/input.md`
2. `projects/learnpress-membership/questions.md`
3. `product-documentation-generator/skills/mandatory-skills.md`
4. `product-documentation-generator/skills/skill-map.md`
5. Toàn bộ skill liên quan trong `product-documentation-generator/skills/`
6. Spec gốc: `product-documentation-generator.md`

## Output Bắt Buộc

Tạo thư mục `projects/learnpress-membership/output/` nếu chưa có, rồi tạo đủ các file:

- `projects/learnpress-membership/output/00-market-validation.md`
- `projects/learnpress-membership/output/01-search-demand-analysis.md`
- `projects/learnpress-membership/output/02-competitor-landscape.md`
- `projects/learnpress-membership/output/03-competitor-gap-analysis.md`
- `projects/learnpress-membership/output/04-revenue-potential.md`
- `projects/learnpress-membership/output/05-product-complexity.md`
- `projects/learnpress-membership/output/06-risk-assessment.md`
- `projects/learnpress-membership/output/07-product-strategy.md`
- `projects/learnpress-membership/output/08-product-brief.md`
- `projects/learnpress-membership/output/09-competitor-analysis.md`
- `projects/learnpress-membership/output/10-feature-comparison.md`
- `projects/learnpress-membership/output/11-user-flow.md`
- `projects/learnpress-membership/output/12-prd.md`
- `projects/learnpress-membership/output/13-wireframe.md`
- `projects/learnpress-membership/output/14-test-plan.md`
- `projects/learnpress-membership/output/15-documentation-outline.md`
- `projects/learnpress-membership/output/16-product-page-outline.md`
- `projects/learnpress-membership/output/17-product-naming.md`
- `projects/learnpress-membership/output/18-taglines.md`
- `projects/learnpress-membership/output/19-product-descriptions.md`
- `projects/learnpress-membership/output/20-seo-content-plan.md`
- `projects/learnpress-membership/output/21-launch-assets.md`
- `projects/learnpress-membership/output/22-build-or-not-build.md`

Tạo thêm:

- `projects/learnpress-membership/output/index.md`
- `projects/learnpress-membership/output/quality-report.md`

## Ngôn Ngữ Đầu Ra

1. Viết tài liệu cuối cùng bằng tiếng Việt.
2. Giữ thuật ngữ chuyên ngành bằng tiếng Anh nếu tự nhiên và chính xác hơn, ví dụ: PRD, roadmap, user flow, wireframe, acceptance criteria, SEO, conversion, churn, LTV, CAC, MVP, API, webhook.
3. Tên file giữ nguyên tiếng Anh như danh sách output.

## Quy Tắc Chất Lượng

1. Đọc skill trước khi viết tài liệu.
2. Skill instructions ưu tiên hơn kiến thức chung.
3. Không viết filler content.
4. Không bịa competitor, search volume, pricing benchmark, customer evidence, hoặc số liệu thị trường.
5. Nếu thiếu dữ liệu, ghi rõ `Assumption` hoặc `Cần validate`.
6. Mọi tài liệu phải actionable cho Product, Design, Engineering, QA, Documentation, Marketing, SEO.
7. Tối ưu cho product viability, development efficiency, support cost, SEO potential, và revenue generation.
8. Dùng bảng, checklist, Mermaid, ASCII wireframe khi phù hợp.

## Workflow Bắt Buộc

1. Tổng hợp thông tin từ `input.md` và câu trả lời trong `questions.md`.
2. Chạy discovery trước: market validation, search demand, competitor landscape, gap analysis, revenue, complexity, risk.
3. Chỉ sau đó mới tạo product docs: product brief, competitor analysis, feature comparison, user flow, PRD, wireframe, test plan, docs outline, product page outline.
4. Cuối cùng tạo marketing assets: naming, taglines, descriptions, SEO content plan, launch assets, build-or-not-build report.
5. Chạy quality review và tạo `quality-report.md`.

## Mandatory Skills Reference

# Mandatory Skills

Load these skills before generating any full product documentation package:

1. `core/product-documentation-generator.md`
2. `discovery/assumption-mapping.md`
3. `discovery/market-validation.md`
4. `research/search-demand-analysis.md`
5. `research/competitor-analysis.md`
6. `product/product-strategy.md`
7. `product/product-brief.md`
8. `product/prd.md`
9. `qa/test-plan.md`
10. `docs/documentation-outline.md`
11. `seo/product-page-outline.md`
12. `seo/seo-content-plan.md`
13. `marketing/positioning-and-copy.md`
14. `core/quality-review.md`

## Optional But Recommended

- `ux/user-flow.md` when the product has multi-step workflows or multiple roles.
- `ux/wireframe-specification.md` when UI screens are required.
- `marketing/growth-loops.md` when launch strategy, PLG, SEO loop, referral loop, or expansion mechanics matter.


## Skill Map Reference

# Skill Map

This file maps every generated document to the minimum skills required to produce it.

| Generated Document | Required Skills |
| --- | --- |
| `00-market-validation.md` | `core/product-documentation-generator.md`, `discovery/assumption-mapping.md`, `discovery/market-validation.md`, `research/competitor-analysis.md` |
| `01-search-demand-analysis.md` | `research/search-demand-analysis.md`, `seo/seo-content-plan.md` |
| `02-competitor-landscape.md` | `research/competitor-analysis.md`, `discovery/market-validation.md` |
| `03-competitor-gap-analysis.md` | `research/competitor-analysis.md`, `product/product-strategy.md` |
| `04-revenue-potential.md` | `product/product-strategy.md`, `marketing/growth-loops.md`, `discovery/market-validation.md` |
| `05-product-complexity.md` | `discovery/market-validation.md`, `product/prd.md`, `qa/test-plan.md` |
| `06-risk-assessment.md` | `discovery/assumption-mapping.md`, `discovery/market-validation.md`, `product/prd.md`, `qa/test-plan.md` |
| `07-product-strategy.md` | `product/product-strategy.md`, `research/competitor-analysis.md`, `research/search-demand-analysis.md`, `marketing/growth-loops.md` |
| `08-product-brief.md` | `product/product-brief.md`, `product/product-strategy.md` |
| `09-competitor-analysis.md` | `research/competitor-analysis.md` |
| `10-feature-comparison.md` | `research/competitor-analysis.md`, `product/prd.md` |
| `11-user-flow.md` | `ux/user-flow.md`, `product/product-brief.md`, `product/prd.md` |
| `12-prd.md` | `product/prd.md`, `product/product-brief.md`, `product/product-strategy.md`, `ux/user-flow.md` |
| `13-wireframe.md` | `ux/wireframe-specification.md`, `ux/user-flow.md`, `product/product-brief.md` |
| `14-test-plan.md` | `qa/test-plan.md`, `product/prd.md`, `ux/user-flow.md`, `ux/wireframe-specification.md` |
| `15-documentation-outline.md` | `docs/documentation-outline.md`, `product/prd.md`, `qa/test-plan.md` |
| `16-product-page-outline.md` | `seo/product-page-outline.md`, `research/search-demand-analysis.md`, `research/competitor-analysis.md`, `marketing/positioning-and-copy.md` |
| `17-product-naming.md` | `marketing/positioning-and-copy.md`, `product/product-strategy.md` |
| `18-taglines.md` | `marketing/positioning-and-copy.md`, `product/product-strategy.md` |
| `19-product-descriptions.md` | `marketing/positioning-and-copy.md`, `product/product-brief.md`, `seo/product-page-outline.md` |
| `20-seo-content-plan.md` | `seo/seo-content-plan.md`, `research/search-demand-analysis.md`, `research/competitor-analysis.md` |
| `21-launch-assets.md` | `marketing/positioning-and-copy.md`, `docs/documentation-outline.md`, `product/product-strategy.md` |
| `22-build-or-not-build.md` | `discovery/market-validation.md`, `discovery/assumption-mapping.md`, `product/product-strategy.md`, `core/quality-review.md` |

## Cross-Cutting Skill

Apply `core/quality-review.md` to all documents before final delivery.

