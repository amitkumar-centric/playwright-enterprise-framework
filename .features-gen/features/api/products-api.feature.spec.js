// Generated from: features\api\products-api.feature
import { test } from "playwright-bdd";

test.describe('Product API', () => {

  test('Product catalogue is returned by the API', { tag: ['@smoke', '@api', '@prod-safe'] }, async ({ Given, When, Then, And, playwright }) => { 
    await Given('the product API client is configured', null, { playwright }); 
    await When('the client requests the product catalogue', null, { playwright }); 
    await Then('the API returns at least one product', null, { playwright }); 
    await And('the first product has id, name, and price values', null, { playwright }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\api\\products-api.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@smoke","@api","@prod-safe"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the product API client is configured","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When the client requests the product catalogue","stepMatchArguments":[]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the API returns at least one product","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And the first product has id, name, and price values","stepMatchArguments":[]}]},
]; // bdd-data-end