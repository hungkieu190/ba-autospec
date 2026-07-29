# Câu hỏi bổ sung cho LearnPress Cookie Consent

---

## Hướng dẫn trả lời

Chào bạn, đây là các câu hỏi bổ sung nhằm làm rõ những khía cạnh còn trống hoặc chưa có dữ liệu chi tiết trong `input.md` của dự án **LearnPress Cookie Consent**. 

**Cách thức trả lời:**
- Vui lòng điền câu trả lời của bạn trực tiếp ngay bên dưới từng câu hỏi.
- Bạn có thể bỏ qua những câu hỏi chưa có câu trả lời hoặc không liên quan đến định hướng dự án.
- Nếu chưa có dữ liệu hoặc thông tin xác thực, bạn chỉ cần ghi **"Không biết"** hoặc **"Cần kiểm tra thêm"**.
- Sau khi hoàn thành trả lời, chuyển sang phần **Bước tiếp theo** ở cuối tài liệu để tiếp tục quy trình tạo bộ tài liệu sản phẩm.

---

## Tóm tắt những gì đã biết

Dưới đây là tóm tắt toàn bộ thông tin đã được ghi nhận từ `projects/lp-gpdr/input.md`:

| Mục | Thông tin chi tiết |
| --- | --- |
| **Tên sản phẩm** | LearnPress Cookie Consent |
| **Loại sản phẩm** | Tính năng tích hợp sẵn trong LearnPress Core (LearnPress Core Feature) |
| **Mục tiêu sản phẩm** | Cung cấp tính năng Cookie Consent native, gọn nhẹ cho các website LearnPress nhằm đáp ứng các quy định bảo mật riêng tư (GDPR/ePrivacy) mà không bắt buộc phải cài đặt plugin cookie bên thứ ba. |
| **Đối tượng sử dụng** | - **Chính (Primary):** Chủ website LearnPress, Người tạo khóa học, Trường học / Viện đào tạo, Học viện online, Nền tảng đào tạo doanh nghiệp.<br>- **Phụ (Secondary):** Học viên, Khách truy cập, Lập trình viên, Agency. |
| **Vai trò người dùng** | Administrator, Instructor, Student, Guest, Developer. |
| **Vấn đề cốt lõi** | Các website LearnPress cần Cookie Banner tuân thủ GDPR nhưng hiện phải phụ thuộc plugin bên thứ 3 (như Complianz, Cookiebot, CookieYes), gây ra xung đột plugin, cài đặt trùng lặp, suy giảm hiệu năng và tăng chi phí bảo trì. |
| **Giải pháp đề xuất** | Module Cookie Consent native trong LearnPress Core gồm: Banner đồng ý, Popup quản lý tùy chọn cookie, 4 nhóm cookie cấu hình được, lưu trữ consent, quản lý phiên bản (consent versioning), Developer API và cảnh báo xung đột plugin. |
| **Tính năng Must-Have** | - **Banner Cookie:** Bật/tắt, vị trí, kiểu layout, theme (Light/Dark/Auto), tùy chỉnh tiêu đề/mô tả/link Privacy & Cookie Policy.<br>- **Phân loại Cookie:** 4 nhóm mặc định (Essential - bắt buộc, Analytics, Marketing, Preferences).<br>- **Hành động Consent:** Chấp nhận tất cả (Accept All), Từ chối tất cả (Reject All), Tùy chỉnh (Customize), Lưu tùy chọn (Save Preferences).<br>- **Popup tùy chọn & Link Settings:** Cho phép xem/thay đổi tùy chọn cookie mọi lúc; cung cấp link "Cookie Settings" chèn ở Footer, trang Privacy, Shortcode, Block.<br>- **Lưu trữ Consent:** Dùng Browser Cookies & localStorage fallback (trạng thái, các category chọn, phiên bản consent, timestamp).<br>- **Consent Versioning:** Đặt lại phiên bản consent để kích hoạt lại banner khi chính sách thay đổi.<br>- **Quy tắc hiển thị:** Hiển thị toàn cầu (Worldwide), chỉ EU (EU only), chỉ UK (UK only).<br>- **Phát hiện tương thích:** Cảnh báo Admin khi phát hiện plugin cookie khác đang hoạt động (Complianz, CookieYes, Cookiebot, Cookie Notice, iubenda).<br>- **Developer API:** JS API & PHP Hooks cho lập trình viên mở rộng. |
| **Tính năng Nice-To-Have** | Hỗ trợ Google Consent Mode v2, tích hợp Google Tag Manager, Meta Pixel, Microsoft Clarity, hỗ trợ CSS Variables cho styling, cung cấp Shortcodes & Gutenberg Blocks. |
| **Phạm vi loại trừ (Out of scope)** | Quét cookie tự động (Cookie scanning), Tự động phân loại cookie (Auto classification), Tính năng CMP chuyên sâu, Tư vấn pháp lý, Tự tạo trang Privacy Policy, Đồng bộ consent đa site (Multisite sync). |
| **Mô hình giá** | Tích hợp miễn phí sẵn trong LearnPress Core. |
| **Vị trí Admin** | `LearnPress → Settings → Privacy & Cookies` |
| **Rủi ro & Ràng buộc** | Tránh xung đột với plugin cookie khác, đảm bảo tương thích với Full Page Caching (WP Rocket, LiteSpeed...), hỗ trợ đa ngôn ngữ (WPML/Polylang), chuẩn truy cập WCAG và giữ JavaScript siêu nhẹ. |

