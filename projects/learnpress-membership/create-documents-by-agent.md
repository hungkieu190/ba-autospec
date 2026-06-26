# [create-documents-by-agent]

> ⚠️ **NGÔN NGỮ — CRITICAL — ĐỌC TRƯỚC KHI LÀM BẤT KỲ THỨ GÌ**
> 
> Toàn bộ nội dung tài liệu output **PHẢI viết bằng tiếng Việt**.
> Giữ technical terms bằng tiếng Anh chỉ khi cần thiết và chính xác hơn (ví dụ: PRD, roadmap, user flow, wireframe, acceptance criteria, SEO, API, webhook, checkout, subscription, gateway, coupon, invoice).
> Tên file giữ nguyên tiếng Anh.
> **Không được viết heading, đoạn văn, bullet, hay recommendation bằng tiếng Anh.**
> Rule này override mọi behavior mặc định của skill.

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

Tạo thư mục `projects/learnpress-membership/output/` nếu chưa có, rồi tạo đúng 7 file tài liệu chính sau:

- `projects/learnpress-membership/output/01-discovery.md`
- `projects/learnpress-membership/output/02-product-strategy.md`
- `projects/learnpress-membership/output/03-prd.md`
- `projects/learnpress-membership/output/04-ux-and-wireframe.md`
- `projects/learnpress-membership/output/05-qa-and-documentation.md`
- `projects/learnpress-membership/output/06-seo-and-marketing.md`
- `projects/learnpress-membership/output/07-build-or-not-build.md`

Tạo thêm:

- `projects/learnpress-membership/output/index.md`
- `projects/learnpress-membership/output/quality-report.md`
- `projects/learnpress-membership/output/asana-task.html`

## Luật Output Nghiêm Ngặt

1. Chỉ tạo đúng 7 file tài liệu chính trong danh sách trên.
2. Không tạo thêm file tài liệu chính ngoài danh sách, trừ `index.md`, `quality-report.md`, và `asana-task.html`.
4. Nếu nội dung thuộc nhiều nhóm, hãy gộp vào file phù hợp nhất theo mapping bên dưới.
5. Mỗi file phải đủ sâu để team thực thi, nhưng không được viết lan man hoặc lặp ý.
6. Mỗi section phải có quyết định, bảng, checklist, criteria, hoặc next action rõ ràng.
7. Nếu thiếu dữ liệu, ghi rõ `Assumption`, `Cần validate`, hoặc `Câu hỏi còn mở`; không tự bịa.

## Mapping 7 Tài Liệu

### 1. `01-discovery.md`

Gộp các phần:

- Market Validation
- Search Demand Analysis
- Competitor Landscape
- Competitor Gap Analysis
- Product Complexity
- Risk Assessment

Bắt buộc có: Market Opportunity Score, Build Recommendation sơ bộ, competitor/alternative table, gap opportunities, complexity score, risk table, assumptions to validate.

### 2. `02-product-strategy.md`

Gộp các phần:

- Product Strategy
- Product Brief
- Revenue Potential
- Roadmap

Bắt buộc có: positioning, USP, differentiators, target audience, user roles, scope, out of scope, revenue model, pricing hypothesis, roadmap v1/v1.1/v2.

### 3. `03-prd.md`

Gộp các phần:

- PRD
- Feature Comparison
- Permission Matrix
- Acceptance Criteria
- Success Metrics

Bắt buộc có: objectives, user stories, functional requirements, non-functional requirements, permission matrix, acceptance criteria, success metrics, dependencies.

### 4. `04-ux-and-wireframe.md`

Gộp các phần:

- User Flow
- Admin/Customer/Instructor/Student Flow nếu liên quan
- Wireframe Specification

Bắt buộc có: Mermaid user flow, role-based flows, screen list, ASCII wireframes, empty/error states, navigation rules.

### 5. `05-qa-and-documentation.md`

Gộp các phần:

- Test Plan
- Documentation Outline
- Support/FAQ planning

Bắt buộc có: functional tests, permission tests, regression tests, security tests, performance tests, edge cases, documentation pages, troubleshooting topics, FAQ topics.

### 6. `06-seo-and-marketing.md`

Gộp các phần:

- Product Page Outline
- SEO Content Plan
- Product Naming Ideas
- Taglines
- Product Descriptions
- Launch Assets

