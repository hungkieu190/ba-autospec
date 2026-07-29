# 05. QA Test Plan & Documentation Outline — LearnPress Cookie Consent

---

## 1. Kế hoạch đảm bảo chất lượng (QA Test Plan)

Kế hoạch kiểm thử bao gồm đầy đủ các khía cạnh Chức năng, Phân quyền, Tương thích Caching/Plugin, An toàn bảo mật, Hiệu năng và Khả năng truy cập (WCAG 2.1 AA).

### 1.1. Ma trận kịch bản kiểm thử (Test Cases Matrix)

| ID | Hạng mục | Kịch bản kiểm thử (Scenario) | Điều kiện tiên quyết | Các bước thực hiện | Kết quả kỳ vọng | Độ ưu tiên |
| --- | --- | --- | --- | --- | --- | --- |
| **TC01** | Functional | Kích hoạt và hiển thị Banner mặc định | Admin đã bật Cookie Consent | 1. Xóa cookie trình duyệt.<br>2. Truy cập trang chủ LearnPress. | Banner xuất hiện ở Bottom Bar với Light Theme và 3 nút thao tác. | P0 (Critical) |
| **TC02** | Functional | Thao tác "Accept All" | Banner đang hiển thị | 1. Bấm nút "Accept All". | Banner đóng ngay, Cookie `lp_cookie_consent` lưu 4 categories = `true`, bắn event JS `learnpress/cookie/consent_updated`. | P0 (Critical) |
| **TC03** | Functional | Thao tác "Reject All" | Banner đang hiển thị | 1. Bấm nút "Reject All". | Banner đóng, Cookie lưu Essential = `true`, các nhóm khác = `false`. | P0 (Critical) |
| **TC04** | Functional | Tùy chỉnh trong Popup Modal | Banner đang hiển thị | 1. Bấm nút "Customize".<br>2. Bật Analytics, tắt Marketing.<br>3. Bấm "Save Preferences". | Popup đóng, trạng thái được ghi nhớ chính xác theo cài đặt của người dùng. | P0 (Critical) |
| **TC05** | Functional | Cập nhật `Consent Version` | Đã lưu consent ở ver `1.0` | 1. Admin đổi ver thành `2.0` trong wp-admin.<br>2. Khách F5 lại trang. | Banner cũ bị vô hiệu, Banner mới hiển thị lại để khách xác nhận lại. | P1 (High) |
| **TC06** | Permission | Phân quyền truy cập Admin Settings | Đăng nhập tài khoản Instructor | 1. Vào wp-admin.<br>2. Thử truy cập trang cài đặt Privacy & Cookies. | Hệ thống chặn truy cập, báo không đủ quyền hạn. | P1 (High) |
| **TC07** | Regression | Tương thích LiteSpeed / WP Rocket Cache | Website bật Full Page Cache | 1. Khách A chọn Reject All.<br>2. Khách B truy cập cùng URL trên trình duyệt khác. | Khách B vẫn thấy Banner hiển thị bình thường, không dính cache của Khách A. | P0 (Critical) |
| **TC08** | Regression | Cảnh báo xung đột Plugin | Đã active Complianz | 1. Truy cập Admin Privacy & Cookies. | Hiển thị Warning Notice màu vàng báo phát hiện plugin Complianz. | P1 (High) |
| **TC09** | Performance | Dung lượng Asset & Tốc độ JS | Môi trường production | 1. Kiểm tra dung lượng file JS/CSS minified.<br>2. Đo thời gian khởi chạy JS console. | File JS < 15KB gzipped, CSS < 5KB gzipped, thời gian thực thi < 30ms. | P1 (High) |
| **TC10** | Accessibility | Kiểm thử bàn phím & WCAG 2.1 AA | Banner / Popup đang mở | 1. Dùng phím `Tab` để di chuyển qua các nút.<br>2. Dùng `Space/Enter` để chọn.<br>3. Dùng `Esc` để đóng. | Đèn focus hiển thị rõ ràng, di chuyển tuần tự, hỗ trợ hoàn toàn phím bàn phím. | P1 (High) |
| **TC11** | Edge Case | Trình duyệt khóa Cookie | Trình duyệt bật Block All Cookies | 1. Khách truy cập trang web.<br>2. Thao tác chọn Accept All. | Banner hoạt động tạm thời cho session hiện tại mà không gây lỗi JS console. | P2 (Medium) |
| **TC12** | Functional | Kiểm thử Legal Consents tại Checkout / Registration | Admin đã cấu hình Mandatory Legal Consent tại Checkout | 1. Thêm khóa học vào giỏ hàng.<br>2. Đến trang Checkout.<br>3. Bỏ qua không tích chọn checkbox điều khoản.<br>4. Bấm "Place Order". | Form chặn gửi đơn hàng, hiển thị thông báo lỗi yêu cầu tích chọn điều khoản bắt buộc. | P0 (Critical) |
| **TC13** | Audit Log | Ghi nhận nhật ký & Xuất file CSV Audit Log | Người dùng vừa thực hiện đồng ý cookie hoặc checkout | 1. Vào Admin Sub-tab Audit Log.<br>2. Kiểm tra dòng log mới chứa Timestamp, IP, User Agent.<br>3. Bấm nút "Export CSV". | File CSV tải xuống thành công, dữ liệu khớp 100% với nhật ký hiển thị. | P0 (Critical) |

