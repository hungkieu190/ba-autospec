# Câu hỏi bổ sung cho lp-tutor-booking

---

## Hướng dẫn trả lời

Hãy trả lời trực tiếp dưới từng câu hỏi. Có thể bỏ qua câu hỏi không liên quan đến sản phẩm của bạn. Ghi **"Không biết"** nếu chưa có dữ liệu. Giữ nguyên thuật ngữ tiếng Anh khi cần thiết (PRD, API, webhook, checkout, v.v.).

---

## Tóm tắt những gì đã biết

| Mục | Trạng thái |
|---|---|
| Tên sản phẩm | ✅ LearnPress Tutor Booking |
| Loại sản phẩm | ✅ LMS Add-on cho LearnPress |
| Vấn đề cốt lõi | ✅ Thiếu giải pháp native cho lịch dạy kèm và booking trên LearnPress |
| Giải pháp | ✅ Add-on quản lý booking, lịch, thanh toán, review tích hợp LearnPress |
| Target users | ✅ Instructor, Student, Admin (cả B2B lẫn individual) |
| User roles | ✅ Admin / Instructor / Student |
| Must-have features | ✅ Đầy đủ (availability, booking, payment, meeting, email, review) |
| Nice-to-have features | ✅ Calendar sync, session packages, credit system, recurring sessions |
| Out of scope | ✅ Rõ ràng (không thay thế core LMS) |
| Competitors | ✅ Danh sách có (Calendly, Amelia, Bookly, v.v.) |
| Pricing model | ✅ One-time purchase + LearnPress Pro Bundle |
| SEO keywords | ✅ Có danh sách cơ bản |
| Business goals | ✅ Có |
| Success metrics | ✅ Có danh sách cơ bản |
| Risks | ✅ Có (timezone, conflict detection, compatibility) |
| Integrations | ✅ Có (LearnPress, Zoom, Google Meet, Calendar) |

---

## Quyết định đã chốt sau Q&A

Các mục dưới đây đã được tổng hợp vào `input.md` và phải được coi là source of truth khi chạy lại generator. Không giữ lại các mục này dưới dạng câu hỏi mở trong output production.

| Nhóm | Quyết định |
|---|---|
| Product status | Chưa có prototype/MVP; đây là add-on hoàn toàn mới |
| LearnPress compatibility | Target LearnPress 4.4.1; v1.0 tương thích core LearnPress |
| Market | Global; team đã khảo sát workflow thủ công như email, Google Calendar, Google Form |
| Admin permission | Admin quản lý toàn bộ booking, có thể xem/cancel/confirm/export |
| Tutor profile | Một instructor có thể có nhiều tutor profile với lịch/giá khác nhau |
| Login rule | Booking availability/action yêu cầu user đăng ký và login |
| Group session | Có max seats; có thể auto-confirm khi đủ số lượng |
| Cancellation | Student cancel; default 24 giờ trước session; configurable |
| Reschedule | Student tự chọn slot mới; default 24 giờ trước session; configurable; không giới hạn số lần trong v1.0 |
| Meeting link | Instructor nhập meeting link một lần; không cần auto-generate link qua Zoom/Google Meet API trong v1.0 |
| Coupon | Không làm coupon/discount trong v1.0 |
| Timezone | Instructor set timezone; student xem giờ theo timezone của student; store UTC |
| Confirmation | Booking tự động Confirmed sau khi thanh toán LearnPress thành công |
| No Show | Trigger sau 30 phút từ lúc session kết thúc nếu chưa có completion action |
| Pricing | USD 39 cho 1 site license; một bản thương mại; không freemium; chưa dùng subscription/renewal |
| Payment owner | Thanh toán đi qua site owner; instructor payout ngoài scope |
| Instructor discovery | Có instructor listing page và instructor profile |
| Dashboard | Instructor dashboard ở cả wp-admin và frontend LearnPress dashboard |
| Calendar | Google Calendar nằm trong v1.0; sync booking và kiểm tra busy time để chống conflict |
| Conflict detection | Kiểm tra cả internal Tutor Booking và Google Calendar connected busy time |
| Webhook | Có webhook cho booking events |
| Refund | Refund thủ công theo LearnPress Order policy |
| Email | Dùng LearnPress email system |
| GDPR/export | Có yêu cầu GDPR và export booking data |
| GTM | Bán qua ThimPress.com; landing page trên learnpresslms.com; launch bằng blog; có demo site |
| Docs | User docs tiếng Anh, host ở help.thimpress.com, text-based + screenshot |

