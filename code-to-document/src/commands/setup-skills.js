import { setupSkills } from '../lib/skills.js';

export async function setupSkillsCommand() {
  const results = setupSkills();
  let ok = 0;
  let fail = 0;
  for (const r of results) {
    if (r.ok) {
      ok += 1;
      console.log(`✓ ${r.dest}`);
    } else {
      fail += 1;
      console.error(`✗ ${r.name}: ${r.error}`);
    }
  }
  console.log('');
  console.log(`Done. ok=${ok} fail=${fail}`);
  if (fail) process.exitCode = 1;
}
