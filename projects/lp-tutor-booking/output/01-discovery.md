# 01 — Khám phá Thị trường: LearnPress Tutor Booking

> **Trạng thái:** Assumption-driven — chưa có dữ liệu search volume xác thực từ công cụ SEO. Mọi ước tính traffic được đánh dấu là giả định cần kiểm chứng.

---

## 1. Tóm tắt cơ hội

LearnPress hiện thiếu giải pháp native cho việc đặt lịch và bán dịch vụ dạy kèm trực tiếp (live tutoring). Các instructor đang phải dùng thủ công: email, Google Form, Google Calendar — tạo ra trải nghiệm rời rạc và tốn thời gian quản lý. Đây là khoảng trống rõ ràng trong hệ sinh thái LearnPress mà không có add-on nào đang lấp đầy.

---

## 2. Assumption Mapping (VUBF)

| Assumption | Danh mục | Mức độ quan trọng | Bằng chứng hiện tại | Ưu tiên | Cách kiểm chứng nhanh nhất | Ngưỡng quyết định |
|---|---|---|---|---|---|---|
| Nhu cầu dạy kèm 1-1 | Value | Cao | Ý tưởng chiến lược nội bộ, quyết định build không cần khảo sát | Build | Launch | n/a |
| Instructor sẵn sàng trả $39/năm | Value | Cao | Quyết định chiến lược | Build | Launch | n/a |
| LearnPress Checkout đủ xử lý booking | Feasibility | Cao | Dev Team sẽ xử lý (Spike) | Test ngay | Spike kỹ thuật 2 ngày | Refund, partial payment xử lý được |
| Student sẵn sàng book qua website | Value | Trung bình | Ý tưởng chiến lược | Build | Launch | n/a |
| Timezone auto-convert không lỗi | Usability | Cao | Chưa test | Test ngay | Usability test | Không có complaint |
| Conflict detection không lỗi | Feasibility | Cao | Chưa build | Test ngay | Load test | 0 double-booking |
| Support cost ở mức chấp nhận | Business | Trung bình | Tương tự LP addons | Monitor | Ticket volume sau launch | < 1 ticket/10 sales |

**Top 1 assumption kỹ thuật cần test trước khi code:**
1. LP Checkout đủ cho booking payment/refund/metadata → Dev Spike.

---

## 3. Market Opportunity Score

| Yếu tố | Trọng số | Điểm (1–10) | Ghi chú |
|---|---|---|---|
| Cường độ pain | Cao | 8 | Quyết định chiến lược nội bộ (founder vision) |
| Bằng chứng nhu cầu | N/A | 10 | Bỏ qua rủi ro thị trường, muốn build để hoàn thiện hệ sinh thái |
| Khoảng trống cạnh tranh | Cao | 8 | Không có add-on nào native cho LearnPress; Tutor LMS dùng plugin thứ 3 |
| Khả năng monetize | Trung bình | 7 | $39/site/năm — benchmark hợp lý với LP add-on ecosystem |
| Khả thi kỹ thuật | Trung bình | 6 | LP checkout tái dụng được; timezone + conflict detection là rủi ro kỹ thuật chính |
| Chi phí support | Trung bình | 6 | Calendar sync + timezone sẽ sinh ticket — cần docs tốt |
| Strategic fit | Trung bình | 9 | Core mission của ThimPress: mở rộng LP ecosystem; không có add-on cạnh tranh nội bộ |

**Market Opportunity Score: 8.0 / 10 (Adjusted by Strategic Directive)**

**Build Recommendation: BUILD NOW** — Đây là quyết định chiến lược (strategic decision) từ team, bỏ qua các rủi ro validation thị trường. Mục tiêu là hoàn thiện hệ sinh thái LearnPress bằng mọi giá.

---

## 4. Phân tích đối thủ cạnh tranh

> **Lưu ý:** Chỉ sử dụng thông tin competitor có thể xác minh. Pricing và market share cần nguồn chính thức hoặc phải được đánh dấu là dữ liệu cần xác minh.

