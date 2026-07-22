# 05 — QA & Documentation: LearnPress Tutor Booking

---

## PHẦN 1: TEST PLAN

### 1.1 Phạm vi kiểm thử

- Manual QA là chính.
- Browser coverage: Chrome, Firefox, Safari, Edge.
- Desktop + mobile.
- Dual-confirm, complaint, admin resolve, commission release là **P0 regression**.

### 1.2 Definition of Ready / Done

**DoR**
- PRD + UX đã chốt dual-confirm lifecycle.
- Staging: LearnPress core + Tutor Booking + (optional) Commission addon.
- Accounts: admin, instructor, student.
- LP Emails tab truy cập được.
- Test data: ≥1 tutor profile, 2 session types, bookings ở các status (confirmed past, awaiting, disputed, completed).
- DB migration 1.0.4 đã chạy (`instructor_confirmed_at`, `revenue_released`, …).

**DoD**
- Code review pass.
- Dual-confirm E2E pass (paid → taught → learned → commission +1).
- Dispute paths pass.
- Docs/output package khớp implementation.
- Architecture doc (`AI-AGENT-FEATURES-ARCHITECTURE.md`) đã cập nhật.

---

## 1.3 Functional Tests

| ID | Area | Kịch bản | Expected |
|---|---|---|---|
| FT-001 | Booking flow | Student book slot hợp lệ + pay | Booking `confirmed` (paid) |
| FT-002 | Slot disabled | Student thấy slot đã quá giờ | Slot disabled, không click được |
| FT-003 | Timezone preview | Chọn timezone khác | Current datetime đổi theo lựa chọn |
| FT-004 | Revenue snapshot | Admin đổi platform share sau hold | Booking cũ giữ share cũ khi release |
| FT-005 | Meeting link fallback | Session type có link riêng | Dùng link session type |
| FT-006 | Meeting link fallback | Session type trống link | Dùng profile default |
| FT-007 | Cancel deadline | Student cancel đúng hạn | Cancel thành công |
| FT-008 | Reschedule deadline | Student reschedule đúng hạn | Reschedule thành công |
| FT-009 | Email config | Vào LearnPress Emails tab | Tutor Booking confirmation emails xuất hiện |
| FT-010 | Dashboard | Booking confirmed, unlock=0 | Student thấy Join Session ngay |
| FT-010b | Meeting unlock | Setting 30 phút; session còn >30p | Không hiện nút Join; có message unlock time |
| FT-010c | Meeting unlock | Setting 30 phút; trong 30p trước start | Hiện Join Session / Open Meeting |
| FT-010d | Default email no URL | Confirmation email after pay (default template) | Body không có meeting URL/href; có notice unlock theo setting minutes |
| FT-010e | Custom email var | Admin inserts `{{meeting_link}}` in LP email body | Variable resolves to real meeting URL |
| FT-011 | **No early payout** | Order paid, chưa dual confirm | Instructor commission balance **không** tăng; UI Pending earn |
| FT-012 | **Confirm Taught** | Instructor past confirmed session | `instructor_confirmed_at` set; status awaiting nếu student chưa confirm |
| FT-013 | **Confirm Learned** | Student confirm + rating 5 + message | `student_confirmed_at`; review created |
| FT-014 | **Dual complete** | Cả hai đã confirm | status `completed`, `revenue_released=1`, commission += snapshot amount |
| FT-015 | **Idempotent release** | Trigger release lần 2 | Không double-credit |
| FT-016 | **Complaint** | Student reason non-empty | status `disputed`; admin filter Disputed |
| FT-017 | **Admin release** | Resolve release_revenue on disputed | completed + revenue released |
| FT-018 | **Admin refund** | Resolve refund | status `refunded`; no revenue |
| FT-019 | **No show** | Instructor marks no-show | status `no_show`; no revenue |
| FT-020 | **Review only** | Completed without review | Leave Review works once |
| FT-021 | **Shortcode rating** | Profile có reviews | Stars + avg + count trên card / header |
| FT-022 | Revenue tab | Instructor login | Balance phản ánh only released |
| FT-023 | Admin revenue | Admin login | Revenue Share + report data |
| FT-024 | Privacy | Export / erase user | Bookings/reviews/complaint fields handled |

---

## 1.4 Permission Tests

| ID | Kịch bản | Role | Expected |
|---|---|---|---|
| PT-001 | Guest mở booking UI | Guest | Yêu cầu login |
| PT-002 | Student xem booking người khác | Student | Bị chặn |
| PT-003 | Instructor confirm taught booking người khác | Instructor | 403 |
| PT-004 | Student confirm-taught | Student | 403 |
| PT-005 | Instructor confirm-learned | Instructor | 403 |
| PT-006 | Student resolve | Student | 403 |
| PT-007 | Admin resolve | Admin | OK |
| PT-008 | Instructor đổi revenue share | Instructor | Không có quyền |
| PT-009 | Guest thấy meeting link | Guest | Không |

---

## 1.5 Edge Case Tests

