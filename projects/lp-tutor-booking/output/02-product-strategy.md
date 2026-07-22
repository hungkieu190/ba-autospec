# 02 — Chiến lược Sản phẩm: LearnPress Tutor Booking

---

## 1. Product Brief

### Tên sản phẩm
**LearnPress Tutor Booking**

### Tagline
*Đặt lịch dạy kèm trực tiếp trong LearnPress — thanh toán, dual-confirm, email, và revenue split ở cùng một nơi.*

### Problem Statement
Instructor dùng LearnPress thường phải ghép thêm tool ngoài để bán session live: lịch khả dụng ở một nơi, thanh toán ở một nơi khác, email ở một nơi khác nữa. Khi có marketplace-style split, còn thêm bài toán: **student đã trả tiền ≠ instructor đã được cộng commission** — cần xác nhận hai phía đã dạy/đã học, khiếu nại, và admin xử lý dispute.

### Giải pháp
Add-on native cho LearnPress cho phép instructor:

- Tạo một tutor profile canonical cho user đó.
- Tạo session type với giá, duration, buffer, status, và meeting link riêng.
- Cấu hình availability theo tuần, custom date, holiday.
- Book qua LearnPress Checkout (student trả tiền → booking paid/`confirmed`).
- **Dual confirmation:** instructor Confirm Taught + student Confirm Learned trước khi session `completed` và instructor được cộng revenue.
- Student review (sao + message) và complaint khi session không thành công.
- Admin resolve manual: release pay, force complete, cancel, refund, no-show.
- Nhận confirmation email từ LearnPress Emails tab.
- Theo dõi pending vs earned revenue, withdrawals, và payout email trong dashboard.
- Shortcode sessions hiển thị bio + average rating.
- Meeting join button unlock N phút trước session (configurable; 0 = immediate after paid).

### Target Audience

**Primary**
- LearnPress site owner muốn bán dịch vụ dạy kèm live (có thể lấy platform share).
- Instructor / tutor / coach đang dùng LearnPress.
- Training center muốn kết hợp course + session live.

**Secondary**
- Student đang học trên LearnPress và cần book thêm giờ học riêng.
- Admin cần báo cáo revenue theo tutor và xử lý dispute.

### User Roles

| Role | Mô tả | Scope chính |
|---|---|---|
| Admin | Quản lý toàn bộ booking, dispute, cấu hình hệ thống | Settings, revenue share, reports, resolve disputes, all bookings |
| Instructor | Profile, availability, session types, confirm taught, payout | Own profile, own sessions, confirm taught, pending/earned |
| Student | Book, pay, join, confirm learned, review, complaint | Browse, book, pay, join, dual-confirm, review, dispute |

---

## 2. Product Shape Hiện Tại

Những phần đã khớp với code hiện tại:

- One canonical tutor profile per user.
- Multiple session types per tutor profile.
- Temporary hold trước checkout.
- Revenue share lưu snapshot theo booking.
- **Revenue release flag** (`revenue_released`) — commission chỉ credit sau dual confirm / admin.
- Statuses: `hold` → `pending_payment` → `confirmed` → `awaiting_confirmation` → `completed` | `disputed` | `no_show` | `cancelled` | `refunded`.
- Meeting link fallback chain: booking -> session type -> tutor profile.
- Timezone preview theo WordPress timezone format.
- Past/started slots disabled.
- Student review + public rating on sessions shortcode.
- Meeting join unlock via `lp_tb_meeting_link_visible_minutes`.
- Default confirmation emails: unlock notice only; `{{meeting_link}}` optional for admin custom body.
- Tutor Booking confirmation email types xuất hiện trong LearnPress Emails settings.

---

## 3. Scope v1.0

### In scope
- Tutor profile management.
- Session type management.
- Weekly availability + custom dates + holiday blocks.
- Timezone-aware slot picker.
- Hold -> checkout -> paid/confirmed booking flow.
- **Dual confirmation (taught + learned)** và delayed revenue release.
- Student review (stars + message) gắn confirm learned / completed.
- Student complaint + admin manual resolve.
- Cancel / reschedule / no-show.
- Revenue tab cho admin và instructor (pending vs earned).
- Admin revenue share setting + snapshot.
- Confirmation email configuration trong LearnPress Emails tab.
- Sessions shortcode: tutor info, bio, rating.
- Google Calendar sync / busy lookup.
- Privacy exporter / eraser.

### Out of scope
- Multi-profile per instructor.
- Packages / credits / subscriptions cho session.
- Auto-generated meeting links qua Zoom/Meet API.
- Recurring sessions.
- Auto-timeout dual-confirm (admin phải resolve manual ở v1).
- Webhook framework riêng.
- Multisite support.
- Comparison landing pages trong docs nội bộ.

---

## 4. Positioning & USP

### Positioning Statement
Cho instructor và site owner đang dùng LearnPress, LearnPress Tutor Booking là add-on native cho phép bán và quản lý session live với **thanh toán, dual-sided confirmation, dispute handling, và revenue control** ngay trong hệ sinh thái LearnPress.

