# Product Strategy — LearnPress Membership v4.1

## Product Idea

Nâng cấp `learnpress-membership` với Restriction Engine + WooCommerce Checkout Integration.

## Evidence Status

Strategy dựa trên input, competitor analysis, và market validation. Assumptions được đánh dấu rõ.

## Skills Used

- `product/product-strategy.md`
- `research/competitor-analysis.md`
- `research/search-demand-analysis.md`
- `marketing/growth-loops.md`

---

## Product Positioning

**LearnPress Membership** là add-on membership duy nhất được thiết kế native cho LearnPress — cho phép admin bảo vệ nội dung course, lesson, page, post theo membership plan và mua membership qua WooCommerce checkout.

**Category:** WordPress LMS Membership Plugin
**Target:** LearnPress admin muốn bán nội dung theo gói membership thay vì bán từng course.

---

## Unique Selling Proposition

> Membership plugin duy nhất hiểu cấu trúc LearnPress. Restrict nội dung theo plan, mua membership qua WooCommerce — không cần plugin membership bên ngoài.

---

## Product Differentiators

| # | Differentiator | So với competitors |
| --- | --- | --- |
| 1 | **Native LearnPress integration** — hiểu course → section → lesson → quiz structure | Không competitor nào có |
| 2 | **Course-plan mapping sẵn có** — admin map courses vào plan, students tự enrollment khi activate membership | Competitors cần custom code |
| 3 | **LP order lifecycle integration** — membership activation/deactivation theo LP order status | Competitors dùng order system riêng |
| 4 | **Dual checkout: LP + WooCommerce** — admin chọn checkout phù hợp, pricing block auto-detect | Woo Memberships chỉ Woo. MemberPress chỉ own gateway. |
| 5 | **Plan-centric admin UI** — restriction rules nằm trong edit Plan, không tách biệt | Competitors thường tách rules khỏi membership management |
| 6 | **Giá cạnh tranh** — rẻ hơn MemberPress, WooCommerce Memberships `[Assumption]` | Cần validate pricing comparison |

---

## Product Vision

**Short-term (v4.1):** LearnPress Membership trở thành membership platform đầy đủ cho LearnPress ecosystem — restrict content + Woo checkout.

**Mid-term (v4.2-4.3):** Drip content, advanced rules (AND logic, inheritance), Woo Subscriptions full lifecycle, Elementor conditions.

**Long-term:** Standard membership solution cho mọi LearnPress site, thay thế nhu cầu dùng third-party membership plugins.

---

## Revenue Model

| Yếu tố | Giá trị |
| --- | --- |
| Model | Annual subscription license |
| Pricing change | Giảm discount từ ~50% → ~25% |
| Bundle | Có trong LearnPress Pro Bundle (giá bundle không đổi) |
| Upsell | learnpress-woo-payment, learnpress-certificates |
| Cross-sell | Pro Bundle cho user mua standalone |

---

## Upsell & Cross-sell Opportunities

| Type | Trigger | Product |
| --- | --- | --- |
| Upsell | User dùng LP checkout → muốn Woo checkout | learnpress-woo-payment |
| Upsell | User muốn recurring billing | WooCommerce Subscriptions (3rd party) |
| Cross-sell | User mua membership standalone | LearnPress Pro Bundle |
| Cross-sell | User restrict course → muốn certificate | learnpress-certificates |
| Cross-sell | User bảo vệ content → muốn drip | Future: learnpress-drip-content |

---

## Success Metrics

| Metric | Target | Timeline |
| --- | --- | --- |
| Active sites | 50+ | 12 tháng sau v4.1 launch |
| New license purchases | 20-30 | Year 1 |
| Renewal rate | 50%+ | Year 1 |
| Woo checkout adoption | 30%+ của customers dùng Woo mode | 6 tháng sau Phase 3 |
| Restriction rules created | Avg 5+ rules per active site | 6 tháng sau Phase 1 |
| Support tickets (restrict/Woo) | < 2/tuần | 3 tháng sau launch |
| Access mismatch bugs | 0 critical | Ongoing |
| Backward compatibility | 0 regression | Mỗi release |

