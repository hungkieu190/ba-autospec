# 03. Product Requirements Document (PRD) — LearnPress Cookie Consent

---

## 1. Mục tiêu sản phẩm (Objectives)

### Mục tiêu kỹ thuật & Trải nghiệm
- Triển khai thành công module **Cookie Consent native** vào LearnPress Core với kích thước file JS < 15KB (gzipped), CSS < 5KB (gzipped), thời gian thực thi < 30ms.
- Tương thích 100% với các plugin Full Page Caching (WP Rocket, LiteSpeed Cache) và CDN (Cloudflare).
- Đạt tiêu chuẩn truy cập **WCAG 2.1 AA** (hỗ trợ phím Tab, Screen Reader, ARIA labels, Contrast ratio).

### Mục tiêu kinh doanh
- Đáp ứng nhu cầu tuân thủ GDPR/ePrivacy cho 95% website LearnPress.
- Giảm 40% số lượng ticket hỗ trợ kỹ thuật liên quan đến xung đột plugin cookie bên thứ ba.
- Nâng cao năng lực cạnh tranh của LearnPress Core so với Tutor LMS.

---

## 2. Câu chuyện người dùng (User Stories)

| Mã | Vai trò | Hành động (I want) | Mục đích / Lợi ích (So that) |
| --- | --- | --- | --- |
| **US01** | Administrator | Tôi muốn kích hoạt tính năng Cookie Consent trong phần Cài đặt của LearnPress | Tôi có thể cung cấp banner tuân thủ GDPR cho website mà không cần cài thêm plugin ngoài. |
| **US02** | Administrator | Tôi muốn cấu hình kiểu dáng, vị trí (Bottom Bar, Top Bar, Modal) và màu sắc (Light/Dark) của banner | Banner phù hợp với thiết kế tổng thể của trang web. |
| **US03** | Administrator | Tôi muốn tăng chỉ số `Consent Version` khi thay đổi chính sách riêng tư | Tất cả khách truy cập cũ sẽ được yêu cầu xác nhận lại đồng ý cookie theo chính sách mới. |
| **US04** | Administrator | Tôi muốn nhận được cảnh báo nếu website đang cài sẵn một plugin Cookie khác | Tôi có thể chủ động tắt hoặc cấu hình để tránh hiển thị 2 banner gây khó chịu cho người dùng. |
| **US05** | Student / Guest | Tôi muốn nhìn thấy Banner Cookie gọn nhẹ khi vừa vào website với các lựa chọn Accept All, Reject All, Customize | Tôi có thể chủ động bảo vệ quyền riêng tư cá nhân. |
| **US06** | Student / Guest | Tôi muốn tùy chỉnh bật/tắt từng loại Cookie (Analytics, Marketing, Preferences) trong Popup | Tôi chỉ cho phép thu thập những dữ liệu mà tôi thấy thoải mái. |
| **US07** | Student / Guest | Tôi muốn tìm thấy nút/link "Cookie Settings" ở chân trang (Footer) bất kỳ lúc nào | Tôi có thể thay đổi lại lựa chọn đồng ý cookie khi cần. |
| **US08** | Developer | Tôi muốn lắng nghe sự kiện JS `learnpress/cookie/consent_updated` hoặc dùng PHP Hooks | Tôi có thể chủ động chèn mã Google Analytics / Meta Pixel đúng thời điểm khách đồng ý. |
| **US09** | Administrator | Tôi muốn tạo nhiều Legal Consents và chọn hiển thị ở Registration, Login, Checkout hoặc Instructor Reg | Tôi có thể yêu cầu người dùng đồng ý các Điều khoản dịch vụ & Chính sách quyền riêng tư khi đăng ký/thanh toán. |
| **US10** | Administrator | Tôi muốn xem và xuất file CSV chứa nhật ký Consent Audit Log (Timestamp, IP, User Agent) | Tôi có đầy đủ bằng chứng đối soát khi có cơ quan kiểm toán hoặc người dùng khiếu nại về pháp lý. |

---

## 3. Yêu cầu chức năng (Functional Requirements)

### 3.1. Giao diện Quản trị (WP Admin Settings)
Vị trí: `LearnPress → Settings → Privacy & Cookies` được chia thành **8 Sub-tabs**:

