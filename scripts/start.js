import fs from "node:fs";
import path from "node:path";
import {
  DOCUMENTS,
  ensureDir,
  getTool,
  loadMandatorySkills,
  loadSkillFilesSummary,
  loadSkillMap,
  parseInputMarkdown,
  PROJECTS_DIR,
  readProjectConfig,
  TOOL_NAME,
} from "./shared.js";

const args = process.argv.slice(2);
const generateDocs = args.includes("--generate-docs");
const projectName = args.find((arg) => !arg.startsWith("--"));

if (!projectName) {
  console.error("Project name is required.");
  console.error("Usage: npm run start -- <project-name>");
  process.exit(1);
}

const projectDir = path.join(PROJECTS_DIR, projectName);
const inputFile = path.join(projectDir, "input.md");
const outputDir = path.join(projectDir, "output");
const projectConfig = readProjectConfig(projectDir);
const tool = getTool(projectConfig.tool);

if (!fs.existsSync(inputFile)) {
  console.error(`Missing input file: ${inputFile}`);
  console.error("Run npm run init first, then fill in input.md.");
  process.exit(1);
}

const inputContent = fs.readFileSync(inputFile, "utf8");
const answers = parseInputMarkdown(inputContent);
const skillMap = loadSkillMap(tool.id);
const mandatorySkills = loadMandatorySkills(tool.id);
const skillFiles = loadSkillFilesSummary(tool.id);

const questionPromptFile = path.join(projectDir, "create-question-by-agent.md");

if (!generateDocs) {
  const prompt = tool.id === "product-content-generator"
    ? renderContentQuestionAgentPrompt(answers, skillMap, mandatorySkills, skillFiles)
    : renderQuestionAgentPrompt(answers, skillMap, mandatorySkills);
  fs.writeFileSync(questionPromptFile, prompt);
  console.log(`Generated agent prompt in ${path.relative(process.cwd(), questionPromptFile)}`);
  console.log("Next: paste that prompt into your AI agent chat. The agent should create questions.md.");
  process.exit(0);
}

if (tool.id !== "product-documentation-generator") {
  console.error("--generate-docs is only available for Product Documentation & Discovery Generator.");
  console.error("For Product Content Generator, run npm run create -- <project-name> and paste the generated prompt into your AI agent.");
  process.exit(1);
}

ensureDir(outputDir);

for (const [filename, title] of DOCUMENTS) {
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, renderDocument(title, filename, answers, skillMap));
}

fs.writeFileSync(path.join(outputDir, "index.md"), renderIndex(answers));
fs.writeFileSync(path.join(outputDir, "quality-report.md"), renderQualityReport(answers, mandatorySkills));
fs.writeFileSync(path.join(outputDir, "asana-task.html"), renderAsanaTaskHtml(answers));

console.log(`Generated ${DOCUMENTS.length} documents plus Asana HTML in ${path.relative(process.cwd(), outputDir)}`);

