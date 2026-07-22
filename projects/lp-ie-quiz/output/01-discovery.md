# 01 — Discovery: LearnPress – Backup & Migration Tool (Import Quiz Questions CSV)

## Tóm tắt điều hành

**LearnPress – Backup & Migration Tool** nhận thêm module **Import Quizzes + Import Questions from CSV/JSON** trong add-on Backup & Migration hiện có (không tạo add-on mới, không merge vào LearnPress core). Mục tiêu: cho Administrator và `lp_instructor` bulk-create quiz/questions từ CSV/JSON UTF-8, validate trước khi ghi, import theo batch, gắn vào course/section hoặc quiz đích.

**Build Recommendation sơ bộ:** **Build Now** (phạm vi MVP chặt).

Lý do: gap kỹ thuật rõ trong LearnPress (chưa có first-class CSV import cho quiz questions), API tạo câu hỏi/quiz đã sẵn (`LP_Question_CURD`, `LP_Quiz_CURD`), ship free trong add-on hiện có nên không phụ thuộc pricing mới, và giảm ma sát khi instructor dựng quiz lớn.

---

## Evidence Summary

| Loại thông tin | Trạng thái | Ghi chú |
| --- | --- | --- |
| Nhu cầu vận hành | Có tín hiệu | Nhiều yêu cầu qua chatbot/ticket về import quiz questions; chưa có thống kê chính thức. |
| Gap sản phẩm | Mạnh | LearnPress core có Tools + CSV order export; **không** có import CSV quiz questions. |
| Feasibility kỹ thuật | Mạnh | Recon codebase: type slugs, CURD create, answer tables, Tools submenu. |
| Monetization | Free | Tính năng free, gắn vào add-on Backup & Migration (add-on hiện free). |
| Phân phối | Rõ | Không standalone SKU; không landing page riêng; docs gộp vào docs add-on. |
| SEO/marketing launch | Không áp dụng MVP | Không tạo content marketing / video / product page riêng theo quyết định scope. |

---

## Assumption Mapping (VUBF)

| Assumption | Category | Importance | Evidence | Priority | Fastest Test | Decision Rule |
| --- | --- | --- | --- | --- | --- | --- |
| Instructor chấp nhận fixed CSV columns + pipe answers thay vì mapping UI | Usability | High | Quyết định MVP | Test immediately | UAT với sample template 50–100 rows | Nếu >30% fail parse do format, bổ sung mapping ở v1.1 |
| Batch 50–100 rows/request đủ tránh timeout shared hosting | Feasibility | High | Constraint hosting | Test immediately | Import 1.000 rows valid trên shared hosting profile | Nếu timeout, giảm batch size hoặc thêm background job Phase 2 |
| Draft default giảm lỗi publish nhầm | Value | Medium | Quyết định product | Monitor | Review sau import | Nếu user luôn publish ngay, thêm option “import as publish” |
| Override theo title trong quiz đích an toàn hơn luôn tạo duplicate | Value / Data | High | Quyết định Q-16 | Test immediately | Re-import cùng file | Nếu title trùng ngoài ý muốn, cần external `question_id` Phase 2 |
| Settings page cho limits (size/rows/answers) đủ cho ops | Business | Medium | Quyết định Q-13 | Monitor | Default 10MB / 5.000 rows / 10 answers | Điều chỉnh default sau support load |
| Chỉ Admin + `lp_instructor` + capability edit quiz hiện có là đủ | Feasibility | High | Quyết định Q-07/Q-09 | Monitor | Permission matrix QA | Không tạo capability/role mới trừ khi có abuse case |

---

## Market Opportunity Score

Đánh giá nội bộ theo fit kỹ thuật + pain vận hành (không dùng search volume giả).

| Factor | Score /10 | Rationale |
| --- | ---: | --- |
| Pain intensity | 8 | Nhập tay hàng chục–hàng trăm câu hỏi tốn thời gian, dễ sai answers/correct flags. |
| Demand evidence | 6 | Nhiều request chatbot/ticket; chưa có số liệu formal. |
| Competitive gap (trong LP) | 9 | Core thiếu first-class CSV quiz import; CSV hiện có là order/privacy export. |
| Monetization | 4 | Free; giá trị nằm ở retention + completeness của Backup & Migration. |
| Feasibility | 8 | API + Tools host sẵn; rủi ro chính là CSV edge cases + timeout. |
| Support cost | 5 | Template/docs kém sẽ tăng ticket; mitigable bằng sample + error log rõ. |
| Strategic fit | 9 | Đúng roadmap add-on Backup & Migration; LearnPress Dev team maintain toàn bộ. |

