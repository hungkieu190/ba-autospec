# 01. Discovery & Market Validation — LearnPress Cookie Consent

---

## 1. Tổng quan & Đánh giá cơ hội thị trường (Market Opportunity Score)

Dự án **LearnPress Cookie Consent** được đề xuất phát triển như một tính năng tích hợp trực tiếp (native feature) trong **LearnPress Core**. Tính năng này giúp các website tạo khóa học trực tuyến tuân thủ các quy định về bảo vệ dữ liệu riêng tư (như GDPR, ePrivacy) mà không phải cài đặt thêm plugin bên thứ ba.

### Bảng điểm cơ hội thị trường (Market Opportunity Score)

| Tiêu chí | Trọng số | Điểm (1-10) | Giải trình chi tiết |
| --- | --- | --- | --- |
| **Mức độ cấp thiết của vấn đề (Pain Intensity)** | Cao | 8.5/10 | Các website LMS xử lý thông tin người dùng và hành vi học tập. Việc thiếu banner cookie tuân thủ GDPR khiến chủ sở hữu đối mặt rủi ro pháp lý tại EU/UK. |
| **Bằng chứng nhu cầu (Demand Evidence)** | Cao | 8.0/10 | Đối thủ trực tiếp (Tutor LMS) đã tích hợp sẵn Cookie Consent. Người dùng LearnPress hiện phải cài plugin bên 3 gây xung đột và làm chậm website. |
| **Khoảng trống cạnh tranh (Competitive Gap)** | Cao | 8.5/10 | Các plugin CMP chuyên dụng (Complianz, Cookiebot) quá cồng kềnh, cấu hình phức tạp, tính phí hàng năm và tạo nhiều điểm xung đột với LearnPress UI/UX. |
| **Khả năng thương mại hóa / Giá trị gián tiếp** | Trung bình | 7.5/10 | Mặc dù phát hành miễn phí trong Core, tính năng này làm tăng giá trị cạnh tranh của LearnPress Core, giúp giữ chân khách hàng và giảm tỷ lệ churn. |
| **Tính khả thi kỹ thuật (Feasibility)** | Trung bình | 9.0/10 | Kiến trúc lightweight xử lý client-side bằng JS thuần (no jQuery), tương thích 100% với Page Caching và dễ dàng triển khai trong sprint ngắn. |
| **Chi phí hỗ trợ (Support Cost)** | Trung bình | 8.5/10 | Giảm đáng kể số lượng ticket hỗ trợ liên quan đến xung đột plugin cookie bên thứ ba hoặc vỡ giao diện checkout/bài học. |
| **Mức độ phù hợp chiến lược (Strategic Fit)** | Trung bình | 9.5/10 | Phù hợp hoàn hảo với định hướng biến LearnPress Core thành một giải pháp LMS "All-in-One" hoàn chỉnh, sẵn sàng cho thị trường toàn cầu. |
| **Tổng điểm cơ hội (Weighted Score)** | **—** | **8.5/10** | **Rất cao — Khuyến nghị triển khai ngay vào bản phát hành Core tiếp theo.** |

---

## 2. Phân tích nhu cầu tìm kiếm & Xu hướng (Search Demand Analysis)

Nhu cầu tìm kiếm giải pháp tuân thủ GDPR và quản lý cookie trong hệ sinh thái WordPress LMS tăng trưởng đều đặn do các quy định pháp lý nghiêm ngặt tại Châu Âu và Bắc Mỹ.

| Nhóm từ khóa | Ý định tìm kiếm (Intent) | Mức độ thương mại | Phân tích cơ hội |
| --- | --- | --- | --- |
| `LearnPress Cookie Consent`, `LearnPress GDPR` | Informational / Navigational | High | Tìm kiếm giải pháp chính thức từ LearnPress. |
| `WordPress LMS Cookie Consent`, `LMS GDPR plugin` | Commercial Investigation | High | So sánh giải pháp giữa LearnPress và Tutor LMS / LifterLMS. |
| `Complianz LearnPress conflict`, `Cookiebot page speed LMS` | Problem Solving | High | Người dùng gặp sự cố về hiệu năng và xung đột plugin khi dùng CMP bên thứ 3. |
| `GDPR compliance for online courses` | Informational | Medium | Kéo traffic hữu cơ từ chủ trường học online muốn tìm hiểu về quy định pháp lý. |

---

## 3. Phân tích đối thủ cạnh tranh & Khoảng trống thị trường (Competitor & Gap Analysis)

### Bảng so sánh giải pháp hiện có

| Giải pháp / Đối thủ | Mô hình triển khai | Ưu điểm | Nhược điểm | Khoảng trống cho LearnPress Cookie Consent |
| --- | --- | --- | --- | --- |
| **Tutor LMS (Native Consent)** | Native Core Feature | Tích hợp sẵn Cookie Consent & Legal Consents | Cấu hình đơn giản, thiếu hook mở rộng cho dev | **Cung cấp Developer API mạnh mẽ + Quản lý Legal Consents đa vị trí & Xuất CSV Audit Log** |
| **Complianz GDPR** | Plugin bên thứ 3 | Tính năng CMP đầy đủ, tự động quét cookie | Cồng kềnh, tính phí Pro đắt, giao diện không khớp LMS | **Gọn nhẹ (<15KB JS), miễn phí trong Core, giao diện chuẩn LMS, tích hợp sẵn Audit Log** |
| **Cookiebot / CookieYes** | Cloud SaaS + Plugin | Quét cookie tự động, báo cáo đám mây | Phụ thuộc script ngoài, giới hạn số trang miễn phí | **100% self-hosted, không giới hạn pageview, xuất CSV Audit Log kiểm toán tại chỗ** |
| **Cookie Notice** | Plugin đơn giản | Dễ dùng, nhẹ | Thiếu phân loại category GDPR chuẩn, thiếu versioning | **Đầy đủ 4 nhóm Cookie chuẩn GDPR, Consent Versioning & Legal Consents** |

