// Generated from: features\ui\login-data-csv-driven.feature
import { test } from "playwright-bdd";

test.describe('Employee creation with CSV data', () => {

  test.describe('Admin creates an employee from CSV data', () => {

    test('Example #1', { tag: ['@regression', '@ui', '@non-prod'] }, async ({ Given, When, Then, page }) => { 
      await Given('the admin is logged into the employee management application for CSV employee creation', null, { page }); 
      await When('the admin creates employee record from CSV data "Amit" "Kumar" "Singh"', null, { page }); 
      await Then('the employee personal details page is displayed for CSV employee creation', null, { page }); 
    });

    test('Example #2', { tag: ['@regression', '@ui', '@non-prod'] }, async ({ Given, When, Then, page }) => { 
      await Given('the admin is logged into the employee management application for CSV employee creation', null, { page }); 
      await When('the admin creates employee record from CSV data "John" "Michael" "Smith"', null, { page }); 
      await Then('the employee personal details page is displayed for CSV employee creation', null, { page }); 
    });

    test('Example #3', { tag: ['@regression', '@ui', '@non-prod'] }, async ({ Given, When, Then, page }) => { 
      await Given('the admin is logged into the employee management application for CSV employee creation', null, { page }); 
      await When('the admin creates employee record from CSV data "Priya" "Rani" "Sharma"', null, { page }); 
      await Then('the employee personal details page is displayed for CSV employee creation', null, { page }); 
    });

  });

});

// == technical section ==

test.beforeEach('BeforeEach Hooks', ({ $runScenarioHooks, browserName }) => $runScenarioHooks('before', { browserName }));

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\ui\\login-data-csv-driven.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":8,"pickleLine":14,"tags":["@regression","@ui","@non-prod"],"steps":[{"pwStepLine":9,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the admin is logged into the employee management application for CSV employee creation","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When the admin creates employee record from CSV data \"Amit\" \"Kumar\" \"Singh\"","stepMatchArguments":[{"group":{"start":48,"value":"\"Amit\"","children":[{"start":49,"value":"Amit","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":55,"value":"\"Kumar\"","children":[{"start":56,"value":"Kumar","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":63,"value":"\"Singh\"","children":[{"start":64,"value":"Singh","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the employee personal details page is displayed for CSV employee creation","stepMatchArguments":[]}]},
  {"pwTestLine":14,"pickleLine":15,"tags":["@regression","@ui","@non-prod"],"steps":[{"pwStepLine":15,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the admin is logged into the employee management application for CSV employee creation","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When the admin creates employee record from CSV data \"John\" \"Michael\" \"Smith\"","stepMatchArguments":[{"group":{"start":48,"value":"\"John\"","children":[{"start":49,"value":"John","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":55,"value":"\"Michael\"","children":[{"start":56,"value":"Michael","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":65,"value":"\"Smith\"","children":[{"start":66,"value":"Smith","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the employee personal details page is displayed for CSV employee creation","stepMatchArguments":[]}]},
  {"pwTestLine":20,"pickleLine":16,"tags":["@regression","@ui","@non-prod"],"steps":[{"pwStepLine":21,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given the admin is logged into the employee management application for CSV employee creation","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When the admin creates employee record from CSV data \"Priya\" \"Rani\" \"Sharma\"","stepMatchArguments":[{"group":{"start":48,"value":"\"Priya\"","children":[{"start":49,"value":"Priya","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":56,"value":"\"Rani\"","children":[{"start":57,"value":"Rani","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":63,"value":"\"Sharma\"","children":[{"start":64,"value":"Sharma","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then the employee personal details page is displayed for CSV employee creation","stepMatchArguments":[]}]},
]; // bdd-data-end