function renderContentQuestionAgentPrompt(answers, skillMapContent, mandatorySkillsContent, skillFilesContent) {
  const projectTitle = answers["Project Name"] || projectName;

  return `# [create-content-question-by-agent]

Bạn là AI agent đang làm việc trực tiếp trong repo này.

## Nhiệm vụ

Hãy đọc input của project và toàn bộ skill package của Product Content Generator, sau đó tạo file câu hỏi bổ sung bằng tiếng Việt tại:

\`projects/${projectName}/questions.md\`

Mục tiêu là thu thập đủ thông tin để tạo nội dung sản phẩm theo phong cách WooCommerce product page, đặc biệt tham chiếu cấu trúc WooCommerce Subscriptions.

## Files Bắt Buộc Phải Đọc

1. \`projects/${projectName}/input.md\`
2. \`product-content-generator/skills/mandatory-skills.md\`
3. \`product-content-generator/skills/skill-map.md\`
4. Toàn bộ skill trong \`product-content-generator/skills/\`

## Tóm Tắt Input Hiện Tại

| Mục | Nội dung |
| --- | --- |
| Project Name | ${escapeTable(projectTitle)} |
| Product URL Or Reference | ${escapeTable(answers["Product URL Or Reference"])} |
| Product Name | ${escapeTable(answers["Product Name"])} |
| Product Type | ${escapeTable(answers["Product Type"])} |
| Product One-Liner | ${escapeTable(answers["Product One-Liner"])} |
| Target Customers | ${escapeTable(answers["Target Customers"])} |
| Customer Problems | ${escapeTable(answers["Customer Problems"])} |
| Core Features | ${escapeTable(answers["Core Features"])} |
| Key Benefits | ${escapeTable(answers["Key Benefits"])} |
| Competitors Or Alternatives | ${escapeTable(answers["Competitors Or Alternatives"])} |
| SEO Keywords | ${escapeTable(answers["SEO Keywords"])} |

## Quy Tắc Tạo questions.md

1. Viết bằng tiếng Việt, giữ technical terms bằng English khi cần.
2. Chỉ tạo \`questions.md\`, chưa tạo nội dung sản phẩm cuối cùng.
3. Câu hỏi phải phục vụ trực tiếp cho product page, landing page, SEO keywords, competitor comparison, FAQ, và blog content.
4. Hỏi kỹ về proof points, pricing, compatibility, active installs/reviews/version, support/docs, quality checks, refund/guarantee nếu có.
5. Nếu cần mô phỏng phong cách WooCommerce, hỏi về product icon, hero image, pricing block, CTA, demo/docs links, support links, compatibility, related products.
6. Không yêu cầu người dùng cung cấp số liệu nếu họ không có; cho phép ghi \`Không biết\`.

## Cấu Trúc questions.md Bắt Buộc

\`\`\`markdown
# Câu Hỏi Bổ Sung Cho ${projectTitle}

## Hướng Dẫn Trả Lời

## Tóm Tắt Những Gì Đã Biết
## Các Assumption Đang Có
## Câu Hỏi Cần Trả Lời
### Product And Positioning
### Customer Persona
### SEO And Keywords
### WooCommerce-Style Page Modules
### WordPress/WooCommerce/LearnPress Compatibility
### Competitors And Comparisons
### Proof, Trust, Pricing, Support
### FAQ And Objections
### Blog/Content Ideas
## Câu Hỏi Ưu Tiên Cao
## Bước Tiếp Theo
Hướng dẫn người dùng sau khi trả lời xong chạy: npm run create -- ${projectName}
\`\`\`

## Mandatory Skills Reference

${mandatorySkillsContent || "Không load được mandatory skills."}

## Skill Map Reference

${skillMapContent || "Không load được skill map."}

## Full Skill Package

${skillFilesContent || "Không load được skill files."}
`;
}

