import fs from "node:fs";
import path from "node:path";
import {
  DOCUMENTS,
  getTool,
  loadMandatorySkills,
  loadSkillFilesSummary,
  loadSkillMap,
  PROJECTS_DIR,
  readProjectConfig,
} from "./shared.js";

const projectName = process.argv.slice(2).find((arg) => !arg.startsWith("--"));

if (!projectName) {
  console.error("Project name is required.");
  console.error("Usage: npm run create -- <project-name>");
  process.exit(1);
}

const projectDir = path.join(PROJECTS_DIR, projectName);
const inputFile = path.join(projectDir, "input.md");
const questionsFile = path.join(projectDir, "questions.md");
const promptFile = path.join(projectDir, "create-documents-by-agent.md");
const projectConfig = readProjectConfig(projectDir);
const tool = getTool(projectConfig.tool);

if (!fs.existsSync(inputFile)) {
  console.error(`Missing input file: ${inputFile}`);
  console.error("Run npm run init first.");
  process.exit(1);
}

if (!fs.existsSync(questionsFile)) {
  console.error(`Missing questions file: ${questionsFile}`);
  console.error("Paste create-question-by-agent.md into your AI agent first, let it create questions.md, then answer it.");
  process.exit(1);
}

fs.writeFileSync(
  promptFile,
  tool.id === "product-content-generator" ? renderCreateContentPrompt() : renderCreateDocumentsPrompt(),
);

console.log(`Generated agent prompt in ${path.relative(process.cwd(), promptFile)}`);
console.log("Next: paste that prompt into your AI agent chat. The agent should create the final output.");

function renderCreateContentPrompt() {
  const mandatorySkills = loadMandatorySkills(tool.id);
  const skillMap = loadSkillMap(tool.id);
  const skillFiles = loadSkillFilesSummary(tool.id);

  return `# [create-product-content-by-agent]

Bạn là AI agent đang làm việc trực tiếp trong repo này.

## Nhiệm vụ

Hãy đọc input, câu trả lời trong questions.md, toàn bộ skill package của Product Content Generator, và local WooCommerce style reference. Sau đó tạo bộ nội dung sản phẩm bằng tiếng Việt theo phong cách WooCommerce product page.

## Files bắt buộc phải đọc

1. \`projects/${projectName}/input.md\`
2. \`projects/${projectName}/questions.md\`
3. \`product-content-generator/skills/mandatory-skills.md\`
4. \`product-content-generator/skills/skill-map.md\`
5. \`product-content-generator/woocommerce-style-reference.md\`
6. Toàn bộ skill trong \`product-content-generator/skills/\`

## Output bắt buộc

Tạo thư mục \`projects/${projectName}/content-output/\` nếu chưa có, rồi tạo đúng các file sau:

- \`projects/${projectName}/content-output/01-product-analysis.md\`
- \`projects/${projectName}/content-output/02-seo-keyword-plan.md\`
- \`projects/${projectName}/content-output/03-product-page-copy.md\`
- \`projects/${projectName}/content-output/04-landing-page.html\`
- \`projects/${projectName}/content-output/05-comparison-faq.md\`
- \`projects/${projectName}/content-output/06-blog-content-plan.md\`
- \`projects/${projectName}/content-output/index.md\`
- \`projects/${projectName}/content-output/quality-report.md\`

## Luật output nghiêm ngặt

1. Chỉ tạo đúng các file trong danh sách trên.
2. Không tạo bộ tài liệu discovery/PRD 7 file của workflow trước.
3. Nội dung chính viết bằng tiếng Việt; technical terms có thể giữ English khi tự nhiên hơn.
4. Không tự tạo reviews, rating, active installs, latest version, compatibility, pricing, support policy, refund policy, quality checks, hoặc customer evidence khi chưa có nguồn.
5. Nếu thiếu dữ liệu, ghi rõ \`Assumption\`, \`Cần validate\`, hoặc \`Unknown\`.
6. Phong cách phải theo \`product-content-generator/woocommerce-style-reference.md\`: product promise, pricing/CTA block, trust/support modules, compatibility, feature bullets, benefit-led sections, getting started, FAQ, related/comparison content.
7. Không tự web search WooCommerce Subscriptions trừ khi người dùng yêu cầu rõ.
8. Không copy nguyên văn WooCommerce; chỉ học cấu trúc, nhịp nội dung, độ rõ ràng, và marketplace feel đã được cô đọng trong local reference.

## Landing Page HTML Requirements

File \`04-landing-page.html\` phải:

- Là standalone HTML, không cần build step.
- Có responsive CSS đẹp, sạch, giống marketplace product page.
- Có hero, CTA, pricing/license block, feature bullets, benefits, feature sections, getting started, FAQ, support/docs/compatibility modules.
- Có nút copy HTML hoặc copy page content nếu phù hợp.
- Không dùng CDN hoặc script remote.

## Required Content Detail

### \`01-product-analysis.md\`

Product summary, personas, problems, feature-benefit table, differentiators, proof gaps, positioning notes.

### \`02-seo-keyword-plan.md\`

Keyword groups, search intent, funnel stage, target page/asset, priority, schema recommendations, content opportunities.

### \`03-product-page-copy.md\`

Hero headline/subheadline, CTA copy, short/medium/long description, feature blurbs, benefit bullets, marketplace summary, trust modules.

### \`04-landing-page.html\`

Finished WooCommerce-style product landing page HTML.

### \`05-comparison-faq.md\`

Competitor/alternative comparison, buyer objections, FAQ, compatibility questions, pricing/support questions.

### \`06-blog-content-plan.md\`

At least 20 blog ideas, 3 detailed article briefs, launch announcement, internal linking plan.

## Mandatory Skills Reference

${mandatorySkills || "Không load được mandatory skills."}

## Skill Map Reference

${skillMap || "Không load được skill map."}

## Full Skill Package

${skillFiles || "Không load được skill files."}
`;
}

