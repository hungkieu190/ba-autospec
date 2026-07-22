# Backend UI Style Brief - LearnPress Import Quizzes / Questions

## Muc dich

File nay la brief cho agent UI/UX hoac frontend khac thiet ke lai giao dien backend cua tinh nang Import Quizzes va Import Questions. Doc file nay la biet can style trang nao, component nao, state nao, va nhung rang buoc nao can giu.

Quan trong: dung file nay lam brief thiet ke moi. Khong can giu style hien tai neu thay xau. Chi can giu logic, IDs, data hooks, text domain, va flow san pham.

## Pham vi file can style

Backend plugin that:

- `projects/lp-ie-quiz/output/mvp/learnpress-import-export/inc/QuizCsvImport/views/import-quizzes-page.php`
- `projects/lp-ie-quiz/output/mvp/learnpress-import-export/inc/QuizCsvImport/views/import-questions-page.php`
- Future Phase 1.1: `projects/lp-ie-quiz/output/mvp/learnpress-import-export/inc/QuizCsvImport/views/import-history-page.php`
- `projects/lp-ie-quiz/output/mvp/learnpress-import-export/inc/QuizCsvImport/views/settings-page.php`
- `projects/lp-ie-quiz/output/mvp/learnpress-import-export/assets/css/quiz-csv-import.css`
- `projects/lp-ie-quiz/output/mvp/learnpress-import-export/assets/js/quiz-csv-import.js`

Wireframe prototype:

- `projects/lp-ie-quiz/output/wireframes/index.html`
- `projects/lp-ie-quiz/output/wireframes/a01-quizzes-configure.html`
- `projects/lp-ie-quiz/output/wireframes/a02-quizzes-preview.html`
- `projects/lp-ie-quiz/output/wireframes/a03-quizzes-progress.html`
- `projects/lp-ie-quiz/output/wireframes/a04-quizzes-summary.html`
- `projects/lp-ie-quiz/output/wireframes/b01-questions-configure.html`
- `projects/lp-ie-quiz/output/wireframes/b02-questions-preview.html`
- `projects/lp-ie-quiz/output/wireframes/b03-questions-progress.html`
- `projects/lp-ie-quiz/output/wireframes/b04-questions-summary.html`
- Future Phase 1.1: `projects/lp-ie-quiz/output/wireframes/h01-import-history-list.html`
- Future Phase 1.1: `projects/lp-ie-quiz/output/wireframes/h02-import-history-detail.html`
- `projects/lp-ie-quiz/output/wireframes/s05-import-settings.html`
- `projects/lp-ie-quiz/output/wireframes/s06-empty-error-states.html`
- `projects/lp-ie-quiz/output/wireframes/assets/chrome.js`
- `projects/lp-ie-quiz/output/wireframes/assets/app.js`
- `projects/lp-ie-quiz/output/wireframes/assets/flow-data.js`

## Product context

Feature nam trong LearnPress - Backup & Migration Tool, trong wp-admin Import/Export.

Co 2 luong chinh:

1. Import Quizzes: CSV/JSON co nhieu quiz, chon course, moi row co `section_name` va `quiz_title`, tao/find section, tao quiz, tao questions.
2. Import Questions: CSV/JSON questions only, chon existing quiz hoac content bank, co insert position, create/update theo title.
3. Import History: Phase 1.1 read-only audit de biet ai import, import luc nao, vao dau, bao nhieu quiz/questions, file nao, loi nao.

Core question types can ho tro va hien thi ro:

- `single_choice`
- `multi_choice`
- `true_or_false`
- `fill_in_blanks`

## Design direction mong muon

Loai giao dien: WordPress admin backend, LMS operations tool.

Cam giac can dat:

- Chuyen nghiep, gon, ro rang, tin cay.
- Gan voi WordPress admin visual language, khong phai landing page.
- Dense nhung de scan, phu hop admin thao tac lap lai.
- It trang tri. Khong hero marketing, khong gradient/orb, khong card long nhau.
- Table va form phai la trung tam.

Nen tham khao:

