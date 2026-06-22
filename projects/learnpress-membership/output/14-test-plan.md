# Test Plan — LearnPress Membership v4.1

## Skills Used

- `qa/test-plan.md`
- `product/prd.md`
- `ux/user-flow.md`
- `ux/wireframe-specification.md`

---

## Functional Testing

### Restriction Rules CRUD

| ID | Scenario | Preconditions | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- | --- |
| FT-001 | Tạo restriction rule cho post | Plan active, post tồn tại | Admin > Edit Plan > Protected Content > Add Rule > chọn Post > chọn post > Save | Rule saved, post restricted | P1 |
| FT-002 | Tạo restriction rule cho page | Plan active, page tồn tại | Tương tự FT-001 cho page | Rule saved, page restricted | P1 |
| FT-003 | Tạo restriction rule cho course | Plan active, LP course tồn tại | Tương tự FT-001 cho lp_course | Rule saved, course restricted | P1 |
| FT-004 | Tạo restriction rule cho lesson | Plan active, LP lesson tồn tại | Tương tự FT-001 cho lp_lesson | Rule saved, lesson restricted | P1 |
| FT-005 | Tạo restriction rule cho quiz | Plan active, LP quiz tồn tại | Tương tự FT-001 cho lp_quiz | Rule saved, quiz restricted | P1 |
| FT-006 | Tạo restriction rule cho taxonomy term | Plan active, category tồn tại | Add Rule > chọn Course Category > chọn term "Premium" > Save | Tất cả courses trong "Premium" restricted | P1 |
| FT-007 | Xóa restriction rule | Rule tồn tại | Click Delete rule > confirm > Save Plan | Rule removed, content unrestricted | P1 |
| FT-008 | Sửa restriction mode | Rule tồn tại | Đổi mode từ hide_content_only sang redirect > Save | Mode updated | P1 |
| FT-009 | Tạo rule "All posts" | Plan active | Add Rule > Post > check "All posts" > Save | Tất cả posts restricted | P2 |

### Restriction Enforcement

| ID | Scenario | Preconditions | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- | --- |
| FT-010 | Hide content only — non-member | Post restricted, mode hide_content_only | Non-member truy cập post URL | Thấy title + restricted message + CTA pricing link | P1 |
| FT-011 | Hide content only — member correct plan | Post restricted, user có plan active | Member truy cập post URL | Thấy full content | P1 |
| FT-012 | Hide completely — non-member archive | Post restricted, mode hide_completely | Non-member xem archive/listing | Post không xuất hiện trong listing | P1 |
| FT-013 | Hide completely — WordPress search | Post restricted, mode hide_completely | Non-member search keyword trong post | Post không xuất hiện trong search results | P1 |
| FT-014 | Redirect — non-member | Post restricted, mode redirect, redirect page set | Non-member truy cập post URL | Redirect đến page được chọn | P1 |
| FT-015 | Guest restricted content | Post restricted | Guest truy cập post URL | Thấy restricted message + CTA + login link | P1 |
| FT-016 | OR logic multi-plan | Rule assigned cho Plan A + Plan B | User có Plan B truy cập | Access granted | P1 |
| FT-017 | Taxonomy restriction — all items | Category "Premium" restricted | Truy cập course trong category "Premium" | Restricted | P1 |
| FT-018 | Block/shortcode member content | Page có `[lp_member_content]` block | Member truy cập | Thấy member content | P1 |
| FT-019 | Block/shortcode non-member content | Page có `[lp_non_member_content]` block | Non-member truy cập | Thấy non-member content | P1 |
| FT-020 | Custom restricted message | Rule có custom message | Non-member truy cập | Thấy custom message (không default) | P2 |

### WooCommerce Checkout

| ID | Scenario | Preconditions | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- | --- |
| FT-021 | Add membership to Woo cart | WC product mapped to plan, user logged in | Click "Add to Cart" trên pricing block | Item added to Woo cart | P1 |
| FT-022 | Woo checkout thành công | Item in cart | Complete Woo checkout + payment | Woo order completed, LP order created, member activated | P1 |
| FT-023 | Woo order → LP order mapping | Woo order completed | Check LP orders | LP order có item_type lp_membership, _plan_id, _woo_order_id | P1 |
| FT-024 | Auto membership activation | Woo order completed/processing | Check member status | Member active, courses enrolled | P1 |
| FT-025 | Block duplicate purchase | User đã có Plan A active | Thử add Plan A to Woo cart | Blocked + message "Already active" | P1 |
| FT-026 | Woo order cancelled → deactivate | Member active via Woo | Admin cancel Woo order | Member deactivated/cancelled | P1 |
| FT-027 | Woo order refunded → deactivate | Member active via Woo | Admin full refund Woo order | Member deactivated | P1 |
| FT-028 | Pricing block Woo CTA | Woo mode active | View pricing block/page | CTA shows "Add to Cart" (Woo) not "Buy Now" (LP) | P1 |

---

## Permission Testing

