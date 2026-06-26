# 01 - Discovery

## Executive Summary

`Memberships & Subscriptions Add-on for LearnPress` nên được nâng cấp theo hướng phased release, bắt đầu bằng WooCommerce Membership Checkout rồi mới tới Restrict Content. Đây không phải cơ hội đã được validate bằng ticket, survey hoặc preorder; đây là concept chiến lược do team chủ động muốn làm để biến add-on hiện tại thành `all-in-one membership solution for LearnPress`.

Khuyến nghị discovery sơ bộ: `Build with phased scope`. Phase đầu nên tập trung vào checkout qua WooCommerce vì có đường giá trị rõ: tận dụng Woo gateways, Woo cart, Woo checkout, coupon, tax, invoice và Woo Subscriptions. Phase Restrict Content nên được thiết kế ngay trong strategy/PRD nhưng triển khai sau để giảm rủi ro scope, QA và support.

## Evidence Summary

| Loại thông tin | Trạng thái | Ghi chú |
| --- | --- | --- |
| Customer demand | Yếu | Người dùng xác nhận chưa có evidence từ ticket, survey, customer request hoặc lost deal. |
| Strategic fit | Mạnh | Add-on đã có plan/member/lifecycle, nên membership checkout và restriction là bước mở rộng tự nhiên. |
| Technical feasibility | Trung bình | Đã có LearnPress order flow, `lp_membership` item, `learnpress-woo-payment`, Woo order handler; backend vẫn cần quyết định chi tiết mapping/status/idempotency. |
| Monetization | Trung bình | Paid standalone add-on, giá hiện tại $49, discount đang khoảng 50% còn $29; sau update dự kiến giảm discount còn 25%. |
| SEO opportunity | Trung bình | Primary keyword: `learnpress membership`; chưa có search volume được verify. |
| Competitive pressure | Trung bình | Có đối thủ thực tế: WooCommerce Memberships, MemberPress, Paid Memberships Pro, Restrict Content Pro. |

## Assumption Mapping

| Assumption | Category | Importance | Evidence | Priority | Fastest Test | Decision Rule |
| --- | --- | --- | --- | --- | --- | --- |
| Site LearnPress muốn bán membership qua WooCommerce vì đã dùng Woo checkout/gateways. | Value | High | Logic sản phẩm, chưa có customer data. | Test immediately | Landing/product page CTA hoặc beta announcement. | Nếu CTR/beta signup thấp, giảm scope checkout hoặc đổi messaging. |
| Woo Subscriptions cần là dependency bắt buộc cho subscription billing. | Feasibility | High | User answer. | Monitor | Prototype checkout/subscription lifecycle. | Nếu dependency làm setup quá nặng, cần fallback one-time plan. |
| Admin-only configuration đủ cho marketplace release. | Usability | Medium | User answer. | Monitor | Wireframe review với admin flow. | Nếu nhiều site cần instructor tự quản lý, đưa capability matrix vào v1.1. |
| Restrict Content có thể ship sau mà không làm giảm giá trị phase checkout. | Business viability | High | User answer: tách release, Woo trước. | Test immediately | Launch copy chỉ tập trung Woo checkout. | Nếu messaging không đủ hấp dẫn, cần đưa Restrict Content vào roadmap public rõ hơn. |
| Giá tăng bằng cách giảm discount từ 50% xuống 25% không ảnh hưởng conversion mạnh. | Business viability | Medium | Pricing hiện tại có nhưng chưa có elasticity data. | Test eventually | A/B hoặc cohort pricing sau release. | Nếu conversion giảm mạnh, giữ discount cũ cho campaign launch. |

## Market Opportunity Score

Score này là đánh giá nội bộ dựa trên input, không phải dữ liệu thị trường đã verify.

| Factor | Score / 10 | Rationale |
| --- | ---: | --- |
| Pain intensity | 7 | Woo checkout và subscription payment là pain hợp lý với LMS commerce, nhưng chưa có customer evidence. |
| Demand evidence | 3 | User xác nhận chưa validate và không có request cụ thể. |
| Competitive gap | 7 | LearnPress-native membership có gap rõ so với plugin membership generic. |
| Monetization | 6 | Paid add-on đã có giá và kênh ThimPress site, nhưng chưa có revenue projection. |
| Feasibility | 6 | Có nền tảng code hiện tại, nhưng Woo Subscriptions lifecycle phức tạp. |
| Support cost | 4 | Checkout/subscription/refund/access mismatch dễ tạo ticket support. |
| Strategic fit | 8 | Rất phù hợp với LearnPress ecosystem và cross-sell `learnpress-woo-payment`. |

**Market Opportunity Score:** 5.9/10.

**Build Recommendation sơ bộ:** Build with phased scope. Không nên build all-in-one full scope trong một release.

## Search Demand Analysis

Không có web research hoặc search volume source trong input. Dùng potential High/Medium/Low theo intent.

| Keyword | Intent | Traffic Potential | Monetization Potential | Best Content Type | Notes |
| --- | --- | --- | --- | --- | --- |
| learnpress membership | Commercial | Medium | High | Product page | Primary keyword. |
| learnpress woocommerce membership | Commercial | Medium | High | Product page + tutorial | Gần với phase Woo checkout. |
| sell membership with learnpress | Informational/Commercial | Medium | High | Tutorial | Phù hợp launch content. |
| learnpress subscriptions | Commercial | Medium | High | Product page section | Cần nêu dependency Woo Subscriptions. |
| restrict course content wordpress | Informational | Medium | Medium | Blog/tutorial | Phù hợp phase Restrict Content. |
| wordpress lms membership plugin | Commercial | Medium | High | Buyer guide | Có thể target sau khi có proof. |
| woocommerce lms membership | Commercial | Low/Medium | High | Integration article | Tập trung Woo checkout. |
| learnpress restrict content | Commercial | Low/Medium | Medium | Roadmap/product section | Phù hợp phase sau. |

