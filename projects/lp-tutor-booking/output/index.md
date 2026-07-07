# Index — LearnPress Tutor Booking Documentation Package

> **Ngôn ngữ:** Toàn bộ tài liệu viết bằng tiếng Việt. Technical terms giữ tiếng Anh.
> **Trạng thái:** Draft — chưa được duyệt bởi Product, Engineering, và Leadership.
> **Phiên bản:** 1.0 — 07/07/2026

---

## Danh sách tài liệu

| File | Nội dung | Team cần đọc |
|---|---|---|
| [01-discovery.md](./01-discovery.md) | Market validation, assumption mapping, competitor analysis, search demand, risk assessment | Product, Leadership |
| [02-product-strategy.md](./02-product-strategy.md) | Product brief, positioning, USP, roadmap v1/v1.1/v2, revenue model, growth loops | Product, Marketing, Leadership |
| [03-prd.md](./03-prd.md) | User stories, functional requirements, permission matrix, acceptance criteria, success metrics | Product, Engineering, QA, Design |
| [04-ux-and-wireframe.md](./04-ux-and-wireframe.md) | User flows (Mermaid), screen list, per-screen specs, navigation rules | Design, Engineering, Product |
| [05-qa-and-documentation.md](./05-qa-and-documentation.md) | Test plan (functional, permission, edge case, security), documentation outline | QA, Docs, Engineering |
| [06-seo-and-marketing.md](./06-seo-and-marketing.md) | Product page outline, SEO content plan, naming ideas, taglines, launch assets | Marketing, SEO, Design |
| [07-build-or-not-build.md](./07-build-or-not-build.md) | Executive build decision, ROI estimate, dev cost estimate, final recommendation | Leadership, Product |
| [quality-report.md](./quality-report.md) | Quality review checklist — completeness, assumptions, evidence gaps | Product |
| [asana-task.html](./asana-task.html) | Task template cho Asana — mở trong browser, bấm Copy | Product, Engineering |

---

## Wireframes

| File | Nội dung |
|---|---|
| [wireframes/wireframes.html](./wireframes/wireframes.html) | 17 màn hình — navigation sidebar, desktop + mobile states |

---

## Quy ước chung

- **Assumption:** Thông tin chưa được xác nhận bằng dữ liệu thực.
- **Cần validate:** Cần test hoặc clarify trước khi commit code.
- **Validation item:** Cần Product/Engineering sign-off trước khi commit code.

---

## Decisions Log (07/07/2026)

> Tất cả 5 câu hỏi kỹ thuật đã được Product Owner quyết định.

| # | Câu hỏi | Quyết định |
|---|---|---|
| 1 | Google Calendar scope (v1.0) | ✅ Sync booking với Google Calendar và kiểm tra Google Calendar busy time để chống conflict |
| 2 | Tutor listing page (S01) | ✅ Có trong v1.0 — phiên bản đơn giản, chỉ danh sách |
| 3 | Reschedule deadline default | ✅ 24 giờ trước session (configurable) |
| 4 | Meeting link visibility | ✅ Hiển thị ngay sau booking status = Confirmed |
| 5 | Group session khi chưa đủ người | ✅ Proceed — không auto-cancel (quá phức tạp: refund + reschedule + notification) |

## Validation Items còn lại

- ⚠️ **Pricing $39 cho 1 site license** — cần theo dõi conversion và support cost sau launch.
