# 07 — Build or Not Build: LearnPress Tutor Booking

---

## Quyết định

# ✅ BUILD NOW

Sản phẩm đã ship đủ giá trị lõi: booking native LearnPress, revenue share snapshot, **dual confirmation + delayed instructor payout**, student complaint + admin resolve, reviews/ratings, timezone preview, disabled slots, meeting link fallback, confirmation emails trong LearnPress Emails tab.

---

## 1. Evidence tóm tắt

| Yếu tố | Evidence | Mức độ tin cậy |
|---|---|---|
| Pain tồn tại | Instructor ghép nhiều tool để bán session live | Cao |
| Khoảng trống native | LearnPress cần flow booking + payout tin cậy | Cao |
| Revenue split + delayed release | Admin control %; instructor earn sau dual confirm | Cao |
| Dual-confirm giảm payout sai | Paid ≠ earned; dispute path | Trung bình–Cao (cần QA E2E) |
| Timezone / slot logic | Preview + disabled slot + UTC | Trung bình |
| Email config trong LP | Confirmation types trong Emails tab | Cao |
| Social proof | Reviews + shortcode stars | Trung bình |

---

## 2. Lý do nên build tiếp

1. **Native advantage:** Tất cả trong LearnPress.
2. **Trusted payout:** Dual-confirm + admin resolve là khác biệt marketplace.
3. **Revenue control:** Snapshot share + pending vs earned.
4. **Support giảm nếu UX rõ:** Pending earn, badges awaiting, complaint reason.
5. **Code đã implement dual-confirm (v1.0.4 migration)** — không còn ý tưởng giấy.
6. **Strategic fit cao** cho ecosystem LearnPress.

---

## 3. Lý do cần thận trọng

1. Dual-confirm có thể stuck nếu một phía không confirm → cần admin tooling (đã có force complete / release).
2. Instructor có thể nhầm “paid = earned” → copy UI bắt buộc.
3. Dispute volume / SLA admin chưa auto-timeout (v1.1+).
4. Revenue snapshot + release idempotency phải regression-test.
5. Timezone + slot disabled vẫn là nguồn ticket.
6. Commission addon inactive: complete vẫn OK; balance UI phụ thuộc addon.

---

## 4. Market Opportunity Score

**7.7 / 10**

| Yếu tố | Điểm |
|---|---|
| Pain intensity | 8/10 |
| Native gap | 8/10 |
| Monetization | 8/10 |
| Feasibility | 6/10 |
| Support cost | 5/10 |
| Strategic fit | 9/10 |

---

## 5. Final Recommendation

**BUILD NOW**, với điều kiện release checklist:

1. Payment → `confirmed` **không** credit commission.
2. Confirm Taught + Confirm Learned → `completed` + single commission credit.
3. Complaint → disputed → admin resolve paths đúng.
4. Pending earn / Earned labels đúng `revenue_released`.
5. Revenue share snapshot không hồi tố.
6. Timezone/current datetime + disabled slots.
7. Meeting link fallback.
8. Join unlock `lp_tb_meeting_link_visible_minutes` (dashboard + locked message).
9. Default confirmation email: no meeting URL (notice only); custom `{{meeting_link}}` optional.
10. Tutor Booking emails trong LearnPress Emails tab.
11. Shortcode rating khi có reviews.
12. Migration 1.0.4 chạy an toàn (legacy completed backfill released).

---

## Assumptions, Decisions, And Validation Items

- **Decision:** Dual-confirm là core trust feature, không optional polish.
- **Decision:** Instructor earn chỉ sau release.
- **Decision:** Admin đổi share chỉ ảnh hưởng booking mới.
- **Decision:** v1 admin manual resolve; không auto-timeout dual-confirm.
- **Decision:** Current datetime preview bắt buộc.

## Next Actions

| Action | Owner | Deadline |
|---|---|---|
| E2E dual-confirm + commission | Engineering + QA | Ngay |
| E2E dispute resolve matrix | QA | Ngay |
| Messaging paid vs earned | Product + Marketing | Sprint hiện tại |
| Staging migration 1.0.4 verify | Engineering | Ngay |
