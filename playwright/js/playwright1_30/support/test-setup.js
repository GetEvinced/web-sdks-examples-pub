const {chromium} = require('playwright');
const {setAuthData, setOfflineCredentials} = require('@evinced/js-playwright-sdk');
const fs = require('fs');

const initBrowser = async function() {
  const headlessMode = !('true' === process.env.HEADED);
  global.browser = await chromium.launch({
    headless: headlessMode,
  });
};

const setupEvinced = async function() {
  setAuthData();
  const serviceId = process.env.AUTH_SERVICE_ID;
  const token = process.env.AUTH_TOKEN;
  setOfflineCredentials({
    serviceId,
    token,
  });
  await initBrowser();

  setupReports();
};

const setupReports = async function() {
  if (!fs.existsSync('reports')) fs.mkdirSync('reports');
  if (!fs.existsSync('reports/evReports')) {
    try {
      fs.mkdirSync('reports/evReports');
    } catch {};
  };
};

global.TEST_RUN_TIME = new Date().toLocaleString('en-GB', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});

global.selector = '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(1)';

const getPackageVersion = function(packageName) {
  try {
    const file = '../node_modules/' + packageName + '/package.json';
    const json = require(file);
    return json.version;
  } catch (err) {
    console.log('Package not found: ' + err);
  }
};

const updateGlobalConfig = function(config) {
  const file = 'evConfig.json';
  fs.writeFileSync(file, config);
};

module.exports = {
  setupEvinced, getPackageVersion, updateGlobalConfig,
};
