import readline from 'node:readline';

export function ask(question, { defaultValue = '' } = {}) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const suffix = defaultValue ? ` (${defaultValue})` : '';
  return new Promise((resolve) => {
    rl.question(`${question}${suffix}: `, (answer) => {
      rl.close();
      const value = String(answer || '').trim();
      resolve(value || defaultValue);
    });
  });
}