function renderQuestionAgentPrompt(answers, skillMapContent, mandatorySkillsContent) {
  const projectTitle = answers["Project Name"] || projectName;
  const weakFields = findWeakFields(answers);

  return `# [create-question-by-agent]

Bạn là AI agent đang làm việc trực tiếp trong repo này.

## Nhiệm vụ

Hãy đọc input của project và toàn bộ skill package, sau đó tạo file câu hỏi bổ sung bằng tiếng Việt tại:

\`projects/${projectName}/questions.md\`

File \`questions.md\` phải giúp người dùng trả lời thêm những thông tin còn thiếu để sau đó có thể tạo bộ Product Discovery, Product Documentation, và Marketing Package hoàn chỉnh.

## Files Bắt Buộc Phải Đọc

1. \`projects/${projectName}/input.md\`
2. \`product-documentation-generator/skills/mandatory-skills.md\`
3. \`product-documentation-generator/skills/skill-map.md\`
4. Toàn bộ skill liên quan trong \`product-documentation-generator/skills/\`

## Tóm Tắt Input Hiện Tại

| Mục | Nội dung |
| --- | --- |
| Project Name | ${escapeTable(projectTitle)} |
| Product Idea | ${escapeTable(answers["Product Idea"])} |
| Product Type | ${escapeTable(answers["Product Type"])} |
| Target Users | ${escapeTable(answers["Target Users"])} |
| User Roles | ${escapeTable(answers["User Roles"])} |
| Core Problem | ${escapeTable(answers["Core Problem"])} |
| Proposed Solution | ${escapeTable(answers["Proposed Solution"])} |
| Must-Have Features | ${escapeTable(answers["Must-Have Features"])} |
| Competitors Or Alternatives | ${escapeTable(answers["Competitors Or Alternatives"])} |
| Pricing Or Revenue Model | ${escapeTable(answers["Pricing Or Revenue Model"])} |
| SEO Keywords | ${escapeTable(answers["SEO Keywords"])} |
| Risks Or Constraints | ${escapeTable(answers["Risks Or Constraints"])} |

## Các Mục Tool Phát Hiện Còn Yếu

${weakFields.length ? weakFields.map((field) => `- ${field}`).join("\n") : "- Không phát hiện mục trống theo kiểm tra cơ bản. Vẫn phải dùng skill để đánh giá độ đủ sâu của input."}

## Quy Tắc Tạo questions.md

1. Viết hoàn toàn bằng tiếng Việt.
2. Giữ thuật ngữ chuyên ngành bằng tiếng Anh nếu tự nhiên và chính xác hơn, ví dụ: PRD, roadmap, user flow, wireframe, acceptance criteria, SEO, conversion, churn, LTV, CAC, MVP, API, webhook.
3. Không tạo tài liệu cuối cùng ở bước này.
4. Chỉ tạo \`questions.md\` để hỏi thêm người dùng.
5. Câu hỏi phải cụ thể, có thể trả lời được, và phục vụ trực tiếp cho các tài liệu đầu ra.
6. Ưu tiên hỏi về: market validation, target users, user roles, core workflow, feature scope, competitors, pricing, integrations, risks, SEO, QA, documentation, and launch assets.
7. Nếu input đã đủ ở một mục, vẫn có thể hỏi câu nâng cao để làm rõ trade-off hoặc assumption.

## Cấu Trúc questions.md Bắt Buộc

Tạo file theo cấu trúc này:

\`\`\`markdown
# Câu Hỏi Bổ Sung Cho ${projectTitle}

## Hướng Dẫn Trả Lời

Giải thích ngắn gọn cho người dùng: hãy trả lời trực tiếp dưới từng câu hỏi, có thể bỏ qua câu không liên quan, ghi "Không biết" nếu chưa có dữ liệu.

## Tóm Tắt Những Gì Đã Biết

Tóm tắt input hiện tại bằng tiếng Việt.

## Các Assumption Đang Có
Liệt kê assumption AI phát hiện từ input.

## Câu Hỏi Cần Trả Lời

Chia theo nhóm: Product Context, Market Validation, Users & Roles, Scope & Features, Competitors, Revenue & Pricing, UX/User Flow, Technical/Integrations, SEO/GTM, QA/Acceptance Criteria, Documentation.

## Câu Hỏi Ưu Tiên Cao
Chọn 5-10 câu quan trọng nhất cần trả lời trước.

## Bước Tiếp Theo
Hướng dẫn người dùng sau khi trả lời xong chạy: npm run create -- ${projectName}
\`\`\`

## Mandatory Skills Reference

${mandatorySkillsContent || "Không load được mandatory skills."}

## Skill Map Reference

${skillMapContent || "Không load được skill map."}
`;
}

