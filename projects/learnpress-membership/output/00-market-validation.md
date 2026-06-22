# Market Validation — LearnPress Membership v4.1

## Product Idea

Nâng cấp `learnpress-membership` thành add-on membership đầy đủ cho LearnPress, tập trung vào 2 năng lực chính:

1. **Restriction Engine** — cho phép admin giới hạn quyền xem nội dung WordPress/LearnPress dựa trên membership plan.
2. **WooCommerce Membership Checkout** — cho phép mua membership plan thông qua WooCommerce checkout.

## Evidence Status

Tài liệu này chứa assumptions khi chưa có dữ liệu market research độc lập. Các mục đánh dấu `[Assumption]` cần validate.

## Skills Used

- `core/product-documentation-generator.md`
- `discovery/assumption-mapping.md`
- `discovery/market-validation.md`
- `research/competitor-analysis.md`

---

## Phân Tích Thị Trường

### Nhu Cầu Hiện Tại

| Yếu tố | Đánh giá | Ghi chú |
| --- | --- | --- |
| Pain intensity | Cao | Admin LMS cần bảo vệ nội dung ngoài course-level. Membership plugin hiện chỉ quản lý plan/member/course mapping, chưa restrict page/post/lesson/block. |
| Existing demand | Trung bình | `[Assumption]` Khoảng 20 site active. Không có dữ liệu feature request cụ thể, nhưng restrict content là tính năng chuẩn của mọi membership platform lớn (WooCommerce Memberships, MemberPress, Restrict Content Pro). |
| Market maturity | Cao | WordPress membership plugin market đã mature. Các giải pháp lớn đều có restrict content + WooCommerce integration. LearnPress Membership cần có feature parity để cạnh tranh. |
| User complaints | Không có dữ liệu | Sản phẩm 1.0 chưa có nhiều feedback. Product owner xác nhận đây là tính năng bắt buộc, không phụ thuộc vào ticket. |

### Giải Pháp Hiện Tại Trên Thị Trường

| Giải pháp | Cách tiếp cận | Hạn chế với LearnPress |
| --- | --- | --- |
| WooCommerce Memberships | Full restrict content + Woo checkout native | Không có LearnPress course enrollment integration. Cần custom code. |
| MemberPress | Standalone membership + restrict + payment | Không integrate với LearnPress enrollment/order system. |
| Paid Memberships Pro | Freemium membership + restrict levels | Không có LP course mapping. Khác kiến trúc checkout. |
| Restrict Content Pro | Restrict + payment gateway | Không biết LearnPress course/lesson structure. |
| LP Membership 1.0 (hiện tại) | Plan/member/course mapping, LP checkout | Thiếu restrict content ngoài course. Thiếu Woo checkout. |
| Manual workflow | Admin tự enroll user sau khi bán qua Woo | Thủ công, dễ sai, không scale. |

### Lỗ Hổng Thị Trường

1. **Không có membership plugin nào** integrate native với LearnPress enrollment, order, course, lesson, quiz.
2. **Restrict content cho LMS** cần hiểu structure đặc thù: course → section → lesson → quiz, khác restrict post/page thông thường.
3. **WooCommerce checkout cho LP membership** — hiện chỉ có `learnpress-woo-payment` cho course, chưa cho membership plan.

---

## Market Opportunity Score

| Yếu tố | Trọng số | Điểm (1-10) | Lý do |
| --- | --- | --- | --- |
| Pain intensity | Cao | 7 | Admin LMS thực sự cần bảo vệ nội dung linh hoạt. Tuy nhiên chưa có complaint data trực tiếp. |
| Demand evidence | Cao | 5 | `[Assumption]` 20 active sites. Không có feature request data. Nhưng tính năng này là table-stakes cho membership plugin. |
| Competitive gap | Cao | 8 | Không competitor nào integrate native với LearnPress. Đây là lợi thế nền tảng rõ ràng. |
| Monetization | Trung bình | 7 | Đã có pricing model (annual license). Sẽ giảm discount từ ~50% xuống ~25% → tăng revenue per license. |
| Feasibility | Trung bình | 7 | Team đã có code base, hiểu architecture LP + Woo. Code references đã review. Risk ở restriction hooks + Woo lifecycle. |
| Support cost | Trung bình | 5 | `[Assumption]` Restrict content hooks + Woo Subscriptions lifecycle sẽ tăng support burden. Cache/performance cần investment. |
| Strategic fit | Trung bình | 9 | Nằm trong hệ sinh thái ThimPress/LearnPress. Tận dụng `learnpress-woo-payment` hiện có. Tăng giá trị bundle. |

### **Market Opportunity Score: 7/10**

---

## Key Assumptions Cần Validate

| # | Assumption | Category | Importance | Evidence | Priority | Fastest Test | Decision Rule |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Admin cần restrict content ngoài course-level | Value | Cao | Yếu — owner xác nhận bắt buộc nhưng thiếu user data | Theo dõi | Survey 10 existing customers | ≥ 5/10 xác nhận → validated |
| 2 | Woo checkout tăng conversion so với LP checkout | Value | Cao | Trung bình — logic hợp lý nhưng chưa có A/B test | Test dần | So sánh conversion rate LP vs Woo checkout sau launch | Woo checkout ≥ LP checkout conversion → validated |
| 3 | Support cost sẽ manageable | Business | Trung bình | Yếu | Theo dõi | Track support tickets 3 tháng sau launch | < 2 tickets/tuần về restrict/Woo → validated |
| 4 | Restriction hooks không break page builders | Feasibility | Cao | Yếu | Test ngay | POC test với Elementor + Gutenberg | 0 critical conflict → validated |
| 5 | Performance OK trên site 500+ courses | Feasibility | Trung bình | Yếu | Test trước release | Load test với 500 courses, 10k posts | < 50ms restriction check → validated |

---

## Build Recommendation

### **Build** ✅

### Lý do Build

1. **Strategic fit rất cao** — đây là sản phẩm trong hệ sinh thái LearnPress, team own toàn bộ code base.
2. **Competitive moat** — không competitor nào integrate native với LearnPress enrollment/course structure.
3. **Table-stakes feature** — restrict content + Woo checkout là tính năng chuẩn mà mọi membership platform lớn đều có. Thiếu sẽ khó cạnh tranh.
4. **Revenue upside** — giảm discount từ 50% → 25% trên version mới. 2 modules nâng cấp tăng perceived value.
5. **Phased release giảm risk** — Phase 1 (Restriction) và Phase 3 (Woo) release độc lập, cho phép validate từng phần.
6. **Product owner commitment** — xác nhận đây là tính năng bắt buộc, không phụ thuộc vào market data.

### Rủi ro cần quản lý

1. Restriction hooks gây side-effect với page builders → POC test sớm.
2. Woo Subscriptions lifecycle phức tạp → Phase 4 riêng, sau khi MVP Woo ổn định.
3. Support burden tăng → cần docs tốt, FAQ, troubleshooting guide.
4. Chỉ 20 active sites → cần marketing/SEO push sau launch.

### Validation Experiments

| Experiment | Thời gian | Cost | Output |
| --- | --- | --- | --- |
| POC restriction hooks + Elementor/Gutenberg | 2-3 ngày | Dev time | Compatibility matrix |
| Load test restriction check 500 courses | 1-2 ngày | Dev time | Performance benchmark |
| Customer survey (10 existing users) | 1 tuần | Email effort | Feature demand validation |
| Woo checkout conversion tracking | Post-launch | Analytics setup | LP vs Woo conversion comparison |
