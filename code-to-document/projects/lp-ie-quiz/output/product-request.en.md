# Product Documentation Generator Input

## Project Name
lp-ie-quiz

## Product Idea
**LearnPress Import Export Quiz (CSV Import Quiz Questions)** is a LearnPress capability (core feature or LMS add-on) that lets administrators and instructors bulk-create quiz questions by uploading a structured CSV file, instead of entering each question manually in WordPress Admin.

Users download a UTF-8 CSV template, upload their file, validate rows before any data is written, preview valid/warning/error lines, then import only valid rows into an existing quiz (MVP) or the question bank (later). Import runs in small batches with progress feedback so large files do not time out. Supported MVP question types align with LearnPress core: Single Choice, Multi Choice, and True/False. Phase 2 adds flexible column mapping, import history, undo, export, images, categories, and extensibility hooks for custom question types.

The product turns spreadsheets and question banks from Excel, Google Sheets, or other LMS exports into LearnPress questions with answers, correct answers, marks, and explanations—while protecting data integrity through pre-import validation and per-row error handling.

## Product Type
LMS Add-on

## Target Users
- **Primary:** Course instructors and content authors who maintain large quizzes or migrate question banks into LearnPress.
- **Secondary:** WordPress / LearnPress site administrators who set limits, oversee all quizzes, and handle bulk content operations.
- **Tertiary (indirect):** Students (benefit from faster, more complete quiz content) and agencies building LearnPress sites for clients.

## User Roles
- Administrator
- Instructor
- Course Manager (capability-based, if mapped to LP roles)
- Developer / Add-on author (hooks for custom question types — Phase 2+)
- Student (not a direct user of the import UI)

## Core Problem
Creating a LearnPress quiz with dozens or hundreds of questions is slow and error-prone: each question requires manual title, type, answers, correct flags, mark, save, then attach to quiz. Instructors already hold content in Excel/Sheets or other LMS exports but LearnPress core has no first-class **CSV import for quiz questions** (existing CSV usage is mainly order export / privacy export / admin tooling—not question bulk import). Without bulk import, migration and large quiz authoring waste time and block course launch.

## Proposed Solution
Add an **Import Quiz Questions from CSV** tool in LearnPress Admin:

1. Entry points: **LearnPress → Tools → Import Quiz Questions**, and **Edit Quiz → Import Questions** (pre-select current quiz).
2. Download UTF-8 CSV templates; upload `.csv` only (drag-and-drop or file picker).
3. Choose destination: existing quiz (MVP) or question bank (Phase 2).
4. Validate all rows before create; classify Valid / Warning / Invalid with per-row reasons.
5. Preview (MVP: up to 20 rows detail; full counts always); import valid rows only in batches (e.g. 50–100 rows) via AJAX/REST with progress.
6. Persist questions through LearnPress APIs (`LP_Question_CURD`, quiz `add_question`, answer tables/meta: type, mark, explanation, hint, `is_true` answers).
7. Show completion report; Phase 2: batch history + undo.

Default new questions as **draft** so authors can review before publish. Design import column aliases and type slugs so CSV values map cleanly to LearnPress internal types (`single_choice`, `multi_choice`, `true_or_false`).

## Must-Have Features
- Download UTF-8 CSV template(s) with correct headers and sample rows (mixed Single / Multi / True-False).
- Upload `.csv` only; reject invalid type, empty file, unreadable encoding, missing header, oversize file, over max rows.
- Detect delimiter (comma, semicolon, tab) and prefer UTF-8 (Unicode / Vietnamese content safe).
- Import destination: **existing LearnPress quiz** (dropdown; preselected when opened from Edit Quiz).
- Fixed standard columns for MVP (no free-form mapping required): title, content, type, answers, correct answer, explanation, mark (and optional id/status as defined).
- Support question types: **single_choice**, **multi_choice**, **true_or_false** (normalize aliases such as `true_false` → `true_or_false`, `multiple_choice` → `multi_choice`).
- Pre-import validation: file-level and row-level rules (required title/type, min answers, valid correct indices, numeric mark ≥ 0).
- Preview with status counts (valid / warnings / errors); filter errors; download error report.
- Import only valid rows; one bad row must not stop the whole job.
- Batch processing with progress (processed / success / failed); avoid single long PHP request timeout.
- Create questions as **draft** by default; store answers and correct flags correctly; append to selected quiz in CSV row order.
- Capability checks and nonces; sanitize/escape; no executable upload path; capability-scoped quiz access for instructors.
- Clear post-import summary: created, skipped, failed, destination quiz; links to view quiz / questions; download result report.