---

## Các assumption đang có

Những giả định dưới đây đã được rà soát sau Q&A. Các mục đã có quyết định thì không được giữ thành câu hỏi mở trong output:

1. **Assumption về thị trường**: LearnPress đang có đủ lượng instructor muốn bán dịch vụ dạy kèm 1-1 (không chỉ bán course).
2. **Decision về pricing**: Product có một bản thương mại, USD 39 cho 1 site license, chưa dùng freemium/subscription.
3. **Assumption về payment**: LearnPress Checkout đủ mạnh để xử lý booking payment (refund, partial, v.v.) mà không cần logic bổ sung.
4. **Assumption về meeting**: Instructor tự nhập meeting link thủ công — không cần auto-generate link từ Zoom/Google Meet API.
5. **Assumption về conflict**: Hệ thống tự detect và block double-booking không cần thao tác thủ công từ instructor.
6. **Assumption về group session**: Group session có số người tối đa cố định do instructor thiết lập.
7. **Assumption về review**: Review chỉ được phép sau khi session trạng thái = Completed.
8. **Decision về reschedule**: Student có thể tự reschedule trước deadline mặc định 24 giờ, deadline configurable, không cần instructor approve.
9. **Assumption về refund**: Khi booking bị cancelled, refund xử lý theo chính sách LearnPress Order — không tự động.
10. **Decision về timezone**: Student xem giờ theo timezone của student; instructor set timezone trong settings; hệ thống lưu UTC.

---

## Câu hỏi cần trả lời

---

### 1. Product Context

**1.1.** Sản phẩm này đã có prototype, mockup, hoặc MVP chưa? Nếu có, có thể chia sẻ link hoặc mô tả trạng thái hiện tại không?

> **Trả lời:** chưa có

**1.2.** Đây là sản phẩm hoàn toàn mới hay đang nâng cấp/thay thế một tính năng hoặc add-on cũ trong hệ sinh thái LearnPress?

> **Trả lời:** sản phẩm hoàn toàn mới 

**1.3.** Target release là LearnPress version nào? Add-on có yêu cầu phiên bản LearnPress tối thiểu không?

> **Trả lời:** learnpress 4.4.1

**1.4.** Add-on có tương thích với các LearnPress add-on phổ biến khác không (ví dụ: LearnPress Paid Memberships, LearnPress Certificates, LearnPress Multi-Instructors)? Hay chỉ cần tương thích với core LearnPress?

> **Trả lời:** Tương thích với core LP

**1.5.** Có yêu cầu tương thích với WordPress Multisite không?

> **Trả lời:** không cần

---

### 2. Market Validation

**2.1.** Đã có instructor hoặc site owner nào phản hồi nhu cầu cụ thể về tính năng này chưa? Nếu có, họ phản hồi qua kênh nào (support ticket, forum, survey)?

> **Trả lời:** đây là kế hoạch team tự nghiên cứu và phát triển

**2.2.** Đã có khảo sát hoặc interview với instructor về workflow booking hiện tại của họ chưa? Họ đang dùng công cụ gì và điểm đau lớn nhất là gì?

> **Trả lời:** đã khảo sát, và họ sẽ phải dùng các công cụ thủ công, như email, google calendar, google form...

**2.3.** Có dữ liệu về số lượng LearnPress website hiện tại đang cài các add-on booking bên thứ ba (Calendly, Amelia, v.v.) không?