- WordPress admin native spacing, buttons, notices, tabs.
- WooCommerce admin/product-data style: practical, compact, structured.
- Modern SaaS admin chi o muc vua phai: clean table, badges, panels, progress.

Khong nen:

- Lam UI qua mau me, qua "dashboard SaaS".
- Dung background gradient lon, orb, bokeh, glassmorphism.
- Dung emoji icon.
- Dung card qua nhieu lop.
- Dung text qua to trong panel nho.
- Lam trang configure thanh landing page.

## Global layout can style

### Admin page shell

Can co:

- Page title ro: `Import Quizzes`, `Import Questions`, `Quiz Import Settings`.
- Short helper text ben duoi title, toi da 1-2 dong.
- Step content full width vua du, khoang `960-1180px`.
- Khoang cach voi wp-admin tabs hop ly.
- Layout responsive tren 782px va mobile admin.

Can quyet dinh:

- Co nen dung header panel rieng hay chi dung WP h1 + description.
- Neu dung header panel, phai rat nhe, khong lam giong marketing hero.

Acceptance:

- Nhung thong tin quan trong nhat thay ngay trong first viewport.
- Khong co khoang trong thua.
- Khong lam nguoi dung tuong day la landing page.

### Step layout

Tat ca flow co cac step:

- Configure
- Preview
- Progress
- Summary

Can style de user biet dang o dau. Co the dung:

- Stepper ngang nho tren cung.
- Hoac section title + subtle state indicator.

Khong bat buoc them stepper neu lam UI roi mat. Nhung it nhat phai co hierarchy ro giua cac block.

## Screen A - Import Quizzes

File backend: `import-quizzes-page.php`

Wireframes:

- `a01-quizzes-configure.html`
- `a02-quizzes-preview.html`
- `a03-quizzes-progress.html`
- `a04-quizzes-summary.html`

### A01 Configure

Components can style:

1. Sample templates panel
   - Buttons: Download CSV sample, Download JSON sample.
   - Helper text: required fields, supported types, section_name.
   - Can hien thi nhu "Template" utility block, khong qua noi.

2. Target course panel
   - Course search input.
   - Search dropdown list.
   - Selected course display.
   - Default section name input.
   - Helper text: rows without section_name use fallback.

3. Upload file panel
   - File input.
   - File constraints: max size, max questions, csv/json.
   - Upload & Validate primary action.

UX yeu cau:

- Course search dropdown can nhin nhu real combobox/listbox, khong nhu list raw.
- Selected course phai noi bat vua du.
- Default section field khong duoc bi hieu nham la section duy nhat.
- Upload action phai la CTA chinh, dat cuoi flow.

### A02 Preview

Components can style:

1. Preview summary / KPI row
   - Course.
   - Sections.
   - Quizzes to create.
   - Valid questions.
   - Invalid rows.

2. Error log action
   - Secondary button: Download error log.

3. Preview table
   Columns:
   - Row
   - Section
   - Quiz
   - Status
   - Question
   - Type
   - Message

4. Footer actions
   - Back.
   - Import quizzes.

UX yeu cau:

- Status phai dung badge: valid, warning, invalid.
- Type nen la compact code badge.
- Invalid rows can scan nhanh bang mau, khong chi dua vao text.
- Table phai doc tot khi ten question dai.
- Section + Quiz phai de nhin vi day la logic grouping quan trong nhat.
- CTA `Import quizzes` chi noi bat khi co valid data.

### A03 Progress

Components can style:

- Current course/section/quiz text.
- Progress bar.
- Processed count.
- Counters: quizzes created, questions created, failed.

UX yeu cau:

- Progress phai tao cam giac dang chay, khong phai static card.
- Failed count phai co color danger.
- Khong dung animation nang. Ton trong reduced motion neu them animation.

### A04 Summary

Components can style:

- Success notice.
- Result counters: quizzes created, questions created, skipped, failed.
- Primary action: Edit course.
- Secondary action: Import another file.

UX yeu cau:

- Summary nen giong operational receipt.
- Neu failed > 0, phai de xem error log hoac message ro.

