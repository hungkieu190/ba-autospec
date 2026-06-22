# Launch Assets — LearnPress Membership v4.1

## Skills Used

- `marketing/positioning-and-copy.md`
- `docs/documentation-outline.md`
- `product/product-strategy.md`

---

## Product Announcement

### Title
LearnPress Membership v4.1: Content Restriction & WooCommerce Checkout

### Body

Chúng tôi vui mừng giới thiệu LearnPress Membership v4.1 — bản nâng cấp lớn nhất từ trước đến nay.

**Có gì mới?**

🔒 **Content Restriction Engine** — Giờ đây admin có thể restrict nội dung course, lesson, quiz, page, post, và taxonomy theo membership plan. Chọn 3 restriction modes: hide content, hide completely, hoặc redirect. Tạo rules trực tiếp trong edit Plan.

🛒 **WooCommerce Checkout** — Bán membership qua WooCommerce cart và checkout. Dùng Woo payment gateways, coupons, taxes, và Woo Subscriptions cho recurring billing. Pricing block tự detect và hiển thị đúng CTA.

📦 **Member-Only Content** — Gutenberg block và shortcode mới cho phép hiển thị nội dung khác nhau cho members vs non-members trên bất kỳ page/post nào.

🔧 **Developer API** — Public helper functions, hooks, và filters cho developers mở rộng restriction behavior.

**Upgrade ngay** để trải nghiệm LearnPress Membership đầy đủ.

[Upgrade Now] | [View Documentation] | [View Changelog]

---

## Changelog Entry

```markdown
## [4.1.0] - YYYY-MM-DD

### Added
- Content Restriction Engine: restrict post, page, course, lesson, quiz, custom post type by membership plan.
- Taxonomy restriction: restrict all content in a category or tag at once.
- 3 restriction modes: hide content only, hide completely from listing, redirect to page.
- Custom restricted message with CTA pricing link and login link for guests.
- Gutenberg block and shortcode for member-only and non-member content.
- Admin UI: restriction rules in Plan edit screen (Protected Content tab).
- Global restriction settings: default mode, default message, pricing page URL.
- Public helper API: lp_membership_is_content_restricted(), lp_membership_user_can_access_content(), lp_membership_get_content_required_plans().
- WooCommerce checkout integration via learnpress-woo-payment.
- WC product mapping with membership plan.
- Woo order → LP order → membership activation mapping.
- Pricing block auto-detects Woo mode and displays correct CTA.
- Block duplicate membership purchase.
- Bypass restriction for admin and page builder preview (Elementor, Gutenberg).

### Changed
- Pricing block updated to support dual checkout mode (LP + Woo).

### Fixed
- Lifetime plan end_date handling (no expiry for lifetime billing type).
```

---

## Release Notes

### LearnPress Membership v4.1.0 Release Notes

Phiên bản 4.1 mang đến 2 tính năng lớn:

**Content Restriction**

Admin giờ có thể bảo vệ bất kỳ nội dung nào theo membership plan:

- Hỗ trợ post, page, course, lesson, quiz, và custom post type.
- Restrict theo taxonomy (course category, post tag).
- 3 modes: hide content only, hide completely, redirect.
- Member-only block/shortcode cho inline content protection.
- Rules tạo trong edit Plan — admin UI tập trung.

**WooCommerce Checkout**

Bán membership qua WooCommerce:

- Admin tạo WC product, map với membership plan.
- Student add to Woo cart, checkout qua Woo gateways.
- Dùng Woo coupons, taxes, invoicing.
- Woo order → LP order → auto membership activation.
- Pricing block auto-detect checkout mode.

**Requirements:** WordPress 6.x+, PHP 8.x+, LearnPress latest. WooCommerce + learnpress-woo-payment optional cho Woo checkout.

**Backward compatible:** Existing plans, members, courses, LP checkout — tất cả giữ nguyên.

---

## Newsletter Draft

### Subject Line
🔒 LearnPress Membership v4.1 — Restrict Content & WooCommerce Checkout

### Body

Hi [First Name],

LearnPress Membership v4.1 is here — the biggest upgrade yet.

**What's new:**

✅ **Restrict any content by membership plan** — courses, lessons, quizzes, pages, posts, and taxonomies. Three restriction modes, custom messages, and inline member-only blocks.

✅ **Sell memberships through WooCommerce** — use Woo cart, payment gateways, coupons, taxes, and subscriptions. Your pricing block auto-detects the checkout mode.

✅ **Developer API** — hooks, filters, and helper functions to extend everything.

Your existing plans, members, and courses are untouched. Just update and start using the new features.

[Upgrade Now →]

Need help? Check our [updated documentation] or [contact support].

Best,
ThimPress Team

---

## Social Media Post

### Twitter/X

🔒 LearnPress Membership v4.1 is here!

✅ Restrict content by plan — courses, lessons, pages, posts
✅ Sell memberships through WooCommerce checkout
✅ Member-only blocks & shortcodes
✅ Developer API with hooks & filters

The only membership plugin built native for LearnPress.

[Link] #LearnPress #WordPress #LMS #Membership

### Facebook/LinkedIn

🎉 **LearnPress Membership v4.1 Released**

We just shipped the biggest update to LearnPress Membership:

🔒 **Content Restriction Engine** — Protect courses, lessons, quizzes, pages, and posts by membership plan. Choose from 3 restriction modes.

🛒 **WooCommerce Checkout** — Sell memberships through WooCommerce. Use Woo payment gateways, coupons, taxes, and Woo Subscriptions.

📦 **Member-Only Content** — New Gutenberg block and shortcode for inline member/non-member content.

Backward compatible. Your existing data is safe.

→ [Upgrade now]
→ [View documentation]

#LearnPress #WordPress #LMS #Membership #EdTech
