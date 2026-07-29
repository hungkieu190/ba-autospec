# 07. Executive Build-or-Not-Build Decision Report — LearnPress Cookie Consent

---

## 1. Quyết định phê duyệt chính thức (Executive Recommendation)

> [!IMPORTANT]
> **KHUYẾN NGHỊ CUỐI CÙNG: BUILD NOW (TRIỂN KHAI PHÁT TRIỂN NGAY)**
> 
> Tích hợp tính năng **LearnPress Cookie Consent** trực tiếp vào **LearnPress Core** trong bản phát hành tiếp theo. Đây là quyết định mang tính chiến lược bắt buộc nhằm đảm bảo tính cạnh tranh, giảm tỷ lệ gỡ bỏ plugin và nâng cao chất lượng trải nghiệm người dùng toàn cầu.

---

## 2. Lý do NÊN Triển khai & KHÔNG NÊN Bỏ qua (Why / Why Not Analysis)

### Tại sao NÊN Triển khai ngay (Why Build Now):
1. **Lấp đầy khoảng trống cạnh tranh với Tutor LMS:** Tutor LMS đã có tính năng Cookie Consent native. Nếu LearnPress tiếp tục yêu cầu người dùng cài plugin ngoài, sản phẩm sẽ bị đánh giá là thiếu hoàn thiện và kém cạnh tranh hơn.
2. **Chi phí phát triển thấp, Giá trị mang lại cao:** Kiến trúc kỹ thuật đơn giản (100% Client-side JS, không cần backend phức tạp), ước tính thời gian phát triển chỉ từ **1.5 đến 2 tuần làm việc (Sprint)**.
3. **Cắt giảm chi phí hỗ trợ (Support Overhead):** Giảm ngay lập tức ước tính **40% số lượng ticket hỗ trợ** liên quan đến xung đột giữa LearnPress và các plugin Cookie bên thứ ba (vỡ layout bài học, lỗi cache, trang bị chậm).
4. **Gia tăng độ gắn kết khách hàng (Retention Rate):** Người dùng muốn giải pháp "Bật là chạy". Việc cung cấp sẵn Cookie Consent giúp quy trình onboarding website mới nhanh hơn, tăng độ hài lòng người dùng.

### Phân tích rủi ro nếu KHÔNG Triển khai (Strategic Risk of NOT Building):
- Người dùng thị trường EU/UK tiếp tục phàn nàn và có xu hướng chuyển dịch sang Tutor LMS hoặc các giải pháp LMS SaaS (như Teachable, Thinkific) có sẵn công cụ tuân thủ pháp lý.
- Tiếp tục gánh chịu chi phí hỗ trợ kỹ thuật do xung đột plugin ngoài phát sinh sau mỗi bản cập nhật lớn của WordPress hay LearnPress Core.

---

## 3. Phân tích tài chính & ROI (Financial & Investment Analysis)

### Ước tính Chi phí Phát triển (Estimated Development Cost)

| Hạng mục nhân sự | Số ngày công (Man-Days) | Ghi chú nhiệm vụ |
| --- | --- | --- |
| **Product / BA** | 2 Man-Days | Chi tiết hóa PRD, Legal Consents rules và Consent Audit Log specs. |
| **UI/UX Designer** | 2.5 Man-Days | Thiết kế Admin Sub-tabs (Legal Consents, Audit Log) & Form frontend. |
| **Frontend Dev (JS/CSS)** | 6 Man-Days | Lập trình Vanilla JS script, Modal accessible, Form injectors. |
| **Backend Dev (PHP)** | 4.5 Man-Days | Lập trình Admin Settings API, DB Audit Logs table, CSV Exporter, PHP Hooks. |
| **QA / Tester** | 3.5 Man-Days | Test kịch bản WCAG 2.1 AA, Page Cache, CSV Export, Legal Consents. |
| **Technical Writer** | 1 Man-Day | Trình bày bộ tài liệu 5 chuyên đề hướng dẫn người dùng & dev. |
| **Tổng nỗ lực (Total Effort)** | **19.5 Man-Days (~3.9 tuần-người)** | **Chi phí hợp lý, hoàn thiện 100% đối sánh tính năng với Tutor LMS.** |

