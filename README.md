# ba-autospec

`ba-autospec` là CLI hỗ trợ Business Analysis và Product Documentation bằng AI agent.

Tool này không tự gọi model. Nó tạo input template, gom skill package, sinh prompt chuẩn để bạn paste vào AI agent, rồi kiểm tra output bằng script nội bộ.

## Luồng chuẩn

Luồng làm việc chính:

```text
Lên kế hoạch draft -> Phản biện -> Sửa lại -> Validate bản hoàn chỉnh -> Xuất PDF
```

Chi tiết:

1. `npm run init`
   Tạo project và file `input.md`.

2. Điền `projects/<project-name>/input.md`
   Ghi rõ product idea, target users, problem, solution, features, competitors, pricing, SEO, risks, success metrics.

3. `npm run start -- <project-name>`
   Sinh `create-question-by-agent.md`.
   Paste file này vào AI agent để agent tạo `questions.md`.

4. Trả lời `projects/<project-name>/questions.md`
   Trả lời trực tiếp dưới từng câu hỏi. Nếu chưa biết, ghi `Không biết` hoặc `Unknown`.

5. `npm run plan -- <project-name>`
   Sinh `create-documents-by-agent.md`.
   Paste file này vào AI agent để agent tạo bản kế hoạch draft.

6. `npm run validate -- <project-name>`
   Kiểm tra draft có đủ file, không còn TODO, không lỗi encoding, HTML Asana đúng cấu trúc.

7. `npm run critique -- <project-name>`
   Sinh `critique-by-agent.md`.
   Paste file này vào AI agent để agent tạo `critique-report.md`.

8. `npm run revise -- <project-name>`
   Sinh `revise-by-agent.md`.
   Paste file này vào AI agent để agent sửa lại các tài liệu dựa trên `critique-report.md` và tạo `revision-report.md`.

9. `npm run validate -- <project-name>`
   Kiểm tra lại bản đã sửa.

10. `npm run pdf -- <project-name>`
    Xuất PDF cho bản hoàn chỉnh.

Nếu critique vẫn còn vấn đề lớn, lặp lại:

```text
critique -> revise -> validate
```

## Tạo project

Chạy interactive:

```bash
npm run init
```

Tạo nhanh:

```bash
npm run init -- "LearnPress Chat Room"
npm run init -- --tool product-content-generator "Woo Add-on Product Page"
```

Tool hiện có:

```text
1. Product Documentation & Discovery Generator
2. Product Content Generator
```

## Product Documentation Generator

Draft output nằm tại:

```text
projects/<project-name>/output/
```

Bắt buộc có 7 file chính:

```text
01-discovery.md
02-product-strategy.md
03-prd.md
04-ux-and-wireframe.md
05-qa-and-documentation.md
06-seo-and-marketing.md
07-build-or-not-build.md
```

File hỗ trợ:

```text
index.md
quality-report.md
asana-task.html
```

Sau vòng phản biện và sửa:

```text
critique-report.md
revision-report.md
```

`asana-task.html` là bản preview task để mở trong browser, bấm `Copy for Asana`, rồi paste vào Asana task description.

## Product Content Generator

Content output nằm tại:

```text
projects/<project-name>/content-output/
```

Bắt buộc có:

```text
01-product-analysis.md
02-seo-keyword-plan.md
03-product-page-copy.md
04-landing-page.html
05-comparison-faq.md
06-blog-content-plan.md
index.md
quality-report.md
```

Sau vòng phản biện và sửa:

```text
critique-report.md
revision-report.md
```

Tool này dùng local style reference:

```text
product-content-generator/woocommerce-style-reference.md
```

## Validate

Chạy:

```bash
npm run validate -- <project-name>
```

Script kiểm tra:

- Có đủ file bắt buộc không.
- Có file output ngoài whitelist không.
- Markdown có H1 không.
- Còn `TODO` trong file chính không.
- Có lỗi mojibake tiếng Việt không.
- `asana-task.html` có `<!doctype html>`, `charset="utf-8"`, `id="asana-content"`, `id="copy-button"`, và đủ 9 section không.

## Lên kế hoạch draft

Sau khi đã có `questions.md`, chạy:

```bash
npm run plan -- <project-name>
```

Lệnh này tương đương alias cũ:

```bash
npm run create -- <project-name>
```

Cả hai đều sinh:

```text
projects/<project-name>/create-documents-by-agent.md
```

Paste prompt này vào AI agent để tạo bản draft đầu tiên.

## Vẽ wireframe HTML (từ output + ảnh demo)

Sau khi đã có bộ tài liệu trong `output/`, chạy:

```bash
npm run wireframe -- <project-name>
```

Lệnh này:

1. Tạo/đảm bảo `projects/<project-name>/output/images-demo/` để paste ảnh tham chiếu.
2. Tạo/đảm bảo `projects/<project-name>/output/wireframes/` (+ `assets/`).
3. Sinh prompt `projects/<project-name>/create-wireframe-by-agent.md`.

