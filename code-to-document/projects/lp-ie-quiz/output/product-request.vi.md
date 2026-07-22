# Product Documentation Generator Input

## Project Name
lp-ie-quiz

## Product Idea
**LearnPress Import Export Quiz (Import câu hỏi Quiz từ CSV)** là tính năng/add-on cho LearnPress giúp administrator và instructor tạo hàng loạt câu hỏi quiz bằng cách tải file CSV có cấu trúc chuẩn, thay vì nhập thủ công từng câu trong WordPress Admin.

Người dùng tải mẫu CSV UTF-8, upload file, kiểm tra toàn bộ dòng trước khi ghi dữ liệu, xem trước dòng hợp lệ/cảnh báo/lỗi, rồi chỉ import các dòng hợp lệ vào quiz có sẵn (MVP) hoặc Question Bank (giai đoạn sau). Import chạy theo batch nhỏ kèm progress để file lớn không bị timeout. MVP hỗ trợ các loại câu hỏi cốt lõi của LearnPress: Single Choice, Multi Choice, True/False. Phase 2 bổ sung mapping cột linh hoạt, lịch sử import, undo, export, hình ảnh, danh mục và hook mở rộng cho question type tùy chỉnh.

Sản phẩm biến ngân hàng câu hỏi từ Excel, Google Sheets hoặc export LMS khác thành câu hỏi LearnPress (đáp án, đáp án đúng, điểm, giải thích) với kiểm soát chất lượng qua validation trước import và xử lý lỗi theo từng dòng.

## Product Type
LMS Add-on

## Target Users
- **Chính:** Instructor / content author cần quiz lớn hoặc migrate ngân hàng câu hỏi sang LearnPress.
- **Phụ:** Administrator site WordPress/LearnPress (giới hạn, giám sát quiz, bulk ops).
- **Gián tiếp:** Học viên (hưởng lợi nội dung quiz đầy đủ hơn); agency triển khai LearnPress cho khách.

## User Roles
- Administrator
- Instructor
- Course Manager (theo capability LearnPress nếu có)
- Developer / tác giả add-on (hook mở rộng — Phase 2+)
- Student (không dùng UI import)

## Core Problem
Tạo quiz LearnPress với hàng chục/hàng trăm câu hỏi rất chậm và dễ sai: mỗi câu phải nhập title, type, đáp án, đánh dấu đúng, điểm, lưu, rồi gán vào quiz. Instructor thường đã có dữ liệu trên Excel/Sheets hoặc LMS khác, nhưng core LearnPress **chưa có import CSV câu hỏi quiz** (CSV hiện có chủ yếu export order / privacy — không thay được bulk question import). Thiếu bulk import làm chậm launch khóa học và tăng chi phí soạn thảo.

## Proposed Solution
Thêm công cụ **Import Quiz Questions from CSV** trong LearnPress Admin:

1. Điểm vào: **LearnPress → Tools → Import Quiz Questions**, và **Edit Quiz → Import Questions** (pre-select quiz hiện tại).
2. Tải mẫu CSV UTF-8; chỉ nhận file `.csv` (kéo-thả hoặc chọn file).
3. Chọn đích: quiz có sẵn (MVP) hoặc question bank (Phase 2).
4. Validate mọi dòng trước khi tạo; phân loại Valid / Warning / Invalid kèm lý do từng dòng.
5. Preview (MVP: chi tiết tối đa ~20 dòng; luôn hiện tổng hợp); chỉ import dòng hợp lệ theo batch (50–100 dòng) qua AJAX/REST + progress.
6. Tạo câu hỏi qua API LearnPress (`LP_Question_CURD`, `add_question` của quiz, bảng/meta đáp án: type, mark, explanation, hint, `is_true`).
7. Báo cáo kết quả; Phase 2: batch history + undo.

Mặc định câu hỏi mới ở trạng thái **draft** để review trước khi publish. Chuẩn hóa alias CSV về type nội bộ LearnPress (`single_choice`, `multi_choice`, `true_or_false`).