| ID | Yêu cầu chức năng | Độ ưu tiên | Vai trò | Ghi chú |
| --- | --- | --- | --- | --- |
| **FR01** | Sub-tab **General**: Bật/tắt tính năng Cookie Consent toàn trang. | High | Admin | Mặc định: Tắt (Disabled) khi vừa nâng cấp Core. |
| **FR02** | Sub-tab **General**: Quản lý `Consent Version` (Trường nhập số, mặc định `1.0`). Cho phép bấm nút "Reset All Consents" để buộc người dùng chọn lại. | High | Admin | Lưu vào `wp_options`. |
| **FR03** | Sub-tab **Appearance**: Chọn vị trí hiển thị Banner (Bottom Bar, Top Bar, Floating Bottom Left, Floating Bottom Right, Center Modal). | High | Admin | Mặc định: Bottom Bar. |
| **FR04** | Sub-tab **Appearance**: Chọn chủ đề giao diện (Light Theme, Dark Theme). | Medium | Admin | Mặc định: Light Theme. |
| **FR05** | Sub-tab **Content**: Tùy chỉnh Tiêu đề Banner, Đoạn mô tả, Link trang Privacy Policy, Link trang Cookie Policy. | High | Admin | Hỗ trợ đa ngôn ngữ WPML/Polylang. |
| **FR06** | Sub-tab **Content**: Tùy chỉnh nhãn của các nút: `Accept All`, `Reject All`, `Customize`, `Save Preferences`. | High | Admin | Giá trị mặc định dịch sẵn tiếng Anh/Việt. |
| **FR07** | Sub-tab **Behavior**: Cho phép bật/tắt hiển thị nhóm cookie Analytics, Marketing, Preferences. Bắt buộc giữ nhóm Essential luôn bật. | High | Admin | Thêm mô tả giải thích lý do Essential không thể tắt. |
| **FR08** | Sub-tab **Legal Consents**: Quản lý danh sách điều khoản pháp lý (Thêm/Sửa/Xóa, Bật/Tắt). Cấu hình Vị trí hiển thị (Registration, Login, Checkout, Instructor Registration), Loại (Mandatory Checkbox, Optional Checkbox, Text Only) và Nội dung soạn thảo Rich text. | High | Admin | Lưu vào table `wp_learnpress_legal_consents`. |
| **FR09** | Sub-tab **Audit Log**: Bảng quản lý nhật ký chấp nhận đồng ý của người dùng (ID, User ID/Email, Consent Type, IP Address, User Agent, Timestamp). Nút "Export CSV" cho phép tải toàn bộ dữ liệu kiểm toán. | High | Admin | Lưu vào table `wp_learnpress_consent_logs`. |
| **FR10** | Sub-tab **Developer**: Cung cấp hướng dẫn mã mẫu JS API và PHP Hooks để chèn mã GA4/GTM. | Medium | Admin/Dev | Tài liệu hỗ trợ tại chỗ. |
| **FR11** | Sub-tab **Compatibility**: Hệ thống tự động quét danh sách plugin active. Nếu phát hiện Complianz, Cookiebot, CookieYes, Cookie Notice, iubenda → Hiển thị Notice cảnh báo xung đột. | High | Admin | Chỉ cảnh báo, không tự động đổi cài đặt của Admin. |

### 3.2. Giao diện Người dùng (Frontend Banner, Legal Consents & Modal)

| ID | Yêu cầu chức năng | Độ ưu tiên | Vai trò | Ghi chú |
| --- | --- | --- | --- | --- |
| **FR12** | Hiển thị Banner Cookie theo đúng kiểu dáng/vị trí đã cấu hình khi khách chưa có dữ liệu consent. | High | Guest/Student | Render 100% bằng Client-side JS. |
| **FR13** | Nút **Accept All**: Lưu trạng thái chấp nhận tất cả categories, đóng Banner ngay lập tức, ghi nhật ký Audit Log. | High | Guest/Student | Ghi vào Cookie, LocalStorage & DB Audit Log. |
| **FR14** | Nút **Reject All**: Lưu trạng thái chỉ chấp nhận nhóm Essential, tắt toàn bộ optional categories, đóng Banner, ghi nhật ký Audit Log. | High | Guest/Student | Ghi vào Cookie, LocalStorage & DB Audit Log. |
| **FR15** | Nút **Customize**: Mở Popup Cookie Preferences. | High | Guest/Student | Hiển thị thông tin từng Category. |
| **FR16** | Popup **Cookie Preferences**: Cho phép bật/tắt công tắc (toggle) của Analytics, Marketing, Preferences. Nhóm Essential bị khoá toggle ở trạng thái ON kèm dòng mô tả giải thích. | High | Guest/Student | Hỗ trợ phím Tab & Esc để đóng. |
| **FR17** | Hiển thị các Legal Consents tại các form Frontend (Registration, Login, Checkout, Instructor Reg) theo cấu hình vị trí và loại (Mandatory/Optional/Text). Form không cho gửi nếu chưa tích chọn Mandatory. | High | Guest/Student | Tự động inject vào các form LearnPress. |
| **FR18** | Tự động ghi nhật ký Consent Audit Log (Timestamp, IP Address, Browser User Agent) mỗi khi người dùng đồng ý Banner Cookie hoặc gửi Form kèm Legal Consent. | High | Guest/Student | Ghi vào bảng `wp_learnpress_consent_logs`. |
| **FR15** | Nút **Save Preferences** trong Popup: Lưu các lựa chọn hiện tại và đóng Popup. | High | Guest/Student | Bắn sự kiện JS Event. |
| **FR16** | Hỗ trợ Shortcode `[learnpress_cookie_settings]`, Gutenberg Block "Cookie Settings", và PHP function `learnpress_cookie_settings_button()` để chèn link mở lại Popup tùy chọn. | High | Admin/Dev | Đặt linh hoạt ở Footer hoặc Menu. |