### Ước tính Chi phí Bảo trì (Estimated Maintenance Cost)
- **Thấp (Low):** Hầu như không tốn chi phí server/cloud vì module chạy 100% self-hosted trên website khách hàng. Ước tính chỉ cần **0.5 Man-Day/tháng** cho việc kiểm tra tương thích khi WordPress ra bản mới.

### Tỷ lệ hoàn vốn (Expected ROI & Commercial Value)
- **Giá trị kinh doanh gián tiếp (Indirect ROI):**
  - Giảm 40% chi phí xử lý ticket hỗ trợ liên quan tới Cookie plugins → Tiết kiệm ước tính **15-20 giờ làm việc/tháng** của team Support.
  - Bảo vệ thị phần của LearnPress Core tại thị trường Châu Âu và Bắc Mỹ.
  - Nâng điểm đánh giá 5 sao trên WordPress.org nhờ trải nghiệm hoàn chỉnh "All-in-One".

---

## 4. Bảng tổng hợp các tiêu chí quyết định (Decision Matrix)

| Tiêu chuẩn đánh giá | Trạng thái | Đánh giá tác động |
| --- | --- | --- |
| **Nhu cầu thị trường (Market Demand)** | ✅ Rõ ràng | Nhu cầu lớn từ thị trường EU/UK và người dùng toàn cầu. |
| **Khả thi kỹ thuật (Technical Feasibility)** | ✅ Dễ dàng | Đã chốt phương án 100% Client-side JS, tương thích Cache 100%. |
| **Độ phù hợp chiến lược (Strategic Fit)** | ✅ Tuyệt đối | Khớp với định hướng biến LearnPress Core thành giải pháp toàn diện. |
| **Cạnh tranh (Competitive Edge)** | ✅ Đạt cân bằng | San bằng khoảng trống tính năng với Tutor LMS. |
| **Rủi ro vận hành (Operational Risk)** | 🟢 Rất thấp | Cấu hình mặc định OFF khi mới nâng cấp, không tác động tiêu cực site cũ. |

---

## 5. Assumptions, Decisions, And Validation Items

### Giả định & Quyết định chính (Decisions)
- **Quyết định 1:** Phê duyệt triển khai phát triển ngay tính năng **LearnPress Cookie Consent** theo đúng phạm vi MVP v1.0 đã định nghĩa trong `02-product-strategy.md` và `03-prd.md`.
- **Quyết định 2:** Đưa tính năng này vào danh sách điểm nhấn chính trong thông cáo ra mắt phiên bản nâng cấp LearnPress Core tiếp theo.

### Hạng mục cần xác minh (Validation Items)
- **Validation 1:** Team QA chuẩn bị sẵn môi trường test tích hợp cùng lúc WP Rocket, LiteSpeed Cache và Cloudflare để kiểm thử ngay khi dev bàn giao bản Alpha.

---

## 6. Kế hoạch hành động triển khai (Execution Plan & Next Actions)

1. **Tuần 1 (Kickoff & Design):**
   - Chốt thiết kế UI Admin và Banner Frontend theo wireframe `04-ux-and-wireframe.md`.
   - Tạo Asana Task chính thức từ file `asana-task.html`.
2. **Tuần 2 (Development):**
   - Tiến hành lập trình Backend PHP Settings và Frontend Vanilla JS Module.
   - Triển khai các Custom Event và PHP Hooks cho Developer API.
3. **Tuần 3 (Testing & Documentation):**
   - Thực thi QA Test Plan theo `05-qa-and-documentation.md` (bao gồm kiểm thử WCAG và Cache).
   - Hoàn thiện bộ tài liệu hướng dẫn sử dụng và thông cáo báo chí SEO theo `06-seo-and-marketing.md`.
4. **Tuần 4 (Release):**
   - Đóng gói và phát hành chính thức trong bản cập nhật LearnPress Core mới.
