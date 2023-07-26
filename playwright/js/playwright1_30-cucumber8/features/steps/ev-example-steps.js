const {Given, When, Then, Before, After} = require('@cucumber/cucumber');
const {HomePage} = require('../../pages/home.page');
const {SecondPage} = require('../../pages/second.page');
const {expect} = require('@playwright/test');
const EvincedSDK = require('@evinced/js-playwright-sdk').EvincedSDK;

let issues = '';

Given(/^I print the versions information$/, async function() {
  this.attach(`VM version: NodeJS ${process.version}\n` +
                `Framework version: Playwright ${getPackageVersion('playwright')}\n` +
                `Test run date: ${TEST_RUN_TIME}\n` +
                `SDK version: Playwright SDK ${getPackageVersion('@evinced/js-playwright-sdk')}\n`);
});

Given(/^I set global root selector to "([^"]*)"$/, async function(selector) {
  const config = {
    'rootSelector': selector,
  };

  updateGlobalConfig(JSON.stringify(config));
});

When(/^I run evStart$/, async () => {
  await evinced.evStart();
  const url = await page.url();
  await page.goto(url);
});

When(/^I run evStop$/, async () => {
  await evinced.evStop().then((currentIssues) => {
    issues = currentIssues;
  });
});

When(/^I run evAnalyze$/, async () => {
  await evinced.evAnalyze().then((currentIssues) => {
    issues = currentIssues.report;
  });
});

When(/^I run evSaveFile with name "([^"]*)" and type "([^"]*)"$/, async (name, type) => {
  await evinced.evSaveFile(issues, type, `./reports/evReports/${name}.${type}`);
});

Then(/^There should be no accessibility issues on the site$/, async () => {
  await expect(issues.length).toEqual(0);
});

Given(/^I am on evinced demo site$/, async () => {
  await page.goto('https://demo.evinced.com/');
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
  await expect(SecondPage.pageHeader()).toContainText('Results for: Tiny House in East Coast');
});

Before({tags: '@before-after'}, async () => {
  global.context = await global.browser.newContext({
    viewport: {
      width: 1280,
      height: 1024,
    },
  });
  global.page = await global.context.newPage();
  global.evinced = new EvincedSDK(global.page);
  await evinced.evStart();
});

After({tags: '@before-after'}, async () => {
  await page.waitForTimeout(1000);
  await evinced.evStop().then((currentIssues) => {
    issues = currentIssues;
  });
  await global.page.close();
  await global.context.close();
});
