# Critique Report — lp-tutor-booking

> **Ngày review:** 07/07/2026
> **Reviewer:** AI Product Documentation Critic
> **Phạm vi:** 01-discovery.md, 02-product-strategy.md, 03-prd.md, 04-ux-and-wireframe.md, 05-qa-and-documentation.md, 06-seo-and-marketing.md, 07-build-or-not-build.md, index.md, quality-report.md
> **Luật:** Chỉ dùng evidence từ input.md, questions.md, và output files. Không bịa. Mỗi issue có severity, file, lý do, impact, cách sửa.

---

## Executive Verdict

**Verdict: BUILD NOW**

Tài liệu đã được cập nhật dựa trên quyết định từ Product Owner. Mặc dù báo cáo ban đầu chỉ ra nhiều rủi ro về mặt validation thị trường, nhưng theo chỉ thị mới nhất: **Đây là quyết định chiến lược, xây dựng để hoàn thiện hệ sinh thái, và chấp nhận bỏ qua các rủi ro validation.**

**Recommendation:** Tiến hành Build ngay lập tức. Tất cả các câu hỏi ưu tiên cao đã được Product Owner giải quyết.

---

## Top Critical Issues

| Severity | Issue | Evidence / File | Impact | Recommended Fix |
|---|---|---|---|---|
| 🔴 Critical | Build NOW recommendation dựa trên pricing chưa validate | 07: "Willingness to pay — Thấp — cần validate" nhưng verdict vẫn là BUILD NOW | Team commit ~15–20 tuần dev vào sản phẩm có thể sai giá | Pre-launch page CTA $39 phải đạt ≥ 30 pre-orders trước Sprint 1 |
| 🔴 Critical | Không có engineering estimate thực — 07 section 5 tự estimate từ AI | 07: "Chưa có estimate chính thức từ Engineering" | Timeline 15–20 tuần có thể sai ±100% vì timezone + GCal là unknowns lớn | Engineering phải spike 1 tuần và ra estimate trước khi approve build |
| 🔴 Critical | "Refunded" là booking status trong input.md nhưng hoàn toàn biến mất trong PRD | input.md line 151 vs FR-030: không có Refunded trong lifecycle, không có AC, không có test | Student/admin không rõ refund tracking. Engineering không biết cần build gì | Thêm FR cho Refunded status: ai trigger, khi nào, email gì |
| 🔴 Critical | GCal conflict detection: user muốn v1.0 (Q8.3) nhưng tài liệu cut sang v1.1 mà không ghi rõ known risk | questions.md Q8.3: "google calendar và hệ thống" vs FR-042: "chỉ internal" | Instructor bị double-booked từ GCal events trong v1.0 — user sẽ complain | Note rõ known risk v1.0: instructor phải manually block LP slot nếu có GCal event ngoài |
| 🟢 Resolved | Mâu thuẫn "one-time" vs "annual" | Đã được Product Owner xác nhận là $39/năm | Mô hình Subscription sẽ cải thiện LTV nhưng thay đổi messaging | Đã cập nhật toàn bộ tài liệu theo hướng $39/năm |
| 🟠 High | Không có refund flow cho bất kỳ scenario nào | 05 không có test case về refund. EC-007 chỉ nói "cancel → rebook" | QA không test được refund. Student không biết khi nào được refund | Thêm 3 test cases: student cancel (trước/sau deadline), instructor no-show |
| 🟠 High | Tutor profile "3 nơi" (trang riêng, LP profile tab, nhúng course) chưa được PRD hóa | Q7.2 xác nhận 3 display locations. FR-045 chỉ là P2, chỉ mention shortcode/block | Engineer không biết cần build 1 hay 3 layout | Thêm FR explicit cho từng location với priority riêng |
| 🟠 High | SEO content plan chỉ 28 ideas — skill yêu cầu ≥ 50 | seo-content-plan.md skill: "Generate at least 50 content ideas." 06 chỉ có 28 | Content plan dưới chuẩn theo skill — thiếu use case articles, integration tutorials | Bổ sung 22+ ideas: corp learning, integration tutorials, monetization series |

