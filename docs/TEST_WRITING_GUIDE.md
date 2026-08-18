1. One Page Object per logical page.
2. Keep locators inside Page Objects.
3. Keep reusable UI behavior inside Page Objects.
4. Keep test assertions primarily inside tests.
5. Avoid hard-coded test data inside Page Objects.
6. Do not read secrets directly inside Page Objects.
7. Page Objects should not depend on test order.
8. Avoid waitForTimeout().
9. Prefer Playwright auto-waiting.
10. Reusable cross-page elements belong in Components.