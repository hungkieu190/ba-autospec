# Quality Report — LearnPress Tutor Booking

## Mục tiêu
Checklist đồng bộ bộ tài liệu chiến lược (`output/`) với implementation dual-confirmation + delayed revenue (2026-07-09).

## Kết luận nhanh

- Booking native trong LearnPress.
- Payment → booking `confirmed` (paid); **chưa** cộng commission instructor.
- Dual confirm: instructor Confirm Taught + student Confirm Learned → `completed` + `revenue_released`.
- Student complaint → `disputed` → admin resolve (release / complete / cancel / refund / no_show).
- Revenue share snapshot theo booking; release dùng snapshot amount.
- Review (sao + message); shortcode sessions hiển thị avg rating / bio khi có `profile_id`.
- Timezone chooser + current datetime; past/started slots disabled.
- Meeting link fallback: booking → session type → profile.
- Join button gated by `lp_tb_meeting_link_visible_minutes` (0 = immediate after paid).
- Default confirmation emails do not include meeting URL (unlock notice only); `{{meeting_link}}` still available for admin custom templates.
- Confirmation emails trong LearnPress Emails tab.

## Các điểm cần giữ đồng bộ (docs ↔ code)

1. Không mô tả instructor earn ngay khi order completed.
2. Không mô tả single-side “Complete” như final payout (Complete/Taught chỉ là một phía).
3. Không nói auto-timeout dual-confirm nếu v1 chưa có.
4. Không mô tả group session / auto Zoom-Meet nếu out of scope.
5. Không nói revenue share chỉ “current setting” — snapshot + delayed release.
6. Không cho click slot quá giờ rồi mới lỗi.
7. Email config không phải module rời LearnPress.
8. Admin list phải có awaiting_confirmation + disputed + resolve actions.

## Validation items (QA)

| # | Item | Status expected |
|---|---|---|
| 1 | Paid không tăng `lp_commission_total` | Pass |
| 2 | Dual confirm tăng commission đúng 1 lần | Pass |
| 3 | Complaint + admin release/refund/no_show | Pass |
| 4 | Pending earn vs Earned UI | Pass |
| 5 | Snapshot % không hồi tố khi release | Pass |
| 6 | Migration 1.0.4 columns + legacy backfill | Pass |
| 7 | Shortcode stars / bio header | Pass |
| 8 | Disabled slots API + UI | Pass |
| 9 | Meeting link fallback | Pass |
| 10 | LP Emails tab Tutor Booking types | Pass |
| 11 | Join unlock N minutes (0 = immediate) | Pass |
| 12 | Default email no URL; `{{meeting_link}}` still resolves for custom body | Pass |

## Doc package version

- **1.2 — 09/07/2026** — dual-confirm, complaint, delayed revenue, reviews, meeting unlock, email notice.
