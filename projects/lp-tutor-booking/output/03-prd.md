# 03 — Product Requirements Document: LearnPress Tutor Booking

---

## 1. Objectives

| Objective | Metric | Target (3 tháng sau launch) |
|---|---|---|
| Instructor có thể setup và nhận booking đầy đủ | Booking được tạo thành công | > 85% booking flow hoàn thành |
| Student đặt lịch và thanh toán không rời LP | Checkout completion rate | > 75% |
| Email notification gửi đúng | Delivery rate | > 99% |
| Không có double-booking | Double-booking incidents | 0 |
| Support ticket thấp | Ticket / 10 sales | < 2 trong 3 tháng đầu |

---

## 2. User Stories

### Admin

| ID | User Story |
|---|---|
| US-A01 | Là Admin, tôi muốn xem tất cả booking trên site để có thể quản lý và báo cáo. |
| US-A02 | Là Admin, tôi muốn force cancel hoặc force confirm bất kỳ booking nào để xử lý tranh chấp. |
| US-A03 | Là Admin, tôi muốn export booking data để compliance với GDPR và báo cáo kinh doanh. |
| US-A04 | Là Admin, tôi muốn cấu hình global settings (cancellation policy, buffer time defaults) để site owner kiểm soát behavior. |
| US-A05 | Là Admin, tôi muốn xóa dữ liệu booking của một user theo yêu cầu GDPR để tuân thủ quy định. |

### Instructor

| ID | User Story |
|---|---|
| US-I01 | Là Instructor, tôi muốn tạo tutor profile với availability weekly để student biết tôi có thể dạy khi nào. |
| US-I02 | Là Instructor, tôi muốn tạo nhiều tutor profile (ví dụ: Toán và Tiếng Anh) với lịch và giá khác nhau để quản lý dịch vụ đa dạng. |
| US-I03 | Là Instructor, tôi muốn chặn ngày nghỉ cụ thể mà không ảnh hưởng recurring schedule để linh hoạt. |
| US-I04 | Là Instructor, tôi muốn set buffer time giữa các session để có thời gian chuẩn bị. |
| US-I05 | Là Instructor, tôi muốn định nghĩa multiple session types với giá khác nhau (One-to-One, Group, Consultation...) để phù hợp nhu cầu học. |
| US-I06 | Là Instructor, tôi muốn nhập meeting link một lần cho toàn bộ session type để không phải nhập lại mỗi booking. |
| US-I07 | Là Instructor, tôi muốn nhận email khi có booking mới hoặc booking bị cancel để không bỏ lỡ. |
| US-I08 | Là Instructor, tôi muốn xem dashboard các session sắp tới, hôm nay, đã hoàn thành để quản lý lịch. |
| US-I09 | Là Instructor, tôi muốn set timezone của mình để hệ thống tính giờ chính xác. |
| US-I10 | Là Instructor, tôi muốn đặt giá khác nhau cho mỗi session type để tối ưu doanh thu. |

### Student

| ID | User Story |
|---|---|
| US-S01 | Là Student, tôi muốn xem danh sách tất cả instructor available để tìm người dạy phù hợp. |
| US-S02 | Là Student, tôi muốn xem profile instructor bao gồm lịch khả dụng và giá để quyết định book. |
| US-S03 | Là Student, tôi muốn chọn session type, duration, và time slot từ calendar để đặt lịch. |
| US-S04 | Là Student, tôi muốn thanh toán qua LearnPress Checkout để không cần tài khoản thanh toán riêng.
- Trạng thái ban đầu: `Pending`.
- Sau khi LearnPress Checkout thanh toán thành công → trạng thái đổi thành `Confirmed`.
- Nếu thanh toán thất bại/hủy → trạng thái `Cancelled`.
- Nếu Admin hoàn tiền LP Order → trạng thái tự động `Refunded`. Slot có thể mở lại (theo config). |
| US-S05 | Là Student, tôi muốn nhận email xác nhận booking với meeting link để biết mình đã đặt thành công. |
| US-S06 | Là Student, tôi muốn có nút "Join Meeting" trong dashboard của mình để join session dễ dàng. |
| US-S07 | Là Student, tôi muốn cancel booking trước 24h (configurable) để linh hoạt kế hoạch. |
| US-S08 | Là Student, tôi muốn reschedule booking sang slot khác còn available để thay đổi lịch khi cần. |
| US-S09 | Là Student, tôi muốn thấy giờ session theo timezone của mình để không nhầm lẫn. |
| US-S10 | Là Student, tôi muốn gửi review và rating sau khi session Completed để giúp instructor và student khác. |