Paste prompt vào AI agent. Agent sẽ:

- Đọc docs trong `output/` (ưu tiên PRD + UX)
- Đọc ảnh trong `images-demo/`
- Chọn skill UX + skill từ `all-skills/`
- Vẽ wireframe **multi-file** (không all-in-one):

```text
output/wireframes/
  index.html              ← hub, link tới từng màn
  s01-....html
  s02-....html
  ...
  assets/app.js           ← JS demo luồng (mock, không backend)
  assets/flow-data.js     ← mock data (tuỳ chọn)
  wireframe-index.md
```

- JS demo: click CTA chuyển step, progress bar giả, filter preview, searchable select, toast/notice — **không** gọi API thật.

Gợi ý: paste ảnh vào `images-demo/` trước, rồi chạy lại `npm run wireframe` để prompt liệt kê đủ file ảnh.

LearnPress / WordPress project có thể ép mode:

```bash
npm run wireframe -- <project-name> --learnpress
```

## Lên kế hoạch code MVP

Sau khi đã có bộ tài liệu sản phẩm trong `output/`, chạy:

```bash
npm run mvp:plan -- <project-name>
```

Lệnh này sinh:

```text
projects/<project-name>/mvp-plan-by-agent.md
```

Paste prompt này vào AI coding agent để tạo hoặc cập nhật:

```text
projects/<project-name>/mvp-build-plan/
```

Với sản phẩm LearnPress hoặc LearnPress add-on, chạy:

```bash
npm run mvp:plan -- <project-name> --learnpress
```

LearnPress core reference dùng chung nằm tại:

```text
references/learnpress/core/
```

AI agent phải đọc reference này trước khi lập plan, và không được sửa LearnPress core. Các project LearnPress sau này dùng chung reference này thay vì đặt source LearnPress trong từng project.

## Phản biện

Chạy:

```bash
npm run critique -- <project-name>
```

Lệnh này sinh:

```text
projects/<project-name>/critique-by-agent.md
```

AI agent sẽ tạo:

```text
projects/<project-name>/output/critique-report.md
```

hoặc với content workflow:

```text
projects/<project-name>/content-output/critique-report.md
```

Critique report phải kiểm tra:

- Logic kế hoạch có nhất quán không.
- Assumption nào yếu hoặc thiếu evidence.
- Scope MVP có quá rộng không.
- PRD có đủ requirement và acceptance criteria không.
- UX có thiếu flow, empty state, error state, permission state không.
- Technical plan có rủi ro dependency, lifecycle, data, security, performance không.
- QA plan có test được không.
- Build recommendation có khớp với discovery và risk không.

## Sửa lại sau phản biện

Chạy:

```bash
npm run revise -- <project-name>
```

Lệnh này sinh:

```text
projects/<project-name>/revise-by-agent.md
```

AI agent sẽ đọc `critique-report.md`, sửa lại output, và tạo:

```text
revision-report.md
```

Sau đó chạy lại:

```bash
npm run validate -- <project-name>
```

Nếu vẫn còn vấn đề lớn, chạy lại vòng:

```bash
npm run critique -- <project-name>
npm run revise -- <project-name>
npm run validate -- <project-name>
```

## Xuất PDF

PDF chỉ hỗ trợ `Product Documentation & Discovery Generator`.

Cài WeasyPrint:

```bash
python -m pip install weasyprint
```

Xuất PDF:

```bash
npm run pdf -- <project-name>
```

Nếu repo chỉ có một documentation project có `output/*.md`, có thể chạy:

```bash
npm run pdf
```

PDF được tạo tại:

```text
projects/<project-name>/output/pdf/
```

## Skeleton mode

Nếu chỉ muốn tạo khung TODO deterministic:

```bash
npm run start -- <project-name> --generate-skeleton
```

Lệnh này chỉ tạo skeleton, không thay thế workflow AI agent. Alias cũ `--generate-docs` vẫn chạy nhưng đã deprecated.

## Test tool

Chạy:

```bash
npm test
```

Test kiểm tra:

- `slugify`
- parser `input.md`
- recursive skill loading
- lỗi mojibake trong README và script chính

## Quy ước dữ liệu project

Không nên commit file nặng, zip, source plugin giải nén, screenshot thô hoặc vendor code vào `projects/<project>/images/` nếu không thật sự cần review cùng tool.

Nên ưu tiên link tới tài liệu/source bên ngoài, ảnh đã nén, file mẫu nhỏ, và ghi rõ nguồn trong `input.md` hoặc `questions.md`.

## Ngôn ngữ

Output chính nên viết bằng tiếng Việt. Technical terms có thể giữ tiếng Anh khi tự nhiên và chính xác hơn, ví dụ: PRD, roadmap, user flow, wireframe, acceptance criteria, SEO, LTV, CAC, MVP, API, webhook.
