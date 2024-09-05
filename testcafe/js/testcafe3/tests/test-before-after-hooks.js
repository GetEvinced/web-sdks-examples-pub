import { setCredentials, EvincedSDK } from '@evinced/js-testcafe-sdk';

let evinced;
let reportBaseName = 'evincedTest';

fixture `Using beforeEach and afterEach hooks for Continuous mode`
  .page `https://demo.evinced.com/`
.before(async () => {
  await setCredentials({ // please change it according to your naming
    serviceId: process.env.AUTH_SERVICE_ID,
    secret: process.env.AUTH_SECRET,
  });
})
.beforeEach(async t => {
  evinced = new EvincedSDK(t);
  await evinced.evStart();
})
.afterEach(async t => {
  const issues = await evinced.evStop();
  console.log(`evStop: issues: ${issues.length}`)

  await evinced.evSaveFile(issues, 'html', `./${t.test.name}_${reportBaseName}.html`);
});


test('test evStart-stop', async t => {
  await t
  .click('div:nth-child(1) > div > div.dropdown.line > p')
  .click('div:nth-child(1) > div > ul > li:nth-child(2)')
  .wait(2000); // a timeout is optional, added it to keep the test flow smooth
});

test('test evStart-stop SPA. 2 pages', async t => {
  await t.navigateTo('https://getevinced.github.io/spa-example/#/')
  .wait(1000) // this timeout is mandatory since we need some time to gather issues
    .navigateTo('https://getevinced.github.io/spa-example/#/services')
    .wait(1000) // this timeout is mandatory since we need some time to gather issues
});