---

## 3. Functional Requirements

| ID | Yêu cầu | Priority | Role | Ghi chú |
|---|---|---|---|---|
| FR-001 | Instructor tạo được tutor profile với tên, mô tả, ảnh | P0 | Instructor | CPT hoặc user meta |
| FR-002 | Instructor tạo được nhiều tutor profile (nhiều môn/dịch vụ) | P1 | Instructor | Multiple profiles per user |
| FR-003 | Instructor thiết lập được weekly recurring schedule (theo từng ngày trong tuần) | P0 | Instructor | |
| FR-004 | Instructor thiết lập được custom available dates (ngoài schedule) | P1 | Instructor | Override weekly |
| FR-005 | Instructor block được ngày nghỉ cụ thể mà không ảnh hưởng recurring schedule | P0 | Instructor | Date-specific exception |
| FR-006 | Instructor set được buffer time giữa các session (ví dụ: 15 phút) | P1 | Instructor | Configurable per profile |
| FR-007 | Instructor set được minimum booking notice (ví dụ: book trước ít nhất 2h) | P1 | Instructor | |
| FR-008 | Instructor set được maximum advance booking period (ví dụ: book trước tối đa 60 ngày) | P1 | Instructor | |
| FR-009 | Instructor tạo được multiple session types với tên và mô tả riêng | P0 | Instructor | One-to-One, Group, Consultation, v.v. |
| FR-010 | Instructor set được giá riêng cho từng session type | P0 | Instructor | Fixed price per duration |
| FR-011 | Instructor set được multiple duration options (30, 60, 90 phút) | P0 | Instructor | |
| FR-012 | Instructor nhập meeting link một lần per session type | P0 | Instructor | Không auto-generate trong v1.0 |
| FR-013 | Instructor set được timezone của mình trong settings | P0 | Instructor | |
| FR-014 | Student xem được danh sách instructor available trên trang listing | P0 | Student | |
| FR-015 | Student xem được tutor profile trên trang riêng của instructor | P0 | Student | |
| FR-016 | Student xem booking calendar với available slots đã được filter đúng timezone student | P0 | Student | Display theo student timezone |
| FR-017 | Student chọn session type, duration, ngày, giờ từ calendar | P0 | Student | |
| FR-018 | Student hoàn thành booking qua LP Checkout flow (booking → checkout → payment → confirmation) | P0 | Student | |
| FR-019 | Booking tự động được confirm sau khi payment thành công | P0 | System | Không cần manual approval |
| FR-020 | Hệ thống detect và prevent double-booking (cùng instructor, cùng slot) | P0 | System | DB-level lock + atomic check |
| FR-021 | Group session có slot tối đa do instructor thiết lập; **tự động confirm** khi đủ số lượng slot. Nếu session bắt đầu mà chưa đủ người → **proceed** | P1 | System | |
| FR-022 | Student nhận email xác nhận booking với thông tin session và meeting link | P0 | System | LP email template |
| FR-023 | Student nhận email reminder trước session (configurable: ví dụ 1h, 24h) | P1 | System | |
| FR-024 | Student nhận email khi booking bị cancel | P0 | System | |
| FR-025 | Instructor nhận email khi có booking mới | P0 | System | |
| FR-026 | Instructor nhận email khi booking bị cancel | P0 | System | |
| FR-027 | Student có thể cancel booking với điều kiện trước deadline (default 24h, configurable) | P0 | Student | |
| FR-028 | Student có thể reschedule booking sang slot mới còn available, với điều kiện còn trước deadline | P1 | Student | |
| FR-029 | Reschedule deadline: mặc định **24 giờ** trước session (configurable bởi Admin trong global settings) | P1 | Admin | Giống cancellation deadline |
| FR-030 | Booking Lifecycle | Trạng thái: Pending → Confirmed → Completed / Cancelled / No Show / Refunded (Tự động chuyển khi LP Order hoàn tiền). | P1 | Backend |
| FR-031 | Auto "No Show" | Nếu sau 30 phút kể từ giờ kết thúc mà không đổi trạng thái → tự động "No Show". | P2 | Backend |
| FR-032 | Booking Calendar Sync | Instructor thấy booking trong lịch của mình. Slot tương ứng bị block. | P1 | System |
| FR-033 | Meeting Link Display | Hiển thị nút "Join Meeting". Admin có option cấu hình: (1) Ngay sau khi thanh toán (Mặc định) hoặc (2) Chỉ hiển thị trước X phút. | P1 | System |
| FR-034 | Instructor xem được Upcoming, Today, Completed, Cancelled sessions | P0 | Instructor | Frontend + wp-admin |
| FR-035 | Admin xem được toàn bộ booking trên site, có thể filter/search | P0 | Admin | |
| FR-036 | Admin có thể force cancel hoặc force confirm bất kỳ booking | P0 | Admin | |
| FR-037 | Admin có thể export booking data (CSV) | P0 | Admin | GDPR + reporting |
| FR-038 | Admin/User có thể xóa booking data theo yêu cầu GDPR | P0 | Admin | |
| FR-039 | Student submit review (rating 1-5 sao + text) sau khi session Completed | P1 | Student | |
| FR-040 | Review chỉ được phép khi booking status = Completed | P1 | System | |
| FR-041 | Google Calendar: **one-way export** — mỗi booking mới được push tự động vào Google Calendar của instructor | P1 | Instructor | V1.0. Two-way sync làm v1.1 |
| FR-041b | **ICS export**: student có thể tải file .ics từ email confirmation hoặc dashboard để thêm vào calendar bất kỳ | P1 | Student | V1.0 — không cần OAuth |
| FR-042 | Conflict detection: chỉ kiểm tra trong hệ thống nội bộ LP trong v1.0 | P0 | System | GCal conflict detection làm v1.1 |
| FR-043 | Webhook | Hệ thống trigger webhook khi: New Booking, Cancelled, Completed. | P3 | System |
| FR-044 | GDPR | Hỗ trợ WordPress Data Export/Erasure cho thông tin booking. | P2 | Backend |
| FR-045 | Instructor Profile Embed | Có thể nhúng danh sách session của instructor vào trang course (qua shortcode/block). | P2 | Frontend |
| FR-046 | Student Booking Limit | Admin có thể giới hạn số session pending/confirmed tối đa của một student. Mặc định: 5. | P2 | System |
| FR-047 | Instructor Earnings Report | Admin Dashboard có màn hình xem tổng doanh thu booking theo từng Instructor (Read-only) để phục vụ payout thủ công. | P1 | Admin |

