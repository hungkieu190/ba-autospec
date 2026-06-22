# Build-or-Not-Build Report — LearnPress Membership v4.1

## Skills Used

- `discovery/market-validation.md`
- `discovery/assumption-mapping.md`
- `product/product-strategy.md`
- `core/quality-review.md`

---

## Should We Build This Product?

### **Yes — Build Now** ✅

---

## Why?

### Lý do Build

| # | Reason | Weight |
| --- | --- | --- |
| 1 | **Strategic necessity** — restrict content và Woo checkout là table-stakes cho mọi membership platform. Thiếu 2 tính năng này, sản phẩm không compete được. | Critical |
| 2 | **Competitive moat** — LP Membership là plugin membership duy nhất native cho LearnPress. Không competitor nào chiếm được vị trí này. | High |
| 3 | **Product owner commitment** — tính năng được xác nhận là bắt buộc, không phụ thuộc market data. | High |
| 4 | **Existing codebase** — plan/member model, LP checkout, pricing block, cron, email đã có. Chỉ cần add restriction engine + Woo bridge. | High |
| 5 | **Revenue upside** — giảm discount từ ~50% → ~25% tăng revenue per license ~33% mà không tăng customer base. | Medium |
| 6 | **Phased release** — 4 phases release độc lập, giảm risk, cho phép validate từng phần. | Medium |
| 7 | **Ecosystem value** — tăng giá trị Pro Bundle, cross-sell với learnpress-woo-payment. | Medium |

### Rủi ro cần quản lý

| # | Risk | Severity | Mitigation |
| --- | --- | --- | --- |
| 1 | Restriction hooks gây side-effects | High | POC test Elementor + Gutenberg + admin + REST trước code |
| 2 | Woo Subscriptions lifecycle phức tạp | High | Phase 4 riêng biệt, mapping table rõ ràng |
| 3 | Support ticket tăng | Medium | Comprehensive docs, FAQ, troubleshooting |
| 4 | Chỉ 20 active sites → small market | Medium | SEO content plan + pricing page optimization |
| 5 | Performance trên large sites | Medium | Cache/memoization, load test trước release |

---

## Expected ROI

| Metric | Estimate | Confidence |
| --- | --- | --- |
| Revenue per license increase | +33% (discount reduction) | High |
| New customers Year 1 | +20-30 `[Assumption]` | Medium |
| Renewal rate improvement | +10-20% (switching cost cao hơn) | Medium |
| Bundle perceived value increase | Yes | High |
| Break-even | 3-6 tháng sau launch `[Assumption]` | Low-Medium |

---

## Estimated Development Cost

| Phase | Scope | Effort | Priority |
| --- | --- | --- | --- |
| Phase 1: Restriction Foundation | DB, models, helpers, settings | 1.5-2 tuần | Must-ship |
| Phase 2: Admin UI + Frontend | Rule UI, content hooks, block/shortcode | 2-3 tuần | Must-ship |
| Phase 3: Woo Purchase MVP | WC product, cart, order mapping, CTA | 2-3 tuần | Must-ship |
| Phase 4: Woo Subscriptions | Trial, lifecycle, renewal | 2-3 tuần | Should-ship |
| QA & Testing | Full test matrix | 1-2 tuần | Must-ship |
| Documentation | 22 doc pages | 1 tuần | Must-ship |
| **Total** | | **10-14 tuần** `[Assumption]` | |

---

## Estimated Maintenance Cost

| Area | Annual Cost |
| --- | --- |
| WordPress/WooCommerce compatibility updates | 1-2 tuần/năm |
| LearnPress core compatibility | 1 tuần/năm |
| Bug fixes + edge cases | 2-3 tuần/năm |
| Support burden increase | +20-30% tickets (giảm dần khi docs mature) |
| Security audits | 0.5 tuần/năm |
| **Total** | **~5-7 tuần/năm** `[Assumption]` |

---

## Revenue Potential

| Scenario | Year 1 Revenue Impact | Year 2 Revenue Impact |
| --- | --- | --- |
| Conservative | +33% per license × existing + 20 new | +33% per license × 50% renewal + 40 new |
| Optimistic | +33% per license × existing + 40 new | +33% per license × 60% renewal + 80 new |

`[Assumption]` — cần actual pricing data để tính revenue cụ thể.

---

## Strategic Fit

| Dimension | Score (1-10) | Notes |
| --- | --- | --- |
| Platform fit (LearnPress ecosystem) | 10 | Native plugin, cùng team, cùng codebase |
| Audience fit | 9 | Existing LP customers + WordPress LMS admins |
| Distribution fit (thimpress.com) | 9 | Existing marketplace, existing customers |
| Capability fit (team expertise) | 8 | Team hiểu LP + Woo architecture |
| Revenue model fit | 8 | Annual subscription, đã có billing system |
| **Average** | **8.8** | |

---

## Final Recommendation

### **Build Now** ✅

| Aspect | Decision |
| --- | --- |
| Decision | Build |
| Priority | High |
| Start | Immediately |
| Release strategy | Phased: Phase 1-2 → Phase 3 → Phase 4 |
| First release | Phase 1-2 (Restriction Engine + Admin UI + Frontend) |
| Conditions | POC test restriction hooks trước Phase 2 development |
| Review point | Sau Phase 2 ship — evaluate adoption trước Phase 3 |

### Rationale

Sản phẩm đáp ứng đầy đủ tiêu chí:
- ✅ Strategic necessity (table-stakes features)
- ✅ Competitive moat (unique LP native position)
- ✅ Revenue upside (discount reduction + new features)
- ✅ Feasible (existing codebase, team expertise)
- ✅ Phased risk reduction (4 independent phases)
- ✅ Product owner commitment (không cần market validation)

Rủi ro chính (restriction hooks, Woo lifecycle) có mitigation plan rõ ràng và POC test trước development.
