# 02 - Product Strategy

## Product Brief

| Field | Decision |
| --- | --- |
| Product name | Memberships & Subscriptions Add-on for LearnPress |
| Product type | Paid standalone LearnPress add-on |
| Positioning | All-in-one membership solution for LearnPress |
| Release target | Marketplace release |
| Primary value | Cho phép site LearnPress bán membership plan qua WooCommerce checkout và sau đó mở rộng sang restrict content native. |
| Primary audience | Website admin, LMS owner, education business bán khóa học theo membership. |
| Secondary audience | Student/customer, instructor, manager/support, developer/customizer. |

## Product Positioning

`Memberships & Subscriptions Add-on for LearnPress` nên được định vị là giải pháp membership native cho LearnPress, giúp admin bán quyền truy cập theo plan thay vì chỉ bán từng course. Điểm khác biệt không phải là clone các membership plugin lớn, mà là tích hợp trực tiếp vào LearnPress plan/member/course lifecycle và tận dụng WooCommerce cho checkout, subscription billing và order management.

## Unique Selling Proposition

Sell LearnPress memberships through WooCommerce checkout while keeping membership access, plans and student experience inside LearnPress.

## Differentiators

| Differentiator | Value |
| --- | --- |
| LearnPress-native plan/member lifecycle | Giảm nhu cầu dùng plugin membership ngoài rồi mapping thủ công với course access. |
| WooCommerce checkout for membership | Tận dụng Woo gateways, cart, coupons, tax, invoice, order management và Woo Subscriptions. |
| Standalone paid add-on | Không phụ thuộc LearnPress Pro Bundle; dễ bán và dễ nâng cấp pricing riêng. |
| Admin-only control | Giảm permission complexity trong phase đầu. |
| Phased roadmap | Woo checkout trước để tạo giá trị nhanh, Restrict Content sau để hoàn thiện all-in-one promise. |

## Target Audience

| Segment | Jobs To Be Done | Current Workaround | Product Value |
| --- | --- | --- | --- |
| Website admin | Bán khóa học theo membership plan | Bán từng course hoặc enroll thủ công | Bán plan qua Woo checkout và quản lý member trong LearnPress. |
| LMS owner | Tạo revenue recurring từ course library | Woo product/subscription riêng, manual mapping | Membership plan native, subscription-ready. |
| Education business | Dùng Woo gateways, tax, coupon, invoice | LP checkout/gateway hạn chế | Dùng WooCommerce commerce stack. |
| Student/customer | Mua một plan để truy cập nội dung | Mua từng course | Checkout quen thuộc và xem membership ở LearnPress profile/Woo account. |
| Manager/support | Hỗ trợ khách hàng membership | Kiểm tra nhiều nơi thủ công | Xem member/order context rõ hơn. |

## Scope

### Phase 1 - WooCommerce Membership Checkout

| Included | Notes |
| --- | --- |
| Buy membership plan via WooCommerce checkout | Phase đầu ưu tiên. |
| Keep `lp_membership` shadow post approach unless backend decides otherwise | Không mô tả sâu implementation trong product docs. |
| Create LP order from paid Woo order | Required to preserve LearnPress lifecycle. |
| Activate membership based on Woo order/subscription state | Backend defines exact mapping. |
| Force login/register for guest checkout | Required because membership needs user account. |
| Support Woo Subscriptions as required dependency for subscription billing | User expects full status coverage. |
| Show CTA in pricing block, shortcode, course page, restricted message, profile renew button, email | Defined UX scope. |
| Redirect post-purchase to membership dashboard | Defined customer success state. |
| Preserve existing LP checkout behavior and data | Regression requirement. |

### Phase 2 - Restrict Content

| Included | Notes |
| --- | --- |
| Admin-only rule creation inside plan edit tab | No instructor rule creation. |
| Table rule builder | No wizard in first release. |
| Content types | Post/page, course, lesson, quiz, question, custom post type. |
| Targeting | Whole post type for first restriction scope; taxonomy/object can be future enhancement if needed. |
| Rule conflict | Allow access if user has one required plan. |
| Restriction mode | Hide content only. |
| Restricted message contexts | Guest, logged-in non-member, expired member, cancelled/refunded member, wrong plan, pending payment. |
| CTA | Pricing page. |