### 3.3. Developer APIs & Hooks

| ID | Yêu cầu chức năng | Độ ưu tiên | Vai trò | Ghi chú |
| --- | --- | --- | --- | --- |
| **FR17** | **JavaScript API:**<br>- `LP_Cookie.getConsent()`: Lấy object trạng thái consent hiện tại.<br>- `LP_Cookie.hasCategory('analytics')`: Kiểm tra quyền category.<br>- `LP_Cookie.openSettings()`: Mở Popup cài đặt. | High | Developer | Toàn cục trên `window.LP_Cookie`. |
| **FR18** | **JavaScript Event:** Bắn Custom Event `document.dispatchEvent(new CustomEvent('learnpress/cookie/consent_updated', { detail: consentData }))` mỗi khi người dùng thay đổi consent. | High | Developer | Dùng kích hoạt GA4/Pixel. |
| **FR19** | **PHP Hooks:**<br>- Filter `learnpress/cookie/categories`: Cho phép dev đăng ký thêm category.<br>- Action `learnpress/cookie/settings_saved`: Chạy khi Admin lưu cài đặt. | Medium | Developer | Đặt trong file `class-lp-cookie-consent.php`. |

---

## 4. Yêu cầu phi chức năng (Non-functional Requirements)

- **Hiệu năng (Performance):**
  - Kích thước tập tin JavaScript: `< 15KB` (gzipped).
  - Kích thước tập tin CSS: `< 5KB` (gzipped).
  - Không phụ thuộc vào thư viện jQuery (sử dụng 100% Vanilla JS ES6+).
  - Thời gian khởi tạo và render Banner: `< 30ms` trên thiết bị di động trung bình.
  - Không gây ảnh hưởng xấu tới các chỉ số Google Core Web Vitals (LCP, CLS, INP).
- **Khả năng tương thích Cache (Caching Compatibility):**
  - Đọc và lưu dữ liệu Consent 100% ở phía Client (Browser Cookie `lp_cookie_consent` & LocalStorage fallback).
  - Đảm bảo tương thích hoàn hảo với Full Page Caching (WP Rocket, LiteSpeed Cache, W3 Total Cache) và Cloudflare CDN mà không bị lưu cache trạng thái của người dùng khác.
- **Khả năng truy cập (Accessibility - WCAG 2.1 AA):**
  - Cho phép di chuyển và thao tác hoàn toàn bằng bàn phím (Tab, Shift+Tab, Enter, Space, Escape).
  - Hỗ trợ trình đọc màn hình với đầy đủ thuộc tính ARIA (`aria-modal`, `aria-label`, `aria-checked`).
  - Quản lý Focus (Focus trapping) bên trong Popup khi đang mở.
  - Độ tương phản màu sắc chữ và nền đạt tối thiểu `4.5:1`.

---

## 5. Ma trận phân quyền (Permission Matrix)

| Chức năng / Hành động | Admin | Manager | Instructor | Student | Guest | Developer (Hooks) |
| --- | --- | --- | --- | --- | --- | --- |
| Truy cập Admin Settings Privacy & Cookies | **Có** | Không | Không | Không | Không | Không |
| Bật/tắt Module & Đổi Consent Version | **Có** | Không | Không | Không | Không | Không |
| Tùy chỉnh màu sắc, vị trí, nội dung Banner | **Có** | Không | Không | Không | Không | Không |
| Xem cảnh báo xung đột Plugin | **Có** | Không | Không | Không | Không | Không |
| Tương tác với Banner (Accept/Reject/Customize) | **Có** | **Có** | **Có** | **Có** | **Có** | Không |
| Đăng ký Category mới qua PHP Filter | Không | Không | Không | Không | Không | **Có** |