> **Trả lời:** không

**2.4.** Tutor LMS có add-on Appointment Booking riêng — team đã phân tích điểm mạnh/yếu của sản phẩm đó và feedback từ người dùng chưa?

> **Trả lời:** sản phẩm đó là hỗ trợ cho 1 plugin thứ 3 tên là FluentBooking, cái mình muốn làm là tự xây dựng

**2.5.** Thị trường mục tiêu ưu tiên là khu vực nào? Có ưu tiên thị trường cụ thể nào về ngôn ngữ, múi giờ, hoặc phương thức thanh toán không?

> **Trả lời:** Global

---

### 3. Users & Roles

**3.1.** Admin có thể quản lý booking thay cho instructor không (ví dụ: xem tất cả booking trên toàn site, force cancel/confirm, xuất báo cáo)?

> **Trả lời:** có

**3.2.** Một instructor có thể có nhiều "tutor profile" khác nhau không (ví dụ: dạy Toán và dạy Tiếng Anh với lịch và giá khác nhau)?

> **Trả lời:** có

**3.3.** Một student có thể book nhiều instructor cùng lúc không? Có giới hạn số session active tối đa mỗi student không?

> **Trả lời:** nên có option

**3.4.** Có user role trung gian nào không được đề cập — ví dụ: School Manager quản lý nhiều instructor, hoặc Corporate Account quản lý nhiều student không?

> **Trả lời:** không

**3.5.** Guest (chưa đăng nhập) có thể xem lịch hoặc profile instructor không? Hay phải đăng nhập mới thấy available slots?

> **Trả lời:** phải đăng ký và login

---

### 4. Scope & Features

**4.1.** Group Session hoạt động như thế nào? Instructor thiết lập số chỗ tối đa, student book từng slot cho đến khi đủ người — hay instructor phải tự confirm khi đủ số lượng?

> **Trả lời:** session có thể có nhiều người, và có thể tự động confirm khi đủ số lượng 

**4.2.** Khi booking bị cancel: ai có thể cancel (chỉ student, chỉ instructor, hay cả hai)? Deadline cancel là bao lâu trước giờ học? Có phí phạt không?

> **Trả lời:** chỉ student, deadline 24h trước giờ học, có thể config

**4.3.** Reschedule hoạt động thế nào? Student chọn slot mới từ lịch có sẵn, hay instructor phải confirm slot mới? Reschedule có giới hạn số lần không?

> **Trả lời:** Student có thể reschedule bằng cách chọn slot mới còn available. Deadline mặc định là 24 giờ trước session và có thể config. Không giới hạn số lần reschedule trong v1.0.

**4.4.** Meeting link: instructor nhập thủ công từng session, hay nhập một lần cho tất cả session cùng loại? Có auto-generate link từ Zoom/Google Meet API không (ít nhất ở v2.0)?

> **Trả lời:** instructor chỉ cần nhập link 1 lần

**4.5.** Booking có hỗ trợ coupon/discount không? Coupon từ hệ thống LearnPress Coupon có áp dụng được cho booking không?

> **Trả lời:** chưa có, không làm

**4.6.** Instructor có thể chặn một ngày cụ thể (holiday blocking) mà không ảnh hưởng đến recurring schedule tuần sau không?

> **Trả lời:** được

**4.7.** Timezone: hệ thống hiển thị giờ theo timezone nào — timezone của WordPress site, của instructor, hay của student? Có auto-convert và hiển thị cả hai múi giờ không?

> **Trả lời:** hiển thị múi giờ của student, instructor có thể set timezone ở phần cài đặt

**4.8.** Booking Confirmation có cần bước Instructor Approval thủ công không (Pending → Instructor Confirms → Confirmed), hay tự động confirm ngay sau khi thanh toán thành công?

> **Trả lời:** tự động confirm ngay sau khi thanh toán thành công

