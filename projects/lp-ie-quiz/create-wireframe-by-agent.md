# [create-wireframe-by-agent]

> **NGÔN NGỮ**
>
> - Prompt hướng dẫn và comment handoff trong HTML/JS có thể tiếng Việt.
> - **UI labels trong wireframe** theo ngôn ngữ product docs (thường English cho LearnPress/WordPress admin).
> - Tên file giữ English.

Bạn là AI agent chuyên UI/UX wireframe + prototype demo, đang làm việc trực tiếp trong repo này.

## Nhiệm vụ

Vẽ **đầy đủ các màn hình / step** của product `lp-ie-quiz` thành **nhiều file HTML5 + Tailwind CSS riêng lẻ** (không all-in-one), có:

1. `index.html` làm hub — list/link tới từng màn
2. Mỗi màn = **1 file HTML riêng**
3. **JS demo luồng** (không backend thật) đủ để click qua flow: validate → preview → progress → summary, filter, toast, role toggle, v.v.

Bám:

1. Tài liệu `projects/lp-ie-quiz/output/`
2. `input.md` / `questions.md`
3. Ảnh `projects/lp-ie-quiz/output/images-demo/` (nếu có)
4. Skill UX product-documentation-generator + skill chọn lọc `all-skills/`

## Files bắt buộc phải đọc

### Product context

1. `projects/lp-ie-quiz/input.md`
2. `projects/lp-ie-quiz/questions.md` (nếu có)
3. Main docs:

- `projects/lp-ie-quiz/output/01-discovery.md`
- `projects/lp-ie-quiz/output/02-product-strategy.md`
- `projects/lp-ie-quiz/output/03-prd.md`
- `projects/lp-ie-quiz/output/04-ux-and-wireframe.md`
- `projects/lp-ie-quiz/output/05-qa-and-documentation.md`
- `projects/lp-ie-quiz/output/06-seo-and-marketing.md`
- `projects/lp-ie-quiz/output/07-build-or-not-build.md`

4. Ưu tiên sâu:
   - `projects/lp-ie-quiz/output/03-prd.md`
   - `projects/lp-ie-quiz/output/04-ux-and-wireframe.md`
   - `projects/lp-ie-quiz/output/02-product-strategy.md`
   - `projects/lp-ie-quiz/output/index.md`

### Ảnh tham chiếu (images-demo)

Thư mục: `projects/lp-ie-quiz/output/images-demo/`

Danh sách ảnh hiện có:

- (Chưa có ảnh — vẫn vẽ wireframe từ docs; nếu user thêm ảnh sau, ưu tiên bám layout ảnh.)

**Quy tắc ảnh:**

- Mở/đọc từng ảnh bằng tool đọc file ảnh của agent.
- Bám layout density, hierarchy, spacing, chrome từ ảnh khi phù hợp.
- Không pixel-clone brand lạ; wireframe low-to-mid fidelity.
- Ảnh mâu thuẫn PRD/UX → ưu tiên PRD + questions; ghi note trong `wireframe-index.md`.

### UX skills (product-documentation-generator) — bắt buộc

1. `product-documentation-generator/skills/ux/html-wireframe.md`
2. `product-documentation-generator/skills/ux/wireframe-specification.md`
3. `product-documentation-generator/skills/ux/user-flow.md`
4. `product-documentation-generator/skills/ux/wp-admin-ui.md`

### all-skills — chọn lọc bắt buộc

| Skill | Path | Dùng để |
| --- | --- | --- |
| UI Designer | `all-skills/01-core-development/ui-designer.md` | Hierarchy, components, consistency |
| Design Bridge | `all-skills/01-core-development/design-bridge.md` | Handoff, states, interactions |
| Frontend Developer | `all-skills/01-core-development/frontend-developer.md` | Multi-page HTML, shared JS, Tailwind |
| UX Researcher | `all-skills/08-business-product/ux-researcher.md` | Flow steps, empty/error, roles |
| WordPress Master | `all-skills/08-business-product/wordpress-master.md` | wp-admin / LMS admin (nếu WP/LP) |
| UI/UX Tester | `all-skills/04-quality-security/ui-ux-tester.md` | Completeness checklist |
| Accessibility Tester | `all-skills/04-quality-security/accessibility-tester.md` | Labels, focus, WCAG AA |
| Visual Asset Generator | `all-skills/06-developer-experience/visual-asset-generator.md` | Placeholders không stock photo |

