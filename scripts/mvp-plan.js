import fs from "node:fs";
import path from "node:path";
import {
  DOCUMENTS,
  LEARNPRESS_REFERENCE_DIR,
  PROJECTS_DIR,
  parseInputMarkdown,
  readIfExists,
} from "./shared.js";

const args = process.argv.slice(2);
const projectName = args.find((arg) => !arg.startsWith("--"));
const explicitLearnPress = args.includes("--learnpress");

if (!projectName) {
  console.error("Project name is required.");
  console.error("Usage: npm run mvp:plan -- <project-name> [--learnpress]");
  process.exit(1);
}

const projectDir = path.join(PROJECTS_DIR, projectName);
const inputFile = path.join(projectDir, "input.md");
const questionsFile = path.join(projectDir, "questions.md");
const promptFile = path.join(projectDir, "mvp-plan-by-agent.md");

if (!fs.existsSync(inputFile)) {
  console.error(`Missing input file: ${inputFile}`);
  console.error("Run npm run init first.");
  process.exit(1);
}

if (!fs.existsSync(questionsFile)) {
  console.error(`Missing questions file: ${questionsFile}`);
  console.error("Create and answer questions.md before planning implementation.");
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
].join("\n\n");
const isLearnPressProject = explicitLearnPress || /learn\s*press|learnpress|lp_/i.test(projectText);

if (isLearnPressProject && !fs.existsSync(LEARNPRESS_REFERENCE_DIR)) {
  console.error(`Missing LearnPress reference: ${LEARNPRESS_REFERENCE_DIR}`);
  console.error("Expected LearnPress core at references/learnpress/core.");
  process.exit(1);
}

fs.writeFileSync(promptFile, renderPrompt({ isLearnPressProject }), "utf8");

console.log(`Generated MVP implementation prompt in ${path.relative(process.cwd(), promptFile)}`);
if (isLearnPressProject) {
  console.log(`Using LearnPress reference: ${path.relative(process.cwd(), LEARNPRESS_REFERENCE_DIR)}`);
}
console.log("Next: paste that prompt into your AI agent chat. The agent should create or refresh mvp-build-plan/.");

