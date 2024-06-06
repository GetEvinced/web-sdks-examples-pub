const {Builder} = require('selenium-webdriver');
const {
  EvincedSDK,
  setOfflineCredentials,
} = require('@evinced/js-selenium-sdk');
const {After, AfterAll, Before, setDefaultTimeout} = require('@cucumber/cucumber');
const {writeFileSync} = require('fs');

setDefaultTimeout(20 * 1000);

Before(async (scenario) => {
  global.driver = await new Builder()
  .forBrowser('chrome')
  .build();

  const serviceId = process.env.AUTH_SERVICE_ID;
  const token = process.env.AUTH_TOKEN;

  setOfflineCredentials({
    serviceId,
    token,
  });
  global.evinced = new EvincedSDK(driver);

  global.TEST_RUN_TIME = new Date().toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
})

AfterAll(async () => {
  await driver.quit();
})

global.getPackageVersion = function(packageName) {
  try {
    const file = '../../node_modules/' + packageName + '/package.json';
    const json = require(file);
    return json.version;
  } catch (err) {
    console.log('Package not found: ' + err);
  }
};

global.updateGlobalConfig = function(config) {
  const file = 'evConfig.json';
  writeFileSync(file, config);
};

Before({tags: '@before-after'}, async () => {
  await evinced.evStart();
})

After({tags: '@before-after'}, async () => {
  await evinced.evStop().then((currentIssues) => {
    issues = currentIssues;
  });

  await driver.close();
})