Không dump full skill vào HTML; chỉ áp dụng.

## LearnPress / WordPress context (bắt buộc khi product là LP / LMS add-on)

1. Đọc UI patterns và admin chrome từ:
   - `product-documentation-generator/skills/ux/wp-admin-ui.md`
   - `product-documentation-generator/skills/ux/html-wireframe.md`
   - `product-documentation-generator/skills/ux/wireframe-specification.md`
   - `product-documentation-generator/skills/ux/user-flow.md`
2. Nếu có reference code LearnPress tại `references/learnpress/core/`, tham chiếu menu Tools, quiz/question admin patterns khi cần (không copy business logic; chỉ UI placement).
3. Wireframe admin phải có **full wp-admin chrome**: admin bar, left sidebar, LearnPress menu expanded, main content area.
4. Entry points, roles, và screen list lấy từ `04-ux-and-wireframe.md` + `03-prd.md` + `questions.md` (quyết định đã chốt).

## Output bắt buộc — MULTI-FILE (CRITICAL)

**CẤM** tạo một file all-in-one kiểu `wireframes.html` chứa mọi màn trong cùng document.

Cấu trúc thư mục bắt buộc:

```text
projects/lp-ie-quiz/output/wireframes/
  index.html                 ← hub: danh sách màn + flow map + link
  s01-<slug>.html            ← 1 màn / 1 file
  s02-<slug>.html
  s03-<slug>.html
  ...
  assets/
    app.js                   ← shared demo interactions + flow navigation
    flow-data.js             ← (tuỳ chọn) mock data: rows, counts, quiz list
    chrome.js                ← (tuỳ chọn) render wp-admin chrome shared
  wireframe-index.md         ← inventory + mapping + checklist
```

### 1. `index.html` (hub)

Phải có:

- Tiêu đề product / module
- **Flow map** (steps có số thứ tự + link tới từng file)
- **Screen catalog** dạng list/cards: ID, tên màn, role, file link
- Ghi chú: "Prototype demo — no real backend"
- Link tới `wireframe-index.md` (optional text path)
- Tailwind CDN
- Script shared `assets/app.js` nếu cần highlight step hiện tại

### 2. Mỗi screen = một file `sXX-<slug>.html`

Quy tắc đặt tên:

- `s01-upload-configure.html`
- `s02-preview-validate.html`
- `s03-import-progress.html`
- …

Mỗi file:

- Standalone mở được trong browser (relative paths: `assets/app.js`, link `index.html`, prev/next screen)
- Tailwind CDN
- Label: `WIREFRAME — [Screen Name] — [Role]`
- Prev / Next / Back to index navigation
- **Không** nhúng toàn bộ các màn khác vào cùng file

### 3. Shared JS — demo luồng (bắt buộc hoàn thiện)

File tối thiểu: `assets/app.js` (+ `flow-data.js` nếu mock data lớn).

**Không** gọi API/backend thật. **Có** JS đủ để stakeholder hiểu flow:

| Interaction | Hành vi demo mong muốn |
| --- | --- |
| Primary CTA (Upload & Validate, Import, Save…) | Validate UI giả → toast/notice → `location.href` sang step tiếp theo hoặc show panel |
| Progress step | Animate progress bar + counters bằng `setInterval` mock; khi xong enable/go Summary |
| Preview filters (Valid/Warning/Error) | Filter rows trong table (show/hide) |
| Searchable quiz select | Gõ filter list mock quizzes; click chọn highlight |
| Role toggle (Admin / Instructor) | Đổi dataset mock (quiz list scoped) + badge role |
| File dropzone | Click/change input → hiện tên file giả; reject extension sai → error notice |
| Download template / error log | `preventDefault` + toast "Demo: file would download" (blob text giả được phép) |
| Insert position radios | Enable/disable "After N" input |
| Settings save | Notice "Settings saved (demo)" |
| Empty / error demos | Nút "Simulate error" / tabs state nếu hữu ích |
| sessionStorage / localStorage | Lưu step state nhẹ (selected quiz name, counts) để màn sau đọc được |

Mỗi control quan trọng: HTML comment handoff **và** handler JS có tên rõ (`onValidateClick`, `runMockImport`, …).

### 4. `wireframe-index.md`

- Bảng inventory: ID | File | Screen | Role | Step | States | JS demos
- Flow links (mermaid optional)
- Map images-demo → screen
- Gaps / assumptions
- Quality checklist

### 5. Cập nhật `04-ux-and-wireframe.md`

Chỉ bổ sung link tới `wireframes/index.html` và danh sách file nếu screen list đổi — không xóa quyết định product.

### 6. Dọn file cũ

Nếu tồn tại `wireframes.html` all-in-one cũ: **xóa** hoặc thay bằng redirect ngắn tới `index.html`, ưu tiên xóa sau khi multi-file xong.

## Luật wireframe nghiêm ngặt

1. **HTML5 + Tailwind CDN**: `<script src="https://cdn.tailwindcss.com"></script>`.
2. Mở trực tiếp browser (file:// hoặc static server) — không build bundler.
3. **Một màn hình = một file HTML**. Hub = `index.html` only.
4. Nhiều step/flow: configure → preview → progress → summary (+ settings, empty/error, role variants) — mỗi cái file riêng hoặc state rõ trên file dedicated.
5. Semantic HTML + `aria-label` / `<label>`; WCAG 2.1 AA hướng tới.
6. **Không** ASCII wireframe. **Không** nhúng ảnh images-demo vào HTML (chỉ tham chiếu khi vẽ).
7. Bám MVP scope; không vẽ Phase 2 out-of-scope.
8. WordPress/LMS: full wp-admin chrome mỗi screen file (hoặc inject qua `chrome.js` nhưng kết quả DOM phải thấy đủ chrome).
9. Relative links only giữa các file trong `wireframes/`.
10. JS demo phải chạy được offline (no remote API). Tailwind CDN được phép.

## Workflow bắt buộc

1. Đọc PRD + UX + decisions → chốt screen list + filename map.
2. Đọc images-demo.
3. Load skills UX + all-skills chọn lọc.
4. Tạo `assets/flow-data.js` (mock) + `assets/app.js` (interactions + navigation helpers).
5. Tạo từng `sXX-*.html` theo thứ tự flow.
6. Tạo `index.html` hub link đủ.
7. Viết `wireframe-index.md`.
8. Xóa/redirect all-in-one cũ.
9. Self-check: mở `index.html` → click lần lượt qua hết flow chỉ bằng UI.

## Quality checklist (trong wireframe-index.md)

- [ ] Có `index.html` hub với link tới mọi screen file
- [ ] Không còn single-file all-in-one chứa hết màn
- [ ] Mỗi screen một file `sXX-*.html`
- [ ] Shared `assets/app.js` demo được primary flow
- [ ] Progress / filter / search / notices hoạt động (mock)
- [ ] Prev/Next + Back to index trên mỗi screen
- [ ] Empty / error / success covered
- [ ] Roles covered (nếu multi-role)
- [ ] MVP scope only
- [ ] images-demo mapped or "no images"

## Project meta

- Project: `lp-ie-quiz`
- Tool: `product-documentation-generator`
- LearnPress mode: yes
- WordPress admin chrome: yes
- Output root: `projects/lp-ie-quiz/output/wireframes/`
- LearnPress reference: `references/learnpress/core/`