## Nice-To-Have Features
- Flexible column mapping UI with auto-map when headers match template.
- Import into **Question Bank** without attaching to a quiz.
- Import history page (batch ID, file, user, counts, status) and **Undo import** (delete batch-created questions / detach from quiz with confirmation).
- Duplicate strategies: skip / always create new / update by external `question_id` (not by title alone).
- Export quiz questions to CSV (round-trip).
- Image URL column → external URL or Media Library sideload.
- Categories, difficulty, hint, multi-quiz `quiz_id` in one file.
- Custom / third-party question types via hooks/filters (e.g. register types, columns, row validators).
- Resume interrupted imports; Action Scheduler background jobs.
- Saved mapping templates; multiple downloadable templates per type.
- Admin-configurable limits (file size, max rows, max answers, field length) via settings or filters.

## Out Of Scope
- Full LMS migration of courses/lessons/orders (only quiz questions via CSV).
- Student-facing import UI.
- Automatic AI generation of questions (separate LearnPress AI flows).
- Non-CSV formats in MVP (XLSX, QTI, Moodle XML, GIFT)—unless added later.
- Guaranteed perfect import of arbitrary third-party LMS schemas without mapping.
- Auto-update existing questions by title only (unsafe; excluded as default behavior).
- Replacing LearnPress question editor UX for single-question editing.
- Mobile app import flows.
- MVP: undo, advanced history, image import, flexible mapping, multi-quiz single file, custom question types.

## Competitors Or Alternatives
- **Manual workflow:** Create each question in LearnPress Admin / course builder (current default).
- **Spreadsheet → hand entry:** Instructors keep banks in Excel/Sheets and retype into LP.
- **Other LMS import tools:** Moodle question import (GIFT/XML/Aiken), some commercial WP LMS plugins with bulk question import (exact LearnPress-specific marketplace add-ons vary by region—treat product-level competitor list as **partially Unknown** without live marketplace audit).
- **LearnPress-related CSV today:** Order export to CSV and privacy data exporters exist in core; **not** a substitute for quiz question import.
- **Custom scripts / WP-CLI / one-off migrations:** Developer-only, not instructor-friendly.

## Integrations
- **WordPress** Admin, capabilities, nonces, Media Library (Phase 2 images), sanitization APIs.
- **LearnPress core:** Question CPT, `LP_Question` / type classes, `LP_Question_CURD::create`, `LP_Quiz_CURD::add_question`, quiz–question relation tables, answer tables (`learnpress_question_answers` / answermeta), meta (`_lp_type`, mark, explanation, hint).
- **LearnPress Tools** submenu (`learn-press-tools`) as primary navigation host.
- **REST API / Admin AJAX** for chunked import progress (align with existing admin tools patterns).
- **Optional later:** Action Scheduler; third-party LP question-type add-ons via documented hooks.
- **No payment gateways required** for this feature.

## Pricing Or Revenue Model
Unknown (depends on product packaging: free core feature vs paid add-on vs LearnPress PRO bundle). Recommend decision: free in core for retention vs paid add-on for monetization—**business choice pending**.

## SEO Keywords
- import quiz questions CSV LearnPress
- LearnPress bulk import questions
- LearnPress CSV question bank
- WordPress LMS import quiz CSV
- LearnPress import true false multiple choice
- bulk create LearnPress quiz
- LearnPress question import tool
- export import LearnPress quiz

