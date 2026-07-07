# 05 — QA & Documentation: LearnPress Tutor Booking

---

## PHẦN 1: TEST PLAN

### 1.1 Phạm vi kiểm thử

QA thủ công — không có automated testing framework. Browser coverage: Chrome, Firefox, Safari, Edge (desktop + mobile).

### 1.2 Definition of Ready (DoR) và Definition of Done (DoD)

### Definition of Ready (DoR)
- [ ] PRD đã được approved.
- [ ] Design/Wireframe đã có link và final.
- [ ] Test environments (Staging) đã setup xong với LearnPress core.
- [ ] Dev đã xác nhận completion date cho tính năng.
- [ ] Test data: ≥ 2 instructor account, ≥ 3 student account, ≥ 2 session type đã setup
- [ ] LP Checkout đã được cấu hình với payment gateway test mode
- [ ] Google Calendar test account đã kết nối

### Definition of Done (DoD)
Tiêu chuẩn tối thiểu cho mỗi tính năng:
1. Code Review passed (bởi ít nhất 1 peer).
2. QA manual test passed (Pass toàn bộ Test Cases liên quan).
3. Đã viết Docs hướng dẫn sử dụng.

---

### 1.3 Functional Tests

| ID | Area | Kịch bản | Điều kiện trước | Steps | Kết quả mong đợi | Priority |
|---|---|---|---|---|---|---|
| FT-001 | Booking Flow | Student đặt lịch thành công | Instructor có availability, slot trống | 1. Login → 2. Tìm instructor → 3. Chọn session type → 4. Chọn slot → 5. Checkout → 6. Pay | Booking = Confirmed, email gửi cho cả 2, xuất hiện trong dashboard | P0 |
| FT-002 | Booking Flow | Student đặt nhưng payment thất bại | Như FT-001 | 1-5 như FT-001 → Payment decline | Booking không được tạo, student quay lại checkout, slot vẫn available | P0 |
| FT-003 | Availability | Instructor block holiday | Instructor có weekly schedule cho Thứ 2 | Block Thứ 2 tuần sau | Thứ 2 tuần sau = không available; Thứ 2 tuần sau nữa = vẫn available | P0 |
| FT-004 | Cancellation | Student cancel đúng hạn | Booking Confirmed, còn > 24h | Student click Cancel → Confirm | Status = Cancelled, email gửi cả 2, slot mở lại | P0 |
| FT-005 | Cancellation | Student cancel quá hạn | Booking Confirmed, còn < 24h | Student click Cancel | Hiển thị thông báo "Quá hạn cancel", không cancel | P0 |
| FT-006 | Reschedule | Student reschedule đúng hạn (trước 24h mặc định) | Booking Confirmed, còn > 24h trước session, còn slot mới available | Student chọn Reschedule → Chọn slot mới | Booking cũ cancel, booking mới = Confirmed, email gửi cả 2 | P1 |
| FT-006b | Reschedule | Student reschedule quá hạn (sau 24h) | Booking Confirmed, còn < 24h trước session | Student click Reschedule | Hệ thống từ chối với thông báo "Quá hạn reschedule" | P1 |
| FT-007 | No Show | Auto No Show sau 30 phút | Booking Confirmed, session đã qua | Chờ 30 phút sau session end | Status = No Show tự động | P0 |
| FT-008 | Group Session | Multiple students book cùng group slot | Group session có max 5 slots | 5 student khác nhau book cùng slot | Booking 1-5 = Confirmed; booking 6 = không thể book | P1 |
| FT-009 | Meeting Link | Student thấy Join Meeting button ngay sau Confirmed | Booking vừa payment thành công = Confirmed | Student vào dashboard | Nút "Join Meeting" hiển thị ngay, link đúng | P0 |
| FT-009b | Meeting Link | Student không thấy meeting link khi booking chưa Confirmed | Booking = Pending (chưa pay) | Student vào dashboard | Không có nút Join Meeting hoặc link ẩn | P0 |
| FT-010 | Review | Student submit review sau Completed | Booking = Completed | Student mở review form → nhập rating + text → Submit | Review lưu, xuất hiện trên profile instructor | P1 |
| FT-011 | Review | Student không review khi chưa Completed | Booking = Confirmed (chưa xong) | Student tìm review form | Không có form / form bị disabled | P1 |
| FT-012 | Timezone | Calendar hiển thị đúng timezone student | Student timezone = UTC+7, instructor timezone = UTC | Student xem calendar | Giờ hiển thị đúng UTC+7 | P0 |
| FT-013 | Email | Email gửi đủ và đúng nội dung | Booking được tạo | Check email inbox | Nội dung đúng (tên, ngày, giờ theo TZ student, meeting link) | P0 |
| FT-014 | GDPR Export | Admin export data của 1 user | Admin login, có bookings | Admin → User → Export booking data | CSV download với đúng data | P0 |
| FT-015 | GDPR Delete | Admin xóa data của 1 user | Admin login, có bookings | Admin → User → Delete booking data | Bookings của user bị xóa, không còn PII | P0 |
| FT-016 | Multiple Profiles | Instructor tạo 2 tutor profiles | Instructor login | Tạo profile "Toán" và "Tiếng Anh" với lịch khác nhau | Cả 2 profile live, lịch độc lập | P1 |
| FT-017 | Webhook | Webhook trigger khi booking mới | Webhook URL đã config | Student tạo booking thành công | Webhook nhận POST với đúng payload | P1 |
| FT-018 | Group Session | Group session proceed khi chưa đủ người | Group session max 5 slots, chỉ có 3 student book | Đến giờ session bắt đầu mà chỉ có 3/5 | Session tiến hành bình thường, không tự cancel, không gửi refund email | P1 |
| FT-019 | ICS Export | Student tải ICS file từ dashboard | Booking = Confirmed | Student click "Add to Calendar" | File .ics download với đúng thông tin session (ngày, giờ UTC, title, mô tả) | P1 |