function renderPrompt({ isLearnPressProject }) {
  const sourceDocuments = DOCUMENTS.map(([filename]) => `- \`projects/${projectName}/output/${filename}\``).join("\n");
  const referenceBlock = isLearnPressProject
    ? learnPressReferenceBlock()
    : genericReferenceBlock();
  const integrationFile = isLearnPressProject
    ? "01-learnpress-integration-analysis.md"
    : "01-platform-integration-analysis.md";

  return `# [create-mvp-build-plan-by-agent]

You are an AI coding and planning agent working directly in this repository.

## Mission

Create or update the MVP implementation plan for project \`${projectName}\`.

Output must be a Markdown plan in:

\`projects/${projectName}/mvp-build-plan/\`

The plan must be detailed enough for another AI coding agent to start implementation immediately without re-guessing scope, dependencies, work order, data model, API contracts, acceptance criteria, or completion checklists.

## Required Source Files

Read these files first:

1. \`projects/${projectName}/input.md\`
2. \`projects/${projectName}/questions.md\`
3. Main product documents in \`projects/${projectName}/output/\`:

${sourceDocuments}

If any file is missing, record that in \`00-readme.md\` and continue with the available sources.

${referenceBlock}

## Required Output Files

Create or update exactly these files:

- \`projects/${projectName}/mvp-build-plan/00-readme.md\`
- \`projects/${projectName}/mvp-build-plan/${integrationFile}\`
- \`projects/${projectName}/mvp-build-plan/02-mvp-scope-and-architecture.md\`
- \`projects/${projectName}/mvp-build-plan/03-api-and-data-contracts.md\`
- \`projects/${projectName}/mvp-build-plan/04-implementation-backlog.md\`
- \`projects/${projectName}/mvp-build-plan/05-ai-agent-task-checklists.md\`
- \`projects/${projectName}/mvp-build-plan/06-qa-and-dod.md\`

## Source-Of-Truth Rules

1. \`input.md\` and answered decisions in \`questions.md\` are the source of truth.
2. If \`output/\` conflicts with \`input.md\` or \`questions.md\`, use \`input.md\` and \`questions.md\`.
3. Do not keep answered items as open questions.
4. Do not include internal/meta wording such as "user answered", "unclear version", "open question", or "do not fabricate".
5. Use production-safe labels: \`Assumption\`, \`Validation item\`, \`Dependency\`, or \`Decision needed before implementation\`.

## Technical Plan Requirements

The plan must cover:

- MVP scope and out of scope.
- Expected plugin/app folder structure.
- Data model: post types, taxonomies, custom tables, options, meta keys, indexes, migration/versioning.
- Service layer and module boundaries.
- REST API or AJAX contracts.
- Permission and capability matrix.
- Frontend/admin screens.
- Checkout, payment, and order lifecycle when relevant.
- Email, notification, webhook, and third-party integration lifecycle when relevant.
- Privacy export/erase when personal data is stored.
- Error states, edge cases, race conditions, and rollback paths.
- QA matrix and Definition of Done.

## Checklist Rules

Every milestone and implementation task must use Markdown checkboxes:

\`- [ ] Clear task description\`

The coding agent may change it to:

\`- [x] Clear task description\`

only after implementation and verification are complete.

In \`05-ai-agent-task-checklists.md\`, create one consolidated checklist in implementation order:

1. Repository and setup
2. Platform/LearnPress integration
3. Database and migrations
4. Domain models
5. Admin settings
6. Instructor/admin workflow
7. Student/customer workflow
8. Checkout/order/payment lifecycle
9. Notifications/integrations
10. Dashboards/profile tabs
11. Security/privacy
12. QA/release

## Output Quality

- Write concise, implementation-ready Markdown.
- Vietnamese output is preferred for product/business explanations; English technical terms are allowed.
- Do not write generic tasks. Each task must name the related file, module, hook, API, or data structure when known.
- Do not copy long source code from references.
- Do not edit source references.
- Do not expand beyond MVP unless the item is clearly marked as out of scope, v1.1, or v2.
- The plan must be readable in order from \`00-readme.md\` to \`06-qa-and-dod.md\`.
`;
}

function learnPressReferenceBlock() {
  const rel = path.relative(process.cwd(), LEARNPRESS_REFERENCE_DIR).replace(/\\/g, "/");

  return `## Required LearnPress Reference

This project is a LearnPress product or LearnPress add-on. Use the shared LearnPress source reference at:

\`${rel}/\`

Before writing the plan, read and cross-check at least these files/areas when present:

- \`${rel}/learnpress.php\`
- \`${rel}/inc/abstracts/abstract-addon.php\`
- \`${rel}/inc/admin/settings/class-lp-settings-addons.php\`
- \`${rel}/inc/cart/class-lp-cart.php\`
- \`${rel}/inc/class-lp-checkout.php\`
- \`${rel}/inc/order/class-lp-order.php\`
- \`${rel}/inc/order/lp-order-functions.php\`
- \`${rel}/inc/user/class-lp-profile.php\`
- \`${rel}/inc/user/class-lp-profile-tabs.php\`
- \`${rel}/inc/rest-api/class-lp-core-api.php\`
- \`${rel}/inc/abstracts/abstract-rest-controller.php\`
- \`${rel}/inc/class-lp-emails.php\`
- \`${rel}/inc/emails/class-lp-email.php\`
- \`${rel}/templates/profile/\`
- \`${rel}/templates/emails/\`
- \`${rel}/inc/WPGDPR/\`

In \`01-learnpress-integration-analysis.md\`, document:

- Add-on bootstrap strategy.
- Required hooks, filters, and actions, with the LearnPress source file where each was found.
- Which parts use public hooks or extension points.
- Which parts must not modify LearnPress core.
- Version-sensitive assumptions to verify when LearnPress changes.
`;
}

function genericReferenceBlock() {
  return `## Platform Reference

If this project has a shared reference folder under \`references/\`, read it before planning. If no reference exists, record that in \`00-readme.md\` and plan from the available product documents.
`;
}