function renderQuestions(answers, skillMapContent, mandatorySkillsContent) {
  const projectTitle = answers["Project Name"] || projectName;
  const weakFields = findWeakFields(answers);

  return `# Câu Hỏi Bổ Sung Cho ${projectTitle}

## Mục Tiêu

File này được tạo từ \`input.md\` để AI agent đọc lại thông tin đầu vào, sử dụng toàn bộ bộ skill trong \`product-documentation-generator/skills/\`, rồi hỏi thêm những điểm còn thiếu trước khi tạo tài liệu cuối cùng.

Đầu ra tài liệu cuối cùng phải viết bằng tiếng Việt. Các thuật ngữ chuyên ngành nên giữ nguyên tiếng Anh khi tự nhiên hơn, ví dụ: PRD, roadmap, user flow, wireframe, acceptance criteria, SEO, conversion, churn, LTV, CAC, MVP, API, webhook.

## Tóm Tắt Input Hiện Tại

| Mục | Nội dung |
| --- | --- |
| Project Name | ${escapeTable(projectTitle)} |
| Product Idea | ${escapeTable(answers["Product Idea"])} |
| Product Type | ${escapeTable(answers["Product Type"])} |
| Target Users | ${escapeTable(answers["Target Users"])} |
| User Roles | ${escapeTable(answers["User Roles"])} |
| Core Problem | ${escapeTable(answers["Core Problem"])} |
| Proposed Solution | ${escapeTable(answers["Proposed Solution"])} |
| Must-Have Features | ${escapeTable(answers["Must-Have Features"])} |
| Competitors Or Alternatives | ${escapeTable(answers["Competitors Or Alternatives"])} |
| Pricing Or Revenue Model | ${escapeTable(answers["Pricing Or Revenue Model"])} |
| SEO Keywords | ${escapeTable(answers["SEO Keywords"])} |
| Risks Or Constraints | ${escapeTable(answers["Risks Or Constraints"])} |

## Các Mục Đang Thiếu Hoặc Còn Yếu

${weakFields.length ? weakFields.map((field) => `- ${field}`).join("\n") : "- Chưa phát hiện mục trống theo kiểm tra cơ bản. AI agent vẫn cần rà soát chất lượng và hỏi thêm nếu thông tin chưa đủ để ra quyết định."}

## Câu Hỏi Cần Người Dùng Trả Lời

### 1. Product Context

1. Sản phẩm này dành cho thị trường nào trước tiên: Việt Nam, quốc tế, hay một niche cụ thể?
2. Ai là người ra quyết định mua hoặc cài đặt sản phẩm?
3. Người dùng cuối khác gì với người trả tiền?
4. Sản phẩm này là standalone product hay add-on cho một hệ sinh thái có sẵn?
5. Có platform/version cụ thể nào bắt buộc phải hỗ trợ không?

### 2. Problem Validation

1. Vấn đề này đang xảy ra trong tình huống thực tế nào?
2. Người dùng hiện đang giải quyết vấn đề này bằng cách nào?
3. Điều gì khiến giải pháp hiện tại tốn thời gian, tốn tiền, rủi ro, hoặc khó dùng?
4. Có bằng chứng nào từ customer support, review, forum, ticket, sales call, hoặc khách hàng thật không?
5. Nếu không xây sản phẩm này, người dùng sẽ tiếp tục chịu tổn thất gì?

### 3. Target Users And Roles

1. Liệt kê từng user role và việc chính họ cần làm trong sản phẩm.
2. Role nào có quyền cấu hình, role nào chỉ sử dụng, role nào chỉ xem báo cáo?
3. Có cần permission matrix chi tiết không?
4. Có khác biệt workflow giữa free user, paid user, admin, customer, instructor, student, manager không?

### 4. Scope And Features

1. Ba tính năng bắt buộc nhất cho MVP là gì?
2. Tính năng nào có thể để sau launch mà không làm mất giá trị cốt lõi?
3. Có workflow nào tuyệt đối không được thiếu không?
4. Có tính năng nào dễ gây support burden cao nên loại khỏi v1 không?
5. Có cần import/export, notification, email, reporting, analytics, audit log, hoặc role management không?

### 5. Competitors And Alternatives

1. Bạn biết những competitor, plugin, app, SaaS, template, agency service, hoặc manual workaround nào?
2. Người dùng đang trả tiền cho giải pháp nào hiện tại?
3. Competitor nào mạnh nhất và vì sao?
4. Competitor nào bị phàn nàn nhiều nhất và phàn nàn về điểm gì?
5. Sản phẩm của mình phải khác biệt ở feature, UX, pricing, integration, support, hay positioning?

### 6. Revenue And Pricing

1. Muốn bán theo one-time purchase, subscription, freemium, bundle, marketplace, hay custom pricing?
2. Mức giá kỳ vọng là bao nhiêu?
3. Có plan free/pro/agency/enterprise không?
4. Có cơ hội upsell hoặc cross-sell với sản phẩm hiện có không?
5. Success metric về revenue là gì: số sale, MRR, ARPU, LTV, conversion rate, hay attach rate?

### 7. UX And User Flow

1. Core user flow từ lúc bắt đầu đến lúc nhận được giá trị là gì?
2. First-run onboarding cần hỏi/cấu hình những gì?
3. Người dùng cần thấy dashboard, wizard, settings page, embedded widget, modal, hay frontend screen?
4. Empty state, error state, permission denied state cần xử lý thế nào?
5. Có cần mobile-first, desktop-first, hoặc responsive admin UI không?

### 8. Technical And Integration Constraints

1. Có integration bắt buộc nào không: payment gateway, LMS, WooCommerce, Shopify, CRM, email service, API, webhook?
2. Có giới hạn performance, data volume, realtime, cron job, queue, hoặc background processing không?
3. Có yêu cầu bảo mật, privacy, GDPR, logging, data retention, export/delete data không?
4. Có cần compatibility với theme/plugin/app khác không?
5. Team hiện tại có constraint về timeline, skill, budget, hoặc maintenance không?

### 9. SEO And Go-To-Market

1. Người dùng sẽ search bằng keyword nào khi cần sản phẩm này?
2. Có keyword thương mại hoặc comparison keyword nào đã biết không?
3. Product page nên nhấn mạnh problem, benefit, feature, integration, hay comparison?
4. Kênh launch chính là SEO, marketplace, email list, affiliate, cộng đồng, paid ads, hay existing users?
5. Có cần tạo comparison articles, alternative articles, tutorial articles, hoặc use case articles không?

### 10. Quality And Acceptance Criteria

1. Điều kiện nào chứng minh MVP đã đủ để release?
2. Những test case quan trọng nhất là gì?
3. Role/permission nào cần test kỹ nhất?
4. Edge case nào dễ gây bug hoặc support ticket?
5. Sau launch, metric nào quyết định build tiếp, pivot, hoặc dừng?

## Hướng Dẫn Cho AI Agent

1. Đọc \`input.md\`, \`questions.md\`, và toàn bộ skill bắt buộc trước khi tạo tài liệu.
2. Nếu người dùng chưa trả lời hết, đánh dấu rõ assumption thay vì bịa dữ liệu.
3. Không tự tạo competitor giả, search volume giả, pricing benchmark giả, hoặc customer evidence giả.
4. Tạo tài liệu đầu ra bằng tiếng Việt; giữ thuật ngữ chuyên ngành tiếng Anh khi cần độ chính xác.
5. Ưu tiên tính khả thi thương mại, support cost, SEO potential, revenue potential, và development efficiency.

## Mandatory Skills Loaded

${mandatorySkillsContent || "Không load được mandatory skills."}

## Skill Map Reference

${skillMapContent || "Không load được skill map."}
`;
}

