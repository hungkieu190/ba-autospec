import { createProject, ensureBaseDirs } from '../lib/scaffold.js';
import { ask } from '../lib/prompt.js';
import { setupSkills, skillsReady } from '../lib/skills.js';

export async function initCommand(options = {}) {
  ensureBaseDirs();

  if (!skillsReady()) {
    console.log('Setting up required skills pack...');
    const results = setupSkills();
    const failed = results.filter((r) => !r.ok);
    if (failed.length) {
      console.error('Some skills failed to copy:');
      for (const f of failed) console.error(`  - ${f.name}: ${f.error}`);
      process.exitCode = 1;
      return;
    }
    console.log(`✓ skills/ ready (${results.length} items)`);
  }

  let name = options.name || '';
  let title = options.title || '';
  let note = options.note || '';

  if (!name) {
    name = await ask('Project name (e.g. lp-ie-quiz)');
  }
  if (!name) {
    throw new Error('Project name is required.');
  }
  if (!title && !options.name) {
    title = await ask('Display title (optional)', { defaultValue: name });
  }
  if (!note && !options.name) {
    note = await ask('Short note (optional)');
  }

  const { slug, meta } = createProject({ name, title, note });

  console.log(`✓ Created projects/${slug}`);
  console.log(`  status: ${meta.status}`);
  console.log('');
  console.log('Next steps:');
  console.log(`  1. Edit: projects/${slug}/input.md`);
  console.log(`  2. Run:  npm run generate -- --project ${slug}`);
  console.log('  3. Paste RUN.txt into AI Agent chat');
}
