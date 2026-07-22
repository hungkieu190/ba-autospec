import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT = path.resolve(__dirname, '../..');

export function rootPath(...parts) {
  return path.join(ROOT, ...parts);
}

export function projectsDir() {
  return rootPath('projects');
}

export function projectDir(slug) {
  return rootPath('projects', slug);
}

export function projectPaths(slug) {
  const base = projectDir(slug);
  return {
    root: base,
    input: path.join(base, 'input.md'),
    meta: path.join(base, 'meta.json'),
    agentPrompt: path.join(base, 'agent-prompt.md'),
    runTxt: path.join(base, 'RUN.txt'),
    outputDir: path.join(base, 'output'),
    outputVi: path.join(base, 'output', 'product-request.vi.md'),
    outputEn: path.join(base, 'output', 'product-request.en.md'),
  };
}

export function skillsDir() {
  return rootPath('skills');
}

export function codeDir() {
  return rootPath('code');
}

export function templatesDir() {
  return rootPath('templates');
}

export function sampleRequestPath() {
  return rootPath('sample-request.md');
}