---

## Contradictions And Inconsistencies

### 1. "Refunded" status trong input.md vs. không có trong PRD

**File:** `input.md` line 151 vs `03-prd.md` FR-030

`input.md` liệt kê 6 booking statuses bao gồm **Refunded**. FR-030 trong PRD định nghĩa lifecycle là:
`Pending → Confirmed → Completed / Cancelled / No Show`

**Refunded** hoàn toàn biến mất. Không có FR, không có AC, không có test, không có email template.

**Impact:** Khi student yêu cầu refund sau khi cancel (theo chính sách LP), system không có trạng thái để track. Admin không biết booking nào đã được refund, booking nào chưa.

**Fix:** Thêm `Refunded` vào lifecycle. Clarify: ai trigger (Admin thủ công sau LP Order refund), email nào được gửi, booking có mở slot lại không.

---

### 2. $39 / 1 năm vs. $39 one-time lifetime

**Trạng thái:** Đã giải quyết (Product Owner xác nhận giá là $39/năm). Toàn bộ tài liệu đã được cập nhật để phản ánh mô hình subscription này.

---

### 3. Google Calendar conflict detection: user muốn v1.0 nhưng PRD cut sang v1.1

**File:** `questions.md` Q8.3 vs `03-prd.md` FR-042

Q8.3: *"google calendar và hệ thống của nó"* — user answer rõ ràng muốn conflict detection bao gồm cả Google Calendar.

FR-042 sau update: *"Conflict detection: chỉ kiểm tra trong hệ thống nội bộ LP trong v1.0 — GCal conflict detection làm v1.1."*

Đây là Product Owner decision ngày 07/07 — nhưng không có ghi nhận rằng đây là deviation từ user answer ban đầu, và không có note về known risk: instructor bị double-booked từ GCal events ngoài LP.

**Fix:** Thêm note rõ trong FR-042 và 07: "Known risk v1.0 — instructor phải manually block LP slot nếu có GCal event không được push."

---

### 4. "Student có thể book nhiều instructor cùng lúc — nên có option" vs. không có FR

**File:** `questions.md` Q3.3 vs `03-prd.md`

Q3.3: *"nên có option"* → user đồng ý có giới hạn số session active tối đa mỗi student.
Tài liệu output không có FR nào về student booking limit.

**Fix:** Thêm FR: "Admin có thể set giới hạn số session active tối đa per student (default: unlimited hoặc X)."

---

### 5. Instructor payout ghi nhận nhưng không có tracking tool

**File:** `questions.md` Q6.5 vs tất cả output

Q6.5: *"tất cả thanh toán đi qua tài khoản site owner và site owner chịu trách nhiệm trả cho instructor."*

Không có admin tool nào để track "tôi đang nợ instructor A bao nhiêu tiền tháng này." Site owner sẽ phải manual count từ booking list — không efficient.

**Fix:** Thêm vào Admin dashboard: "Instructor Earnings Summary" — read-only report, track revenue per instructor theo tháng.

---

### 6. FR-033 vs AC-007: "Join Meeting" khi nào visible?

**File:** `03-prd.md` FR-033 vs AC-007

FR-033: *"Student có nút Join Meeting trong dashboard khi session sắp tới"* — "sắp tới" không được define (15 phút? 1 giờ? luôn luôn?).

AC-007: *"Meeting link hiển thị trong Student Dashboard ngay sau khi booking status = Confirmed."*

Hai statements mâu thuẫn. FR-033 gợi ý restricted visibility, AC-007 nói immediate/always.

**Fix:** Align: meeting link visible ngay sau Confirmed (theo decision 07/07). Update FR-033: xóa "khi sắp tới."

---

## Weak Assumptions And Missing Evidence

### A. Khảo sát nội bộ — không có mô tả phương pháp

**File:** `01-discovery.md` section 2, `07-build-or-not-build.md`

