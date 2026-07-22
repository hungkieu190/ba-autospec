# 06 — SEO & Marketing: Import Quiz Questions (Backup & Migration)

## Scope note (quyết định sản phẩm)

Module **không** có:

- Landing page riêng trên ThimPress
- Content marketing campaign / blog launch series
- YouTube demo / GIF marketing
- Standalone product SKU naming push

Tài liệu này phục vụ: **in-product copy**, **add-on docs (EN)**, **changelog/release notes**, và **internal naming**—không phải GTM full funnel.

---

## Product page outline (nếu cần section trong trang add-on Backup & Migration)

Không bắt buộc public page. Nếu add-on page đã tồn tại, thêm **một section ngắn**:

### SEO title (section / docs H1)

`Import Quiz Questions from CSV for LearnPress | Backup & Migration`

### Meta description (docs)

`Bulk-import LearnPress quiz questions from a UTF-8 CSV. Validate rows, fix errors, and import Single Choice, Multiple Choice, True/False, and Fill-in-Blanks questions in batches.`

### Hero (docs/section)

| Element | Copy |
| --- | --- |
| H1 | Import Quiz Questions from CSV |
| Sub | Turn spreadsheets into LearnPress quiz questions—validate first, import in safe batches. |
| CTA primary | Open Import/Export → Import Quizzes / Import Questions |
| CTA secondary | Download CSV template |

### Outline blocks

1. Problem: manual quiz entry does not scale  
2. How it works: template → upload → preview → batch import  
3. Supported types (4 LearnPress core types)  
4. Safety: validation, publish default, explicit draft option, permissions  
5. Limits & settings  
6. FAQ  
7. Link to full docs  

### Internal links

- Backup & Migration overview  
- LearnPress quiz documentation  
- Changelog  

---

## SEO content plan (docs-oriented)

Keyword potential = relative hypothesis (no verified volume).

| Keyword | Intent | Traffic Potential | Monetization | Content type |
| --- | --- | --- | --- | --- |
| import quiz questions CSV LearnPress | How-to | Medium | Low (free) | Docs |
| LearnPress bulk import questions | How-to | Medium | Low | Docs |
| LearnPress CSV question bank | How-to | Low–Med | Low | Docs Phase 2 |
| WordPress LMS import quiz CSV | How-to | Medium | Low | Docs |
| LearnPress import true false multiple choice | How-to | Medium | Low | Docs |
| bulk create LearnPress quiz | How-to | Medium | Low | Docs |
| LearnPress question import tool | Navigational | Low–Med | Low | UI + docs |
| export import LearnPress quiz | How-to | Medium | Low | Phase 2 |

### Content ideas (≥25, docs/help priority — not marketing campaign)

