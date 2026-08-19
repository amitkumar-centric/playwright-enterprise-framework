# Framework Setup

This guide explains how to set up and run the Playwright Enterprise Framework locally and in CI-friendly ways.

## What This Framework Includes

This project is a Playwright-based automation framework with:

- UI, API, integration, security, performance, flaky, and cloud test suites
- shared fixtures for pages, services, logging, diagnostics, and correlation ID
- environment-based execution for `dev`, `qa`, `staging`, and `prod`
- HTML, Allure, and JUnit reporting
- optional BrowserStack cloud execution

## Prerequisites

Install these before running the framework:

1. Node.js `20.x`
2. npm
3. Playwright browser dependencies
4. Allure CLI availability through the installed npm package

Recommended:

- use a recent Node 20 build
- run from PowerShell or a CI shell with Node on the path

## Project Installation

From the project root:

```bash
npm install
```

Install Playwright browsers if needed:

```bash
npx playwright install
```

If your machine is new or CI is freshly provisioned, this is usually required before the first UI run.

## Environment Configuration

The framework resolves its runtime environment from `TEST_ENV`.

Supported environments:

- `dev`
- `qa`
- `staging`
- `prod`

Environment files live in:

- `config/environments/dev.json`
- `config/environments/qa.json`
- `config/environments/staging.json`
- `config/environments/prod.json`

If no environment is provided, the framework defaults to `qa`.

## Secrets and Local Variables

Use `.env` for local secrets and credentials. The example template is:

- `.env.example`

Typical variables include:

- `SECRET_PROVIDER`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `USER_USERNAME`
- `USER_PASSWORD`
- `STANDARD_USER_USERNAME`
- `STANDARD_USER_PASSWORD`
- `READONLY_USER_USERNAME`
- `READONLY_USER_PASSWORD`
- `API_CLIENT_ID`
- `API_CLIENT_SECRET`
- `DB_USERNAME`
- `DB_PASSWORD`

Create a local `.env` file before running tests that require credentials.

## Core Test Commands

### Run the default Playwright suite

```bash
npm test
```

This runs:

```bash
npx playwright test
```

### Run a clean local execution

```bash
npm run test:fresh
```

This clears previous reports and reruns the suite.

### Run framework-managed tests with environment support

```bash
npm run test:framework -- --env=qa
```

The framework runner:

1. validates the environment
2. sets `TEST_ENV`
3. forwards Playwright CLI arguments safely
4. supports tag exclusion through `--exclude-tags=...`

Example:

```bash
npm run test:framework -- --env=staging --grep "@regression"
```

### Run smoke and regression suites

```bash
npm run test:smoke
npm run test:regression
```

### Run flaky and quarantine suites

```bash
npm run test:flaky
npm run test:quarantine
npm run test:flaky:investigate
```

### Run BDD mode

```bash
npm run test:bdd
```

Clean BDD run:

```bash
npm run test:bdd:fresh
```

## Browser Projects

The main Playwright config defines these projects:

- `admin-setup`
- `chromium`
- `firefox`
- `webkit`

Notes:

- `admin-setup` prepares shared authenticated state
- browser projects depend on `admin-setup`
- Firefox includes extra launch settings to reduce rendering-related instability

Run a single project:

```bash
npx playwright test --project=chromium
```

Run a single file:

```bash
npx playwright test tests/ui/smoke/login.spec.ts --project=chromium
```

## Reports

The framework produces:

- Playwright HTML report
- Allure results
- JUnit XML

### Show Playwright report

```bash
npm run report:playwright
```

### Generate and open Allure report

```bash
npm run report:allure
```

### Generate Allure without opening

```bash
npm run report:allure:generate
```

Important:

- tests must produce files in `allure-results/`
- `report:allure:generate` rebuilds `allure-report/`
- if `allure-results/` is empty, the report will not reflect a new run

## Lint and Formatting

Run lint:

```bash
npm run lint
```

Auto-fix lint issues:

```bash
npm run lint:fix
```

Format the repo:

```bash
npm run format
```

Check formatting without rewriting files:

```bash
npm run format:check
```

Note:

- if a referenced file is missing, repo-wide formatting can fail until that path issue is corrected

## BrowserStack Cloud Setup

Cloud execution uses:

```bash
npm run test:cloud
```

This runs the cloud config in `playwright.cloud.config.ts`.

Required credentials:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

You can set them in:

- local environment variables
- `.env` if your local bootstrap loads them
- GitHub repository secrets for CI

Cloud tests are stored under:

- `tests/cloud/`

Cloud Playwright HTML report output:

- `playwright-report/cloud/`

## Recommended First Run

For a first local setup, run:

```bash
npm install
npx playwright install
npm run lint
npx playwright test tests/ui/smoke/login.spec.ts --project=chromium
npm run report:allure:generate
```

This confirms:

1. dependencies are installed
2. browsers are installed
3. linting is healthy
4. Playwright can execute a real test
5. Allure results can be generated

## Common Setup Problems

### 1. No tests found

Check:

- the file contains real `test(...)` blocks
- the file is under the configured `testDir`
- the file name matches Playwright expectations

### 2. Allure report does not update

Check:

1. the latest test run actually created files in `allure-results/`
2. old report output was removed before regeneration
3. `npm run report:allure:generate` completed successfully

### 3. `powershell: not found` in Linux CI

Use Node-based cleanup commands instead of PowerShell-only cleanup in package scripts or workflows.

### 4. BrowserStack fails in CI

Check:

1. BrowserStack secrets exist in GitHub
2. the workflow exports them correctly
3. the cloud suite is pointing to `playwright.cloud.config.ts`
4. network restrictions are not blocking BrowserStack SDK assets

### 5. Windows shell parsing issues

If a regex or tag pattern contains shell-sensitive characters, prefer the framework wrapper:

```bash
npm run test:framework -- --env=qa --grep "@regression" --exclude-tags=@flaky,@quarantine
```

## Related Files

- `package.json`
- `scripts/run-tests.js`
- `playwright.config.ts`
- `playwright.cloud.config.ts`
- `config/environment.config.ts`
- `config/environments/`
- `.env.example`
- `fixtures/base.fixture.ts`
