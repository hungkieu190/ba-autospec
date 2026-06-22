# Câu Hỏi Bổ Sung Cho learnpress-membership

## Hướng Dẫn Trả Lời

Hãy trả lời trực tiếp dưới từng câu hỏi. Có thể bỏ qua câu không liên quan hoặc ghi **"Không biết"** nếu chưa có dữ liệu. Mục tiêu là thu thập đủ thông tin để tạo bộ **Product Discovery + Product Documentation + Marketing Package** hoàn chỉnh theo workflow mới gồm 7 tài liệu chính, `index.md`, `quality-report.md`, và `asana-task.html`.

Thuật ngữ chuyên ngành giữ nguyên tiếng Anh khi tự nhiên hơn: PRD, roadmap, user flow, wireframe, acceptance criteria, SEO, conversion, churn, LTV, CAC, MVP, API, webhook, hook, filter...

---

## Tóm Tắt Những Gì Đã Biết

Input hiện tại rất chi tiết ở phần kỹ thuật. Dưới đây là tóm tắt:

| Mục | Trạng thái |
| --- | --- |
| Product idea & proposed solution | ✅ Rõ ràng: 2 module — Restriction Engine + Woo Checkout Integration |
| Product type | ✅ WordPress Plugin / LMS Add-on / eCommerce Extension |
| Target users (primary + secondary) | ✅ 7 nhóm: Admin, LMS Owner, Education Business, Instructor, Student, Developer, Guest |
| User roles | ✅ Admin, Instructor, Student, Customer, Guest, Manager, Developer |
| Core problem | ✅ Thiếu restrict content linh hoạt + thiếu Woo checkout cho membership |
| Proposed solution (2 modules) | ✅ Chi tiết kiến trúc, pattern tham chiếu, code references |
| Must-have features | ✅ 14 features cụ thể |
| Nice-to-have features | ✅ 8 features mở rộng |
| Out of scope | ✅ 6 mục loại trừ rõ |
| Competitors | ✅ 7 đối thủ/giải pháp thay thế được liệt kê |
| Integrations | ✅ 10 hệ thống tích hợp |
| Risks & constraints | ✅ 10 rủi ro cụ thể kèm context kỹ thuật |
| Pricing model | ⚠️ Sơ lược: paid add-on, one-time hoặc subscription, bundle |
| SEO keywords | ⚠️ 8 keywords, chưa phân nhóm intent |
| Business goals | ✅ 5 mục tiêu kinh doanh |
| Success metrics | ✅ 8 metrics |
| Implementation phases | ✅ 4 phases chi tiết |
| Code references | ✅ 17 file paths thực tế |

---

## Các Assumption Đang Có

Dựa trên phân tích input theo framework VUBF (Value, Usability, Business Viability, Feasibility):

### Value Risk

| # | Assumption | Mức độ quan trọng | Bằng chứng hiện có |
| --- | --- | --- | --- |
| V1 | Admin LearnPress thực sự cần restrict content ngoài course-level access, không chỉ cần restrict course. | Cao | Yếu — chưa có dữ liệu support ticket, survey, hoặc feature request cụ thể. |
| V2 | Khách hàng sẵn sàng trả thêm tiền cho add-on membership nâng cấp thay vì dùng plugin membership bên thứ 3. | Cao | Yếu — chưa có dữ liệu pricing willingness hoặc conversion từ pricing page hiện tại. |
| V3 | Nhu cầu mua membership qua WooCommerce checkout đủ lớn để justify effort tích hợp. | Cao | Trung bình — dựa trên lập luận logic rằng nhiều site đã dùng Woo, nhưng chưa có số liệu cụ thể. |
| V4 | User sẽ chuyển từ WooCommerce Memberships / MemberPress sang LearnPress Membership. | Trung bình | Yếu — chưa có switching cost analysis hoặc migration path. |

### Usability Risk

