# Product Requirement Document (PRD) — LearnPress Membership v4.1

## Skills Used

- `product/prd.md`
- `product/product-brief.md`
- `product/product-strategy.md`
- `ux/user-flow.md`

---

## Objectives

| # | Objective | Metric | Target |
| --- | --- | --- | --- |
| O1 | Admin có thể restrict content theo membership plan | Số rule được tạo per site | Avg 5+ |
| O2 | Student mua membership qua WooCommerce checkout | % purchases qua Woo | 30%+ |
| O3 | Không phá vỡ LP checkout hiện có | Regression tests pass | 100% |
| O4 | Tăng revenue per license | Discount reduction | 50% → 25% |
| O5 | Giảm nhu cầu plugin membership bên ngoài | Customer feedback | Positive |

---

## User Stories

### Restriction Engine

```
US-R01: As an Admin
I want to create restriction rules that protect posts, pages, courses, lessons, and quizzes by membership plan
So that only members with active plans can access premium content.

US-R02: As an Admin
I want to choose restriction mode (hide content, hide completely, redirect)
So that I can control how restricted content behaves for non-members.

US-R03: As an Admin
I want to set restriction rules by taxonomy term (course category, post tag)
So that I can protect all content in a category at once instead of one by one.

US-R04: As an Admin
I want to create restriction rules directly in the Plan edit screen
So that I manage protected content and plan settings in one place.

US-R05: As an Admin
I want to configure default and custom restricted messages with a CTA link to pricing page
So that non-members see a clear call-to-action to purchase.

US-R06: As a Student
I want to see a clear message when content is restricted
So that I know what plan I need and where to buy it.

US-R07: As a Developer
I want public helper functions to check restriction status and user access
So that I can extend restriction behavior in custom themes or plugins.

US-R08: As an Admin
I want a Gutenberg block and shortcode to show/hide content for members vs non-members
So that I can protect inline content within any page or post.

US-R09: As a Guest
I want to see restricted content CTA with pricing link
So that I can discover membership plans and purchase access.
```

### WooCommerce Checkout

```
US-W01: As an Admin
I want to create a WooCommerce product mapped to a membership plan
So that students can buy membership through WooCommerce checkout.

US-W02: As a Student
I want to add a membership plan to WooCommerce cart and checkout
So that I can use familiar Woo payment methods, coupons, and invoicing.

US-W03: As an Admin
I want the pricing block to automatically show WooCommerce CTA when Woo mode is active
So that the frontend reflects the correct checkout method.

US-W04: As a Student
I want my membership to activate automatically when WooCommerce order completes
So that I get immediate access to restricted content.

US-W05: As a Student
I want to be blocked from purchasing a plan I already have active
So that I don't accidentally buy duplicate memberships.

US-W06: As an Admin
I want membership to be deactivated when Woo order is cancelled/failed/refunded
So that access is revoked correctly.

US-W07: As a Student (Phase 4)
I want to start a free trial for a membership plan via Woo Subscriptions
So that I can try before committing to payment.

US-W08: As an Admin (Phase 4)
I want Woo Subscription status changes to sync with member status
So that renewal, cancel, suspend, and failed payment are handled automatically.
```

---

## Functional Requirements