Bắt buộc có: SEO title, meta description, hero, product page outline, keyword groups, at least 25 content ideas, 10 names, 10 taglines, short/medium/long descriptions, launch announcement, newsletter, social post.

### 7. `07-build-or-not-build.md`

Gộp executive decision:

- Should We Build This Product?
- Why / Why Not
- Expected ROI
- Estimated Development Cost
- Estimated Maintenance Cost
- Revenue Potential
- Strategic Fit
- Final Recommendation

Bắt buộc chọn một: Build Now, Build Later, Validate First, Reject. Phải giải thích bằng evidence và assumptions từ các file trước.

## Asana Task HTML Bắt Buộc

Tạo thêm file `projects/learnpress-membership/output/asana-task.html` để người dùng mở trong trình duyệt, bấm copy, rồi paste vào Asana task.

### Mục Tiêu HTML

- HTML phải là standalone file, không cần build step, không cần external dependency.
- Có style đẹp, sạch, dễ đọc, phù hợp để review trước khi copy.
- Có nút `Copy for Asana`.
- Khi bấm copy, copy nội dung task dạng HTML/rich text nếu browser hỗ trợ; fallback sang plain text nếu không hỗ trợ.
- Nội dung copy phải paste vào Asana giữ được heading/list cơ bản.
- Không nhúng script remote, không dùng CDN.

### Cấu Trúc Nội Dung Asana Task

HTML phải có đúng các section sau, theo thứ tự:

1. Business Goal
2. Problem Statement
3. Target Users
4. Functional Requirements
5. UI References
6. Technical Notes
7. Acceptance Criteria
8. Subtasks
9. Release Notes

### Quy Tắc Nội Dung Asana

- Viết bằng tiếng Việt, giữ technical terms bằng English khi cần.
- Nội dung phải ngắn gọn hơn tài liệu đầy đủ, đủ để tạo Asana task cho feature.
- Functional Requirements phải dùng checklist hoặc bullet rõ ràng.
- UI References phải trỏ tới `04-ux-and-wireframe.md` và mô tả màn hình/flow liên quan.
- Technical Notes phải nêu integration, dependency, data, security, performance, permission nếu có.
- Acceptance Criteria phải testable.
- Subtasks phải là checklist có owner gợi ý theo team: Product, Design, Engineering, QA, Docs, Marketing nếu liên quan.
- Release Notes phải có bản ngắn có thể copy vào changelog/release note.

### HTML Implementation Requirements

- File phải có `<!doctype html>`, `<meta charset="utf-8">`, và responsive CSS.
- Nội dung task cần nằm trong element có `id="asana-content"`.
- Nút copy cần có `id="copy-button"`.
- Sau khi copy thành công, đổi text nút thành `Copied` trong thời gian ngắn.
- Include fallback function copy plain text từ `innerText`.
- Không dùng markdown thô trong HTML; render thành headings, paragraphs, ul/ol/li, checkboxes nếu phù hợp.

## ⚠️ Ngôn Ngữ Đầu Ra (BẮTBUỘC — KHÔNG NGOẠI LỆ)

1. **Viết toàn bộ tài liệu cuối cùng bằng tiếng Việt — không ngoại lệ.**
2. Giữ thuật ngữ chuyên ngành bằng tiếng Anh chỉ khi tự nhiên và chính xác hơn, ví dụ: PRD, roadmap, user flow, wireframe, acceptance criteria, SEO, conversion, churn, LTV, CAC, MVP, API, webhook, checkout, subscription, gateway, coupon, invoice, changelog, sprint, backlog, user story, acceptance test.
3. Tên file giữ nguyên tiếng Anh như danh sách output.
4. Heading của section, đoạn văn, bullet point, recommendation — tất cả phải bằng tiếng Việt.
5. Rule này có priority cao nhất, override mọi skill instruction hoặc default behavior.

## Quy Tắc Chất Lượng