## Screen B - Import Questions

File backend: `import-questions-page.php`

Wireframes:

- `b01-questions-configure.html`
- `b02-questions-preview.html`
- `b03-questions-progress.html`
- `b04-questions-summary.html`

### B01 Configure

Components can style:

1. Sample templates panel
   - Download CSV sample.
   - Download JSON sample.
   - Supported core types and FIB note.

2. Destination panel
   - Radio: Existing quiz.
   - Radio: Content bank only.
   - Existing quiz search input/list.
   - Selected quiz display.

3. Insert position panel
   - Radio: Start of quiz.
   - Radio: After question # with number input.
   - Radio: End of quiz.

4. Upload file panel
   - File input.
   - Upload & Validate.

UX yeu cau:

- Destination radio cards should feel selectable.
- When Content bank is selected, quiz search and insert position should visually become disabled/hidden.
- Insert position should be compact but clear. Number input should align with label.
- Primary path should be obvious: choose destination -> choose position -> upload.

### B02 Preview

Components can style:

1. Preview summary / KPI row
   - Destination.
   - Current in quiz.
   - Create / Update.
   - Valid.
   - Warning.
   - Invalid.

2. Badges / counters
   - Warning count.
   - Invalid count.
   - Error log button.

3. Preview table
   Columns:
   - Row
   - Status
   - Title
   - Type
   - Action
   - Message

4. Footer actions
   - Back.
   - Import questions.

UX yeu cau:

- Warning means importable but needs attention, not error. Style warning differently from invalid.
- Action `Create` vs `Update` should be obvious.
- Existing title update warning should be visually discoverable.

### B03 Progress

Components can style:

- Destination text.
- Progress bar.
- Processed count.
- Counters: created, updated, failed.

UX yeu cau:

- Same language as A03 but question-focused.

### B04 Summary

Components can style:

- Success notice.
- Counters: created, updated, skipped, failed.
- Primary action: Open destination.
- Secondary action: Import another file.

UX yeu cau:

- If imported to content bank, "Open destination" should not look like edit quiz unless link exists.

## Screen C - Import History (Phase 1.1)

Backend future file: `import-history-page.php`

Wireframes future:

- `h01-import-history-list.html`
- `h02-import-history-detail.html`

### H01 History List

Components can style:

1. Filter bar
   - Date range.
   - User.
   - Mode: Import Quizzes / Import Questions.
   - Status.
   - Course/quiz search.
   - File/job search.

2. History table
   Columns:
   - Job ID.
   - Date/time.
   - User.
   - Mode.
   - Target.
   - File.
   - Status.
   - Quizzes.
   - Questions.
   - Created.
   - Updated.
   - Skipped.
   - Failed.
   - Actions.

3. Row actions
   - View details.
   - Download error log.
   - Open target.
   - Delete history record (admin only).

UX yeu cau:

- Day la audit table, can dense va de scan.
- Status phai ro: running, completed, completed_with_errors, failed.
- Failed/completed_with_errors phai noi bat nhung khong lam ca table bi do.
- Target phai link duoc toi course/quiz neu user co quyen.
- File name dai phai wrap/truncate co title/tooltip.

### H02 History Detail

Components can style:

1. Job summary
   - Job ID.
   - Status.
   - Started/finished/duration.
   - User.
   - Mode.
   - Source file.

2. Target summary
   - Course / quiz / content bank.
   - Section names.
   - Created quiz links.

3. Counts
   - Total rows.
   - Valid rows.
   - Invalid rows.
   - Quizzes created.
   - Questions created.
   - Questions updated.
   - Skipped.
   - Failed.

4. Imported items table
   Columns:
   - Row.
   - Action.
   - Status.
   - Kind.
   - Title.
   - Question type.
   - Course/section/quiz/question ID.
   - Message.

5. Error log panel
   - Download error log.
   - Copy support summary.

UX yeu cau:

- Detail page should feel like an operational receipt.
- The most important question is: "What changed on the site?"
- Imported IDs and links must be easy to find.
- Error rows must be easy for support to copy.