| ID | Scenario | User Role | Action | Expected Result | Priority |
| --- | --- | --- | --- | --- | --- |
| PT-001 | Admin tạo restriction rule | Admin | Tạo rule | ✅ Allowed | P1 |
| PT-002 | Instructor tạo restriction rule | Instructor | Truy cập Protected Content tab | ❌ Tab không hiển thị hoặc access denied | P1 |
| PT-003 | Student tạo restriction rule | Student | Truy cập admin rule endpoint | ❌ Access denied | P1 |
| PT-004 | Admin bypass restriction | Admin | Truy cập restricted content frontend | ✅ Full content visible | P1 |
| PT-005 | Manager bypass restriction | Manager | Truy cập restricted content | Behaviour: xem như non-member (trừ khi có plan) | P2 |
| PT-006 | Guest mua membership | Guest | Click Buy via Woo | Redirect to login/register | P1 |

---

## Regression Testing

| ID | Scenario | Preconditions | Expected Result | Priority |
| --- | --- | --- | --- | --- |
| RT-001 | LP checkout vẫn hoạt động | Woo mode disabled | Student mua membership qua LP checkout → activate đúng | P1 |
| RT-002 | Plan-course mapping giữ nguyên | Existing plans/courses | Courses vẫn mapped đúng sau upgrade | P1 |
| RT-003 | Member lifecycle unchanged | Existing members | Active/expired/cancelled status giữ nguyên | P1 |
| RT-004 | Cron expire/reminder | Existing cron | Cron vẫn chạy đúng | P1 |
| RT-005 | Profile tab membership | Existing tab | Tab hiển thị đúng, không thay đổi | P1 |
| RT-006 | Pricing block/shortcode | Existing shortcode | Hiển thị đúng khi Woo mode off | P1 |

---

## Security Testing

| ID | Scenario | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- |
| ST-001 | Direct URL bypass restriction | Truy cập restricted post URL trực tiếp | Vẫn restricted (không bypass) | P1 |
| ST-002 | REST API bypass restriction | GET /wp/v2/posts/{restricted_id} | Content restricted hoặc 403 | P1 |
| ST-003 | Rule CRUD without nonce | POST rule create request without nonce | Rejected | P1 |
| ST-004 | Rule CRUD wrong capability | Non-admin POST rule create | Rejected | P1 |
| ST-005 | XSS trong custom message | Admin nhập `<script>` trong custom message | Output escaped, script not executed | P1 |
| ST-006 | SQL injection trong rule filter | Inject SQL vào search/filter params | Prepared statement, no injection | P1 |

---

## Performance Testing

| ID | Scenario | Conditions | Target | Priority |
| --- | --- | --- | --- | --- |
| PF-001 | Single post restriction check | 1 restriction rule, 1 post | < 10ms | P1 |
| PF-002 | Archive page restriction filter | 50 rules, 20 posts listing | < 100ms | P1 |
| PF-003 | Site với 500 courses | 100 rules, 500 courses | Page load < 2s total | P2 |
| PF-004 | Cache effectiveness | Repeat restriction check same request | 2nd check < 1ms (cached) | P2 |
| PF-005 | Woo checkout với membership | Standard Woo checkout | No additional delay > 200ms | P2 |

---

## Compatibility Testing

| ID | Scenario | Plugin/Theme | Expected | Priority |
| --- | --- | --- | --- | --- |
| CT-001 | Gutenberg editor — restricted page | Gutenberg | Editor shows full content, not restricted message | P1 |
| CT-002 | Elementor editor — restricted page | Elementor | Editor/preview shows full content | P1 |
| CT-003 | WooCommerce HPOS | WooCommerce latest + HPOS | Order creation/mapping works | P1 |
| CT-004 | Woo Subscriptions latest | Woo Subscriptions latest | Lifecycle mapping works (Phase 4) | P2 |

---

## Edge Cases

| ID | Scenario | Expected Result | Priority |
| --- | --- | --- | --- |
| EC-001 | User có Plan A expired, truy cập restricted content | Restricted — plan expired ≠ active | P1 |
| EC-002 | Content restricted by 2 different plans (OR) | User có 1 plan → access granted | P1 |
| EC-003 | Plan deleted nhưng rule vẫn tồn tại | Rule orphaned → content unrestricted (graceful degradation) | P2 |
| EC-004 | Taxonomy term deleted nhưng rule vẫn tồn tại | Rule orphaned → clean up or ignore gracefully | P2 |
| EC-005 | Woo order status changes rapidly (pending → processing → completed) | Membership activate chỉ 1 lần, không duplicate | P1 |
| EC-006 | User mua 2 plans khác nhau qua Woo | 2 memberships active, access union of both | P1 |
| EC-007 | Lifetime plan — end_date handling | end_date = null, membership never expires | P1 |
| EC-008 | WooCommerce deactivated | Woo checkout disabled gracefully, LP checkout vẫn work | P1 |
| EC-009 | learnpress-woo-payment deactivated | Woo checkout disabled gracefully | P1 |
| EC-010 | Restricted content trong RSS feed | Feed hides restricted content body | P2 |
