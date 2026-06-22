# [create-question-by-agent]

Bạn là AI agent đang làm việc trực tiếp trong repo này.

## Nhiệm vụ

Hãy đọc input của project và toàn bộ skill package, sau đó tạo file câu hỏi bổ sung bằng tiếng Việt tại:

`projects/learnpress-membership/questions.md`

File `questions.md` phải giúp người dùng trả lời thêm những thông tin còn thiếu để sau đó có thể tạo bộ Product Discovery, Product Documentation, và Marketing Package hoàn chỉnh.

## Files Bắt Buộc Phải Đọc

1. `projects/learnpress-membership/input.md`
2. `product-documentation-generator/skills/mandatory-skills.md`
3. `product-documentation-generator/skills/skill-map.md`
4. Toàn bộ skill liên quan trong `product-documentation-generator/skills/`

## Tóm Tắt Input Hiện Tại

| Mục | Nội dung |
| --- | --- |
| Project Name | learnpress-membership |
| Product Idea | Nâng cấp `learnpress-membership` thành add-on membership đầy đủ cho LearnPress, tập trung vào 2 năng lực chính:<br><br>1. Restrict Content: cho phép admin giới hạn quyền xem nội dung WordPress/LearnPress dựa trên membership plan, tham chiếu cách thiết kế restriction của `woocommerce-memberships` nhưng triển khai native trong `learnpress-membership`.<br>2. WooCommerce Membership Checkout: cho phép khách hàng mua membership plan thông qua WooCommerce bằng cơ chế tích hợp với `learnpress-woo-payment`, để tận dụng Woo cart, Woo checkout, Woo gateways, coupon, tax, invoice và Woo Subscriptions khi cần.<br><br>Hiện trạng code:<br><br>- `learnpress-membership` đã có plan/member model, bảng riêng, course-plan mapping, checkout item type ẩn `lp_membership`, lifecycle activation theo LP order, cron expire/reminder, profile tab, pricing block/shortcode.<br>- Restrict content hiện chưa có module rule/filter chuyên biệt; mới có course purchase mode và kiểm tra `PlanHelper::user_has_access_to_course()`.<br>- `woocommerce-memberships` dùng mô hình rules, restriction mode, content/query filtering, capability checks, message rendering và block member/non-member content.<br>- `learnpress-woo-payment` đã có đường tạo LP order từ Woo order qua `_learn_press_order_id`, hook `woocommerce_order_status_changed`, custom WC product/course item và filter cho item type ngoài `lp_course`. |
| Product Type | WordPress Plugin, LMS Add-on, eCommerce Extension. |
| Target Users | Primary users:<br><br>- Website admin bán khóa học theo gói membership.<br>- LMS owner muốn khóa nội dung theo plan thay vì chỉ bán từng khóa học.<br>- Education business muốn dùng WooCommerce checkout/payment cho membership.<br><br>Secondary users:<br><br>- Instructor cần bảo vệ bài học, course, page, post hoặc tài nguyên học tập.<br>- Student/customer mua membership để truy cập khóa học và nội dung premium.<br>- Developer/customizer cần hook/filter để mở rộng rule, message và gateway behavior. |
| User Roles | Admin, Instructor, Student, Customer, Guest, Manager, Developer. |
| Core Problem | `learnpress-membership` hiện mới quản lý plan, member và quyền truy cập course theo plan. Sản phẩm còn thiếu 2 mảnh quan trọng để cạnh tranh với các membership plugin lớn:<br><br>- Admin chưa có hệ thống restrict content linh hoạt cho post/page/course/lesson/topic/taxonomy/block/shortcode giống trải nghiệm của WooCommerce Memberships.<br>- Luồng mua membership đang phụ thuộc LP checkout/gateway, trong khi nhiều site WordPress đã vận hành bán hàng bằng WooCommerce và cần dùng Woo gateways, coupons, taxes, subscriptions, order management, invoice và reporting. |
| Proposed Solution | Xây dựng 2 module nâng cấp trong `learnpress-membership`:<br><br>1. Membership Restriction Engine<br><br>Áp dụng pattern từ `woocommerce-memberships`:<br><br>- Tạo rule model riêng cho restriction, tương tự `wc_memberships_rules` nhưng lưu native theo schema của `learnpress-membership`.<br>- Hỗ trợ rule type `content_restriction` trước, mở rộng sau cho product/purchase discount nếu cần.<br>- Hỗ trợ content target theo `post_type`, object cụ thể, taxonomy term và LearnPress object.<br>- Hỗ trợ restriction mode: hide completely, hide content only, redirect to page.<br>- Hook vào frontend query/content/render: `wp`, `pre_get_posts`, `the_content`, `the_posts`, REST response, comments/feed nếu cần.<br>- Thêm block/shortcode member-only và non-member content.<br>- Dùng `PlanHelper::get_user_active_plans()` làm nguồn truth cho quyền truy cập.<br><br>2. WooCommerce Membership Purchase Integration<br><br>Tận dụng kiến trúc hiện có của `learnpress-woo-payment`:<br><br>- Cho phép membership plan được add vào Woo cart như một purchasable item/product.<br>- Khi Woo order paid/completed/processing, tạo hoặc cập nhật LP order bằng path của `LPWooOrderHandler`.<br>- Đảm bảo LP order item giữ `_plan_id` để `MembershipCheckout::on_order_completed()` kích hoạt member.<br>- Đồng bộ trạng thái Woo order sang LP order/member: completed/processing kích hoạt, cancelled/failed/refunded thu hồi hoặc hủy access theo logic hiện tại.<br>- Nếu Woo Subscriptions có sẵn, mapping subscription status sang membership lifecycle tương tự `LPWooSubscription`. |
| Must-Have Features | - Restrict content rules cho post/page/course/lesson/quiz và custom post type được chọn.<br>- Restrict theo membership plan: một rule có thể yêu cầu một hoặc nhiều plan active.<br>- Restriction mode: hide content only, hide completely khỏi listing/query, redirect to selected page.<br>- Restricted message settings: default message, custom message, login link, pricing/membership plan CTA.<br>- Admin UI để tạo/sửa rule trong Membership admin, ưu tiên cùng khu vực edit plan để chọn nội dung được bảo vệ.<br>- Public helper API: kiểm tra object có bị restrict không, user có access không, lấy plan required cho object.<br>- Gutenberg block hoặc shortcode cho member-only/non-member content.<br>- WooCommerce checkout cho membership plan qua `learnpress-woo-payment`.<br>- Woo product/item class cho membership hoặc cơ chế shadow product tương đương `WC_Product_LP_Course`.<br>- Mapping Woo order sang LP order có item type `lp_membership` và meta `_plan_id`.<br>- Kích hoạt membership khi Woo order chuyển `processing` hoặc `completed`.<br>- Hủy/thu hồi membership khi Woo order `cancelled`, `failed`, `refunded` theo lifecycle hiện có.<br>- Tương thích guest checkout ở mức yêu cầu tạo/login user trước khi activate membership.<br>- Không phá vỡ luồng LP checkout hiện có. |
| Competitors Or Alternatives | - WooCommerce Memberships.<br>- Paid Memberships Pro.<br>- MemberPress.<br>- Restrict Content Pro.<br>- WooCommerce Subscriptions kết hợp sản phẩm subscription thủ công.<br>- LearnPress Woo Payment bán từng course qua WooCommerce.<br>- Manual workflow: admin tự enroll user vào course sau khi mua Woo product. |
| Pricing Or Revenue Model | Paid add-on / marketplace extension. Có thể bán one-time license hoặc subscription license theo năm, bundle cùng LearnPress Pro Bundle và WooCommerce payment add-ons. |
| SEO Keywords | learnpress membership, learnpress restrict content, learnpress woocommerce membership, sell membership with learnpress, woocommerce lms membership, learnpress subscriptions, wordpress lms membership plugin, restrict course content wordpress. |
| Risks Or Constraints | - Code hiện tại đang dùng `lp_membership` là hidden post type/shadow post để tương thích LP cart/order; khi đưa qua Woo cần quyết định giữ shadow post hay tạo WC product class riêng.<br>- `learnpress-woo-payment` có 2 mode: buy course directly as LP course product và buy courses via assigned Woo product. Membership cần thiết kế tương thích cả 2 hoặc chọn một mode chính ở phase đầu.<br>- Woo order to LP order hiện tính item total theo `item_type`; membership cần filter riêng cho `lp_membership` để không mất giá/subtotal.<br>- `MembershipCheckout::activate_membership()` hiện tính end date theo plan billing amount/unit; cần kiểm tra lifetime plan để tránh set end_date sai nếu billing_type lifetime.<br>- Guest checkout không phù hợp membership nếu không có user account; cần force login/register hoặc auto-create user an toàn.<br>- Woo Subscriptions lifecycle phức tạp: renewal, resubscribe, switch, cancel, pending-cancel, failed payment, suspension.<br>- Restrict content nếu hook vào query quá mạnh có thể làm ẩn nhầm content trong admin, REST, search, related courses hoặc page builder preview.<br>- Cần cache/memoization để restriction rule không gây chậm query trên site có nhiều post/course.<br>- Không được copy code từ WooCommerce Memberships; chỉ tham chiếu architecture/pattern.<br>- Cần migration DB version mới cho restriction rule tables/options. |

