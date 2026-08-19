# Naming Conventions

This document defines naming conventions for files, classes, fixtures, helpers, tests, and tags in this Playwright framework.

Use these conventions to keep the project predictable and easy to navigate.

## General Rules

1. Prefer clear names over short names.
2. Name by behavior or responsibility, not by implementation detail.
3. Keep naming consistent across files, classes, functions, and folders.
4. Use the same word for the same concept everywhere.
5. Avoid unnecessary abbreviations unless they are already well understood in the project.

## File Naming

### Test files

Use lowercase kebab-case for test files.

Examples:

- `login.spec.ts`
- `create-employee.spec.ts`
- `product-ui-api.spec.ts`
- `page-load.performance.spec.ts`
- `product-search.flaky.spec.ts`
- `authentication.security.spec.ts`

Recommended patterns:

- standard spec: `<feature>.spec.ts`
- security spec: `<feature>.security.spec.ts`
- flaky spec: `<feature>.flaky.spec.ts`
- performance spec: `<feature>.performance.spec.ts`

### Setup files

Use a purpose-based name with `.setup.ts`.

Example:

- `auth.setup.ts`

### Page Object files

Use PascalCase and end with `Page.ts`.

Examples:

- `LoginPage.ts`
- `DashboardPage.ts`
- `PimPage.ts`
- `ProductsPage.ts`

### Component files

Use PascalCase and end with `Component.ts`.

Examples:

- `HeaderComponent.ts`
- `SidebarComponent.ts`

### Fixture files

Use lowercase kebab-case or dot-separated purpose names and end with `.fixture.ts` where applicable.

Examples:

- `base.fixture.ts`
- `api.fixture.ts`
- `auth.fixture.ts`
- `credential.fixture.ts`
- `diagnostics.fixture.ts`
- `flaky.fixture.ts`

### Helper and utility files

Use PascalCase for utility classes and purpose-based names that describe responsibility.

Examples:

- `ErrorHelper.ts`
- `FileHelper.ts`
- `JsonHelper.ts`
- `LocatorHelper.ts`
- `PerformanceHelper.ts`
- `CookieSecurityHelper.ts`
- `SecurityHeadersHelper.ts`

## Folder Naming

Use lowercase folder names.

Examples:

- `tests/ui/smoke`
- `tests/ui/regression`
- `tests/api`
- `tests/integration`
- `tests/security`
- `tests/performance`
- `tests/cloud`
- `tests/flaky`
- `tests/healing`
- `pages/components`
- `services/api/services`

Folder names should describe test category or code responsibility, not team names or temporary work.

## Class Naming

Use PascalCase for classes.

Examples:

- `LoginPage`
- `ProductsPage`
- `ApiClient`
- `ProductService`
- `UserService`
- `Logger`
- `IdHelper`

### Suffix guidelines

Use consistent suffixes for common class types:

- `Page` for page objects
- `Component` for reusable page fragments
- `Service` for service-layer API wrappers
- `Helper` for focused utility classes
- `Manager` for orchestration classes
- `Provider` for secrets or configuration providers

## Interface and Type Naming

Use PascalCase for interfaces and types.

Examples:

- `FrameworkFixtures`
- `ApiFixtures`
- `Diagnostics`
- `LocatorCandidate`
- `Credentials`

Use names that describe the shape or contract, not the storage format.

## Variable Naming

Use camelCase for variables, function parameters, fixture names, and object properties.

Examples:

- `productsPage`
- `productService`
- `adminCredentials`
- `correlationId`
- `browserLogs`
- `networkLogs`

Prefer descriptive names:

- good: `invalidCredentialsMessage`
- good: `allProductsHeading`
- avoid: `msg`
- avoid: `obj`

## Function and Method Naming

Use camelCase and start with a verb when the method performs an action.

Examples:

- `goto()`
- `login()`
- `searchProduct()`
- `openAddEmployee()`
- `createEmployee()`
- `getFirstProduct()`
- `createCorrelationId()`
- `attachDiagnostics()`

For boolean-returning helpers, prefer names that read like a condition when practical.

Examples:

- `isRetry()`
- `isVisible()`

## Fixture Naming

Fixture names should describe the object or capability they provide.

Examples:

- `loginPage`
- `dashboardPage`
- `pimPage`
- `productsPage`
- `apiClient`
- `productService`
- `userService`
- `logger`
- `correlationId`
- `diagnostics`
- `flakyTracking`

Guidelines:

1. use nouns for provided objects
2. use short, readable names
3. avoid names that leak implementation details

## Test Title Naming

Test titles should describe expected behavior, not internal steps.

Good examples from this repo:

- `admin can create a new employee`
- `product returned by API is visible in UI`
- `products page loads within performance threshold`
- `application exposes baseline security headers`

Good test titles:

- start with the subject or expected outcome
- read clearly in reports
- describe one behavior

Avoid:

- `test login`
- `verify stuff`
- `check page`
- `scenario 1`

## Tag Naming

Tags use lowercase kebab-case with an `@` prefix.

Examples:

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

Always import tags from `config/tag.config.ts` instead of rewriting raw strings repeatedly.

## Page Object Member Naming

Use names that describe what the user sees or does.

Examples:

- `allProductsHeading`
- `invalidCredentialsMessage`
- `orangeHrmLoginButton`
- `productName(name)`
- `productPrice(price)`

Guidelines:

1. element getters should read like UI elements
2. action methods should read like user actions
3. avoid exposing selectors through vague names

## Data File Naming

Use lowercase kebab-case or descriptive lowercase names for static data files.

Examples:

- `login-users.json`
- `employees.csv`

Choose names based on domain meaning, not temporary task names.

## Environment and Config Naming

Environment files should use the environment name directly.

Examples:

- `dev.json`
- `qa.json`
- `staging.json`
- `prod.json`

Config files should describe the concern they manage.

Examples:

- `framework.config.ts`
- `environment.config.ts`
- `execution.config.ts`
- `performance.config.ts`
- `reporting.config.ts`
- `tag.config.ts`

## Acronyms and Special Terms

Be consistent with domain words already used in the repo:

- use `api` in file names when matching the repo style, such as `product-ui-api.spec.ts`
- use `API` in prose or type names where standard capitalization reads better
- keep `PimPage` aligned with the application’s PIM area naming

Do not mix multiple spellings for the same concept.

## Examples of Good Naming

Good:

- `login-data-driven.spec.ts`
- `ProductService`
- `correlationId`
- `attachDiagnostics`
- `browserstack-smoke.spec.ts`

Avoid:

- `logindata.spec.ts`
- `PS`
- `cid`
- `doStuff`
- `test1.spec.ts`

## Review Checklist

Before adding a new file or symbol, confirm:

1. the name matches the existing project style
2. the name describes responsibility clearly
3. the suffix is correct for its type
4. the file name aligns with the folder purpose
5. the test title is readable in reports
6. the tag name follows existing tag conventions

## Related Documents

- `docs/TEST_WRITING_GUIDE.md`
- `docs/TEST_WRITING_GUIDELINES.md`
- `docs/FRAMEWORK_SETUP.md`
- `config/tag.config.ts`
