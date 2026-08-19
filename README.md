# Playwright Enterprise Framework

This repository is a Playwright-based automation framework for UI, API, integration, security, performance, flaky-test monitoring, and BrowserStack cloud execution.

It is structured to support:

- multi-environment execution
- reusable Page Objects and fixtures
- API service abstractions
- HTML, Allure, and JUnit reporting
- local and CI-friendly workflows
- correlation ID tracing and failure diagnostics

## Framework Highlights

- Playwright test execution with `chromium`, `firefox`, and `webkit`
- framework-managed runs with environment selection
- smoke, regression, flaky, quarantine, security, performance, integration, and cloud test coverage
- shared fixtures for pages, API clients, services, logging, and diagnostics
- BrowserStack cloud support for `tests/cloud/`
- Allure, Playwright HTML, and JUnit reporting
- correlation ID propagation through logs, API headers, and test artifacts
- GitHub Actions workflows for PR smoke, nightly regression, flaky monitoring, and manual BrowserStack runs

## Repository Structure

Main folders:

- `tests/` test suites
- `pages/` Page Objects and reusable UI components
- `fixtures/` shared Playwright fixtures
- `services/` API and secret-management services
- `utils/` helpers for logging, diagnostics, network capture, performance, and security
- `config/` environment, execution, reporting, role, locator, and tag configuration
- `data/` factories, loaders, models, and static test data
- `docs/` framework documentation
- `.github/workflows/` CI/CD pipelines

Test folders:

- `tests/ui/smoke/`
- `tests/ui/regression/`
- `tests/api/`
- `tests/integration/`
- `tests/security/`
- `tests/performance/`
- `tests/flaky/`
- `tests/cloud/`
- `tests/healing/`

## Supported Environments

The framework supports these runtime environments:

- `dev`
- `qa`
- `staging`
- `prod`

Environment definitions live in:

- `config/environments/dev.json`
- `config/environments/qa.json`
- `config/environments/staging.json`
- `config/environments/prod.json`

If no environment is provided, the framework defaults to `qa`.

## Installation

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

For Linux CI or a freshly provisioned machine, use:

```bash
npx playwright install --with-deps
```

## Local Configuration

Use `.env` for local credentials and secrets.

Start from:

- `.env.example`

Common variables include:

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

For BrowserStack runs, you may also need:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

## Core Commands

### Run default Playwright suite

```bash
npm test
```

### Run a clean local suite

```bash
npm run test:fresh
```

### Run framework-managed tests

```bash
npm run test:framework -- --env=qa
```

### Run smoke suite

```bash
npm run test:smoke
```

### Run regression suite

```bash
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
npm run test:bdd:fresh
```

### Run BrowserStack cloud tests

```bash
npm run test:cloud
```

### Run a single spec

```bash
npx playwright test tests/ui/smoke/login.spec.ts --project=chromium
```

### Run a tagged subset in a chosen environment

```bash
npm run test:framework -- --env=staging --grep "@regression"
```

### Exclude known unstable tags safely

```bash
npm run test:framework -- --env=qa --grep "@regression" --exclude-tags=@flaky,@quarantine
```

## Test Projects

The main Playwright configuration defines these projects:

- `admin-setup`
- `chromium`
- `firefox`
- `webkit`

Notes:

- `admin-setup` prepares shared authenticated state
- browser projects depend on `admin-setup`
- Firefox has extra launch settings to reduce environment-specific rendering instability

## Test Tagging

Tags are defined in `config/tag.config.ts`.

Common tags:

- `@smoke`
- `@regression`
- `@critical`
- `@ui`
- `@api`
- `@integration`
- `@prod-safe`
- `@non-prod`
- `@flaky`
- `@quarantine`
- `@security`
- `@performance`
- `@cloud`
- `@cross-browser`
- `@mobile`

Use the exported `Tags` object instead of repeating raw strings throughout the suite.

## Framework Architecture

### Page Objects

UI behavior and locators live under `pages/`.

Examples:

- `LoginPage`
- `DashboardPage`
- `PimPage`
- `ProductsPage`
- `HeaderComponent`
- `SidebarComponent`

### Fixtures

The shared fixture in `fixtures/base.fixture.ts` provides:

- `loginPage`
- `dashboardPage`
- `pimPage`
- `productsPage`
- `apiClient`
- `productService`
- `userService`
- `adminCredentials`
- `logger`
- `correlationId`
- `diagnostics`
- `flakyTracking`

