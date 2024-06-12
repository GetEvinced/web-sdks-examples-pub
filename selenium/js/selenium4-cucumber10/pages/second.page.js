const {By} = require('selenium-webdriver');
const FORM_SELECTOR = '#gatsby-focus-wrapper > main';

class SecondPage {
  pageHeader = () => driver.findElement(By.css(`${FORM_SELECTOR} > h1`)).getText();
}

module.exports.SecondPage = new SecondPage;
