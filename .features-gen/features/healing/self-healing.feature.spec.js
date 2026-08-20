// Generated from: features\healing\self-healing.feature
import { test } from "playwright-bdd";

test.describe('Self-healing login locator', () => {

  test('Self-healing recovers from a broken login button locator', { tag: ['@smoke', '@ui'] }, async ({ Given, When, Then, page }) => { 
    await Given('the user opens the OrangeHRM login page for self-healing validation', null, { page }); 
    await When('the user signs in through the self-healing login button flow', null, { page }); 
    await Then('the OrangeHRM dashboard is displayed after self-healing', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\healing\\self-healing.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@smoke","@ui"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user opens the OrangeHRM login page for self-healing validation","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When the user signs in through the self-healing login button flow","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the OrangeHRM dashboard is displayed after self-healing","stepMatchArguments":[]}]},
]; // bdd-data-end