## Các Mục Tool Phát Hiện Còn Yếu

- Không phát hiện mục trống theo kiểm tra cơ bản. Vẫn phải dùng skill để đánh giá độ đủ sâu của input.

## Quy Tắc Tạo questions.md

1. Viết hoàn toàn bằng tiếng Việt.
2. Giữ thuật ngữ chuyên ngành bằng tiếng Anh nếu tự nhiên và chính xác hơn, ví dụ: PRD, roadmap, user flow, wireframe, acceptance criteria, SEO, conversion, churn, LTV, CAC, MVP, API, webhook.
3. Không tạo tài liệu cuối cùng ở bước này.
4. Chỉ tạo `questions.md` để hỏi thêm người dùng.
5. Câu hỏi phải cụ thể, có thể trả lời được, và phục vụ trực tiếp cho các tài liệu đầu ra.
6. Ưu tiên hỏi về: market validation, target users, user roles, core workflow, feature scope, competitors, pricing, integrations, risks, SEO, QA, documentation, and launch assets.
7. Nếu input đã đủ ở một mục, vẫn có thể hỏi câu nâng cao để làm rõ trade-off hoặc assumption.

## Cấu Trúc questions.md Bắt Buộc

Tạo file theo cấu trúc này:

```markdown
# Câu Hỏi Bổ Sung Cho learnpress-membership

## Hướng Dẫn Trả Lời

Giải thích ngắn gọn cho người dùng: hãy trả lời trực tiếp dưới từng câu hỏi, có thể bỏ qua câu không liên quan, ghi "Không biết" nếu chưa có dữ liệu.

## Tóm Tắt Những Gì Đã Biết

Tóm tắt input hiện tại bằng tiếng Việt.

## Các Assumption Đang Có
Liệt kê assumption AI phát hiện từ input.

## Câu Hỏi Cần Trả Lời

Chia theo nhóm: Product Context, Market Validation, Users & Roles, Scope & Features, Competitors, Revenue & Pricing, UX/User Flow, Technical/Integrations, SEO/GTM, QA/Acceptance Criteria, Documentation.

## Câu Hỏi Ưu Tiên Cao
Chọn 5-10 câu quan trọng nhất cần trả lời trước.

## Bước Tiếp Theo
Hướng dẫn người dùng sau khi trả lời xong chạy: npm run create -- learnpress-membership
```

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

