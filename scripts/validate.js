import fs from "node:fs";
import path from "node:path";
import {
  CONTENT_DOCUMENTS,
  DOCUMENTS,
  getTool,
  PROJECTS_DIR,
  readProjectConfig,
} from "./shared.js";

const projectName = process.argv.slice(2).find((arg) => !arg.startsWith("--"));

if (!projectName) {
  console.error("Project name is required.");
  console.error("Usage: npm run validate -- <project-name>");
  process.exit(1);
}

const projectDir = path.join(PROJECTS_DIR, projectName);
const projectConfig = readProjectConfig(projectDir);
const tool = getTool(projectConfig.tool);
const checks = [];

if (!fs.existsSync(projectDir)) {
  fail(`Project directory does not exist: ${projectDir}`);
  finish();
}

if (tool.id === "product-content-generator") {
  validateContentProject(projectDir);
} else {
  validateDocumentationProject(projectDir);
}

finish();

function validateDocumentationProject(projectDir) {
  const outputDir = path.join(projectDir, "output");
  const requiredFiles = [
    ...DOCUMENTS.map(([filename]) => filename),
    "index.md",
    "quality-report.md",
    "asana-task.html",
  ];
  const allowedFiles = new Set(requiredFiles);
  allowedFiles.add("critique-report.md");
  allowedFiles.add("revision-report.md");

  validateRequiredFiles(outputDir, requiredFiles);
  validateNoUnexpectedFiles(outputDir, allowedFiles, ["pdf", "wireframes"]);
  validateTextFiles(outputDir, requiredFiles.filter((file) => file.endsWith(".md")));
  validateOptionalTextFile(outputDir, "critique-report.md");
  validateOptionalTextFile(outputDir, "revision-report.md");
  validateAsanaHtml(path.join(outputDir, "asana-task.html"));
}

function validateContentProject(projectDir) {
  const outputDir = path.join(projectDir, "content-output");
  const requiredFiles = CONTENT_DOCUMENTS.map(([filename]) => filename);
  const allowedFiles = new Set(requiredFiles);
  allowedFiles.add("critique-report.md");
  allowedFiles.add("revision-report.md");

  validateRequiredFiles(outputDir, requiredFiles);
  validateNoUnexpectedFiles(outputDir, allowedFiles, []);
  validateTextFiles(outputDir, requiredFiles.filter((file) => file.endsWith(".md") || file.endsWith(".html")));
  validateOptionalTextFile(outputDir, "critique-report.md");
  validateOptionalTextFile(outputDir, "revision-report.md");
}

function validateRequiredFiles(outputDir, requiredFiles) {
  if (!fs.existsSync(outputDir)) {
    fail(`Missing output directory: ${outputDir}`);
    return;
  }

  for (const file of requiredFiles) {
    const filePath = path.join(outputDir, file);
    if (!fs.existsSync(filePath)) {
      fail(`Missing required output: ${path.relative(process.cwd(), filePath)}`);
      continue;
    }

    const stat = fs.statSync(filePath);
    if (stat.isFile() && stat.size === 0) {
      fail(`Output file is empty: ${path.relative(process.cwd(), filePath)}`);
    } else {
      pass(`Found ${path.relative(process.cwd(), filePath)}`);
    }
  }
}

function validateNoUnexpectedFiles(outputDir, allowedFiles, allowedDirs) {
  if (!fs.existsSync(outputDir)) return;

  for (const entry of fs.readdirSync(outputDir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!allowedDirs.includes(entry.name)) {
        fail(`Unexpected output directory: ${path.relative(process.cwd(), path.join(outputDir, entry.name))}`);
      }
      continue;
    }

    if (!allowedFiles.has(entry.name)) {
      fail(`Unexpected output file: ${path.relative(process.cwd(), path.join(outputDir, entry.name))}`);
    }
  }
}

function validateTextFiles(outputDir, files) {
  for (const file of files) {
    validateTextFile(path.join(outputDir, file), { allowTodo: file === "quality-report.md" });
  }
}

function validateOptionalTextFile(outputDir, file) {
  const filePath = path.join(outputDir, file);
  if (fs.existsSync(filePath)) {
    validateTextFile(filePath, { allowTodo: false });
  }
}

function validateTextFile(filePath, { allowTodo }) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  if (hasMojibake(content)) {
    fail(`Mojibake detected in ${path.relative(process.cwd(), filePath)}`);
  }

  if (!allowTodo && /\bTODO\b/i.test(content)) {
    fail(`TODO remains in ${path.relative(process.cwd(), filePath)}`);
  }

  if (filePath.endsWith(".md") && !/^#\s+/m.test(content)) {
    fail(`Markdown file has no H1 heading: ${path.relative(process.cwd(), filePath)}`);
  }
}

function validateAsanaHtml(filePath) {
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");
  const requiredSnippets = [
    "<!doctype html>",
    'charset="utf-8"',
    'id="asana-content"',
    'id="copy-button"',
    "Business Goal",
    "Problem Statement",
    "Target Users",
    "Functional Requirements",
    "UI References",
    "Technical Notes",
    "Acceptance Criteria",
    "Subtasks",
    "Release Notes",
  ];

  for (const snippet of requiredSnippets) {
    if (!content.toLowerCase().includes(snippet.toLowerCase())) {
      fail(`asana-task.html is missing: ${snippet}`);
    }
  }
}

function hasMojibake(content) {
  const suspiciousTokens = [
    "\u00c3",
    "\u00c2",
    "\u00c4\u0090",
    "\u00c6",
    "\u00e1\u00ba",
    "\u00e1\u00bb",
    "\u00e2\u0161",
    "\u00ef\u00b8",
  ];
  return suspiciousTokens.some((token) => content.includes(token));
}

function pass(message) {
  checks.push({ ok: true, message });
}

function fail(message) {
  checks.push({ ok: false, message });
}

function finish() {
  const failed = checks.filter((check) => !check.ok);

  for (const check of checks) {
    console.log(`${check.ok ? "PASS" : "FAIL"} ${check.message}`);
  }

  if (failed.length) {
    console.error(`\nValidation failed: ${failed.length} issue(s).`);
    process.exit(1);
  }

  console.log("\nValidation passed.");
}