---

### 1.4 Permission Tests

| ID | Kịch bản | Role | Kết quả mong đợi |
|---|---|---|---|
| PT-001 | Guest truy cập booking calendar | Guest | Redirect về login page |
| PT-002 | Student xem booking của student khác | Student | 403 hoặc redirect về dashboard |
| PT-003 | Student cancel booking của người khác | Student | 403 forbidden |
| PT-004 | Instructor xem booking của instructor khác | Instructor | Chỉ thấy booking của mình |
| PT-005 | Instructor cancel booking của student | Instructor | Không có option cancel (chỉ student cancel) |
| PT-006 | Student thấy meeting link của booking khác | Student | Meeting link không hiển thị |
| PT-007 | Admin force cancel bất kỳ booking | Admin | Cancel thành công |
| PT-008 | Admin xem All Bookings | Admin | Thấy tất cả |
| PT-009 | Student submit review khi chưa Completed | Student | Không thể submit |
| PT-010 | Guest xem meeting link qua direct URL | Guest | Không thấy meeting link (401/redirect) |

---

### 1.5 Edge Case Tests

| ID | Edge Case | Kịch bản | Kết quả mong đợi |
|---|---|---|---|
| EC-001 | **Double-booking race condition** | 2 student chọn cùng slot trong vòng 1 giây | Chỉ 1 booking thành công; student thứ 2 thấy "Slot đã được đặt" |
| EC-002 | **Timezone mismatch** | Student UTC+0 book slot của instructor UTC+7 lúc 9:00 AM | Student thấy 2:00 AM UTC (đúng); email hiển thị đúng timezone từng người |
| EC-003 | **Payment success nhưng booking chưa tạo** | Payment webhook đến sau delay 30s | Booking được tạo sau khi webhook đến; idempotency: không tạo 2 lần nếu webhook đến 2 lần |
| EC-004 | **Instructor đặt holiday ngay trong khi có booking pending** | Instructor block ngày đã có booking pending | Warning: "Ngày này đã có booking. Booking hiện tại không bị ảnh hưởng." |
| EC-005 | **Google Calendar one-way export fail** | Google API trả về 500 khi push booking mới | Flag "GCal sync failed" trong instructor dashboard; retry push sau 5 phút |
| EC-006 | **Reschedule sang slot đã bị book** | Slot available khi student chọn → bị book trong lúc student confirm | Toast error "Slot vừa được đặt", quay về calendar |
| EC-007 | **Booking cancellation & Reschedule** | Student cancel trước deadline → trạng thái Cancelled → open slot lại. | Medium |
| EC-008 | **Cron job failure cho "No Show"** | Cron bị disable trên hosting → 30 phút không update status → Admin có thể manual trigger hoặc dùng real cron. | Low |
| EC-009 | **Instructor account deactivated** | Instructor xóa/deactivate tutor profile khi đang có upcoming booking → Hệ thống cảnh báo & giữ nguyên booking cũ cho đến khi hoàn tất/hủy. | High |
| EC-010 | **Google Calendar OAuth Token Expiry** | GCal token hết hạn → Push fail → Hiển thị cảnh báo trong Instructor Dashboard yêu cầu reconnect. | High |
| EC-013 | **LP Order Refund** | Admin hoàn tiền một LP Order → Booking tự động chuyển sang Refunded → Email gửi đi, slot mở lại. | High |

