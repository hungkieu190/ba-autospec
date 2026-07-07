# 02 — Chiến lược Sản phẩm: LearnPress Tutor Booking

---

## 1. Product Brief

### Tên sản phẩm
**LearnPress Tutor Booking**

### Tagline
*Đặt lịch dạy kèm trực tiếp trong LearnPress — không cần công cụ ngoài.*

### Problem Statement
Instructor trên LearnPress muốn bán dịch vụ dạy kèm 1-1 và nhóm nhỏ, nhưng không có giải pháp native. Họ phải ghép Calendly + Google Form + email + Google Calendar — tạo ra quy trình rời rạc, tốn thời gian và tăng chi phí subscription. Student phải rời khỏi website LearnPress để đặt lịch, làm mất trải nghiệm học.

### Giải pháp được đề xuất
Add-on LearnPress cho phép instructor public lịch khả dụng, nhận booking, thu tiền qua LP Checkout, quản lý session và nhận review — tất cả trong hệ sinh thái LearnPress. Student đặt lịch, thanh toán, join meeting và review tutor mà không rời khỏi website.

### Target Audience

**Primary:**
- LearnPress site owner muốn mở rộng sang live tutoring
- Individual instructor, tutor, coach, mentor, consultant dùng LearnPress
- Online educator muốn bán 1-1 session kèm course

**Secondary:**
- Student đang học trên LearnPress muốn book thêm dạy kèm riêng
- Training center dùng LP để quản lý instructor nội bộ

### User Roles

| Role | Mô tả | Scope chính |
|---|---|---|
| Admin | Quản lý toàn bộ hệ thống booking trên site | View all bookings, override status, manage settings, export data |
| Instructor | Tạo tutor profile, manage availability, nhận booking, host session | Availability, pricing, session management, review reading |
| Student | Tìm instructor, đặt lịch, thanh toán, join meeting, review | Browse, book, pay, join, review |

### Business Value
- Tăng ARPU của LearnPress site owner bằng cách enable revenue stream mới (live session)
- Mở rộng LP ecosystem: instructor không cần rời LP sang SaaS booking
- Tăng giá trị của LearnPress Pro Bundle nếu tích hợp sau
- Tăng retention: instructor có thêm công cụ kiếm tiền → ít rời LP hơn

### Scope (v1.0)
- Instructor availability management (weekly recurring + custom dates + holiday blocking)
- Multiple session types với pricing riêng
- Tutor listing page đơn giản (avatar, tên, môn/subject, giá từ, rating, link profile)
- Booking calendar cho student
- LP Checkout integration (booking → checkout → payment → confirmation)
- Booking management dashboard (admin, instructor, student)
- Meeting link (manual input, nhập 1 lần; hiển thị ngay sau booking Confirmed)
- Email notification (LP email system)
- Tutor review & rating (không có reply trong v1.0)
- Timezone handling (store UTC, display theo student timezone)
- Conflict detection (internal system)
- Google Calendar: **one-way export** lịch booking sang Google Calendar của instructor + **ICS export** cho student
- Webhook support
- GDPR compliance (data export, delete)
- Mobile responsive
- Group session: tự confirm khi đủ slot tối đa; nếu session bắt đầu mà chưa đủ người → **proceed** (không tự cancel)
- Reschedule: student có thể reschedule, deadline mặc định **24 giờ** trước session (configurable)

### Out of Scope (v1.0)
- Coupon/discount cho booking
- Instructor payout / split payment
- Zoom/Google Meet API auto-generate link
- Instructor reply review
- Session packages / credit system
- Recurring sessions
- Google Calendar **two-way sync** (sẽ làm v1.1)
- Conflict detection với Google Calendar (sẽ làm v1.1, sau khi có two-way sync)
- Apple Calendar / Outlook integration
- WordPress Multisite
- Automated testing framework
- WCAG 2.1 AA compliance
- Developer hooks/filters/API docs
- Auto-cancel group session khi chưa đủ người (quá phức tạp: kéo theo refund, reschedule, notification)