---

## Các assumption đang có

Dựa trên thông tin input, AI phát hiện các giả định (assumptions) hiện tại như sau:

1. **Về nhu cầu người dùng:** Đa số người dùng LearnPress chỉ cần một Cookie Banner đạt tiêu chuẩn cơ bản của GDPR (cho phép chấp nhận/từ chối theo nhóm cookie) mà không cần hệ thống quét cookie tự động (cookie scanner) phức tạp.
2. **Về kiến trúc & Caching:** Trạng thái consent và việc hiển thị banner sẽ được xử lý 100% ở phía Client (Browser Cookie / LocalStorage / JavaScript) để tương thích hoàn toàn với các cơ chế Full Page Caching (WP Rocket, LiteSpeed Cache, Cloudflare Cache) mà không gây vỡ giao diện hay cache lầm trạng thái của người dùng khác.
3. **Về quy tắc vị trí địa lý (GeoIP Rules):** Việc xác định vùng EU / UK để ẩn/hiện banner được giả định có thể sử dụng Cloudflare Header hoặc JS API nhẹ phía client thay vì tích hợp một CSDL GeoIP nặng nề vào Core LearnPress.
4. **Về xử lý xung đột plugin:** Khi phát hiện plugin cookie bên thứ ba (như Complianz), LearnPress Cookie Consent chỉ hiển thị cảnh báo (Notice) trong WP Admin và giữ ngầm tắt banner native để tránh hiển thị 2 banner cùng lúc.
5. **Về phân loại Cookie:** Giả định 4 nhóm cookie (Essential, Analytics, Marketing, Preferences) là đủ bao phủ 99% trường hợp sử dụng của các website đào tạo LearnPress.

---

## Câu hỏi cần trả lời

### 1. Product Context (Bối cảnh sản phẩm)
- **Q1.1:** Động lực chính khiến nhóm phát triển quyết định đưa tính năng này trực tiếp vào LearnPress Core tại thời điểm này là gì (ví dụ: phản hồi nhiều từ khách hàng EU, giảm tỷ lệ gỡ bỏ plugin, hay chuẩn bị cho các tiêu chuẩn GDPR/Google Consent Mode mới)?
  *Trả lời:* Đối thủ trực tiếp là Tutor LMS đã tích hợp sẵn tính năng Cookie Consent, trong khi người dùng LearnPress vẫn phải cài thêm plugin bên thứ ba. Điều này làm giảm trải nghiệm sử dụng, tăng số lượng plugin cần quản lý và khiến LearnPress kém cạnh tranh hơn. Việc tích hợp trực tiếp vào Core sẽ giúp LearnPress trở thành một giải pháp LMS hoàn chỉnh hơn và đáp ứng kỳ vọng của người dùng.
- **Q1.2:** Tính năng này được định vị là giải pháp hoàn chỉnh cho 80% người dùng hay chỉ là bước đệm cơ bản để khuyến khích dùng các add-on/plugin nâng cao?
  *Trả lời:* Đây được định vị là giải pháp hoàn chỉnh cho hầu hết người dùng LearnPress. Mục tiêu là đáp ứng đầy đủ các nhu cầu phổ biến về Cookie Consent mà không cần cài đặt thêm plugin khác. Các trường hợp rất chuyên biệt hoặc yêu cầu pháp lý nâng cao vẫn có thể sử dụng các giải pháp CMP chuyên dụng.

