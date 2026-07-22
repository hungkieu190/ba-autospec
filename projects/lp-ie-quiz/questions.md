# Câu hỏi bổ sung cho lp-ie-quiz

## Hướng dẫn trả lời

Hãy trả lời trực tiếp bên dưới từng câu hỏi. Có thể bỏ qua câu không liên quan hoặc ghi "Không biết" nếu chưa có dữ liệu. Trả lời càng cụ thể càng tốt — mỗi câu trả lời sẽ được chuyển thành quyết định, yêu cầu, hoặc assumption trong tài liệu đầu ra.

## Tóm tắt những gì đã biết

**Sản phẩm:** LearnPress Import Export Quiz — công cụ import câu hỏi quiz từ file CSV vào LearnPress, dạng LMS Add-on cho WordPress.

**Đối tượng chính:** Instructor và content author quản lý quiz lớn hoặc migrate question bank vào LearnPress. Đối tượng phụ: Admin WordPress/LearnPress, agency.

**Vấn đề cốt lõi:** Tạo quiz nhiều câu hỏi trong LearnPress rất chậm và dễ sai vì phải nhập thủ công từng câu. Instructor đã có sẵn nội dung trong Excel/Sheets nhưng LearnPress không có tính năng import CSV cho quiz questions.

**Giải pháp đề xuất:** Tool "Import Quiz Questions from CSV" trong LearnPress Admin với quy trình: tải template CSV → upload file → validate → preview → import batch → báo cáo kết quả. Câu hỏi mới mặc định ở trạng thái publish để hiển thị ngay trong LearnPress; user có thể set `status=draft` rõ ràng nếu muốn review trước.

**MVP scope rõ ràng:** 4 loại câu hỏi core LearnPress (single_choice, multi_choice, true_or_false, fill_in_blanks), fixed columns, import vào quiz đã tồn tại, batch processing, error report. Phase 2: mapping UI, question bank, history/undo, export, images, hooks.

**Thông tin kỹ thuật đã có:** Code reconnaissance LearnPress (LP_Question_CURD, LP_Quiz_CURD, answer tables, Tools submenu), type slug normalization, integration points (REST/AJAX, nonces, capabilities).

**Đã có:** Business goals, success metrics, risks/constraints, SEO keywords, competitors/alternatives (ở mức sơ bộ), out of scope.

**Chưa có/chưa rõ:** Pricing model (pending business decision), chi tiết đối thủ cạnh tranh trên marketplace, giới hạn cụ thể (file size, max rows — chỉ có đề xuất).

## Các assumption đang có

1. **A-01:** Product sẽ là add-on riêng (không merge vào LearnPress core) — chưa có quyết định chính thức.
2. **A-02:** Instructor chỉ import vào quiz mà mình có quyền edit — permission check dựa trên WordPress capability system hiện có.
3. **A-03:** CSV template dùng fixed columns, không cần column mapping UI trong MVP — giảm phức tạp ban đầu.
4. **A-04:** Batch size 50–100 rows mỗi AJAX request là đủ để tránh PHP timeout trên shared hosting phổ biến.
5. **A-05:** Publish là default status hợp lý cho câu hỏi/quiz mới import vì LearnPress chỉ hiển thị curriculum/questions đã publish trong nhiều query core; instructor có thể dùng `status=draft` khi cần review trước.
6. **A-06:** `fill_in_blanks` thuộc MVP Phase 1; file dùng shortcode LearnPress `[fib fill="..." id="..."]` trong `question_content` hoặc `answers`.
7. **A-07:** File upload giới hạn mặc định ~10 MB, ~5,000 rows, ~10 answers/question là hợp lý cho phần lớn use case.
8. **A-08:** Delimiter auto-detect (comma, semicolon, tab) đủ cover các locale phổ biến (EN dùng comma, EU dùng semicolon).
9. **A-09:** Người dùng chấp nhận preview giới hạn 20 rows chi tiết trong MVP — không cần paginated full preview.
10. **A-10:** Export quiz to CSV (round-trip) là Phase 2, mặc dù tên sản phẩm có "Export" — MVP chỉ có Import.

## Câu hỏi cần trả lời

### Product Context

