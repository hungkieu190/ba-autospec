# Wireframe index — two screens (Import Quizzes + Import Questions)

## Live product alignment

| Item | Value |
| --- | --- |
| Page | `admin.php?page=learnpress-import-export` |
| Screen A | `tab=import_quizzes` — multi-quiz with `section_name` → **course** |
| Screen B | `tab=import_questions` — questions → quiz / bank |
| Settings | `tab=quiz_csv_settings` |
| Not used | Tools; single combined destination radio |

## Inventory

| ID | File | Flow | Notes |
| --- | --- | --- | --- |
| Hub | index.html | — | Entry to A + B |
| A01 | a01-quizzes-configure.html | Quizzes | Course picker + default section fallback + multi-quiz upload |
| A02 | a02-quizzes-preview.html | Quizzes | Section actions + quiz groups + question rows |
| A03 | a03-quizzes-progress.html | Quizzes | Per-quiz batch progress with section label |
| A04 | a04-quizzes-summary.html | Quizzes | Edit course |
| B01 | b01-questions-configure.html | Questions | Existing quiz / content bank |
| B02 | b02-questions-preview.html | Questions | |
| B03 | b03-questions-progress.html | Questions | |
| B04 | b04-questions-summary.html | Questions | |
| S05 | s05-import-settings.html | Shared | Limits |
| S06 | s06-empty-error-states.html | Shared | Errors for both flows |

## Chrome tabs

Export | Import | **Import Quizzes** | **Import Questions** | Quiz Import Settings

## Demo JS

`assets/app.js` — course/quiz search, multi-quiz validate → progress, questions flow, sample downloads.