**4.9.** "No Show" status được trigger thế nào? Tự động sau X phút session hết giờ mà không có action nào, hay instructor phải mark thủ công?

> **Trả lời:** sau 30 phút

**4.10.** Instructor có thể đặt giá khác nhau cho từng session type không (ví dụ: One-to-One 500k/h, Group Session 200k/người)?

> **Trả lời:** có thể

---

### 5. Competitors

**5.1.** Trong danh sách competitor, đâu là đối thủ được coi là nguy hiểm nhất với sản phẩm này? Lý do?

> **Trả lời:** không trả lời

**5.2.** Đã thử dùng hoặc demo Tutor LMS Appointment Booking chưa? Điểm mà sản phẩm này làm tốt và điểm mà LearnPress Tutor Booking sẽ làm tốt hơn?

> **Trả lời:** không trả lời

**5.3.** Có competitor nào đang tích hợp trực tiếp với LearnPress chưa? Nếu có, họ tích hợp ở mức nào?

> **Trả lời:** không biết

**5.4.** Điểm khác biệt lớn nhất mà team muốn nhấn mạnh so với Amelia và Bookly (hai booking plugin phổ biến nhất trên WordPress) là gì?

> **Trả lời:** nhấn mạnh vào việc tích hợp riêng và hoạt động tốt trên learnpress

---

### 6. Revenue & Pricing

**6.1.** Giá bán dự kiến của add-on là bao nhiêu? Có mức giá khác nhau theo số lượng site (1 site, unlimited) không?

> **Trả lời:** 39$ 1 site / 1 năm

**6.2.** Có kế hoạch annual renewal (subscription) trong tương lai không, hay chỉ one-time lifetime?

> **Trả lời:** one time thôi

**6.3.** Khi bán qua LearnPress Pro Bundle, add-on này được định vị như một tính năng included hay là upsell riêng?

> **Trả lời:** tạm thời nó cứ là 1 addon độc lập đã

**6.4.** Có kế hoạch freemium — phiên bản free với tính năng giới hạn — để tăng adoption không? Nếu có, giới hạn ở tính năng nào?

> **Trả lời:** không, chỉ có duy nhất 1 phiên bản thương mại

**6.5.** Instructor có thể nhận thanh toán trực tiếp từ student (instructor payout), hay tất cả thanh toán đi qua tài khoản site owner và site owner chịu trách nhiệm trả cho instructor?

> **Trả lời:** không, tất cả thanh toán đi qua tài khoản site owner và site owner chịu trách nhiệm trả cho instructor

---

### 7. UX / User Flow

**7.1.** Student tìm thấy instructor để book qua đâu? Có trang danh sách tất cả instructor available, hay student phải vào profile từng instructor?

> **Trả lời:** học viên có thể tìm thấy instructor thông qua trang danh sách tất cả các instructor đang có trong hệ thống, hoặc cũng có thể vào từng profile instructor để tìm kiếm các available slots

**7.2.** Tutor profile được hiển thị ở đâu trên frontend — trang riêng, tab trong profile LearnPress, hay nhúng vào trang course?

> **Trả lời:** trang riêng, tab trong profile LearnPress, hoặc có thể nhúng vào trang course

**7.3.** Sau khi booking thành công, student join meeting thế nào? Chỉ qua link trong email, hay còn có nút "Join Meeting" trong student dashboard?

> **Trả lời:** có thể join qua link trong email, hoặc có nút "Join Meeting" trong student dashboard

**7.4.** Có màn hình "Booking Summary" hoặc "Session Recap" sau khi session hoàn thành không? Nội dung gồm những gì?

> **Trả lời:** không có

**7.5.** Instructor dashboard được đặt ở đâu — wp-admin, frontend LearnPress dashboard, hay cả hai?

> **Trả lời:** cả 2

**7.6.** Có yêu cầu mobile-responsive cho toàn bộ booking flow không? Hay chỉ cần responsive ở mức cơ bản?

> **Trả lời:** Có