**Q-01.** Tên sản phẩm cuối cùng là gì? Input gọi "LearnPress Import Export Quiz" nhưng MVP chỉ có Import. Có muốn đổi tên MVP thành "LearnPress CSV Quiz Importer" hoặc tương tự, rồi đổi sang tên có Export khi Phase 2 ra mắt?

Chốt tên này "LearnPress – Backup & Migration Tool", quyết định thêm tính năng vào addon có sẵn của LearnpRess, k tạo addon mới, không thêm tính năng vào core

**Q-02.** Product này sẽ ship dưới dạng nào: (a) free plugin trên WordPress.org, (b) paid add-on trên ThimPress marketplace, (c) bundled trong LearnPress PRO, hay (d) tính năng merge vào LearnPress core? Quyết định này ảnh hưởng trực tiếp đến product strategy, pricing, và distribution.
đã trả lời ở trên

**Q-03.** Nếu là paid add-on, ai sở hữu và maintain? Team LearnPress core hay team add-on riêng?

Đã trả lời ở trên, Team Dev của LearnPress, k có chia thành core và addons, team dev sẽ phụ trách tất cả sản phẩm

### Market Validation

**Q-04.** Có dữ liệu nào về số lượng support ticket hoặc feature request liên quan đến "import quiz questions" từ user LearnPress không? (Ví dụ: bao nhiêu ticket/tháng, forum threads, GitHub issues.)

Có nhiều yêu cầu trên chatboz, và ticket yêu cầu tính năng này, nhưng chưa có số liệu thống kê chính thức.

**Q-05.** Có biết instructor hiện tại đang dùng workaround nào cụ thể không? (Ví dụ: plugin bên thứ ba nào, script tự viết, hay hoàn toàn nhập tay?) Nếu có plugin bên thứ ba, user phản hồi ra sao?

Bỏ qua hoàn toàn các vấn đề về thu thập thông tin, khảo sát, không nhắc đến trong tài liệu

**Q-06.** Đã có instructor hoặc agency nào express interest hoặc sẵn sàng beta test tính năng này chưa?
Bỏ qua hoàn toàn các vấn đề về thu thập thông tin, khảo sát, không nhắc đến trong tài liệu

### Users & Roles

**Q-07.** "Course Manager" role được đề cập — đây có phải là role mặc định của LearnPress hay custom role do site admin tạo? Role này có capability gì khác Instructor trong ngữ cảnh quiz management?

Không, chỉ dùng role mặc định là admin và lp_instructor thôi, không tạo role mới

**Q-08.** Instructor trên LearnPress có thể tạo quiz độc lập (standalone) hay chỉ tạo quiz gắn vào course của mình? Điều này ảnh hưởng đến quiz dropdown khi import.

Có thể import quiz độc lập, tương đương với việc tạo mới

**Q-09.** Có cần phân quyền import riêng (ví dụ: capability `lp_import_quiz_questions`) hay dùng chung capability edit quiz hiện có?

ưu tiên dùng những thứ hiện có
### Scope & Features

**Q-10.** CSV template sẽ có bao nhiêu cột cụ thể? Input đề cập: title, content, type, answers, correct answer, explanation, mark, id (optional), status (optional). Confirm danh sách cột chính xác cho MVP template:
- `question_title` (bắt buộc)
- `question_content` (tùy chọn — nội dung mở rộng ngoài title?)
- `question_type` (bắt buộc)
- `answer_1`, `answer_2`, `answer_3`, `answer_4` ... đến `answer_N`? Hay dùng delimiter trong 1 cột `answers`?
- `correct_answer` (index hay text?)
- `explanation` (tùy chọn)
- `hint` (tùy chọn)
- `mark` (tùy chọn, default = 1?)
- `status` (tùy chọn, default = publish; draft allowed explicitly)

các cột như thế này ok rồi, còn answer thì nên dùng delimiter
các cột còn lại bạn tự đưa ra phương án tối ưu

**Q-11.** Answers trong CSV nên encode theo cách nào? Các option:
- (a) Nhiều cột: `answer_1`, `answer_2`, ..., `answer_10` + `correct_answer` = "1" hoặc "1,3" (index)
- (b) Một cột `answers` dùng pipe delimiter: `"Đáp án A|Đáp án B|Đáp án C"` + `correct_answer` = "1" hoặc "1,3"
- (c) Cách khác?

b nhé