---

## 4. Non-Functional Requirements

| Loại | Yêu cầu |
|---|---|
| **Performance** | Booking calendar load dưới 3 giây trong điều kiện bình thường. Không có SLA cụ thể từ user — đây là internal target. |
| **Reliability** | Booking creation phải atomic: payment thành công → booking confirmed hoặc rollback rõ ràng. |
| **Security** | Student chỉ thấy/cancel booking của mình. Instructor chỉ manage profile của mình. Admin thấy tất cả. Meeting link chỉ visible với student có booking confirmed. |
| **Compatibility** | LearnPress ≥ 4.4.1. WordPress ≥ 6.0. PHP ≥ 8.0. Không yêu cầu tương thích với LP add-on khác trong v1.0. |
| **Localization** | Timezone handling: store UTC, display theo user timezone. Currency: theo LP site currency. |
| **Maintainability** | Follow LP coding standards. Không override LP core files. |
| **GDPR** | User data có thể export (CSV) và xóa theo yêu cầu. Booking data không được giữ lâu hơn cần thiết. |
| **Browser Support** | Chrome, Firefox, Safari, Edge — mobile + desktop. Không có WCAG requirement. |
| **No Automated Testing** | QA thủ công theo test plan. Không có PHPUnit/Playwright framework requirement. |

