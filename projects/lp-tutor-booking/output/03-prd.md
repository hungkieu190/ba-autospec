# 03 — Product Requirements Document: LearnPress Tutor Booking

---

## 1. Objectives

| Objective | Metric | Target |
|---|---|---|
| Student book + pay session từ LearnPress | Payment completion rate | > 75% |
| Dual confirm hoàn tất session | Dual-confirm rate | > 70% confirmed past → completed |
| Instructor chỉ earn sau dual confirm | False payout incidents | 0 |
| Dispute được admin xử lý | Open disputed age | Admin resolve manual (track SLA) |
| Instructor biết pending vs earned | Revenue UI clarity | Pending earn / Earned rõ ràng |
| Không double-booking | Incidents | 0 |
| Timezone hiển thị đúng | UX bug reports | 0 complaint chính |
| Email config dễ tìm | LearnPress Emails tab | Tutor Booking confirmation types hiện rõ |
| Social proof rating | Shortcode shows avg stars | Rating + count khi có reviews |

---

## 2. User Stories

### Admin
| ID | User Story |
|---|---|
| US-A01 | Là Admin, tôi muốn xem tất cả bookings để quản lý vận hành. |
| US-A02 | Là Admin, tôi muốn chỉnh platform share % để điều chỉnh doanh thu hệ thống. |
| US-A03 | Là Admin, tôi muốn biết booking nào đã snapshot theo share nào để đối soát. |
| US-A04 | Là Admin, tôi muốn thấy revenue report per tutor để theo dõi kinh doanh. |
| US-A05 | Là Admin, tôi muốn cấu hình LearnPress email notifications cho Tutor Booking ở đúng nơi chuẩn của LearnPress. |
| US-A06 | Là Admin, tôi muốn filter bookings theo awaiting confirmation / disputed. |
| US-A07 | Là Admin, tôi muốn resolve dispute: release pay, force complete, cancel, refund, no-show, kèm note. |
| US-A08 | Là Admin, tôi muốn thấy cờ tutor confirmed / student confirmed / revenue released. |

### Instructor
| ID | User Story |
|---|---|
| US-I01 | Là Instructor, tôi muốn có một tutor profile canonical gắn với user của mình. |
| US-I02 | Là Instructor, tôi muốn tạo nhiều session type với giá và duration khác nhau. |
| US-I03 | Là Instructor, tôi muốn set meeting link riêng cho từng session type, có fallback từ profile. |
| US-I04 | Là Instructor, tôi muốn cấu hình availability theo tuần, custom date, holiday. |
| US-I05 | Là Instructor, tôi muốn thấy current datetime theo timezone mình đã chọn. |
| US-I06 | Là Instructor, tôi muốn biết mỗi booking **pending earn** hay **đã earned**. |
| US-I07 | Là Instructor, tôi muốn Confirm Taught sau session, không tự nhận tiền ngay khi student paid. |
| US-I08 | Là Instructor, tôi muốn mark No Show khi student không đến. |
| US-I09 | Là Instructor, tôi muốn cập nhật payout email để rút commission (balance chỉ tăng sau revenue release). |
| US-I10 | Là Instructor, tôi muốn xem bookings upcoming / history / withdrawals trong dashboard. |

### Student
| ID | User Story |
|---|---|
| US-S01 | Là Student, tôi muốn chọn timezone và xem slot đúng giờ của mình. |
| US-S02 | Là Student, tôi muốn chỉ thấy slot hợp lệ, không click được slot đã quá giờ. |
| US-S03 | Là Student, tôi muốn book session qua LearnPress Checkout. |
| US-S04 | Là Student, tôi muốn nhận email xác nhận; default không có meeting URL, chỉ nhắc Join unlock trên dashboard theo setting phút. |
| US-S05 | Là Student, tôi muốn cancel hoặc reschedule trong deadline. |
| US-S06 | Là Student, tôi muốn Confirm Learned sau session và (tuỳ chọn) đánh giá sao + message. |
| US-S07 | Là Student, tôi muốn Complaint với lý do nếu session không thành công (tutor không dạy…). |
| US-S08 | Là Student, tôi muốn thấy rating tutor khi browse sessions shortcode. |

---

## 3. Functional Requirements