**Q-12.** Với `true_or_false` questions: user có cần nhập 2 answer options (True/False) trong CSV hay tool tự generate 2 options và chỉ cần cột `correct_answer` = "true" hoặc "false"?

Tùy bạn cho phương án hợp lý

**Q-13.** Giới hạn mặc định đề xuất: 10 MB file, 5,000 rows, 10 answers/question. Có cần điều chỉnh? Có muốn giới hạn này configurable qua WordPress filter hoặc setting page?

nên qua setting page

**Q-14.** Khi import xong, câu hỏi được append vào cuối quiz theo thứ tự CSV. Có cần option để chọn vị trí insert (đầu quiz, sau câu X, cuối quiz)?

nên có, mặc định là xuống cuối

**Q-15.** Error report download: format nào? (a) CSV file với thêm cột error reason, (b) text/log file, (c) cả hai?

b

**Q-16.** Nếu user upload lại cùng file CSV (double-submit hoặc retry), hành vi mong muốn là gì? (a) Import lại tạo duplicate, (b) detect và skip duplicate by title, (c) chặn nếu cùng filename đã import gần đây, (d) không xử lý đặc biệt trong MVP?

override


### Competitors

**Q-17.** Có muốn team thực hiện competitive audit trên ThimPress marketplace, CodeCanyon, WordPress.org để tìm plugin import quiz cụ thể cho LearnPress trước khi finalize product strategy không? Hay chấp nhận assumption rằng chưa có giải pháp tốt?

Đây là giải pháp tốt nhất, chỉ nói về kỹ thuât, không nói về search thị trường

**Q-18.** Moodle, Canvas, hoặc LMS khác có tính năng import quiz from CSV không? Nếu có, instructor migrate từ Moodle sang LearnPress có phải là use case quan trọng cần support format tương thích?
không quan tâm

### Revenue & Pricing

**Q-19.** Nếu là paid add-on, mức giá dự kiến? (Ví dụ: $29/year, $49 lifetime, hay pricing tương tự các add-on LearnPress hiện có?) Có benchmark từ các add-on khác của ThimPress không?

addons hiện tại đang free, tính năng này tích hợp vào addon đó

**Q-20.** Nếu bundled vào LearnPress PRO bundle, tính năng import CSV có phải là selling point đủ mạnh để drive upgrade, hay chỉ là "nice to have" trong bundle?

free

**Q-21.** Free vs Paid ảnh hưởng đến scope: nếu free, có giới hạn số rows import (freemium model) không? Ví dụ: free import ≤ 50 rows, paid unlimited?

free

### UX / User Flow

**Q-22.** Entry point "Edit Quiz → Import Questions": button này nằm ở đâu trong quiz editor? (a) Meta box riêng ở sidebar, (b) button trong question list area, (c) tab mới trong quiz editor? Có mockup hoặc preference nào không?

không nằm trong quiz editor, chỉ nằm từ đây LearnPress → Tools → Import Quiz Questions

**Q-23.** Khi mở từ "LearnPress → Tools → Import Quiz Questions", user phải chọn quiz đích từ dropdown. Dropdown này show tất cả quiz (admin) hay chỉ quiz user có quyền edit (instructor)? Có cần search/filter trong dropdown nếu site có nhiều quiz?
tùy theo quyền, admin thì được show hết
instructor thì chỉ được show course của họ
cần có search course để tránh trường hợp nó nhiều course quá, k select hết được, tức là vừa select vừa search trong cùng một ô



**Q-24.** Preview screen: ngoài bảng 20 rows + counts, có cần hiển thị thêm thông tin gì? Ví dụ: tên quiz đích, số câu hỏi hiện có trong quiz, tổng số câu sau import?

Có chứ, cần hiển thị hết

**Q-25.** Sau import thành công, user nên được redirect đi đâu? (a) Ở lại trang import với summary, (b) redirect về edit quiz screen, (c) cho user chọn?
C

### Technical / Integrations

**Q-26.** LearnPress hiện dùng Admin AJAX hay REST API cho các tool admin? Import nên follow pattern nào để consistent? Hay dùng cả hai (AJAX cho batch, REST cho status)?
dùng cả 2 đi