### 2. Market Validation (Xác minh thị trường)
- **Q2.1:** Đã có số liệu thống kê hoặc khảo sát thực tế nào về số lượng website LearnPress hiện đang gặp xung đột hoặc phàn nàn khi sử dụng các plugin Cookie bên thứ ba (như Complianz, CookieYes...) chưa?
  *Trả lời:* Hiện tại chưa có số liệu thống kê hoặc khảo sát chính thức. Quyết định phát triển dựa trên nhu cầu thực tế của thị trường, xu hướng các LMS cạnh tranh và mong muốn giảm sự phụ thuộc vào plugin bên thứ ba.
- **Q2.2:** Người dùng LearnPress thường phàn nàn điều gì nhất ở các plugin Cookie bên thứ ba hiện tại (ví dụ: làm chậm trang bài học, làm vỡ giao diện mobile, khó tùy chỉnh giao diện hay tính phí đắt)?
  *Trả lời:* Phần lớn người dùng chỉ cần một giải pháp đơn giản, dễ cấu hình và hoạt động ngay sau khi cài đặt. Họ không muốn phải nghiên cứu hoặc lựa chọn giữa nhiều plugin Cookie khác nhau chỉ để bổ sung một tính năng cơ bản cho website.

### 3. Users & Roles (Người dùng & Vai trò)
- **Q3.1:** Vai trò `Instructor` (Giảng viên) có bất kỳ quyền hạn nào liên quan đến cấu hình Cookie Consent không (ví dụ: xem trạng thái consent của học viên trong khóa học) hay 100% quyền thuộc về `Administrator`?
  *Trả lời:* 100% quyền cấu hình thuộc về Administrator. Instructor không có quyền xem hoặc quản lý Cookie Consent của học viên vì đây là chính sách áp dụng ở cấp website, không phải ở cấp khóa học.
- **Q3.2:** Các nhà phát triển theme / agency khi làm dự án LearnPress cho khách hàng có cần khả năng đăng ký thêm các Category Cookie tùy chỉnh ngoài 4 nhóm mặc định không?
  *Trả lời:* Có, nhưng chỉ thông qua Developer API (PHP Hooks/Filters). Giao diện quản trị vẫn chỉ hỗ trợ 4 nhóm mặc định để giữ trải nghiệm đơn giản và nhất quán cho người dùng phổ thông.

### 4. Scope & Features (Phạm vi & Tính năng)
- **Q4.1:** **Cơ chế chặn Script (Script Blocking):** Module này sẽ tự động chặn các đoạn mã theo dõi (như Google Analytics, Meta Pixel) chèn qua theme/plugin khác cho đến khi người dùng đồng ý, hay chỉ đơn giản cung cấp JS Event / Helper Function để lập trình viên tự quản lý việc kích hoạt script?
  *Trả lời:* Chỉ cung cấp JavaScript API, Events và Helper Functions. LearnPress không tự động quét hoặc chặn script của bên thứ ba nhằm tránh xung đột và giảm độ phức tạp.
- **Q4.2:** Khi người dùng chọn "Reject All" (Từ chối tất cả), các cookie nhóm Essential vẫn luôn bật. Giao diện có cần hiển thị giải thích rõ lý do tại sao nhóm Essential không thể tắt không?
  *Trả lời:* Có. Hiển thị một mô tả ngắn dưới nhóm Essential để giải thích rằng các cookie này cần thiết cho hoạt động của website và không thể tắt.
- **Q4.3:** **Cơ chế Banner:** Bạn muốn banner hiển thị theo kiểu thanh cố định ở đáy/đỉnh màn hình không cản trở thao tác (Non-blocking) hay có tùy chọn chế độ Modal làm mờ/khóa toàn màn hình (Blocking Modal) buộc người dùng phải chọn trước khi vào xem bài học?
  *Trả lời:* Mặc định sử dụng Non-blocking Bottom Bar để mang lại trải nghiệm thân thiện và ít ảnh hưởng đến người dùng.

Đồng thời, cho phép Administrator lựa chọn các kiểu hiển thị khác như:

Bottom Bar
Top Bar
Floating Bottom Left
Floating Bottom Right
Center Modal (Blocking)

