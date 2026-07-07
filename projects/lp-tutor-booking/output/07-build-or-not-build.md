# 07 — Build or Not Build: LearnPress Tutor Booking

---

## Quyết định

# ✅ BUILD NOW

**Lý do:** Khoảng trống rõ ràng trong hệ sinh thái LearnPress, strategic fit cao, complexity trong tầm, giá $39/năm có thể validate nhanh. Không có lý do kỹ thuật hoặc thị trường nào đủ mạnh để delay.

---

## 1. Evidence tóm tắt

| Yếu tố | Evidence | Mức độ tin cậy |
|---|---|---|
| Pain tồn tại | Khảo sát nội bộ: instructor dùng email + form + Google Calendar thủ công | Cao — team đã confirm |
| Thị trường có nhu cầu | Logic: LP có > [X] active installs; nhiều LMS site có instructor muốn bán live session | Trung bình — không có số thực |
| Không có native solution | Tutor LMS dùng FluentBooking (plugin 3rd party); LP chưa có add-on nào | Cao — xác nhận |
| Willingness to pay | Quyết định chiến lược nội bộ ($39/năm) | Không cần validate |
| Team có thể build | LP ecosystem đã biết, checkout đã có, email system đã có — cần spike cho booking logic + timezone | Trung bình |

---

## 2. Lý do nên Build

1. **Strategic fit cao:** Core mission của ThimPress là mở rộng LP ecosystem. Add-on này mở revenue stream mới cho cả ThimPress (bán add-on) và instructor (bán live session).

2. **Khoảng trống không có đối thủ native:** Không có add-on nào tích hợp native với LP checkout, LP email, LP dashboard cho booking. Tutor LMS cần plugin thứ 3. LP có lợi thế về depth of integration.

3. **Reuse existing LP infrastructure:** Checkout, payment gateway, email, user roles — tất cả đã có. Cost to build thấp hơn greenfield project.

4. **Instructor pain có bằng chứng:** Team đã khảo sát và confirm instructor đang dùng công cụ thủ công. Pain là thực tế, không phải giả định.

5. **$39/năm là price entry barrier hợp lý:** Thấp hơn Amelia ($79+/năm), WooCommerce Bookings ($249/năm). Dễ convert hơn cho LP site owner.

6. **Khai thác LP user base:** LearnPress có hàng triệu download. Một phần nhỏ user muốn bán live session = thị trường đáng kể mà ThimPress đang bỏ qua.

---

## 3. Lý do cần thận trọng

1. **Pricing $39/năm (Subscription):** Sẽ có Recurring Revenue (LTV cao hơn), nhưng có thể làm giảm tỷ lệ chuyển đổi ban đầu so với one-time. Cần đảm bảo value liên tục để khách hàng gia hạn.

2. **Support cost có thể cao:** Timezone confusion, Google Calendar sync, booking conflict — đây là các vấn đề sinh ticket nhiều. Cần docs tốt từ đầu.

3. **Pricing $39/năm:** Quyết định chiến lược nội bộ, chấp nhận rủi ro thị trường.

4. **Complexity kỹ thuật không nhỏ:** Timezone + conflict detection + Google Calendar + webhook = 4 risk items kỹ thuật. Cần spike đủ trước khi commit.

5. **Không có testimonial / social proof:** Launch cold — không có beta user để quote. Cần build trust qua docs tốt và demo site.

---

## 4. Market Opportunity Score

**7.1 / 10** (từ 01-discovery.md)

| Yếu tố | Điểm |
|---|---|
| Pain intensity | 8/10 |
| Demand evidence | 6/10 |
| Competitive gap | 8/10 |
| Monetization | 7/10 |
| Feasibility | 6/10 |
| Support cost | 6/10 |
| Strategic fit | 9/10 |

---

## 5. Ước tính Development Cost

> **Disclaimer:** Ước tính dưới đây dựa trên complexity analysis từ tài liệu. Chưa có estimate chính thức từ Engineering.

