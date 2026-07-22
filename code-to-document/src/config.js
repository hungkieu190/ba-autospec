export const REQUIRED_SKILLS = [
  {
    name: 'business-analyst.md',
    source: 'all-skills/08-business-product/business-analyst.md',
  },
  {
    name: 'product-manager.md',
    source: 'all-skills/08-business-product/product-manager.md',
  },
  {
    name: 'technical-writer.md',
    source: 'all-skills/08-business-product/technical-writer.md',
  },
  {
    name: 'documentation-engineer.md',
    source: 'all-skills/06-developer-experience/documentation-engineer.md',
  },
  {
    name: 'wordpress-master.md',
    source: 'all-skills/08-business-product/wordpress-master.md',
  },
  {
    name: 'competitive-analyst.md',
    source: 'all-skills/10-research-analysis/competitive-analyst.md',
  },
  {
    name: 'market-researcher.md',
    source: 'all-skills/10-research-analysis/market-researcher.md',
  },
  {
    name: 'project-idea-validator.md',
    source: 'all-skills/10-research-analysis/project-idea-validator.md',
  },
  {
    name: 'codebase-orchestrator.md',
    source: 'all-skills/09-meta-orchestration/codebase-orchestrator.md',
  },
  {
    name: 'knowledge-synthesizer.md',
    source: 'all-skills/09-meta-orchestration/knowledge-synthesizer.md',
  },
  {
    name: 'prompt-engineer.md',
    source: 'all-skills/05-data-ai/prompt-engineer.md',
  },
];

export const SKILL_READ_ORDER = [
  'README.md',
  'codebase-orchestrator.md',
  'wordpress-master.md',
  'business-analyst.md',
  'product-manager.md',
  'project-idea-validator.md',
  'competitive-analyst.md',
  'market-researcher.md',
  'knowledge-synthesizer.md',
  'documentation-engineer.md',
  'technical-writer.md',
  'prompt-engineer.md',
];

export const OUTPUT_SECTIONS = [
  'Project Name',
  'Product Idea',
  'Product Type',
  'Target Users',
  'User Roles',
  'Core Problem',
  'Proposed Solution',
  'Must-Have Features',
  'Nice-To-Have Features',
  'Out Of Scope',
  'Competitors Or Alternatives',
  'Integrations',
  'Pricing Or Revenue Model',
  'SEO Keywords',
  'Business Goals',
  'Success Metrics',
  'Risks Or Constraints',
  'Notes',
];

export const STATUS = {
  DRAFT: 'draft',
  PROMPT_READY: 'prompt-ready',
  DOCUMENTED: 'documented',
};

export const PLACEHOLDER_PATTERNS = [
  /mô tả càng chi tiết càng tốt/i,
  /<!--\s*BẮT BUỘC\s*-->/,
  /Ví dụ:\s*Tôi muốn lên concept/i,
  /^\s*$/,
];