function findWeakFields(answers) {
  const requiredFields = [
    "Product Idea",
    "Product Type",
    "Target Users",
    "User Roles",
    "Core Problem",
    "Proposed Solution",
    "Must-Have Features",
    "Competitors Or Alternatives",
    "Pricing Or Revenue Model",
    "SEO Keywords",
    "Business Goals",
    "Success Metrics",
    "Risks Or Constraints",
  ];

  return requiredFields.filter((field) => {
    const value = answers[field] || "";
    return !value || /^(unknown|todo|n\/a)$/i.test(value.trim()) || value.includes("Describe the product");
  });
}

function renderDocument(title, filename, answers, skillMapContent) {
  const projectTitle = answers["Project Name"] || projectName;
  const productIdea = answers["Product Idea"] || "TODO: Fill Product Idea in input.md";
  const skillsUsed = extractSkillsForDocument(filename, skillMapContent);

  return `# ${title}

## Product Idea

${productIdea}

## Evidence Status

This document is generated from \`input.md\`. Market, keyword, competitor, pricing, or revenue claims must be treated as assumptions until independently verified.

## Skills Used

${skillsUsed.map((skill) => `- ${skill}`).join("\n") || "- See product-documentation-generator/skills/skill-map.md"}

## Input Summary

| Field | Value |
| --- | --- |
| Project Name | ${escapeTable(projectTitle)} |
| Product Type | ${escapeTable(answers["Product Type"])} |
| Target Users | ${escapeTable(answers["Target Users"])} |
| User Roles | ${escapeTable(answers["User Roles"])} |
| Core Problem | ${escapeTable(answers["Core Problem"])} |
| Proposed Solution | ${escapeTable(answers["Proposed Solution"])} |
| Revenue Model | ${escapeTable(answers["Pricing Or Revenue Model"])} |

${sectionTemplate(filename, answers)}

## Assumptions To Validate

- Search demand is not verified unless keyword evidence is added.
- Competitors are not verified unless listed with sources in \`input.md\`.
- Revenue potential is directional until pricing, CAC, conversion, and support cost are researched.
- Technical feasibility is directional until engineering validates integrations and constraints.
`;
}

