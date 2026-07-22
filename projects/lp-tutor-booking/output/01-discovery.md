# 01 — Khám phá Thị trường: LearnPress Tutor Booking

> **Trạng thái:** Assumption-driven, nhưng các quyết định lõi đã bám theo implementation hiện tại (gồm dual-confirmation + delayed revenue).

---

## 1. Tóm tắt cơ hội

LearnPress đang có khoảng trống rõ ràng ở mảng booking native cho tutor/instructor. Người dùng muốn bán giờ dạy kèm trực tiếp nhưng không muốn ghép thêm Calendly, Google Form, Google Calendar, WooCommerce hay một dashboard riêng. Cơ hội nằm ở một add-on native cho LearnPress: booking, payment, email, dashboard, revenue share, dual confirmation, và timezone handling đều ở trong cùng hệ sinh thái.

Điểm khác biệt quan trọng của sản phẩm hiện tại:

- Revenue share được cấu hình trong admin và snapshot ngay lúc booking được tạo.
- **Instructor chỉ được cộng commission sau dual confirmation** (đã dạy + đã học), không phải ngay khi student thanh toán.
- Student có thể khiếu nại; admin resolve manual (release pay / refund / no-show…).
- Student review (sao + message) gắn với bước confirm learned; shortcode sessions hiển thị average rating.
- Timezone hiển thị theo WordPress timezone, nhưng từng người vẫn thấy giờ theo timezone của họ.
- Slot quá giờ hoặc đã đi qua được disabled, không cho chọn.
- Meeting link có thể là mặc định theo profile, hoặc override theo từng session type.
- Join Session trên dashboard có thể chỉ hiện N phút trước giờ học (admin setting; 0 = hiện ngay sau payment).
- Email cấu hình trong `LearnPress Settings -> Emails`, không phải một hệ mail rời.

---

## 2. Assumption Mapping (VUBF)

| Assumption | Danh mục | Mức độ quan trọng | Bằng chứng hiện tại | Ưu tiên | Cách kiểm chứng nhanh nhất | Ngưỡng quyết định |
|---|---|---|---|---|---|---|
| Instructor cần native booking trong LearnPress | Value | Cao | Phù hợp định vị sản phẩm | Build | Launch | n/a |
| Giá $39/năm đủ hấp dẫn với site owner | Business | Cao | Quyết định chiến lược | Build | Launch | n/a |
| LearnPress Checkout xử lý được booking payment + metadata | Feasibility | Cao | Đã có flow checkout | Test ngay | Spike kỹ thuật | Payment, refund, metadata đi qua được |
| Revenue share phải snapshot theo booking | Business | Cao | Đã được triển khai trong booking row | Test ngay | Regression test | Booking cũ không bị đổi share khi admin sửa setting |
| **Revenue chỉ release sau dual confirm** | Business | Cao | Đã implement `revenue_released` + `lp_commission_add_commission` on dual confirm | Test ngay | E2E payment → taught → learned | Balance instructor không tăng khi mới paid |
| Student sẵn sàng confirm learned + review | Usability | Cao | UI popup confirm + stars | Test ngay | Student dashboard | Completion rate dual-confirm > 70% |
| Complaint + admin resolve đủ cho dispute | Support | Cao | Status `disputed` + admin actions | Test ngay | Manual dispute path | Admin có thể release/refund/no-show |
| Timezone preview phải theo WordPress timezone format | Usability | Cao | Đã có current datetime preview | Test ngay | UI test | Người dùng hiểu họ đang chọn timezone nào |
| Past/started slots phải disabled | Usability | Cao | Đã có logic disable | Test ngay | UI test | Slot quá giờ không thể chọn |
| Meeting link có thể override theo session type | UX | Trung bình | Có fallback chain profile -> session -> booking | Test ngay | Manual test | Session riêng có link riêng hoạt động |
| Email config nằm trong LearnPress Emails tab | Integration | Cao | Đã tích hợp native confirmation email types | Test ngay | Config test | Tutor Booking confirmation emails xuất hiện trong LP Emails |
| Rating trên shortcode tăng conversion | Value | Trung bình | Shortcode sessions hiển thị stars | Monitor | Launch analytics | CTR book slot tăng khi có rating |
| Google Calendar sync có đủ value cho v1 | Technical | Trung bình | Có sync + busy lookup | Monitor | QA staging | Không tạo conflict ngoài ý muốn |
| Support cost vẫn ở mức chấp nhận được | Business | Trung bình | Chưa có dữ liệu thật | Monitor | Sau launch | < 1 ticket / 10 sales |