## Competitor Landscape

| Product | Type | Positioning | Pricing Model | Core Features | Strengths | Weaknesses / Gap For LearnPress | Source / Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| WooCommerce Memberships | Direct/indirect | Membership management for WooCommerce stores | Paid plugin | Restriction rules, members, content/product access | Mature Woo workflow, strong restriction UX | Not LearnPress-native; LMS/course lifecycle may need manual mapping. | User input. |
| MemberPress | Direct/indirect | WordPress membership platform | Paid plugin | Membership levels, content restriction, payments | Broad membership feature set | Not LearnPress-native; can feel heavier than LMS add-on. | User input. |
| Paid Memberships Pro | Direct/indirect | WordPress membership plugin | Freemium/paid ecosystem | Levels, checkout, restriction, add-ons | Mature ecosystem | LearnPress integration may not match native plan/member lifecycle. | User input. |
| Restrict Content Pro | Direct/indirect | Content restriction and membership | Paid plugin | Restrict content, memberships, payments | Focused restriction experience | Not specifically designed around LearnPress course/member model. | User input. |
| Woo Subscriptions + manual setup | Alternative | Sell subscription product and manage access manually | Paid dependency + manual work | Recurring billing | Uses Woo-native subscription lifecycle | Manual access mapping and support burden. | User input. |
| LearnPress Woo Payment selling courses | Alternative | Sell individual courses through WooCommerce | Existing integration | Course purchase via Woo | Already in ecosystem | Does not solve plan-based membership access. | User input. |

## Gap Opportunities

| Gap | Opportunity | Phase |
| --- | --- | --- |
| LearnPress customers sell courses individually instead of plans | Make membership plan purchasable through Woo checkout. | Phase 1 |
| Woo checkout benefits are unavailable for membership plan purchase | Use Woo cart, checkout, gateways, tax, invoice, coupon, subscription billing. | Phase 1 |
| Admin lacks LearnPress-native restriction setup | Add Restrict Content table rule builder inside plan edit tab. | Phase 2 |
| Generic membership plugins do not align with LearnPress course/member lifecycle | Position as LearnPress-native all-in-one membership solution. | Phase 1 + 2 |
| Documentation for membership setup can be confusing | English docs with task-based setup for Woo checkout and restriction. | Launch |

## Product Complexity

| Area | Complexity | Reason |
| --- | --- | --- |
| Woo checkout purchase | Medium/High | Must create LP order, link Woo order, preserve member activation and prevent duplicate purchase. |
| Woo Subscriptions lifecycle | High | Active/on-hold/cancelled/expired/payment failed/renewal/switch/resubscribe need careful behavior. |
| Restrict content rule builder | Medium | Admin UX is table-based inside plan edit tab. |
| Restrict content enforcement | High | Content, direct URLs, course objects, guest/member states, message display and edge cases. |
| Backward compatibility | High | Existing LP checkout, plan-course mapping, member lifecycle, profile tab and pricing block must not regress. |
| Documentation and support | Medium | Setup flow has multiple dependencies and states. |

## Risk Assessment

| Risk | Severity | Likelihood | Mitigation |
| --- | --- | --- | --- |
| No market validation | High | High | Treat as strategic build; monitor license revenue and checkout usage after launch. |
| Woo Subscriptions lifecycle creates access mismatch | High | Medium | Require QA matrix for all subscription/order statuses before marketplace release. |
| Guest checkout without account breaks membership activation | High | Medium | Force login/register before membership checkout. |
| Duplicate purchase extends or corrupts membership incorrectly | High | Medium | Block duplicate active membership purchase unless renewal flow is explicitly defined. |
| Restrict Content over-scopes v1 | Medium | High | Ship Woo checkout first, restrict content later. |
| Admin UI becomes too complex | Medium | Medium | Use plan edit tab with table rule builder, no wizard in first restriction release. |
| Support burden from refunds/cancel/subscription state | High | Medium | Add clear docs and QA acceptance criteria. |
| Messaging claims all-in-one before Restrict Content ships | Medium | Medium | Product page must distinguish current release vs roadmap. |

## Build Recommendation

Build with modifications:

| Decision | Scope |
| --- | --- |
| Build now | WooCommerce Membership Checkout as marketplace release. |
| Build later | Restrict Content with admin-only table rule builder in plan edit tab. |
| Validate after launch | License revenue, Woo checkout adoption, support burden, refund/access mismatch. |
| Do not build now | Developer API, Elementor condition, REST/headless restrictions, multisite/multilingual/currency/cache compatibility planning, comparison SEO pages. |

## Assumptions And Open Questions

| Item | Status |
| --- | --- |
| Exact Woo Subscriptions minimum version | Open. Input names Woo Subscriptions but no version. |
| Backend mapping details for Woo status to member lifecycle | Open. User wants backend to decide. |
| Acceptance criteria for backward compatibility | Partially open. User left high-priority answer blank. |
| Search demand | Assumption. No external search data. |
| Pricing impact after discount reduction | Assumption. No conversion data. |

## Next Actions

| Owner | Action |
| --- | --- |
| Product | Freeze phase 1 scope: Woo checkout only, with public roadmap note for Restrict Content. |
| Engineering | Create technical design for Woo order, LP order, subscription status, duplicate purchase and user account rules. |
| Design | Review images in `projects/learnpress-membership/images/` and align plan edit tab + Woo checkout CTA flow. |
| QA | Build status matrix for Woo order/subscription lifecycle and regression matrix for LP checkout. |
| Docs | Prepare English setup docs for Woo checkout and membership dashboard behavior. |