## Business Goals
- Reduce time-to-publish for large quizzes and course launches.
- Lower support burden from “how do I migrate my questions?” requests.
- Improve LearnPress competitiveness vs LMS platforms with mature import tooling.
- Increase instructor satisfaction and perceived professionalism of the LP admin toolkit.
- If shipped as add-on: create an upsell SKU; if core: strengthen free product stickiness and PRO ecosystem.

## Success Metrics
- Median time to create a 50–100 question quiz drops vs manual baseline (qualitative/user test).
- Import success rate: ≥ 95% of valid rows create correct type + answers + quiz attachment in UAT.
- Support tickets related to bulk question entry / migration decrease over 90 days post-release.
- Feature adoption: % of active instructor sites using import at least once per quarter.
- Error clarity: < 5% of import sessions abandoned due to unclear validation messages (support/feedback).
- Performance: 1,000-row valid file completes without PHP timeout on reference hosting profile.
- Zero critical security issues on upload/capability paths in release QA.

## Risks Or Constraints
- **Technical:** PHP timeouts and memory on large CSVs—must batch; must not re-import duplicates on double-submit.
- **Data model mapping:** CSV slugs must map to LP types (`true_or_false` not `true_false`; `multi_choice` not `multiple_choice`); answer `is_true` and order must match LP storage.
- **Permissions:** Instructors must only import into quizzes/questions they can edit; admins see all.
- **Content safety:** HTML in questions, shortcodes, CSV injection on export reports, MIME spoofing.
- **Unicode / Excel:** BOM, `;` delimiter locales, multiline quoted fields.
- **Scope creep:** Full mapping, undo, images, export can delay MVP—protect MVP boundary.
- **Support load:** Bad CSV templates will generate tickets unless docs and samples are excellent.
- **Legal/compliance:** Uploaded files may contain PII in question text—retain temporarily, delete temp files, align with site privacy policy.
- **Codebase constraint:** Extend existing Tools + CURD patterns; avoid parallel data stores that bypass LearnPress.

## Notes
### Code reconnaissance (LearnPress under `code/learnpress/`)
- **Plugin:** LearnPress WordPress LMS (stable tag noted in readme ~4.4.x family).
- **Question types in core** (`LP_Question::get_types`): `true_or_false`, `multi_choice`, `single_choice`, `fill_in_blanks` (filterable via `learn-press/question-types`).
- **Create path:** `LP_Question_CURD::create()` supports `quiz_id`, `type`, `title`, `content`, `status`, optional default answers; can attach via `LP_Quiz_CURD::add_question`.
- **Data:** Questions as CPT; answers in LP question answers tables; meta includes type, mark, explanation, hint.
- **Admin Tools:** `LearnPress → Tools` (`class-lp-submenu-tools.php`) currently covers database, templates, course assign tools—**no quiz CSV import UI**.
- **Existing CSV:** Order export (`ExportOrderCSVAjax`), not question import—patterns for batched CSV + download can be referenced.
- **Gap:** No first-class “Import Quiz Questions from CSV” feature found; product is net-new on top of solid question/quiz APIs.

### Type slug normalization (implementation note)
| CSV-friendly alias | LearnPress internal |
|--------------------|---------------------|
| single_choice, single, single-choice | single_choice |
| multiple_choice, multi_choice, multi | multi_choice |
| true_false, true_or_false, tf | true_or_false |

### MVP vs Phase 2 (from product input)
- **MVP:** CSV upload + template, import into one existing quiz, 3 types, fixed columns, validate + limited preview, draft status, batched import, error report.
- **Phase 2:** Mapping UI, question bank, history/undo, duplicates update, images, categories, export, hooks, multi-quiz file.

### Unknown fields for human fill
- Final packaging (core vs paid add-on) and **Pricing Or Revenue Model**.
- Exact marketplace competitor SKUs and pricing (needs live competitive audit).
- Final max limits (defaults proposed: 10 MB, 5,000 rows, 10 answers) subject to product/ops approval.
