# 02 — Product Strategy: LearnPress – Backup & Migration Tool (Import Quiz Questions)

## Product Brief

### Product name

**LearnPress – Backup & Migration Tool**  
**Module (MVP):** Import Quizzes (multi → course) + Import Questions

### Tagline

Bulk-import LearnPress quiz questions from a UTF-8 CSV—validate first, then create in batches without timeouts.

### Problem statement

Instructor và admin dựng quiz lớn phải nhập từng câu trong wp-admin: title, type, answers, correct flags, mark, attach quiz. Nội dung thường đã có trên Excel/Google Sheets. LearnPress chưa có first-class **CSV import quiz questions**, nên migration và launch course bị chậm và dễ sai dữ liệu.

### Proposed solution

Module trong add-on **Backup & Migration** (free):

1. **Import Quizzes** — multi-quiz CSV/JSON có optional `section_name` → chọn **course** → tạo/find section(s), tạo nhiều quiz + questions → gắn curriculum  
2. **Import Questions** — questions CSV/JSON → existing quiz **hoặc** content bank  
3. Validate → preview → batch import; publish default for immediate LearnPress visibility; explicit draft still supported; error log text  
4. Entry: Import/Export tabs only (không Tools)

### Target audience

| Segment | Vai trò | Nhu cầu |
| --- | --- | --- |
| Primary | `lp_instructor`, content author | Bulk quiz từ spreadsheet |
| Secondary | Administrator | Limits, full quiz access, bulk ops |
| Indirect | Agency setup LP sites | Faster content migration |
| Non-user | Student | Chỉ hưởng quiz đầy đủ hơn |

### User roles (MVP)

| Role | Scope |
| --- | --- |
| Administrator | Mọi quiz; settings limits; full tools |
| `lp_instructor` | Quiz/course trong phạm vi edit; không settings global (trừ khi site gán cap tương đương) |
| Student | Không dùng UI import |
| Developer | Không target; không hooks MVP |

### Business value

| Value | Mô tả |
| --- | --- |
| Retention / stickiness | Backup & Migration hữu dụng hơn cho instructor heavy-content |
| Support deflection | Giảm “làm sao migrate questions?” bằng tool + docs EN |
| Competitiveness LP toolkit | Bổ sung capability bulk content mà core đang thiếu |
| Revenue | **Không** monetize riêng; free trong add-on hiện có |

### Scope (MVP)

- **Screen A:** multi-quiz file with `section_name` → select course → create/find sections + create quizzes + questions + section attach  
- **Screen B:** questions only → existing quiz or content bank  
- Formats CSV/JSON; LearnPress core types single/multi/TF/fill-in-blanks; batch + progress; publish default, explicit draft still supported  
- Settings limits; text error log; EN docs

### Out of scope (MVP)

- Export CSV round-trip, flexible column mapping UI, undo/rollback
- Image sideload, categories, custom question types, developer hooks
- XLSX / QTI / Moodle XML / GIFT
- Entry point trong quiz editor; role/capability mới
- Landing page / marketing campaign; freemium caps; AI generation

---

## Product positioning

| Dimension | Statement |
| --- | --- |
| For | LearnPress instructors & admins |
| Who | Cần migrate nhiều quiz/course content từ spreadsheet |
| The product | Two import tools in Backup & Migration |
| That | Multi-quiz → course, or questions → quiz/bank, with validation + batch |
| Unlike | Nhập tay từng quiz/câu hoặc script dev-only |
| We | Data integrity, course curriculum attach, shared-hosting batches |

### USP

**Two Import/Export screens: multi-quiz files into a course curriculum, and question-only into a quiz or content bank—CSV/JSON, validated and batched, free in Backup & Migration.**

### Differentiators

1. Map đúng LearnPress internal types + answer `is_true` storage qua CURD chính thức.
2. Validate trước khi ghi; một row lỗi không chặn toàn batch.
3. Progress batch cho shared hosting.
4. Permission-scoped searchable quiz picker.
5. Override-by-title trong quiz đích thay vì silent duplicate spam.
6. Settings-operated limits (ops-friendly).

### Product vision

Backup & Migration trở thành hub **nội dung & chuyển dữ liệu** của LearnPress: import quiz questions (v1) → export/round-trip & bank import (v1.1+) → mở rộng migration artifacts khác khi đủ nhu cầu vận hành—luôn free trong add-on, maintain bởi LearnPress Dev team.

---