## Screen D - Import Settings

File backend: `settings-page.php`

Wireframe:

- `s05-import-settings.html`

Components can style:

- Settings form container.
- Numeric inputs:
  - Max file size MB.
  - Max questions per file.
  - Max answers per question.
  - Batch size.
- Save button.
- Success saved state.

UX yeu cau:

- Settings should feel like admin settings, not wizard.
- Each numeric input should include helper text and sensible width.
- Group related limits together.
- Dangerous values or very high values should be explainable via helper text, not color alone.

## Screen E - Empty / Error States

Wireframe:

- `s06-empty-error-states.html`

States can style:

- No editable course.
- No editable quiz.
- Missing `quiz_title`.
- File rejected.
- Zero valid rows.
- Permission denied.
- Unsupported question type.
- FIB shortcode invalid.
- No import history yet.
- History record not visible due to permission.

UX yeu cau:

- Each state should include:
  - Short title.
  - Plain reason.
  - What user can do next.
  - Relevant action button if any.
- Error state should be near the problem where possible.
- Do not use only red everywhere. Reserve red for blocking errors.

## Shared components

### Buttons

Types:

- Primary: Upload & Validate, Import quizzes, Import questions, Save Changes.
- Secondary: Back, Download template, Download error log, Import another file.
- Link-style action: Edit course, Open destination if used as link.

Requirements:

- Minimum height 36-40px in backend.
- Clear hover/focus states.
- Disabled state visible but not unreadable.
- Avoid oversized pill buttons.

### Cards / panels

Use cards only for:

- Step blocks.
- KPI/stat cards.
- Settings groups.
- Summary result blocks.

Avoid:

- Cards inside cards.
- Hero-style cards.
- Decorative cards that do not hold form/table content.

### Form fields

Fields:

- Search inputs.
- Text input for default section name.
- Number input for "After question #".
- File input.
- Settings numeric inputs.
- Radio groups.

Requirements:

- Labels must be visible and connected.
- Helper text should be under field.
- Error message should appear near field.
- Focus ring visible.
- Mobile layout should not overflow.

### Search dropdown / listbox

Used for:

- Course search.
- Quiz search.

States:

- Closed.
- Loading.
- Empty results.
- Results list.
- Selected item.
- Keyboard focus.

Requirements:

- Max height with scroll.
- Result item has title and small meta if available.
- Hover and selected states.
- Should feel attached to input.

### KPI/stat cards

Used in preview and summary.

Values:

- Course/destination text.
- Section list.
- Quiz count.
- Valid/warning/invalid counts.
- Created/updated/failed counts.

Requirements:

- Text labels small but readable.
- Values not too large.
- Color only for semantic states.
- Long course/section names should wrap cleanly.

### Table

Tables:

- Multi-quiz preview table.
- Question preview table.

Requirements:

- Header row sticky optional, but not required.
- Clear row density for admin use.
- Row hover subtle.
- Invalid/warning row state visible.
- Status badge.
- Type code badge.
- Message column readable.
- Horizontal scroll on small screens.
- Do not truncate important error messages unless tooltip/expand exists.

### Badges

Semantic badges:

- Valid: green.
- Warning: amber.
- Invalid/failed: red.
- Type: neutral code badge.
- Create/update action can be neutral/blue.

Requirements:

- Contrast >= 4.5:1 for badge text.
- Do not rely only on color; include text.

### Progress bar

Used in A03/B03.

Requirements:

- Clear percentage/processed count.
- Stable height.
- Accessible text alternative.
- Reduced motion if animated.

### Notices

Used for:

- Success.
- Error.
- Warning.

Requirements:

- Prefer WordPress notice pattern.
- Should not visually fight with custom cards.
- Keep message short.

## Data and copy that UI must support

Supported file fields:

Multi-quiz CSV:

- `section_name`
- `quiz_title`
- `quiz_content`
- `quiz_status`
- `question_title`
- `question_content`
- `question_type`
- `answers`
- `correct_answer`
- `explanation`
- `hint`
- `mark`
- `status`