## Out Of Scope

| Area | Out of scope for initial marketplace release |
| --- | --- |
| Full Restrict Content release | Planned phase after Woo checkout. |
| Developer docs/API | User explicitly said not needed for now. |
| Shortcode/Gutenberg condition block | User said all restriction should be config and checked through plan. |
| Drip/delayed access | Later phase. |
| Migration from existing plan-course mapping to restriction rules | Not required. |
| Multisite/multilingual/currency/cache planning | User said do not include in plan. |
| REST/headless/search/feed/sitemap restriction planning | User said do not include in plan. |
| Competitor comparison SEO pages | User said no for launch. |

## Revenue Model

| Item | Decision |
| --- | --- |
| Business model | Paid standalone add-on. |
| Free version | No free/lite version. |
| Tiering | No feature-based tiers. |
| Woo Subscriptions integration | Included in same add-on. |
| Current price | $49 list price, discounted to about $29. |
| Post-update pricing direction | Keep list price but reduce discount from about 50% to 25%, subject to marketing decision. |
| Support/update period | 1 year update and support. |
| Primary success metric | License revenue. |

## Product Strategy

| Strategic Pillar | Decision | Reason |
| --- | --- | --- |
| Phase discipline | Woo checkout first, Restrict Content after | Reduces execution risk and speeds marketplace release. |
| Native integration | Keep membership value inside LearnPress | Differentiates from generic membership plugins. |
| Woo leverage | Use WooCommerce for commerce and subscription billing | Avoids rebuilding gateway/coupon/tax/invoice workflows. |
| Simple permissions | Admin-only configuration | Avoids instructor/manager capability complexity. |
| Practical UX | Plan edit tab + table rule builder | Fits existing plan workflow and admin mental model. |

## Roadmap

| Release | Theme | Key Deliverables | Success Signal |
| --- | --- | --- | --- |
| v4.1 / Phase 1 | WooCommerce Membership Checkout | Woo purchase flow, Woo Subscriptions support, LP order creation, membership dashboard redirect, CTA updates, docs. | License revenue, Woo checkout usage, low access mismatch tickets. |
| v4.2 / Phase 2 | Restrict Content Foundation | Plan edit tab table rule builder, hide-content-only enforcement, custom messages, pricing page CTA, role/access QA. | Rules created per active site, reduced need for external membership plugin. |
| v4.3 / Phase 3 | Lifecycle hardening | Subscription edge cases, refund/cancel behavior, dashboard status clarity, support docs if ticket volume requires. | Lower refund/access mismatch and support ticket rate. |
| v5.0 / Phase 4 | Advanced Membership | Drip/delayed access, richer targeting, optional developer docs/API if demand appears. | Upsell value and higher renewal rate. |

## Success Metrics

| Metric | Why it matters |
| --- | --- |
| License revenue after release | Primary business success metric. |
| Percentage of membership purchases via Woo checkout | Measures phase 1 adoption. |
| Number of active subscription memberships | Measures recurring commerce value. |
| Payment/access mismatch tickets | Measures quality and lifecycle correctness. |
| Refund/churn rate | Measures perceived value and billing clarity. |
| Pricing page conversion to purchase | Measures GTM effectiveness. |
| Regression incidents in LP checkout | Measures backward compatibility. |

## Assumptions And Open Questions

| Item | Status |
| --- | --- |
| Exact price after discount change | Assumption: about 25% discount from $49. |
| Woo Subscriptions version | Open. Must be set by engineering/product before QA. |
| Refund/cancel access rule | User suggested keeping access to end of period but left uncertainty. Needs product decision. |
| Developer extensibility | Out of scope until demand appears. |

## Next Actions

| Owner | Action |
| --- | --- |
| Product | Confirm v4.1 naming and whether launch copy can mention future Restrict Content. |
| Engineering | Produce backend design for Woo checkout and subscription lifecycle. |
| Design | Create final UI based on `images/` references and `04-ux-and-wireframe.md`. |
| Marketing | Prepare English product page update and pricing discount change. |
| Support/Docs | Prepare English docs for setup and common checkout flows. |