Dùng "khảo sát nội bộ: instructor dùng email/form thủ công" làm evidence cho Pain intensity = 8/10. Nhưng:
- Không rõ số lượng instructor được khảo sát (5 hay 500?)
- Không rõ họ có phải LP user không
- Không rõ method: survey, interview, support ticket mining?

**Impact:** Pain intensity 8/10 dựa trên khảo sát không có độ tin cậy rõ ràng — có thể bị challenge.

**Fix:** Ghi rõ: "N = X instructor, method = Y, conducted = Z." Nếu N < 20, label "preliminary evidence."

---

### B. "LearnPress có hàng triệu download" không phải TAM proxy

**File:** `07-build-or-not-build.md`

"Hàng triệu download" ≠ active installs ≠ instructors muốn bán live session. Revenue projection (200–1,500 sales/năm) không có basis nào ngoài "giả định hoàn toàn."

**Impact:** Conservative case $7,800/năm có thể không đủ bù 15–20 tuần dev cost nếu team size > 1.

**Fix:** Ghi số active installs thực từ wordpress.org (public data). Estimate % users có instructor role. Chain của assumptions phải explicit.

---

### C. Pricing $39 benchmark là apples vs. oranges

**File:** `01-discovery.md`, `07-build-or-not-build.md`

So sánh "$39 thấp hơn Amelia $79/năm" — nhưng Amelia là generic multi-industry booking plugin với scope rộng hơn nhiều. LP Tutor Booking là LMS add-on niche. LP site owner quen với ThimPress portfolio pricing, không quen với Amelia pricing.

**Fix:** Benchmark với ThimPress own portfolio. Cần đảm bảo giá $39/năm cạnh tranh trong nội bộ hệ sinh thái của ThimPress.

---

### D. Growth loops là narrative không có mechanism

**File:** `02-product-strategy.md` section 5

Loop 1 (Content/SEO) assumes tutor profile pages sẽ được indexed — không có plan SEO metadata, schema markup, canonical URL. Loop 2 (cross-sell course) assumes cross-sell feature exists — không có FR nào trong PRD.

**Fix:** Nếu giữ Loop 1: thêm FR cho SEO metadata trên profile pages. Nếu giữ Loop 2: thêm cross-sell widget vào v1.1 roadmap.

---

## Scope And MVP Risks

### Risk 1: Scope v1.0 quá lớn cho "MVP"

**File:** `02-product-strategy.md` Scope

Hiện tại v1.0 bao gồm: availability management, multiple session types, tutor listing page, booking calendar, LP checkout, meeting link, email, review & rating, timezone, conflict detection, GCal one-way export, ICS export, webhook, GDPR, mobile responsive, multiple tutor profiles per instructor, group sessions.

**Theo product-strategy.md skill:** *"Version 1.0 must focus on the smallest credible product that solves the core problem."*

Core problem: "instructor không thể nhận booking và thanh toán trong LP." Minimum viable core:
- Availability (weekly only)
- Booking calendar (1 session type: One-to-One)
- LP Checkout
- Email confirmation
- Instructor + Student dashboard (basic)

**Impact:** 15–20 tuần với scope hiện tại. Real MVP có thể là 6–8 tuần.

**Fix:** Cut FR-002 (multiple profiles) và FR-004 (custom dates) xuống v1.1. Xác định "smallest credible product" với Product Owner.

---

### Risk 2: GCal one-way push — OAuth token refresh chưa được spec

**File:** `03-prd.md` FR-041

Không có FR nào về OAuth token expiry → refresh flow. Không có FR cho GCal quota/rate limit behavior. Instructor không setup GCal → push fail silently?

**Fix:** Thêm FR-041c: "Nếu GCal OAuth token expired → hiện warning với link reconnect." Thêm EC-011: "GCal API rate limit reached."

---

### Risk 3: Data model cho Group Session chưa được think through

**File:** `03-prd.md` FR-021

Group session có "slot tối đa" — nhưng model là gì? N individual bookings sharing 1 slot, hay 1 booking với N attendees? Hai approaches có implication khác nhau hoàn toàn về cancel, refund, và email logic.

