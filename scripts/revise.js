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
  console.error("Usage: npm run revise -- <project-name>");
  process.exit(1);
}

const projectDir = path.join(PROJECTS_DIR, projectName);
const inputFile = path.join(projectDir, "input.md");
const questionsFile = path.join(projectDir, "questions.md");
const projectConfig = readProjectConfig(projectDir);
const tool = getTool(projectConfig.tool);
const promptFile = path.join(projectDir, "revise-by-agent.md");
const outputDir = tool.id === "product-content-generator"
  ? path.join(projectDir, "content-output")
  : path.join(projectDir, "output");
const critiqueFile = path.join(outputDir, "critique-report.md");

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

if (!fs.existsSync(outputDir)) {
  console.error(`Missing output directory: ${outputDir}`);
  console.error("Create the draft output first.");
  process.exit(1);
}

if (!fs.existsSync(critiqueFile)) {
  console.error(`Missing critique report: ${critiqueFile}`);
  console.error("Run npm run critique, paste the prompt into your AI agent, and let it create critique-report.md first.");
  process.exit(1);
}

fs.writeFileSync(
  promptFile,
  tool.id === "product-content-generator" ? renderContentRevisionPrompt() : renderDocumentationRevisionPrompt(),
);

console.log(`Generated revision prompt in ${path.relative(process.cwd(), promptFile)}`);
console.log("Next: paste that prompt into your AI agent chat. The agent should revise the output and create revision-report.md.");

function renderDocumentationRevisionPrompt() {
  const mandatorySkills = loadMandatorySkills(tool.id);
  const skillMap = loadSkillMap(tool.id);
  const skillFiles = loadSkillFilesSummary(tool.id);
  const outputList = [
    ...DOCUMENTS.map(([filename]) => `- \`projects/${projectName}/output/${filename}\``),
    `- \`projects/${projectName}/output/index.md\``,
    `- \`projects/${projectName}/output/quality-report.md\``,
    `- \`projects/${projectName}/output/asana-task.html\``,
    `- \`projects/${projectName}/output/critique-report.md\``,
  ].join("\n");

  return `# [revise-product-documentation-by-agent]

Bạn là AI agent chịu trách nhiệm sửa bản draft sau vòng phản biện.

## Nhiệm vụ

Đọc input, questions, toàn bộ output hiện có, \`critique-report.md\`, skill package, rồi sửa lại bộ tài liệu để ra bản hoàn chỉnh hơn.

Bạn được phép cập nhật trực tiếp các file trong:

\`projects/${projectName}/output/\`

Sau khi sửa xong, tạo thêm:

\`projects/${projectName}/output/revision-report.md\`

## Files bắt buộc phải đọc

1. \`projects/${projectName}/input.md\`
${fs.existsSync(questionsFile) ? `2. \`projects/${projectName}/questions.md\`` : "2. `projects/${projectName}/questions.md` nếu file tồn tại"}
3. \`projects/${projectName}/output/critique-report.md\`
4. \`product-documentation-generator/skills/mandatory-skills.md\`
5. \`product-documentation-generator/skills/skill-map.md\`
6. Toàn bộ skill trong \`product-documentation-generator/skills/\`
7. Các output draft hiện có:

${outputList}

## Luật sửa

1. Viết bằng tiếng Việt, giữ technical terms bằng English khi cần.
2. Không xoá các file bắt buộc.
3. Không tạo thêm file tài liệu chính ngoài 7 file chính, \`index.md\`, \`quality-report.md\`, \`asana-task.html\`, \`critique-report.md\`, và \`revision-report.md\`.
4. Sửa theo priority trong critique report: Must Fix trước, Should Fix sau, Can Defer chỉ ghi rõ lý do nếu chưa sửa.
5. Không bịa evidence mới. Nếu critique chỉ ra thiếu evidence, hãy ghi rõ assumption/cần validate hoặc thêm câu hỏi mở.
6. Nếu recommendation build/not build thay đổi, cập nhật nhất quán ở \`01-discovery.md\`, \`02-product-strategy.md\`, \`07-build-or-not-build.md\`, và \`index.md\` nếu cần.
7. Nếu PRD thay đổi requirement, cập nhật QA, UX, Asana task và acceptance criteria tương ứng.
8. Sau khi sửa, chạy lại quality review trong \`quality-report.md\`.
9. Bản cuối phải không còn TODO placeholder.

## Cấu trúc revision-report.md bắt buộc

\`\`\`markdown
# Revision Report - ${projectName}

## Revision Verdict

- Status: Final Ready / Needs Another Critique / Blocked
- Lý do ngắn gọn

## Issues Addressed

| Critique Issue | Action Taken | Files Updated |
| --- | --- | --- |

## Issues Deferred

| Issue | Reason Deferred | Follow-Up |
| --- | --- | --- |

## Recommendation Changes

## Files Updated

## Remaining Risks

## Next Step

Chạy: npm run validate -- ${projectName}
Nếu pass và không cần vòng phản biện nữa, chạy: npm run pdf -- ${projectName}
\`\`\`

## Mandatory Skills Reference

${mandatorySkills || "Không load được mandatory skills."}

## Skill Map Reference

${skillMap || "Không load được skill map."}

## Full Skill Package

${skillFiles || "Không load được skill files."}
`;
}

