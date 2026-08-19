# Test Writing Guide

This guide explains how to add or update tests in this Playwright framework with the same structure used by the existing suite.

## Goal

Use this guide when you want to:

1. add a new UI, API, integration, security, performance, or cloud test
2. place the test in the correct folder
3. use the framework fixtures correctly
4. tag the test for smoke, regression, prod-safe, flaky, and related runs
5. keep diagnostics, correlation ID, and reports working automatically

## Folder Structure

Place tests in the folder that matches the test purpose:

- `tests/ui/smoke/` for fast confidence checks
- `tests/ui/regression/` for broader user journey coverage
- `tests/api/` for API-only validation
- `tests/integration/` for API + UI combined checks
- `tests/security/` for security-focused coverage
- `tests/performance/` for performance assertions
- `tests/cloud/` for BrowserStack cloud execution
- `tests/flaky/` for known unstable tests under investigation
- `tests/healing/` for locator self-healing experiments or proof-of-concept tests

## Main Rules

1. Keep one Page Object per logical page.
2. Keep locators inside Page Objects or Components.
3. Keep reusable UI behavior inside Page Objects.
4. Keep assertions mainly inside tests.
5. Avoid hard-coded test data when shared data loaders or factories already exist.
6. Do not read secrets directly in tests or Page Objects.
7. Do not depend on test execution order.
8. Avoid `waitForTimeout()`.
9. Prefer Playwright auto-waiting and stable assertions.
10. Use framework fixtures instead of building your own setup in every test.

## Available Fixtures

Most tests should import from `fixtures/base.fixture.ts`:

```ts
import { test, expect } from '../../fixtures/base.fixture';
```

The shared fixture provides:

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

## Correlation ID and Diagnostics

Every test gets a generated `correlationId` through the base fixture.

What the framework does automatically:

1. creates a unique correlation ID per test
2. injects the same ID into the shared logger
3. sends the ID in API headers as `X-Correlation-Id`
4. adds the ID to test annotations
5. attaches a `correlation-id.txt` file to test output
6. captures diagnostics on failure such as screenshot, browser logs, and network logs

You do not need to implement this manually in normal tests. Just use the shared fixture.

## Tags

Use tags from `config/tag.config.ts` instead of typing string literals everywhere.

Available tags include:

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
- `Tags.crossBrowser`
- `Tags.mobile`

## Step-By-Step: Add a New Test

### 1. Choose the right folder

Put the test in the correct suite folder based on the behavior you are validating.

Examples:

- login happy path: `tests/ui/smoke/`
- employee creation: `tests/ui/regression/`
- API contract check: `tests/api/`
- product returned by API and visible in UI: `tests/integration/`

### 2. Import the shared test fixture

Use the base fixture for most framework tests:

```ts
import { test, expect } from '../../fixtures/base.fixture';
```

For API-focused tests using the lightweight API fixture, use:

```ts
import { apiTest as test } from '../../fixtures/api.fixture';
import { expect } from '@playwright/test';
```

### 3. Add clear tags

Each test should be discoverable by suite and intent.

Example:

```ts
import { Tags } from '../../config/tag.config';

test(
  'user can open products page',
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

### 4. Use Page Objects and services

Do not place raw locator logic all over the test when a Page Object already exists.

Good:

- `await loginPage.login(username, password)`
- `await productsPage.searchProduct(product.name)`
- `await productService.getFirstProduct()`

Avoid:

- large inline locator chains repeated in many tests
- direct DOM details in multiple spec files

### 5. Keep test logic readable

A good test should read like a business flow:

1. arrange test data or setup
2. perform user or API actions
3. assert the expected result

Use `test.step()` when the flow has a few meaningful checkpoints.

### 6. Use assertions in the test

Assertions should usually stay in the spec file so the behavior under validation is easy to understand.

Example:

```ts
await expect(productsPage.productName(product.name)).toBeVisible();
await expect(productsPage.productPrice(product.price)).toBeVisible();
```

### 7. Use logger messages intentionally

Prefer a few useful logs over noisy logs.

Good logger examples:

- start of the test flow
- selected test data
- important branch or retry information
- successful completion of a critical step

### 8. Handle browser-specific issues carefully

If a test is known to fail only in one browser for an environmental reason, use a targeted `test.skip()` with a clear reason.

Example:

```ts
test.skip(
  ({ browserName }) => browserName === 'firefox',
  'Skipped on Firefox because browser context setup is timing out in this environment.'
);
```

Use this only when the issue is known and documented, not as a first response to every failure.

### 9. Mark flaky tests explicitly

If a test is unstable and under investigation:

1. move it to the appropriate flaky workflow or suite if needed
2. tag it with `Tags.flaky` or `Tags.quarantine`
3. keep the reason traceable in code review or documentation

Do not leave unstable tests mixed into strict regression runs without tags.

### 10. Verify locally

Run only the test or subset you changed before pushing.

Examples:

```bash
npx playwright test tests/ui/smoke/login.spec.ts --project=chromium
npm run test:smoke
npm run test:regression
npm run lint
```

## Example Patterns

### UI Test

```ts
import { test, expect } from '../../fixtures/base.fixture';
import { Tags } from '../../config/tag.config';

test(
  'user can view the products page',
  {
    tag: [Tags.smoke, Tags.ui, Tags.prodSafe]
  },
  async ({ productsPage, logger }) => {
    logger.info('Opening products page');

    await productsPage.goto();

    await expect(productsPage.allProductsHeading).toBeVisible();

    logger.info('Products page loaded successfully');
  }
);
```

### Integration Test

```ts
import { test, expect } from '../../fixtures/base.fixture';
import { Tags } from '../../config/tag.config';

test(
  'product returned by API is visible in UI',
  {
    tag: [Tags.integration, Tags.api, Tags.prodSafe]
  },
  async ({ productService, productsPage, logger }) => {
    const product = await productService.getFirstProduct();

    logger.info(`Product selected: ${product.name}`);

    await productsPage.goto();
    await productsPage.searchProduct(product.name);

    await expect(productsPage.productName(product.name)).toBeVisible();
  }
);
```

## Common Mistakes To Avoid

- putting framework setup logic inside every test
- creating duplicate locators in spec files when a Page Object already owns them
- mixing `@prod-safe` and destructive data changes
- writing broad regression tests without proper tags
- using weak waits instead of stable assertions
- hiding failures with overly broad skips
- removing diagnostics fixtures from tests without replacing the coverage

## Review Checklist

Before submitting a test change, confirm:

1. the file is in the correct folder
2. the test name clearly describes behavior
3. the right tags are present
4. the right fixture is imported
5. Page Objects or services are reused where possible
6. assertions are clear and meaningful
7. the test is safe for its target environment
8. the test passes locally or the failure is documented
9. `npm run lint` passes

## Related Files

- `fixtures/base.fixture.ts`
- `fixtures/api.fixture.ts`
- `config/tag.config.ts`
- `pages/`
- `services/api/`
- `utils/logger/Logger.ts`
- `utils/IdHelper.ts`