---

## Roadmap

### Version 4.1.0 — Restriction Foundation (Phase 1)

| Feature | Priority | Effort |
| --- | --- | --- |
| DB table `lp_membership_rules` + migration | Must-have | Medium |
| Rule model: `RestrictionRuleModel`, `RestrictionRuleFilter` | Must-have | Medium |
| Rule types: `content_restriction` cho post/page/course/lesson/quiz/taxonomy | Must-have | Medium-High |
| Restriction mode: hide content only, hide completely, redirect | Must-have | Medium |
| Public helpers: `lp_membership_is_content_restricted()`, `lp_membership_user_can_access_content()`, `lp_membership_get_content_required_plans()` | Must-have | Medium |
| Settings: default restricted message, restriction mode | Must-have | Low |
| OR logic cho multi-plan rules | Must-have | Low |

### Version 4.1.x — Admin UI + Frontend Enforcement (Phase 2)

| Feature | Priority | Effort |
| --- | --- | --- |
| Admin UI restriction rules trong edit Plan | Must-have | Medium-High |
| Frontend hooks: `the_content`, `pre_get_posts`, `the_posts` | Must-have | High |
| Restricted message rendering + CTA pricing link | Must-have | Medium |
| Gutenberg block/shortcode: member-only, non-member content | Must-have | Medium |
| Bypass cho admin, page builder preview, REST admin | Must-have | Medium |

### Version 4.2.0 — Woo Membership Purchase MVP (Phase 3)

| Feature | Priority | Effort |
| --- | --- | --- |
| WC product class cho membership (hoặc shadow product handler) | Must-have | Medium-High |
| Woo add-to-cart cho membership plan | Must-have | Medium |
| Woo order → LP order mapping với `_plan_id` | Must-have | Medium |
| Support cả 2 modes learnpress-woo-payment | Must-have | Medium |
| Pricing block auto-detect Woo mode + Woo CTA | Must-have | Medium |
| Block duplicate purchase | Must-have | Low |
| Order status mapping: completed/processing → activate, cancelled/failed/refunded → deactivate | Must-have | Medium |

### Version 4.3.0 — Woo Subscriptions + Lifecycle (Phase 4)

| Feature | Priority | Effort |
| --- | --- | --- |
| Free trial period via Woo Subscriptions | Should-have | Medium-High |
| Subscription status → member status mapping | Should-have | High |
| Renewal order handling (không duplicate member) | Should-have | Medium |
| Cancel/suspend/resubscribe mapping | Should-have | Medium |
| Failed payment → member suspension | Should-have | Medium |

### Future — Nice-to-have

| Feature | Priority |
| --- | --- |
| Drip/delayed access theo membership age | Nice-to-have |
| Rule inheritance cho hierarchical post types | Nice-to-have |
| AND logic cho multi-plan rules | Nice-to-have |
| REST API restricted status | Nice-to-have |
| Elementor condition widget visibility | Nice-to-have |
| Import/export restriction rules | Nice-to-have |
| Admin restriction simulator/debug | Nice-to-have |

---

## Prioritization (RICE)

| Feature | Reach | Impact | Confidence | Effort | RICE Score | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| Content restriction engine | High | High | High | Medium | 🔴 Rất cao | Phase 1 |
| Admin UI rules trong Plan | High | High | High | Medium-High | 🔴 Rất cao | Phase 2 |
| Frontend enforcement hooks | High | High | Medium | High | 🟡 Cao | Phase 2 |
| Woo checkout integration | Medium | High | Medium | Medium-High | 🟡 Cao | Phase 3 |
| Woo Subscriptions lifecycle | Low-Medium | Medium | Low | High | 🟢 Trung bình | Phase 4 |
| Trial period | Low | Medium | Low | Medium-High | 🟢 Trung bình | Phase 4 |
| Drip content | Low | Low | Low | Medium | ⚪ Thấp | Future |
