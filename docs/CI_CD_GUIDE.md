# CI/CD Guide

This guide explains how CI/CD is set up in this repository and how the GitHub Actions workflows map to the test framework.

## CI/CD Overview

The repository currently uses GitHub Actions workflows under:

- `.github/workflows/pr-smoke.yml`
- `.github/workflows/nightly-regression.yml`
- `.github/workflows/flaky-tests.yml`
- `.github/workflows/browserstack-cloud.yml`

These workflows cover:

- pull request smoke validation
- scheduled nightly regression
- scheduled flaky test monitoring
- manual BrowserStack cloud execution

## Workflow Summary

### 1. PR Smoke Tests

Workflow file:

- `.github/workflows/pr-smoke.yml`

Trigger:

- `pull_request` to `main`
- `pull_request` to `master`

Purpose:

- validate a fast smoke subset before merging
- keep PR feedback focused and quick

Current behavior:

1. checks out the repo
2. sets up Node.js `24`
3. installs dependencies with `npm ci`
4. installs Playwright browsers with OS dependencies
5. runs TypeScript validation
6. runs the smoke subset on `chromium`
7. checks Playwright and Allure output folders
8. removes old `allure-report`
9. generates a fresh Allure report when `allure-results` exists
10. uploads reports and test artifacts

Main test command:

```bash
npm run test:framework -- --env=qa --project=chromium --grep "@smoke" --grep-invert "@flaky" --max-failures=1
```

Artifacts uploaded:

- `pr-smoke-playwright-report`
- `pr-smoke-allure-report`
- `pr-smoke-allure-results`
- `pr-smoke-test-results`

## 2. Nightly Regression

Workflow file:

- `.github/workflows/nightly-regression.yml`

Triggers:

- scheduled run
- `workflow_dispatch`

Schedule:

- cron: `30 18 * * *`

Purpose:

- run broader regression coverage automatically every day
- split work across shards and browsers

Current behavior:

1. checks out the repo
2. sets up Node.js `24`
3. installs dependencies
4. installs Playwright browsers
5. runs TypeScript validation
6. runs regression tests by browser and shard
7. uploads Playwright, Allure, and test result artifacts

Matrix:

- browsers: `chromium`, `firefox`, `webkit`
- shards: `1/4`, `2/4`, `3/4`, `4/4`

Main test command:

```bash
npm run test:framework -- --env=staging --project=<browser> --grep "@regression" --grep-invert "@flaky" --shard=<n>/4
```

Artifact pattern:

- `regression-<browser>-shard-<shard>`

## 3. Flaky Test Monitor

Workflow file:

- `.github/workflows/flaky-tests.yml`

Triggers:

- scheduled run
- `workflow_dispatch`

Schedule:

- cron: `0 20 * * *`

Purpose:

- monitor tests already marked as flaky
- isolate flaky behavior from normal smoke and regression feedback

Current behavior:

1. checks out the repo
2. sets up Node.js `20`
3. installs dependencies
4. installs Playwright browsers
5. runs flaky-tagged tests on Chromium
6. uploads Playwright report and test results

Main test command:

```bash
npm run test:framework -- --env=qa --project=chromium --grep "@flaky"
```

Artifacts uploaded:

- `flaky-playwright-report`
- `flaky-test-results`

## 4. BrowserStack Cloud Tests

Workflow file:

- `.github/workflows/browserstack-cloud.yml`

Trigger:

- `workflow_dispatch`

Purpose:

- run cloud-specific Playwright checks on BrowserStack manually
- keep BrowserStack usage intentional instead of running on every push

Current behavior:

1. checks out the repo
2. sets up Node.js `20`
3. installs dependencies
4. exports BrowserStack credentials using the BrowserStack GitHub Action
5. validates required BrowserStack environment variables
6. runs TypeScript validation
7. runs `npm run test:cloud`
8. uploads BrowserStack report and SDK logs

Main test command:

```bash
npm run test:cloud
```

Artifacts uploaded:

- `browserstack-playwright-report`
- `browserstack-sdk-logs`

## Secrets Used in CI

Current workflows rely on GitHub repository secrets such as:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

These secrets are injected into workflow environments and must be configured in GitHub before the affected pipelines can pass.

## Framework Commands Used by CI