| # | Assumption | Mức độ quan trọng | Bằng chứng hiện có |
| --- | --- | --- | --- |
| U1 | Admin có thể hiểu và tạo restriction rules mà không cần training. | Cao | Yếu — chưa có wireframe hoặc usability benchmark. |
| U2 | Luồng mua membership qua Woo không gây confusion so với LP checkout hiện tại khi cả 2 cùng tồn tại. | Cao | Yếu — chưa mô tả cách user phân biệt 2 luồng checkout. |

### Business Viability Risk

| # | Assumption | Mức độ quan trọng | Bằng chứng hiện có |
| --- | --- | --- | --- |
| B1 | Revenue từ membership add-on nâng cấp sẽ cao hơn chi phí phát triển + maintain Woo integration + restriction engine. | Cao | Yếu — chưa có estimated dev cost, pricing target, hoặc revenue projection. |
| B2 | Support cost sẽ không tăng quá mức do phức tạp của Woo lifecycle mapping + restriction edge cases. | Trung bình | Yếu — Woo Subscriptions lifecycle rất phức tạp, chưa ước lượng support burden. |

### Feasibility Risk

| # | Assumption | Mức độ quan trọng | Bằng chứng hiện có |
| --- | --- | --- | --- |
| F1 | `learnpress-woo-payment` đủ linh hoạt để mở rộng cho membership item type mà không cần refactor lớn. | Cao | Trung bình — đã review code references nhưng chưa confirm compatibility đầy đủ. |
| F2 | Restriction hooks (`pre_get_posts`, `the_content`, `the_posts`) sẽ không gây side-effect nghiêm trọng với page builders, REST API, search, admin preview. | Cao | Yếu — risk đã được liệt kê nhưng chưa có POC hoặc compatibility matrix. |
| F3 | Performance cache/memoization cho restriction rules sẽ đủ hiệu quả trên site có 500+ courses, 10k+ posts. | Trung bình | Yếu — chưa có benchmark hoặc load test plan cụ thể. |

---

## Câu Hỏi Cần Trả Lời

### A. Product Context

**A1.** Phiên bản hiện tại của `learnpress-membership` đang bán ở đâu (ThimPress marketplace, WordPress.org, hoặc cả 2)? Giá bán hiện tại là bao nhiêu?
đang bán trên thimpress.com

**A2.** Có bao nhiêu site đang active sử dụng `learnpress-membership`? Tỉ lệ renewal/churn hiện tại ra sao?
có khoảng 20 site

**A3.** Các ticket support phổ biến nhất liên quan đến `learnpress-membership` là gì? Có ticket nào liên quan đến nhu cầu restrict content hoặc Woo checkout không?
không quan trọng, tính năng này là concept bắt buộc phải có

**A4.** `learnpress-membership` hiện là sản phẩm standalone hay bắt buộc mua kèm LearnPress Pro Bundle? Có plan tách bán riêng restrict content hoặc Woo integration không?
là sản phẩm bán riêng, 2 tính năng mới thêm nằm trong bản nâng cấp, không tách ra bán riêng

---

### B. Market Validation

**B1.** Có dữ liệu nào cho thấy khách hàng LearnPress đang yêu cầu restrict content (feature request, forum post, support ticket, survey)? Nếu có, ước lượng bao nhiêu request trong 6-12 tháng gần nhất?
k quan trọng, đấy là tín năng phải thêm vào

**B2.** Có bao nhiêu % site LearnPress đang dùng WooCommerce song song? Có dữ liệu nào từ `learnpress-woo-payment` active installs không?
không có dữ liệu

**B3.** Trong số các competitors đã liệt kê (WooCommerce Memberships, MemberPress, Paid Memberships Pro, Restrict Content Pro), pé có insight nào về điểm yếu cụ thể của họ khi dùng với LMS/LearnPress không? Ví dụ: không hỗ trợ LearnPress course enrollment, phải mapping thủ công...
không quan trọng, mình phải làm tốt hơn họ

**B4.** Có khách hàng nào đang dùng WooCommerce Memberships + LearnPress cùng lúc không? Họ gặp pain point gì? Có case study hoặc feedback cụ thể không?
không có, sản phẩm 1.0 chưa có nhiều dữ liệu

**B5.** Thị trường mục tiêu chính là global hay tập trung vào khu vực nào (English-speaking, SEA, specific country)?
global
---

