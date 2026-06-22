# Product Documentation Generator Input

## Project Name
learnpress-membership

## Product Idea
Nâng cấp `learnpress-membership` thành add-on membership đầy đủ cho LearnPress, tập trung vào 2 năng lực chính:

1. Restrict Content: cho phép admin giới hạn quyền xem nội dung WordPress/LearnPress dựa trên membership plan, tham chiếu cách thiết kế restriction của `woocommerce-memberships` nhưng triển khai native trong `learnpress-membership`.
2. WooCommerce Membership Checkout: cho phép khách hàng mua membership plan thông qua WooCommerce bằng cơ chế tích hợp với `learnpress-woo-payment`, để tận dụng Woo cart, Woo checkout, Woo gateways, coupon, tax, invoice và Woo Subscriptions khi cần.

Hiện trạng code:

- `learnpress-membership` đã có plan/member model, bảng riêng, course-plan mapping, checkout item type ẩn `lp_membership`, lifecycle activation theo LP order, cron expire/reminder, profile tab, pricing block/shortcode.
- Restrict content hiện chưa có module rule/filter chuyên biệt; mới có course purchase mode và kiểm tra `PlanHelper::user_has_access_to_course()`.
- `woocommerce-memberships` dùng mô hình rules, restriction mode, content/query filtering, capability checks, message rendering và block member/non-member content.
- `learnpress-woo-payment` đã có đường tạo LP order từ Woo order qua `_learn_press_order_id`, hook `woocommerce_order_status_changed`, custom WC product/course item và filter cho item type ngoài `lp_course`.

## Product Type
WordPress Plugin, LMS Add-on, eCommerce Extension.

## Target Users
Primary users:

- Website admin bán khóa học theo gói membership.
- LMS owner muốn khóa nội dung theo plan thay vì chỉ bán từng khóa học.
- Education business muốn dùng WooCommerce checkout/payment cho membership.

Secondary users:

- Instructor cần bảo vệ bài học, course, page, post hoặc tài nguyên học tập.
- Student/customer mua membership để truy cập khóa học và nội dung premium.
- Developer/customizer cần hook/filter để mở rộng rule, message và gateway behavior.

## User Roles
Admin, Instructor, Student, Customer, Guest, Manager, Developer.

## Core Problem
`learnpress-membership` hiện mới quản lý plan, member và quyền truy cập course theo plan. Sản phẩm còn thiếu 2 mảnh quan trọng để cạnh tranh với các membership plugin lớn:

- Admin chưa có hệ thống restrict content linh hoạt cho post/page/course/lesson/topic/taxonomy/block/shortcode giống trải nghiệm của WooCommerce Memberships.
- Luồng mua membership đang phụ thuộc LP checkout/gateway, trong khi nhiều site WordPress đã vận hành bán hàng bằng WooCommerce và cần dùng Woo gateways, coupons, taxes, subscriptions, order management, invoice và reporting.

## Proposed Solution
Xây dựng 2 module nâng cấp trong `learnpress-membership`:

1. Membership Restriction Engine

Áp dụng pattern từ `woocommerce-memberships`:

- Tạo rule model riêng cho restriction, tương tự `wc_memberships_rules` nhưng lưu native theo schema của `learnpress-membership`.
- Hỗ trợ rule type `content_restriction` trước, mở rộng sau cho product/purchase discount nếu cần.
- Hỗ trợ content target theo `post_type`, object cụ thể, taxonomy term và LearnPress object.
- Hỗ trợ restriction mode: hide completely, hide content only, redirect to page.
- Hook vào frontend query/content/render: `wp`, `pre_get_posts`, `the_content`, `the_posts`, REST response, comments/feed nếu cần.
- Thêm block/shortcode member-only và non-member content.
- Dùng `PlanHelper::get_user_active_plans()` làm nguồn truth cho quyền truy cập.

2. WooCommerce Membership Purchase Integration

Tận dụng kiến trúc hiện có của `learnpress-woo-payment`:

- Cho phép membership plan được add vào Woo cart như một purchasable item/product.
- Khi Woo order paid/completed/processing, tạo hoặc cập nhật LP order bằng path của `LPWooOrderHandler`.
- Đảm bảo LP order item giữ `_plan_id` để `MembershipCheckout::on_order_completed()` kích hoạt member.
- Đồng bộ trạng thái Woo order sang LP order/member: completed/processing kích hoạt, cancelled/failed/refunded thu hồi hoặc hủy access theo logic hiện tại.
- Nếu Woo Subscriptions có sẵn, mapping subscription status sang membership lifecycle tương tự `LPWooSubscription`.

