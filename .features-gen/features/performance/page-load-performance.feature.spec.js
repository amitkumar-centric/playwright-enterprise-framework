// Generated from: features\performance\page-load-performance.feature
import { test } from "playwright-bdd";

test.describe('Products page performance', () => {

  test('Products page loads within the performance threshold', { tag: ['@performance', '@ui', '@prod-safe'] }, async ({ Given, When, Then, page }) => { 
    await Given('the user opens the products page for performance validation', null, { page }); 
    await When('the page performance metrics are captured', null, { page }); 
    await Then('the products page load duration is within the configured threshold'); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\performance\\page-load-performance.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@performance","@ui","@prod-safe"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user opens the products page for performance validation","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When the page performance metrics are captured","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the products page load duration is within the configured threshold","stepMatchArguments":[]}]},
]; // bdd-data-end