function sectionTemplate(filename, answers) {
  switch (filename) {
    case "01-discovery.md":
      return `## Market Validation

TODO

## Search Demand

TODO

## Competitors And Alternatives

| Product | Type | Strengths | Weaknesses | Source |
| --- | --- | --- | --- | --- |
| ${escapeTable(answers["Competitors Or Alternatives"] || "TODO")} | TODO | TODO | TODO | TODO |

## Complexity And Risks

TODO`;
    case "02-product-strategy.md":
      return `## Positioning

TODO

## Product Brief

TODO

## Revenue Model

${answers["Pricing Or Revenue Model"] || "TODO"}

## Roadmap

TODO`;
    case "03-prd.md":
      return `## Objectives

${answers["Business Goals"] || "TODO"}

## User Stories

TODO

## Requirements

${answers["Must-Have Features"] || "TODO"}

## Acceptance Criteria

TODO`;
    case "04-ux-and-wireframe.md":
      return `## User Flow

\`\`\`mermaid
flowchart TD
  A[Start] --> B[Core Workflow]
  B --> C[Success]
\`\`\`

## Wireframes

\`\`\`text
+------------------------------------------------+
| Header                                         |
+------------------------------------------------+
| Navigation     | Main content                  |
+------------------------------------------------+
\`\`\``;
    case "05-qa-and-documentation.md":
      return `## QA Plan

| Area | Scenario | Expected Result |
| --- | --- | --- |
| Functional | Core workflow | User completes task |

## Documentation Outline

TODO`;
    case "06-seo-and-marketing.md":
      return `## Product Page Outline

TODO

## SEO Content Plan

TODO

## Marketing Assets

TODO`;
    case "07-build-or-not-build.md":
      return `## Final Recommendation

Choose one: Build Now, Build Later, Validate First, Reject.

## Why

TODO`;
    default:
      return "## Content\n\nTODO";
  }
}

function renderIndex(answers) {
  return `# ${answers["Project Name"] || projectName}

Generated by ${TOOL_NAME}.

## Input

- [input.md](../input.md)

## Documents

${DOCUMENTS.map(([filename, title]) => `- [${title}](./${filename})`).join("\n")}

## Quality

- [Quality Report](./quality-report.md)
`;
}

function renderQualityReport(answers, mandatorySkillsContent) {
  const missing = [
    "Product Idea",
    "Product Type",
    "Target Users",
    "Core Problem",
    "Proposed Solution",
    "Must-Have Features",
  ].filter((field) => !answers[field] || answers[field].includes("Describe the product"));

  return `# Quality Report

## Status

${missing.length ? "Needs input completion" : "Input is present. Generated documents still require evidence validation and editorial completion."}

## Missing Or Weak Input Fields

${missing.length ? missing.map((field) => `- ${field}`).join("\n") : "- None detected by basic checks."}

## Mandatory Skills Reference

${mandatorySkillsContent || "Could not load mandatory skills."}
`;
}