## Must-Have Features
- Restrict content rules cho post/page/course/lesson/quiz và custom post type được chọn.
- Restrict theo membership plan: một rule có thể yêu cầu một hoặc nhiều plan active.
- Restriction mode: hide content only, hide completely khỏi listing/query, redirect to selected page.
- Restricted message settings: default message, custom message, login link, pricing/membership plan CTA.
- Admin UI để tạo/sửa rule trong Membership admin, ưu tiên cùng khu vực edit plan để chọn nội dung được bảo vệ.
- Public helper API: kiểm tra object có bị restrict không, user có access không, lấy plan required cho object.
- Gutenberg block hoặc shortcode cho member-only/non-member content.
- WooCommerce checkout cho membership plan qua `learnpress-woo-payment`.
- Woo product/item class cho membership hoặc cơ chế shadow product tương đương `WC_Product_LP_Course`.
- Mapping Woo order sang LP order có item type `lp_membership` và meta `_plan_id`.
- Kích hoạt membership khi Woo order chuyển `processing` hoặc `completed`.
- Hủy/thu hồi membership khi Woo order `cancelled`, `failed`, `refunded` theo lifecycle hiện có.
- Tương thích guest checkout ở mức yêu cầu tạo/login user trước khi activate membership.
- Không phá vỡ luồng LP checkout hiện có.

## Nice-To-Have Features
- Drip/delayed access theo thời gian member tham gia plan, tương tự delayed access trong WooCommerce Memberships.
- Rule inheritance cho hierarchical post type: page cha/course/module cha áp rule xuống con.
- REST API trả trạng thái restricted/access cho frontend/headless.
- Elementor condition hoặc widget visibility theo membership plan.
- Import/export restriction rules.
- Woo coupon/product bundle hỗ trợ membership plan.
- Woo Subscriptions renewal/cancel/suspend mapping đầy đủ sang member status và email lifecycle.
- Admin simulator/debug screen cho restriction access giống dev tools lifecycle hiện có.

## Out Of Scope
- Clone toàn bộ WooCommerce Memberships hoặc phụ thuộc bắt buộc vào plugin `woocommerce-memberships`.
- Member discounts, product purchasing discounts, shipping restriction.
- Multi-vendor marketplace membership logic.
- CRM/email marketing automation ngoài email lifecycle hiện có.
- Migration tự động từ WooCommerce Memberships rules trong phase đầu.
- Mobile app/headless LMS frontend riêng.

## Competitors Or Alternatives
- WooCommerce Memberships.
- Paid Memberships Pro.
- MemberPress.
- Restrict Content Pro.
- WooCommerce Subscriptions kết hợp sản phẩm subscription thủ công.
- LearnPress Woo Payment bán từng course qua WooCommerce.
- Manual workflow: admin tự enroll user vào course sau khi mua Woo product.

## Integrations
- LearnPress core.
- WooCommerce.
- learnpress-woo-payment.
- WooCommerce Subscriptions, optional.
- WordPress Gutenberg blocks.
- Elementor, optional.
- LearnPress email system.
- LearnPress REST/admin search course APIs.
- WooCommerce payment gateways, coupons, taxes, cart, checkout, orders.

## Pricing Or Revenue Model
Paid add-on / marketplace extension. Có thể bán one-time license hoặc subscription license theo năm, bundle cùng LearnPress Pro Bundle và WooCommerce payment add-ons.

## SEO Keywords
learnpress membership, learnpress restrict content, learnpress woocommerce membership, sell membership with learnpress, woocommerce lms membership, learnpress subscriptions, wordpress lms membership plugin, restrict course content wordpress.

## Business Goals
- Tăng giá trị thương mại của `learnpress-membership` bằng cách biến add-on từ course-plan access thành membership platform thực sự.
- Giảm nhu cầu khách hàng phải mua/thêm plugin membership ngoài hệ sinh thái LearnPress.
- Tận dụng WooCommerce để mở rộng payment gateway coverage và giảm chi phí duy trì gateway riêng.
- Tăng conversion cho site LMS nhờ pricing page, Woo checkout, coupon, tax và subscription workflows.
- Tăng khả năng bundle/cross-sell với `learnpress-woo-payment`.

## Success Metrics
- Số site active sử dụng `learnpress-membership` sau release.
- Tỷ lệ plan được mua qua WooCommerce checkout.
- Tỷ lệ ticket support liên quan đến payment gateway giảm so với LP-only checkout.
- Số rule restrict content được tạo trung bình trên mỗi site active.
- Conversion từ pricing page hoặc course page sang membership checkout.
- Refund/churn rate của membership plan.
- Số lỗi access mismatch: user đã mua nhưng không truy cập được, hoặc chưa mua nhưng vẫn truy cập được.
- Backward compatibility: không regression với LP checkout, plan-course mapping, member lifecycle hiện tại.