## Must-Have Features
- Tải mẫu CSV UTF-8 đúng header + dòng ví dụ (Single / Multi / True-False).
- Upload chỉ `.csv`; từ chối file sai loại, rỗng, encoding lỗi, thiếu header, quá dung lượng/số dòng.
- Nhận diện delimiter (`,`, `;`, tab); ưu tiên UTF-8 (an toàn tiếng Việt/Unicode).
- Đích import: **quiz LearnPress có sẵn** (dropdown; preselect khi mở từ Edit Quiz).
- Cột chuẩn cố định cho MVP (chưa bắt buộc mapping tự do): title, content, type, answers, correct answer, explanation, mark (và id/status tùy schema).
- Hỗ trợ type: **single_choice**, **multi_choice**, **true_or_false** (chuẩn hóa alias: `true_false` → `true_or_false`, `multiple_choice` → `multi_choice`).
- Validation trước import: cấp file + cấp dòng (title/type bắt buộc, đủ đáp án, correct hợp lệ, mark số ≥ 0).
- Preview kèm đếm valid/warning/error; lọc lỗi; tải báo cáo lỗi.
- Chỉ import dòng hợp lệ; một dòng lỗi không dừng cả job.
- Xử lý batch + progress (đã xử lý / thành công / thất bại); tránh timeout PHP một request dài.
- Tạo câu hỏi **draft** mặc định; lưu đáp án/đúng chính xác; gắn vào quiz theo thứ tự dòng CSV.
- Kiểm tra capability + nonce; sanitize/escape; không upload vào thư mục thực thi; instructor chỉ quiz được phép.
- Tóm tắt sau import: created/skipped/failed, quiz đích; link xem quiz/câu hỏi; tải báo cáo kết quả.

## Nice-To-Have Features
- UI mapping cột linh hoạt + auto-map khi header khớp mẫu.
- Import vào **Question Bank** (chưa gán quiz).
- Trang lịch sử import (batch ID, file, user, counts, status) và **Undo import** (xóa câu hỏi do batch / gỡ khỏi quiz có confirm).
- Chiến lược trùng: skip / luôn tạo mới / update theo `question_id` ngoài (không update chỉ theo title).
- Export câu hỏi quiz ra CSV (round-trip).
- Cột ảnh URL → giữ URL ngoài hoặc sideload Media Library.
- Category, difficulty, hint, nhiều `quiz_id` trong một file.
- Question type custom/third-party qua hook/filter.
- Resume import gián đoạn; background job (Action Scheduler).
- Lưu mapping template; nhiều file mẫu theo type.
- Admin cấu hình giới hạn (size, max rows, max answers, độ dài field) qua setting/filter.

## Out Of Scope
- Migrate full LMS (course/lesson/order) — chỉ câu hỏi quiz qua CSV.
- UI import phía học viên.
- Sinh câu hỏi bằng AI (luồng LearnPress AI riêng).
- Định dạng non-CSV trong MVP (XLSX, QTI, Moodle XML, GIFT) — trừ phase sau.
- Import “mọi schema LMS” không cần mapping.
- Tự update câu hỏi cũ chỉ theo title (không an toàn; không làm mặc định).
- Thay thế editor soạn từng câu hỏi của LearnPress.
- Import trên mobile app.
- MVP không gồm: undo, history nâng cao, import ảnh, mapping tự do, multi-quiz một file, custom question types.

## Competitors Or Alternatives
- **Quy trình thủ công:** Tạo từng câu trong LearnPress Admin / course builder (mặc định hiện tại).
- **Spreadsheet → gõ lại:** Giữ bank trên Excel/Sheets rồi nhập lại LP.
- **Công cụ LMS khác:** Moodle question import (GIFT/XML/Aiken); một số plugin WP LMS thương mại có bulk import (danh sách SKU LearnPress-specific cần audit marketplace — **một phần Unknown**).
- **CSV trong LearnPress hiện có:** Export order CSV, privacy exporters — **không** thay import câu hỏi quiz.
- **Script tùy biến / WP-CLI:** Chỉ dành cho dev, không thân thiện instructor.

## Integrations
- **WordPress:** Admin, capability, nonce, Media Library (Phase 2 ảnh), sanitize API.
- **LearnPress core:** Question CPT, `LP_Question` / class type, `LP_Question_CURD::create`, `LP_Quiz_CURD::add_question`, quan hệ quiz–question, bảng đáp án, meta (`_lp_type`, mark, explanation, hint).
- **LearnPress Tools** (`learn-press-tools`) làm host menu chính.
- **REST API / Admin AJAX** cho import chunk + progress (bám pattern tools hiện có).
- **Tùy chọn sau:** Action Scheduler; add-on question type qua hook.
- **Không cần** payment gateway cho tính năng này.

## Pricing Or Revenue Model
Unknown (phụ thuộc đóng gói: free core vs add-on trả phí vs bundle LearnPress PRO). Cần quyết định business: free để giữ chân vs paid để monetize.