function renderContentRevisionPrompt() {
  const mandatorySkills = loadMandatorySkills(tool.id);
  const skillMap = loadSkillMap(tool.id);
  const skillFiles = loadSkillFilesSummary(tool.id);
  const outputList = [
    ...CONTENT_DOCUMENTS.map(([filename]) => `- \`projects/${projectName}/content-output/${filename}\``),
    `- \`projects/${projectName}/content-output/critique-report.md\``,
  ].join("\n");

  return `# [revise-product-content-by-agent]

Bạn là AI agent chịu trách nhiệm sửa bộ content sau vòng phản biện.

## Nhiệm vụ

Đọc input, questions, content output, \`critique-report.md\`, skill package, local WooCommerce style reference, rồi sửa lại bộ content để ra bản publish-ready hơn.

Bạn được phép cập nhật trực tiếp các file trong:

\`projects/${projectName}/content-output/\`

Sau khi sửa xong, tạo thêm:

\`projects/${projectName}/content-output/revision-report.md\`

## Files bắt buộc phải đọc

1. \`projects/${projectName}/input.md\`
${fs.existsSync(questionsFile) ? `2. \`projects/${projectName}/questions.md\`` : "2. `projects/${projectName}/questions.md` nếu file tồn tại"}
3. \`projects/${projectName}/content-output/critique-report.md\`
4. \`product-content-generator/skills/mandatory-skills.md\`
5. \`product-content-generator/skills/skill-map.md\`
6. \`product-content-generator/woocommerce-style-reference.md\`
7. Toàn bộ skill trong \`product-content-generator/skills/\`
8. Các output draft hiện có:

${outputList}

## Luật sửa

1. Viết bằng tiếng Việt, giữ technical terms bằng English khi cần.
2. Không bịa review, rating, active installs, search volume, compatibility, pricing, support policy, refund policy, hoặc customer evidence.
3. Sửa claim quá mạnh thành claim có điều kiện hoặc assumption nếu thiếu proof.
4. Sửa landing page để đủ hero, CTA, pricing/license, trust/support, compatibility, feature-benefit, getting started, FAQ.
5. Sửa SEO plan để khớp search intent và có content opportunity rõ.
6. Không copy nguyên văn WooCommerce.
7. Bản cuối phải không còn TODO placeholder.

## Cấu trúc revision-report.md bắt buộc

\`\`\`markdown
# Content Revision Report - ${projectName}

## Revision Verdict

- Status: Publish Ready / Needs Another Critique / Blocked
- Lý do ngắn gọn

## Issues Addressed

| Critique Issue | Action Taken | Files Updated |
| --- | --- | --- |

## Issues Deferred

## Files Updated

## Remaining Risks

## Next Step

Chạy: npm run validate -- ${projectName}
\`\`\`

## Mandatory Skills Reference

${mandatorySkills || "Không load được mandatory skills."}

## Skill Map Reference

${skillMap || "Không load được skill map."}

## Full Skill Package

${skillFiles || "Không load được skill files."}
`;
}