### C. Users & Roles

**C1.** Role "Manager" được đề cập nhưng chưa mô tả chi tiết. Manager có quyền gì khác Admin? Có thể tạo/sửa restriction rules không? Có thể quản lý membership plans không?
only admin
**C2.** Role "Developer" cần những developer hooks/filters cụ thể nào ngoài public helper API đã liệt kê? Ví dụ: filter message, filter rule evaluation, action khi access bị deny...
only admin
**C3.** Guest user khi truy cập nội dung restricted sẽ thấy gì? Login form, pricing table, redirect, hay custom message? Cần hỗ trợ nhiều hơn 1 hành vi cho guest không?
only admin

**C4.** Instructor có quyền tự tạo restriction rules cho course/lesson của mình không? Hay chỉ Admin mới được tạo rules?

chỉ admin mới được tạo, only admin

### D. Scope & Features

**D1.** Restriction rule cho taxonomy term cụ thể hoạt động thế nào? Ví dụ: restrict tất cả course thuộc category "Premium"? Hay restrict tất cả post có tag "VIP"? Cần hỗ trợ bao nhiêu taxonomy types?
restrict tất cả course thuộc category "Premium", hỗ trợ tất cả taxonomy types của learnpress,post
**D2.** Restriction rule có hỗ trợ điều kiện kết hợp không? Ví dụ: user phải có Plan A **VÀ** Plan B, hay chỉ cần 1 trong nhiều plan (OR logic)? Hay Phase 1 chỉ cần OR?
OR

**D3.** Khi restriction mode là "hide completely", nội dung có bị ẩn khỏi WordPress search results, sitemap XML, RSS feed, và REST API `/wp/v2/posts` không? Hay chỉ ẩn khỏi archive/listing?
bạn tự đề xuất nhé

**D4.** Shortcode/block `[member_content]` có hỗ trợ hiển thị nội dung khác nhau cho từng plan level không? Ví dụ: Plan Bronze thấy nội dung A, Plan Gold thấy nội dung A + B?
không

**D5.** Khi admin tạo WC product cho membership plan, mỗi plan tương ứng 1 WC product? Hay có 1 WC product "Membership" rồi chọn plan bên trong? Cách nào là preferred?
quan trọng gì, dùng rule hiện tại của learnpress membership
1 plan, add được nhiều products

**D6.** Membership plan có hỗ trợ trial period (ví dụ: 7 ngày free trial) không? Nếu có, trial qua LP checkout hay chỉ qua Woo Subscriptions?
có, và hỗ trợ luôn free trial, khi hết hạn thì trừ tiền bằng woo subscription

**D7.** Khi user đang có membership active qua LP checkout, rồi mua lại qua Woo checkout — hành vi mong muốn là gì? Extend duration? Override? Block duplicate purchase?
block


**D8.** Phase 1 (Restriction Foundation) và Phase 3 (Woo MVP) có release độc lập không? Hay phải ship cùng nhau?
độc lập
---

### E. Competitors

**E1.** Với mỗi competitor đã liệt kê, pé có biết mức giá cụ thể không?

| Competitor | Giá bán (nếu biết) |
| --- | --- |
| WooCommerce Memberships | |
| Paid Memberships Pro | |
| MemberPress | |
| Restrict Content Pro | |
đừng quan tâm giá bán bọn kia, lp membership có giá bán rồi

**E2.** Competitor nào là mối đe dọa lớn nhất cho LearnPress Membership hiện tại? Vì sao?

**E3.** Có competitor nào offer LearnPress integration sẵn không? Hay tất cả đều yêu cầu custom code/mapping thủ công?

**E4.** Khách hàng thường so sánh `learnpress-membership` với giải pháp nào nhất? Có dữ liệu từ pre-sale questions hoặc comparison searches không?

---

### F. Revenue & Pricing

**F1.** Giá bán mục tiêu cho `learnpress-membership` sau khi nâng cấp? Có tăng giá so với hiện tại không?
có sẽ discount còn 25% thôi, hiện tại đang discount ~ 50%

