# Competitor Gap Analysis — LearnPress Membership v4.1

## Product Idea

Nâng cấp `learnpress-membership` với Restriction Engine + WooCommerce Checkout Integration.

## Evidence Status

Gap analysis dựa trên kiến thức công khai về tính năng competitor. Cần validate trên website/docs chính thức.

## Skills Used

- `research/competitor-analysis.md`
- `product/product-strategy.md`

---

## Feature Gaps Của Competitors

### Missing Features

| Gap | WooCommerce Memberships | MemberPress | Paid Memberships Pro | Restrict Content Pro | Cơ hội cho LP Membership |
| --- | --- | --- | --- | --- | --- |
| LearnPress course enrollment native | ❌ | ❌ | ❌ | ❌ | ✅ Lợi thế duy nhất |
| LP lesson/quiz/topic restriction | ❌ | ❌ | ❌ | ❌ | ✅ Hiểu LP content structure |
| LP order system integration | ❌ | ❌ | ❌ | ❌ | ✅ Dùng LP order lifecycle |
| LP profile tab membership | ❌ | ❌ | ❌ | ❌ | ✅ Đã có sẵn |
| Course-plan mapping native | ❌ | ❌ | ❌ | ❌ | ✅ Đã có sẵn |
| Woo checkout + LP enrollment | Partial (Woo only) | ❌ | ❌ | ❌ | ✅ Qua learnpress-woo-payment |

### Missing UX Patterns

| Gap | Ai thiếu | Cơ hội |
| --- | --- | --- |
| Admin UI thống nhất: plan + restriction rules + course mapping trên cùng 1 màn hình | Tất cả (restrictions và plans thường tách biệt) | LP Membership đặt rules trong edit Plan → UX tập trung hơn |
| Pricing block/shortcode native cho membership plan | MemberPress có, nhưng không cho LP courses | LP Membership đã có pricing block, cần mở rộng cho Woo CTA |
| Course page hiển thị "Membership Required" CTA thay vì "Buy Course" | Không ai xử lý cho LP course page | LP Membership có thể override single course CTA |

### Missing Integrations

| Integration Gap | Ai thiếu | Cơ hội |
| --- | --- | --- |
| LearnPress core hooks/filters | Tất cả competitors | LP Membership native advantage |
| LearnPress email system | Tất cả competitors | LP Membership dùng LP email lifecycle |
| LearnPress REST API | Tất cả competitors | LP Membership có thể filter REST response |
| LearnPress Woo Payment bridge | Tất cả competitors | LP Membership tận dụng `learnpress-woo-payment` |

### Underserved User Segments

| Segment | Tại sao underserved | Cơ hội |
| --- | --- | --- |
| LMS admin vừa bán course vừa bán membership | Competitors hoặc là LMS thuần (LearnDash) hoặc membership thuần (MemberPress). Không ai combine 2 role tốt. | LP Membership kết hợp membership plan + course access + content restriction |
| Admin muốn dùng WooCommerce gateways cho LMS | Phải hack hoặc manual mapping | LP Membership + learnpress-woo-payment tạo bridge native |
| Small education business cần all-in-one | MemberPress quá đắt, Restrict Content Pro quá đơn giản | LP Membership ở mức giá cạnh tranh hơn |

---

## Market Opportunities Tổng Hợp

| # | Opportunity | Priority | Độ khó | Lý do |
| --- | --- | --- | --- | --- |
| 1 | **Native LP content restriction** — restrict course/lesson/quiz/topic/page/post theo plan | P1 — Phase 1 | Medium | Không ai làm được cho LP. Core competitive advantage. |
| 2 | **Woo checkout cho membership** — tận dụng Woo cart/gateway/coupon/tax | P1 — Phase 3 | Medium-Hard | Giải quyết pain point mua hàng cho site đã dùng Woo. |
| 3 | **Plan-centric admin UI** — tạo restriction rules ngay trong edit Plan | P1 — Phase 2 | Medium | UX tốt hơn competitors (rules tách biệt khỏi content type). |
| 4 | **Woo Subscriptions lifecycle mapping** — renewal, cancel, suspend | P2 — Phase 4 | Hard | Cho phép recurring membership billing native qua Woo. |
| 5 | **Trial period support** — free trial, auto-charge qua Woo Subscriptions | P2 — Phase 4 | Medium | Tăng conversion. Differentiator vs competitors thiếu LP trial. |
| 6 | **Comparison/alternative SEO content** — vs MemberPress, vs Woo Memberships | P2 — Post-launch | Low | Capture competitor search traffic. |
| 7 | **Drip/delayed access** — content unlock theo membership age | P3 — Future | Medium | Nice-to-have. WooCommerce Memberships có, LP chưa có. |

---

## Positioning Gap Tóm Tắt

**LP Membership v4.1 sẽ chiếm vị trí duy nhất:**

> Membership plugin duy nhất integrate native với LearnPress — restrict nội dung course/lesson/page/post theo plan, mua membership qua WooCommerce checkout, với admin UI tập trung và course-plan mapping sẵn có.

Không competitor nào chiếm vị trí này vì:
- WooCommerce Memberships thiếu LMS integration.
- MemberPress có LMS riêng nhưng không integrate LP.
- Restrict Content Pro / Paid Memberships Pro không biết LP structure.