**Q-27.** Temporary uploaded CSV file: lưu ở đâu và xóa khi nào? (a) `wp_upload_dir()` + xóa sau import, (b) `/tmp/` + xóa ngay, (c) `wp-content/uploads/lp-import/` + cron xóa sau 24h?
b

**Q-28.** Có cần hook/filter nào trong MVP cho developer extensibility, hay toàn bộ hooks để Phase 2? Ví dụ: filter validate row, action after import complete.
không cần hook cho developer, bỏ hết những tính năng dành cho developer, tính năng chỉ cho người dùng

**Q-29.** LearnPress có cache layer nào cần invalidate sau khi import questions vào quiz không? (Ví dụ: course/quiz cache, object cache, transient.)

không

**Q-30.** Minimum PHP version và WordPress version cần support? LearnPress core hiện yêu cầu PHP/WP version nào?

không nhắc đến, vì nó ăn theo learnpress rồi

### SEO / GTM (Go-To-Market)

**Q-31.** Kênh phân phối chính cho product này là gì? (a) WordPress.org plugin repo, (b) ThimPress website, (c) CodeCanyon, (d) kết hợp? Điều này ảnh hưởng đến SEO content plan và product page.
 ồ đã nói là tích hợp vào addon có sẵn
**Q-32.** Có landing page riêng cho product này trên ThimPress website không? Hay chỉ là một section trong trang LearnPress Add-ons?
không

**Q-33.** Content marketing: có muốn tạo tutorial "How to import quiz questions into LearnPress" dạng blog post hoặc video hướng dẫn khi launch không?
không tạo tài liệu marketing

**Q-34.** Có kế hoạch tạo YouTube video demo hoặc GIF animation cho product page không?
không

### QA / Acceptance Criteria

**Q-35.** Reference hosting profile cho performance test: shared hosting (ví dụ: 256 MB memory, 30s timeout) hay VPS? Cần define rõ để set acceptance criteria.
shared hosting cơ bản

**Q-36.** Browser support cho admin UI: cần support IE11 không, hay chỉ modern browsers (Chrome, Firefox, Safari, Edge latest)?
tất cả

**Q-37.** Có automated test framework nào đang dùng trong LearnPress core (PHPUnit, Codeception, etc.) mà add-on cần follow không?
không

**Q-38.** Accessibility: admin import UI cần đạt WCAG level nào? AA hay chỉ cần usable với screen reader cơ bản?
WCAG 2.1 AA

### Documentation

**Q-39.** Documentation sẽ host ở đâu? (a) ThimPress docs site, (b) WordPress.org plugin page, (c) in-plugin help tab, (d) kết hợp?
tích hợp vào document có sẵn của addon

**Q-40.** Có cần documentation bằng tiếng Việt ngoài tiếng Anh không? Target audience có instructor Việt Nam không?
không, eng only

**Q-41.** Có cần developer documentation (hooks reference, CSV format spec) trong MVP hay để Phase 2 khi có extensibility hooks?
không phục vụ developer

## Câu hỏi ưu tiên cao

Những câu hỏi sau cần trả lời trước vì ảnh hưởng trực tiếp đến product strategy, scope, và kiến trúc kỹ thuật:

1. **Q-02** — Free, paid, hay core? (Quyết định ảnh hưởng mọi tài liệu đầu ra)
2. **Q-10** — Danh sách cột CSV chính xác cho MVP template
3. **Q-11** — Cách encode answers trong CSV (nhiều cột vs pipe delimiter)
4. **Q-12** — True/False questions: auto-generate answers hay user nhập?
5. **Q-01** — Tên sản phẩm cuối cùng
6. **Q-22** — Entry point UI trong quiz editor
7. **Q-16** — Hành vi khi double-submit / duplicate
8. **Q-27** — Temporary file handling strategy
9. **Q-04** — Dữ liệu support ticket / feature request (market validation evidence)
10. **Q-30** — Minimum PHP/WP version requirements

## Bước tiếp theo

Sau khi trả lời xong các câu hỏi trên (ưu tiên mục "Câu hỏi ưu tiên cao" trước), chạy lệnh:

```bash
npm run create -- lp-ie-quiz
```

Lệnh này sẽ tạo prompt để agent sinh bộ tài liệu đầy đủ (01-discovery.md → 07-build-or-not-build.md) dựa trên input và câu trả lời của bạn.
