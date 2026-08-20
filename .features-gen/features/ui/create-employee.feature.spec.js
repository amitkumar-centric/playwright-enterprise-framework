// Generated from: features\ui\create-employee.feature
import { test } from "playwright-bdd";

test.describe('Employee management', () => {

  test('Admin creates a new employee', { tag: ['@regression', '@critical', '@ui', '@non-prod'] }, async ({ Given, When, Then, page }) => { 
    await Given('the admin is logged into the employee management application', null, { page }); 
    await When('the admin creates a new employee record using data version "v1"', null, { page }); 
    await Then('the personal details page is displayed', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\ui\\create-employee.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@regression","@critical","@ui","@non-prod"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the admin is logged into the employee management application","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When the admin creates a new employee record using data version \"v1\"","stepMatchArguments":[{"group":{"start":59,"value":"\"v1\"","children":[{"start":60,"value":"v1","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the personal details page is displayed","stepMatchArguments":[]}]},
]; // bdd-data-end