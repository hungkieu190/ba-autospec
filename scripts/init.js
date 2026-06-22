import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { ensureDir, inputTemplate, PROJECTS_DIR, slugify, TOOL_NAME } from "./shared.js";

const rl = readline.createInterface({ input, output });

try {
  const projectNameArg = process.argv.slice(2).join(" ").trim();

  if (projectNameArg) {
    createProject(projectNameArg);
  } else {
    console.log("Available tools:");
    console.log(`1. ${TOOL_NAME}`);

    const selected = (await rl.question("Select a tool [1]: ")).trim() || "1";
    if (selected !== "1") {
      console.error("Only option 1 is available right now.");
      process.exitCode = 1;
    } else {
      const rawName = (await rl.question("Project name: ")).trim();
      if (!rawName) {
        console.error("Project name is required.");
        process.exitCode = 1;
      } else {
        createProject(rawName);
      }
    }
  }
} finally {
  rl.close();
}

function createProject(rawName) {
  const projectSlug = slugify(rawName);
  const projectDir = path.join(PROJECTS_DIR, projectSlug);
  const inputFile = path.join(projectDir, "input.md");

  ensureDir(projectDir);

  if (fs.existsSync(inputFile)) {
    console.log(`Input already exists: ${inputFile}`);
  } else {
    fs.writeFileSync(inputFile, inputTemplate(rawName));
    console.log(`Created: ${inputFile}`);
  }

  console.log("");
  console.log("Next steps:");
  console.log(`1. Fill in projects/${projectSlug}/input.md`);
  console.log(`2. Run: npm run start -- ${projectSlug}`);
}
