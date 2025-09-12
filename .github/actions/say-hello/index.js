const fs = require('fs');

try {
  const name = process.env['INPUT_NAME'] || 'world';
  const loud = (process.env['INPUT_LOUD'] || 'false').toLowerCase() === 'true';

  let message = `Hello, ${name}!`;
  if (loud) message = message.toUpperCase();

  console.log(message);

  const githubOutput = process.env.GITHUB_OUTPUT;
  if (githubOutput) {
    fs.appendFileSync(githubOutput, `greeting=${message}\n`);
  } else {
    console.log(`::set-output name=greeting::${message}`);
  }
} catch (error) {
  console.error('Action failed:', error);
  process.exit(1);
}