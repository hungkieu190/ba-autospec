#!/usr/bin/env node
import { initCommand } from './commands/init.js';
import { generateCommand } from './commands/generate.js';
import { validateCommand } from './commands/validate.js';
import { listCommand } from './commands/list.js';
import { setupSkillsCommand } from './commands/setup-skills.js';

function printHelp() {
  console.log(`code-to-document (c2d)

Usage:
  npm run init
  npm run generate -- --project <slug> [--force]
  npm run validate -- --project <slug>
  npm run list
  npm run setup:skills

  node src/cli.js <command> [options]
  c2d <command> [options]

Commands:
  init            Create a new project under projects/
  generate        Build agent-prompt.md + RUN.txt from input.md
  validate        Check input/output structure
  list            List projects and status
  setup-skills    Copy required skills from all-skills/ into skills/

Options:
  --project, -p   Project slug
  --name, -n      Alias for project name/slug (init/generate)
  --title         Display title (init)
  --note          Short note (init)
  --force, -f     Generate even if input looks empty
  --help, -h      Show help
`);
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const options = {
    _: [],
    project: '',
    name: '',
    title: '',
    note: '',
    force: false,
    help: false,
  };

  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a === '--help' || a === '-h') {
      options.help = true;
    } else if (a === '--force' || a === '-f') {
      options.force = true;
    } else if (a === '--project' || a === '-p') {
      options.project = args[++i] || '';
    } else if (a === '--name' || a === '-n') {
      options.name = args[++i] || '';
    } else if (a === '--title') {
      options.title = args[++i] || '';
    } else if (a === '--note') {
      options.note = args[++i] || '';
    } else if (a.startsWith('--project=')) {
      options.project = a.slice('--project='.length);
    } else if (a.startsWith('--name=')) {
      options.name = a.slice('--name='.length);
    } else if (a.startsWith('-')) {
      throw new Error(`Unknown option: ${a}`);
    } else {
      options._.push(a);
    }
  }

  return options;
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv);
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
    return;
  }

  if (options.help || options._.length === 0) {
    printHelp();
    return;
  }

  const command = options._[0];

  try {
    switch (command) {
      case 'init':
        await initCommand(options);
        break;
      case 'generate':
        await generateCommand(options);
        break;
      case 'validate':
        await validateCommand(options);
        break;
      case 'list':
        await listCommand();
        break;
      case 'setup-skills':
      case 'setup:skills':
        await setupSkillsCommand();
        break;
      default:
        console.error(`Unknown command: ${command}`);
        printHelp();
        process.exitCode = 1;
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exitCode = 1;
  }
}

main();