| ID | Yêu cầu | Priority | Role | Ghi chú |
|---|---|---|---|---|
| FR-001 | Tạo / cập nhật canonical tutor profile theo user | P0 | Instructor | Một user một profile canonical |
| FR-002 | Tạo / cập nhật session type với price, duration, buffers, status | P0 | Instructor | `_lp_tb_status` active/inactive |
| FR-003 | Session type có meeting link override riêng | P0 | Instructor | Fallback về profile default |
| FR-004 | Availability theo weekly / custom / holiday | P0 | Instructor | Holiday override weekly |
| FR-005 | Timezone selector hiển thị current datetime theo lựa chọn | P0 | All | Dựa trên WordPress timezone format |
| FR-006 | Slot picker trả về slot theo timezone student và disable slot past/started | P0 | Student | Không cho chọn slot đã hết giờ |
| FR-007 | Tạo hold trước checkout | P0 | System | Hold có snapshot share percent và meeting link |
| FR-008 | Booking sang pending_payment khi LearnPress order item được tạo | P0 | System | Không skip trạng thái này |
| FR-009 | Mapping LP order completed → booking `confirmed` (paid only) | P0 | System | **Không** release revenue |
| FR-010 | Cancel / reschedule theo deadline | P0 | Student/Instructor/Admin | Deadline mặc định 24h |
| FR-011 | Instructor Confirm Taught → `instructor_confirmed_at`, status `awaiting_confirmation` nếu cần | P0 | Instructor | Không complete / không credit commission một mình |
| FR-012 | Student Confirm Learned → `student_confirmed_at`; optional rating+content | P0 | Student | Popup review |
| FR-013 | Khi cả hai confirmed → status `completed` + `release_revenue()` | P0 | System | One-shot `revenue_released` |
| FR-014 | Student open complaint → `disputed` + reason | P0 | Student | Chỉ confirmed / awaiting_confirmation |
| FR-015 | Admin resolve: release_revenue, complete, cancel, refund, no_show | P0 | Admin | Optional note |
| FR-016 | Review một lần / booking; student only; sau learned confirm hoặc completed | P0 | Student | `Review_Service` |
| FR-017 | Shortcode sessions hiển thị rating; profile_id header: name, bio, subjects, stars | P0 | Public | `Review_Service::get_profile_rating_summary` |
| FR-018 | Revenue share settings trong admin | P0 | Admin | Platform share %, instructor share = phần còn lại |
| FR-019 | Revenue snapshot theo booking | P0 | System | Admin đổi setting chỉ ảnh hưởng booking mới |
| FR-020 | Commission credit qua `lp_commission_add_commission` chỉ trong `release_revenue` | P0 | System | Idempotent bằng `revenue_released` |
| FR-021 | LearnPress Emails tab có confirmation email types | P0 | Admin | `/learn-press-settings&tab=emails` |
| FR-022 | Student/instructor Join/Open Meeting gated by `lp_tb_meeting_link_visible_minutes` | P0 | Student/Instructor | Default 0 = show immediately when paid; N>0 unlock N minutes before start; locked message with unlock time |
| FR-022c | Default confirmation emails do not include meeting URL | P0 | System | Default templates use unlock notice only (`{{meeting_link_notice}}`). `{{meeting_link}}` still resolves for admin-customized LP email bodies |
| FR-022b | Student dashboard Join Session khi confirmed và unlocked | P0 | Student | Meeting link fallback chain |
| FR-023 | Instructor dashboard Pending earn vs Earned | P0 | Instructor | Based on `revenue_released` |
| FR-024 | Privacy exporter / eraser bookings & reviews | P1 | Admin | GDPR |
| FR-025 | Google Calendar sync / busy lookup | P1 | System | Khi sync bật |
| FR-026 | Instructor No Show → `no_show`, no revenue | P0 | Instructor/Admin | |

### Lifecycle statuses

```text
hold → pending_payment → confirmed (paid; revenue NOT released)
  → instructor confirm-taught  ↘
  → student confirm-learned    ↗ awaiting_confirmation
  → both → completed + revenue_released=1
  → complaint → disputed → admin resolve
  → no_show | cancelled | refunded
```

---

## 4. Non-Functional Requirements

| Loại | Yêu cầu |
|---|---|
| Performance | Calendar load nhanh; rating summary query theo profile_id có index. |
| Reliability | Paid ≠ earned; commission credit one-shot; booking state nhất quán. |
| Security | Role-scoped confirm taught/learned/complaint/resolve; meeting link không public. |
| Compatibility | LearnPress ≥ 4.4.1, WordPress ≥ 6.0, PHP ≥ 7.4 (plugin header). |
| Localization | Timezone/price format theo site settings và user choice. |
| Maintainability | Dual-confirm + revenue rules trong `Booking_Service` / `Review_Service`, không trong template. |
| GDPR | Export/erase bookings, complaints fields, reviews theo user request. |

---

