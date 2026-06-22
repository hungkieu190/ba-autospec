import fs from "node:fs";
import path from "node:path";

export const ROOT_DIR = process.cwd();
export const PROJECTS_DIR = path.join(ROOT_DIR, "projects");
export const DEFAULT_TOOL_ID = "product-documentation-generator";

export const TOOLS = {
  "product-documentation-generator": {
    id: "product-documentation-generator",
    name: "Product Documentation & Discovery Generator",
    skillsDir: path.join(ROOT_DIR, "product-documentation-generator", "skills"),
  },
  "product-content-generator": {
    id: "product-content-generator",
    name: "Product Content Generator",
    skillsDir: path.join(ROOT_DIR, "product-content-generator", "skills"),
  },
};

export const TOOL_ID = DEFAULT_TOOL_ID;
export const TOOL_NAME = TOOLS[DEFAULT_TOOL_ID].name;
export const SKILLS_DIR = TOOLS[DEFAULT_TOOL_ID].skillsDir;

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

export function inputTemplate(projectName, toolId = DEFAULT_TOOL_ID) {
  if (toolId === "product-content-generator") {
    return productContentInputTemplate(projectName);
  }

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

function productContentInputTemplate(projectName) {
  return `# Product Content Generator Input

## Project Name
${projectName}

## Product URL Or Reference
Link to existing product page, repo, docs, competitor page, or write Unknown.

## Product Name
Product name.

## Product Type
Choose one: WordPress Plugin, WooCommerce Extension, LearnPress Add-on, LMS Add-on, SaaS, Shopify App, Other.

## Product One-Liner
One sentence that explains what the product does.

## Target Customers
Who buys this product? Include store owner/admin/developer/instructor/student if relevant.

## Customer Problems
- Problem 1
- Problem 2
- Problem 3

## Core Features
- Feature 1
- Feature 2
- Feature 3

## Key Benefits
- Benefit 1
- Benefit 2
- Benefit 3

## Differentiators
Why should someone choose this instead of alternatives?

## Competitors Or Alternatives
List known competitors or alternatives. If unknown, write Unknown.

## Pricing And License
Annual, one-time, subscription, freemium, bundle, marketplace pricing, or Unknown.

## Compatibility And Requirements
WordPress/WooCommerce/LearnPress/PHP versions, HPOS, Cart and Checkout Blocks, themes, plugins, payment gateways, or Unknown.

## Proof Points
Reviews, active installs, version, testimonials, case studies, docs links, changelog, or Unknown.

## SEO Keywords
Primary and secondary keywords. If unknown, write Unknown.

## Brand Voice Notes
Default: MamFlow voice with WooCommerce marketplace structure. Add any special tone requirements.

## Required Assets
Choose needed assets: Product page copy, landing page, SEO keywords, competitor comparison, FAQ, blog ideas, launch post, product descriptions.

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

export function getTool(toolId = DEFAULT_TOOL_ID) {
  return TOOLS[toolId] || TOOLS[DEFAULT_TOOL_ID];
}

export function readProjectConfig(projectDir) {
  const configPath = path.join(projectDir, "project.json");
  if (!fs.existsSync(configPath)) {
    return { tool: DEFAULT_TOOL_ID };
  }

  try {
    const parsed = JSON.parse(fs.readFileSync(configPath, "utf8"));
    return { tool: parsed.tool || DEFAULT_TOOL_ID };
  } catch {
    return { tool: DEFAULT_TOOL_ID };
  }
}

export function loadSkillMap(toolId = DEFAULT_TOOL_ID) {
  const tool = getTool(toolId);
  return readIfExists(path.join(tool.skillsDir, "skill-map.md"));
}

export function loadMandatorySkills(toolId = DEFAULT_TOOL_ID) {
  const tool = getTool(toolId);
  return readIfExists(path.join(tool.skillsDir, "mandatory-skills.md"));
}

export function listSkillFiles(toolId = DEFAULT_TOOL_ID) {
  const tool = getTool(toolId);
  if (!fs.existsSync(tool.skillsDir)) return [];

  return fs
    .readdirSync(tool.skillsDir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => path.join(tool.skillsDir, file));
}

export function loadSkillFilesSummary(toolId = DEFAULT_TOOL_ID) {
  return listSkillFiles(toolId)
    .map((filePath) => `## ${path.relative(ROOT_DIR, filePath)}\n\n${readIfExists(filePath)}`)
    .join("\n\n---\n\n");
}