| ID | Requirement | Priority | User Role | Phase | Notes |
| --- | --- | --- | --- | --- | --- |
| FR-001 | Hệ thống lưu restriction rules trong DB table `lp_membership_rules` | Must-have | System | 1 | Migration script tạo table |
| FR-002 | Rule model (`RestrictionRuleModel`) hỗ trợ: plan_id, content_type, object_id, taxonomy, term_id, restriction_mode | Must-have | System | 1 | |
| FR-003 | Rule filter (`RestrictionRuleFilter`) cho query: by plan, by content_type, by object | Must-have | System | 1 | |
| FR-004 | Rule type `content_restriction` cho: post, page, lp_course, lp_lesson, lp_quiz, custom post type | Must-have | Admin | 1 | |
| FR-005 | Restriction theo taxonomy term: course_category, post_category, post_tag, custom taxonomies | Must-have | Admin | 1 | |
| FR-006 | Restriction mode: hide_content_only, hide_completely, redirect | Must-have | Admin | 1 | |
| FR-007 | OR logic: user cần 1 trong nhiều plans assigned cho rule | Must-have | System | 1 | |
| FR-008 | Helper: `lp_membership_is_content_restricted( $object_id )` | Must-have | Developer | 1 | |
| FR-009 | Helper: `lp_membership_user_can_access_content( $user_id, $object_id )` | Must-have | Developer | 1 | |
| FR-010 | Helper: `lp_membership_get_content_required_plans( $object_id )` | Must-have | Developer | 1 | |
| FR-011 | Settings: default restricted message text | Must-have | Admin | 1 | |
| FR-012 | Settings: default restriction mode | Must-have | Admin | 1 | |
| FR-013 | Settings: pricing page URL cho CTA | Must-have | Admin | 1 | |
| FR-014 | Admin UI: tạo/sửa/xóa restriction rules trong edit Plan screen | Must-have | Admin | 2 | |
| FR-015 | Frontend hook `the_content`: thay nội dung bằng restricted message khi mode hide_content_only | Must-have | System | 2 | |
| FR-016 | Frontend hook `pre_get_posts`: loại content khỏi query khi mode hide_completely | Must-have | System | 2 | Đề xuất: ẩn khỏi archive/listing, WordPress search, RSS feed. Giữ hiển thị trên sitemap XML và direct URL (show restricted message). |
| FR-017 | Frontend redirect: redirect đến page được chọn khi mode redirect | Must-have | System | 2 | |
| FR-018 | Bypass restriction: admin, page builder preview (Elementor + Gutenberg), REST admin requests | Must-have | System | 2 | |
| FR-019 | Restricted message rendering: title, message, CTA pricing link, login link (cho guest) | Must-have | System | 2 | |
| FR-020 | Gutenberg block: `[lp_member_content plan_id="1,2"]` show/hide content | Must-have | Admin | 2 | |
| FR-021 | Shortcode: `[lp_member_content]...[/lp_member_content]` và `[lp_non_member_content]...[/lp_non_member_content]` | Must-have | Admin | 2 | |
| FR-022 | WC product class hoặc handler cho membership plan | Must-have | System | 3 | |
| FR-023 | Admin tạo WC product, map với courses thuộc plan | Must-have | Admin | 3 | |
| FR-024 | Add membership plan to Woo cart | Must-have | Student | 3 | |
| FR-025 | Support cả 2 modes learnpress-woo-payment (LP course product + assigned Woo product) | Must-have | System | 3 | |
| FR-026 | Woo order → LP order mapping: item_type `lp_membership`, meta `_plan_id`, `_created_via=woocommerce`, `_woo_order_id` | Must-have | System | 3 | |
| FR-027 | Membership activation khi Woo order status `processing` hoặc `completed` | Must-have | System | 3 | |
| FR-028 | Membership deactivation khi Woo order `cancelled`, `failed`, `refunded` | Must-have | System | 3 | |
| FR-029 | Pricing block auto-detect Woo mode, hiển thị "Buy via WooCommerce" CTA | Must-have | System | 3 | |
| FR-030 | Block duplicate purchase: kiểm tra user đã có active membership cho plan | Must-have | System | 3 | |
| FR-031 | Filter `learnpress/wc-order/total/item_type_lp_membership` cho giá membership | Must-have | System | 3 | |
| FR-032 | Guest checkout: yêu cầu login/register trước khi activate membership | Must-have | System | 3 | |
| FR-033 | Free trial period via Woo Subscriptions | Should-have | Admin | 4 | |
| FR-034 | Subscription status → member status mapping: active/on-hold/cancelled/expired/failed | Should-have | System | 4 | |
| FR-035 | Renewal order không tạo duplicate member | Should-have | System | 4 | |
| FR-036 | Refund behavior: full refund → deactivate member | Should-have | System | 4 | |

---

## Non-functional Requirements