| # | Topic | Intent | Funnel | Audience | Product angle | Priority |
| --- | ---: | --- | --- | --- | --- | --- |
| 1 | How to import quiz questions into LearnPress from CSV | How-to | Use | Instructor | Core path | P0 |
| 2 | LearnPress CSV template column reference | How-to | Use | Author | Spec | P0 |
| 3 | Encoding answers with pipe delimiters | How-to | Use | Author | answers column | P0 |
| 4 | Mapping correct answers for multi choice | How-to | Use | Author | indices | P0 |
| 5 | Importing True/False questions via CSV | How-to | Use | Author | auto answers | P0 |
| 6 | Fixing validation errors in quiz CSV import | Troubleshoot | Use | Author | error log | P0 |
| 7 | Why imported questions publish by default | FAQ | Use | Author | LearnPress visibility | P0 |
| 8 | Re-importing and override by title | FAQ | Use | Author | override | P0 |
| 9 | Instructor permissions for quiz import | FAQ | Use | Admin/Instructor | caps | P0 |
| 10 | Configuring import file size and row limits | Admin | Use | Admin | settings | P1 |
| 11 | Excel semicolon CSV and LearnPress import | Troubleshoot | Use | Author | delimiter | P1 |
| 12 | UTF-8 and Vietnamese content in quiz CSV | Troubleshoot | Use | Author | encoding | P1 |
| 13 | Choosing insert position when importing questions | How-to | Use | Author | order | P1 |
| 14 | Supported question types for CSV import | FAQ | Use | Author | scope | P0 |
| 15 | Shared hosting and large quiz imports | Troubleshoot | Use | Admin | batching | P1 |
| 16 | Migrating a 100-question quiz into LearnPress | Use case | Use | Instructor | speed | P1 |
| 17 | Agency workflow: bulk quiz load for client LP sites | Use case | Use | Agency | ops | P2 |
| 18 | Difference between order CSV export and quiz import | Clarify | Use | Admin | avoid confusion | P1 |
| 19 | Preparing Google Sheets for LearnPress quiz import | How-to | Use | Author | export CSV | P1 |
| 20 | Common CSV mistakes that fail import | Troubleshoot | Use | Author | support deflection | P0 |
| 21 | After import: review published questions checklist | How-to | Use | Instructor | quality | P1 |
| 22 | Standalone quiz vs course quiz import targets | FAQ | Use | Instructor | picker | P2 |
| 23 | What is not supported in MVP import | FAQ | Expectation | All | scope | P0 |
| 24 | Roadmap: export and question bank (informational) | Inform | Later | All | Phase 2 | P2 |
| 25 | Changelog: Backup & Migration quiz import release | Release | Adopt | All | ship | P0 |
| 26 | Security notes: uploads and capabilities | Admin | Trust | Admin | security | P2 |
| 27 | Accessibility of the import tool UI | Admin | Trust | Admin | a11y | P2 |
| 28 | Batch progress meaning (created vs updated) | How-to | Use | Author | counters | P1 |
| 29 | Max answers per question setting explained | Admin | Use | Admin | limits | P2 |
| 30 | Using import after course content migration | Use case | Use | Agency | workflow | P2 |

**Không tạo** comparison SEO pages, paid ads copy, newsletter growth series trừ khi leadership đổi decision.

---

## Product naming ideas (module + messaging)

Host product name đã chốt: **LearnPress – Backup & Migration Tool**.

| Name | Reasoning | Fit | Risk |
| --- | --- | --- | --- |
| Import Quiz Questions | UI label rõ | High | Generic |
| CSV Quiz Import | Ngắn | High | Bỏ “Questions” |
| Quiz Questions CSV Importer | Mô tả đủ | High | Dài |
| Bulk Quiz Import | Benefit | Medium | Nhầm course import |
| Spreadsheet Quiz Import | User language | Medium | Không nói CSV |
| LearnPress Quiz CSV Tool | Brand+format | Medium | Trùng brand dài |
| Question Bank Loader | Future bank | Low MVP | Overclaim bank |
| Quiz Migration Import | Migration fit add-on | High | Nhầm full LMS migrate |
| Validate & Import Quiz CSV | Safety USP | Medium | Dài |
| Import/Export: Import Quizzes / Import Questions | Nav match | High | Không brand riêng |

**Recommended UI strings:**  
- Menu: `Import Quizzes` · `Import Questions`  
- Docs H1: `Import quizzes and questions (CSV/JSON)`

---

## Taglines (10)

1. Spreadsheet in. Validated LearnPress questions out.  
2. Bulk-import quiz questions without the busywork.  
3. CSV to LearnPress quiz—validate first, import safe.  
4. Build 100-question quizzes without 100 manual saves.  
5. Batch import Single, Multi, True/False, and Fill-in-Blanks into any quiz you can edit.  
6. Fix rows before they hit your question bank—preview included.  
7. Shared-hosting friendly quiz imports for LearnPress.  
8. From Excel to LearnPress quiz in controlled batches.  
9. Publish by default. Use draft only when you want a review hold.  
10. Free inside Backup & Migration—built for real instructor workflows.

