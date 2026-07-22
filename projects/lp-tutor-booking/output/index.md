# Index — LearnPress Tutor Booking Documentation Package

> **Ngôn ngữ:** Toàn bộ tài liệu viết bằng tiếng Việt. Technical terms giữ tiếng Anh.
> **Trạng thái:** Draft — dual-confirmation, delayed revenue, meeting unlock, email notice (2026-07-09).
> **Phiên bản:** 1.2.1 — 09/07/2026

---

## Danh sách tài liệu

| File | Nội dung | Team cần đọc |
|---|---|---|
| [01-discovery.md](./01-discovery.md) | Market validation, assumption mapping, competitor analysis, search demand, risk assessment | Product, Leadership |
| [02-product-strategy.md](./02-product-strategy.md) | Product brief, positioning, USP, roadmap, revenue model, growth loops | Product, Marketing, Leadership |
| [03-prd.md](./03-prd.md) | User stories, functional requirements, permission matrix, acceptance criteria | Product, Engineering, QA, Design |
| [04-ux-and-wireframe.md](./04-ux-and-wireframe.md) | User flows, screen list, per-screen specs, navigation rules | Design, Engineering, Product |
| [05-qa-and-documentation.md](./05-qa-and-documentation.md) | Test plan, troubleshooting, documentation outline | QA, Docs, Engineering |
| [06-seo-and-marketing.md](./06-seo-and-marketing.md) | Product page outline, SEO content plan, naming ideas, taglines, launch assets | Marketing, SEO, Design |
| [07-build-or-not-build.md](./07-build-or-not-build.md) | Executive build decision và validation checklist | Leadership, Product |
| [quality-report.md](./quality-report.md) | Quality review checklist — completeness, assumptions, evidence gaps | Product |
| [asana-task.html](./asana-task.html) | Task template cho Asana — mở trong browser, bấm Copy | Product, Engineering |

---

## Wireframes

> Wireframes HTML được quản lý như deliverable riêng. Bộ tài liệu này chỉ giữ logic, requirements, QA, và marketing.

---

## Quy ước chung

- **Assumption:** Thông tin chưa được xác nhận bằng dữ liệu thực.
- **Cần validate:** Cần test hoặc clarify trước khi commit code.
- **Validation item:** Cần Product/Engineering sign-off trước khi commit code.

---

## Decisions Log

### 08/07/2026

| # | Câu hỏi | Quyết định |
|---|---|---|
| 1 | Google Calendar scope | Sync booking + busy lookup để chống conflict khi bật sync |
| 2 | Revenue share | Snapshot theo từng booking; booking cũ không bị ảnh hưởng khi admin đổi % mới |
| 3 | Timezone preview | Dùng current datetime theo timezone đang chọn, default là WordPress timezone cho admin |
| 4 | Slot availability | Past/started slots phải disabled, không cho click |
| 5 | Meeting link | Fallback chain: booking -> session type -> profile |
| 6 | Email integration | Tutor Booking confirmation email types nằm trong LearnPress Emails tab |

### 09/07/2026 — Dual confirmation & revenue gate

| # | Câu hỏi | Quyết định |
|---|---|---|
| 7 | Khi nào instructor được cộng revenue | Chỉ sau dual confirm (instructor taught + student learned) hoặc admin resolve release |
| 8 | Payment vs revenue | Order paid → booking `confirmed` (đã thanh toán). Revenue instructor **chưa** release |
| 9 | Dual confirm | Instructor: Confirm Taught. Student: Confirm Learned (+ optional star review) |
| 10 | Khiếu nại | Student mở complaint (reason) → status `disputed` → admin xử lý manual |
| 11 | Admin resolve | `release_revenue` / `complete` / `cancel` / `refund` / `no_show` |
| 12 | Review | Student review (1–5 sao + message) khi confirm learned hoặc sau completed |
| 13 | Shortcode sessions | Hiển thị tutor name, bio (khi filter profile), average rating + review count |
| 14 | Meeting link unlock | Setting `lp_tb_meeting_link_visible_minutes`: Join/Open Meeting chỉ hiện N phút trước `start_utc`; `0` = hiện ngay sau paid. **Default email không nhét URL** (chỉ notice unlock). `{{meeting_link}}` vẫn resolve để admin custom template nếu muốn. |

## Validation Items còn lại

- ⚠️ **Pricing $39 cho 1 site license** — cần theo dõi conversion và support cost sau launch.
- ⚠️ **Dual-confirm completion rate** — theo dõi % booking stuck ở `awaiting_confirmation` / `disputed`.
- ⚠️ **Admin dispute SLA** — chưa có auto-timeout; admin phải resolve manual.