| Sản phẩm | Loại | Positioning | Pricing Model | Tính năng chính | Điểm mạnh | Điểm yếu | Mức liên quan |
|---|---|---|---|---|---|---|---|
| Amelia | Direct (WP plugin) | Premium all-in-one appointment booking | Từ $79/năm | Calendar, group events, WooCommerce, Zoom | UI đẹp, feature-rich, dùng được nhiều ngành | Không tích hợp native với LearnPress; phức tạp với LMS use case | Cao |
| Bookly | Direct (WP plugin) | Booking plugin linh hoạt cho dịch vụ | Free core + addon | Multiple services, staff, notifications | Phổ biến, nhiều addon | Không phải LMS-focused; cần nhiều addon để đủ tính năng | Cao |
| Simply Schedule Appointments | Direct (WP plugin) | Simple booking cho WordPress | Free + Pro từ $99/năm | Availability, Google Calendar, Zoom | Dễ dùng, tích hợp tốt | Không có LMS context; generic | Trung bình |
| WooCommerce Bookings | Direct (WC extension) | Booking cho WooCommerce stores | $249/năm | Resource booking, time slots, calendar | Tích hợp WC sâu | Không tương thích tốt với LP; cần WooCommerce | Trung bình |
| Tutor LMS + FluentBooking | Direct (LMS add-on) | Booking cho Tutor LMS dùng FluentBooking | Phụ thuộc FluentBooking | Integration với Tutor LMS instructor profile | LMS-aware | Phụ thuộc plugin thứ 3 (FluentBooking); không native | Cao — là benchmark trực tiếp |
| Calendly | Indirect (SaaS) | Scheduling tool cho professionals | Free + Pro $10/tháng | Availability, meeting link, reminder | Rất phổ biến, UX tốt | SaaS riêng biệt; không tích hợp LP payment; tốn thêm subscription | Cao — là workaround phổ biến |
| Acuity Scheduling | Indirect (SaaS) | Booking cho coaches/consultants | Từ $16/tháng | Intake forms, packages, payments | Chức năng phong phú cho coaches | SaaS độc lập; thêm chi phí monthly | Trung bình |

---

## 5. Gap Analysis — Cơ hội khác biệt

| Khoảng trống | Mô tả | Cơ hội cho LearnPress Tutor Booking |
|---|---|---|
| **Tích hợp native LP** | Không có sản phẩm nào tích hợp native với LP checkout, email, student/instructor profile | USP chính: một hệ sinh thái, một dashboard, một payment gateway |
| **Instructor profile trong LMS context** | Booking plugin generic không hiểu concept "instructor đang dạy course nào" | Hiển thị tutor profile cùng với course list; cross-sell course + session |
| **Payment trong LP order** | Booking plugin dùng WooCommerce hoặc Stripe riêng | Tái dụng LP checkout + gateway đã có — giảm ma sát setup |
| **Giá hợp lý cho LP ecosystem** | Amelia $79+/năm, WooCommerce Bookings $249/năm — quá cao cho nhiều LP site | $39/năm — giá cạnh tranh và thấp hơn đáng kể |
| **Student dashboard trong LP** | Plugin ngoài cần dashboard riêng | Student quản lý session ngay trong LP student dashboard |
| **LMS-specific session types** | Generic booking không có "Consultation", "Mentoring", "Exam Review" | Vocabulary phù hợp với LMS use case — tăng relevance |

---

## 6. Search Demand Analysis

> **Disclaimer:** Dưới đây là ước tính intent và tiềm năng — chưa có dữ liệu volume từ Ahrefs/SEMrush. Cần xác nhận trước khi đầu tư SEO.

| Keyword | Intent | Tiềm năng Traffic | Tiềm năng Monetize | Loại content tốt nhất | Ghi chú |
|---|---|---|---|---|---|
| learnpress tutor booking | Commercial | Thấp (brand specific) | Cao | Product page | Target chính — branded term |
| learnpress appointment | Commercial | Thấp | Cao | Product page | Intent rõ ràng: tìm giải pháp trong LP |
| wordpress tutor booking plugin | Commercial | Trung bình | Cao | Product page + comparison | Cạnh tranh với Amelia, Bookly |
| lms appointment booking | Commercial | Thấp-Trung | Cao | Comparison article | Niche nhưng high-intent |
| learnpress booking | Informational/Commercial | Trung bình | Cao | Product page | Core keyword |
| how to schedule tutoring sessions wordpress | Informational | Trung bình | Trung bình | Tutorial | Dẫn đến product |
| amelia alternative for lms | Commercial | Thấp | Cao | Alternative article | *Cần validate — chưa biết có search không* |
| learnpress coaching | Informational | Thấp | Trung bình | Use case article | Expand awareness |
| wordpress booking plugin for tutors | Commercial | Trung bình | Cao | Comparison | High buyer intent |
| one to one tutoring booking wordpress | Commercial | Thấp | Cao | Product page | Long-tail buyer intent |
| learnpress live session | Informational | Thấp | Trung bình | Feature page / tutorial | Educate market |
| online tutoring appointment scheduling | Commercial | Trung bình | Cao | Comparison + tutorial | Generic nhưng relevant |