**Market Opportunity Score:** **7.0 / 10**

**Build Recommendation sơ bộ:** **Build Now** — MVP import CSV/JSON vào quiz/course, đủ 4 LearnPress core question types, fixed columns, settings limits, batch + progress.

---

## Search Demand Analysis

Không chạy SEO launch riêng. Keyword dưới đây phục vụ **docs/help content** (English) trong docs add-on, không phải GTM campaign.

| Keyword | Intent | Traffic Potential | Monetization Potential | Best Content Type | Notes |
| --- | --- | --- | --- | --- | --- |
| import quiz questions CSV LearnPress | Transactional / How-to | Medium | Low (free) | Docs usage | Primary help topic |
| LearnPress bulk import questions | Commercial / How-to | Medium | Low | Docs + FAQ | |
| LearnPress CSV question bank | Informational | Low–Medium | Low | Docs Phase 2 bank | MVP: quiz only |
| WordPress LMS import quiz CSV | Informational | Medium | Low | Docs | |
| LearnPress import true false multiple choice | How-to | Medium | Low | Docs + template notes | |
| bulk create LearnPress quiz | How-to | Medium | Low | Tutorial in docs | |
| LearnPress question import tool | Navigational | Low–Medium | Low | Import/Export UI label | |
| export import LearnPress quiz | Comparison / How-to | Medium | Low | Phase 2 export | MVP import-only |

---

## Competitor / Alternative Landscape (kỹ thuật)

Chỉ so sánh **workflow kỹ thuật** trong bối cảnh LearnPress; không audit marketplace pricing.

| Product / Approach | Type | Positioning kỹ thuật | Core capability | Strengths | Weaknesses vs solution này | Source |
| --- | --- | --- | --- | --- | --- | --- |
| Manual LP Admin / Course Builder | Alternative | Default authoring | Single-question editor | Full control per field | Chậm, error-prone khi bulk | Input + recon |
| Spreadsheet → retype | Alternative | Offline authoring | Excel/Sheets | Author quen format | Không sync LP; double work | Input |
| LearnPress Order CSV export | Indirect | Ops/export orders | Batched CSV download | Pattern batch CSV có sẵn | Không import quiz questions | Code recon |
| Custom WP-CLI / one-off scripts | Alternative | Dev migration | Arbitrary import | Linh hoạt | Không instructor-friendly; không productized | Input |
| Other LMS import formats (GIFT/XML/Aiken…) | Indirect | Cross-LMS migration | Rich formats | Mature elsewhere | **Out of scope** MVP; không đảm bảo schema third-party | Input / decision |

### Gap opportunities

| Gap | Opportunity | Phase |
| --- | --- | --- |
| Không có UI import quiz questions first-class | Thêm **Import/Export → Import Quiz Questions** (CSV+JSON) | MVP |
| Không validate hàng loạt trước khi ghi DB | Pre-import validation + text error report | MVP |
| Timeout file lớn | Batch AJAX/REST + progress | MVP |
| Type slug mismatch (`true_false` vs `true_or_false`) | Normalize aliases → LP internal types | MVP |
| Thiếu round-trip export | Export CSV quiz | Phase 2 |
| Thiếu import question bank / mapping UI / undo | Mở rộng Backup & Migration | Phase 2 |

---

## Product Complexity

| Area | Complexity | Reason |
| --- | --- | --- |
| CSV parse (UTF-8, BOM, `;`/`,`/tab, multiline quotes) | Medium–High | Locale Excel + Vietnamese content |
| Validation rules per type | Medium | Min answers, correct indices, TF rules |
| Override-by-title trong quiz | Medium | Match + update vs create; tránh partial state |
| Batch import + progress | Medium | Dual AJAX + REST; idempotency double-submit |
| Permissions (Admin vs Instructor quiz list) | Medium | Searchable select scoped by ownership/edit cap |
| Settings limits | Low | Options API trong add-on settings |
| True/False auto answers | Low | Generate True/False + map correct |
| Insert position (start / after N / end) | Low–Medium | Order quiz–question relation |
| Temp file `/tmp` immediate delete | Low | Security + privacy |
| Support docs (EN) | Medium | Template + troubleshooting quyết định ticket volume |

**Complexity score (MVP):** **5.5 / 10** (vừa, shipable trong 1 sprint cycle hợp lý nếu scope giữ chặt).

---

## Risk Assessment

