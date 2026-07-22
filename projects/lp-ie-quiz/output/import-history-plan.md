# Import History Plan - LearnPress Import Quizzes / Questions

## Muc tieu

Them Import History de admin/instructor biet chinh xac:

- Ai da import.
- Import vao ngay gio nao.
- Import loai nao: Import Quizzes hay Import Questions.
- Import vao course/section/quiz/content bank nao.
- Import bao nhieu quiz, bao nhieu question.
- Tao moi bao nhieu, update bao nhieu, skip/failed bao nhieu.
- File nao da import.
- Row nao loi, loi gi.
- Ket qua import co the kiem tra lai sau khi roi khoi man hinh summary.

Day la audit trail van hanh, khong chi la UI "recent activity".

## Vi sao can lam

Khong co history thi:

- Sau khi import xong, user roi khoi trang la mat ngu canh.
- Admin khong biet instructor nao da import noi dung nao.
- Support khong co bang chung de debug loi import.
- Re-import/de-duplicate kho kiem soat.
- Khong co co so cho future undo/rollback.

Import History nen vao **Phase 1.1** ngay sau MVP import chay on dinh. Neu team muon release chuyen nghiep hon, co the dua history read-only vao Phase 1 va de undo sang Phase 2.

## Scope de xuat

### Phase 1.1 - Read-only Import History

Must have:

- Tab/page `Import History` trong LearnPress Import/Export.
- Luu moi import job vao database.
- Luu summary counts.
- Luu target course/quiz/section.
- Luu imported item IDs.
- Luu file metadata.
- Luu error rows/messages.
- Xem chi tiet tung job.
- Filter/search theo ngay, user, mode, status, course/quiz.
- Download error log lai tu history.

Should have:

- Link nhanh toi course, quiz, questions vua tao.
- Copy job ID.
- Export history detail as JSON/text for support.

Not in Phase 1.1:

- Undo/rollback.
- Restore state truoc import.
- Re-run failed rows.
- Diff content before/after update.
- Full file storage vinh vien.

### Phase 2 - Undo / Re-run / Advanced Audit

- Undo import job.
- Re-run failed rows.
- Compare imported data vs current data.
- Store full original file if admin enables retention.
- Webhook/event export for enterprise audit.

## Navigation / UI

Them tab trong Import/Export:

- `Import Quizzes`
- `Import Questions`
- `Import History`
- `Quiz Import Settings`

### History list page

URL de xuat:

`admin.php?page=learnpress-import-export&tab=quiz_import_history`

Columns:

- Job ID
- Date/time
- User
- Mode
- Target
- File
- Status
- Quizzes
- Questions
- Created
- Updated
- Skipped
- Failed
- Actions

Actions:

- View details
- Download error log
- Open target

Filters:

- Date range
- User
- Mode: all / Import Quizzes / Import Questions
- Status: running / completed / completed_with_errors / failed / cancelled
- Target course
- Target quiz
- File name search

Bulk actions:

- Delete selected history records (admin only)
- Export selected logs (optional)

### History detail page

Sections:

1. Job summary
   - Job ID.
   - Status.
   - Started at / finished at.
   - Duration.
   - Imported by.
   - Mode.
   - Source file.

2. Target summary
   - For Import Quizzes:
     - Course ID/title/link.
     - Section names.
     - Created quiz IDs/titles/links.
   - For Import Questions:
     - Destination: existing quiz or content bank.
     - Quiz ID/title/link if applicable.
     - Insert position.

3. Counts
   - Total parsed rows.
   - Valid rows.
   - Invalid rows.
   - Quizzes created.
   - Questions created.
   - Questions updated.
   - Rows skipped.
   - Failed rows.

4. Imported items table
   - Row number.
   - Action: create/update/skip/fail.
   - Type: quiz/question.
   - Title.
   - Question type.
   - Created/updated post ID.
   - Target quiz/course/section.
   - Message/error.

5. Error log
   - Same content as current downloadable text log.
   - Available after job completes.

6. Support/debug metadata
   - Parser format: CSV/JSON.
   - Delimiter if CSV.
   - Batch size.
   - Plugin version.
   - LearnPress version if available.