**Nhóm keyword theo intent:**
- **Transactional / Commercial:** learnpress tutor booking, learnpress booking, wordpress tutor booking plugin → Product page
- **Comparison:** amelia vs learnpress booking, bookly alternative learnpress → *Không tạo comparison page theo yêu cầu*
- **Informational:** how to schedule tutoring sessions, learnpress live session, online tutoring scheduling → Tutorial + use case articles

---

## 7. Đánh giá rủi ro

| Rủi ro | Loại | Mức độ | Khả năng xảy ra | Phương án giảm thiểu |
|---|---|---|---|---|
| Timezone mismatch giữa student và instructor | Technical | Cao | Cao | Luôn store UTC; hiển thị theo timezone student; show cả 2 timezone trong confirmation email |
| Double-booking khi 2 student book cùng slot | Technical | Cao | Trung bình | DB-level locking; atomic transaction khi tạo booking; check conflict trước khi redirect to checkout |
| Payment thành công nhưng booking không được tạo | Technical | Cao | Thấp | Webhook hoặc payment hook từ LP order; idempotency check; async job để verify |
| Google Calendar sync lỗi dẫn đến conflict không detect được | Technical | Cao | Trung bình | Background sync với retry; flag "sync failed" để instructor biết |
| Support ticket cao do timezone confusion | Support | Trung bình | Cao | Docs rõ ràng; UI hiển thị timezone explicitly; tooltip giải thích |
| LP version mới breaking changes | Business | Trung bình | Trung bình | CI test với LP latest; follow LP changelog |
| Instructor không setup meeting link → student không join được | UX | Trung bình | Cao | Validation: block confirmation nếu meeting link chưa nhập; email reminder cho instructor |
| Giá $39 quá thấp → không đủ revenue | Business | Trung bình | Thấp | Monitor revenue vs support cost 3 tháng sau launch |
| Cạnh tranh từ Amelia/Bookly với LP integration plugin | Market | Thấp | Thấp | Tập trung vào LP-native advantage — họ sẽ không rewrite để native LP |

---

## 8. Độ phức tạp kỹ thuật

**Product Complexity Score: 7 / 10**

| Module | Độ phức tạp | Lý do |
|---|---|---|
| Availability management (weekly + custom + holiday) | Cao | Logic overlap, exception handling |
| Booking conflict detection (LP + Google Calendar) | Cao | Concurrent booking, external API |
| Timezone handling | Cao | Store UTC, display per user TZ, DST |
| Google Calendar sync | Cao | OAuth, webhook, bi-directional state |
| LearnPress Checkout integration | Trung bình | Reuse existing flow nhưng cần booking-specific hooks |
| Email notification system | Thấp | Extend LP email |
| Review & Rating | Thấp | Standard post-meta pattern |
| Booking dashboard (instructor + student) | Trung bình | List views, status management |
| Multiple session types + pricing | Trung bình | CPT hoặc meta-based configuration |

---

## Assumptions, Decisions, And Validation Items

- **Assumption:** Không có search data thực — tất cả keyword potential là ước tính theo logic intent. Chiến lược nội bộ bỏ qua rủi ro này.
- **Decision:** Google Calendar sync nằm trong v1.0. Scope gồm sync booking với Google Calendar và kiểm tra Google Calendar busy time để tránh conflict.
- **Decision:** Reschedule deadline mặc định là 24 giờ trước session và có thể config.

## Next Actions

| Action | Owner | Timing |
|---|---|---|
| Engineering Spike: LearnPress Checkout integration | Engineering | Ngay |
| Finalize configurable range for cancel/reschedule deadline | Product | Sprint planning |
| Timezone architecture review: UTC store + per-user display | Engineering | Sprint 1 |