## 5. Permission Matrix

| Capability | Admin | Instructor | Student | Guest |
|---|---|---|---|---|
| Xem tất cả booking | ✅ | ❌ | ❌ | ❌ |
| Xem booking của mình | ✅ | ✅ | ✅ | ❌ |
| Quản lý tutor profile của mình | ✅ | ✅ | ❌ | ❌ |
| Quản lý session type của mình | ✅ | ✅ | ❌ | ❌ |
| Chỉnh revenue share | ✅ | ❌ | ❌ | ❌ |
| Xem revenue tab | ✅ | ✅ | ❌ | ❌ |
| Booking slot | ✅ | ❌ | ✅ | ❌ |
| Cancel / reschedule booking của mình | ✅ | ✅ | ✅ | ❌ |
| Confirm Taught | ✅ | ✅ (own) | ❌ | ❌ |
| Confirm Learned | ✅ | ❌ | ✅ (own) | ❌ |
| Open complaint | ✅ | ❌ | ✅ (own) | ❌ |
| Admin resolve dispute | ✅ | ❌ | ❌ | ❌ |
| Submit review | ✅ | ❌ | ✅ (own) | ❌ |
| Xem meeting link | ✅ | ✅ | ✅ (confirmed+) | ❌ |
| Xem public rating on shortcode | ✅ | ✅ | ✅ | ✅ |

---

## 6. Acceptance Criteria

### AC-001: Booking payment flow
- Student chọn timezone, session type, slot hợp lệ.
- Slot quá giờ không chọn được.
- Hold trước checkout; payment thành công → booking `confirmed`.
- Snapshot share + meeting link lưu trên booking.
- Email confirmation qua LearnPress email system.
- **Instructor commission balance không tăng** chỉ vì payment.

### AC-002: Dual confirmation + revenue release
- Sau session end, instructor thấy **Confirm Taught**.
- Student thấy **Confirm Learned** (popup rating optional).
- Một phía confirm → `awaiting_confirmation` + timestamp tương ứng.
- Cả hai confirm → `completed` + `revenue_released=1` + commission credited đúng snapshot amount.
- Gọi release lần 2 không double-credit.

### AC-003: Complaint + admin resolve
- Student submit complaint + reason → `disputed`.
- Admin list filter Disputed; thấy complaint text + confirm flags.
- Admin **Release pay** / **Force complete** → completed + revenue released.
- Admin **Refund** / **No show** / **Cancel** → status tương ứng, không release (trừ release path).

### AC-004: Revenue snapshot
- Admin đổi platform share 30% → 25%.
- Booking cũ giữ 30% khi release.
- Booking mới snapshot 25%.

### AC-005: Review + shortcode rating
- Confirm learned với rating tạo 1 review approved.
- Không review trùng booking.
- `[lp_tutor_booking_sessions profile_id="X"]` hiện name, bio, subjects, stars avg + count.
- Card session luôn có thể hiện stars nếu profile đã có reviews.

### AC-006: Timezone / meeting link unlock / email
- Current DateTime theo timezone chọn; WP timezone default admin.
- Meeting link fallback booking → session type → profile.
- Setting unlock minutes = 0 → Join hiện ngay sau `confirmed` (có link) trên dashboard.
- Setting unlock minutes = N → trước cửa sổ N phút chỉ hiện message unlock; trong cửa sổ hiện nút Join.
- Default email confirmation **không** có URL/button join; chỉ text nhắc unlock theo N phút (hoặc “available on dashboard” nếu N=0).
- Admin custom template LP Emails có thể dùng `{{meeting_link}}` nếu muốn chèn URL.
- Tutor Booking confirmation emails trong LearnPress Emails tab.

---

## 7. Assumptions, Decisions, And Validation Items

- **Decision:** Paid (`confirmed`) ≠ instructor earned.
- **Decision:** Dual confirm bắt buộc cho auto revenue release.
- **Decision:** Admin có thể force release / complete trên disputed hoặc stuck bookings.
- **Decision:** v1 không auto-timeout dual-confirm.
- **Decision:** Past/started slots disabled.
- **Decision:** Revenue share snapshot bắt buộc.
- **Decision:** Confirmation email config trong LearnPress Emails tab.

## 8. Next Actions

| Action | Owner | Deadline |
|---|---|---|
| E2E dual-confirm + commission | Engineering + QA | Sprint hiện tại |
| E2E dispute paths | QA | Sprint hiện tại |
| Verify Pending earn / Earned labels | Product + QA | Sprint hiện tại |
| Verify shortcode rating | QA | Sprint hiện tại |
