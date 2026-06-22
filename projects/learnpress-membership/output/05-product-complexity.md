# Product Complexity Assessment — LearnPress Membership v4.1

## Product Idea

Nâng cấp `learnpress-membership` với Restriction Engine + WooCommerce Checkout Integration.

## Evidence Status

Complexity assessment dựa trên kiến trúc code đã review (17 file references) và kinh nghiệm với WordPress/WooCommerce plugins.

## Skills Used

- `discovery/market-validation.md`
- `product/prd.md`
- `qa/test-plan.md`

---

## Complexity Breakdown

### UX Complexity: 6/10

| Area | Complexity | Lý do |
| --- | --- | --- |
| Admin restriction rule UI | Medium | Cần UI tạo/sửa rule trong edit Plan. Phải chọn content type, objects, plans, restriction mode. Không quá phức tạp nhưng cần thiết kế cẩn thận. |
| Restricted content display | Medium | Frontend phải render restricted message, CTA pricing link, login link. Cần xử lý multiple scenarios (guest, wrong plan, expired). |
| Woo checkout flow | Medium-High | 2 luồng checkout cùng tồn tại (LP + Woo). Pricing block phải detect mode active. User không nên confused. |
| Member-only shortcode/block | Low | Đơn giản: wrap content, check plan access, show/hide. |
| Profile tab | Low | Giữ nguyên, không thay đổi. |

### Backend Complexity: 7/10

| Area | Complexity | Lý do |
| --- | --- | --- |
| Restriction rule engine | Medium-High | Rule model, DB table, evaluation logic, caching. Phải handle multiple content types (post, page, course, lesson, quiz, taxonomy). |
| Content filtering hooks | High | `pre_get_posts`, `the_content`, `the_posts` phải đúng context (frontend only, không admin, không REST admin, không page builder preview). Side-effects là risk chính. |
| Woo product/item integration | Medium-High | WC product class cho membership hoặc shadow product mechanism. Order mapping với `_plan_id`. Cả 2 mode của learnpress-woo-payment. |
| Woo order → LP order mapping | Medium | Tận dụng `LPWooOrderHandler` hiện có. Cần filter cho `lp_membership` item type. |
| Membership activation/deactivation | Medium | Đã có `MembershipCheckout::on_order_completed()`. Cần mở rộng cho Woo order statuses. Block duplicate purchase. |
| Trial period + Woo Subscriptions | High | Free trial → auto-charge qua Woo Subscriptions. Lifecycle mapping complex: renewal, cancel, suspend, resubscribe, switch, failed payment. |

### Frontend Complexity: 5/10

| Area | Complexity | Lý do |
| --- | --- | --- |
| Restricted message rendering | Medium | Template/hook system hiển thị message, CTA, login link. Customizable per restriction mode. |
| Pricing block/shortcode CTA switch | Medium | Detect LP checkout vs Woo checkout mode. Render correct button/link. |
| Block/shortcode member-only | Low | Standard WordPress block/shortcode. Show/hide content. |
| Archive/listing content hiding | Medium | Hide restricted items từ query results khi mode "hide completely". |

### Scalability Risk: 5/10

| Area | Risk | Mitigation |
| --- | --- | --- |
| Rule evaluation per page load | Medium | Cache rule evaluation kết quả per-request (static variable). Cache user plans. |
| Archive page với nhiều posts | Medium | Batch rule check thay vì per-post. Cache restriction status per object ID. |
| Site có 500+ courses, 10k+ posts | Medium | Query optimization, index DB table, avoid N+1 queries. |
| Woo order volume | Low | LP order creation là one-time event per purchase. |

### Maintenance Cost: 6/10

| Area | Cost | Lý do |
| --- | --- | --- |
| WordPress/WooCommerce version updates | Medium | Cần test compatibility với major WP/Woo updates. Hooks có thể thay đổi. |
| LearnPress core updates | Medium | LP core changes có thể affect course/lesson/order hooks. |
| Woo Subscriptions updates | Medium-High | Lifecycle hooks/behavior có thể thay đổi. HPOS migration. |
| Support burden | Medium-High | Restrict content + Woo integration = nhiều edge cases, permission issues, caching conflicts. |
| Security maintenance | Medium | Restriction bypass checks, nonce validation, capability checks cần audit regular. |

---

## Development Difficulty Summary

| Phase | Scope | Difficulty | Estimated Effort |
| --- | --- | --- | --- |
| Phase 1: Restriction Foundation | DB table, rule model, helpers, settings | **Medium** | 1.5-2 tuần |
| Phase 2: Admin UI + Frontend Enforcement | Rule UI in Plan edit, content hooks, block/shortcode | **Medium-Hard** | 2-3 tuần |
| Phase 3: Woo Membership Purchase MVP | WC product, cart handler, order mapping, CTA switch | **Medium-Hard** | 2-3 tuần |
| Phase 4: Woo Subscriptions + Lifecycle | Subscription mapping, renewal, cancel, trial | **Hard** | 2-3 tuần |

### **Overall Development Difficulty: Medium-Hard**

**Total estimated effort: 8-11 tuần** `[Assumption]` tùy team size và familiarity.

---

## Complexity Risk Matrix

| Risk | Probability | Impact | Priority |
| --- | --- | --- | --- |
| Restriction hooks gây side-effects | High | High | 🔴 Cần POC ngay |
| Woo Subscriptions lifecycle bugs | Medium | High | 🟡 Phase 4 riêng biệt |
| Performance degradation trên large sites | Medium | Medium | 🟡 Load test trước release |
| 2 checkout modes gây confusion | Medium | Medium | 🟡 UX review + clear docs |
| HPOS compatibility issues | Low-Medium | Medium | 🟢 Test với Woo Subs mới nhất |
| Page builder conflicts | Medium | Medium | 🟡 Test Elementor + Gutenberg |