---

### 1.6 Security Tests

| ID | Test | Mục tiêu |
|---|---|---|
| ST-001 | CSRF protection trên tất cả form | Gửi request không có nonce → reject |
| ST-002 | XSS trong review text | Input script tag trong review → sanitized, không execute |
| ST-003 | Direct URL access booking của người khác | Truy cập /booking/{id} của booking không phải mình → 403 |
| ST-004 | SQL injection trong booking filter | Input malicious string trong filter → sanitized |
| ST-005 | Meeting link exposure | Unauthenticated request đến booking detail API → không trả về meeting link |
| ST-006 | Webhook secret validation | Webhook endpoint không validate secret → reject request |

---

### 1.7 Performance Tests

> Không có SLA cụ thể từ yêu cầu. Targets dưới đây là internal baseline.

| ID | Test | Target |
|---|---|---|
| PT-P01 | Booking calendar load (1 instructor, 30 ngày) | < 3 giây |
| PT-P02 | All Bookings list với 1000 bookings | < 3 giây (có pagination) |
| PT-P03 | Concurrent booking (10 students, cùng slot) | 1 booking tạo; 9 reject; không timeout |

---

### 1.8 Compatibility Tests

| Browser | Desktop | Mobile |
|---|---|---|
| Chrome (latest) | ✅ | ✅ |
| Firefox (latest) | ✅ | ✅ |
| Safari (latest) | ✅ | ✅ (iOS) |
| Edge (latest) | ✅ | ✅ |

Test trên: Windows 11, macOS Sonoma, iOS 17, Android 14.

---

## PHẦN 2: DOCUMENTATION OUTLINE

### 2.1 Tài liệu User (Installation & Setup)

| Trang | Nội dung | Audience | Nơi host |
|---|---|---|---|
| Requirements | LP ≥ 4.4.1, WP ≥ 6.0, PHP ≥ 8.0 | Admin | help.thimpress.com |
| Installation & Activation | Upload, activate, license key | Admin | help.thimpress.com |
| Quick Start Guide | 5 bước setup đầu tiên cho instructor | Instructor | help.thimpress.com |
| Setting Up Tutor Profile | Tạo profile, ảnh, bio, subjects | Instructor | help.thimpress.com |
| Configuring Availability | Weekly schedule, custom dates, holidays, buffer | Instructor | help.thimpress.com |
| Creating Session Types | Tạo session type, giá, duration | Instructor | help.thimpress.com |
| Setting Up Meeting Links | Nhập link, best practices cho Zoom/Meet | Instructor | help.thimpress.com |
| Timezone Configuration | Cách set timezone, cách student thấy giờ | Instructor | help.thimpress.com |
| Google Calendar Integration | Connect, sync, troubleshoot | Instructor | help.thimpress.com |
| How to Book a Session (Student) | Browse → Calendar → Checkout → Dashboard | Student | help.thimpress.com |
| Cancelling a Booking | Deadline, steps, refund policy | Student | help.thimpress.com |
| Rescheduling a Booking | Steps, limitations | Student | help.thimpress.com |
| Submitting a Review | Khi nào, cách làm | Student | help.thimpress.com |
| Admin: Managing All Bookings | List, filter, force cancel/confirm | Admin | help.thimpress.com |
| Admin: Global Settings | Cancellation policy, reminder timing, buffer defaults | Admin | help.thimpress.com |
| Admin: GDPR Data Export & Delete | Steps, compliance | Admin | help.thimpress.com |
| Webhook Configuration | Setup, payload format, retry logic | Admin | help.thimpress.com |