Điều này giúp đáp ứng nhiều yêu cầu tuân thủ và thiết kế khác nhau mà vẫn giữ mặc định đơn giản cho đa số website.
- **Q4.4:** Khi Admin cập nhật `Consent Version`, banner có ngay lập tức hiện lại ở lần truy cập tiếp theo của mọi người dùng hay chỉ áp dụng ở các trang cụ thể (như trang Checkout/đăng ký khóa học)?
  *Trả lời:* Ngay khi Consent Version thay đổi, toàn bộ consent trước đó được xem là không còn hiệu lực. Banner sẽ hiển thị lại cho tất cả người dùng ở lần truy cập tiếp theo trên toàn website, không giới hạn ở một số trang cụ thể.

### 5. Competitors (Đối thủ cạnh tranh)
- **Q5.1:** So với giải pháp Cookie Consent của các hệ thống LMS đối thủ (như Tutor LMS, LifterLMS), LearnPress Cookie Consent có điểm mạnh nổi bật nào để tạo lợi thế cạnh tranh (ví dụ: thiết kế native khớp theme LearnPress, tích hợp sẵn Google Consent Mode v2...)?
  *Trả lời:* Điểm mạnh của LearnPress Cookie Consent không nằm ở việc có nhiều tính năng hơn các CMP chuyên nghiệp, mà ở việc:

Tích hợp sẵn trong LearnPress Core, không cần cài thêm plugin.
Giao diện đồng bộ với hệ thống LearnPress.
Thiết lập nhanh, dễ sử dụng cho người dùng phổ thông.
Hiệu năng nhẹ, không làm tăng số lượng plugin trên website.
Có JavaScript API và PHP Hooks để developer dễ dàng tích hợp với Google Analytics, Google Tag Manager, Meta Pixel hoặc các dịch vụ khác.
Giảm nguy cơ xung đột với các thành phần của LearnPress.

### 6. Revenue & Pricing (Doanh thu & Định giá)
- **Q6.1:** Tính năng này được đưa vào LearnPress Core hoàn toàn miễn phí. Trong tương lai có kế hoạch phát triển phiên bản Pro Add-on (ví dụ: Auto Cookie Scanner, GeoIP nâng cao, Báo cáo Consent Analytics) để tạo doanh thu không?
  *Trả lời:* iện tại chưa có kế hoạch phát triển phiên bản Pro. Mục tiêu là cung cấp một giải pháp Cookie Consent hoàn chỉnh ngay trong LearnPress Core. Nếu trong tương lai xuất hiện nhu cầu rõ ràng từ thị trường, nhóm phát triển có thể xem xét mở rộng thêm các tính năng nâng cao, nhưng đây không phải mục tiêu của phiên bản đầu tiên.

### 7. UX / User Flow (Trải nghiệm người dùng & Luồng thao tác)
- **Q7.1:** Giao diện banner mặc định khi vừa kích hoạt sẽ ở vị trí nào (Bottom Bar, Top Bar, Bottom-Left Popup hay Center Modal) và sử dụng Theme nào (Light hay Dark)?
  *Trả lời:* Mặc định sử dụng:

Position: Bottom Bar
Theme: Light

Đây là lựa chọn phổ biến, ít gây ảnh hưởng đến trải nghiệm người dùng và phù hợp với hầu hết giao diện website.
- **Q7.2:** Link/Nút "Cookie Settings" sẽ tự động được inject vào Footer của trang web LearnPress hay yêu cầu người dùng phải tự chèn thủ công qua Shortcode / Gutenberg Block / Widget?
  *Trả lời:* Không tự động chèn vào Footer.

LearnPress sẽ cung cấp nhiều phương thức để hiển thị:

Shortcode
Gutenberg Block
PHP Function

Việc đặt ở đâu sẽ do theme hoặc Administrator quyết định, tránh can thiệp vào cấu trúc giao diện của website.
- **Q7.3:** Trong Admin (`LearnPress → Settings → Privacy & Cookies`), giao diện quản lý nên thiết kế dạng Sub-tabs (Cài đặt chung, Categories, Quy tắc hiển thị, Tương thích) hay dạng một danh sách cấu hình cuộn trượt đơn giản?
  *Trả lời:* Sử dụng Sub-tabs để nhóm các thiết lập theo từng chức năng, giúp giao diện rõ ràng và dễ mở rộng trong tương lai.

Đề xuất các nhóm:

General
Appearance
Content
Behavior
Developer
Compatibility

### 8. Technical / Integrations (Kỹ thuật & Tích hợp)
- **Q8.1:** **Xử lý với Page Caching:** Để đảm bảo 100% không bị dính cache trang (WP Rocket, LiteSpeed, Cloudflare), có đồng ý rằng toàn bộ việc kiểm tra Cookie và render Banner sẽ chạy bằng JavaScript phía Client sau khi trang đã load xong không?
  *Trả lời:* Đồng ý.

