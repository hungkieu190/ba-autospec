import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { DEFAULT_TOOL_ID, ensureDir, inputTemplate, PROJECTS_DIR, slugify, TOOLS } from "./shared.js";

const rl = readline.createInterface({ input, output });

try {
  const args = process.argv.slice(2);
  const toolFlagIndex = args.indexOf("--tool");
  const toolIdFromFlag = toolFlagIndex >= 0 ? args[toolFlagIndex + 1] : null;
  const projectNameArg = args.filter((arg, index) => index !== toolFlagIndex && index !== toolFlagIndex + 1).join(" ").trim();

  if (projectNameArg) {
    createProject(projectNameArg, normalizeToolId(toolIdFromFlag || DEFAULT_TOOL_ID));
  } else {
    console.log("Available tools:");
    console.log(`1. ${TOOLS["product-documentation-generator"].name}`);
    console.log(`2. ${TOOLS["product-content-generator"].name}`);

    const selected = (await rl.question("Select a tool [1]: ")).trim() || "1";
    const selectedTool = selected === "2" ? "product-content-generator" : selected === "1" ? "product-documentation-generator" : null;

    if (!selectedTool) {
      console.error("Invalid tool selection.");
      process.exitCode = 1;
    } else {
      const rawName = (await rl.question("Project name: ")).trim();
      if (!rawName) {
        console.error("Project name is required.");
        process.exitCode = 1;
      } else {
        createProject(rawName, selectedTool);
      }
    }
  }
} finally {
  rl.close();
}

function createProject(rawName, toolId) {
  const projectSlug = slugify(rawName);
  const projectDir = path.join(PROJECTS_DIR, projectSlug);
  const inputFile = path.join(projectDir, "input.md");
  const configFile = path.join(projectDir, "project.json");

  ensureDir(projectDir);

  fs.writeFileSync(configFile, `${JSON.stringify({ tool: toolId, toolName: TOOLS[toolId].name }, null, 2)}\n`);

  if (fs.existsSync(inputFile)) {
    console.log(`Input already exists: ${inputFile}`);
  } else {
    fs.writeFileSync(inputFile, inputTemplate(rawName, toolId));
    console.log(`Created: ${inputFile}`);
  }

  console.log("");
  console.log(`Tool: ${TOOLS[toolId].name}`);
  console.log("Next steps:");
  console.log(`1. Fill in projects/${projectSlug}/input.md`);
  console.log(`2. Run: npm run start -- ${projectSlug}`);
}

function normalizeToolId(toolId) {
  return TOOLS[toolId] ? toolId : DEFAULT_TOOL_ID;
}