### 2.2 Troubleshooting

| Vấn đề | Nguyên nhân phổ biến | Giải pháp |
|---|---|---|
| Calendar không hiển thị slots | Instructor chưa setup availability | Hướng dẫn setup availability |
| Email không gửi | WordPress mail không được cấu hình | Check wp_mail, recommend SMTP plugin |
| Timezone hiển thị sai | Student chưa set timezone, browser auto-detect sai | Cách check và override timezone |
| Google Calendar không sync | OAuth token hết hạn | Reconnect Google Calendar |
| Booking không tự confirm sau payment | Payment webhook chưa được LP xử lý | Check LP order log, retry webhook |
| No Show không trigger | WordPress cron bị disable | Hướng dẫn enable hoặc dùng real cron |
| Meeting link không hiển thị | Instructor chưa nhập link | Thông báo instructor, hướng dẫn nhập |

### 2.3 FAQ

| Câu hỏi | Trả lời |
|---|---|
| Add-on này có tương thích với LearnPress add-on khác không? | Chỉ tương thích với core LP trong v1.0 |
| Tôi có thể dùng Stripe hoặc PayPal không? | Dùng bất kỳ payment gateway nào LP đang hỗ trợ |
| Có freemium version không? | Không — chỉ có 1 phiên bản thương mại $39/năm |
| Tiền thanh toán vào tài khoản ai? | Vào tài khoản site owner — instructor nhận thanh toán từ site owner |
| Tôi có thể dùng với WordPress Multisite không? | Không hỗ trợ Multisite trong v1.0 |
| Add-on có tích hợp với Zoom API không? | Chưa — instructor nhập link thủ công |
| Student có thể book khi chưa đăng nhập không? | Không — phải đăng nhập trước |
| Có thể cài cho nhiều site không? | License hiện tại là 1 site. Liên hệ ThimPress để hỏi multi-site license. |

### 2.4 Changelog Format (v1.0.0)

```
= 1.0.0 =
* Tính năng mới: Instructor Availability Management (weekly recurring, custom dates, holiday blocking)
* Tính năng mới: Booking Calendar cho student
* Tính năng mới: Multiple session types với giá riêng
* Tính năng mới: LearnPress Checkout integration
* Tính năng mới: Booking Management Dashboard (Admin, Instructor, Student)
* Tính năng mới: Email notifications
* Tính năng mới: Meeting link support
* Tính năng mới: Timezone handling
* Tính năng mới: Google Calendar integration
* Tính năng mới: Webhook support
* Tính năng mới: Tutor Review & Rating
* Tính năng mới: GDPR data export và delete
```

---

## Assumptions, Decisions, And Validation Items

- **Assumption:** DoD chưa được định nghĩa → Dùng: Code review passed + QA manual test passed + docs page drafted.
- **Decision:** Google Calendar nằm trong v1.0; QA cần test sync booking và busy time conflict detection.
- **Validation item:** Engineering cần chốt cơ chế retry và trạng thái "sync failed" cho Google Calendar.
- **Validation item:** Engineering cần chốt webhook secret validation: add-on tự generate secret hoặc cho admin nhập.

## Next Actions

| Action | Owner | Deadline |
|---|---|---|
| Định nghĩa chính thức DoD với Engineering + QA | Product | Sprint 1 |
| Setup staging environment với LP 4.4.1 + test data | Engineering | Sprint 1 |
| Tạo test account matrix (admin, 2 instructor, 3 student) | QA | Sprint 1 |
| Bắt đầu viết Quick Start Guide và Installation doc | Docs | Sprint 2 (song song dev) |
| Review troubleshooting list với Engineering (thêm edge case nào chưa?) | QA + Engineering | Sprint 2 |