The API-focused fixture in `fixtures/api.fixture.ts` supports API-only tests with a lightweight setup.

### Services

Service classes wrap API behavior and secret access.

Examples:

- `ApiClient`
- `ProductService`
- `UserService`
- secret provider services under `services/secrets/`

### Utilities

Utilities support:

- logging
- correlation ID generation
- flaky test tracking
- network and browser console capture
- performance measurement
- security helpers
- locator fallback behavior

## Correlation ID and Diagnostics

Each test gets a generated correlation ID.

The framework automatically:

1. generates a unique correlation ID per test
2. injects it into the shared logger
3. sends it in API headers as `X-Correlation-Id`
4. adds it to test annotations
5. attaches `correlation-id.txt` to test output
6. captures failure diagnostics such as screenshot, browser logs, and network logs

This helps trace one failing test across logs, backend requests, and artifacts.

## Reporting

The framework produces:

- Playwright HTML report
- Allure results and generated report
- JUnit XML

Paths:

- Playwright HTML: `playwright-report/`
- BrowserStack Playwright HTML: `playwright-report/cloud/`
- Allure raw results: `allure-results/`
- Allure generated report: `allure-report/`
- JUnit XML: `test-results/junit-results.xml`

Useful commands:

```bash
npm run report:playwright
npm run report:allure:generate
npm run report:allure
```

## Linting and Formatting

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

Check formatting only:

```bash
npm run format:check
```

## BrowserStack Support

Cloud-specific tests live in:

- `tests/cloud/`

The cloud config is:

- `playwright.cloud.config.ts`

GitHub Actions currently runs BrowserStack manually through:

- `.github/workflows/browserstack-cloud.yml`

Required credentials:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

## CI/CD

Current GitHub Actions workflows:

- PR smoke: `.github/workflows/pr-smoke.yml`
- nightly regression: `.github/workflows/nightly-regression.yml`
- flaky monitoring: `.github/workflows/flaky-tests.yml`
- BrowserStack cloud: `.github/workflows/browserstack-cloud.yml`

At a high level:

- PR smoke validates `@smoke` on Chromium for pull requests
- nightly regression runs scheduled sharded regression across browsers
- flaky monitoring runs scheduled `@flaky` coverage
- BrowserStack cloud runs manually with `workflow_dispatch`

## Recommended First Run

For a new machine or a fresh clone, this is a good sequence:

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
3. linting works
4. Playwright can run a real test
5. report generation is working

## Common Issues

### No tests found

Check:

- the file contains real `test(...)` blocks
- the spec is inside the configured `testDir`
- the file name matches expected Playwright patterns

### Allure report does not show the latest run

Check:

1. the latest execution created files in `allure-results/`
2. `npm run report:allure:generate` finished successfully
3. the report is being regenerated after the test run

### Firefox setup timeouts

If failures happen during `page` setup only on Firefox:

- isolate the test with `--project=firefox`
- compare against Chromium
- check machine resources or CI stability
- use targeted skip only if the issue is known and documented

### BrowserStack failures

Check:

1. BrowserStack credentials are available
2. cloud tests are under `tests/cloud/`
3. the cloud workflow or local run uses the right config
4. BrowserStack SDK bootstrap is not being blocked by the environment

### CI workflow not running

Check:

- the workflow trigger under `.github/workflows/`
- whether the workflow is manual-only
- whether the branch or event matches the trigger

## Documentation Map

Detailed docs are available in `docs/`:

- `docs/FRAMEWORK_SETUP.md`
- `docs/TEST_WRITING_GUIDE.md`
- `docs/TEST_WRITING_GUIDELINES.md`
- `docs/DEBUGGING_GUIDE.md`
- `docs/NAMING_CONVENTIONS.md`
- `docs/CI_CD_GUIDE.md`
- `docs/CONTRIBUTOR_CHECKLIST.md`

## Contributing

Before opening a pull request:

1. run the smallest relevant test subset locally
2. run `npm run lint`
3. check that tags, file placement, and naming follow the documented conventions
4. review the docs if you changed framework behavior

## Quick Start

If you only need the shortest path:

```bash
npm install
npx playwright install
npx playwright test tests/ui/smoke/login.spec.ts --project=chromium
```
