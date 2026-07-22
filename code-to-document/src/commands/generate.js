import { generateForProject } from '../lib/prompt-builder.js';
import { skillsReady, setupSkills } from '../lib/skills.js';
import { ask } from '../lib/prompt.js';
import { listDirs } from '../lib/fs-utils.js';
import { projectsDir } from '../lib/paths.js';

async function resolveProject(options) {
  let slug = options.project || options.name || '';
  if (slug) return slug;

  const projects = listDirs(projectsDir());
  if (projects.length === 0) {
    throw new Error('No projects found. Run npm run init first.');
  }
  if (projects.length === 1) {
    return projects[0];
  }

  console.log('Projects:');
  projects.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
  slug = await ask('Project slug');
  if (!slug) throw new Error('--project is required when multiple projects exist.');
  return slug;
}

export async function generateCommand(options = {}) {
  if (!skillsReady()) {
    console.log('Setting up required skills pack...');
    setupSkills();
  }

  const slug = await resolveProject(options);
  const result = generateForProject(slug, { force: Boolean(options.force) });

  console.log(`✓ Generated agent-prompt.md`);
  console.log(`✓ Generated RUN.txt`);
  console.log('');
  console.log(result.pasteBlock);
  console.log('');
  console.log(`Files:`);
  console.log(`  - projects/${slug}/agent-prompt.md`);
  console.log(`  - projects/${slug}/RUN.txt`);
}
