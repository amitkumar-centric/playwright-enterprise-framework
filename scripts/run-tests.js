const { spawnSync } = require('child_process');

const args = process.argv.slice(2);

const envArgument = args.find(arg => arg.startsWith('--env='));
const modeArgument = args.find(arg => arg.startsWith('--mode='));

let environment = 'qa';
let mode = 'playwright';

if (envArgument) {
  environment = envArgument.split('=')[1];
}

if (modeArgument) {
  mode = modeArgument.split('=')[1];
}

const supportedEnvironments = [
  'dev',
  'qa',
  'staging',
  'prod'
];

const supportedModes = [
  'playwright',
  'bdd'
];

if (!supportedEnvironments.includes(environment)) {
  console.error(`Invalid environment: ${environment}`);
  console.error(
    `Supported environments: ${supportedEnvironments.join(', ')}`
  );
  process.exit(1);
}

if (!supportedModes.includes(mode)) {
  console.error(`Invalid mode: ${mode}`);
  console.error(
    `Supported modes: ${supportedModes.join(', ')}`
  );
  process.exit(1);
}

console.log(
  `Mode: ${mode.toUpperCase()} | Environment: ${environment.toUpperCase()}`
);

const playwrightArgs = args.filter(
  arg => !arg.startsWith('--env=') && !arg.startsWith('--mode=')
);

const env = {
  ...process.env,
  TEST_ENV: environment
};

if (mode === 'bdd') {
  const generationResult = spawnSync(
    'npx',
    [
      'bddgen',
      'test',
      '-c',
      'playwright-bdd.config.ts'
    ],
    {
      stdio: 'inherit',
      shell: true,
      env
    }
  );

  if (generationResult.status !== 0) {
    process.exit(generationResult.status ?? 1);
  }
}

const commandArgs = mode === 'bdd'
  ? [
      'playwright',
      'test',
      '-c',
      'playwright-bdd.config.ts',
      ...playwrightArgs
    ]
  : [
      'playwright',
      'test',
      ...playwrightArgs
    ];

const result = spawnSync(
  'npx',
  commandArgs,
  {
    stdio: 'inherit',
    shell: true,
    env
  }
);

process.exit(result.status ?? 1);
