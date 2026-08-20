// Generated from: features\api\product-ui-api.feature
import { test } from "playwright-bdd";

test.describe('Product API and UI integration', () => {

  test('Product returned by API is visible in UI', { tag: ['@integration', '@api', '@prod-safe'] }, async ({ Given, When, Then, And, page, playwright }) => { 
    await Given('the product API returns a valid product', null, { playwright }); 
    await When('the user searches for the API product on the products page', null, { page }); 
    await Then('the API product name is visible in the UI', null, { page }); 
    await And('the API product price is visible in the UI', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\api\\product-ui-api.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@integration","@api","@prod-safe"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the product API returns a valid product","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When the user searches for the API product on the products page","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the API product name is visible in the UI","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And the API product price is visible in the UI","stepMatchArguments":[]}]},
]; // bdd-data-end