---

## 2. Positioning & USP

### Positioning Statement
Dành cho instructor và site owner đang dùng LearnPress, **LearnPress Tutor Booking** là add-on duy nhất cho phép quản lý toàn bộ vòng đời dạy kèm trực tiếp — từ lịch, booking, đến thanh toán và review — ngay trong hệ sinh thái LearnPress, không cần plugin booking ngoài.

### Unique Selling Proposition
**"Native LearnPress integration — một hệ thống, không cần ghép tool."**

Không như Amelia hay Bookly (generic WP booking), không như Tutor LMS + FluentBooking (cần plugin thứ 3), LearnPress Tutor Booking được xây dựng riêng cho LP: dùng LP checkout, LP email, LP profile, LP dashboard — giảm setup, giảm phí subscription, giảm học công cụ mới.

### Product Differentiators

| Differentiator | Mô tả | vs. Competitor |
|---|---|---|
| Native LP integration | Checkout, email, profile, dashboard từ LP | Amelia/Bookly dùng stack riêng |
| LMS-specific session types | Consultation, Mentoring, Exam Review, Office Hour | Generic booking không có vocabulary này |
| Subscription pricing $39/năm | Rẻ hơn so với các đối thủ | Amelia $79+/năm, WC Bookings $249/năm |
| Multiple tutor profiles per instructor | Dạy Toán và Tiếng Anh với lịch/giá khác nhau | Hầu hết booking plugin không support |
| Instructor timezone setting | Student thấy giờ theo timezone của mình | Ít plugin xử lý tốt cả 2 phía |

---

## 3. Revenue Model & Pricing

### Mô hình hiện tại
- **Annual Subscription:** $39 / 1 site / năm
- Không có freemium, không có subscription
- Phân phối độc quyền qua **thimpress.com**
- Tương lai có thể tích hợp vào LearnPress Pro Bundle (chưa quyết định)

### Revenue Projection (Assumption — cần validate)

> Dưới đây là ước tính giả định, không phải dự báo có dữ liệu thực.

| Scenario | Sales/tháng | Revenue/tháng | Revenue/năm |
|---|---|---|---|
| Conservative | 30 | $1,170 | $14,040 |
| Base | 80 | $3,120 | $37,440 |
| Optimistic | 150 | $5,850 | $70,200 |

**Ghi chú:** Với mô hình subscription $39/năm, Life-Time Value (LTV) sẽ cao hơn, nhưng đòi hỏi support và update đều đặn để duy trì tỷ lệ gia hạn (renewal rate).

### Upsell Opportunities (Roadmap)
- Session packages / credit system
- Instructor payout / commission management
- Zoom API auto-generate meeting link
- White-label booking page

---

## 4. Roadmap

### Version 1.0 — Core Booking (Target: MVP)

**Mục tiêu:** Instructor có thể nhận booking, thu tiền, và quản lý session qua LP. Student đặt lịch và join meeting mà không rời LP.

| Feature | Priority | RICE Score (estimate) |
|---|---|---|
| Instructor availability setup (weekly + custom + holiday) | P0 | Cao |
| Tutor booking calendar (student-facing) | P0 | Cao |
| Multiple session types + per-type pricing | P0 | Cao |
| LP Checkout integration (booking → pay → confirm) | P0 | Cao |
| Booking status management | P0 | Cao |
| Email notification (new booking, confirmed, cancelled, reminder) | P0 | Cao |
| Instructor dashboard (wp-admin + frontend) | P0 | Cao |
| Student dashboard (frontend) | P0 | Cao |
| Meeting link (manual input, 1 lần per session type) | P0 | Cao |
| Tutor review & rating (student-side) | P1 | Trung bình |
| Multiple tutor profiles per instructor | P1 | Trung bình |
| Timezone handling (UTC store + student display) | P0 | Cao — risk item |
| Conflict detection (internal) | P0 | Cao — risk item |
| Google Calendar sync | P1 | Trung bình — cần clarify scope |
| Webhook support | P1 | Trung bình |
| GDPR: data export + delete | P1 | Trung bình |
| Mobile responsive | P0 | Cao |

