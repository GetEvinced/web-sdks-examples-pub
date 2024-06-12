const {Before, BeforeAll, AfterAll, After, setDefaultTimeout} = require('@cucumber/cucumber');
const {chromium} = require('playwright');
const fs = require('fs');
const {setAuthData, setOfflineCredentials} = require('@evinced/js-playwright-sdk');
const EvincedSDK = require('@evinced/js-playwright-sdk').EvincedSDK;

global.initBrowser = async function() {
  const headlessMode = !('true' === process.env.HEADED);
  global.browser = await chromium.launch({
    headless: headlessMode,
  });
};

BeforeAll(async function() {
  await initBrowser();
});

setDefaultTimeout(20 * 1000);

Before(async (scenario) => {
  console.log(`\n\n\n\t\t*********\n\t\t* ${scenario.pickle.name}\n\t\t*********\n\n\n`);

  const serviceId = process.env.AUTH_SERVICE_ID;
  const token = process.env.AUTH_TOKEN;
  setOfflineCredentials({
    serviceId,
    token,
  });

  global.TEST_RUN_TIME = new Date().toLocaleString('en-GB', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });

  if (!scenario.pickle.tags.map((tag) => tag.name).includes('@before-after')) {
    global.context = await global.browser.newContext({
      viewport: {
        width: 1280,
        height: 1024,
      },
    });

    global.page = await global.context.newPage();
    global.evinced = new EvincedSDK(global.page);
  }
});

AfterAll(async function() {
  await global.browser.close();
});

After(async function(scenario) {
  if (!scenario.pickle.tags.map((tag) => tag.name).includes('@before-after')) {
    await global.page.close();
    await global.context.close();
  }
});

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
  fs.writeFileSync(file, config);
};