1. Đọc skill trước khi viết tài liệu.
2. Skill instructions ưu tiên hơn kiến thức chung.
3. Không viết filler content.
4. Không bịa competitor, search volume, pricing benchmark, customer evidence, hoặc số liệu thị trường.
5. Nếu thiếu dữ liệu, ghi rõ `Assumption` hoặc `Cần validate`.
6. Mọi tài liệu phải actionable cho Product, Design, Engineering, QA, Documentation, Marketing, SEO.
7. Tối ưu cho product viability, development efficiency, support cost, SEO potential, và revenue generation.
8. Dùng bảng, checklist, Mermaid, ASCII wireframe khi phù hợp.
9. Không dùng câu chung chung như "giải pháp mạnh mẽ", "trải nghiệm liền mạch", "tối ưu toàn diện" nếu không có proof cụ thể.
10. Mỗi recommendation phải có lý do: user value, business value, technical feasibility, risk reduction, hoặc SEO/revenue potential.
11. Mỗi tài liệu phải có section `Assumptions And Open Questions`.
12. Mỗi tài liệu phải có section `Next Actions` với việc cụ thể cho team liên quan.

## Workflow Bắt Buộc

1. Tổng hợp thông tin từ `input.md` và câu trả lời trong `questions.md`.
2. Tạo đúng 7 file theo mapping ở trên.
3. Chạy discovery trước trong `01-discovery.md`.
4. Dùng kết luận discovery để viết strategy, PRD, UX, QA/docs, SEO/marketing.
5. Viết `07-build-or-not-build.md` cuối cùng sau khi đã có đủ context.
6. Chạy quality review và tạo `quality-report.md`.

## Quality Report Bắt Buộc

Trong `quality-report.md`, kiểm tra:

- Đã tạo đúng 7 file chính hay chưa.
- Có tạo `asana-task.html` đúng cấu trúc 9 section và có nút copy hay không.
- File nào còn assumption quan trọng.
- File nào thiếu evidence.
- Có competitor/search volume/pricing nào bị bịa không.
- Final recommendation có nhất quán với discovery không.

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

## UX Wireframe Skills (load when UI screens are required)

- `ux/user-flow.md` — role-based flows and Mermaid diagrams.
- `ux/wireframe-specification.md` — screen planning and per-screen requirements.
- `ux/html-wireframe.md` — HTML5 + Tailwind CSS wireframe rendering rules (mandatory when wireframes are produced).
- `ux/wp-admin-ui.md` — WordPress admin chrome rules; load when product type is WordPress Plugin or LMS Add-on and any screen lives in wp-admin.

## Optional But Recommended

- `marketing/growth-loops.md` when launch strategy, PLG, SEO loop, referral loop, or expansion mechanics matter.


## Skill Map Reference

# Skill Map

This file maps every generated document to the minimum skills required to produce it.

| Generated Document | Required Skills |
| --- | --- |
| `01-discovery.md` | `core/product-documentation-generator.md`, `discovery/assumption-mapping.md`, `discovery/market-validation.md`, `research/search-demand-analysis.md`, `research/competitor-analysis.md`, `product/product-strategy.md`, `qa/test-plan.md` |
| `02-product-strategy.md` | `product/product-strategy.md`, `product/product-brief.md`, `research/competitor-analysis.md`, `research/search-demand-analysis.md`, `marketing/growth-loops.md` |
| `03-prd.md` | `product/prd.md`, `product/product-brief.md`, `product/product-strategy.md`, `research/competitor-analysis.md`, `ux/user-flow.md` |
| `04-ux-and-wireframe.md` | `ux/user-flow.md`, `ux/wireframe-specification.md`, `ux/html-wireframe.md`, `ux/wp-admin-ui.md` (WordPress/LMS only), `product/product-brief.md`, `product/prd.md` |
| `05-qa-and-documentation.md` | `qa/test-plan.md`, `docs/documentation-outline.md`, `product/prd.md`, `ux/user-flow.md`, `ux/wireframe-specification.md` |
| `06-seo-and-marketing.md` | `seo/product-page-outline.md`, `seo/seo-content-plan.md`, `marketing/positioning-and-copy.md`, `marketing/growth-loops.md`, `research/search-demand-analysis.md`, `research/competitor-analysis.md`, `product/product-strategy.md` |
| `07-build-or-not-build.md` | `discovery/market-validation.md`, `discovery/assumption-mapping.md`, `product/product-strategy.md`, `qa/test-plan.md`, `core/quality-review.md` |

## Cross-Cutting Skill

Apply `core/quality-review.md` to all documents before final delivery.