## Revenue model

| Item | Decision |
| --- | --- |
| Model | Free feature trong add-on free hiện có |
| Standalone paid SKU | Không |
| Freemium row limit | Không |
| Upsell | Không áp dụng trực tiếp; gián tiếp tăng giá trị ecosystem LearnPress / PRO stack |
| Pricing hypothesis | N/A (free) |

**Revenue potential:** gián tiếp (retention, fewer churn drivers, ecosystem completeness). Không gắn KPI license mới cho module này.

---

## Growth loops (product-native, không GTM campaign)

| Loop | Cơ chế | Metric |
| --- | --- | --- |
| Content speed loop | Import nhanh → quiz launch sớm → course publish | Time-to-publish 50–100Q quiz |
| Support deflection loop | Docs + template + clear errors → fewer tickets | Tickets “bulk questions” / 90 ngày |
| Tool reuse loop | Instructor dùng Import/Export lại cho course tiếp theo | % sites dùng import ≥1 lần/quý |

Không xây viral/referral loop cho MVP.

---

## Roadmap

### Version 1.0 (MVP) — Build Now

| Item | Value |
| --- | --- |
| Import Quizzes + Import Questions tabs | Two screens; multi-quiz needs course; section comes from file or UI fallback |
| Template download + sample rows | Giảm support |
| Upload + delimiter/encoding checks | Reliability |
| Quiz searchable select (admin all / instructor scoped) | Permission |
| Validate + preview + text error log | Integrity |
| Batch import + progress (AJAX + REST) | Shared hosting |
| 4 LearnPress core types + alias normalize | Core coverage |
| Publish default; insert position; override-by-title | Author control |
| Settings limits | Ops |
| EN docs in existing addon docs | Adoption |

### Version 1.1

| Item | Value |
| --- | --- |
| Import History read-only audit | Know who imported what, when, target, file, counts, created IDs, row errors |
| Export quiz questions to CSV | Round-trip |
| Preview pagination / full table filter UX polish | Usability |
| Optional import status override (`draft`, `pending`, `private`) | Review/control for power users |
| Improved duplicate strategy (external `question_id`) | Safer overrides |
| Resume interrupted import | Reliability |

### Version 2.0

| Item | Value |
| --- | --- |
| Import to Question Bank | Flexibility |
| Flexible column mapping UI | Third-party CSV |
| Undo import job | Trust / recovery |
| Image URL / Media sideload | Rich content |
| Categories, hint advanced, multi-quiz file | Scale authoring |
| Background jobs (Action Scheduler) | Very large files |

---

## Success metrics

| Metric | Target | Notes |
| --- | --- | --- |
| Median time 50–100Q quiz vs manual | Giảm rõ trong UAT qualitative | Baseline manual |
| Valid-row create accuracy | ≥ 95% | Type + answers + quiz attach |
| Support tickets bulk/migrate questions | Giảm trong 90 ngày post-release | |
| Adoption | % active instructor sites import ≥1/quarter | Analytics/events if available |
| Unclear-error abandon | < 5% sessions (feedback) | |
| Perf | 1.000 valid rows no PHP timeout | Shared hosting profile |
| Security | 0 critical on upload/capability paths | Release QA |
| A11y | WCAG 2.1 AA on import UI | |

---

## Assumptions, Decisions, And Validation Items

### Decisions

- Ship inside **Backup & Migration**, free, one Dev team.
- MVP import-only; “Export” là Phase 2 dù brand add-on có Backup/Migration.
- No marketing launch assets riêng.
- No developer extensibility surface in MVP.

### Assumptions

- Batch size 50–100 đủ cho shared hosting phổ biến.
- Pipe delimiter `|` đủ cho answer text thông thường (escape rule: không dùng `|` trong answer hoặc escape documented).
- Override-by-title là acceptable default cho “override”.

### Validation items

- UAT shared hosting 1.000 rows.
- Instructor permission matrix trên multi-instructor site.
- Edge: BOM Excel, semicolon locale, multiline quoted fields, Vietnamese text.

---

## Next Actions

| Owner | Action |
| --- | --- |
| Product | Lock v1.0 backlog vs Phase 2 list; release note wording trong add-on |
| Engineering | Estimate sprint effort; implement CURD path only (no parallel store) |
| Design | Finalize Import/Export multi-step UI |
| Docs | EN task-based “Import quiz questions from CSV” |
| QA | Map success metrics → test cases |
