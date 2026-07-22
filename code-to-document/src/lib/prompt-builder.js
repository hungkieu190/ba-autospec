import path from 'node:path';
import { STATUS } from '../config.js';
import { projectPaths, sampleRequestPath, templatesDir } from './paths.js';
import {
  exists,
  readJson,
  readText,
  writeJson,
  writeText,
} from './fs-utils.js';

function extractRequestBody(inputMd) {
  const match = inputMd.match(
    /## Request[\s\S]*?(?=\n## Focus Areas|\n## Code Hints|\n## Extra Notes|$)/i,
  );
  return match ? match[0].trim() : inputMd.trim();
}

function isInputTooEmpty(inputMd) {
  const body = extractRequestBody(inputMd);
  const cleaned = body
    .replace(/## Request[^\n]*/i, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/Ví dụ:[\s\S]*$/im, '')
    .replace(/-\s*(Bối cảnh|Người dùng|Pain point|Mong muốn|Ràng buộc|Tham chiếu code)[^\n]*/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleaned.length < 40) return true;
  if (/mô tả càng chi tiết càng tốt/i.test(cleaned) && cleaned.length < 120) {
    return true;
  }
  return false;
}

function buildAgentPrompt({ slug, meta, inputMd }) {
  const templatePath = path.join(templatesDir(), 'agent-prompt.md');
  let template = readText(templatePath);

  return template
    .replaceAll('{{slug}}', slug)
    .replaceAll('{{createdAt}}', meta.createdAt || '')
    .replaceAll('{{title}}', meta.title || slug)
    .replaceAll('{{INPUT_MD_CONTENT}}', inputMd.trim());
}

function buildRunTxt(slug) {
  return [
    `Read and fully execute: projects/${slug}/agent-prompt.md`,
    '',
    'Rules: follow that file exactly. Load skills/ first (see skills/README.md), analyze code/, read the project input, write BOTH output files under projects/' +
      slug +
      '/output/:',
    `- projects/${slug}/output/product-request.vi.md`,
    `- projects/${slug}/output/product-request.en.md`,
    '',
    'Workspace root must be the code-to-document repo.',
    '',
  ].join('\n');
}

export function generateForProject(slug, { force = false } = {}) {
  const paths = projectPaths(slug);
  if (!exists(paths.meta)) {
    throw new Error(`Project not found: projects/${slug}`);
  }
  if (!exists(paths.input)) {
    throw new Error(`Missing input.md for projects/${slug}`);
  }
  if (!exists(sampleRequestPath())) {
    throw new Error('Missing sample-request.md at repo root.');
  }

  const meta = readJson(paths.meta);
  const inputMd = readText(paths.input);

  if (!force && isInputTooEmpty(inputMd)) {
    throw new Error(
      `input.md looks empty or still placeholder. Edit projects/${slug}/input.md then re-run generate. Use --force to override.`,
    );
  }

  const agentPrompt = buildAgentPrompt({ slug, meta, inputMd });
  writeText(paths.agentPrompt, agentPrompt);
  writeText(paths.runTxt, buildRunTxt(slug));

  meta.status = STATUS.PROMPT_READY;
  meta.updatedAt = new Date().toISOString();
  writeJson(paths.meta, meta);

  return {
    slug,
    agentPrompt: paths.agentPrompt,
    runTxt: paths.runTxt,
    pasteBlock: [
      '=== PASTE THIS INTO AI AGENT ===',
      `Read and fully execute: projects/${slug}/agent-prompt.md`,
      '(Workspace root = code-to-document)',
      '=================================',
    ].join('\n'),
  };
}

export { isInputTooEmpty };
