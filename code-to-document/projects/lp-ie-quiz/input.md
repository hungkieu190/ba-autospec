Import Quiz Questions từ CSV cho LearnPress
1. Tên tính năng

Import Quiz Questions from CSV

Cho phép instructor hoặc administrator tạo hàng loạt câu hỏi trong LearnPress bằng cách tải lên một file .csv, thay vì phải tạo thủ công từng câu hỏi trong WordPress Admin.

2. Goal

Giúp người dùng nhập nhanh số lượng lớn câu hỏi vào LearnPress Quiz từ một file CSV có cấu trúc chuẩn.

Tính năng cần:

Giảm thời gian tạo câu hỏi thủ công.
Hỗ trợ nhập câu hỏi kèm đáp án, đáp án đúng, giải thích và điểm số.
Kiểm tra dữ liệu trước khi import.
Cho phép người dùng xem trước kết quả.
Thông báo rõ dòng nào hợp lệ, dòng nào có lỗi.
Không tạo dữ liệu không hoàn chỉnh hoặc sai cấu trúc.
Hỗ trợ import câu hỏi vào quiz có sẵn hoặc tạo câu hỏi vào Question Bank.
3. User Story
Administrator / Instructor

Với tư cách là administrator hoặc instructor, tôi muốn tải lên một file CSV chứa nhiều câu hỏi quiz để có thể tạo hàng loạt câu hỏi trong LearnPress mà không cần nhập từng câu hỏi thủ công.

Tôi muốn hệ thống kiểm tra file trước khi import để biết dữ liệu nào hợp lệ và dữ liệu nào cần sửa.

Tôi muốn chọn quiz đích để các câu hỏi sau khi import được tự động thêm vào quiz đó.

Tôi muốn tải file CSV mẫu để biết chính xác cấu trúc dữ liệu cần chuẩn bị.

4. Vấn đề hiện tại

Hiện tại, khi cần tạo một quiz có nhiều câu hỏi, người dùng phải:

Tạo từng câu hỏi.
Nhập nội dung câu hỏi.
Chọn loại câu hỏi.
Nhập từng đáp án.
Đánh dấu đáp án đúng.
Thiết lập điểm số.
Lưu câu hỏi.
Thêm câu hỏi vào quiz.

Quy trình này mất nhiều thời gian khi người dùng cần nhập hàng chục hoặc hàng trăm câu hỏi.

Ngoài ra, nhiều instructor đã có sẵn ngân hàng câu hỏi trong Excel, Google Sheets hoặc các hệ thống LMS khác. Họ cần một cách đơn giản để chuyển dữ liệu đó vào LearnPress.

5. Phạm vi tính năng

Tính năng gồm 5 phần chính:

Tải file CSV mẫu.
Tải lên file CSV.
Mapping cột dữ liệu.
Kiểm tra và xem trước dữ liệu.
Import câu hỏi vào LearnPress.
6. User Flow
Bước 1: Mở công cụ Import

Người dùng truy cập:

LearnPress → Tools → Import Quiz Questions

Hoặc từ trang chỉnh sửa Quiz:

Edit Quiz → Import Questions

Trang import hiển thị:

Khu vực tải file CSV.
Nút tải file CSV mẫu.
Hướng dẫn định dạng dữ liệu.
Danh sách các loại câu hỏi được hỗ trợ.
Giới hạn dung lượng và số lượng dòng.
Bước 2: Chọn nơi import

Người dùng chọn một trong hai lựa chọn:

Import vào Question Bank

Câu hỏi được tạo trong LearnPress nhưng chưa được thêm vào quiz cụ thể.

Import vào một Quiz

Người dùng chọn quiz từ dropdown.

Sau khi import thành công:

Câu hỏi được tạo.
Câu hỏi được tự động thêm vào quiz đã chọn.
Thứ tự câu hỏi trong quiz theo thứ tự dòng trong CSV.

Nếu mở công cụ import từ trang chỉnh sửa quiz, quiz hiện tại được chọn sẵn.

