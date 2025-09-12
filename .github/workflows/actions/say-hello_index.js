const fs = require('fs');

try {
  const name = process.env['INPUT_NAME'] || 'world';
  const loud = (process.env['INPUT_LOUD'] || 'false').toLowerCase() === 'true';

  let message = `Hello, ${name}!`;
  if (loud) message = message.toUpperCase();

  // Log for workflow logs
  console.log(message);

  // Set output using the recommended GITHUB_OUTPUT file
  const githubOutput = process.env.GITHUB_OUTPUT;
  if (githubOutput) {
    fs.appendFileSync(githubOutput, `greeting=${message}\n`);
  } else {
    // Fallback (older convention) — not recommended, but harmless if GITHUB_OUTPUT not present
    console.log(`::set-output name=greeting::${message}`);
  }
} catch (error) {
  console.error('Action failed:', error);
  // Exit non-zero on failure
  process.exit(1);
}