## Data model de xuat

Nen dung custom tables thay vi post type vi day la audit/job data, khong phai content.

### Table 1: `wp_learnpress_import_jobs`

Purpose: one row per import job.

Columns:

- `job_id` varchar(64) primary key
- `mode` varchar(30)
  - `import_quizzes`
  - `import_questions`
- `status` varchar(30)
  - `ready`
  - `running`
  - `completed`
  - `completed_with_errors`
  - `failed`
  - `cancelled`
- `user_id` bigint unsigned
- `user_login` varchar(191)
- `file_name` varchar(255)
- `file_type` varchar(20)
  - `csv`
  - `json`
- `file_size` bigint unsigned
- `file_hash` varchar(64)
- `target_type` varchar(30)
  - `course`
  - `quiz`
  - `content_bank`
- `target_course_id` bigint unsigned null
- `target_course_title` text null
- `target_quiz_id` bigint unsigned null
- `target_quiz_title` text null
- `fallback_section_name` text null
- `insert_position` varchar(20) null
- `after_n` int null
- `total_rows` int default 0
- `valid_rows` int default 0
- `invalid_rows` int default 0
- `quiz_count` int default 0
- `quizzes_created` int default 0
- `questions_created` int default 0
- `questions_updated` int default 0
- `rows_skipped` int default 0
- `rows_failed` int default 0
- `batch_size` int default 0
- `started_at` datetime null
- `finished_at` datetime null
- `created_at` datetime
- `updated_at` datetime
- `meta` longtext null JSON

Indexes:

- `status`
- `mode`
- `user_id`
- `target_course_id`
- `target_quiz_id`
- `created_at`
- composite `mode, created_at`

### Table 2: `wp_learnpress_import_job_items`

Purpose: row/item-level audit.

Columns:

- `id` bigint unsigned auto increment primary key
- `job_id` varchar(64)
- `row_number` int
- `item_kind` varchar(30)
  - `quiz`
  - `question`
  - `section`
- `action` varchar(30)
  - `create`
  - `update`
  - `skip`
  - `fail`
- `status` varchar(30)
  - `success`
  - `warning`
  - `invalid`
  - `failed`
- `source_quiz_title` text null
- `source_section_name` text null
- `question_title` text null
- `question_type` varchar(50) null
- `course_id` bigint unsigned null
- `section_id` bigint unsigned null
- `quiz_id` bigint unsigned null
- `question_id` bigint unsigned null
- `message` text null
- `error_code` varchar(100) null
- `raw_preview` longtext null JSON
- `created_at` datetime

Indexes:

- `job_id`
- `status`
- `action`
- `quiz_id`
- `question_id`
- `row_number`

### Option: full file retention

Default: **khong luu full uploaded file** de giam privacy/security risk.

Chi luu:

- file name
- size
- hash
- row-level preview
- imported item IDs
- error messages

Neu can, them setting:

- `Store original import files for X days`
- Default off.
- Admin only.

## What to record by flow

### Import Quizzes job

Record job:

- `mode = import_quizzes`
- user ID/login/display name
- course ID/title
- fallback section name
- file name/type/size/hash
- total rows
- valid/invalid rows
- quiz groups count
- start/end/duration
- status

Record items:

- Section created/found:
  - section name
  - section ID
  - action: create or use_existing
- Quiz created:
  - quiz title
  - quiz ID
  - section ID/name
  - status
- Question created:
  - row number
  - question title
  - question type
  - question ID
  - quiz ID
  - action create
- Invalid/failed row:
  - row number
  - row title if any
  - error message

### Import Questions job

Record job:

- `mode = import_questions`
- destination:
  - existing quiz
  - content bank
- quiz ID/title if existing quiz
- insert position
- file metadata
- total/valid/invalid rows
- create/update counts

Record items:

- Question created:
  - row number
  - title
  - type
  - question ID
  - target quiz ID if any
- Question updated:
  - row number
  - title
  - type
  - existing question ID
  - target quiz ID
- Invalid/failed row:
  - row number
  - message

## Status rules