Bước 3: Tải lên file CSV

Người dùng có thể:

Kéo thả file vào khu vực upload.
Nhấn Choose CSV File.
Chỉ được chọn file có định dạng .csv.

Thông tin hiển thị sau khi chọn file:

Tên file.
Dung lượng file.
Tổng số dòng.
Encoding được phát hiện.
Dấu phân cách được phát hiện.

Các delimiter có thể hỗ trợ:

Dấu phẩy: ,
Dấu chấm phẩy: ;
Tab
Tự động phát hiện delimiter

Encoding ưu tiên:

UTF-8

Hệ thống cần hỗ trợ nội dung Unicode để import được tiếng Việt và các ngôn ngữ khác.

Bước 4: Mapping cột

Sau khi tải file lên, hệ thống đọc hàng đầu tiên làm tên cột.

Người dùng mapping cột trong CSV với trường dữ liệu của LearnPress.

Ví dụ:

CSV Column	LearnPress Field
question_title	Question title
question_content	Question content
question_type	Question type
answer_1	Answer 1
answer_2	Answer 2
correct_answer	Correct answer
explanation	Explanation
mark	Mark

Hệ thống tự động mapping nếu tên cột trùng với tên cột trong file mẫu.

Người dùng có thể điều chỉnh mapping trước khi tiếp tục.

Bước 5: Validate dữ liệu

Hệ thống kiểm tra toàn bộ dữ liệu trước khi tạo câu hỏi.

Kết quả được chia thành:

Valid rows.
Warning rows.
Invalid rows.

Ví dụ:

Total rows: 100
Valid: 92
Warnings: 5
Invalid: 3

Không tạo câu hỏi trong bước này.

Bước 6: Xem trước

Hiển thị bảng xem trước dữ liệu.

Row	Question	Type	Answers	Correct Answer	Status
2	WordPress là gì?	Single Choice	4	2	Valid
3	Chọn các đáp án đúng	Multiple Choice	5	1,3	Valid
4	PHP là ngôn ngữ gì?	Single Choice	0	—	Error

Người dùng có thể:

Xem chi tiết lỗi của từng dòng.
Chỉ hiển thị dòng lỗi.
Chỉ hiển thị dòng cảnh báo.
Tải xuống báo cáo lỗi.
Quay lại thay đổi mapping.
Hủy import.
Tiếp tục import các dòng hợp lệ.
Bước 7: Import

Người dùng nhấn:

Import Questions

Trong quá trình import hiển thị:

Progress bar.
Số câu hỏi đã xử lý.
Số câu hỏi thành công.
Số câu hỏi thất bại.
Trạng thái hiện tại.

Ví dụ:

Importing questions: 65 / 100
Successful: 63
Failed: 2

Không được tải lại trang hoặc tạo trùng dữ liệu khi request bị gửi lại.

Bước 8: Kết quả import

Sau khi hoàn thành, hiển thị:

Import completed

Total rows: 100
Questions created: 92
Questions skipped: 5
Questions failed: 3
Added to quiz: WordPress Fundamentals Quiz

Các hành động:

