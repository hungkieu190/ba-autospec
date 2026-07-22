# 03 — PRD: Import Quizzes + Import Questions (Backup & Migration)

## Objectives

| ID | Objective | Measure |
| --- | --- | --- |
| O1 | Import **multiple quizzes** (with questions) into a course from one file | UAT multi-quiz CSV/JSON → course curriculum |
| O2 | Import **questions only** into existing quiz or content bank | ≥95% valid rows accuracy |
| O3 | Shared hosting safe | Batched jobs; no single long PHP request |
| O4 | Permission-safe | Course/quiz edit caps; no new roles |
| O5 | Clear UX | Two separate screens; templates + text error log |

---

## Two screens (MVP)

### Screen A — Import Quizzes

| Item | Spec |
| --- | --- |
| URL | `admin.php?page=learnpress-import-export&tab=import_quizzes` |
| Input | Multi-quiz CSV/JSON |
| Required UI | Target **course** (searchable); default section name fallback |
| Behavior | Group by `section_name` + `quiz_title` → for each group: create/find section → create quiz → create questions → attach to course section |
| APIs | `LP_Quiz_CURD::create`, `LP_Question_CURD::create`, `LP_Quiz_CURD::add_question`, `LP_Section_CURD` |

### Screen B — Import Questions

| Item | Spec |
| --- | --- |
| URL | `admin.php?page=learnpress-import-export&tab=import_questions` |
| Input | Questions-only CSV/JSON |
| Destination | **Existing quiz** (searchable) **or** **Content bank** (no quiz attach) |
| Behavior | Validate → batch create/update questions; override-by-title only when existing quiz |
| APIs | `LP_Question_CURD`, optional `LP_Quiz_CURD::add_question` |

### Settings

`tab=quiz_csv_settings` — max file MB, max questions, max answers, batch size (admin).

---

### Phase 1.1 - Import History

| Item | Spec |
| --- | --- |
| URL | `admin.php?page=learnpress-import-export&tab=quiz_import_history` |
| Purpose | Audit who imported what, when, into which target, and with what result |
| Behavior | List/filter jobs -> view detail -> download error log -> open created target |
| Data | Job summary, file metadata, user, target course/quiz, counts, imported item IDs, row errors |

---

## File formats

### Multi-quiz CSV (Screen A)

Columns: `section_name`, `quiz_title` (required for grouping), `quiz_content`, `quiz_status`, `question_title`, `question_content`, `question_type`, `answers`, `correct_answer`, `explanation`, `hint`, `mark`, `status`.

Same `section_name` + `quiz_title` → same quiz group. Different section or title → separate quiz groups. Empty `section_name` uses the UI default section name. Sections are created in the selected course if missing.

### Multi-quiz JSON (Screen A)

```json
{
  "version": 1,
  "quizzes": [
    {
      "section_name": "Week 1",
      "title": "Biology Midterm",
      "content": "",
      "status": "publish",
      "questions": [ { "question_title": "...", "question_type": "single_choice", "answers": [], "correct_answer": "1" } ]
    }
  ]
}
```

### Questions-only (Screen B)

CSV/JSON without multi-quiz requirement. Fields: `question_title`, `question_type`, `answers`, `correct_answer`, optional content/explanation/hint/mark/status.

Status rule: missing/empty `quiz_status` and question `status` default to `publish` so imported quizzes/questions appear in LearnPress immediately. Explicit `draft`, `pending`, and `private` remain supported, but those rows may be hidden by LearnPress course/quiz queries until published.

Core types: `single_choice`, `multi_choice`, `true_or_false`, `fill_in_blanks` (+ aliases). Choice answers use pipe (CSV) or array (JSON). For `fill_in_blanks`, place LearnPress `[fib fill="..." id="..."]` shortcodes in `question_content` or `answers`; `correct_answer` can be empty.

Limits (defaults): **10 MB**, **5000 questions**, **10 answers**, batch **50**.

---

