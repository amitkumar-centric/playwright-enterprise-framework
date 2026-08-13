// Generated from: features\login.feature
import { test } from "playwright-bdd";

test.describe('Login page', () => {

  test('User reaches the login page', async ({ Given, Then, page }) => { 
    await Given('the user opens the application entry page', null, { page }); 
    await Then('the login page is displayed', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":6,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the user opens the application entry page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then the login page is displayed","stepMatchArguments":[]}]},
]; // bdd-data-end