---

## Product descriptions

### Short

Import LearnPress quiz questions from a UTF-8 CSV: validate every row, preview issues, then batch-create Single Choice, Multiple Choice, True/False, and Fill-in-Blanks questions into an existing quiz.

### Medium

LearnPress – Backup & Migration Tool adds Import Quiz Questions for administrators and instructors who already author content in spreadsheets. Download the template, upload a CSV, review valid and invalid rows, then import only clean data in batches with progress feedback. Questions default to publish so they appear in LearnPress immediately, respect quiz permissions, and can override same-title items on re-import. Authors can still set `status=draft` in the file when they want a review hold.

### Long

Creating large LearnPress quizzes by hand is slow and error-prone. This module, shipped free inside LearnPress – Backup & Migration Tool, turns structured CSV files into LearnPress questions using core APIs—so types, answers, marks, explanations, and fill-in-blanks metadata land in the real question data model. Authors download a UTF-8 template, choose a target quiz via a searchable selector scoped by role, set insert position, and upload a CSV. The tool validates file and row rules before writing, shows counts and a limited preview, and provides a downloadable text error log. Import runs in batches over Admin AJAX and REST to reduce PHP timeouts on shared hosting. Supported MVP types are single choice, multi choice, true/false, and fill-in-blanks (with alias normalization). Re-import overrides questions with the same title in the target quiz. Admins configure max file size, row count, and answers per question. Export, flexible mapping, and undo remain later phases.

---

## Launch assets (minimal, product-owned)

### Release notes (short)

```text
Backup & Migration: Import Quiz Questions from CSV
- Download UTF-8 template and bulk-import quizzes into a selected course, or questions into an existing quiz
- Import Quizzes supports section_name in CSV/JSON and creates missing sections in the selected course
- Supports Single Choice, Multiple Choice, True/False, and Fill-in-Blanks
- Pre-import validation, preview, text error log, batched progress
- Draft by default; override same-title questions on re-import
- Admin settings for file size, max rows, and max answers
```

### Changelog entry

```text
= x.y.z =
* New: Import Quizzes (multi-quiz → selected course, grouped by section_name + quiz title) and Import Questions under LearnPress → Import/Export
* New: Searchable quiz selector with role-based visibility
* New: Validation preview and downloadable text error report
* New: Batched import with progress (AJAX/REST)
* New: Settings for import limits (size, rows, answers)
```

### Product announcement (internal / add-on readme blurb)

```text
You can now bulk-import quiz questions into LearnPress from a CSV file.
Open LearnPress → Import/Export → Import Quizzes (into a selected course, using section_name from the file) or Import Questions,
validate your file, and import in batches—no more one-by-one entry for large quizzes.
```

### Newsletter / social

**Không yêu cầu** theo quyết định scope. Nếu team cần 1 post kỹ thuật:

```text
New in LearnPress Backup & Migration: Import Quiz Questions from CSV.
Validate → preview → batch import. Docs: [link]
```

---

## Growth loops

Chỉ product loops (xem strategy): content speed, support deflection, tool reuse. Không paid acquisition loop cho module free.

---

## Assumptions, Decisions, And Validation Items

### Decisions

- No dedicated SEO campaign or marketing docs factory for launch.
- Copy EN for product UI/docs.
- Name host: Backup & Migration; feature label: Import Quiz Questions.

### Assumptions

- Existing add-on page/docs traffic enough for discoverability among LP users.
- Support macros + changelog drive adoption more than blog SEO.

### Validation items

- Confirm exact menu path strings with i18n text domain of add-on.
- Confirm changelog version number at ship time.

---

## Next Actions

| Owner | Action |
| --- | --- |
| Docs | Publish P0 content ideas 1–10, 14, 20, 23, 25 |
| Product | Paste release notes into Backup & Migration readme |
| Marketing | No campaign unless decision changes |
| Support | Link FAQ from ticket macros |