The workflows depend on the repository scripts defined in `package.json`.

Key scripts:

- `npm run test:framework`
- `npm run test:smoke`
- `npm run test:regression`
- `npm run test:flaky`
- `npm run test:cloud`
- `npm run report:allure:generate`

The framework wrapper in `scripts/run-tests.js` is important because it:

1. sets the selected environment through `TEST_ENV`
2. validates supported environment names
3. forwards Playwright CLI args safely
4. supports `--exclude-tags=...` for shell-safe tag exclusion

## Reports and Artifacts

The CI pipelines publish different artifacts depending on the workflow.

Common artifact sources:

- `playwright-report/`
- `playwright-report/cloud/`
- `allure-results/`
- `allure-report/`
- `test-results/`
- `log/`

Use uploaded artifacts to inspect:

- screenshots
- videos
- traces when available
- Playwright HTML reports
- Allure reports
- BrowserStack SDK logs

## Environment Usage in CI

Current environment selection by workflow:

- PR smoke: `qa`
- flaky monitor: `qa`
- BrowserStack cloud: `qa`
- nightly regression: `staging`

This means the same test can behave differently across workflows if the application data or environment behavior differs between `qa` and `staging`.

## Trigger Behavior

Current trigger behavior is:

- PR smoke runs automatically on pull requests to `main` and `master`
- nightly regression runs on schedule and manually
- flaky monitor runs on schedule and manually
- BrowserStack cloud runs manually only

If a workflow does not run when expected, check the `on:` section of the relevant file first.

## How to Run Equivalent Checks Locally

### PR smoke equivalent

```bash
npm run test:framework -- --env=qa --project=chromium --grep "@smoke" --grep-invert "@flaky" --max-failures=1
```

### Nightly regression equivalent

```bash
npm run test:framework -- --env=staging --project=chromium --grep "@regression"
```

### Flaky workflow equivalent

```bash
npm run test:framework -- --env=qa --project=chromium --grep "@flaky"
```

### BrowserStack workflow equivalent

```bash
npm run test:cloud
```

## Common CI/CD Issues

### 1. Workflow does not trigger

Check:

1. the workflow trigger in `.github/workflows/<file>.yml`
2. the target branch or event type
3. whether the workflow is manual-only

Example:

- `browserstack-cloud.yml` currently runs only via `workflow_dispatch`

### 2. Linux runner fails on Windows-only commands

Typical symptom:

- `powershell: not found`

Fix:

- prefer Node-based cleanup scripts or shell-safe Linux commands in GitHub Actions

### 3. BrowserStack credentials missing

Typical symptom:

- BrowserStack environment validation step fails

Check:

1. `BROWSERSTACK_USERNAME` secret exists
2. `BROWSERSTACK_ACCESS_KEY` secret exists
3. the workflow step is exporting them correctly

### 4. Allure report missing

Typical symptom:

- no generated report artifact or empty Allure output

Check:

1. `allure-results/` was created by the test run
2. report generation step ran
3. there were actual test results before generation

### 5. Tests pass locally but fail in CI

Check:

1. environment differences between `qa` and `staging`
2. missing secrets
3. browser differences
4. timing/resource differences on runners
5. shard-specific behavior in nightly runs

## Recommended CI/CD Maintenance Rules

1. keep workflows shell-safe for Ubuntu runners
2. prefer repo scripts over long inline commands when possible
3. upload artifacts on failure and success for easier debugging
4. keep BrowserStack runs manual unless there is a clear need for automatic execution
5. keep flaky tests tagged and separated from strict smoke or regression gates
6. validate TypeScript in CI before running the heavier suites

## Files to Review When Changing CI/CD

- `package.json`
- `scripts/run-tests.js`
- `.github/workflows/pr-smoke.yml`
- `.github/workflows/nightly-regression.yml`
- `.github/workflows/flaky-tests.yml`
- `.github/workflows/browserstack-cloud.yml`
- `playwright.config.ts`
- `playwright.cloud.config.ts`

## Quick Checklist

Before updating CI/CD:

1. confirm the workflow trigger is correct
2. confirm the script works locally
3. confirm required secrets exist
4. confirm artifact paths match real output paths
5. confirm the selected environment is intentional
6. confirm Linux runner compatibility
