# 07 - Build Or Not Build

## Final Recommendation

**Decision: Build Now, with phased scope.**

Build the WooCommerce Membership Checkout release first. Do not bundle full Restrict Content into the same marketplace release. Restrict Content should be planned and designed now, but shipped as a later phase.

## Why Build Now

| Reason | Evidence / Assumption |
| --- | --- |
| Strong strategic fit | Existing add-on already has membership plan/member/lifecycle foundation. |
| Clear commerce value | WooCommerce brings gateways, cart, checkout, coupon, tax, invoice and subscription billing. |
| Monetization path exists | Paid standalone add-on with current pricing and planned discount adjustment. |
| Ecosystem value | Reduces need to combine LearnPress with generic membership plugins or manual workflows. |
| Phaseable scope | Woo checkout can ship before Restrict Content, reducing execution risk. |

## Why Not Build Everything Now

| Risk | Impact |
| --- | --- |
| No market validation | Build decision is strategic, not evidence-backed. |
| Woo Subscriptions lifecycle is complex | High QA/support risk if status mapping is not exact. |
| Restrict Content adds major UX/access complexity | Could delay marketplace release. |
| Support burden may rise | Payment/access mismatch issues are costly to support. |
| Marketing may overpromise all-in-one before Restrict Content ships | Product page must separate current release and roadmap. |

## Expected ROI

ROI should be evaluated qualitatively at launch and quantitatively after release.

| ROI Driver | Expected Impact | Confidence |
| --- | --- | --- |
| Increased license revenue | Medium/High | Medium |
| Higher perceived value from Woo checkout | Medium | Medium |
| Better conversion through Woo payment options | Medium | Low/Medium |
| Reduced need for external membership plugins | Medium | Low/Medium |
| Higher support cost | Negative impact | Medium/High |

## Estimated Development Cost

No engineering estimate is available. Use T-shirt sizing until backend design is complete.

| Scope | Estimated Effort | Notes |
| --- | --- | --- |
| Woo checkout plan purchase | Medium/High | Integration with Woo, LP order, membership activation. |
| Woo Subscriptions lifecycle | High | Many statuses and edge cases. |
| CTA updates | Medium | Pricing block, shortcode, course page, restricted message, profile renew button, email. |
| Membership dashboard flow | Low/Medium | User says keep profile logic mostly unchanged. |
| Restrict Content rule builder | Medium/High | Table builder in plan edit tab. |
| Restriction enforcement | High | Access states, messages, content type handling. |
| QA and docs | Medium/High | Required for marketplace release. |

## Estimated Maintenance Cost

| Area | Maintenance Cost | Reason |
| --- | --- | --- |
| WooCommerce compatibility | Medium | Woo updates may affect checkout/order behavior. |
| Woo Subscriptions lifecycle | High | Renewal/cancel/failed payment cases can cause support issues. |
| LearnPress compatibility | Medium | Must preserve membership lifecycle. |
| Restrict Content | Medium/High | Access control bugs are high-impact. |
| Documentation | Medium | Setup docs must stay aligned with dependency versions. |

## Revenue Potential

| Input | Status |
| --- | --- |
| Product type | Paid standalone add-on. |
| Current price | $49 list, about $29 after 50% discount. |
| Planned price direction | Reduce discount to 25% after update. |
| Primary KPI | License revenue. |
| Revenue forecast | Cannot forecast without traffic, conversion, active install or email list data. |

## Strategic Fit

| Dimension | Fit |
| --- | --- |
| LearnPress ecosystem | High |
| WooCommerce ecosystem | High |
| Existing product foundation | High |
| Market evidence | Low |
| Support readiness | Medium |
| Engineering complexity | Medium/High |

## Build Plan

| Phase | Recommendation |
| --- | --- |
| Phase 1 | Build WooCommerce Membership Checkout now. |
| Phase 2 | Build Restrict Content after phase 1 is stable. |
| Phase 3 | Harden subscription lifecycle and support docs based on tickets. |
| Phase 4 | Consider developer docs/API and advanced restriction only if demand appears. |

## Go / No-Go Criteria For Marketplace Release

| Criteria | Required State |
| --- | --- |
| Woo checkout purchase | Passes happy path and failure cases. |
| Woo Subscriptions lifecycle | Status matrix approved and tested. |
| Guest checkout | Login/register required before activation. |
| Duplicate purchase | Prevented or explicitly handled. |
| LP checkout regression | No critical regression. |
| Docs | English setup docs ready. |
| Product page | Does not claim Restrict Content is available until shipped. |

## Assumptions And Open Questions

| Item | Status |
| --- | --- |
| Product will ship despite lack of validation | Confirmed by user. |
| Exact lifecycle mapping | Backend/product open item. |
| Refund/cancel access until end of period | Needs explicit confirmation. |
| Revenue target | Not provided. |

## Next Actions

| Owner | Action |
| --- | --- |
| Leadership/Product | Approve phased build and scope boundaries. |
| Engineering | Estimate phase 1 and create lifecycle design. |
| QA | Prepare lifecycle and regression tests before implementation complete. |
| Marketing | Prepare marketplace release copy for Woo checkout first. |
| Docs | Create English docs before public release. |