### Unique Selling Proposition
**Native LearnPress booking with trusted dual-confirm payout.**

Điểm mạnh không chỉ là booking. Nó còn là:

- Student paid ≠ instructor earned cho đến khi hai bên xác nhận.
- Revenue split rõ ràng + snapshot lịch sử.
- Complaint + admin resolve.
- Review/rating public trên listing session.
- Email, profile, checkout, dashboard đồng bộ LearnPress.

---

## 5. Revenue Model & Pricing

- **Annual Subscription:** $39 / site / năm.
- **Platform share:** Admin cấu hình % chia sẻ doanh thu.
- **Default behavior:** Platform share = 0% → instructor giữ 100% (sau khi revenue được release).
- **Snapshot rule:** Khi hold được tạo, share % lưu cố định trên booking row.
- **Release rule (quan trọng):**
  1. Student thanh toán → booking `confirmed` — **chưa** cộng commission instructor.
  2. Instructor Confirm Taught + Student Confirm Learned → `completed` + `revenue_released=1` → `lp_commission_add_commission`.
  3. Hoặc admin `release_revenue` / `complete` trên disputed/stuck booking.
  4. `no_show` / `cancelled` / `refunded` → không release (trừ khi admin force release).

### Why this matters
Instructor luôn biết:

- Booking nào đang **Pending earn** vs **Earned**.
- Booking nào thuộc thế hệ revenue share nào (snapshot).
- Payout email nào đang dùng để rút tiền (commission balance chỉ tăng sau release).

---

## 6. Roadmap

### v1.0
| Feature | Priority |
|---|---|
| Canonical tutor profile | P0 |
| Session types with price/duration/buffer | P0 |
| Availability management | P0 |
| Timezone-aware booking UI | P0 |
| Hold + checkout + paid/confirmed flow | P0 |
| Dual confirm taught + learned | P0 |
| Delayed revenue release to commission | P0 |
| Student complaint + admin resolve | P0 |
| Cancel / reschedule / no-show | P0 |
| Revenue share settings + snapshot | P0 |
| Student review + rating on shortcode | P0 |
| LearnPress Emails integration | P0 |
| Google Calendar sync | P1 |
| Privacy exporter / eraser | P1 |

### v1.1+
| Feature | Priority |
|---|---|
| Auto-timeout dual-confirm (e.g. N days → auto-complete or auto-dispute) | P1 |
| More email types (taught reminder, dispute notice) | P1 |
| Richer revenue analytics (pending vs released) | P1 |
| Improved Google Calendar failure recovery | P1 |
| Better dashboard filtering/search | P2 |

---

## 7. Growth Loops

### Loop 1: Course -> Session -> Retention
1. Student mua course.
2. Instructor bán thêm session.
3. Student quay lại học 1:1.
4. Instructor thấy giá trị cao hơn và gắn bó với LearnPress.

### Loop 2: Trusted payout -> More supply
1. Admin set platform share.
2. Instructor chỉ được cộng sau dual confirm → giảm “student claim no class, instructor already paid”.
3. Instructor tin hệ thống và list thêm session.
4. Booking tăng, platform share tăng.

### Loop 3: Review -> Social proof -> Book
1. Student confirm learned + rate stars.
2. Shortcode sessions hiển thị average rating.
3. Student mới book tin cậy hơn.

---

## 8. Success Metrics

| Metric | Mục tiêu 3 tháng | Ghi chú |
|---|---|---|
| Booking payment rate | > 75% | hold/checkout → confirmed (paid) |
| Dual-confirm completion rate | > 70% | confirmed → completed (both sides) |
| Dispute rate | < 10% | disputed / confirmed past sessions |
| Double-booking incidents | 0 | hard fail |
| False payout (paid before dual confirm) | 0 | commission only after release |
| Support ticket / 10 sales | < 2 | timezone, dual-confirm, dispute |
| Revenue tab usage | High | pending vs earned clarity |

---

## 9. Assumptions, Decisions, And Validation Items

- **Decision:** Revenue share + delayed release là phần lõi, không phải addon phụ.
- **Decision:** Dual confirmation bắt buộc trước khi instructor được cộng commission.
- **Decision:** Confirmation email config sống trong LearnPress Emails tab.
- **Decision:** Meeting link cấp session type là first-class, profile link chỉ là fallback.
- **Decision:** Slots past/started phải disabled.
- **Decision:** Timezone preview dùng WordPress timezone làm chuẩn hiển thị.
- **Decision:** v1 không auto-timeout dual-confirm; admin resolve manual.

## 10. Next Actions

| Action | Owner | Timing |
|---|---|---|
| Chuẩn hóa wording Pending earn / Earned / Paid | Product | Ngay |
| E2E dual-confirm + commission credit | Engineering + QA | Ngay |
| Copy dispute / complaint UX | Design + Docs | Sprint hiện tại |
| Landing copy dual-confirm trust | Marketing | Sprint hiện tại |