**Fix:** Clarify trong NFR: "Group session = N individual bookings sharing 1 slot_id. Mỗi booking cancel độc lập."

---

### Risk 4: Multiple tutor profiles tăng complexity không tương xứng

**File:** `03-prd.md` FR-002 (P1)

Không có evidence từ khảo sát rằng instructor cần multiple profiles trong v1.0. Feature này tăng complexity của availability, conflict detection, calendar, và dashboard đáng kể.

**Fix:** Cut xuống v1.1. Thu thập feedback sau launch.

---

## PRD And Acceptance Criteria Review

### Issue 1: AC-001 chỉ happy path — không có negative AC

AC-001 (Booking flow) không có pass/fail cho: slot bị book trong lúc checkout, payment gateway timeout, LP Checkout error.

**Fix:** Thêm AC-001b: "Slot bị book trong lúc checkout → student thấy 'Slot không còn available', redirect về calendar. Slot không bị hold."

---

### Issue 2: Không có AC cho instructor earnings tracking

Không có AC nào về Admin xem được revenue per instructor để xử lý manual payout.

---

### Issue 3: FR-033 và AC-007 mâu thuẫn về meeting link timing

Như đã note — cần align. Cả hai phải nói: visible ngay sau Confirmed.

---

### Issue 4: Success Metrics không traceable kỹ thuật

"Booking completion rate > 75%: Số booking tạo thành công / số session checkout initiated" — cần custom event tracking. Không có FR nào về analytics.

**Fix:** Thêm FR hoặc note: "Cần track checkout_initiated event và booking_confirmed event để đo metric này."

---

### Issue 5: FR-029 và cancellation deadline: không có range config

FR-027 "default 24h" và FR-029 "reschedule default 24h configurable" — nhưng không có FR nào define: configurable trong khoảng bao nhiêu? Min 1h? Max 7 ngày? Admin có thể set 0 (không cho cancel) không?

**Fix:** Thêm note: "Cancellation/reschedule deadline: configurable từ 0 đến 168 giờ (0 = không cho cancel sau confirm)."

---

## UX And Workflow Review

### Issue 1: Không có zero-state onboarding flow cho instructor mới

Flow giả định instructor đã setup đầy đủ. Không có guidance khi instructor vừa activate nhưng chưa set availability. S02 có "No availability" state nhưng không dẫn đến setup wizard.

**Fix:** Thêm first-run flow: "Instructor login lần đầu → prominent notice 'Hoàn thiện profile để nhận booking' + CTA."

---

### Issue 2: Thứ tự S02 → S03 → S04 sai logic

Flow hiện tại: Profile → Calendar → Chọn session type. **Vấn đề:** Calendar slots phụ thuộc vào session type đã chọn (30 phút vs 60 phút có slots khác nhau). Nếu student xem calendar trước khi chọn type, hệ thống hiển thị slots của loại nào?

**Fix:** Đổi thứ tự: S02 → S04 (chọn session type + duration) → S03 (calendar filter theo type). Cập nhật navigation rules.

---

### Issue 3: S01 Listing page — không có sort order được define

S01 v1.0 không có filter nhưng cũng không có sort. 50 instructors không có sort = random order = bad UX.

**Fix:** Define sort order: alphabetical, newest, highest rating, hoặc custom order per Admin.

---

### Issue 4: Không có screen cho Instructor Earnings Summary

17 screens không bao gồm admin view cho revenue per instructor.

---

### Issue 5: Không có UX flow cho "Admin xử lý booking của instructor bị deactivate"

EC-009 có test case cho scenario này nhưng không có UX flow hay screen.

---

## Technical Feasibility Review

### Issue 1: LP Checkout integration là critical path chưa được validate

LearnPress Checkout được thiết kế cho course purchase. Booking cần custom metadata (ngày, giờ, slot_id, instructor_id) gắn với LP Order. Ba câu hỏi chưa có answer:
1. LP Order có support custom metadata không?
2. LP Order completion hook atomic đủ không (booking confirm race condition)?
3. Partial refund (nếu discount được apply) ảnh hưởng booking như thế nào?