View Quiz.
View Imported Questions.
Download Import Report.
Import Another File.
Undo Import.
7. Cấu trúc file CSV
Cấu trúc đề xuất
question_id,question_title,question_content,question_type,answer_1,answer_2,answer_3,answer_4,correct_answer,explanation,mark
,WordPress là gì?,WordPress thuộc loại phần mềm nào?,single_choice,CMS,Trình duyệt,Database,Hosting,1,WordPress là một hệ quản trị nội dung.,1
,PHP là ngôn ngữ lập trình phía máy chủ?,Chọn đúng hoặc sai.,true_false,True,False,,,1,PHP thường được thực thi trên máy chủ.,1
,Chọn các công nghệ frontend,Công nghệ nào thường được sử dụng ở frontend?,multiple_choice,HTML,CSS,PHP,JavaScript,"1,2,4",HTML CSS và JavaScript được dùng ở frontend.,2
Các cột dữ liệu
Column	Bắt buộc	Mô tả
question_id	Không	ID hoặc mã định danh từ hệ thống nguồn
question_title	Có	Tiêu đề câu hỏi
question_content	Không	Nội dung chi tiết của câu hỏi
question_type	Có	Loại câu hỏi
answer_1	Tùy loại	Đáp án thứ nhất
answer_2	Tùy loại	Đáp án thứ hai
answer_3	Không	Đáp án thứ ba
answer_4	Không	Đáp án thứ tư
answer_5	Không	Đáp án thứ năm
answer_6	Không	Đáp án thứ sáu
correct_answer	Tùy loại	Vị trí hoặc giá trị đáp án đúng
explanation	Không	Giải thích sau khi trả lời
hint	Không	Gợi ý cho học viên
mark	Không	Điểm của câu hỏi
category	Không	Danh mục câu hỏi
difficulty	Không	Mức độ khó
status	Không	Trạng thái câu hỏi
quiz_id	Không	Quiz đích nếu import nhiều quiz trong một file
8. Loại câu hỏi được hỗ trợ
Giai đoạn đầu
Single Choice

Chỉ có một đáp án đúng.

question_type: single_choice
correct_answer: 2

Giá trị 2 nghĩa là answer_2 là đáp án đúng.

Multiple Choice

Có một hoặc nhiều đáp án đúng.

question_type: multiple_choice
correct_answer: "1,3,4"

Các đáp án số 1, 3 và 4 là đáp án đúng.

True / False

Câu hỏi đúng hoặc sai.

question_type: true_false
answer_1: True
answer_2: False
correct_answer: 1
Có thể mở rộng sau
Fill in the Blank.
Short Text.
Matching.
Ordering.
Essay.
Các loại câu hỏi do add-on hoặc third-party plugin đăng ký.

Hệ thống nên thiết kế theo hướng mở rộng để question type khác có thể đăng ký cấu trúc import riêng thông qua hook hoặc filter.

9. Quy tắc dữ liệu
Question Title
Không được để trống.
Hỗ trợ Unicode.
Hỗ trợ HTML cơ bản nếu được cho phép.
Không tự động loại bỏ nội dung toán học hoặc shortcode hợp lệ.
Question Type

Giá trị phải thuộc danh sách question type được hỗ trợ.

Ví dụ:

single_choice
multiple_choice
true_false

Có thể hỗ trợ alias:

single
single-choice
single_choice

Tất cả được chuyển về:

single_choice
Answers
Single Choice cần ít nhất 2 đáp án.
Multiple Choice cần ít nhất 2 đáp án.
True / False mặc định có 2 đáp án.
Không được có khoảng trống giữa các đáp án đang sử dụng.

Ví dụ không hợp lệ:

answer_1: HTML
answer_2:
answer_3: CSS
Correct Answer
Single Choice

Chỉ chấp nhận một giá trị:

1

hoặc:

answer_1
Multiple Choice

Chấp nhận nhiều giá trị:

1,3,4
True / False

Chấp nhận:

1
2
true
false

Hệ thống phải chuẩn hóa giá trị trước khi import.

Mark
Phải là số.
Không được nhỏ hơn 0.
Nếu để trống, sử dụng điểm mặc định.
Có thể hỗ trợ số thập phân nếu LearnPress cho phép.

Ví dụ:

1
2
0.5
Status

Các giá trị hỗ trợ:

publish
draft

Nếu để trống, sử dụng thiết lập mặc định trong trang import.

Khuyến nghị mặc định:

draft

Điều này giúp người dùng kiểm tra câu hỏi trước khi public.

10. Validation Rules
Lỗi cấp file

Không cho phép tiếp tục nếu:

File không phải .csv.
File rỗng.
Không đọc được file.
Encoding không hợp lệ.
Không tìm thấy header.
File vượt quá dung lượng cho phép.
File vượt quá số dòng tối đa.
Thiếu các cột bắt buộc.
Lỗi cấp dòng