| Risk | Severity | Likelihood | Mitigation |
| --- | --- | --- | --- |
| PHP timeout / memory large CSV | High | Medium | Batch 50–100; progress; defaults configurable; test shared hosting |
| Double-submit / re-import tạo data lệch | High | Medium | Override-by-title trong quiz đích; disable button khi job running; nonce |
| Instructor import quiz không thuộc quyền | High | Medium | Capability edit quiz; dropdown scoped; server-side recheck |
| CSV injection / HTML/shortcode trong answers | Medium | Medium | Sanitize theo LP storage rules; escape report download |
| Encoding BOM / delimiter sai | Medium | High | Auto-detect delimiter; UTF-8 prefer; clear file-level errors |
| Override title trùng ngoài ý muốn | Medium | Medium | Preview counts “will update / will create”; docs warn |
| Support load do template khó | Medium | Medium | Sample rows; fixed headers; text error log per row |
| Scope creep (export, mapping, images, hooks) | High | High | Hard MVP boundary; Phase 2 backlog only |
| Temp file residual PII | Medium | Low | `/tmp` + delete immediately after process |
| Browser/a11y gaps admin UI | Medium | Low | Modern + legacy browsers per decision; WCAG 2.1 AA targets |

---

## Build Recommendation (Discovery)

| Decision | Detail |
| --- | --- |
| **Build Now** | Import Quizzes CSV/JSON → selected course with file-level `section_name`; Import Questions CSV/JSON → existing quiz/content bank; 4 LearnPress core types; fixed columns; pipe answers; validate + preview; batch; settings limits; text error report; insert position; override-by-title for questions |
| **Build Later (Phase 2)** | Export, question bank, flexible mapping, history/undo, images, categories, multi-quiz file, advanced duplicate by external id |
| **Do not build** | Developer hooks/API docs; standalone add-on; core merge; marketing site/landing; freemium row limits; new roles |
| **Packaging** | Feature module trong **LearnPress – Backup & Migration Tool** (free) |
| **Owner** | LearnPress Dev team (một team cho core + add-ons) |

---

## Assumptions, Decisions, And Validation Items

### Decisions (đã chốt)

1. Tên host product: **LearnPress – Backup & Migration Tool**; module: Import Quiz Questions CSV.
2. Không add-on mới; không core feature.
3. Free; docs EN gộp docs add-on hiện có.
4. Roles: Administrator + `lp_instructor` only.
5. Entry: **Import Quizzes** (`import_quizzes`) + **Import Questions** (`import_questions`) + settings — không Tools.
6. Multi-quiz: group by `section_name` + `quiz_title` / `quizzes[].section_name` + title → selected course curriculum; empty section falls back to UI default; questions-only: quiz or content bank.
7. Limits qua **settings page**; temp file `/tmp` xóa ngay; AJAX + REST; no developer hooks; no cache invalidation đặc thù.
8. Re-import: **override** (update theo title trong quiz đích).
9. Insert position: có option; default cuối quiz.
10. Sau import: user chọn stay summary / đi edit quiz.
11. Performance baseline: shared hosting cơ bản; a11y WCAG 2.1 AA; browser: tất cả phổ biến.

### Assumptions

- Default limits: **10 MB**, **5.000 rows**, **10 answers/question**, batch **50–100**.
- LearnPress core types in MVP: `single_choice`, `multi_choice`, `true_or_false`, `fill_in_blanks`. Third-party/custom type schemas remain out of MVP unless compatible with the core answer storage path.
- Preview chi tiết tối đa **20 rows**; counts luôn full.
- True/False: auto-generate answers True/False; `correct_answer` nhận `true`/`false`/`1`/`0`/`yes`/`no`.

### Validation items

- UAT 1.000-row valid file trên shared hosting không timeout.
- Import success rate ≥ 95% rows valid trong UAT.
- Permission matrix: instructor không thấy/không import quiz ngoài phạm vi.
- Override-by-title: re-import không tạo duplicate ngoài ý muốn; preview báo “update vs create”.

---

## Next Actions

| Owner | Action |
| --- | --- |
| Product | Chốt CSV column spec cuối + copy labels UI EN trong docs add-on |
| Engineering | Spike parse delimiter/BOM + batch import prototype trên shared hosting profile |
| Design | Wireframe Import/Export screens: upload → preview → progress → summary |
| QA | Viết test matrix từ PRD + shared hosting perf case |
| Docs | Template CSV + page “Import quiz questions” trong docs Backup & Migration |
| Leadership | Confirm free packaging trong Backup & Migration release notes |
