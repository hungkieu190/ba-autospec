import fs from "node:fs";
import path from "node:path";

export const ROOT_DIR = process.cwd();
export const PROJECTS_DIR = path.join(ROOT_DIR, "projects");
export const SKILLS_DIR = path.join(ROOT_DIR, "product-documentation-generator", "skills");

export const TOOL_ID = "product-documentation-generator";
export const TOOL_NAME = "Product Documentation & Discovery Generator";

export const DOCUMENTS = [
  ["01-discovery.md", "Discovery, Market Validation, and Risks"],
  ["02-product-strategy.md", "Product Strategy and Business Case"],
  ["03-prd.md", "Product Requirements Document"],
  ["04-ux-and-wireframe.md", "UX, User Flow, and Wireframe"],
  ["05-qa-and-documentation.md", "QA Plan and Documentation Outline"],
  ["06-seo-and-marketing.md", "SEO, Product Page, and Marketing Assets"],
  ["07-build-or-not-build.md", "Build Or Not Build Report"],
];

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

export function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "untitled-project";
}

export function readIfExists(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

export function inputTemplate(projectName) {
  return `# Product Documentation Generator Input

## Project Name
${projectName}

## Product Idea
Describe the product or feature in natural language.

## Product Type
Choose one: WordPress Plugin, WordPress Theme, Shopify Theme, Shopify App, SaaS Product, LMS Add-on, eCommerce Extension, Other.

## Target Users
Who will use this product? List primary and secondary users.

## User Roles
List roles such as Admin, Instructor, Student, Customer, Guest, Manager, Developer.

## Core Problem
What painful problem does this solve?

## Proposed Solution
How should the product solve the problem?

## Must-Have Features
- Feature 1
- Feature 2
- Feature 3

## Nice-To-Have Features
- Feature 1
- Feature 2

## Out Of Scope
- Item 1
- Item 2

## Competitors Or Alternatives
List known competitors, existing plugins/apps, manual workflows, or current alternatives. If unknown, write Unknown.

## Integrations
List required platforms, plugins, APIs, payment gateways, LMSs, CRMs, email tools, or third-party services.

## Pricing Or Revenue Model
One-time purchase, subscription, freemium, bundle, marketplace, custom, or unknown.

## SEO Keywords
List known keywords. If unknown, write Unknown.

## Business Goals
What should this product achieve for the business?

## Success Metrics
How will success be measured?

## Risks Or Constraints
Technical, market, legal, support, timeline, budget, or team constraints.

## Notes
Any extra context.
`;
}

export function parseInputMarkdown(content) {
  const result = {};
  let currentKey = null;

  for (const line of content.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)\s*$/);
    if (heading) {
      currentKey = heading[1].trim();
      result[currentKey] = "";
      continue;
    }

    if (currentKey) {
      result[currentKey] += `${line}\n`;
    }
  }

  for (const key of Object.keys(result)) {
    result[key] = result[key].trim();
  }

  return result;
}

export function loadSkillMap() {
  return readIfExists(path.join(SKILLS_DIR, "skill-map.md"));
}

export function loadMandatorySkills() {
  return readIfExists(path.join(SKILLS_DIR, "mandatory-skills.md"));
}
