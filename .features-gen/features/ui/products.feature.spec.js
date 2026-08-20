// Generated from: features\ui\products.feature
import { test } from "playwright-bdd";

test.describe('Products page', () => {

  test('User views the products listing', { tag: ['@smoke', '@ui', '@prod-safe'] }, async ({ Given, Then, page }) => { 
    await Given('the user opens the products page', null, { page }); 
    await Then('the all products heading is displayed', null, { page }); 
  });

  test('User searches for a product', { tag: ['@smoke', '@ui', '@prod-safe'] }, async ({ Given, When, Then, And, page }) => { 
    await Given('the user opens the products page', null, { page }); 
    await When('the user searches for "Blue Top"', null, { page }); 
    await Then('the searched products heading is displayed', null, { page }); 
    await And('the product "Blue Top" is visible in the results', null, { page }); 
  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\ui\\products.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":["@smoke","@ui","@prod-safe"],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given the user opens the products page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Outcome","textWithKeyword":"Then the all products heading is displayed","stepMatchArguments":[]}]},
  {"pwTestLine":11,"pickleLine":8,"tags":["@smoke","@ui","@prod-safe"],"steps":[{"pwStepLine":12,"gherkinStepLine":9,"keywordType":"Context","textWithKeyword":"Given the user opens the products page","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When the user searches for \"Blue Top\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Blue Top\"","children":[{"start":23,"value":"Blue Top","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"Then the searched products heading is displayed","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"And the product \"Blue Top\" is visible in the results","stepMatchArguments":[{"group":{"start":12,"value":"\"Blue Top\"","children":[{"start":13,"value":"Blue Top","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end