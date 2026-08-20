// Generated from: features\auth\auth-setup.feature
import { test } from "playwright-bdd";

test.describe('Admin authentication setup', () => {

  test('Admin can authenticate successfully', { tag: ['@auth'] }, async ({ Given, When, Then, page }) => { 
    await Given('the admin login page is opened', null, { page }); 
    await When('the admin signs in with valid role credentials', null, { page }); 
    await Then('the admin dashboard is displayed', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\auth\\auth-setup.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@auth"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the admin login page is opened","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When the admin signs in with valid role credentials","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the admin dashboard is displayed","stepMatchArguments":[]}]},
]; // bdd-data-end