## Functional requirements

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-A01 | Tab **Import Quizzes** on Import/Export page | Must |
| FR-A02 | Course searchable select (required); list hidden until focus | Must |
| FR-A03 | Default section name in UI (default “Imported quizzes”) for rows/files without `section_name`; create sections if missing | Must |
| FR-A04 | Parse multi-quiz file; group by `section_name` + `quiz_title` / `quizzes[].section_name` + title | Must |
| FR-A05 | Preview: course, section action (will use existing / will create), quiz count, valid/invalid; table shows section + quiz + question | Must |
| FR-A06 | Import 1 quiz group per AJAX request; progress by quizzes | Must |
| FR-A07 | Attach each new quiz to course section curriculum | Must |
| FR-A08 | Multi-quiz sample CSV + JSON download | Must |
| FR-B01 | Tab **Import Questions** separate from Import Quizzes | Must |
| FR-B02 | Destination: existing quiz **or** content bank | Must |
| FR-B03 | Existing quiz searchable; insert position End/Start/After N | Must |
| FR-B04 | Content bank: create questions only, no quiz link | Must |
| FR-B05 | Override-by-title only within selected quiz | Must |
| FR-B06 | Questions sample CSV + JSON download | Must |
| FR-C01 | Settings limits; admin only | Must |
| FR-C02 | Nonces + capabilities; temp file delete after parse | Must |
| FR-C03 | Error log text download | Must |
| FR-C04 | Publish default for new questions and new quizzes so imported curriculum is visible immediately; explicit `draft` remains supported in file data | Must |
| FR-H01 | Persist import job history after validation/import | Phase 1.1 |
| FR-H02 | History list with filters by date, user, mode, status, course/quiz | Phase 1.1 |
| FR-H03 | History detail with job summary, target, counts, imported item IDs, row errors | Phase 1.1 |
| FR-H04 | Download error log from history after leaving summary screen | Phase 1.1 |
| FR-H05 | Permission-scoped history: admin all; instructor own/editable jobs | Phase 1.1 |

---

## Permission matrix

| Capability | Admin | lp_instructor | Student |
| --- | --- | --- | --- |
| Import Quizzes tab | Yes | Yes if can edit courses | No |
| Select course | All editable | Own / editable courses | No |
| Import Questions tab | Yes | Yes if can edit quizzes | No |
| Select quiz | All editable | Scoped | No |
| Content bank import | Yes | Yes if can create questions | No |
| Settings | Yes | No | No |

---

## Acceptance criteria

| ID | Criteria |
| --- | --- |
| AC-A1 | Multi-quiz sample creates ≥2 quizzes under sections named in the file inside the selected course |
| AC-A2 | Rows with same section_name + quiz_title land in one quiz |
| AC-A3 | Missing course blocks validate |
| AC-A4 | Missing quiz_title on multi-quiz rows → clear error or invalid group |
| AC-B1 | Questions import into existing quiz with correct core types/answers, including fill-in-blanks metadata |
| AC-B2 | Content bank creates questions not linked to any quiz |
| AC-B3 | Instructor cannot import into course/quiz outside edit scope |
| AC-C1 | Tabs Import Quizzes + Import Questions both visible on Import/Export |
| AC-H1 | Admin can see who imported, date/time, file, target, quiz/question counts for each job |
| AC-H2 | Instructor cannot see import jobs outside their editable scope |
| AC-H3 | History detail links to created course/quiz/question records when available |
| AC-C2 | No entry under LearnPress → Tools |

---

## Dependencies

LearnPress: `LP_Quiz_CURD`, `LP_Question_CURD`, `LP_Section_CURD`, course/quiz CPTs, Import/Export admin page host.

---

## Out of scope (MVP)

- Export round-trip, undo/rollback, flexible column mapping UI  
- Image sideload, third-party/custom question type schema mapping, developer hooks  
- Import lessons/other curriculum items (quizzes only on Screen A)

---

## Decisions

- **Two screens**, not one destination-mode UI.  
- Multi-quiz always needs a **course**.  
- Multi-quiz may define **section_name** in CSV/JSON; UI section name is only the fallback for empty/missing section_name.
- Question-only never creates a course section.  
- Import History is planned as Phase 1.1 read-only audit before undo/rollback.