**7.7.** Review & Rating: student chỉ submit rating sau khi session Completed, hay có thể submit sau X ngày? Instructor có thể reply review không?

> **Trả lời:** có thể reply review nhưng chưa làm chức năng này, sẽ làm trong tương lai

---

### 8. Technical / Integrations

**8.1.** Hệ thống có API public hoặc webhook không? Ví dụ: webhook khi có booking mới, khi session completed — để bên thứ ba (Zapier, CRM) có thể lắng nghe?


> **Trả lời:** có webhook

**8.2.** Calendar sync (Google Calendar, Outlook) có nằm trong v1.0 hay là roadmap v2.0? Nếu nằm trong v1.0, sync theo chiều nào (one-way export lịch booking sang Google Calendar, hay two-way sync)?

> **Trả lời:** Google Calendar nằm trong v1.0. Scope v1.0 gồm sync booking với Google Calendar và kiểm tra Google Calendar busy time để tránh conflict.

**8.3.** Booking conflict detection hoạt động ở cấp độ nào — chỉ trong hệ thống Tutor Booking, hay có kiểm tra cả calendar bên ngoài (Google Calendar)?

> **Trả lời:** google calendar và hệ thống của nó

**8.4.** Có yêu cầu hỗ trợ Multi-currency không? Hay chỉ cần theo currency mà site LearnPress đang dùng?

> **Trả lời:** theo currency mà site LearnPress đang dùng

**8.5.** Phần Refund: khi instructor cancel hoặc no-show, refund được xử lý tự động hay phải thủ công qua LearnPress Order? Logic refund theo chính sách nào?

> **Trả lời:** refund theo chính sách của Learnpress, refund thủ công qua hệ thống learnpress

**8.6.** Có yêu cầu giới hạn performance cụ thể không? Ví dụ: booking calendar phải load trong X giây với Y instructor cùng lúc?

> **Trả lời:** không

**8.7.** Email notification dùng hệ thống email nào — WordPress wp_mail, LearnPress email system, hay tích hợp thêm service bên ngoài (Mailchimp, SendGrid)?

> **Trả lời:** learnpress email system

**8.8.** Dữ liệu booking có cần tuân thủ GDPR không (quyền xóa dữ liệu, quyền export)? Site owner có thể export toàn bộ booking data không?

> **Trả lời:** có

---

### 9. SEO / GTM (Go-to-Market)

**9.1.** Kênh phân phối chính là gì? WordPress.org (plugin repo), ThimPress.com trực tiếp, CodeCanyon, hay kết hợp?

> **Trả lời:** thimpress.com

**9.2.** Có kế hoạch landing page riêng cho sản phẩm này không? Nếu có, landing page được build trên domain nào và ai chịu trách nhiệm SEO?

> **Trả lời:** có landing page riêng trên learnpresslms.com

**9.3.** Có kế hoạch ra mắt (launch) cụ thể không? Ví dụ: blog announcement, ProductHunt, email newsletter, affiliate program?

> **Trả lời:** blog

**9.4.** Đã có case study hoặc beta user nào có thể dùng làm testimonial/social proof cho launch không?

> **Trả lời:** chưa có

**9.5.** SEO content plan: có muốn tạo comparison page (LearnPress Tutor Booking vs Amelia, vs Calendly) và alternative page không? Hay chỉ tập trung vào product page?

> **Trả lời:** không

**9.6.** Demo site hoặc sandbox environment có được cung cấp cho người dùng trước khi mua không?

> **Trả lời:** có

---

### 10. QA / Acceptance Criteria

**10.1.** Đâu là 3 tình huống edge case mà team lo ngại nhất? Ví dụ: timezone mismatch, double-booking khi nhiều student book cùng lúc, payment thành công nhưng booking chưa được tạo.

> **Trả lời:** cả 3

**10.2.** Có yêu cầu automated testing không (unit test, integration test, E2E)? Nếu có, framework nào đang dùng (PHPUnit, Playwright, Cypress)?