Một dòng bị đánh dấu lỗi nếu:

Không có question title.
Không có question type.
Question type không được hỗ trợ.
Không đủ số lượng đáp án.
Không có đáp án đúng.
Đáp án đúng không tồn tại.
Mark không phải số.
Dữ liệu answer bị sai cấu trúc.
Cảnh báo

Một dòng có thể được import nhưng hiển thị cảnh báo nếu:

Không có explanation.
Không có question content.
Không có mark.
Question title trùng với câu hỏi hiện có.
Question ID đã tồn tại.
Nội dung có HTML không được hỗ trợ.
Nội dung có shortcode chưa xác định.
11. Xử lý câu hỏi trùng lặp

Người dùng chọn một trong các chiến lược:

Skip Duplicates

Bỏ qua câu hỏi đã tồn tại.

Create New Questions

Luôn tạo câu hỏi mới, kể cả khi nội dung trùng.

Update Existing Questions

Cập nhật câu hỏi hiện có dựa trên:

question_id.
External ID.
Question title.
Question title và question type.

Khuyến nghị giai đoạn đầu:

Create new questions
Skip duplicated external IDs

Không nên tự động cập nhật theo title vì có thể có nhiều câu hỏi cùng tiêu đề.

12. Xử lý lỗi khi import

Import cần xử lý theo từng dòng.

Nếu một dòng lỗi:

Ghi nhận lỗi.
Bỏ qua dòng đó.
Tiếp tục import các dòng còn lại.

Không rollback toàn bộ file chỉ vì một dòng lỗi.

Tuy nhiên, nếu xảy ra lỗi hệ thống nghiêm trọng:

Dừng tiến trình.
Giữ lại các bản ghi đã tạo.
Hiển thị báo cáo rõ những bản ghi đã import.
Cho phép người dùng undo toàn bộ batch import.
13. Import Batch

Mỗi lần import cần tạo một bản ghi batch.

Thông tin batch:

Batch ID.
File name.
User thực hiện.
Ngày import.
Quiz đích.
Tổng số dòng.
Số câu hỏi thành công.
Số câu hỏi thất bại.
Danh sách question ID được tạo.
Trạng thái batch.
Import settings.
Error report.

Mục đích:

Xem lịch sử import.
Tránh import trùng.
Undo import.
Kiểm tra lỗi.
Audit thao tác của người dùng.
14. Undo Import

Sau khi import, người dùng có thể hoàn tác batch.

Khi nhấn Undo Import:

Xóa các câu hỏi được tạo bởi batch đó.
Gỡ câu hỏi khỏi quiz.
Không xóa câu hỏi đã tồn tại trước batch.
Không xóa câu hỏi đã được chỉnh sửa hoặc sử dụng ở nơi khác nếu chưa xác nhận.

Trước khi hoàn tác hiển thị cảnh báo:

This action will remove 92 questions created by this import.

Questions that are currently used in other quizzes may also be affected.

Có thể thêm lựa chọn:

Remove questions from selected quiz only.
Permanently delete imported questions.
15. Lịch sử Import

Thêm một trang:

LearnPress → Tools → Import History

Bảng hiển thị:

Date	File	Destination	Imported	Failed	User	Status
14 Jul 2026	wordpress-quiz.csv	WordPress Basics	92	3	Admin	Completed

Hành động:

View details.
Download report.
View questions.
Undo import.
Delete history record.
16. Phân quyền

Chỉ người dùng có quyền phù hợp mới được import.

Đề xuất quyền:

manage_options
edit_lp_questions
publish_lp_questions
edit_lp_quizzes

Instructor chỉ được:

Import vào quiz do họ sở hữu.
Tạo câu hỏi thuộc quyền quản lý của họ.
Xem lịch sử import do họ thực hiện.

Administrator có thể:

Import vào tất cả quiz.
Xem toàn bộ lịch sử.
Undo mọi batch import.
Thiết lập giới hạn import.
17. UI chính
Import Page
Import Quiz Questions

[ Download CSV Template ]

Destination
( ) Question Bank
( ) Existing Quiz
    [ Select a quiz ]

Question status
[ Draft ▼ ]

Duplicate handling
[ Create new questions ▼ ]

CSV File
[ Drop CSV file here ]
[ Choose File ]

[ Continue ]
Mapping Page
Map CSV Columns

Question Title       [ question_title ▼ ]
Question Content     [ question_content ▼ ]
Question Type        [ question_type ▼ ]
Answer 1             [ answer_1 ▼ ]
Answer 2             [ answer_2 ▼ ]
Correct Answer       [ correct_answer ▼ ]
Explanation          [ explanation ▼ ]
Mark                 [ mark ▼ ]

[ Back ] [ Validate File ]
Preview Page
Review Import

100 rows found
92 valid
5 warnings
3 errors

[ All ] [ Valid ] [ Warnings ] [ Errors ]

Table preview

☑ Import valid rows only

[ Back ] [ Import 92 Questions ]
18. CSV Template

Trang import cần cung cấp file mẫu.

Có thể cung cấp nhiều template:

Single Choice template.
Multiple Choice template.
True / False template.
Mixed Question Types template.

File template cần:

Có header chính xác.
Có ít nhất một dòng ví dụ.
Có ghi chú hướng dẫn.
Sử dụng UTF-8.
Mở được bằng Excel và Google Sheets.

Ngoài CSV mẫu, có thể cung cấp tài liệu:

How to Prepare Your CSV File
19. Yêu cầu hiệu năng
Không xử lý toàn bộ file lớn trong một request PHP duy nhất.
Import theo batch nhỏ.
Có progress tracking.
Không bị timeout với file lớn.
Có thể tiếp tục import nếu tiến trình bị gián đoạn.
Không khóa giao diện WordPress Admin trong thời gian dài.

Đề xuất:

50–100 rows per batch

Có thể sử dụng:

AJAX requests.
REST API.
Background processing.
Action Scheduler nếu có dependency phù hợp.
20. Giới hạn đề xuất

Mặc định:

Maximum file size: 10 MB
Maximum rows: 5,000
Maximum answers per question: 10
Maximum content length per field: configurable

Administrator có thể thay đổi giới hạn qua filter hoặc setting.

21. Bảo mật
Kiểm tra nonce.
Kiểm tra capability.
Kiểm tra MIME type.
Không chỉ kiểm tra phần mở rộng file.
Sanitize dữ liệu theo từng loại trường.
Escape dữ liệu khi hiển thị.
Không thực thi formula hoặc script trong CSV.
Ngăn CSV injection khi xuất error report.
Không cho upload file vào thư mục có thể thực thi.
Xóa file tạm sau khi hoàn thành hoặc hết hạn.

Các giá trị bắt đầu bằng ký tự sau cần được xử lý cẩn thận khi export:

=
+
-
@
22. Khả năng mở rộng

Cung cấp hooks để add-on khác mở rộng import.

Ví dụ:

learn_press_csv_import_question_types
learn_press_csv_import_columns
learn_press_csv_import_validate_row
learn_press_csv_import_question_data
learn_press_csv_import_before_question
learn_press_csv_import_after_question
learn_press_csv_import_completed

Mục đích:

Đăng ký question type mới.
Thêm custom column.
Validate dữ liệu riêng.
Import metadata bổ sung.
Tích hợp với question type từ add-on.
23. Trường hợp đặc biệt
CSV có dấu xuống dòng trong nội dung

Hệ thống phải đọc đúng field được đặt trong dấu ngoặc kép.

"Question content with
multiple lines"
Nội dung có dấu phẩy

Phải hỗ trợ field được quote.

"HTML, CSS and JavaScript"
Nội dung tiếng Việt

Phải hiển thị đúng:

Đáp án nào sau đây là chính xác?

