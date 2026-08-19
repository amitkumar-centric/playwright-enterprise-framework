const { spawnSync } = require('child_process');
const path = require('path');

const args = process.argv.slice(2);
const nodeCommand = process.execPath;
const playwrightCliPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'playwright',
  'cli.js'
);
const bddCliPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'playwright-bdd',
  'dist',
  'cli',
  'index.js'
);

const envArgument = args.find((arg) => arg.startsWith('--env='));
const modeArgument = args.find((arg) => arg.startsWith('--mode='));
const excludeTagsArgument = args.find((arg) =>
  arg.startsWith('--exclude-tags=')
);

let environment = 'qa';
let mode = 'playwright';

if (envArgument) {
  environment = envArgument.split('=')[1];
}

if (modeArgument) {
  mode = modeArgument.split('=')[1];
}

const supportedEnvironments = ['dev', 'qa', 'staging', 'prod'];

const supportedModes = ['playwright', 'bdd'];

if (!supportedEnvironments.includes(environment)) {
  console.error(`Invalid environment: ${environment}`);
  console.error(`Supported environments: ${supportedEnvironments.join(', ')}`);
  process.exit(1);
}

if (!supportedModes.includes(mode)) {
  console.error(`Invalid mode: ${mode}`);
  console.error(`Supported modes: ${supportedModes.join(', ')}`);
  process.exit(1);
}

console.log(
  `Mode: ${mode.toUpperCase()} | Environment: ${environment.toUpperCase()}`
);

const playwrightArgs = args.filter(
  (arg) =>
    !arg.startsWith('--env=') &&
    !arg.startsWith('--mode=') &&
    !arg.startsWith('--exclude-tags=')
);

if (excludeTagsArgument) {
  const excludeTags = excludeTagsArgument
    .split('=')[1]
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

  if (excludeTags.length > 0) {
    playwrightArgs.push(`--grep-invert=${excludeTags.join('|')}`);
  }
}

const env = {
  ...process.env,
  TEST_ENV: environment
};

if (mode === 'bdd') {
  const generationResult = spawnSync(
    nodeCommand,
    [bddCliPath, 'test', '-c', 'playwright-bdd.config.ts'],
    {
      stdio: 'inherit',
      env
    }
  );

  if (generationResult.error) {
    console.error(generationResult.error.message);
    process.exit(1);
  }

  if (generationResult.status !== 0) {
    process.exit(generationResult.status ?? 1);
  }
}

const commandArgs =
  mode === 'bdd'
    ? ['test', '-c', 'playwright-bdd.config.ts', ...playwrightArgs]
    : ['test', ...playwrightArgs];

const result = spawnSync(nodeCommand, [playwrightCliPath, ...commandArgs], {
  stdio: 'inherit',
  env
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