---

## 2. Khung tài liệu hướng dẫn (Documentation Outline)

Bộ tài liệu hướng dẫn người dùng và nhà phát triển được tổ chức thành 5 chuyên đề chính:

```text
product-documentation/
├── 01-administrator-guide.md       # Hướng dẫn dành cho Quản trị viên
├── 02-developer-guide.md           # Hướng dẫn API & PHP Hooks cho Developer
├── 03-theme-integration-guide.md   # Hướng dẫn tích hợp Shortcode, Block & CSS
├── 04-compatibility-guide.md       # Hướng dẫn cấu hình tương thích Caching & Plugins
└── 05-faq-and-troubleshooting.md   # Trả lời câu hỏi thường gặp & Sửa lỗi
```

### Chi tiết nội dung các tài liệu:

#### 1. Administrator Guide (`01-administrator-guide.md`)
- Hướng dẫn kích hoạt tính năng trong `LearnPress → Settings → Privacy & Cookies`.
- Hướng dẫn cấu hình vị trí Banner (Bottom Bar, Top Bar, Modal) và giao diện (Light/Dark).
- Hướng dẫn tùy chỉnh nội dung văn bản thông báo và liên kết trang Chính sách riêng tư.
- Hướng dẫn sử dụng tính năng **Consent Versioning** để yêu cầu người dùng xác nhận lại khi đổi chính sách.

#### 2. Developer Guide (`02-developer-guide.md`)
- Chi tiết bộ thư viện JavaScript API: `LP_Cookie.getConsent()`, `LP_Cookie.hasCategory()`, `LP_Cookie.openSettings()`.
- Hướng dẫn lắng nghe Custom Event `learnpress/cookie/consent_updated` để kích hoạt mã theo dõi (GA4, Facebook Pixel, GTM).
- Chi tiết các PHP Hooks/Filters: `learnpress/cookie/categories`, `learnpress/cookie/settings_saved`.
- Mã nguồn mẫu (Code Snippet) đấu nối Google Tag Manager tuân thủ Google Consent Mode v2.

#### 3. Theme Integration Guide (`03-theme-integration-guide.md`)
- Hướng dẫn chèn nút "Cookie Settings" ở Footer hoặc Menu bằng Shortcode `[learnpress_cookie_settings]`.
- Hướng dẫn sử dụng Gutenberg Block "Cookie Settings" trong Block Editor.
- Hướng dẫn gọi hàm PHP `learnpress_cookie_settings_button()` trực tiếp trong file template theme (`footer.php`).
- Danh sách các CSS Variables hỗ trợ tùy chỉnh màu sắc, font chữ và viền của Banner.

#### 4. Compatibility Guide (`04-compatibility-guide.md`)
- Nguyên lý hoạt động Client-side tương thích với WP Rocket, LiteSpeed Cache, W3 Total Cache và Cloudflare.
- Xử lý cảnh báo khi website cài đặt đồng thời các plugin CMP khác (Complianz, Cookiebot, CookieYes).

#### 5. FAQ & Troubleshooting (`05-faq-and-troubleshooting.md`)

| Câu hỏi / Sự cố | Nguyên nhân có thể | Hướng xử lý |
| --- | --- | --- |
| **Vì sao nhóm Essential Cookies không thể tắt?** | Đây là các cookie kỹ thuật bắt buộc để duy trì phiên đăng nhập và giỏ hàng khóa học. | Đây là thiết kế chuẩn GDPR, không phải lỗi. |
| **Vì sao Banner không hiển thị khi vừa cài?** | Tính năng mặc định ở trạng thái OFF hoặc trình duyệt đã lưu cookie consent cũ. | Kiểm tra cài đặt Admin đã ON chưa, thử mở trình duyệt ẩn danh (Incognito) để test. |
| **Làm sao để chèn mã Google Analytics chỉ khi học viên đồng ý?** | Cần sử dụng JS Event để kích hoạt script GA4 thay vì chèn trực tiếp vào header. | Xem mã mẫu trong `Developer Guide`. |

---

## 3. Assumptions, Decisions, And Validation Items

### Giả định & Quyết định chính (Decisions)
- **Quyết định 1:** Bộ kịch bản kiểm thử tự động (Automated Test Suites) sẽ chạy kiểm tra kích thước JS/CSS nén trong quy trình CI/CD build release.
- **Quyết định 2:** Đạt 100% tỷ lệ pass các kịch bản P0 (Critical) và P1 (High) trước khi gắn tag phát hành chính thức trong LearnPress Core.

### Hạng mục cần xác minh (Validation Items)
- **Validation 1:** Thực hiện chạy kiểm thử thực tế trên các công cụ chấm điểm khả năng truy cập như axe DevTools để xác nhận 0 lỗi WCAG 2.1 AA.

---

## 4. Các bước tiếp theo (Next Actions)

1. **Chuyển sang `06-seo-and-marketing.md`:** Xây dựng kế hoạch từ khóa SEO, bộ bài viết hướng dẫn và chiến dịch truyền thông ra mắt tính năng.
2. **Chuyển sang `07-build-or-not-build.md`:** Tổng hợp báo cáo đánh giá thương mại cuối cùng dành cho Ban quản trị dự án.
