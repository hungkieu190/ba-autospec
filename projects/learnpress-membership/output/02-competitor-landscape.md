# Competitor Landscape — LearnPress Membership v4.1

## Product Idea

Nâng cấp `learnpress-membership` với Restriction Engine + WooCommerce Checkout Integration.

## Evidence Status

Thông tin competitor dựa trên kiến thức công khai về các plugin WordPress membership phổ biến. Giá cả và tính năng cần verify trên website chính thức của từng competitor.

## Skills Used

- `research/competitor-analysis.md`
- `discovery/market-validation.md`

---

## Direct Competitors

Plugin membership WordPress có restrict content + payment gateway.

| Product | Type | Positioning | Pricing Model | Core Features | Strengths | Weaknesses | Source / Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| WooCommerce Memberships | Direct | Membership tích hợp sâu với WooCommerce store | Annual subscription | Restrict content, drip content, member discounts, Woo checkout native | Deep Woo integration, mature codebase, large user base | Không có LMS/course integration. Yêu cầu WooCommerce. Phức tạp setup. Không free tier. | woocommerce.com |
| MemberPress | Direct | All-in-one membership platform | Annual subscription (3 tiers) | Restrict content, drip, courses (built-in basic LMS), payment gateways, rules | All-in-one, dễ setup, strong docs, built-in LMS basic | LMS basic không bằng LearnPress. Giá cao. Không integrate với LP enrollment. Closed ecosystem. | memberpress.com |
| Paid Memberships Pro | Direct | Freemium membership plugin | Free + paid add-ons | Restrict content, levels, payment gateways, reports | Freemium model, extensible, large community | Cần nhiều add-ons paid. Không LMS native integration. UI outdated. | paidmembershipspro.com |
| Restrict Content Pro | Direct | Lightweight restrict content | Annual subscription | Restrict post/page, membership levels, payment gateways | Lightweight, clean code, developer-friendly | Không có LMS integration. Ít tính năng nâng cao. Smaller ecosystem. | restrictcontentpro.com |

## Indirect Competitors

Giải pháp giải quyết vấn đề tương tự nhưng cách tiếp cận khác.

| Product | Type | Positioning | Pricing Model | Core Features | Strengths | Weaknesses | Source / Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| WooCommerce Subscriptions | Indirect | Subscription billing cho WooCommerce | Annual subscription | Recurring payments, subscription management, renewal | Mature billing engine, deep Woo integration | Không có restrict content. Không membership management. Chỉ billing layer. | woocommerce.com |
| LearnPress Woo Payment | Indirect | Bán course LP qua WooCommerce | Paid add-on | WC product cho LP course, Woo checkout, order mapping | Đã integrate LP + Woo | Chỉ cho course, không membership plan. Không restrict content. | thimpress.com |
| LearnDash | Indirect | Premium WordPress LMS | One-time purchase | LMS + groups/membership-like features, ProPanel | Feature-rich LMS, strong market position | Giá cao. Không direct membership plugin. Groups ≠ full membership. Khác ecosystem. | learndash.com |

## Alternative Solutions

Workarounds không dùng membership plugin.

| Product | Type | Positioning | Pricing Model | Core Features | Strengths | Weaknesses | Source / Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Manual enrollment | Alternative | Admin tự enroll user sau khi nhận payment | Free | Manual user management | Zero cost, full control | Không scale. Human error. Không automated. | N/A |
| User role plugins + page visibility | Alternative | Dùng plugin role + visibility conditions | Free/Paid | Set role, hide content by role | Flexible, plugin ecosystem | Không membership lifecycle. Không payment. Không course-aware. | N/A |
| Custom development | Alternative | Developer tự code restrict + payment | Dev cost | Bespoke solution | Exact fit cho requirements | Expensive, maintenance burden, no updates, no community. | N/A |

---

## Market Position Map

```
                    LMS Integration
                         ↑
                         |
   Restrict Content Pro  |  LP Membership v4.1 (target)
   Paid Memberships Pro  |
                         |
   ─────────────────────┼──────────────────────→ Woo Integration
                         |
   MemberPress           |  WooCommerce Memberships
   (own LMS, own pay)    |  (deep Woo, no LMS)
                         |
```

**Vị trí mục tiêu của LP Membership v4.1:** Góc phần tư phải-trên — **LMS integration mạnh + WooCommerce integration tốt**. Không competitor nào đang chiếm vị trí này.