function renderCreateDocumentsPrompt() {
  const documentList = DOCUMENTS.map(([filename]) => `- \`projects/${projectName}/output/${filename}\``).join("\n");
  const mandatorySkills = loadMandatorySkills();
  const skillMap = loadSkillMap();
  const skillFiles = loadSkillFilesSummary();

  return `# [create-documents-by-agent]

> **NGÔN NGỮ - CRITICAL - ĐỌC TRƯỚC KHI LÀM**
>
> Toàn bộ nội dung tài liệu output phải viết bằng tiếng Việt.
> Giữ technical terms bằng tiếng Anh chỉ khi cần thiết và chính xác hơn, ví dụ: PRD, roadmap, user flow, wireframe, acceptance criteria, SEO, API, webhook, checkout, subscription, gateway, coupon, invoice.
> Tên file giữ nguyên tiếng Anh.
> Không viết heading, đoạn văn, bullet, hoặc recommendation bằng tiếng Anh nếu không cần thiết.
> Rule này override mọi behavior mặc định của skill.

Bạn là AI agent đang làm việc trực tiếp trong repo này.

## Nhiệm vụ

Hãy đọc input, câu trả lời trong questions.md, và toàn bộ skill package. Sau đó tạo bộ tài liệu cuối cùng bằng tiếng Việt tại:

\`projects/${projectName}/output/\`

## Files bắt buộc phải đọc

1. \`projects/${projectName}/input.md\`
2. \`projects/${projectName}/questions.md\`
3. \`product-documentation-generator/skills/mandatory-skills.md\`
4. \`product-documentation-generator/skills/skill-map.md\`
5. Toàn bộ skill liên quan trong \`product-documentation-generator/skills/\`
6. Spec gốc: \`product-documentation-generator/skills/core/product-documentation-generator.md\`

## Output bắt buộc

Tạo thư mục \`projects/${projectName}/output/\` nếu chưa có, rồi tạo đúng 7 file tài liệu chính sau:

${documentList}

Tạo thêm:

- \`projects/${projectName}/output/index.md\`
- \`projects/${projectName}/output/quality-report.md\`
- \`projects/${projectName}/output/asana-task.html\`

## Luật output nghiêm ngặt

1. Chỉ tạo đúng 7 file tài liệu chính trong danh sách trên.
2. Không tạo thêm file tài liệu chính ngoài danh sách, trừ \`index.md\`, \`quality-report.md\`, và \`asana-task.html\`.
3. Nếu nội dung thuộc nhiều nhóm, hãy gộp vào file phù hợp nhất theo mapping bên dưới.
4. Mỗi file phải đủ sâu để team thực thi, nhưng không viết lan man hoặc lặp ý.
5. Mỗi section phải có quyết định, bảng, checklist, criteria, hoặc next action rõ ràng.
6. Nếu thiếu dữ liệu, ghi rõ bằng ngôn ngữ production-safe như \`Assumption\`, \`Cần xác minh\`, hoặc \`Validation item\`. Không dùng câu meta/nội bộ trong tài liệu cuối.

7. Production wording guard: final output must not contain internal phrases such as "khong bia", "bia", "user tra loi", "nguoi dung tra loi", "khong ro version", "cau hoi con mo", "Không bịa", "bịa", "user trả lời", "người dùng trả lời", "không rõ version", or "Câu hỏi còn mở". Convert answered questions into decisions, requirements, assumptions, or validation items.

## Mapping 7 tài liệu

### 1. \`01-discovery.md\`

Gộp các phần:

- Market Validation
- Search Demand Analysis
- Competitor Landscape
- Competitor Gap Analysis
- Product Complexity
- Risk Assessment

Bắt buộc có: Market Opportunity Score, Build Recommendation sơ bộ, competitor/alternative table, gap opportunities, complexity score, risk table, assumptions to validate.

### 2. \`02-product-strategy.md\`

Gộp các phần:

- Product Strategy
- Product Brief
- Revenue Potential
- Roadmap

Bắt buộc có: positioning, USP, differentiators, target audience, user roles, scope, out of scope, revenue model, pricing hypothesis, roadmap v1/v1.1/v2.

### 3. \`03-prd.md\`

Gộp các phần:

- PRD
- Feature Comparison
- Permission Matrix
- Acceptance Criteria
- Success Metrics

Bắt buộc có: objectives, user stories, functional requirements, non-functional requirements, permission matrix, acceptance criteria, success metrics, dependencies.

### 4. \`04-ux-and-wireframe.md\`

Gộp các phần:

- User Flow
- Admin/Customer/Instructor/Student Flow nếu liên quan
- Wireframe Specification

Bắt buộc có: Mermaid user flow, role-based flows, screen list, ASCII wireframes hoặc link/support asset HTML wireframe, empty/error states, navigation rules.

### 5. \`05-qa-and-documentation.md\`

Gộp các phần:

- Test Plan
- Documentation Outline
- Support/FAQ planning

Bắt buộc có: functional tests, permission tests, regression tests, security tests, performance tests, edge cases, documentation pages, troubleshooting topics, FAQ topics.

### 6. \`06-seo-and-marketing.md\`

Gộp các phần:

- Product Page Outline
- SEO Content Plan
- Product Naming Ideas
- Taglines
- Product Descriptions
- Launch Assets

Bắt buộc có: SEO title, meta description, hero, product page outline, keyword groups, at least 25 content ideas, 10 names, 10 taglines, short/medium/long descriptions, launch announcement, newsletter, social post.

### 7. \`07-build-or-not-build.md\`

Gộp executive decision:

- Should We Build This Product?
- Why / Why Not
- Expected ROI
- Estimated Development Cost
- Estimated Maintenance Cost
- Revenue Potential
- Strategic Fit
- Final Recommendation

Bắt buộc chọn một: Build Now, Build Later, Validate First, Reject. Phải giải thích bằng evidence và assumptions từ các file trước.

## Asana Task HTML bắt buộc

Tạo thêm file \`projects/${projectName}/output/asana-task.html\` để người dùng mở trong trình duyệt, bấm copy, rồi paste vào Asana task.

### Mục tiêu HTML

- HTML phải là standalone file, không cần build step, không cần external dependency.
- Có style đẹp, sạch, dễ đọc, phù hợp để review trước khi copy.
- Có nút \`Copy for Asana\`.
- Khi bấm copy, copy nội dung task dạng HTML/rich text nếu browser hỗ trợ; fallback sang plain text nếu không hỗ trợ.
- Nội dung copy phải paste vào Asana giữ được heading/list cơ bản.
- Không nhúng script remote, không dùng CDN.

### Cấu trúc nội dung Asana Task

HTML phải có đúng các section sau, theo thứ tự:

1. Business Goal
2. Problem Statement
3. Target Users
4. Functional Requirements
5. UI References
6. Technical Notes
7. Acceptance Criteria
8. Subtasks
9. Release Notes

### Quy tắc nội dung Asana

- Viết bằng tiếng Việt, giữ technical terms bằng English khi cần.
- Nội dung phải ngắn gọn hơn tài liệu đầy đủ, đủ để tạo Asana task cho feature.
- Functional Requirements phải dùng checklist hoặc bullet rõ ràng.
- UI References phải trỏ tới \`04-ux-and-wireframe.md\` và mô tả màn hình/flow liên quan.
- Technical Notes phải nêu integration, dependency, data, security, performance, permission nếu có.
- Acceptance Criteria phải testable.
- Subtasks phải là checklist có owner gợi ý theo team: Product, Design, Engineering, QA, Docs, Marketing nếu liên quan.
- Release Notes phải có bản ngắn có thể copy vào changelog/release note.

### HTML Implementation Requirements

- File phải có \`<!doctype html>\`, \`<meta charset="utf-8">\`, và responsive CSS.
- Nội dung task cần nằm trong element có \`id="asana-content"\`.
- Nút copy cần có \`id="copy-button"\`.
- Sau khi copy thành công, đổi text nút thành \`Copied\` trong thời gian ngắn.
- Include fallback function copy plain text từ \`innerText\`.
- Không dùng markdown thô trong HTML; render thành headings, paragraphs, ul/ol/li, checkboxes nếu phù hợp.

## Quy tắc chất lượng

1. Đọc skill trước khi viết tài liệu.
2. Skill instructions ưu tiên hơn kiến thức chung.
3. Không viết filler content.
4. Không tự tạo competitor, search volume, pricing benchmark, customer evidence, hoặc số liệu thị trường khi chưa có nguồn.
5. Nếu thiếu dữ liệu, ghi rõ bằng ngôn ngữ chuyên nghiệp như \`Assumption\`, \`Cần xác minh\`, hoặc \`Validation item\`.
6. Mọi tài liệu phải actionable cho Product, Design, Engineering, QA, Documentation, Marketing, SEO.
7. Tối ưu cho product viability, development efficiency, support cost, SEO potential, và revenue generation.
8. Dùng bảng, checklist, Mermaid, ASCII wireframe khi phù hợp.
9. Không dùng câu chung chung như "giải pháp mạnh mẽ", "trải nghiệm liền mạch", "tối ưu toàn diện" nếu không có proof cụ thể.
10. Mỗi recommendation phải có lý do: user value, business value, technical feasibility, risk reduction, hoặc SEO/revenue potential.
11. Mỗi tài liệu phải có section \`Assumptions, Decisions, And Validation Items\` thay cho \`Assumptions And Open Questions\`. Nếu \`questions.md\` đã có câu trả lời, không được giữ lại dưới dạng câu hỏi mở.
12. Mỗi tài liệu phải có section \`Next Actions\` với việc cụ thể cho team liên quan.
13. Production wording guard: final output must not contain internal phrases such as "khong bia", "bia", "user tra loi", "nguoi dung tra loi", "khong ro version", "cau hoi con mo", "Không bịa", "bịa", "user trả lời", "người dùng trả lời", "không rõ version", or "Câu hỏi còn mở". Rephrase evidence gaps as professional validation items.

## Workflow bắt buộc

1. Tổng hợp thông tin từ \`input.md\` và câu trả lời trong \`questions.md\`.
2. Tạo đúng 7 file theo mapping ở trên.
3. Chạy discovery trước trong \`01-discovery.md\`.
4. Dùng kết luận discovery để viết strategy, PRD, UX, QA/docs, SEO/marketing.
5. Viết \`07-build-or-not-build.md\` cuối cùng sau khi đã có đủ context.
6. Chạy quality review và tạo \`quality-report.md\`.

## Quality Report bắt buộc

Trong \`quality-report.md\`, kiểm tra:

- Đã tạo đúng 7 file chính hay chưa.
- Có tạo \`asana-task.html\` đúng cấu trúc 9 section và có nút copy hay không.
- File nào còn assumption quan trọng.
- File nào thiếu evidence.
- Có competitor/search volume/pricing nào bị bịa không.
- Final recommendation có nhất quán với discovery không.

## Mandatory Skills Reference

${mandatorySkills || "Không load được mandatory skills."}

## Skill Map Reference

${skillMap || "Không load được skill map."}

## Full Skill Package

${skillFiles || "Không load được skill files."}
`;
}
