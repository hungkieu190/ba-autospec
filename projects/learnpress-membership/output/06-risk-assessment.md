# Risk Assessment — LearnPress Membership v4.1

## Product Idea

Nâng cấp `learnpress-membership` với Restriction Engine + WooCommerce Checkout Integration.

## Evidence Status

Risk assessment dựa trên input, code references đã review, và kinh nghiệm WordPress/WooCommerce development.

## Skills Used

- `discovery/assumption-mapping.md`
- `discovery/market-validation.md`
- `product/prd.md`
- `qa/test-plan.md`

---

## Product Risks

| # | Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| PR1 | Restrict content quá basic so với WooCommerce Memberships → không đủ competitive | Medium | High | Phase 1 focus đúng core: post/page/course/lesson/quiz/taxonomy restriction. Không cần match 100% Woo Memberships ngay, chỉ cần native LP integration tốt hơn. |
| PR2 | 2 checkout modes (LP + Woo) gây confusion cho end user | Medium | Medium | Pricing block auto-detect mode active. Clear docs. Admin chọn 1 mode chính. Không bắt buộc dùng cả 2. |
| PR3 | Trial period implementation phức tạp, edge cases nhiều | Medium | Medium | Trial chỉ support qua Woo Subscriptions (Phase 4). Không build trial riêng trong LP checkout. |
| PR4 | Block duplicate purchase logic có edge cases | Low-Medium | Medium | Kiểm tra user đã có active membership cho plan trước khi cho add to cart. Clear UX message. |

## Technical Risks

| # | Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| TR1 | Restriction hooks (`pre_get_posts`, `the_content`, `the_posts`) gây side-effects: ẩn content trong admin, REST, search, page builder preview | High | High | **POC test ngay.** Hook chỉ fire trên frontend (`!is_admin()`). Bypass cho page builder preview. Whitelist REST endpoints cho admin. Context-aware hook conditions. |
| TR2 | `learnpress-woo-payment` không đủ flexible cho membership item type → cần refactor | Medium | High | Review code `learnpress-woo-payment` filters. Xác nhận `lp_membership` item type được handle. Nếu cần filter mới → coordinate với Woo Payment team. |
| TR3 | Woo Subscriptions lifecycle mapping lỗi: renewal tạo duplicate member, cancel không revoke access | Medium | High | Phase 4 riêng biệt. Mapping table rõ ràng cho mỗi subscription status. Comprehensive test matrix. Rollback logic. |
| TR4 | Performance: restriction rule evaluation chậm trên site lớn (500+ courses, 10k+ posts) | Medium | Medium | Per-request static cache cho user plans. Batch restriction check trên archive pages. DB index cho rules table. Benchmark trước release. |
| TR5 | HPOS (High-Performance Order Storage) compatibility cho Woo | Low-Medium | Medium | Test với Woo Subscriptions version mới nhất. Đảm bảo LP order handler compatible với HPOS. |
| TR6 | Shadow post `lp_membership` conflict khi map sang WC product | Medium | Medium | Quyết định rõ: giữ shadow post cho LP checkout, tạo WC product class riêng cho Woo checkout. Hoặc tận dụng existing mechanism của learnpress-woo-payment. |
| TR7 | `MembershipCheckout::activate_membership()` tính end date sai cho lifetime plan | Low | High | Kiểm tra `billing_type` trước khi set `end_date`. Lifetime plan → `end_date = null`. Unit test cho mỗi billing type. |

## Market Risks

| # | Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| MR1 | Chỉ 20 active sites → market quá nhỏ để justify development cost | Medium | Medium | Feature upgrade tăng conversion từ existing LP users. SEO content plan capture broader audience. Bundle value increase. |
| MR2 | Competitors (MemberPress, Woo Memberships) add LearnPress integration → competitive moat bị xói mòn | Low | High | Ship nhanh. Native integration advantage (cùng codebase, cùng team, cùng ecosystem). Khó cho third-party match quality. |
| MR3 | Khách hàng không muốn trả giá cao hơn (discount giảm từ 50% → 25%) | Medium | Medium | Communicate value rõ ràng: restrict content + Woo checkout = 2 tính năng mới lớn. Comparison page cho thấy LP Membership rẻ hơn competitors. |

## Support Risks

| # | Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| SR1 | Support ticket tăng 30-50% do restrict content edge cases | High | Medium | Comprehensive docs: setup guide, troubleshooting, FAQ. Admin restriction debug/test mode. Clear error messages. |
| SR2 | Woo integration issues khó debug (cross-plugin) | Medium | Medium | Logging cho Woo → LP order mapping. Debug tools cho admin. Clear escalation path khi issue nằm ở Woo hoặc Woo Payment. |
| SR3 | Cache plugin conflicts (restriction check bị cache sai) | Medium | Medium | Document known cache plugin conflicts. Provide cache bypass cho restricted content. Add no-cache headers cho restricted pages. |

## Legal Risks

| # | Risk | Probability | Impact | Mitigation |
| --- | --- | --- | --- | --- |
| LR1 | Copy code structure từ WooCommerce Memberships → GPL/IP risk | Low | High | Chỉ tham chiếu architecture/pattern. Không copy code. Document design decisions independently. |
| LR2 | GDPR/privacy: membership data, access logs, user purchase history | Low | Medium | Follow WordPress data handling standards. No unnecessary PII storage. Add export/erase handlers nếu lưu user data mới. |

---

## Risk Priority Matrix

```
              Impact
              High    │ TR1  TR2  TR3  │ MR2  LR1  TR7
                      │ PR1            │
              ────────┼────────────────┼────────────────
              Medium  │ SR1  PR2  MR3  │ TR4  TR5  TR6
                      │ MR1  PR3  PR4  │ SR2  SR3
              ────────┼────────────────┼────────────────
              Low     │                │ LR2
                      │                │
                      └────────────────┴────────────────
                        High              Low-Medium
                              Probability
```

## Top 5 Risks To Address First

| Priority | Risk | Action | Timeline |
| --- | --- | --- | --- |
| 🔴 1 | TR1 — Restriction hooks side-effects | POC test với Elementor + Gutenberg + admin + REST | Trước Phase 2 |
| 🔴 2 | TR2 — learnpress-woo-payment flexibility | Code review + confirm filters cho `lp_membership` | Trước Phase 3 |
| 🟡 3 | TR3 — Woo Subscriptions lifecycle | Design mapping table + test matrix trước code | Trước Phase 4 |
| 🟡 4 | SR1 — Support ticket increase | Viết docs/FAQ/troubleshooting trước launch | Cùng lúc với development |
| 🟡 5 | PR1 — Feature đủ competitive | Review feature comparison table, xác nhận Phase 1 scope đủ giá trị | Trước Phase 1 finalization |
