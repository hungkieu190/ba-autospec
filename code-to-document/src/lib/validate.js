import { OUTPUT_SECTIONS, STATUS } from '../config.js';
import { projectPaths } from './paths.js';
import { exists, readJson, readText, writeJson } from './fs-utils.js';
import { isInputTooEmpty } from './prompt-builder.js';

function missingSections(content) {
  const missing = [];
  for (const section of OUTPUT_SECTIONS) {
    const re = new RegExp(`^##\\s+${section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'm');
    if (!re.test(content)) missing.push(section);
  }
  return missing;
}

function hasPlaceholderFeatures(content) {
  return /-\s*Feature\s+[123]\b/i.test(content) || /-\s*Item\s+[12]\b/i.test(content);
}

export function validateProject(slug) {
  const paths = projectPaths(slug);
  const report = {
    slug,
    ok: true,
    errors: [],
    warnings: [],
    checks: {},
  };

  if (!exists(paths.meta)) {
    report.ok = false;
    report.errors.push(`Project not found: projects/${slug}`);
    return report;
  }

  const meta = readJson(paths.meta);
  report.checks.meta = true;

  if (!exists(paths.input)) {
    report.ok = false;
    report.errors.push('Missing input.md');
  } else {
    const input = readText(paths.input);
    report.checks.inputExists = true;
    if (isInputTooEmpty(input)) {
      report.warnings.push('input.md still looks sparse/placeholder');
      report.checks.inputFilled = false;
    } else {
      report.checks.inputFilled = true;
    }
  }

  report.checks.agentPrompt = exists(paths.agentPrompt);
  report.checks.runTxt = exists(paths.runTxt);
  if (!report.checks.agentPrompt) {
    report.warnings.push('agent-prompt.md not generated yet (run npm run generate)');
  }

  const outputs = [
    { key: 'vi', file: paths.outputVi, label: 'product-request.vi.md' },
    { key: 'en', file: paths.outputEn, label: 'product-request.en.md' },
  ];

  let bothOutputs = true;
  for (const out of outputs) {
    if (!exists(out.file)) {
      bothOutputs = false;
      report.checks[out.key] = { exists: false };
      report.warnings.push(`Missing output: ${out.label}`);
      continue;
    }
    const content = readText(out.file);
    const missing = missingSections(content);
    const placeholders = hasPlaceholderFeatures(content);
    report.checks[out.key] = {
      exists: true,
      missingSections: missing,
      hasPlaceholders: placeholders,
    };
    if (missing.length) {
      report.ok = false;
      report.errors.push(`${out.label} missing sections: ${missing.join(', ')}`);
    }
    if (placeholders) {
      report.warnings.push(`${out.label} still has template placeholders (Feature 1 / Item 1)`);
    }
  }

  if (bothOutputs && report.ok) {
    meta.status = STATUS.DOCUMENTED;
    meta.updatedAt = new Date().toISOString();
    writeJson(paths.meta, meta);
    report.checks.status = STATUS.DOCUMENTED;
  } else {
    report.checks.status = meta.status;
  }

  return report;
}