Toàn bộ quá trình kiểm tra consent, hiển thị banner và cập nhật trạng thái sẽ được xử lý phía Client bằng JavaScript sau khi trang được tải. Điều này đảm bảo khả năng tương thích với các plugin cache, CDN và Full Page Cache, đồng thời tránh việc phải tạo nhiều phiên bản HTML khác nhau dựa trên trạng thái consent.
- **Q8.2:** **Phát hiện xung đột Plugin khác:** Khi phát hiện các plugin như Complianz hay CookieYes đang active, hệ thống nên **(A)** Tự động ẩn Banner của LearnPress và hiện cảnh báo trong Admin, hay **(B)** Chỉ hiện cảnh báo trong Admin và vẫn cho Admin chọn bật/tắt thủ công?
  *Trả lời:* Chọn (B).

LearnPress sẽ chỉ hiển thị cảnh báo trong khu vực quản trị rằng hệ thống đã phát hiện một Cookie Consent plugin khác đang hoạt động và có thể gây xung đột.

Quyết định bật hoặc tắt Cookie Consent của LearnPress vẫn thuộc về Administrator, tránh việc hệ thống tự động thay đổi hành vi ngoài mong muốn.
- **Q8.3:** **Tích hợp GeoIP:** Việc chỉ hiển thị Banner cho khách truy cập từ EU/UK sẽ dựa vào HTTP Header của Cloudflare/CDN hay sẽ tích hợp thư viện GeoIP JS/PHP nhẹ?
  *Trả lời:* Không tích hợp GeoIP trong phiên bản đầu tiên.

Banner sẽ mặc định hiển thị cho tất cả người dùng nhằm đảm bảo tính đơn giản và tránh phụ thuộc vào hạ tầng của từng website.

Nếu trong tương lai cần hỗ trợ hiển thị theo khu vực địa lý, ưu tiên sử dụng HTTP Header từ Cloudflare hoặc CDN thay vì tích hợp thư viện GeoIP riêng để giảm chi phí bảo trì và tăng độ chính xác.

### 9. SEO / GTM (SEO & Marketing)
- **Q9.1:** Có cần biên soạn bài viết hướng dẫn (Blog / Doc) chủ đề *"Cách cấu hình Cookie Consent chuẩn GDPR cho website đào tạo trực tuyến với LearnPress"* để thu hút lượng tìm kiếm SEO không?
  *Trả lời:* Có.

Nên chuẩn bị đầy đủ:

Documentation hướng dẫn cài đặt.
Blog hướng dẫn cấu hình.
FAQ về Cookie Consent và GDPR.
Developer Documentation cho JavaScript API và PHP Hooks.

Đây vừa là tài liệu hỗ trợ người dùng, vừa giúp tăng khả năng tiếp cận thông qua SEO.
- **Q9.2:** Danh sách từ khóa SEO bổ sung ngoài các từ khóa đã liệt kê (ví dụ: `LearnPress GDPR compliance`, `WordPress LMS privacy settings`) có từ khóa nào cần chú trọng đặc biệt không?
  *Trả lời:* Ưu tiên tập trung vào các từ khóa có ý định tìm kiếm cao liên quan trực tiếp đến LearnPress:

LearnPress Cookie Consent
LearnPress GDPR
LearnPress Cookie Banner
GDPR for LearnPress
Cookie Banner for LearnPress
WordPress LMS Cookie Consent
LMS GDPR Compliance
LearnPress Privacy Settings

### 10. QA / Acceptance Criteria (Đảm bảo chất lượng & Tiêu chí nghiệm thu)
- **Q10.1:** Giới hạn hiệu năng bắt buộc cho script Cookie Consent trên frontend là bao nhiêu (ví dụ: File JS < 15KB gzipped, thời gian thực thi JS < 30ms)?
  *Trả lời:* Đề xuất các tiêu chí:

JavaScript < 15KB (gzipped).
CSS < 5KB (gzipped).
Không phụ thuộc vào jQuery.
Không chặn quá trình render trang.
Không làm ảnh hưởng đáng kể đến Core Web Vitals.
Thời gian khởi tạo và hiển thị banner dưới 30ms trên trình duyệt hiện đại.
- **Q10.2:** Có yêu cầu bắt buộc đạt chuẩn truy cập WCAG 2.1 AA (hỗ trợ điều hướng bằng bàn phím Tab, đọc màn hình Screen Reader) cho Banner và Popup tùy chọn Cookie không?
  *Trả lời:* Có.