---

## 5. Permission Matrix

| Capability | Admin | Instructor (own) | Student (own) | Guest |
|---|---|---|---|---|
| Xem tất cả booking trên site | ✅ | ❌ | ❌ | ❌ |
| Xem booking của mình | ✅ | ✅ | ✅ | ❌ |
| Tạo/chỉnh sửa tutor profile | ✅ | ✅ | ❌ | ❌ |
| Thiết lập availability | ✅ | ✅ | ❌ | ❌ |
| Xem booking calendar của instructor | ✅ | ✅ | ✅ (sau login) | ❌ |
| Tạo booking | ✅ | ❌ | ✅ | ❌ |
| Cancel booking | ✅ | ❌ | ✅ (trước deadline) | ❌ |
| Force cancel bất kỳ booking | ✅ | ❌ | ❌ | ❌ |
| Reschedule booking | ✅ | ❌ | ✅ (trong deadline) | ❌ |
| Xem meeting link | ✅ | ✅ | ✅ (sau confirm + gần giờ) | ❌ |
| Submit review | ❌ | ❌ | ✅ (sau Completed) | ❌ |
| Export booking data | ✅ | ❌ | ❌ | ❌ |
| Xóa booking data (GDPR) | ✅ | ❌ | ❌ | ❌ |
| Cấu hình global settings | ✅ | ❌ | ❌ | ❌ |
| Nhận webhook | ✅ (configure) | ❌ | ❌ | ❌ |

---

## 6. Acceptance Criteria

### AC-001: Booking flow hoàn chỉnh

**Điều kiện trước:** Instructor đã setup tutor profile với availability. Student đã login. Slot còn trống.

**Pass khi:**
- [ ] Student chọn được session type, duration, ngày, slot từ calendar
- [ ] System redirect đến LP Checkout với đúng thông tin session và giá
- [ ] Sau payment thành công, booking status = Confirmed tự động (không manual)
- [ ] Student nhận email xác nhận trong vòng 5 phút
- [ ] Instructor nhận email thông báo booking mới trong vòng 5 phút
- [ ] Booking xuất hiện trong Student Dashboard
- [ ] Booking xuất hiện trong Instructor Dashboard

**Fail khi:** Bất kỳ bước nào không hoàn thành, hoặc booking status không tự động chuyển sau payment.

### AC-002: Double-booking prevention

**Pass khi:**
- [ ] Khi 2 student cùng lúc chọn cùng slot, chỉ 1 booking được tạo thành công
- [ ] Student thứ 2 thấy thông báo "Slot này đã được đặt" và được redirect về calendar để chọn slot khác
- [ ] Không có trường hợp 2 booking confirmed cùng slot

### AC-003: Cancellation

**Pass khi:**
- [ ] Student cancel booking còn > 24h (default) → status = Cancelled, email gửi cho student + instructor
- [ ] Student cancel booking còn < 24h → hệ thống từ chối, hiện thông báo rõ deadline
- [ ] Admin có thể force cancel bất kỳ lúc nào, không cần kiểm tra deadline

### AC-004: Timezone display

