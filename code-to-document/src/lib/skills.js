import path from 'node:path';
import { REQUIRED_SKILLS, SKILL_READ_ORDER } from '../config.js';
import { rootPath, skillsDir } from './paths.js';
import { copyFile, ensureDir, exists, writeText } from './fs-utils.js';

function skillsReadmeContent() {
  const ordered = SKILL_READ_ORDER.filter((f) => f !== 'README.md')
    .map((f, i) => `${i + 2}. \`skills/${f}\``)
    .join('\n');

  return `# Required Skills Library (code-to-document)

Agent **MUST** load only this folder. Do **not** load files from \`all-skills/\` outside this set.

## Purpose
Curated skills for: map codebase → understand WP/LMS domain → analyze product → competitors → write dual-language product request docs.

## Mandatory read order
1. \`skills/README.md\` (this file)
${ordered}

## Rules
1. Read skills **before** drafting any output.
2. Treat \`code/\` as read-only reference.
3. Write only under \`projects/<slug>/output/\`.
4. Follow \`sample-request.md\` section headings exactly.
5. Produce both:
   - \`product-request.vi.md\` (Vietnamese review)
   - \`product-request.en.md\` (English FINAL)
6. If unknown, write \`Unknown\` — do not invent.

## Skill map
| File | Role |
|------|------|
| codebase-orchestrator.md | Map /code systematically |
| wordpress-master.md | WP/LMS plugin domain |
| business-analyst.md | Requirements, gap, scope |
| product-manager.md | Prioritize features, goals, metrics |
| project-idea-validator.md | Risks, out of scope |
| competitive-analyst.md | Competitors / alternatives |
| market-researcher.md | Users, market framing |
| knowledge-synthesizer.md | Merge code + request insights |
| documentation-engineer.md | Structure & template fidelity |
| technical-writer.md | Clear dual-language writing |
| prompt-engineer.md | Follow prompt discipline |
`;
}

export function setupSkills() {
  const destDir = skillsDir();
  ensureDir(destDir);

  const results = [];
  for (const skill of REQUIRED_SKILLS) {
    const src = rootPath(skill.source);
    const dest = path.join(destDir, skill.name);
    if (!exists(src)) {
      results.push({ name: skill.name, ok: false, error: `missing source: ${skill.source}` });
      continue;
    }
    copyFile(src, dest);
    results.push({ name: skill.name, ok: true, dest: `skills/${skill.name}` });
  }

  writeText(path.join(destDir, 'README.md'), skillsReadmeContent());
  results.push({ name: 'README.md', ok: true, dest: 'skills/README.md' });

  return results;
}

export function skillsReady() {
  if (!exists(path.join(skillsDir(), 'README.md'))) return false;
  return REQUIRED_SKILLS.every((s) => exists(path.join(skillsDir(), s.name)));
}
