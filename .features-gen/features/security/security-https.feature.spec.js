// Generated from: features\security\security-https.feature
import { test } from "playwright-bdd";

test.describe('HTTPS enforcement', () => {

  test('Application uses HTTPS', { tag: ['@security', '@prod-safe'] }, async ({ Given, Then }) => { 
    await Given('the application base URL is configured'); 
    await Then('the application protocol is HTTPS'); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\security\\security-https.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@security","@prod-safe"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the application base URL is configured","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then the application protocol is HTTPS","stepMatchArguments":[]}]},
]; // bdd-data-end