**F2.** Restrict content module và Woo integration module sẽ bán chung 1 license hay tách riêng? Nếu tách, giá mỗi module ước lượng bao nhiêu?
bán chung, nó vẫn làm learnpress membership bản 1.1 thôi,k tách riêng

**F3.** Có plan chuyển sang subscription license (gia hạn hàng năm) không? Nếu có, tỉ lệ renewal kỳ vọng là bao nhiêu?
có, hiện tại đang có hàng năm mà

**F4.** Ước lượng revenue target cho 12 tháng đầu sau launch? (Ví dụ: số license bán được, ARR mục tiêu)

**F5.** Bundle LearnPress Pro Bundle hiện giá bao nhiêu? `learnpress-membership` upgrade có thay đổi giá bundle không?
không

---

### G. UX / User Flow

**G1.** Admin tạo restriction rule ở đâu trong admin UI? Các option:
- Trong màn hình edit Plan → tab "Protected Content"?
- Trong màn hình edit Post/Page/Course → metabox "Membership Required"?
- Cả 2?
- Màn hình quản lý rules riêng biệt?
trong màn hình edit plan
**G2.** Khi user truy cập nội dung restricted, ưu tiên hiển thị CTA gì? Pricing table của membership plans? Nút "Mua membership"? Link đến trang pricing riêng? Hay tuỳ admin cấu hình?
Link đến trang pricing riêng

**G3.** Khi admin cấu hình Woo checkout cho membership, luồng mong muốn là:
- Admin bật toggle "Enable WooCommerce Checkout" → hệ thống tự tạo shadow WC product?
- Admin tự tạo WC product rồi map với plan?
- Cả 2 option?
Admin tự tạo WC product rồi map với các course thuộc plan đó

**G4.** Profile tab hiện tại của membership trên frontend có cần thay đổi gì khi membership được mua qua Woo? Ví dụ: hiển thị thêm Woo order reference, link sang Woo account?
Không cần thay đổi gì, vẫn như cũ

**G5.** Membership pricing page/block hiện tại có tự detect và hiển thị nút "Buy via WooCommerce" thay vì "Buy via LearnPress" khi Woo mode active không?
có

---

### H. Technical / Integrations

**H1.** `learnpress-woo-payment` hiện có version nào đang active? Có breaking changes nào đã biết giữa các version không?

**H2.** Khi `learnpress-woo-payment` có 2 mode (LP course product vs assigned Woo product), membership sẽ chọn mode nào ở Phase 1? Hay cần support cả 2?
cả 2

**H3.** Schema DB table `lp_membership_rules` dự kiến ra sao? Có draft schema chưa? Hay cần thiết kế từ đầu dựa trên pattern `wc_memberships_rules`?

để team backend thiết kế, mình k cần làm

**H4.** Restriction rule evaluation sẽ cache ở đâu? Object cache (Redis/Memcached)? Transient? Static variable per-request? Hay tuỳ server setup?
cách nào optimize nhất thì dùng, k rành lắm về cái này :v

**H5.** LearnPress REST API hiện có endpoint nào liên quan đến membership/enrollment không? Restriction cần filter response ở level nào (controller, query, output)?

**H6.** Cần support multisite WordPress không? Nếu có, restriction rules là per-site hay network-wide?

**H7.** Elementor integration (nice-to-have) có cần trong Phase 1 không? Hay chỉ cần đảm bảo restriction không break Elementor preview/editor?

---

### I. SEO / Go-to-Market

**I1.** Product page cho `learnpress-membership` hiện đang ở URL nào? Có trang pricing riêng không?
có trang pricing riêng đấy

**I2.** Có blog/content nào đã publish liên quan đến LearnPress membership chưa (tutorial, comparison, announcement)?

**I3.** Kênh distribution chính là ThimPress website, WordPress.org, hoặc marketplace khác? Có plan list trên CodeCanyon/Envato không?

**I4.** Có email list khách hàng LearnPress hiện tại để gửi launch announcement không? Ước lượng bao nhiêu subscribers?