**Top 1 assumption kỹ thuật cần giữ mắt nhất:** Dual-confirm + delayed commission phải nhất quán: paid ≠ earned; chỉ dual confirm hoặc admin release mới gọi `lp_commission_add_commission`.

---

## 3. Market Opportunity Score

| Yếu tố | Trọng số | Điểm (1-10) | Ghi chú |
|---|---|---|---|
| Cường độ pain | Cao | 8 | Instructor đang phải ghép tool ngoài |
| Bằng chứng nhu cầu | Trung bình | 7 | Pain logic rõ, chưa có số SEO xác thực |
| Khoảng trống cạnh tranh | Cao | 8 | Chưa có native LP booking + dual-confirm payout |
| Khả năng monetize | Trung bình | 8 | $39/site/năm + platform share model |
| Khả thi kỹ thuật | Trung bình | 6 | Booking, timezone, dual-confirm, dispute, email đều cần cẩn thận |
| Chi phí support | Trung bình | 5 | Dual-confirm + dispute có thể tăng ticket nếu UX mơ hồ |
| Strategic fit | Cao | 9 | Mở rộng đúng hệ sinh thái LearnPress |

**Market Opportunity Score: 7.7 / 10**

**Build recommendation:** BUILD NOW. Dual-confirm là khác biệt tin cậy cho marketplace-style payout, không chỉ “booking calendar”.

---

## 4. Phân tích đối thủ cạnh tranh

| Sản phẩm | Loại | Positioning | Điểm liên quan |
|---|---|---|---|
| Amelia | WP booking plugin | All-in-one booking | Mạnh nhưng không native LearnPress; payout/dispute không LMS-aware |
| Bookly | WP booking plugin | Flexible booking | Cần ghép thêm để fit LMS |
| Simply Schedule Appointments | WP booking plugin | Simple scheduling | Generic, không hiểu context instructor |
| WooCommerce Bookings | WooCommerce extension | Booking cho store | Không phải đường đi tự nhiên cho LearnPress |
| Tutor LMS + FluentBooking | LMS + third-party booking | LMS-aware nhưng phụ thuộc plugin khác | Benchmark hybrid; dual-confirm payout là điểm khác biệt LP |
| Calendly | SaaS | Scheduling phổ thông | Workaround phổ biến nhưng rời khỏi LP |

Khoảng trống lớn nhất vẫn là: native LearnPress flow, dual-sided session confirmation, delayed instructor payout, student complaint + admin resolve, review/rating trên listing, checkout + email + dashboard cùng một plugin.

---

## 5. Gap Analysis

| Khoảng trống | Mô tả | Cơ hội cho LearnPress Tutor Booking |
|---|---|---|
| Native LP checkout | Không cần rời site để thanh toán | Tăng conversion |
| Delayed revenue until dual confirm | Paid ≠ instructor earned | Giảm dispute payout sai |
| Student complaint + admin resolve | Khi session fail / tutor no-show | Trust marketplace |
| Student review + public rating | Sao + message; shortcode hiển thị avg | Social proof |
| Revenue split theo booking | Admin có thể đổi %; snapshot lịch sử | Dễ kiểm soát payout |
| Session-specific meeting link | Mỗi session type có thể có link riêng | Phù hợp dạy kèm theo môn |
| WordPress timezone preview | Người dùng thấy current datetime | Giảm nhầm giờ |
| Disabled expired slots | Slot quá giờ không thể chọn | Giảm lỗi slot unavailable |
| LP email integration | Email confirmation trong LearnPress Emails tab | Dễ cấu hình và support |

---

## 6. Search Demand Analysis

> **Disclaimer:** Đây vẫn là ước tính intent, chưa có số volume xác thực từ công cụ SEO.

