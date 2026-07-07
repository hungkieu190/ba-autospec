import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  listSkillFiles,
  parseInputMarkdown,
  slugify,
} from "./shared.js";

assert.equal(slugify("LearnPress Membership Plan"), "learnpress-membership-plan");
assert.equal(slugify("  Dang ky khoa hoc  "), "dang-ky-khoa-hoc");
assert.equal(slugify(""), "untitled-project");

const parsed = parseInputMarkdown(`# Title

## Project Name
Demo

## Must-Have Features
- Feature A
- Feature B

## Must-Have Features ##
- Feature C
`);

assert.deepEqual(Object.keys(parsed), ["Project Name", "Must-Have Features"]);
assert.equal(parsed["Project Name"], "Demo");
assert.equal(parsed["Must-Have Features"], "- Feature A\n- Feature B\n\n- Feature C");

const documentationSkills = listSkillFiles("product-documentation-generator")
  .map((filePath) => path.relative(process.cwd(), filePath).replaceAll("\\", "/"));

assert.ok(
  documentationSkills.includes("product-documentation-generator/skills/core/product-documentation-generator.md"),
  "Expected recursive skill loading to include nested core skill files.",
);

assert.ok(
  documentationSkills.includes("product-documentation-generator/skills/discovery/market-validation.md"),
  "Expected recursive skill loading to include nested discovery skill files.",
);

const filesThatShouldStayReadable = [
  "README.md",
  "scripts/start.js",
  "scripts/create.js",
  "scripts/critique.js",
  "scripts/revise.js",
];

for (const file of filesThatShouldStayReadable) {
  const content = fs.readFileSync(path.join(process.cwd(), file), "utf8");
  assert.equal(hasMojibake(content), false, `Mojibake detected in ${file}`);
}

console.log("All tests passed.");

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
