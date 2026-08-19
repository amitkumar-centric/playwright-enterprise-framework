import { spawnSync } from 'child_process';

const args = process.argv.slice(2);

const envArgument = args.find((arg) => arg.startsWith('--env='));

let environment = 'qa';

if (envArgument) {
  environment = envArgument.split('=')[1];
}

const supportedEnvironments = ['dev', 'qa', 'staging', 'prod'];

if (!supportedEnvironments.includes(environment)) {
  console.error(`Invalid environment: ${environment}`);

  console.error(`Supported environments: ${supportedEnvironments.join(', ')}`);

  process.exit(1);
}

console.log(`Environment: ${environment.toUpperCase()}`);

const playwrightArgs = args.filter((arg) => !arg.startsWith('--env='));

const result = spawnSync('npx', ['playwright', 'test', ...playwrightArgs], {
  stdio: 'inherit',

  shell: true,

  env: {
    ...process.env,

    TEST_ENV: environment
  }
});

process.exit(result.status ?? 1);