---

## 6. Tiêu chí nghiệm thu (Acceptance Criteria)

### Scenarios nghiệm thu chính:

1. **Kích hoạt thành công lần đầu:**
   - **GIVEN:** Admin truy cập `LearnPress → Settings → Privacy & Cookies` và bấm Bật Cookie Consent.
   - **WHEN:** Khách truy cập lần đầu vào bất kỳ trang nào trên website.
   - **THEN:** Banner xuất hiện ở Bottom Bar với chủ đề Light, hiển thị đúng tiêu đề, mô tả và 3 nút (Accept All, Reject All, Customize).

2. **Thao tác Accept All:**
   - **WHEN:** Khách bấm nút "Accept All".
   - **THEN:** Banner đóng ngay lập tức, Cookie `lp_cookie_consent` được lưu với trạng thái `accepted` cho cả 4 categories, sự kiện `learnpress/cookie/consent_updated` được kích hoạt. Trống tải lại trang banner không xuất hiện lại.

3. **Tùy chỉnh nhóm Cookie:**
   - **WHEN:** Khách bấm "Customize", tắt công tắc Analytics và bấm "Save Preferences".
   - **THEN:** Category Analytics ghi nhận `false`, Essential ghi nhận `true`. Hàm `LP_Cookie.hasCategory('analytics')` trả về `false`.

4. **Xử lý khi thay đổi Consent Version:**
   - **GIVEN:** Khách đã đồng ý cookie từ trước ở version `1.0`.
   - **WHEN:** Admin thay đổi `Consent Version` thành `2.0` trong Admin và bấm lưu.
   - **THEN:** Ở lượt truy cập tiếp theo của khách, dữ liệu cũ bị xem là hết hạn, Banner Cookie hiển thị lại để yêu cầu khách xác nhận lại.

5. **Kiểm tra tương thích Page Caching:**
   - **GIVEN:** Website bật LiteSpeed Cache / WP Rocket.
   - **WHEN:** Khách A chọn Reject All và Khách B truy cập trang web lần đầu.
   - **THEN:** Khách B vẫn thấy Banner hiển thị bình thường, không bị dính giao diện đã ẩn banner của Khách A.

---

## 7. Chỉ số đo lường thành công (Success Metrics)

| Chỉ số (Metric) | Mục tiêu (Target) | Phương pháp đo |
| --- | --- | --- |
| **Tỷ lệ kích hoạt (Activation Rate)** | > 35% các website LearnPress kích hoạt tính năng này trong 3 tháng đầu | Thống kê Telemetry / Feedback khảo sát |
| **Tỷ lệ giảm Ticket hỗ trợ** | Giảm 40% số ticket liên quan tới xung đột plugin cookie | Thống kê hệ thống Support Ticket |
| **Tác động hiệu năng (Performance Impact)** | Core Web Vitals score không giảm (> 90/100 trên Mobile) | Kiểm thử Google PageSpeed Insights |
| **Tỷ lệ tuân thủ WCAG** | 100% đạt chuẩn WCAG 2.1 AA | Kiểm thử bằng công cụ axe DevTools & WAVE |

---

## 8. Assumptions, Decisions, And Validation Items

### Giả định & Quyết định chính (Decisions)
- **Quyết định 1:** Nhóm cookie Essential mặc định luôn ở trạng thái ON và không thể bị tắt bởi người dùng cuối, có thông báo giải thích đi kèm trong Popup.
- **Quyết định 2:** Module chỉ cung cấp cảnh báo (Notice) trong wp-admin khi phát hiện plugin cookie khác, không tự động ghi đè hay tắt cấu hình ngoài ý muốn của Admin.
- **Quyết định 3:** Không áp dụng chặn tự động script bên thứ 3 phía server để đảm bảo không làm vỡ các mã nguồn theme/plugin độc lập.

### Hạng mục cần xác minh (Validation Items)
- **Validation 1:** Kiểm thử khả năng lưu trữ Cookie khi trình duyệt bật chế độ bọt ẩn danh (Incognito) hoặc bật tính năng ITP (Intelligent Tracking Prevention) trên Safari.

---

## 9. Các bước tiếp theo (Next Actions)

1. **Chuyển sang `04-ux-and-wireframe.md`:** Vẽ sơ đồ Mermaid cho luồng người dùng và thiết kế chi tiết ma trận giao diện wireframe.
2. **Chuyển sang `05-qa-and-documentation.md`:** Xây dựng danh sách kịch bản test chi tiết (Test Cases) và khung tài liệu hướng dẫn (Documentation Outline).
