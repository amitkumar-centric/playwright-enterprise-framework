// Generated from: features\security\security-headers.feature
import { test } from "playwright-bdd";

test.describe('Security headers', () => {

  test('Application exposes baseline security headers', { tag: ['@security', '@prod-safe'] }, async ({ Given, Then, page }) => { 
    await Given('the application home page is requested for security header validation', null, { page }); 
    await Then('the response includes baseline security headers'); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\security\\security-headers.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@security","@prod-safe"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the application home page is requested for security header validation","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then the response includes baseline security headers","stepMatchArguments":[]}]},
]; // bdd-data-end