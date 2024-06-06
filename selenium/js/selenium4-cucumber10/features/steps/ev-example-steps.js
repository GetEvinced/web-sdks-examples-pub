const {Given, Then, When} = require('@cucumber/cucumber');
const {HomePage} = require('../../pages/home.page');
const {SecondPage} = require('../../pages/second.page');
const {strictEqual, match} = require('assert');

let issues;

Given(/^I print the versions information$/, async function() {
  this.attach(`VM version: NodeJS ${process.version}\n` +
                `Framework version: Selenium ${getPackageVersion('selenium-webdriver')}\n` +
                `Test run date: ${TEST_RUN_TIME}\n` +
                `SDK version: JS Selenium SDK ${getPackageVersion('@evinced/js-selenium-sdk')}\n`);
});

Given(/^I set global root selector to "([^"]*)"$/, async function(selector) {
  const config = {
    "rootSelector": selector
  };

  updateGlobalConfig(JSON.stringify(config));
});

When(/^I run evStart$/, async () => {
  await evinced.evStart();
});

When(/^I run evStop$/, async () => {
  await evinced.evStop().then((currentIssues) => {
    issues = currentIssues;
  })
})

When(/^I run evAnalyze$/, async () => {
  await evinced.evAnalyze().then((currentIssues) => {
    issues = currentIssues;
  });
});

When(/^I run evSaveFile with name "([^"]*)" and type "([^"]*)"$/, async (name, type) => {
  await evinced.evSaveFile(issues, type, `./reports/evReports/${name}.${type}`);
});

Then(/^There should be no accessibility issues on the site$/, async () => {
  await strictEqual(issues.length, 0);
});

Given(/^I am on evinced demo site$/, async () => {
  await driver.get('https://demo.evinced.com/');
});

When(/^I click "([^"]*)"$/, async (button) => {
  switch (button) {
    case 'SearchButton':
      await HomePage.btnSearch().click();
      break;
    case 'TypeDropdown':
      await HomePage.typeDropdown().click();
      break;
    case 'LocationDropdown':
      await HomePage.whereDropdown().click();
      break;
  }
});

When(/^I select "([^"]*)"$/, async (option) => {
  switch (option) {
    case 'TinyHome':
      await HomePage.tinyHomeOption().click();
      break;
    case 'EastCoast':
      await HomePage.eastCoastOption().click();
      break;
  }
});

Then(/^I should see new page with results$/, async () => {
  SecondPage.pageHeader().then((text) => {
    match(text, /Results for: Tiny House in East Coast/)
  });
});
