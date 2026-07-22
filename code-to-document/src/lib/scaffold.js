import path from 'node:path';
import { STATUS } from '../config.js';
import {
  codeDir,
  projectPaths,
  projectsDir,
  rootPath,
  sampleRequestPath,
  templatesDir,
} from './paths.js';
import {
  copyFile,
  ensureDir,
  exists,
  readText,
  writeJson,
  writeText,
} from './fs-utils.js';

export function slugify(name) {
  return String(name)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

export function ensureBaseDirs() {
  ensureDir(projectsDir());
  ensureDir(codeDir());
  ensureDir(rootPath('skills'));

  const codeGitkeep = path.join(codeDir(), '.gitkeep');
  if (!exists(codeGitkeep)) writeText(codeGitkeep, '');

  const projectsGitkeep = path.join(projectsDir(), '.gitkeep');
  if (!exists(projectsGitkeep)) writeText(projectsGitkeep, '');
}

export function createProject({ name, title = '', note = '' }) {
  ensureBaseDirs();

  const slug = slugify(name);
  if (!slug) {
    throw new Error('Project name is invalid after slugify.');
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error(`Invalid project slug: ${slug}`);
  }

  const paths = projectPaths(slug);
  if (exists(paths.root)) {
    throw new Error(`Project already exists: projects/${slug}`);
  }

  ensureDir(paths.outputDir);
  writeText(path.join(paths.outputDir, '.gitkeep'), '');

  const inputTemplatePath = path.join(templatesDir(), 'input.md');
  let input = readText(inputTemplatePath);
  input = input
    .replace(/\{\{PROJECT_NAME\}\}/g, title || name)
    .replace(/\{\{SLUG\}\}/g, slug)
    .replace(/\{\{NOTE\}\}/g, note || '');

  writeText(paths.input, input);

  const now = new Date().toISOString();
  const meta = {
    name: slug,
    title: title || name,
    note: note || '',
    createdAt: now,
    updatedAt: now,
    status: STATUS.DRAFT,
    paths: {
      input: `projects/${slug}/input.md`,
      agentPrompt: `projects/${slug}/agent-prompt.md`,
      outputVi: `projects/${slug}/output/product-request.vi.md`,
      outputEn: `projects/${slug}/output/product-request.en.md`,
    },
  };
  writeJson(paths.meta, meta);

  return { slug, paths, meta };
}

export function ensureSampleTemplateCopy() {
  const dest = path.join(templatesDir(), 'sample-request.md');
  if (!exists(dest) && exists(sampleRequestPath())) {
    copyFile(sampleRequestPath(), dest);
  }
}