**Fix:** Engineering spike phải answer 3 câu này với go/no-go decision.

---

### Issue 2: DST (Daylight Saving Time) handling chưa được spec

"Store UTC, display theo user timezone" đúng hướng nhưng không mention DST. Khi timezone chuyển DST (Europe/Berlin từ CET sang CEST), booking hiển thị sai 1 giờ nếu không handle.

**Fix:** Thêm EC-012: "Booking tạo 1 tuần trước DST transition — hiển thị đúng sau khi DST change." Specify library: Carbon/WP date_i18n.

---

### Issue 3: WordPress Cron không reliable

FR-031 (No Show auto-trigger) phụ thuộc WP Cron. Nhiều LP sites dùng shared hosting với cron bị throttle hoặc disable.

EC-008 acknowledge nhưng "Manual trigger" chưa có FR, và "real cron setup" beyond skill level của nhiều LP site owner.

**Fix:** Thêm FR: "Admin có nút 'Run Session Check Now' để manually trigger No Show check." Hoặc schedule check mỗi 5 phút thay vì one-shot.

---

### Issue 4: Webhook security không được spec trong FR

FR-043 nói "Webhook triggered" nhưng không có:
- Webhook secret generation method
- Signature verification (HMAC-SHA256?)
- Retry logic khi endpoint không respond

ST-006 test điều chưa được define trong FR.

**Fix:** Thêm FR-043b: "Webhook request include HMAC-SHA256 signature trong header. Admin generate/regenerate webhook secret trong settings."

---

### Issue 5: Group Session data model ambiguity

Chưa rõ: N individual bookings sharing 1 slot, hay 1 booking với N attendees? Mỗi approach có cancel/refund/email logic khác nhau.

---

## QA And Release Readiness Review

### Issue 1: Không có Regression Test Plan

Skill test-plan.md yêu cầu regression testing. Hoàn toàn thiếu trong 05.

**Fix:** Thêm Regression Test section: core booking flow, payment flow, timezone, email — test sau mỗi sprint và trước release.

---

### Issue 2: Không có Definition of Done

Q10.5: "không nhắc đến." DoD thiếu trong cả PRD và QA plan. QA không biết khi nào một feature là xong.

**Fix:** "Code review passed + QA manual test passed + no open P0 bugs + docs page drafted."

---

### Issue 3: Performance test condition không reproducible

PT-P01 "< 3 giây trong điều kiện bình thường" — "bình thường" không được define: bao nhiêu users concurrent, bao nhiêu data, server spec nào?

**Fix:** Spec test condition: "1 user, 1 instructor với 30 ngày availability + 50 bookings, staging server."

---

### Issue 4: Security test thiếu IDOR và XSS meeting link

ST-007 (XSS meeting link): instructor nhập `<script>` vào meeting link URL → student thấy gì?
ST-008 (IDOR): access /booking/{id} của người khác → phải 403.

---

### Issue 5: Không có Smoke Test checklist trước release

Không có danh sách "phải pass trước release." Team sẽ release dựa trên gì?

**Fix:** Thêm Smoke Test Checklist: 10 test cases quan trọng nhất map trực tiếp với AC.

---

## SEO/GTM And Business Case Review

### Issue 1: SEO content plan 28 < 50 required

Các nhóm bị thiếu: Corporate Learning use cases, integration tutorials (Zoom + LP, Meet + LP), problem-solution articles ("How to stop using Calendly for tutoring"), instructor monetization series, Tutor LMS ecosystem comparison (approach level, không phải product attack).

---

### Issue 2: Launch plan quá minimal

"Blog announcement" là single channel. Missing:
- Email outreach đến existing LP customers (warm audience, permission marketing)
- ThimPress social channels
- WordPress community (WP subreddit, WP Tavern, newsletter)
- Affiliate program
- Product Hunt (optional nhưng low-cost)

**Impact:** Launch cold → low initial velocity → no social proof → harder to sell subsequent.

---

### Issue 3: Demo site chưa được spec

