# Product Descriptions — LearnPress Membership v4.1

## Skills Used

- `marketing/positioning-and-copy.md`
- `product/product-brief.md`
- `seo/product-page-outline.md`

---

## Short Version

LearnPress Membership cho phép admin tạo membership plans, restrict nội dung course/lesson/page/post theo plan, và bán membership qua WooCommerce checkout. Plugin membership duy nhất được thiết kế native cho LearnPress.

---

## Medium Version

LearnPress Membership biến LearnPress site thành membership platform đầy đủ. Admin tạo membership plans, gán courses, và restrict nội dung — course, lesson, quiz, page, post, taxonomy — chỉ cho member đúng plan mới truy cập được.

Với v4.1, plugin hỗ trợ 3 restriction modes (hide content, hide completely, redirect), member-only blocks/shortcodes, và WooCommerce checkout integration qua learnpress-woo-payment. Admin có thể bán membership qua Woo cart, dùng Woo gateways, coupons, taxes, và Woo Subscriptions cho recurring billing.

Tất cả cấu hình restriction nằm trong edit Plan — admin quản lý plans, courses, và protected content tại cùng 1 nơi. Backward compatible, LP checkout hiện có vẫn hoạt động.

---

## Long Version

### Vấn đề

LearnPress admin muốn bán nội dung theo gói membership, nhưng:

- **Không restrict được ngoài course.** LearnPress chỉ quản lý quyền truy cập course theo plan. Page, post, lesson, quiz, tài nguyên premium — không có cách bảo vệ nào theo membership.
- **LP checkout hạn chế.** Site đã chạy WooCommerce phải chuyển sang LP checkout riêng, mất quyền dùng Woo gateways, coupons, taxes, subscriptions, order management, invoicing.
- **Plugin bên ngoài không hiểu LearnPress.** MemberPress, WooCommerce Memberships, Restrict Content Pro không biết cấu trúc course → section → lesson → quiz. Phải custom code để mapping.

### Giải pháp

**LearnPress Membership v4.1** giải quyết cả 2 vấn đề:

**1. Content Restriction Engine**

Hệ thống rule-based restrict content cho LearnPress:

- Restrict post, page, course, lesson, quiz, custom post type theo membership plan.
- Restrict theo taxonomy: course category, post tag, custom taxonomy — protect cả category cùng lúc.
- 3 restriction modes: hide content (thay bằng message), hide completely (ẩn khỏi listing/search), redirect to page.
- Custom restricted message với CTA pricing link và login link.
- Member-only & non-member content qua Gutenberg block hoặc shortcode.
- Admin tạo rules trực tiếp trong edit Plan — quản lý plans + protected content tại 1 nơi.
- Public helper API cho developers: check restriction status, user access, required plans.

**2. WooCommerce Checkout Integration**

Bán membership qua WooCommerce:

- Admin tạo WC product map với membership plan.
- Student add membership to Woo cart, checkout qua Woo gateways.
- Dùng Woo coupons, taxes, invoicing, order management.
- Woo order completed → LP order created → membership activate tự động.
- Woo Subscriptions support: recurring billing, free trial, auto-renewal.
- Pricing block auto-detect Woo mode, hiển thị đúng CTA.
- Block duplicate purchase khi user đã có plan active.
- LP checkout vẫn hoạt động — admin chọn mode phù hợp.

### Tại sao chọn LearnPress Membership?

- **Native LearnPress** — hiểu cấu trúc course/lesson/quiz. Course enrollment tự động khi member activate.
- **Dual checkout** — LP checkout hoặc Woo checkout. Không ép 1 mode.
- **Admin UI tập trung** — restriction rules trong edit Plan, không tách biệt.
- **Backward compatible** — existing plans, members, courses giữ nguyên.
- **Developer-friendly** — hooks, filters, public helper API.

### Use Cases

- **Bán khóa học theo gói:** Plan Silver (5 courses), Gold (20 courses), Platinum (tất cả).
- **Bảo vệ tài nguyên premium:** PDF, video, templates trên page/post — chỉ member xem.
- **LMS + WooCommerce store:** Bán membership qua Woo checkout, dùng existing gateways.
- **Free trial:** 7 ngày free trial, hết trial auto-charge qua Woo Subscriptions.
- **Restrict theo category:** Tất cả courses trong "Advanced" chỉ cho Gold members trở lên.