function renderAsanaTaskHtml(answers) {
  const title = answers["Project Name"] || projectName;
  const problem = answers["Core Problem"] || "TODO";
  const targetUsers = answers["Target Users"] || "TODO";
  const requirements = answers["Must-Have Features"] || "TODO";
  const technicalNotes = answers["Integrations"] || answers["Risks Or Constraints"] || "TODO";

  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} - Asana Task</title>
  <style>
    :root { color-scheme: light; --bg: #f6f7fb; --card: #ffffff; --text: #172033; --muted: #667085; --border: #e4e7ec; --accent: #635bff; }
    body { margin: 0; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: var(--bg); color: var(--text); }
    .page { max-width: 920px; margin: 0 auto; padding: 32px 20px 56px; }
    .toolbar { display: flex; gap: 12px; align-items: center; justify-content: space-between; margin-bottom: 18px; }
    .eyebrow { margin: 0 0 4px; color: var(--muted); font-size: 13px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    h1 { margin: 0; font-size: clamp(28px, 4vw, 42px); line-height: 1.08; }
    button { border: 0; border-radius: 12px; padding: 12px 16px; background: var(--accent); color: white; font-weight: 700; cursor: pointer; box-shadow: 0 8px 24px rgba(99, 91, 255, .24); }
    button:hover { filter: brightness(.96); }
    .card { background: var(--card); border: 1px solid var(--border); border-radius: 22px; padding: 28px; box-shadow: 0 18px 50px rgba(16, 24, 40, .08); }
    #asana-content h2 { margin: 28px 0 10px; padding-top: 18px; border-top: 1px solid var(--border); font-size: 20px; }
    #asana-content h2:first-child { margin-top: 0; padding-top: 0; border-top: 0; }
    p { line-height: 1.65; }
    ul, ol { padding-left: 24px; line-height: 1.65; }
    li { margin: 6px 0; }
    .hint { margin-top: 14px; color: var(--muted); font-size: 13px; }
  </style>
</head>
<body>
  <main class="page">
    <div class="toolbar">
      <div>
        <p class="eyebrow">Asana Task</p>
        <h1>${escapeHtml(title)}</h1>
      </div>
      <button id="copy-button" type="button">Copy for Asana</button>
    </div>
    <section class="card" id="asana-content">
      <h2>1. Business Goal</h2>
      <p>TODO: Nêu mục tiêu kinh doanh, impact kỳ vọng, revenue/support/retention/SEO goal.</p>

      <h2>2. Problem Statement</h2>
      <p>${escapeHtml(problem)}</p>

      <h2>3. Target Users</h2>
      <p>${escapeHtml(targetUsers)}</p>

      <h2>4. Functional Requirements</h2>
      <ul>${listItemsFromText(requirements)}</ul>

      <h2>5. UI References</h2>
      <ul>
        <li>Tham khảo <code>04-ux-and-wireframe.md</code> cho user flow, screen list, và ASCII wireframe.</li>
        <li>TODO: Link hoặc mô tả màn hình liên quan trong Figma/screenshot nếu có.</li>
      </ul>

      <h2>6. Technical Notes</h2>
      <p>${escapeHtml(technicalNotes)}</p>

      <h2>7. Acceptance Criteria</h2>
      <ul>
        <li>Core workflow hoạt động đúng cho target user chính.</li>
        <li>Permission và error state được xử lý rõ ràng.</li>
        <li>QA có thể kiểm thử requirement bằng pass/fail criteria.</li>
      </ul>

      <h2>8. Subtasks</h2>
      <ul>
        <li>[Product] Chốt scope và priority cho MVP.</li>
        <li>[Design] Hoàn thiện user flow và UI references.</li>
        <li>[Engineering] Technical breakdown và estimate.</li>
        <li>[QA] Viết test cases theo acceptance criteria.</li>
        <li>[Docs] Chuẩn bị documentation outline.</li>
        <li>[Marketing] Chuẩn bị release notes và product messaging.</li>
      </ul>

      <h2>9. Release Notes</h2>
      <p>TODO: Tóm tắt ngắn gọn tính năng, giá trị cho người dùng, và thay đổi chính trong release này.</p>
    </section>
    <p class="hint">Open this file in a browser, click Copy for Asana, then paste into an Asana task description.</p>
  </main>
  <script>
    const button = document.getElementById('copy-button');
    const content = document.getElementById('asana-content');

    async function copyForAsana() {
      const html = content.innerHTML;
      const text = content.innerText;
      try {
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({
              'text/html': new Blob([html], { type: 'text/html' }),
              'text/plain': new Blob([text], { type: 'text/plain' })
            })
          ]);
        } else {
          await navigator.clipboard.writeText(text);
        }
        button.textContent = 'Copied';
      } catch (error) {
        const range = document.createRange();
        range.selectNodeContents(content);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
        button.textContent = 'Copied';
      }
      setTimeout(() => { button.textContent = 'Copy for Asana'; }, 1600);
    }

    button.addEventListener('click', copyForAsana);
  </script>
</body>
</html>`;
}

function listItemsFromText(value = "TODO") {
  const items = String(value)
    .split(/\r?\n/)
    .map((item) => item.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);

  return (items.length ? items : ["TODO"]).map((item) => `<li>${escapeHtml(item)}</li>`).join("\n        ");
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extractSkillsForDocument(filename, skillMapContent) {
  const line = skillMapContent
    .split(/\r?\n/)
    .find((row) => row.includes(`\`${filename}\``));

  if (!line) return [];

  return [...line.matchAll(/`([^`]+\.md)`/g)]
    .map((match) => match[1])
    .filter((skill) => skill !== filename);
}

function escapeTable(value = "") {
  return String(value).replace(/\r?\n/g, "<br>").replace(/\|/g, "\\|") || "TODO";
}
