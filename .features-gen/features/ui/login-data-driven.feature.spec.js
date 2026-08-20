// Generated from: features\ui\login-data-driven.feature
import { test } from "playwright-bdd";

test.describe('Login validation with test data', () => {

  test.describe('Login validation for named test data', () => {

    test('Example #1', { tag: ['@regression', '@ui', '@non-prod'] }, async ({ Given, When, Then, page }) => { 
      await Given('the login page is ready for data-driven validation', null, { page }); 
      await When('the user signs in using login data "valid admin"', null, { page }); 
      await Then('the login result matches "success"', null, { page }); 
    });

    test('Example #2', { tag: ['@regression', '@ui', '@non-prod'] }, async ({ Given, When, Then, page }) => { 
      await Given('the login page is ready for data-driven validation', null, { page }); 
      await When('the user signs in using login data "invalid user"', null, { page }); 
      await Then('the login result matches "failure"', null, { page }); 
    });

  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\ui\\login-data-driven.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":14,"tags":["@regression","@ui","@non-prod"],"steps":[{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the login page is ready for data-driven validation","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When the user signs in using login data \"valid admin\"","stepMatchArguments":[{"group":{"start":35,"value":"\"valid admin\"","children":[{"start":36,"value":"valid admin","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the login result matches \"success\"","stepMatchArguments":[{"group":{"start":25,"value":"\"success\"","children":[{"start":26,"value":"success","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":14,"pickleLine":15,"tags":["@regression","@ui","@non-prod"],"steps":[{"pwStepLine":15,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the login page is ready for data-driven validation","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When the user signs in using login data \"invalid user\"","stepMatchArguments":[{"group":{"start":35,"value":"\"invalid user\"","children":[{"start":36,"value":"invalid user","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the login result matches \"failure\"","stepMatchArguments":[{"group":{"start":25,"value":"\"failure\"","children":[{"start":26,"value":"failure","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end