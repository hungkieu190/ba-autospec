import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { DEFAULT_TOOL_ID, ensureDir, PROJECTS_DIR, readProjectConfig } from "./shared.js";

const explicitProjectName = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
const projectName = explicitProjectName || inferProjectName();

if (!projectName) {
  console.error("Project name is required when multiple/no projects have output markdown.");
  console.error("Usage: npm run pdf -- <project-name>");
  process.exit(1);
}

const projectDir = path.join(PROJECTS_DIR, projectName);
const outputDir = path.join(projectDir, "output");
const pdfDir = path.join(outputDir, "pdf");
const projectConfig = readProjectConfig(projectDir);

if (projectConfig.tool !== DEFAULT_TOOL_ID) {
  console.error("PDF export is only available for Product Documentation & Discovery Generator projects.");
  console.error(`Project tool: ${projectConfig.tool}`);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  console.error(`Missing output directory: ${outputDir}`);
  console.error("Run npm run create, paste the generated prompt into your AI agent, and let it create output markdown first.");
  process.exit(1);
}

const markdownFiles = fs
  .readdirSync(outputDir)
  .filter((file) => file.endsWith(".md"))
  .filter((file) => file !== "quality-report.md")
  .sort();

if (!markdownFiles.length) {
  console.error(`No markdown files found in ${outputDir}`);
  process.exit(1);
}

ensureWeasyPrint();
ensureDir(pdfDir);

const combinedHtml = renderHtmlDocument(
  projectName,
  markdownFiles.map((file) => fs.readFileSync(path.join(outputDir, file), "utf8")).join("\n\n<div class=\"page-break\"></div>\n\n"),
);

const combinedHtmlPath = path.join(pdfDir, "product-documentation.html");
const combinedPdfPath = path.join(pdfDir, "product-documentation.pdf");
fs.writeFileSync(combinedHtmlPath, combinedHtml);
runWeasyPrint(combinedHtmlPath, combinedPdfPath);

for (const file of markdownFiles) {
  const baseName = file.replace(/\.md$/, "");
  const htmlPath = path.join(pdfDir, `${baseName}.html`);
  const pdfPath = path.join(pdfDir, `${baseName}.pdf`);
  const markdown = fs.readFileSync(path.join(outputDir, file), "utf8");

  fs.writeFileSync(htmlPath, renderHtmlDocument(baseName, markdown));
  runWeasyPrint(htmlPath, pdfPath);
}

console.log(`Generated PDFs in ${path.relative(process.cwd(), pdfDir)}`);
console.log(`Combined PDF: ${path.relative(process.cwd(), combinedPdfPath)}`);

function inferProjectName() {
  if (!fs.existsSync(PROJECTS_DIR)) return null;

  const candidates = fs
    .readdirSync(PROJECTS_DIR)
    .filter((entry) => !entry.startsWith("."))
    .filter((entry) => {
      const projectDir = path.join(PROJECTS_DIR, entry);
      const outputDir = path.join(projectDir, "output");
      if (!fs.existsSync(outputDir)) return false;
      const config = readProjectConfig(projectDir);
      if (config.tool !== DEFAULT_TOOL_ID) return false;
      return fs.readdirSync(outputDir).some((file) => file.endsWith(".md"));
    });

  return candidates.length === 1 ? candidates[0] : null;
}

function ensureWeasyPrint() {
  const result = spawnSync("weasyprint", ["--version"], { encoding: "utf8" });

  if (result.error || result.status !== 0) {
    console.error("WeasyPrint is required but was not found in PATH.");
    console.error("Install it first, then rerun the command:");
    console.error("  python -m pip install weasyprint");
    console.error("Or follow OS-specific install instructions: https://doc.courtbouillon.org/weasyprint/stable/first_steps.html");
    process.exit(1);
  }
}

function runWeasyPrint(htmlPath, pdfPath) {
  const result = spawnSync("weasyprint", [htmlPath, pdfPath], { encoding: "utf8" });

  if (result.status !== 0) {
    console.error(`Failed to generate PDF: ${pdfPath}`);
    if (result.stderr) console.error(result.stderr.trim());
    process.exit(result.status || 1);
  }
}