### Version 1.1 — UX & Integration Polish

| Feature | Priority | Lý do |
|---|---|---|
| Google Calendar two-way sync (nếu v1.0 chỉ one-way) | P0 | Complete integration |
| Conflict detection với Google Calendar | P0 | Risk reduction |
| Admin booking management (force cancel/confirm, bulk export) | P0 | B2B use case |
| Instructor review reply | P1 | User request |
| Configurable cancellation policy (beyond 24h default) | P1 | Site owner flexibility |
| Reschedule deadline config | P1 | Site owner flexibility |
| Tutor listing page (browse all instructors) | P0 | Student discovery flow |

### Version 2.0 — Monetization Expansion

| Feature | Priority | Lý do |
|---|---|---|
| Session packages (5 sessions, monthly) | P0 | Revenue expansion |
| Credit system | P1 | Prepay use case |
| Recurring sessions | P1 | Coaching programs |
| Zoom API auto-generate meeting link | P1 | UX improvement |
| Google Meet API auto-generate | P1 | UX improvement |
| Instructor payout / commission tracking | P1 | B2B marketplace use case |
| Coupon/discount support | P2 | Promotion capability |

---

## 5. Growth Loops

### Loop 1: Content/SEO Loop
1. Instructor public tutor profile → Trang profile được index bởi Google
2. Student search "LearnPress tutor" hoặc tên instructor → Tìm thấy profile
3. Student book → Hệ thống hoạt động → Instructor hài lòng → Review/recommend
4. Review công khai → Tăng SEO authority cho tutor profile

**Metric:** Organic traffic đến tutor profile pages; booking từ organic traffic

### Loop 2: Platform Ecosystem Loop
1. LP site owner mua Tutor Booking → Enable tính năng cho instructor
2. Instructor invite student book session → Student join LearnPress
3. Student thấy course của instructor → Mua course
4. Site owner doanh thu tăng → Đầu tư thêm vào LP ecosystem → Mua thêm add-on

**Metric:** Cross-sell rate (booking → course purchase)

**Lưu ý:** Không force growth loop nếu chưa có evidence về loop mechanics. Cả 2 loop trên là giả thuyết cần validate sau launch.

---

## 6. Success Metrics

| Metric | Mục tiêu 3 tháng | Mục tiêu 6 tháng | Ghi chú |
|---|---|---|---|
| Số sales | 50 | 200 | Conservative estimate |
| Active installations | 40 | 160 | ~80% active rate |
| Số booking được tạo | 500 | 5,000 | Tùy mức độ dùng per site |
| Session completion rate | > 85% | > 90% | Đo No Show rate |
| Support ticket / 10 sales | < 2 | < 1.5 | Đo support burden |
| Churn (uninstall) rate | < 20% | < 15% | Monitor trong dashboard |

---

## Assumptions, Decisions, And Validation Items

- **Assumption:** $39 cho 1 site license là price point launch; cần theo dõi conversion và support cost sau launch.
- **Decision:** Google Calendar nằm trong v1.0. Scope gồm sync booking và kiểm tra busy time để chống conflict.
- **Decision:** Add-on được định vị là sản phẩm độc lập ở launch, chưa include trong LearnPress Pro Bundle.
- **Decision:** Tutor listing page nằm trong v1.0 để student tìm instructor.

## Next Actions

| Action | Owner | Deadline |
|---|---|---|
| Clarify Google Calendar scope (v1.0 vs v1.1) | Product | Ngay |
| Clarify Tutor listing page scope | Product | Ngay |
| Design multiple tutor profiles UX | Design | Sprint 2 |
| Validate $39 pricing via pre-launch page | Marketing | Trước sprint 1 |
| Define default cancellation deadline (config = bao nhiêu? range?) | Product | Sprint 1 |