| Module | Ước tính (sprint 1 sprint = 2 tuần) |
|---|---|
| Core booking engine + conflict detection | 2–3 tuần |
| Instructor availability management | 1–2 tuần |
| Booking calendar (frontend) | 2 tuần |
| LP Checkout integration | 1–2 tuần |
| Dashboard (admin, instructor, student) | 2–3 tuần |
| Email notification system | 1 tuần |
| Timezone handling | 1–2 tuần |
| Google Calendar sync | 2–3 tuần |
| Webhook | 1 tuần |
| Review & rating | 1 tuần |
| Mobile responsive QA | 1 tuần |
| **Total estimate** | **~15–20 tuần** |

**Rủi ro lớn nhất về timeline:** Google Calendar + timezone. Nếu 2 module này bị delay, có thể cut sang v1.1.

---

## 6. Ước tính Revenue Potential

| Scenario | Sales/năm | Revenue (Năm 1) | Ghi chú |
|---|---|---|---|
| Conservative | 200 | $7,800 | ~17 sales/tháng |
| Base | 600 | $23,400 | ~50 sales/tháng |
| Optimistic | 1,500 | $58,500 | ~125 sales/tháng |

**Break-even estimate (Base scenario):** Nếu dev cost = $X × 5 tháng + ongoing support, cần ~600 sales để hòa vốn trong năm 1 (assumption — cần real cost data từ team).

---

## 7. Ước tính Maintenance Cost

| Hạng mục | Mức độ | Ghi chú |
|---|---|---|
| LP version update compatibility | Trung bình | Mỗi major LP update cần test |
| Google Calendar API changes | Thấp–Trung bình | Google thỉnh thoảng deprecate API |
| Timezone library updates | Thấp | Stable library |
| Security patches | Thấp | Standard WP plugin maintenance |
| Support ticket volume | Trung bình–Cao | Timezone + calendar = ticket-heavy |

---

## 8. Strategic Fit Assessment

| Tiêu chí | Đánh giá |
|---|---|
| Phù hợp với platform (LearnPress/WP) | ✅ Rất cao |
| Phù hợp với audience (LP site owner) | ✅ Rất cao |
| Không cạnh tranh add-on hiện có | ✅ Không có add-on tương tự |
| Tăng giá trị LP ecosystem | ✅ Có — instructor kiếm thêm, student học thêm |
| Có thể upsell lên LP Pro Bundle | ✅ Phù hợp |
| Không phân tán focus của team | ⚠️ Cần đảm bảo không delay add-on LP khác |

---

## 9. Final Recommendation

**BUILD NOW** — với điều kiện:

1. ✅ **Technical spike hoàn thành trước Sprint 1:** LP Checkout refund flow, timezone architecture, Google Calendar scope phải được validate kỹ thuật trước khi commit full development.

2. ✅ **Clarify Google Calendar scope (v1.0 vs v1.1):** Nếu team không thể build Google Calendar trong v1.0 mà không delay launch, cut sang v1.1 — core booking không phụ thuộc.

3. ✅ **Tiến hành Build ngay:** Quyết định chiến lược từ ThimPress, bỏ qua các bước kiểm chứng thị trường.

4. ✅ **Documentation từ đầu:** Support cost là rủi ro lớn nhất. Đầu tư vào docs/FAQ từ Sprint 2 để giảm ticket volume.

---

## Assumptions, Decisions, And Validation Items

- **Assumption:** Revenue estimate là giả định hoàn toàn — không có benchmark từ add-on LP tương tự.
- **Assumption:** Development cost chưa có estimate từ Engineering.
- **Decision:** Google Calendar nằm trong v1.0, bao gồm sync booking và busy time conflict detection.
- **Quyết định:** Đội ngũ bỏ qua rủi ro thị trường và tiến hành phát triển luôn.

## Next Actions

| Action | Owner | Deadline |
|---|---|---|
| Họp kick-off: confirm scope v1.0 (đặc biệt Google Calendar) | Product + Engineering | Tuần 1 |
| Technical spike: LP Checkout + timezone + Google Calendar | Engineering | Tuần 1–2 |
| Engineering estimation chính thức | Engineering | Sau spike |
| Pre-launch landing page tạo và launch | Marketing | Tuần 2 |
| Confirm định nghĩa DoD với team | Product | Tuần 1 |