| ID | Area | Requirement |
| --- | --- | --- |
| NFR-001 | Performance | Restriction check per page load < 50ms trên site 500 courses |
| NFR-002 | Performance | Archive page restriction filter < 100ms cho 20 posts |
| NFR-003 | Compatibility | WordPress 6.x+ |
| NFR-004 | Compatibility | PHP 8.x+ |
| NFR-005 | Compatibility | WooCommerce latest stable |
| NFR-006 | Compatibility | WooCommerce Subscriptions latest stable |
| NFR-007 | Compatibility | HPOS compatible |
| NFR-008 | Compatibility | Elementor latest stable (không break preview/editor) |
| NFR-009 | Compatibility | Gutenberg (không break editor preview) |
| NFR-010 | Security | Mọi admin action có nonce validation |
| NFR-011 | Security | Mọi rule CRUD kiểm tra `current_user_can('manage_options')` |
| NFR-012 | Security | Input sanitize, output escape theo WordPress Coding Standards |
| NFR-013 | Security | Restriction bypass không thể qua URL manipulation |
| NFR-014 | Maintainability | Mọi PHP file có `if ( ! defined( 'ABSPATH' ) ) { exit; }` |
| NFR-015 | Backward Compatibility | Không break LP checkout, plan-course mapping, member lifecycle hiện có |

---

## Permission Matrix

| Capability | Admin | Manager | Instructor | Student/Customer | Guest |
| --- | --- | --- | --- | --- | --- |
| Tạo/sửa/xóa restriction rules | ✅ | ❌ | ❌ | ❌ | ❌ |
| Quản lý membership plans | ✅ | ❌ | ❌ | ❌ | ❌ |
| Quản lý members | ✅ | ❌ | ❌ | ❌ | ❌ |
| Cấu hình settings | ✅ | ❌ | ❌ | ❌ | ❌ |
| Cấu hình Woo checkout | ✅ | ❌ | ❌ | ❌ | ❌ |
| Xem restricted content (có plan) | ✅ | ✅ | ✅ | ✅ | ❌ |
| Mua membership | ✅ | ✅ | ✅ | ✅ | ❌ (phải register) |
| Xem pricing page | ✅ | ✅ | ✅ | ✅ | ✅ |
| Dùng block/shortcode member content | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## Acceptance Criteria

| ID | User Story | Criteria | Pass/Fail |
| --- | --- | --- | --- |
| AC-001 | US-R01 | Admin tạo rule restrict course X cho Plan A → Student không có Plan A không xem được course X | Pass khi content hidden |
| AC-002 | US-R02 | Admin set mode "hide completely" → course không xuất hiện trong archive listing | Pass khi course ẩn khỏi listing |
| AC-003 | US-R02 | Admin set mode "redirect" → user bị redirect đến page chọn sẵn | Pass khi redirect đúng URL |
| AC-004 | US-R03 | Admin restrict taxonomy "Premium" → tất cả courses trong category Premium bị restrict | Pass khi tất cả courses trong category bị restrict |
| AC-005 | US-R05 | Admin set custom message → non-member thấy custom message + pricing CTA | Pass khi message hiển thị đúng |
| AC-006 | US-R08 | Admin thêm block `[lp_member_content]` → chỉ member thấy content bên trong | Pass khi non-member không thấy |
| AC-007 | US-W01 | Admin tạo WC product map với Plan A → Student add to Woo cart thành công | Pass khi item trong cart |
| AC-008 | US-W04 | Woo order completed → membership activate → student access restricted content | Pass khi auto-activate |
| AC-009 | US-W05 | Student đã có Plan A active → thử mua Plan A lại → bị block | Pass khi blocked + message |
| AC-010 | US-W06 | Woo order cancelled → membership deactivated | Pass khi access revoked |
| AC-011 | FR-018 | Admin xem restricted post trong wp-admin → thấy content bình thường | Pass khi admin bypass |
| AC-012 | FR-018 | Elementor edit restricted page → thấy content bình thường | Pass khi preview bypass |
| AC-013 | NFR-015 | Upgrade từ version hiện tại → existing plans, members, courses mapping giữ nguyên | Pass khi no data loss |

---

## Success Metrics

| Category | Metric | Target | Measurement |
| --- | --- | --- | --- |
| Adoption | Active sites sử dụng restriction rules | 50% active sites | Analytics |
| Adoption | Woo checkout adoption | 30%+ customers | Sales data |
| Activation | Rules created per site | Avg 5+ | Database query |
| Revenue | License revenue increase | +33% per license | Sales data |
| Quality | Access mismatch bugs | 0 critical | Bug tracker |
| Support | Restrict/Woo support tickets | < 2/tuần | Support system |
| Retention | Renewal rate | 50%+ | Sales data |
| Compatibility | Regression tests pass | 100% | CI/CD |