## SEO Keywords
- import quiz questions CSV LearnPress
- LearnPress bulk import questions
- LearnPress CSV question bank
- WordPress LMS import quiz CSV
- LearnPress import true false multiple choice
- bulk create LearnPress quiz
- LearnPress question import tool
- export import LearnPress quiz
- import câu hỏi quiz LearnPress CSV
- nhập hàng loạt câu hỏi LearnPress

## Business Goals
- Giảm thời gian publish quiz lớn / launch khóa học.
- Giảm ticket support về migrate/nhập hàng loạt câu hỏi.
- Tăng cạnh tranh so với LMS có tool import chín muồi.
- Nâng trải nghiệm instructor và độ chuyên nghiệp bộ Tools LP.
- Nếu ship add-on: tạo SKU upsell; nếu core: tăng stickiness free product và hệ sinh thái PRO.

## Success Metrics
- Thời gian tạo quiz 50–100 câu giảm rõ so với baseline thủ công (user test).
- UAT: ≥ 95% dòng valid tạo đúng type + đáp án + gán quiz.
- Ticket liên quan bulk entry/migration giảm trong 90 ngày sau release.
- Adoption: % site instructor active dùng import ≥ 1 lần/quý.
- Rõ ràng lỗi: < 5% session bỏ dở vì message validation khó hiểu.
- Hiệu năng: file 1.000 dòng valid hoàn tất không timeout trên hosting tham chiếu.
- Không có lỗ hổng bảo mật nghiêm trọng trên upload/capability khi QA release.

## Risks Or Constraints
- **Kỹ thuật:** Timeout/memory CSV lớn — bắt buộc batch; chống double-submit trùng dữ liệu.
- **Map data model:** Slug CSV phải khớp type LP (`true_or_false`, `multi_choice`); `is_true` + order đáp án đúng schema LP.
- **Quyền:** Instructor chỉ import quiz/câu hỏi được phép; admin full.
- **An toàn nội dung:** HTML, shortcode, CSV injection khi export report, MIME giả mạo.
- **Unicode/Excel:** BOM, delimiter `;`, field multiline có quote.
- **Scope creep:** Mapping/undo/ảnh/export làm trễ MVP — giữ biên MVP.
- **Support:** Template/docs kém sẽ tăng ticket.
- **Tuân thủ:** File upload có thể chứa PII trong nội dung câu hỏi — xóa file tạm, bám privacy policy.
- **Ràng buộc code:** Mở rộng Tools + CURD hiện có; không tạo store song song ngoài LearnPress.

## Notes
### Khảo sát code (`code/learnpress/`)
- **Plugin:** LearnPress WordPress LMS (readme stable ~4.4.x).
- **Question types core** (`LP_Question::get_types`): `true_or_false`, `multi_choice`, `single_choice`, `fill_in_blanks` (filter `learn-press/question-types`).
- **Tạo câu hỏi:** `LP_Question_CURD::create()` hỗ trợ `quiz_id`, `type`, `title`, `content`, `status`, đáp án mặc định; gắn quiz qua `LP_Quiz_CURD::add_question`.
- **Dữ liệu:** Question CPT; bảng đáp án LP; meta type/mark/explanation/hint.
- **Tools admin:** Database, templates, assign course — **chưa có UI import CSV quiz**.
- **CSV hiện có:** Export order (`ExportOrderCSVAjax`) — tham khảo pattern batch/download, không thay question import.
- **Gap:** Chưa có “Import Quiz Questions from CSV”; tính năng net-new trên API question/quiz đã có.

### Chuẩn hóa type slug
| Alias CSV thân thiện | Nội bộ LearnPress |
|----------------------|-------------------|
| single_choice, single, single-choice | single_choice |
| multiple_choice, multi_choice, multi | multi_choice |
| true_false, true_or_false, tf | true_or_false |

### MVP vs Phase 2
- **MVP:** Upload + template, import 1 quiz có sẵn, 3 type, cột cố định, validate + preview giới hạn, draft, batch, error report.
- **Phase 2:** Mapping UI, question bank, history/undo, update trùng, ảnh, category, export, hooks, multi-quiz file.

### Trường cần người điền thêm (Unknown)
- Đóng gói cuối (core vs add-on trả phí) và **Pricing Or Revenue Model**.
- Danh sách competitor marketplace + giá (cần audit live).
- Giới hạn max cuối cùng (đề xuất: 10 MB, 5.000 dòng, 10 đáp án) — chờ product/ops chốt.