**Pass khi:**
- [ ] Booking calendar hiển thị slots theo timezone của student (dùng browser timezone hoặc LP profile timezone)
- [ ] Email confirmation hiển thị thời gian theo timezone student
- [ ] Meeting reminder hiển thị thời gian theo timezone student
- [ ] Instructor dashboard hiển thị session theo timezone instructor đã cài

### AC-005: No Show auto-trigger

**Pass khi:**
- [ ] 30 phút sau khi session end time, nếu không có action từ instructor hoặc student, booking status tự động = No Show
- [ ] Cron job chạy đúng và không bỏ sót booking

### AC-006: GDPR data export

**Pass khi:**
- [ ] Admin có thể export tất cả booking của một user thành file CSV
- [ ] Admin có thể xóa toàn bộ booking data của một user
- [ ] Sau khi xóa, không còn PII của user trong database

### AC-007: Meeting link visibility

**Quyết định:** Pre-condition: Student đã thanh toán thành công.

**Steps:**
1. Student vào Student Dashboard > Tutor Sessions.
2. Kiểm tra hiển thị nút "Join Meeting".

**Pass Criteria:**
- Trạng thái session = `Confirmed`.
- Nút "Join Meeting" hiển thị đúng theo cấu hình của Admin (mặc định là hiển thị ngay lập tức, hoặc tuân thủ rule X phút trước giờ học).
- Click nút → mở tab mới đến URL meeting.

---

## 7. Success Metrics

| Metric | Mục tiêu | Đo lường |
|---|---|---|
| Booking completion rate | > 75% | Số booking tạo thành công / số session checkout initiated |
| Session completion rate | > 85% | Số booking status = Completed / số booking Confirmed |
| Double-booking incidents | 0 | Monitor database |
| Email delivery rate | > 99% | LP email log |
| Support ticket / 10 sales | < 2 | Helpdesk report |
| No Show rate | < 10% | Booking status report |

---

## 8. Dependencies

| Dependency | Loại | Ảnh hưởng | Rủi ro |
|---|---|---|---|
| LearnPress ≥ 4.4.1 | Required | Core integration | LP breaking changes |
| LearnPress Checkout | Required | Payment flow | LP Checkout API stability |
| LearnPress Email System | Required | Notifications | LP email API |
| WordPress Cron | Required | No Show auto-trigger | Cron reliability trên shared hosting |
| Google Calendar API (v1.x) | Optional-P1 | Conflict detection | OAuth, quota, scope |
| Google Calendar API (v1.x) | Optional-P1 | One-way export | OAuth, quota, scope |

---

## Assumptions, Decisions, And Validation Items

> **Cập nhật 07/07/2026:** Cả 5 câu hỏi đã được trả lời bởi Product Owner.

- ✅ **Meeting link visibility:** Hiển thị ngay sau khi Confirmed — đã quyết định.
- ✅ **Reschedule deadline default:** 24 giờ trước session — đã quyết định.
- ✅ **Tutor listing page:** Có trong v1.0, phiên bản đơn giản — đã quyết định.
- ✅ **Group session proceed:** Nếu start time đến mà chưa đủ người → proceed (không cancel) — đã quyết định.
- ✅ **Google Calendar scope:** V1.0 chỉ làm one-way export + ICS export. Two-way sync và GCal conflict detection làm v1.1 — đã quyết định.
- ⚠️ **Assumption còn lại:** Pricing $39/năm chưa được validate với pre-launch page.

## Next Actions

| Action | Owner | Deadline |
|---|---|---|
| Design LP Checkout integration spike | Engineering | Sprint 1 |
| Architecture review: GCal OAuth one-way push flow | Engineering | Sprint 1 |
| Design ICS export flow (email attachment vs download link) | Engineering + Design | Sprint 1 |
| Thiết kế tutor listing page đơn giản | Design | Sprint 2 |
| Validate $39/năm pricing qua pre-launch landing page | Marketing | Trước Sprint 1 |