Không được lỗi font hoặc ký tự.

Câu hỏi chứa HTML

Ví dụ:

<p>Chọn đáp án <strong>đúng nhất</strong>.</p>

HTML cần được xử lý theo quyền của user và quy tắc sanitize của WordPress.

Câu hỏi chứa hình ảnh

Giai đoạn đầu có thể hỗ trợ URL hình ảnh:

question_image
https://example.com/image.jpg

Hệ thống có thể:

Giữ URL ngoài.
Hoặc tải ảnh vào Media Library.

Nếu tải vào Media Library:

Kiểm tra định dạng.
Giới hạn dung lượng.
Báo lỗi nếu URL không truy cập được.
Lưu attachment ID vào question metadata.
24. Acceptance Criteria
Upload
Người dùng có quyền phù hợp có thể tải lên file .csv.
Hệ thống từ chối file không hợp lệ.
Hệ thống đọc đúng file UTF-8.
Hệ thống nhận diện được header và các dòng dữ liệu.
Mapping
Người dùng có thể mapping cột CSV với field LearnPress.
Hệ thống tự mapping các cột có tên chuẩn.
Các trường bắt buộc phải được mapping trước khi tiếp tục.
Validation
Hệ thống kiểm tra tất cả dòng trước khi import.
Mỗi dòng lỗi hiển thị lý do cụ thể.
Người dùng có thể lọc valid, warning và error.
Người dùng có thể tải báo cáo lỗi.
Import
Chỉ các dòng hợp lệ được import.
Mỗi câu hỏi được tạo đúng question type.
Đáp án và đáp án đúng được lưu chính xác.
Mark, explanation và các metadata được lưu đúng.
Câu hỏi được thêm vào quiz đã chọn.
Thứ tự câu hỏi khớp với thứ tự trong CSV.
Một dòng lỗi không làm dừng toàn bộ import.
Result
Hiển thị tổng số dòng thành công và thất bại.
Có thể xem các câu hỏi vừa tạo.
Có thể tải báo cáo kết quả.
Import được lưu thành một batch history.
Có thể undo batch import.
25. MVP đề xuất

Để giảm thời gian phát triển, phiên bản đầu tiên chỉ cần:

Import file CSV.
Tải CSV mẫu.
Import vào một quiz có sẵn.
Hỗ trợ Single Choice.
Hỗ trợ Multiple Choice.
Hỗ trợ True / False.
Các cột cố định, chưa cần custom mapping.
Validate dữ liệu trước khi import.
Preview tối đa 20 dòng.
Import các dòng hợp lệ.
Hiển thị báo cáo lỗi.
Tạo câu hỏi ở trạng thái Draft.
Import theo batch để tránh timeout.

Chưa cần trong MVP:

Update câu hỏi hiện có.
Undo import.
Import hình ảnh.
Question category.
Import history nâng cao.
Custom question types.
Tự động mapping tùy ý.
Import nhiều quiz trong một file.
26. Phase 2
Mapping cột linh hoạt.
Import hình ảnh.
Update câu hỏi hiện có.
Duplicate detection.
Import history.
Undo import.
Question category.
Difficulty level.
Import vào Question Bank.
Hỗ trợ custom question types.
Export quiz questions ra CSV.
Import nhiều quiz trong một file.
Lưu mapping template để tái sử dụng.
27. Mô tả ngắn cho task

Thêm công cụ Import Quiz Questions from CSV vào LearnPress, cho phép administrator và instructor tải lên file CSV để tạo hàng loạt câu hỏi và thêm chúng vào một quiz có sẵn.

Hệ thống cần hỗ trợ Single Choice, Multiple Choice và True / False; kiểm tra cấu trúc dữ liệu trước khi import; hiển thị preview, lỗi theo từng dòng và báo cáo sau khi hoàn thành. Quá trình import phải được xử lý theo batch để tránh timeout và không được làm dừng toàn bộ tiến trình khi một dòng dữ liệu bị lỗi.