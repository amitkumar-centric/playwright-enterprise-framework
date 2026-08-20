// Generated from: features\security\security-authentication.feature
import { test } from "playwright-bdd";

test.describe('Authentication security', () => {

  test('Invalid credentials are rejected', { tag: ['@security', '@api', '@non-prod'] }, async ({ Given, When, Then, playwright }) => { 
    await Given('the authentication API is available'); 
    await When('a user attempts login with an invalid password', null, { playwright }); 
    await Then('the authentication request is rejected'); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\security\\security-authentication.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@security","@api","@non-prod"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the authentication API is available","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When a user attempts login with an invalid password","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the authentication request is rejected","stepMatchArguments":[]}]},
]; // bdd-data-end