**I5.** Chiến lược SEO cho keywords đã liệt kê: ưu tiên target keyword nào đầu tiên? Có competitor nào đang rank mạnh cho các keywords này không?

**I6.** Có plan tạo demo site để khách hàng trải nghiệm membership + restrict content trước khi mua không?

---

### J. QA / Acceptance Criteria

**J1.** Danh sách page builders phải đảm bảo tương thích với restriction: Elementor, Beaver Builder, Divi, WPBakery, Gutenberg — cần test tất cả hay chỉ Elementor + Gutenberg?
elementor + gutenberg

**J2.** Có test environment/staging site sẵn sàng cho membership testing không? Hay cần setup mới?
sẽ tự setup 

**J3.** Performance target: trang có restriction rule phải load trong bao nhiêu ms? Query budget cho restriction check trên archive page có bao nhiêu posts?

**J4.** Backward compatibility: khi nâng cấp từ version hiện tại sang version mới, data migration cho existing plans/members có cần automated migration script không?

**J5.** Woo Subscriptions testing: cần test với Woo Subscriptions version nào? Có cần test cả HPOS (High-Performance Order Storage) compatibility không?
woo subcriptions mới nhất

---

### K. Documentation

**K1.** Documentation hiện tại của `learnpress-membership` ở đâu? Cần update docs hiện tại hay tạo docs section mới hoàn toàn?
cần update docs

**K2.** Developer docs cần ở mức nào? Chỉ liệt kê hooks/filters? Hay cần code examples, use cases, extension tutorials?
tất cả

**K3.** Changelog hiện tại follow format nào? Semantic versioning? Version mới cho restriction + Woo sẽ là major bump (v2.0) hay minor (v1.x)?
v 4.1

**K4.** Ngôn ngữ docs chính: chỉ tiếng Anh? Hay cần tiếng Việt song song?

---chỉ tiếng anh

## Câu Hỏi Ưu Tiên Cao

Đây là 10 câu quan trọng nhất cần trả lời trước khi tạo bộ tài liệu đầy đủ:

| # | Câu hỏi | Lý do ưu tiên |
| --- | --- | --- |
| 1 | **B1** — Có dữ liệu feature request cho restrict content không? | Quyết định Market Opportunity Score và Build Recommendation. |
| 2 | **B2** — Bao nhiêu % site LP đang dùng WooCommerce? | Xác nhận nhu cầu thực tế cho Woo checkout integration. |
| 3 | **D8** — Phase 1 và Phase 3 release độc lập hay cùng nhau? | Ảnh hưởng PRD scope, roadmap, test plan, và launch timeline. |
| 4 | **F1** — Giá bán mục tiêu sau nâng cấp? | Cần cho Revenue Potential, Build-or-Not-Build Report. |
| 5 | **D2** — Rule logic AND hay OR cho multi-plan? | Ảnh hưởng trực tiếp đến DB schema, rule engine, PRD requirements. |
| 6 | **G1** — Admin tạo restriction rule ở đâu trong UI? | Quyết định wireframe, user flow, và UX complexity. |
| 7 | **D5** — 1 WC product per plan hay 1 product chung? | Ảnh hưởng kiến trúc Woo integration, user flow mua hàng. |
| 8 | **H2** — Woo payment mode nào cho Phase 1? | Giảm ambiguity cho technical PRD và test plan. |
| 9 | **A2** — Số site active và churn hiện tại? | Cần cho market sizing, revenue projection, competitive analysis. |
| 10 | **A3** — Top support tickets hiện tại? | Xác nhận pain points thực tế, ưu tiên features đúng nhu cầu. |

---

## Bước Tiếp Theo

Sau khi trả lời các câu hỏi ở trên:

1. Lưu file `questions.md` với câu trả lời điền trực tiếp bên dưới mỗi câu hỏi.
2. Chạy lệnh generate bộ tài liệu đầy đủ:
   ```
   npm run create -- learnpress-membership
   ```
3. Hệ thống sẽ đọc `input.md` + `questions.md` + skill package để tạo 7 tài liệu chính và `asana-task.html` trong `projects/learnpress-membership/output/`.
