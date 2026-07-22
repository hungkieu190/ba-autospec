import path from 'node:path';
import { listDirs, exists, readJson } from '../lib/fs-utils.js';
import { projectPaths, projectsDir } from '../lib/paths.js';
import { ensureBaseDirs } from '../lib/scaffold.js';

export async function listCommand() {
  ensureBaseDirs();
  const projects = listDirs(projectsDir());

  if (!projects.length) {
    console.log('No projects yet. Run: npm run init');
    return;
  }

  console.log('Projects:');
  for (const slug of projects) {
    const paths = projectPaths(slug);
    let status = 'unknown';
    let title = slug;
    if (exists(paths.meta)) {
      const meta = readJson(paths.meta);
      status = meta.status || status;
      title = meta.title || title;
    }
    const hasPrompt = exists(paths.agentPrompt) ? 'prompt' : '-';
    const hasVi = exists(paths.outputVi) ? 'vi' : '-';
    const hasEn = exists(paths.outputEn) ? 'en' : '-';
    console.log(
      `  - ${slug.padEnd(24)} [${status.padEnd(12)}] ${hasPrompt}/${hasVi}/${hasEn}  ${title}`,
    );
  }
  console.log('');
  console.log('Legend: prompt/vi/en presence after status');
}