> **Trả lời:** không

**10.3.** Browser/device compatibility: cần test trên những browser và OS nào? Có yêu cầu về mobile browser không?

> **Trả lời:** test hết

**10.4.** Có yêu cầu accessibility (WCAG 2.1 AA) không? Đặc biệt với booking calendar và form?

> **Trả lời:** không

**10.5.** Definition of Done cho một feature là gì? Ví dụ: code review, QA passed, docs updated, hay phải có demo video?

> **Trả lời:** không nhắc đến

---

### 11. Documentation

**11.1.** Tài liệu người dùng sẽ được viết bằng ngôn ngữ nào? Chỉ tiếng Anh, hay cần có cả tiếng Việt hoặc ngôn ngữ khác?

> **Trả lời:** tiếng anh

**11.2.** Có yêu cầu Developer Documentation (hooks, filters, API, extension points) không? Add-on có expose hook/filter để bên thứ ba customize không?

> **Trả lời:** không

**11.3.** Help center sẽ được host ở đâu — docs.thimpress.com, trang WordPress.org, hay nhúng trong plugin?

> **Trả lời:** help.thimpress.com

**11.4.** Có video tutorial hoặc onboarding wizard nào dự kiến không? Hay chỉ cần text-based documentation?

> **Trả lời:** text-based + image screenshot

---

## Câu hỏi ưu tiên cao

Đây là **8 câu cần trả lời trước tiên** để có thể bắt đầu viết tài liệu sản phẩm:

| # | Câu hỏi | Lý do ưu tiên |
|---|---|---|
| 1 | **4.8** — Booking có cần Instructor Approval thủ công không? | Ảnh hưởng trực tiếp đến booking flow, PRD, user stories, và UX |
| 2 | **4.7** — Timezone hiển thị theo timezone của ai? | Risk cao nhất về technical — ảnh hưởng toàn bộ calendar và booking engine |
| 3 | **6.5** — Instructor payout: tiền vào tài khoản ai? | Ảnh hưởng đến payment flow, PRD, legal, và marketing messaging |
| 4 | **4.1** — Group Session hoạt động cụ thể thế nào? | Ảnh hưởng đến data model, booking flow, và acceptance criteria |
| 5 | **7.1** — Student tìm instructor để book qua đâu? | Ảnh hưởng đến UX, wireframe, và SEO/discoverability |
| 6 | **4.2** — Cancellation policy: ai được cancel, deadline, phí phạt? | Ảnh hưởng đến business rule, acceptance criteria, và email notification flow |
| 7 | **2.1** — Đã có instructor phản hồi nhu cầu cụ thể chưa? | Market validation — quyết định mức độ tin cậy của demand assumption |
| 8 | **8.5** — Refund logic khi instructor cancel hoặc no-show? | Ảnh hưởng đến trust & safety, email flow, và PRD |

---

## Bước tiếp theo

Sau khi bạn đã trả lời các câu hỏi trên (ít nhất là 8 câu ưu tiên cao), hãy chạy lệnh sau để tạo bộ tài liệu sản phẩm đầy đủ:

```bash
npm run create -- lp-tutor-booking
```

Lệnh này sẽ tạo 7 tài liệu chính trong thư mục `projects/lp-tutor-booking/output/`:

| File | Nội dung |
|---|---|
| `01-discovery.md` | Market validation, assumption mapping, competitor analysis, search demand |
| `02-product-strategy.md` | Positioning, USP, roadmap, revenue model, growth loops |
| `03-prd.md` | User stories, functional requirements, permission matrix, acceptance criteria |
| `04-ux-and-wireframe.md` | User flows, screen list, HTML wireframes (wp-admin + frontend) |
| `05-qa-and-documentation.md` | Test plan, documentation outline |
| `06-seo-and-marketing.md` | SEO content plan, product page outline, launch copy |
| `07-build-or-not-build.md` | Build recommendation với market opportunity score |
