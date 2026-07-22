# MVP — Import Quizzes + Import Questions

## Two screens (required)

| Tab | URL | Purpose |
| --- | --- | --- |
| **Import Quizzes** | `page=learnpress-import-export&tab=import_quizzes` | File có **nhiều quiz** + questions + optional `section_name` → chọn **course** → tạo/find sections + quizzes + gắn curriculum |
| **Import Questions** | `page=learnpress-import-export&tab=import_questions` | Chỉ questions → existing quiz **hoặc** content bank |
| Quiz Import Settings | `tab=quiz_csv_settings` | Limits |

## Multi-quiz file rules

- CSV: mỗi dòng = 1 question; cột **`section_name`** + **`quiz_title`** nhóm thành quiz. `section_name` rỗng thì dùng default section trong UI.
- JSON: `{ "quizzes": [ { "section_name", "title", "content", "status", "questions": [ … ] } ] }`
- Flow: chọn course → default section fallback (default “Imported quizzes”) → validate → import từng quiz group (1 request / quiz) → find/create section → `LP_Quiz_CURD` + questions + `LP_Section_CURD::add_items_section`.

Status rule: missing/empty `quiz_status` and question `status` default to `publish` so imported items appear in LearnPress immediately. Explicit `draft`, `pending`, and `private` remain supported but may be hidden by LearnPress until published.

## Question-only file rules

- Existing quiz: searchable quiz list.
- Content bank: create `lp_question` only.

## Code

```text
inc/QuizCsvImport/
  QuizCsvAdmin.php          — 2 tabs
  QuizCsvAjaxController.php — questions + multi-quiz AJAX
  QuizMultiImporter.php     — group by section_name + quiz_title
  QuizCourseService.php     — course search, section, attach
  views/import-quizzes-page.php
  views/import-questions-page.php
dummy-data/demo_import_multi_quizzes.csv
dummy-data/demo_import_multi_quizzes.json
```
