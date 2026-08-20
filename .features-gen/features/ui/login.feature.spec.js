// Generated from: features\ui\login.feature
import { test } from "playwright-bdd";

test.describe('Login page', () => {

  test('User reaches the login page', { tag: ['@smoke', '@ui'] }, async ({ Given, Then, page }) => { 
    await Given('the user opens the application entry page', null, { page }); 
    await Then('the login page is displayed', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\ui\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@smoke","@ui"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user opens the application entry page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Outcome","textWithKeyword":"Then the login page is displayed","stepMatchArguments":[]}]},
]; // bdd-data-end