Questions-only CSV:

- `question_title`
- `question_content`
- `question_type`
- `answers`
- `correct_answer`
- `explanation`
- `hint`
- `mark`
- `status`

Status behavior:

- Missing/empty `quiz_status` defaults to `publish`.
- Missing/empty question `status` defaults to `publish`.
- Reason: LearnPress core course/quiz queries commonly filter `post_status = publish`; imported quizzes/questions set to `draft` may be stored correctly but hidden in curriculum or quiz editor/front-end until published.
- `draft`, `pending`, and `private` remain supported only when explicitly present in the file.

Special FIB guidance:

- `fill_in_blanks` needs `[fib fill="..." id="..."]` in `question_content` or `answers`.
- `correct_answer` can be empty for `fill_in_blanks`.

## Responsive requirements

Breakpoints to check:

- 375px mobile.
- 782px WordPress admin mobile breakpoint.
- 1024px laptop.
- 1440px desktop.

Rules:

- Configure panels may stack on tablet/mobile.
- Tables can horizontally scroll.
- Buttons wrap without overlap.
- Search dropdown never extends beyond viewport.
- Text must not overflow buttons/cards.

## Accessibility requirements

Must have:

- Visible focus state on all buttons, inputs, radio groups, dropdown results.
- Labels for all inputs.
- Status is text plus color, never color only.
- Touch/click targets at least around 40-44px where possible.
- Keyboard navigation through search list should be considered if JS supports it.
- Contrast >= 4.5:1 for normal text.

## Implementation constraints

Backend plugin:

- Keep existing IDs because JS depends on them:
  - `#lp-ie-import-quizzes-app`
  - `#lp-ie-import-questions-app`
  - `#lp-ie-import-file`
  - `#lp-ie-validate`
  - `#lp-ie-course-search`
  - `#lp-ie-course-list`
  - `#lp-ie-quiz-search`
  - `#lp-ie-quiz-list`
  - `#lp-ie-preview-table`
  - `#lp-ie-start-import`
  - `#lp-ie-back-configure`
  - progress and summary IDs in the PHP views.
- Keep class hooks used by JS:
  - `.lp-ie-step`
  - `.lp-ie-card`
  - `.lp-ie-meta-grid`
  - `.lp-ie-badge`
  - `.lp-ie-dl-tpl`
- Keep WordPress button classes where useful:
  - `.button`
  - `.button-primary`
- Do not introduce heavy external frontend dependencies into plugin backend.
- Wireframes can use Tailwind CDN because they are prototype only.

## Current known issue

The current styling attempt is not good enough. Treat current CSS/wireframe visual style as disposable. Keep only the product flow and DOM hooks.

Specific issues to improve:

- Cards feel generic and not well composed.
- Preview table lacks polished hierarchy.
- Configure step needs clearer workflow order.
- Header area should feel native to WordPress admin, not like a marketing hero.
- Prototype chrome should not distract from actual feature screens.
- The UI needs a consistent system before per-screen polish.

## Suggested design deliverables

Agent/designer should produce:

1. A short design system section:
   - spacing scale.
   - color tokens.
   - typography hierarchy.
   - buttons.
   - badges.
   - cards/panels.
   - tables.
2. Updated backend CSS in `quiz-csv-import.css`.
3. Minimal PHP markup changes only where needed for better structure.
4. Updated wireframes for all A/B/S screens, not just A02.
5. Before/after screenshots if browser tooling is available.
6. Verification notes:
   - PHP lint.
   - JS check.
   - responsive screenshots.

## Definition of done for UI redesign

- Import Quizzes configure/preview/progress/summary look like one coherent admin flow.
- Import Questions configure/preview/progress/summary look consistent with Import Quizzes.
- Settings page matches the same system.
- Empty/error states are styled and actionable.
- Tables are easy to scan with 50+ rows.
- Supported question types, including `fill_in_blanks`, are visible in help/sample copy.
- No layout overlap at 375px, 782px, 1024px, 1440px.
- Keyboard focus is visible.
- UI feels native-professional inside WordPress admin.