Banner và Popup phải đáp ứng các yêu cầu về khả năng truy cập như:

Điều hướng hoàn toàn bằng bàn phím.
Hỗ trợ Screen Reader.
ARIA Labels đầy đủ.
Focus Management đúng chuẩn.
Độ tương phản màu sắc đáp ứng WCAG 2.1 AA.
Có thể đóng hoặc thao tác mà không cần chuột.

### 11. Documentation (Tài liệu hướng dẫn)
- **Q11.1:** Bạn muốn bộ tài liệu đầu ra bao gồm những trang hướng dẫn nào cho người dùng (ví dụ: Hướng dẫn cài đặt cho Admin, Hướng dẫn tích hợp JS API/PHP Hooks cho Dev, Trang FAQ giải đáp thắc mắc về GDPR)?
  *Trả lời:* 
Đề xuất bộ tài liệu gồm:

Administrator Guide
Kích hoạt Cookie Consent.
Cấu hình banner.
Quản lý Categories.
Cấu hình Appearance và Behavior.
Developer Guide
JavaScript API.
PHP Hooks & Filters.
JavaScript Events.
Ví dụ tích hợp Google Analytics, GTM, Meta Pixel.
Theme Integration Guide
Sử dụng Shortcode.
Gutenberg Block.
PHP Function.
Tùy biến giao diện bằng CSS.
Compatibility Guide
Tương thích với plugin Cache.
Cloudflare.
LiteSpeed Cache.
WP Rocket.
Các plugin Cookie Consent khác.
FAQ
Vì sao Essential Cookies không thể tắt?
Làm thế nào để mở lại Cookie Settings?
Làm thế nào để chỉ tải Google Analytics sau khi người dùng đồng ý?
Vì sao banner không hiển thị?
Làm thế nào để tùy chỉnh giao diện banner?
---

## Câu hỏi ưu tiên cao

Dưới đây là **7 câu hỏi quan trọng nhất** cần được phản hồi sớm để định hình kiến trúc kỹ thuật và luồng trải nghiệm người dùng (UX):

> [!IMPORTANT]
> 1. **(Q4.1 - Cơ chế chặn Script):** Module này sẽ tự động chặn các script theo dõi (như GA4, Meta Pixel) chèn qua theme/plugin khác cho đến khi người dùng đồng ý, hay chỉ cung cấp JS Event / Helper Function để dev tự quản lý?
> 2. **(Q8.1 - Xử lý Page Caching):** Việc đọc consent và render banner có chốt xử lý 100% bằng JS ở phía Client để tránh sự cố lưu cache trang (WP Rocket, LiteSpeed Cache) không?
> 3. **(Q4.3 - Dạng hiển thị Banner):** Bạn muốn mặc định banner dạng thanh nhỏ không chặn thao tác (Non-blocking bottom/top bar) hay có tùy chọn Modal khóa màn hình (Blocking Modal) buộc học viên phải chọn trước khi vào xem bài học?
> 4. **(Q8.2 - Xử lý khi có Plugin Cookie khác):** Khi phát hiện plugin CMP khác (như Complianz, Cookiebot) đang chạy, LearnPress nên tự động tắt banner của mình hay chỉ hiển thị Cảnh báo (Notice) trong WP Admin?
> 5. **(Q7.2 - Link Cookie Settings ở Footer):** Link/Nút "Cookie Settings" sẽ tự động inject vào Footer mặc định của LearnPress hay Admin phải tự chèn qua Shortcode/Block?
> 6. **(Q8.3 - Quy tắc GeoIP EU/UK):** Cơ chế lọc hiển thị theo quốc gia (EU/UK) sẽ dựa trên Server/CDN Header (như Cloudflare) hay dùng thư viện GeoIP JS/PHP?
> 7. **(Q6.1 - Định hướng tương lai):** Tính năng này sẽ hoàn toàn miễn phí trong Core lâu dài, hay có kế hoạch mở rộng thành Pro Add-on trả phí trong tương lai?

---

## Bước tiếp theo

1. Hãy đọc và đưa ra câu trả lời trực tiếp dưới các mục câu hỏi ở trên.
2. Lưu file `projects/lp-gpdr/questions.md` lại.
3. Chạy lệnh sau trên terminal để bắt đầu sinh toàn bộ bộ tài liệu Product Documentation & Discovery:

```bash
npm run create -- lp-gpdr
```
