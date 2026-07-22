import fs from "node:fs";
import path from "node:path";
import {
  DOCUMENTS,
  LEARNPRESS_REFERENCE_DIR,
  PROJECTS_DIR,
  ensureDir,
  parseInputMarkdown,
  readIfExists,
  readProjectConfig,
} from "./shared.js";

const args = process.argv.slice(2);
const projectName = args.find((arg) => !arg.startsWith("--"));
const explicitLearnPress = args.includes("--learnpress");

if (!projectName) {
  console.error("Project name is required.");
  console.error("Usage: npm run wireframe -- <project-name> [--learnpress]");
  process.exit(1);
}

const projectDir = path.join(PROJECTS_DIR, projectName);
const inputFile = path.join(projectDir, "input.md");
const questionsFile = path.join(projectDir, "questions.md");
const outputDir = path.join(projectDir, "output");
const imagesDemoDir = path.join(outputDir, "images-demo");
const wireframesDir = path.join(outputDir, "wireframes");
const assetsDir = path.join(wireframesDir, "assets");
const promptFile = path.join(projectDir, "create-wireframe-by-agent.md");
const projectConfig = readProjectConfig(projectDir);

if (!fs.existsSync(inputFile)) {
  console.error(`Missing input file: ${inputFile}`);
  console.error("Run npm run init first.");
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  console.error(`Missing output directory: ${outputDir}`);
  console.error("Run npm run create / plan and let the AI agent produce output/ first.");
  process.exit(1);
}

const input = parseInputMarkdown(readIfExists(inputFile));
const projectText = [
  input["Product Type"],
  input["Integrations"],
  input["Proposed Solution"],
  input["Must-Have Features"],
  input["Notes"],
  readIfExists(questionsFile),
  readIfExists(path.join(outputDir, "03-prd.md")),
  readIfExists(path.join(outputDir, "04-ux-and-wireframe.md")),
].join("\n\n");

const isLearnPressProject =
  explicitLearnPress || /learn\s*press|learnpress|lp_|lms add-?on|wordpress plugin/i.test(projectText);
const isWordPressAdmin =
  isLearnPressProject ||
  /wordpress|wp-admin|lms add-?on|wordpress plugin/i.test(
    [input["Product Type"], input["Integrations"], projectText].join("\n"),
  );

ensureDir(outputDir);
ensureDir(imagesDemoDir);
ensureDir(wireframesDir);
ensureDir(assetsDir);

const imagesReadme = path.join(imagesDemoDir, "README.md");
if (!fs.existsSync(imagesReadme)) {
  fs.writeFileSync(
    imagesReadme,
    `# images-demo

Paste reference screenshots / mockups here for the wireframe agent.

## How to use

1. Export or capture UI references (WordPress admin, LearnPress Tools, competitor screens, Figma exports, etc.).
2. Put image files in this folder (\`.png\`, \`.jpg\`, \`.jpeg\`, \`.webp\`, \`.gif\`).
3. Optionally rename clearly, e.g. \`01-tools-menu.png\`, \`02-upload-step.png\`.
4. Run:

\`\`\`bash
npm run wireframe -- ${projectName}
\`\`\`

5. Paste \`create-wireframe-by-agent.md\` into your AI agent.

The agent will read every image in this folder and align HTML wireframes to layout patterns, density, and chrome from the references.
`,
    "utf8",
  );
}

const imageFiles = listImageFiles(imagesDemoDir);
fs.writeFileSync(
  promptFile,
  renderWireframePrompt({
    isLearnPressProject,
    isWordPressAdmin,
    imageFiles,
  }),
  "utf8",
);

console.log(`Generated wireframe agent prompt in ${path.relative(process.cwd(), promptFile)}`);
console.log(`Created/ensured images folder: ${path.relative(process.cwd(), imagesDemoDir)}`);
console.log(`Wireframe output dir: ${path.relative(process.cwd(), wireframesDir)}`);
if (imageFiles.length === 0) {
  console.log("No reference images yet. Paste screenshots into images-demo/ then re-run this command (optional but recommended).");
} else {
  console.log(`Found ${imageFiles.length} reference image(s) for the agent to use.`);
}
console.log("Next: paste create-wireframe-by-agent.md into your AI agent chat.");
console.log("Agent must create multi-file wireframes: index.html + sXX-*.html + assets/*.js (no single all-in-one HTML).");

function listImageFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.(png|jpe?g|webp|gif|svg)$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

function renderWireframePrompt({ isLearnPressProject, isWordPressAdmin, imageFiles }) {
  const sourceDocuments = DOCUMENTS.map(([filename]) => `- \`projects/${projectName}/output/${filename}\``).join("\n");
  const imageList =
    imageFiles.length > 0
      ? imageFiles.map((name) => `- \`projects/${projectName}/output/images-demo/${name}\``).join("\n")
      : "- (Chưa có ảnh — vẫn vẽ wireframe từ docs; nếu user thêm ảnh sau, ưu tiên bám layout ảnh.)";

  const learnPressBlock = isLearnPressProject
    ? `
## LearnPress / WordPress context (bắt buộc khi product là LP / LMS add-on)

1. Đọc UI patterns và admin chrome từ:
   - \`product-documentation-generator/skills/ux/wp-admin-ui.md\`
   - \`product-documentation-generator/skills/ux/html-wireframe.md\`
   - \`product-documentation-generator/skills/ux/wireframe-specification.md\`
   - \`product-documentation-generator/skills/ux/user-flow.md\`
2. Nếu có reference code LearnPress tại \`references/learnpress/core/\`, tham chiếu menu Tools, quiz/question admin patterns khi cần (không copy business logic; chỉ UI placement).
3. Wireframe admin phải có **full wp-admin chrome**: admin bar, left sidebar, LearnPress menu expanded, main content area.
4. Entry points, roles, và screen list lấy từ \`04-ux-and-wireframe.md\` + \`03-prd.md\` + \`questions.md\` (quyết định đã chốt).
`
    : `
## Platform UI context

1. Đọc:
   - \`product-documentation-generator/skills/ux/html-wireframe.md\`
   - \`product-documentation-generator/skills/ux/wireframe-specification.md\`
   - \`product-documentation-generator/skills/ux/user-flow.md\`
2. Nếu product type là WordPress Plugin / LMS Add-on, vẫn apply \`ux/wp-admin-ui.md\`.
3. Nếu không phải WordPress admin, thêm Design System block trên \`index.html\` và lặp token nhất quán trên từng screen file.
`;

  return `# [create-wireframe-by-agent]

> **NGÔN NGỮ**
>
> - Prompt hướng dẫn và comment handoff trong HTML/JS có thể tiếng Việt.
> - **UI labels trong wireframe** theo ngôn ngữ product docs (thường English cho LearnPress/WordPress admin).
> - Tên file giữ English.

Bạn là AI agent chuyên UI/UX wireframe + prototype demo, đang làm việc trực tiếp trong repo này.

## Nhiệm vụ

Vẽ **đầy đủ các màn hình / step** của product \`${projectName}\` thành **nhiều file HTML5 + Tailwind CSS riêng lẻ** (không all-in-one), có:

1. \`index.html\` làm hub — list/link tới từng màn
2. Mỗi màn = **1 file HTML riêng**
3. **JS demo luồng** (không backend thật) đủ để click qua flow: validate → preview → progress → summary, filter, toast, role toggle, v.v.

Bám:

1. Tài liệu \`projects/${projectName}/output/\`
2. \`input.md\` / \`questions.md\`
3. Ảnh \`projects/${projectName}/output/images-demo/\` (nếu có)
4. Skill UX product-documentation-generator + skill chọn lọc \`all-skills/\`

## Files bắt buộc phải đọc

### Product context

1. \`projects/${projectName}/input.md\`
2. \`projects/${projectName}/questions.md\` (nếu có)
3. Main docs:

${sourceDocuments}

4. Ưu tiên sâu:
   - \`projects/${projectName}/output/03-prd.md\`
   - \`projects/${projectName}/output/04-ux-and-wireframe.md\`
   - \`projects/${projectName}/output/02-product-strategy.md\`
   - \`projects/${projectName}/output/index.md\`

### Ảnh tham chiếu (images-demo)

Thư mục: \`projects/${projectName}/output/images-demo/\`

Danh sách ảnh hiện có:

${imageList}

**Quy tắc ảnh:**

- Mở/đọc từng ảnh bằng tool đọc file ảnh của agent.
- Bám layout density, hierarchy, spacing, chrome từ ảnh khi phù hợp.
- Không pixel-clone brand lạ; wireframe low-to-mid fidelity.
- Ảnh mâu thuẫn PRD/UX → ưu tiên PRD + questions; ghi note trong \`wireframe-index.md\`.

### UX skills (product-documentation-generator) — bắt buộc

1. \`product-documentation-generator/skills/ux/html-wireframe.md\`
2. \`product-documentation-generator/skills/ux/wireframe-specification.md\`
3. \`product-documentation-generator/skills/ux/user-flow.md\`
${isWordPressAdmin ? "4. `product-documentation-generator/skills/ux/wp-admin-ui.md`" : "4. `product-documentation-generator/skills/ux/wp-admin-ui.md` (chỉ khi có màn wp-admin)"}

### all-skills — chọn lọc bắt buộc

| Skill | Path | Dùng để |
| --- | --- | --- |
| UI Designer | \`all-skills/01-core-development/ui-designer.md\` | Hierarchy, components, consistency |
| Design Bridge | \`all-skills/01-core-development/design-bridge.md\` | Handoff, states, interactions |
| Frontend Developer | \`all-skills/01-core-development/frontend-developer.md\` | Multi-page HTML, shared JS, Tailwind |
| UX Researcher | \`all-skills/08-business-product/ux-researcher.md\` | Flow steps, empty/error, roles |
| WordPress Master | \`all-skills/08-business-product/wordpress-master.md\` | wp-admin / LMS admin (nếu WP/LP) |
| UI/UX Tester | \`all-skills/04-quality-security/ui-ux-tester.md\` | Completeness checklist |
| Accessibility Tester | \`all-skills/04-quality-security/accessibility-tester.md\` | Labels, focus, WCAG AA |
| Visual Asset Generator | \`all-skills/06-developer-experience/visual-asset-generator.md\` | Placeholders không stock photo |

Không dump full skill vào HTML; chỉ áp dụng.
${learnPressBlock}
## Output bắt buộc — MULTI-FILE (CRITICAL)

**CẤM** tạo một file all-in-one kiểu \`wireframes.html\` chứa mọi màn trong cùng document.

Cấu trúc thư mục bắt buộc:

\`\`\`text
projects/${projectName}/output/wireframes/
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
\`\`\`

### 1. \`index.html\` (hub)

Phải có:

- Tiêu đề product / module
- **Flow map** (steps có số thứ tự + link tới từng file)
- **Screen catalog** dạng list/cards: ID, tên màn, role, file link
- Ghi chú: "Prototype demo — no real backend"
- Link tới \`wireframe-index.md\` (optional text path)
- Tailwind CDN
- Script shared \`assets/app.js\` nếu cần highlight step hiện tại

### 2. Mỗi screen = một file \`sXX-<slug>.html\`

Quy tắc đặt tên:

- \`s01-upload-configure.html\`
- \`s02-preview-validate.html\`
- \`s03-import-progress.html\`
- …

Mỗi file:

- Standalone mở được trong browser (relative paths: \`assets/app.js\`, link \`index.html\`, prev/next screen)
- Tailwind CDN
- Label: \`WIREFRAME — [Screen Name] — [Role]\`
- Prev / Next / Back to index navigation
- **Không** nhúng toàn bộ các màn khác vào cùng file

### 3. Shared JS — demo luồng (bắt buộc hoàn thiện)

File tối thiểu: \`assets/app.js\` (+ \`flow-data.js\` nếu mock data lớn).

**Không** gọi API/backend thật. **Có** JS đủ để stakeholder hiểu flow:

| Interaction | Hành vi demo mong muốn |
| --- | --- |
| Primary CTA (Upload & Validate, Import, Save…) | Validate UI giả → toast/notice → \`location.href\` sang step tiếp theo hoặc show panel |
| Progress step | Animate progress bar + counters bằng \`setInterval\` mock; khi xong enable/go Summary |
| Preview filters (Valid/Warning/Error) | Filter rows trong table (show/hide) |
| Searchable quiz select | Gõ filter list mock quizzes; click chọn highlight |
| Role toggle (Admin / Instructor) | Đổi dataset mock (quiz list scoped) + badge role |
| File dropzone | Click/change input → hiện tên file giả; reject extension sai → error notice |
| Download template / error log | \`preventDefault\` + toast "Demo: file would download" (blob text giả được phép) |
| Insert position radios | Enable/disable "After N" input |
| Settings save | Notice "Settings saved (demo)" |
| Empty / error demos | Nút "Simulate error" / tabs state nếu hữu ích |
| sessionStorage / localStorage | Lưu step state nhẹ (selected quiz name, counts) để màn sau đọc được |

Mỗi control quan trọng: HTML comment handoff **và** handler JS có tên rõ (\`onValidateClick\`, \`runMockImport\`, …).

### 4. \`wireframe-index.md\`

- Bảng inventory: ID | File | Screen | Role | Step | States | JS demos
- Flow links (mermaid optional)
- Map images-demo → screen
- Gaps / assumptions
- Quality checklist

### 5. Cập nhật \`04-ux-and-wireframe.md\`

Chỉ bổ sung link tới \`wireframes/index.html\` và danh sách file nếu screen list đổi — không xóa quyết định product.

### 6. Dọn file cũ

Nếu tồn tại \`wireframes.html\` all-in-one cũ: **xóa** hoặc thay bằng redirect ngắn tới \`index.html\`, ưu tiên xóa sau khi multi-file xong.

## Luật wireframe nghiêm ngặt

1. **HTML5 + Tailwind CDN**: \`<script src="https://cdn.tailwindcss.com"></script>\`.
2. Mở trực tiếp browser (file:// hoặc static server) — không build bundler.
3. **Một màn hình = một file HTML**. Hub = \`index.html\` only.
4. Nhiều step/flow: configure → preview → progress → summary (+ settings, empty/error, role variants) — mỗi cái file riêng hoặc state rõ trên file dedicated.
5. Semantic HTML + \`aria-label\` / \`<label>\`; WCAG 2.1 AA hướng tới.
6. **Không** ASCII wireframe. **Không** nhúng ảnh images-demo vào HTML (chỉ tham chiếu khi vẽ).
7. Bám MVP scope; không vẽ Phase 2 out-of-scope.
8. WordPress/LMS: full wp-admin chrome mỗi screen file (hoặc inject qua \`chrome.js\` nhưng kết quả DOM phải thấy đủ chrome).
9. Relative links only giữa các file trong \`wireframes/\`.
10. JS demo phải chạy được offline (no remote API). Tailwind CDN được phép.

## Workflow bắt buộc

1. Đọc PRD + UX + decisions → chốt screen list + filename map.
2. Đọc images-demo.
3. Load skills UX + all-skills chọn lọc.
4. Tạo \`assets/flow-data.js\` (mock) + \`assets/app.js\` (interactions + navigation helpers).
5. Tạo từng \`sXX-*.html\` theo thứ tự flow.
6. Tạo \`index.html\` hub link đủ.
7. Viết \`wireframe-index.md\`.
8. Xóa/redirect all-in-one cũ.
9. Self-check: mở \`index.html\` → click lần lượt qua hết flow chỉ bằng UI.

## Quality checklist (trong wireframe-index.md)

- [ ] Có \`index.html\` hub với link tới mọi screen file
- [ ] Không còn single-file all-in-one chứa hết màn
- [ ] Mỗi screen một file \`sXX-*.html\`
- [ ] Shared \`assets/app.js\` demo được primary flow
- [ ] Progress / filter / search / notices hoạt động (mock)
- [ ] Prev/Next + Back to index trên mỗi screen
- [ ] Empty / error / success covered
- [ ] Roles covered (nếu multi-role)
- [ ] MVP scope only
- [ ] images-demo mapped or "no images"

## Project meta

- Project: \`${projectName}\`
- Tool: \`${projectConfig.tool || "product-documentation-generator"}\`
- LearnPress mode: ${isLearnPressProject ? "yes" : "no"}
- WordPress admin chrome: ${isWordPressAdmin ? "yes" : "auto-detect from product type"}
- Output root: \`projects/${projectName}/output/wireframes/\`
${isLearnPressProject && fs.existsSync(LEARNPRESS_REFERENCE_DIR) ? `- LearnPress reference: \`references/learnpress/core/\`` : ""}
`;
}
