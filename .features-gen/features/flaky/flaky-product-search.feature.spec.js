// Generated from: features\flaky\flaky-product-search.feature
import { test } from "playwright-bdd";

test.describe('Flaky product search', () => {

  test('Product search displays Blue Top', { tag: ['@regression', '@ui', '@flaky', '@quarantine'] }, async ({ Given, When, Then, page }) => { 
    await Given('the user opens the products page for flaky monitoring', null, { page }); 
    await When('the user searches for flaky product "Blue Top"', null, { page }); 
    await Then('the flaky search results include product "Blue Top"', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\flaky\\flaky-product-search.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@regression","@ui","@flaky","@quarantine"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the user opens the products page for flaky monitoring","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When the user searches for flaky product \"Blue Top\"","stepMatchArguments":[{"group":{"start":36,"value":"\"Blue Top\"","children":[{"start":37,"value":"Blue Top","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the flaky search results include product \"Blue Top\"","stepMatchArguments":[{"group":{"start":41,"value":"\"Blue Top\"","children":[{"start":42,"value":"Blue Top","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end