| ID | Edge case | Kết quả mong đợi |
|---|---|---|
| EC-001 | 2 student chọn cùng slot | Chỉ 1 booking thành công |
| EC-002 | Admin đổi platform share giữa 2 booking | Snapshot tách rõ; release dùng snapshot |
| EC-003 | Student confirm trước instructor | awaiting; finalize khi instructor taught |
| EC-004 | Instructor taught trước student | awaiting; finalize khi student learned |
| EC-005 | Confirm learned không rating | OK; có thể Leave Review sau |
| EC-006 | Complaint empty reason | Reject |
| EC-007 | Legacy completed rows after migration 1.0.4 | `revenue_released=1` backfill |
| EC-008 | Availability end 00:00 | Wrap next day |
| EC-009 | Hold hết hạn | Cleanup deletes hold |
| EC-010 | Commission addon inactive | Dual-confirm vẫn complete; release skip add_commission if function missing |

---

## 1.6 Security Tests

| ID | Test | Mục tiêu |
|---|---|---|
| ST-001 | CSRF / REST nonce | Nonce thiếu thì reject |
| ST-002 | XSS trong review / complaint | Sanitized |
| ST-003 | Booking access | User không xem/mutate booking người khác |
| ST-004 | SQL injection filter | Params sanitize |
| ST-005 | Meeting link exposure | Không lộ link cho guest |
| ST-006 | Resolve endpoint | Chỉ manage_options |

---

## 1.7 Performance Tests

| ID | Test | Target |
|---|---|---|
| PT-P01 | Calendar load | < 3 giây |
| PT-P02 | Bookings list 1000 rows | < 3 giây với pagination |
| PT-P03 | Concurrent hold / book | Chỉ 1 booking thắng |
| PT-P04 | Rating summary per profile | Không N+1 nặng trên shortcode grid |

---

## 1.8 Compatibility Tests

| Browser | Desktop | Mobile |
|---|---|---|
| Chrome | ✅ | ✅ |
| Firefox | ✅ | ✅ |
| Safari | ✅ | ✅ |
| Edge | ✅ | ✅ |

---

## PHẦN 2: DOCUMENTATION OUTLINE

### 2.1 User Docs

| Trang | Nội dung |
|---|---|
| Quick Start | Setup profile, session type, availability |
| Tutor Profile | Tạo profile, timezone, default meeting link |
| Session Types | Giá, duration, meeting link override |
| Availability | Weekly / custom / holiday |
| Booking Flow | Timezone, slot, checkout, paid |
| **Dual confirmation** | Confirm Taught / Confirm Learned; khi nào tiền được cộng |
| **Complaints & admin resolve** | Student khiếu nại; admin release/refund |
| **Reviews & ratings** | Sao + message; shortcode hiển thị |
| Revenue Share | Snapshot %; pending vs earned |
| LearnPress Emails | Tutor Booking emails nằm ở đâu |
| Cancel / Reschedule | Deadline |
| Admin Bookings | Filters awaiting/disputed; resolve actions |
| GDPR | Export / erase |

### 2.2 Troubleshooting

| Vấn đề | Nguyên nhân phổ biến | Giải pháp |
|---|---|---|
| Không thấy slot | Availability chưa có | Kiểm tra weekly/custom/holiday |
| Slot click không được | Slot quá giờ hoặc conflict | Behavior đúng |
| Instructor chưa thấy tiền sau payment | Dual-confirm chưa xong | Pending earn; cần Confirm Taught + student learned |
| Commission tăng sớm khi pay | Bug regression | Fail — revenue chỉ sau release |
| Stuck awaiting confirmation | Một phía chưa confirm | Nhắc user hoặc admin force complete |
| Dispute không xử lý | Admin chưa resolve | Admin list → Release/Refund/… |
| Confirmation email không trong LP Emails | Plugin/cache | Kiểm tra integration |
| Revenue booking cũ không đổi % | Snapshot rule | Đúng hành vi |
| Meeting link rỗng | Chưa set session/profile | Thêm fallback link |
| Shortcode không có sao | Chưa có review approved | Book + dual confirm + review |

### 2.3 FAQ

| Câu hỏi | Trả lời |
|---|---|
| Có cần WooCommerce không? | Không |
| Student trả tiền xong instructor có tiền ngay? | Không. Cần dual confirm (hoặc admin release). |
| Admin đổi revenue share có ảnh hưởng booking cũ? | Không — snapshot. |
| Student khiếu nại thế nào? | Past session → Complaint + reason → admin xử lý. |
| Có cho chọn slot đã hết giờ không? | Không |
| Meeting link lấy từ đâu? | Booking → session type → profile |
| Vì sao chưa thấy nút Join? | Setting unlock N phút trước start | Đợi đến cửa sổ hoặc set minutes = 0 |
| Email có gửi link Zoom không? | Default: không | Chỉ nhắc unlock trên dashboard. Admin custom template có thể chèn `{{meeting_link}}` |
| Rating lấy từ đâu? | Review sau confirm learned / completed |
| Default timezone? | WordPress timezone |

---

## Assumptions, Decisions, And Validation Items

- **Decision:** Slot past/started disabled.
- **Decision:** Paid ≠ earned; dual-confirm gate revenue.
- **Decision:** Revenue share snapshot bắt buộc trong QA.
- **Decision:** Confirmation emails trong LearnPress Emails tab.
- **Decision:** Midnight-end availability wrap next day.
- **Decision:** Admin manual resolve; no auto-timeout v1.

## Next Actions

| Action | Owner | Deadline |
|---|---|---|
| Chạy suite FT-011 → FT-021 | QA | Sprint hiện tại |
| Verify migration 1.0.4 on staging | Engineering | Ngay |
| Update public user docs dual-confirm | Docs | Sprint hiện tại |