| Keyword | Intent | Tiềm năng | Ghi chú |
|---|---|---|---|
| learnpress tutor booking | Commercial | Cao | Từ khóa sản phẩm chính |
| learnpress booking | Commercial | Cao | Broad, dễ convert |
| wordpress tutor booking plugin | Commercial | Cao | Đối tượng rộng hơn LearnPress |
| learnpress appointment | Commercial | Trung bình | Hợp ngữ cảnh booking |
| tutor payout commission wordpress | Commercial | Trung bình | Gắn dual-confirm / revenue |
| learnpress coaching | Informational | Trung bình | Mở rộng use case |
| tutor booking wordpress | Commercial | Cao | Buyer intent tốt |
| lms booking plugin | Commercial | Trung bình | Niche nhưng relevant |
| how to schedule tutoring sessions wordpress | Informational | Trung bình | Content giáo dục dẫn về product |

---

## 7. Đánh giá rủi ro

| Rủi ro | Loại | Mức độ | Phương án giảm thiểu |
|---|---|---|---|
| Timezone mismatch giữa student và instructor | Technical | Cao | Store UTC, preview theo timezone đã chọn, show current datetime rõ ràng |
| Double-booking | Technical | Cao | Conflict check trong hệ thống + hold logic |
| Revenue share mismatch giữa booking cũ và setting mới | Business | Cao | Snapshot share percent trên booking row lúc tạo hold |
| **Instructor kỳ vọng tiền ngay sau payment** | Business | Cao | UI “Pending earn” vs “Earned”; docs rõ dual-confirm |
| **Booking stuck awaiting_confirmation** | UX | Cao | Badge trạng thái rõ; admin force complete / release pay |
| **Dispute volume cao** | Support | Trung bình | Complaint reason bắt buộc; admin resolve có note |
| Slot hiển thị nhưng thực ra đã quá giờ | UX | Cao | Disable slot past/started ngay từ availability response |
| Meeting link bị mất cho booking cũ | UX | Trung bình | Fallback chain: booking -> session type -> profile |
| Email config rời hệ thống | Support | Trung bình | Đưa mail config vào LearnPress Emails tab |
| LP version changes | Business | Trung bình | Test với LP latest trước mỗi release |

---

## 8. Độ phức tạp kỹ thuật

**Product Complexity Score: 8 / 10**

| Module | Độ phức tạp | Lý do |
|---|---|---|
| Availability management | Cao | Weekly, custom, holiday, wrap-to-next-day |
| Booking conflict detection | Cao | Đồng thời booking + hold + payment |
| Dual confirmation lifecycle | Cao | Hai phía confirm, dispute, admin resolve, status matrix |
| Delayed revenue release | Cao | Snapshot share + commission credit one-shot + flag |
| Timezone handling | Cao | UTC storage, WordPress preview, student/instructor display |
| Review + rating aggregation | Trung bình | One review/booking; avg on shortcode |
| LearnPress Email integration | Trung bình | Native email registry + settings tab |
| Google Calendar sync | Cao | API, busy lookup, retry |
| Dashboard experience | Trung bình | Nhiều role, nhiều trạng thái (confirmed / awaiting / disputed) |

---

## 9. Assumptions, Decisions, And Validation Items

- **Decision:** Giá launch vẫn giữ $39/site/năm.
- **Decision:** Revenue share được snapshot theo từng booking, không hồi tố.
- **Decision:** Payment chỉ đưa booking sang `confirmed`; instructor commission chỉ sau dual confirm hoặc admin release.
- **Decision:** Admin settings dùng WordPress timezone làm default.
- **Decision:** Timezone chooser phải luôn hiển thị current datetime theo lựa chọn hiện tại.
- **Decision:** Past/started slots phải disabled thay vì bị ẩn mơ hồ.
- **Decision:** Email booking của Tutor Booking phải xuất hiện trong LearnPress Emails settings.
- **Decision:** Student complaint → `disputed` → admin manual resolve (không auto-timeout ở v1).
- **Decision:** Meeting join unlock N phút trước start (`lp_tb_meeting_link_visible_minutes`; 0 = ngay sau paid).
- **Decision:** Default confirmation email không nhét meeting URL; `{{meeting_link}}` vẫn có cho admin custom template.

## 10. Next Actions

| Action | Owner | Timing |
|---|---|---|
| E2E dual-confirm + commission release | Engineering + QA | Ngay |
| Verify Pending earn vs Earned UI | QA | Sprint hiện tại |
| Test complaint → admin resolve paths | QA | Sprint hiện tại |
| Test rating hiển thị trên shortcode sessions | QA | Sprint hiện tại |
| Chuẩn hóa timezone preview trên mọi form | Engineering | Ongoing |
| Test disabled slots và availability wrap-to-next-day | QA | Ongoing |
