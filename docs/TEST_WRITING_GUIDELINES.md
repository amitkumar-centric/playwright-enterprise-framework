# Test Writing Guidelines

This document is the short version of `docs/TEST_WRITING_GUIDE.md`.

Use this file as a quick reference when writing or reviewing tests in this framework.

## Core Principles

1. Write tests for behavior, not implementation details.
2. Keep tests readable from top to bottom.
3. Prefer stable selectors and reusable Page Objects.
4. Keep assertions explicit and close to the behavior being verified.
5. Reuse shared fixtures instead of rebuilding setup in each test.

## File Placement

Put tests in the correct suite:

- `tests/ui/smoke/` for fast validation
- `tests/ui/regression/` for broader UI coverage
- `tests/api/` for API-only checks
- `tests/integration/` for API + UI flows
- `tests/security/` for security checks
- `tests/performance/` for performance assertions
- `tests/cloud/` for BrowserStack cloud runs
- `tests/flaky/` for unstable tests under investigation
- `tests/healing/` for self-healing experiments

## Imports

For most tests, use:

```ts
import { test, expect } from '../../fixtures/base.fixture';
```

For API-focused tests, use the API fixture when appropriate:

```ts
import { apiTest as test } from '../../fixtures/api.fixture';
import { expect } from '@playwright/test';
```

## Required Conventions

1. Use `Tags` from `config/tag.config.ts`.
2. Keep locators in `pages/` or component classes, not scattered in specs.
3. Keep business actions in Page Objects or services.
4. Keep test data in `data/` when it is reusable.
5. Use `test.step()` for meaningful checkpoints in longer flows.
6. Prefer framework logging over ad hoc console output in tests.

## Tags

Common tags:

- `Tags.smoke`
- `Tags.regression`
- `Tags.critical`
- `Tags.ui`
- `Tags.api`
- `Tags.integration`
- `Tags.prodSafe`
- `Tags.nonProd`
- `Tags.flaky`
- `Tags.quarantine`
- `Tags.security`
- `Tags.performance`
- `Tags.cloud`

Every test should have tags that make its purpose and execution scope clear.

## What the Framework Already Gives You

The base fixture already handles:

- page and service fixtures
- shared logger
- per-test correlation ID
- API request correlation header
- diagnostics attachments on failure
- flaky retry tracking hooks

Do not duplicate this logic inside spec files.

## Good Test Shape

A good test usually follows this pattern:

1. arrange data or starting state
2. perform the user or API action
3. assert the expected result

Example:

```ts
test(
  'user can view products',
  {
    tag: [Tags.smoke, Tags.ui, Tags.prodSafe]
  },
  async ({ productsPage, logger }) => {
    logger.info('Opening products page');

    await productsPage.goto();

    await expect(productsPage.allProductsHeading).toBeVisible();
  }
);
```

## Avoid These Patterns

- hard-coded waits like `waitForTimeout()`
- repeated raw locators across tests
- large setup blocks duplicated in multiple specs
- broad browser skips without a clear reason
- using `@prod-safe` on data-destructive tests
- mixing flaky tests into standard regression runs without tagging them

## Browser-Specific Handling

If a test is known to fail only in one browser because of an environmental or framework issue, use a targeted skip with a clear message.

Example:

```ts
test.skip(
  ({ browserName }) => browserName === 'firefox',
  'Skipped on Firefox because browser context setup is timing out in this environment.'
);
```

Use this carefully. Prefer fixing the root cause when possible.

## Logging and Correlation

Use the shared `logger` fixture for important actions:

- test start
- important data selection
- retries
- critical transitions

Each test already gets a correlation ID. That helps trace:

1. logs
2. API requests
3. attachments and failure context

## Review Checklist

Before merging a test:

1. the spec is in the correct folder
2. the title clearly describes the behavior
3. the correct tags are present
4. shared fixtures are used
5. Page Objects or services are reused
6. assertions are meaningful
7. the environment safety tag is correct
8. lint passes
9. the changed test or suite was rerun locally

## Related Documents

- `docs/TEST_WRITING_GUIDE.md`
- `docs/FRAMEWORK_SETUP.md`
- `docs/DEBUGGING_GUIDE.md`