### Khoảng trống thị trường (Gap Opportunities)
1. **Trải nghiệm Native không phát sinh chi phí:** Tích hợp trực tiếp vào LearnPress Core giúp người dùng bật là chạy ngay mà không cần tìm kiếm hay cài đặt plugin ngoài.
2. **Tương thích tuyệt đối với Page Caching:** Xử lý 100% Client-side giúp tương thích hoàn hảo với LiteSpeed, WP Rocket, Cloudflare mà không vỡ giao diện.
3. **Bộ công cụ Legal Consents & Kiểm toán (Audit Log):** Cho phép tạo nhiều điều khoản pháp lý tại Registration, Login, Checkout, Instructor Reg (Mandatory/Optional/Text) và ghi nhận nhật ký (Timestamp, IP, User Agent) hỗ trợ xuất CSV kiểm toán theo đúng chuẩn Tutor LMS.
4. **Developer-First extensibility:** Cung cấp JS APIs và PHP Hooks cho phép lập trình viên dễ dàng đấu nối Google Consent Mode v2, GTM, Meta Pixel mà không cần sửa core code.

---

## 4. Độ phức tạp sản phẩm (Product Complexity Assessment)

| Hạng mục kỹ thuật | Mức độ phức tạp | Yếu tố rủi ro | Cần chuẩn bị |
| --- | --- | --- | --- |
| **Frontend Banner & Modal UI** | Thấp (Low) | Xung đột CSS theme | Sử dụng Vanilla JS + CSS Variables nhẹ, scoped namespace |
| **Consent Storage (Cookie/LocalStorage)** | Thấp (Low) | Bị xóa bởi trình duyệt bảo mật | Fallback thông minh giữa Cookie và LocalStorage |
| **Page Caching Compatibility** | Trung bình (Medium) | Cache nhầm trạng thái đồng ý | Phải render và đọc consent 100% bằng Client-side JS |
| **Plugin Conflict Detection** | Thấp (Low) | Cảnh báo sai plugin khác | Quét danh sách constant/class của các plugin cookie phổ biến |
| **Developer API & Events** | Trung bình (Medium) | Sai lệch thứ tự load script | Bắn Custom JS Events (`learnpress/cookie/consent_updated`) |

**Tổng điểm độ phức tạp (Product Complexity Score): 3.5/10 (Thấp - Dễ triển khai).**

---

## 5. Đánh giá rủi ro (Risk Assessment)

| Nhóm rủi ro | Mô tả rủi ro | Mức độ tác động | Giải pháp khắc phục |
| --- | --- | --- | --- |
| **Kỹ thuật (Technical)** | Xung đột khi website đang chạy sẵn một plugin CMP chuyên dụng (như Complianz). | Trung bình | Hiển thị thông báo (Notice) trong WP Admin cảnh báo xung đột, giữ quyền bật/tắt thủ công cho Admin. |
| **Pháp lý (Legal)** | Người dùng hiểu lầm rằng tính năng này thay thế tư vấn pháp lý GDPR hoàn chỉnh. | Cao | Thêm Disclaimer rõ ràng trong Admin: *"Tính năng cung cấp công cụ kỹ thuật, việc tuân thủ pháp lý phụ thuộc vào cấu hình website của bạn"*. |
| **Trải nghiệm (UX)** | Banner cản trở trải nghiệm học tập hoặc làm vỡ giao diện mobile. | Trung bình | Mặc định sử dụng Non-blocking Bottom Bar nhẹ nhàng, cho phép chọn Light/Dark theme thích ứng. |
| **Hiệu năng (Performance)** | Script tải chậm ảnh hưởng đến chỉ số Core Web Vitals. | Trung bình | Giới hạn file JS < 15KB gzipped, CSS < 5KB gzipped, thực thi dưới 30ms, không phụ thuộc jQuery. |

---

## 6. Assumptions, Decisions, And Validation Items

### Giả định & Quyết định chính (Decisions)
- **Quyết định 1:** Tích hợp trực tiếp vào LearnPress Core hoàn toàn miễn phí, không thu phí Pro ở phiên bản đầu tiên.
- **Quyết định 2:** Sử dụng kiến trúc 100% Client-side JavaScript để đảm bảo tương thích với WP Rocket, LiteSpeed, Cloudflare Cache.
- **Quyết định 3:** Mặc định cung cấp 4 nhóm cookie (Essential, Analytics, Marketing, Preferences) và cho phép Admin chọn các kiểu hiển thị (Bottom Bar, Top Bar, Floating Left/Right, Center Modal).
- **Quyết định 4:** Cung cấp Developer API (JS Events/PHP Hooks) để nhà phát triển chủ động đấu nối với Google Analytics / GTM thay vì tự động quét/chặn script bên thứ ba.

### Hạng mục cần xác minh thêm (Validation Items)
- **Validation 1:** Đánh giá độ tương thích của JS Consent script trên các phiên bản Safari iOS cũ (từ iOS 14 trở xuống).
- **Validation 2:** Kiểm tra thực tế thứ tự kích hoạt sự kiện JS Event với Google Tag Manager container khi trang được load lần đầu.

---

## 7. Các bước tiếp theo (Next Actions)

1. **Chuyển sang `02-product-strategy.md`:** Chốt định vị sản phẩm, scope tính năng MVP v1.0 và lộ trình phát triển.
2. **Chuyển sang `03-prd.md`:** Chi tiết hóa các yêu cầu chức năng, phi chức năng và tiêu chí nghiệm thu cho Engineering.
