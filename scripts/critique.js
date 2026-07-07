import fs from "node:fs";
import path from "node:path";
import {
  CONTENT_DOCUMENTS,
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
  console.error("Usage: npm run critique -- <project-name>");
  process.exit(1);
}

const projectDir = path.join(PROJECTS_DIR, projectName);
const inputFile = path.join(projectDir, "input.md");
const questionsFile = path.join(projectDir, "questions.md");
const projectConfig = readProjectConfig(projectDir);
const tool = getTool(projectConfig.tool);
const promptFile = path.join(projectDir, "critique-by-agent.md");

if (!fs.existsSync(projectDir)) {
  console.error(`Missing project directory: ${projectDir}`);
  console.error("Run npm run init first.");
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`Missing input file: ${inputFile}`);
  console.error("Run npm run init first, then fill in input.md.");
  process.exit(1);
}

const outputDir = tool.id === "product-content-generator"
  ? path.join(projectDir, "content-output")
  : path.join(projectDir, "output");

if (!fs.existsSync(outputDir)) {
  console.error(`Missing output directory: ${outputDir}`);
  console.error("Run npm run create, paste the generated prompt into your AI agent, and let it create final output first.");
  process.exit(1);
}

fs.writeFileSync(
  promptFile,
  tool.id === "product-content-generator" ? renderContentCritiquePrompt() : renderDocumentationCritiquePrompt(),
);

console.log(`Generated critique prompt in ${path.relative(process.cwd(), promptFile)}`);
console.log("Next: paste that prompt into your AI agent chat. The agent should create a critique report.");

function renderDocumentationCritiquePrompt() {
  const mandatorySkills = loadMandatorySkills(tool.id);
  const skillMap = loadSkillMap(tool.id);
  const skillFiles = loadSkillFilesSummary(tool.id);
  const outputList = [
    ...DOCUMENTS.map(([filename]) => `- \`projects/${projectName}/output/${filename}\``),
    `- \`projects/${projectName}/output/index.md\``,
    `- \`projects/${projectName}/output/quality-report.md\``,
    `- \`projects/${projectName}/output/asana-task.html\``,
  ].join("\n");

  return `# [critique-product-documentation-by-agent]

Bạn là AI reviewer phản biện kế hoạch sản phẩm. Hãy review khó tính, độc lập, dựa trên evidence trong repo. Mục tiêu không phải viết lại tài liệu, mà là tìm lỗi logic, assumption yếu, scope rủi ro, thiếu test, thiếu evidence, và điểm không nhất quán giữa các file.

## Nhiệm vụ

Đọc input, questions, toàn bộ output documentation, quality report hiện có, skill package, rồi tạo report phản biện tại:

\`projects/${projectName}/output/critique-report.md\`

## Files bắt buộc phải đọc

1. \`projects/${projectName}/input.md\`
${fs.existsSync(questionsFile) ? `2. \`projects/${projectName}/questions.md\`` : "2. `projects/${projectName}/questions.md` nếu file tồn tại"}
3. \`product-documentation-generator/skills/mandatory-skills.md\`
4. \`product-documentation-generator/skills/skill-map.md\`
5. Toàn bộ skill liên quan trong \`product-documentation-generator/skills/\`
6. Các output hiện có:

${outputList}

## Vai phản biện

Hãy review theo 6 góc nhìn:

1. Product Strategy Reviewer: chiến lược, positioning, revenue, roadmap.
2. Business Analyst Reviewer: yêu cầu, user story, acceptance criteria, edge cases.
3. UX Reviewer: user flow, screen coverage, empty/error states, permission states.
4. Engineering Reviewer: feasibility, dependencies, integration lifecycle, migration, performance, security.
5. QA Reviewer: testability, regression, risk matrix, missing test cases.
6. Go-To-Market Reviewer: evidence, SEO, messaging, launch risk, support burden.

## Luật phản biện

1. Viết bằng tiếng Việt, giữ technical terms bằng English khi cần.
2. Không nể nang. Nếu kế hoạch yếu, nói rõ yếu ở đâu.
3. Không bịa evidence mới. Chỉ dùng evidence từ input/questions/output, hoặc ghi \`Không có evidence trong repo\`.
4. Mỗi issue phải có: severity, file/section liên quan, vì sao là vấn đề, impact, cách sửa.
5. Phân biệt rõ: bug/contradiction, assumption chưa validate, missing requirement, scope risk, execution risk.
6. Kiểm tra tính nhất quán giữa \`01-discovery.md\`, \`02-product-strategy.md\`, \`03-prd.md\`, \`04-ux-and-wireframe.md\`, \`05-qa-and-documentation.md\`, \`06-seo-and-marketing.md\`, và \`07-build-or-not-build.md\`.
7. Nếu final recommendation là Build Now/Build Later/Validate First/Reject, phải kiểm tra recommendation đó có thật sự khớp với evidence và risk không.
8. Đề xuất sửa theo priority, không chỉ phê bình.

## Cấu trúc critique-report.md bắt buộc

\`\`\`markdown
# Critique Report - ${projectName}

## Executive Verdict

- Verdict: Approve / Approve With Changes / Validate First / Block
- Lý do ngắn gọn

## Top Critical Issues

| Severity | Issue | Evidence/File | Impact | Recommended Fix |
| --- | --- | --- | --- | --- |

## Contradictions And Inconsistencies

## Weak Assumptions And Missing Evidence

## Scope And MVP Risks

## PRD And Acceptance Criteria Review

## UX And Workflow Review

## Technical Feasibility Review

## QA And Release Readiness Review

## SEO/GTM And Business Case Review

## Questions That Must Be Answered Before Build

## Recommended Changes

### Must Fix Before Build
### Should Fix Before Release
### Can Defer

## Revised Build Recommendation

Chọn một: Build Now / Build Later / Validate First / Reject.
Giải thích vì sao recommendation này tốt hơn hoặc xác nhận recommendation cũ vẫn đúng.
\`\`\`

## Mandatory Skills Reference

${mandatorySkills || "Không load được mandatory skills."}

## Skill Map Reference

${skillMap || "Không load được skill map."}

## Full Skill Package

${skillFiles || "Không load được skill files."}
`;
}

