# Product Brief — LearnPress Membership v4.1

## Skills Used

- `product/product-brief.md`
- `product/product-strategy.md`

---

## Product Name

**LearnPress Membership** (version 4.1)

## Tagline

Restrict nội dung theo plan, mua membership qua WooCommerce — native cho LearnPress.

## Problem Statement

Admin LearnPress hiện chỉ bán từng course hoặc gán courses vào membership plan. Họ **không thể**:

1. **Bảo vệ nội dung ngoài course** — page, post, lesson, quiz, taxonomy — theo membership plan. Nếu muốn restrict content, phải dùng plugin bên ngoài (MemberPress, Restrict Content Pro) mà các plugin đó không hiểu cấu trúc LearnPress.
2. **Bán membership qua WooCommerce** — site đã vận hành WooCommerce phải dùng LP checkout riêng, mất quyền dùng Woo gateways, coupons, taxes, subscriptions, order management.

## Proposed Solution

Nâng cấp `learnpress-membership` v4.1 với 2 module chính:

1. **Membership Restriction Engine** — hệ thống rule-based restrict content cho post/page/course/lesson/quiz/taxonomy theo membership plan. Admin tạo rules trong edit Plan. Frontend tự enforce: hide content, hide completely, hoặc redirect.
2. **WooCommerce Membership Checkout** — cho phép mua membership plan qua WooCommerce cart/checkout. Tận dụng `learnpress-woo-payment` để map WC product → LP order → membership activation.

## Target Audience

**Primary:**
- Website admin bán khóa học theo gói membership
- LMS owner muốn restrict nội dung theo plan (không chỉ course)
- Education business muốn WooCommerce checkout cho membership

**Secondary:**
- Instructor cần bảo vệ lesson/course/page
- Student/customer mua membership để truy cập premium content
- Developer cần hooks/filters để mở rộng

## User Roles

| Role | Quyền chính với Membership |
| --- | --- |
| Admin | Tạo/sửa plan, tạo restriction rules, cấu hình Woo checkout, quản lý members |
| Instructor | Xem courses trong plan (không tạo rules) |
| Student/Customer | Mua membership, xem restricted content khi có plan active |
| Guest | Thấy restricted message + CTA pricing link |
| Developer | Sử dụng hooks/filters/API để mở rộng |

> **Lưu ý:** Chỉ Admin mới có quyền tạo/sửa restriction rules. Manager, Instructor, Student, Guest không có quyền này.

## Business Value

1. **Tăng giá trị thương mại** — biến add-on từ course-plan mapping thành membership platform thực sự.
2. **Giảm nhu cầu plugin ngoài** — khách hàng LP không cần mua MemberPress/Woo Memberships riêng.
3. **Tăng revenue per license** — giảm discount từ ~50% → ~25% cho version nâng cấp.
4. **Tận dụng WooCommerce** — mở rộng payment gateway coverage, giảm maintain gateway riêng.
5. **Tăng bundle value** — LP Membership upgrade tăng perceived value của Pro Bundle.

## Scope (v4.1)

### Included:
- Restriction rules cho post, page, course, lesson, quiz, custom post type
- Restrict theo taxonomy (course category, post tag, etc.)
- Restriction mode: hide content only, hide completely, redirect to page
- OR logic cho multi-plan rules (user cần 1 trong nhiều plan)
- Admin UI tạo rules trong edit Plan
- Restricted message settings (default + custom, CTA pricing link)
- Public helper API
- Gutenberg block + shortcode cho member-only / non-member content
- WooCommerce checkout cho membership plan (qua learnpress-woo-payment)
- WC product mapping với plan
- Woo order → LP order → membership activation
- Pricing block auto-detect LP vs Woo mode
- Block duplicate purchase
- Free trial via Woo Subscriptions (Phase 4)
- Woo Subscriptions lifecycle mapping (Phase 4)
- Backward compatible với LP checkout hiện có

### Out of Scope:
- Clone toàn bộ WooCommerce Memberships
- Member discounts, product purchasing discounts
- Multi-vendor marketplace membership
- CRM/email marketing automation ngoài LP email lifecycle hiện có
- Migration tool từ WooCommerce Memberships rules
- Mobile app / headless frontend
- AND logic cho multi-plan rules (future)
- Drip/delayed access (future)
- Elementor condition widget (future)
