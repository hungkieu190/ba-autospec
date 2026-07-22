import { validateProject } from '../lib/validate.js';
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
  if (projects.length === 1) return projects[0];

  console.log('Projects:');
  projects.forEach((p, i) => console.log(`  ${i + 1}. ${p}`));
  slug = await ask('Project slug');
  if (!slug) throw new Error('--project is required when multiple projects exist.');
  return slug;
}

export async function validateCommand(options = {}) {
  const slug = await resolveProject(options);
  const report = validateProject(slug);

  console.log(`Validate: projects/${slug}`);
  console.log(`status: ${report.checks.status || 'unknown'}`);
  console.log('');

  if (report.errors.length) {
    console.log('Errors:');
    report.errors.forEach((e) => console.log(`  ✗ ${e}`));
  }
  if (report.warnings.length) {
    console.log('Warnings:');
    report.warnings.forEach((w) => console.log(`  ! ${w}`));
  }
  if (!report.errors.length && !report.warnings.length) {
    console.log('✓ All checks passed');
  } else if (report.ok && report.warnings.length) {
    console.log('');
    console.log('✓ Structure OK (with warnings)');
  }

  if (!report.ok) process.exitCode = 1;
}