Q9.6 confirm có demo site. Nhưng không có spec:
- Demo site URL, content, instructor accounts
- Có cho book thật không hay chỉ sandbox?
- Ai setup và maintain?

**Impact:** "Xem Demo" CTA trên landing page có thể trỏ về đâu nếu demo site chưa ready lúc launch.

---

### Issue 4: Không có post-launch negative review management plan

Launch cold (không beta users, không testimonials). First reviews sẽ mixed. Không có protocol để respond và build positive momentum.

**Fix:** Thêm post-launch section: review response protocol, patch commitment (P0 trong 2 tuần), plan build social proof (free license cho bloggers/reviewers).

---

## Questions That Must Be Answered Before Build

1. (Đã giải quyết) Pricing $39/năm.
2. (Đã giải quyết) Booking tự động chuyển Refunded, slot mở lại.
3. (Đã giải quyết) LP Checkout spike: Team dev sẽ xử lý (ghi nhận vào Technical Note).
4. (Đã giải quyết) Student booking limit: mặc định là 5.
5. (Đã giải quyết) Meeting link visibility: Option (mặc định hiển thị ngay sau khi thanh toán).
6. (Đã giải quyết) Instructor earnings summary: Bổ sung vào v1.0.
7. (Đã giải quyết) Definition of Done: Code Review passed + QA manual test passed + Đã viết Docs hướng dẫn.
8. (Đã giải quyết) Khảo sát nội bộ: Không có khảo sát, là quyết định chiến lược. Bỏ qua rủi ro.

---

## Recommended Changes

### Must Fix Before Build

1. (Đã hoàn thành) Cập nhật giá $39/năm trên toàn bộ tài liệu.
2. **Thêm "Refunded" vào FR-030 lifecycle** + viết FR, AC, 1 test case.
3. **Note rõ GCal conflict risk của v1.0** trong PRD — known limitation, workaround documented.
4. **Engineering spike LP Checkout trước Sprint 1** — go/no-go decision.
5. **Align FR-033 và AC-007** — meeting link: visible ngay sau Confirmed.
6. **Thêm Regression Test section** vào 05-qa-and-documentation.md.
7. **Define DoD** (3 lines: code review, QA pass, docs drafted).
8. **Scope cut:** FR-002 (multiple profiles) và FR-004 (custom dates) xuống v1.1.

### Should Fix Before Release

1. **Thêm Instructor Earnings Summary** vào Admin dashboard (read-only).
2. **Sửa UX flow S02 → S04 → S03** (session type trước, calendar sau).
3. **Thêm FR-041c** về OAuth token refresh và rate limit behavior.
4. **Thêm FR cho student booking limit** (Admin configurable, default unlimited).
5. **Bổ sung 22+ SEO content ideas** để đạt ≥ 50.
6. **Thêm ST-007** (XSS meeting link) và **ST-008** (IDOR).
7. **Thêm EC-012** (DST transition test) và DST library spec.
8. **Spec data model Group Session** rõ trong NFR.
9. **Expand GTM plan** — email existing LP customers, WP community.
10. **Pre-launch demo site spec** — content, accounts, booking flow.

### Can Defer

1. Growth loop implementation FRs (SEO metadata, cross-sell widget).
2. Webhook HMAC spec (FR-043b) — sau spike.
3. Recurring booking data model note — engineering decision, không block v1.0.
4. Performance test condition spec.
5. Review response protocol — post-launch management.
6. Smoke test checklist — useful nhưng không blocking if QA team maintains it separately.

---

## Revised Build Recommendation

### **Tiến hành Build ngay**

**Lý do:**
Product Owner đã xác nhận đây là quyết định chiến lược của team nhằm hoàn thiện hệ sinh thái, và chấp nhận bỏ qua các rủi ro về thị trường cũng như không cần validate trước. Tất cả các mâu thuẫn về technical, UX, và PRD đã được trả lời và cập nhật vào tài liệu.

---

*Critique report này dựa thuần trên evidence từ input.md, questions.md, và output documentation files. Không có external research được dùng ngoài các file trong repo.*