function renderContentCritiquePrompt() {
  const mandatorySkills = loadMandatorySkills(tool.id);
  const skillMap = loadSkillMap(tool.id);
  const skillFiles = loadSkillFilesSummary(tool.id);
  const outputList = CONTENT_DOCUMENTS
    .map(([filename]) => `- \`projects/${projectName}/content-output/${filename}\``)
    .join("\n");

  return `# [critique-product-content-by-agent]

Bạn là AI reviewer phản biện bộ nội dung marketing sản phẩm. Hãy kiểm tra tính thuyết phục, evidence, positioning, SEO intent, landing page, FAQ, và mức độ phù hợp với WooCommerce-style product page.

## Nhiệm vụ

Đọc input, questions, toàn bộ content output, skill package, local WooCommerce style reference, rồi tạo report phản biện tại:

\`projects/${projectName}/content-output/critique-report.md\`

## Files bắt buộc phải đọc

1. \`projects/${projectName}/input.md\`
${fs.existsSync(questionsFile) ? `2. \`projects/${projectName}/questions.md\`` : "2. `projects/${projectName}/questions.md` nếu file tồn tại"}
3. \`product-content-generator/skills/mandatory-skills.md\`
4. \`product-content-generator/skills/skill-map.md\`
5. \`product-content-generator/woocommerce-style-reference.md\`
6. Toàn bộ skill trong \`product-content-generator/skills/\`
7. Các output hiện có:

${outputList}

## Luật phản biện

1. Viết bằng tiếng Việt, giữ technical terms bằng English khi cần.
2. Không bịa review, rating, active installs, search volume, compatibility, pricing, support policy, refund policy, hoặc customer evidence.
3. Mỗi issue phải có severity, file/section liên quan, impact, và cách sửa.
4. Kiểm tra messaging có quá chung chung, quá hype, hoặc claim không có proof không.
5. Kiểm tra landing page có đủ hero, CTA, pricing/license, trust/support, compatibility, feature-benefit, getting started, FAQ không.
6. Kiểm tra SEO keyword plan có đúng search intent và có thiếu comparison/tutorial/use-case content không.
7. Kiểm tra content có đúng style reference nhưng không copy nguyên văn WooCommerce không.

## Cấu trúc critique-report.md bắt buộc

\`\`\`markdown
# Content Critique Report - ${projectName}

## Executive Verdict

- Verdict: Approve / Approve With Changes / Needs Rework / Block
- Lý do ngắn gọn

## Top Issues

| Severity | Issue | Evidence/File | Impact | Recommended Fix |
| --- | --- | --- | --- | --- |

## Positioning And Messaging Review

## Evidence And Trust Review

## SEO Intent Review

## Landing Page Review

## Comparison And FAQ Review

## Blog Content Plan Review

## Must Fix Before Publish

## Should Improve Later

## Revised Publishing Recommendation
\`\`\`

## Mandatory Skills Reference

${mandatorySkills || "Không load được mandatory skills."}

## Skill Map Reference

${skillMap || "Không load được skill map."}

## Full Skill Package

${skillFiles || "Không load được skill files."}
`;
}