function renderHtmlDocument(title, markdown) {
  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)}</title>
  <style>
    @page { size: A4; margin: 18mm 16mm; }
    body { color: #172033; font-family: Inter, "Noto Sans", Arial, sans-serif; font-size: 11pt; line-height: 1.58; }
    h1, h2, h3, h4 { color: #111827; line-height: 1.2; page-break-after: avoid; }
    h1 { font-size: 28pt; margin: 0 0 14pt; }
    h2 { font-size: 18pt; margin: 22pt 0 8pt; border-bottom: 1px solid #e5e7eb; padding-bottom: 4pt; }
    h3 { font-size: 14pt; margin: 16pt 0 6pt; }
    h4 { font-size: 12pt; margin: 12pt 0 4pt; }
    p { margin: 0 0 8pt; }
    ul, ol { margin: 4pt 0 10pt 18pt; padding: 0; }
    li { margin: 2pt 0; }
    table { border-collapse: collapse; margin: 10pt 0 14pt; width: 100%; font-size: 9.5pt; }
    th, td { border: 1px solid #d0d5dd; padding: 6pt; vertical-align: top; }
    th { background: #f2f4f7; font-weight: 700; }
    code { background: #f2f4f7; border-radius: 3pt; color: #344054; font-family: "JetBrains Mono", Consolas, monospace; font-size: 9.5pt; padding: 1pt 3pt; }
    pre { background: #101828; border-radius: 8pt; color: #f9fafb; font-family: "JetBrains Mono", Consolas, monospace; font-size: 9pt; overflow-wrap: break-word; padding: 10pt; white-space: pre-wrap; }
    blockquote { border-left: 4pt solid #7f56d9; color: #475467; margin: 10pt 0; padding: 4pt 0 4pt 10pt; }
    a { color: #5b21b6; text-decoration: none; }
    .page-break { break-after: page; height: 0; }
  </style>
</head>
<body>
${markdownToHtml(markdown)}
</body>
</html>`;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let listType = null;
  let inFence = false;
  let fenceLines = [];
  let tableLines = [];

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      flushParagraph();
      flushList();
      flushTable();
      if (inFence) {
        html.push(`<pre>${escapeHtml(fenceLines.join("\n"))}</pre>`);
        fenceLines = [];
        inFence = false;
      } else {
        inFence = true;
      }
      continue;
    }

    if (inFence) {
      fenceLines.push(line);
      continue;
    }

    if (isTableLine(line)) {
      flushParagraph();
      flushList();
      tableLines.push(line);
      continue;
    }

    flushTable();

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      html.push(`<h${level}>${inlineMarkdown(heading[2].trim())}</h${level}>`);
      continue;
    }

    const unordered = line.match(/^\s*[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph();
      openList("ul");
      html.push(`<li>${inlineMarkdown(unordered[1])}</li>`);
      continue;
    }

    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      openList("ol");
      html.push(`<li>${inlineMarkdown(ordered[1])}</li>`);
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      html.push(`<blockquote>${inlineMarkdown(line.slice(2))}</blockquote>`);
      continue;
    }

    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  flushTable();

  return html.join("\n");

  function flushParagraph() {
    if (!paragraph.length) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function openList(type) {
    if (listType === type) return;
    flushList();
    listType = type;
    html.push(`<${type}>`);
  }

  function flushList() {
    if (!listType) return;
    html.push(`</${listType}>`);
    listType = null;
  }

  function flushTable() {
    if (!tableLines.length) return;
    html.push(renderTable(tableLines));
    tableLines = [];
  }
}

function isTableLine(line) {
  return /^\s*\|.+\|\s*$/.test(line);
}

function renderTable(lines) {
  const rows = lines
    .filter((line) => !/^\s*\|\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line))
    .map((line) => line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim()));

  if (!rows.length) return "";

  const [header, ...body] = rows;
  return `<table><thead><tr>${header.map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${body
    .map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody></table>`;
}

function inlineMarkdown(value = "") {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