## Risks Or Constraints
- Code hiện tại đang dùng `lp_membership` là hidden post type/shadow post để tương thích LP cart/order; khi đưa qua Woo cần quyết định giữ shadow post hay tạo WC product class riêng.
- `learnpress-woo-payment` có 2 mode: buy course directly as LP course product và buy courses via assigned Woo product. Membership cần thiết kế tương thích cả 2 hoặc chọn một mode chính ở phase đầu.
- Woo order to LP order hiện tính item total theo `item_type`; membership cần filter riêng cho `lp_membership` để không mất giá/subtotal.
- `MembershipCheckout::activate_membership()` hiện tính end date theo plan billing amount/unit; cần kiểm tra lifetime plan để tránh set end_date sai nếu billing_type lifetime.
- Guest checkout không phù hợp membership nếu không có user account; cần force login/register hoặc auto-create user an toàn.
- Woo Subscriptions lifecycle phức tạp: renewal, resubscribe, switch, cancel, pending-cancel, failed payment, suspension.
- Restrict content nếu hook vào query quá mạnh có thể làm ẩn nhầm content trong admin, REST, search, related courses hoặc page builder preview.
- Cần cache/memoization để restriction rule không gây chậm query trên site có nhiều post/course.
- Không được copy code từ WooCommerce Memberships; chỉ tham chiếu architecture/pattern.
- Cần migration DB version mới cho restriction rule tables/options.

## Notes
Recommended implementation phases:

Phase 1: Restriction foundation

- Thêm DB table `lp_membership_rules` hoặc option structured rules.
- Tạo `Models/RestrictionRuleModel`, `Filters/RestrictionRuleFilter`, DB query methods.
- Tạo `Services/Restrictions` và `Services/Restrictions/Posts` tương tự concept của Woo Memberships.
- Thêm helpers: `lp_membership_is_content_restricted()`, `lp_membership_user_can_access_content()`, `lp_membership_get_content_required_plans()`.
- Thêm settings restriction mode và restricted message.

Phase 2: Admin UI and frontend enforcement

- Thêm tab/rule UI trong Membership admin.
- Cho phép tạo rule từ plan edit: plan này bảo vệ content nào.
- Hook `the_content`, `pre_get_posts`, `get_pages`, REST response cơ bản.
- Thêm block/shortcode member content và non-member content.

Phase 3: Woo membership purchase MVP

- Tạo integration class conditional khi WooCommerce + `learnpress-woo-payment` active.
- Tạo `WC_Product_LP_Membership` hoặc Woo add-to-cart handler cho shadow post `lp_membership`.
- Thêm button/URL mua qua Woo trên pricing/course/profile renew CTA.
- Filter `learnpress/wc-order/total/item_type_lp_membership` và `learnpress/wc-order/subtotal/item_type_lp_membership`.
- Đảm bảo LP order item có `_plan_id`, `_created_via=woocommerce`, `_woo_order_id`.
- Dựa vào `learn-press/order/status-completed` để activate member như hiện tại.

Phase 4: Woo Subscriptions and lifecycle hardening

- Mapping subscription active/on-hold/cancelled/expired/payment failed sang member active/suspended/cancelled/expired.
- Renewal order không tạo duplicate member sai kỳ hạn.
- Refund full/partial behavior rõ ràng.
- Email lifecycle dùng LearnPress email hooks hiện có.

Key code references reviewed:

- `learnpress-membership/inc/load.php`
- `learnpress-membership/inc/Models/PlanModel.php`
- `learnpress-membership/inc/Models/MemberModel.php`
- `learnpress-membership/inc/Helpers/PlanHelper.php`
- `learnpress-membership/inc/Admin/CourseMetaBox.php`
- `learnpress-membership/inc/TemplateHooks/SingleCourseHooks.php`
- `learnpress-membership/inc/Checkout/MembershipCheckout.php`
- `woocommerce-memberships/src/Restrictions.php`
- `woocommerce-memberships/src/Restrictions/Posts.php`
- `woocommerce-memberships/src/class-wc-memberships-rules.php`
- `woocommerce-memberships/src/functions/wc-memberships-functions-restrictions.php`
- `woocommerce-memberships/src/Blocks/Member_Content.php`
- `learnpress-woo-payment/incs/load.php`
- `learnpress-woo-payment/incs/WooGateway.php`
- `learnpress-woo-payment/incs/LPWooOrderHandler.php`
- `learnpress-woo-payment/incs/class-lp-wc-hooks.php`
- `learnpress-woo-payment/incs/LPWooSubscription.php`
- `learnpress-woo-payment/incs/class-wc-product-lp-course.php`