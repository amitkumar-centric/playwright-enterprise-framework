# Debugging Guide

This guide explains how to troubleshoot common failures in this Playwright framework and how to narrow issues down quickly.

## Debugging Mindset

When a test fails, try to answer these questions first:

1. did the failure come from setup, test logic, environment, or CI infrastructure
2. is it reproducible locally
3. does it fail in one browser or all browsers
4. does it fail only in one environment such as `qa` or `staging`
5. do logs, screenshots, video, trace, or correlation ID point to the failing step

## Start With the Smallest Repro

Do not debug the entire suite first. Start with the narrowest useful command.

Examples:

```bash
npx playwright test tests/ui/smoke/login.spec.ts --project=chromium
npx playwright test tests/ui/regression/login-data-driven.spec.ts --project=chromium --headed
npm run test:framework -- --env=qa --grep "@smoke" --max-failures=1
```

If the suite fails only in one browser, reduce the repro to that project.

## Where to Look First

### Test output

Check:

- terminal failure message
- failing file and line number
- browser project name

### Test artifacts

On failure, inspect:

- screenshot
- video
- `error-context.md`
- browser console attachment
- network log attachment
- `correlation-id.txt`

Common output folders:

- `test-results/`
- `playwright-report/`
- `allure-results/`

### Correlation ID

The framework generates a correlation ID per test and uses it in:

- logger output
- API request headers as `X-Correlation-Id`
- test annotation metadata
- attached `correlation-id.txt`

Use that ID to correlate:

1. framework logs
2. backend request traces
3. failure artifacts

## Common Failure Types

### 1. Locator not found

Typical symptoms:

- `expect(locator).toBeVisible()` timeout
- `locator.waitFor()` timeout
- element text changed
- page structure changed

What to check:

1. confirm the page actually navigated to the expected state
2. confirm the user is authenticated if the page requires login
3. inspect the screenshot and video
4. inspect the Page Object locator in `pages/` or `components/`
5. verify the locator is stable across browsers

What to avoid:

- adding `waitForTimeout()` as the first fix
- copying raw locators into the test file

### 2. Test timeout while setting up `page`

Typical symptom:

- `Test timeout of 60000ms exceeded while setting up "page"`

This often points to browser startup, context creation, or environment instability rather than test logic.

What to check:

1. does it fail only on Firefox or another single project
2. does it fail locally or only in CI
3. are too many workers running for the environment
4. is the machine under resource pressure

Known pattern in this repo:

- Firefox-specific setup can fail even when Chromium and WebKit pass
- in those cases, use a targeted repro with `--project=firefox`

### 3. Authentication-related failures

Typical symptom:

- dashboard never appears
- login success text is missing
- subsequent pages behave like the user is logged out

What to check:

1. confirm credentials are set correctly in `.env` or secret storage
2. inspect `tests/auth/auth.setup.ts`
3. inspect `auth/` storage state files if relevant
4. confirm the target environment URL is correct
5. rerun a single login test in headed mode

Helpful command:

```bash
npx playwright test tests/auth/auth.setup.ts --project=chromium --headed
```

### 4. API test failures

Typical symptom:

- API returns unexpected data
- response body is empty or invalid
- integration test fails before UI assertions begin

What to check:

1. verify `config.apiUrl` for the selected environment
2. inspect response logs from `services/api/ApiClient.ts`
3. use the correlation ID to trace the request on the backend side
4. confirm tokens, secrets, or test data are valid

### 5. Allure report not updated

Typical symptom:

- report opens, but latest run is missing

What to check:

1. was a new test run executed before report generation
2. does `allure-results/` contain new result files
3. did `report:allure:generate` complete successfully
4. is stale output being viewed from an older generated report

Helpful commands:

```bash
npm run test:fresh
npm run report:allure:generate
npm run report:allure
```

### 6. BrowserStack cloud failures

Typical symptoms:

- BrowserStack CLI bootstrap errors
- credentials missing in CI
- cloud suite not running on GitHub

What to check:

1. `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` exist
2. the workflow passes those secrets correctly
3. `npm run test:cloud` works locally with valid credentials
4. `playwright.cloud.config.ts` points to the expected test directory
5. CI networking is not blocking BrowserStack SDK downloads

### 7. GitHub workflow errors

Typical symptoms:

- workflow not triggering
- shell command works locally but fails in GitHub Actions
- platform-specific command like PowerShell fails on Linux

What to check:

1. the workflow trigger under `.github/workflows/`
2. whether the workflow is restricted to a branch or manual dispatch only
3. whether the script is shell-safe on Linux and Windows
4. whether secrets exist in the repository settings

Example failure pattern:

- `powershell: not found` on Ubuntu runners means the workflow used a Windows-only cleanup command

## Recommended Debug Commands

### Run one spec in headed mode

```bash
npx playwright test tests/ui/regression/login-data-driven.spec.ts --project=chromium --headed
```

### Run one test by title

```bash
npx playwright test --grep "valid admin" --project=chromium
```

### Run one tagged subset

```bash
npm run test:framework -- --env=qa --grep "@regression"
```

### Exclude known unstable suites

```bash
npm run test:framework -- --env=qa --grep "@regression" --exclude-tags=@flaky,@quarantine
```

### Run with minimal noise

```bash
npm run test:framework -- --env=qa --grep "@smoke" --max-failures=1
```

## How to Debug by Area

### UI and Page Object issues

Inspect:

- `pages/`
- `pages/components/`
- locator methods
- page navigation methods

Ask:

1. is the selector too brittle
2. is the app rendering something different in this environment
3. is the page still loading or redirected

### Data-driven test issues

Inspect:

- `data/`
- CSV or JSON test data files
- factories and loaders

Ask:

1. is the input data valid for the selected environment
2. does one data row break while others pass
3. is the test creating duplicate data

### Fixture issues

Inspect:

- `fixtures/base.fixture.ts`
- `fixtures/api.fixture.ts`
- `fixtures/diagnostics.fixture.ts`
- `fixtures/flaky.fixture.ts`

Ask:

1. did a shared fixture change break many tests at once
2. is setup order correct
3. is a fixture depending on unavailable state

### Environment issues

Inspect:

- `config/environment.config.ts`
- `config/environments/*.json`
- `.env`

Ask:

1. is `TEST_ENV` set to the intended environment
2. are the base URL and API URL correct
3. are secrets present for this environment

## Practical Debug Flow

When a failure happens, this sequence usually saves time:

1. rerun one failing test only
2. rerun it in headed Chromium
3. inspect screenshot, video, and `error-context.md`
4. inspect the corresponding Page Object or service
5. check correlation ID and logs
6. confirm whether the issue is browser-specific or environment-specific
7. fix the narrowest root cause
8. rerun only the impacted suite

## When to Skip vs Fix

Use `test.skip()` only when:

- the browser or platform limitation is known
- the reason is documented clearly
- the skip is intentionally narrow

Do not skip by default just to get the pipeline green if the root cause is still unknown.

## Useful Files During Debugging

- `playwright.config.ts`
- `playwright.cloud.config.ts`
- `scripts/run-tests.js`
- `fixtures/base.fixture.ts`
- `fixtures/diagnostics.fixture.ts`
- `pages/`
- `services/api/ApiClient.ts`
- `config/environments/`
- `.github/workflows/`

## Final Check Before Closing an Issue

Before considering a failure resolved, confirm:

1. the smallest repro now passes
2. the intended suite passes
3. related browser or environment variants were considered
4. no unnecessary skip was introduced
5. reports and artifacts still generate correctly