Job status:

- `ready`: validation done, import not started.
- `running`: import started.
- `completed`: finished and failed count = 0.
- `completed_with_errors`: finished but skipped/failed > 0.
- `failed`: job could not continue due to fatal/import-level error.
- `cancelled`: reserved for future.

Display labels:

- Ready
- Running
- Completed
- Completed with errors
- Failed
- Cancelled

## Permissions

Admin:

- See all import history.
- Filter by all users.
- Delete history records.
- Export logs.

Instructor:

- See own import history.
- See jobs targeting courses/quizzes they can currently edit.
- Cannot delete global history.
- Can download logs for visible jobs.

Student/subscriber:

- No access.

Server-side permission checks required for:

- list history
- view detail
- download log
- delete record
- export record

## Privacy / retention

Potential sensitive data:

- Question titles/content preview.
- File names.
- User identity.
- Error rows may contain answer text.

Defaults:

- Keep history summary for 90 days or 180 days.
- Keep item-level row details for 30-90 days.
- Do not store original files by default.

Settings to add:

- `History retention days`
- `Keep row-level details`
- `Store original files` off by default
- `Allow instructors to view own history`

Delete behavior:

- Scheduled cleanup daily.
- Admin can manually purge old history.
- Deleting history must not delete imported quizzes/questions.

## Backend integration plan

### New classes

- `QuizImportHistoryStore`
  - create tables
  - create job record
  - update job status/counts
  - add item records
  - query list
  - get detail
  - delete/purge

- `QuizImportHistoryAdmin`
  - tab registration
  - list page
  - detail page

- `QuizImportHistoryController`
  - AJAX actions for list/detail/delete/download if needed

### Hook points in current flow

During upload validate:

- Create or prepare history job record when validation succeeds.
- Store validation counts and preview metadata.
- Link transient job ID to persistent history job ID.

During `start_import_quizzes` / `start_import`:

- Mark history job `running`.
- Set `started_at`.

During each batch:

- Append successful created/updated items.
- Append failed items.
- Update rolling counts.

At completion:

- Mark `completed` or `completed_with_errors`.
- Set `finished_at`.
- Store final counts.

On fatal caught error:

- Mark `failed`.
- Store error message.

## UI requirements for Import History

### List filters

- Date range.
- User.
- Import mode.
- Status.
- Course.
- Quiz.
- Search file/job/title.

### List row actions

- View details.
- Download error log.
- Open target.
- Delete history (admin only).

### Detail actions

- Back to history.
- Open course.
- Open quiz.
- Download error log.
- Copy support summary.

Support summary should include:

- Job ID.
- User.
- Date/time.
- Mode.
- Target.
- File.
- Counts.
- Errors summary.

## QA test cases

| ID | Scenario | Expected |
| --- | --- | --- |
| H-01 | Import Quizzes success | History job created with course, sections, quizzes created, questions created |
| H-02 | Import Questions success into quiz | History shows target quiz, created/updated counts |
| H-03 | Content bank import | History target is content bank, no quiz link required |
| H-04 | Mixed valid/invalid rows | History status completed_with_errors, invalid rows visible |
| H-05 | Batch failure | History status failed with error message |
| H-06 | Instructor view | Instructor sees own/editable jobs only |
| H-07 | Admin view | Admin sees all jobs and can filter by user |
| H-08 | Delete history | Record removed, imported content remains |
| H-09 | Retention cleanup | Old history purged according to setting |
| H-10 | Error log from history | Download works after leaving summary screen |

## Documentation updates

Add docs page:

- `View import history`

FAQ updates:

- Where can I see what was imported?
- Can I see who imported a quiz?
- Does deleting history delete quizzes/questions?
- How long is import history kept?
- Does history store the original CSV/JSON file?

## Recommendation

Recommended scope:

1. Keep MVP import stable first.
2. Add **Phase 1.1 read-only Import History** before undo/export.
3. Use custom tables, not transient-only storage.
4. Do not store original files by default.
5. Store enough item-level IDs to support future undo.

Import History should become the foundation for future Undo, Re-run failed rows, and Export/round-trip audit.
