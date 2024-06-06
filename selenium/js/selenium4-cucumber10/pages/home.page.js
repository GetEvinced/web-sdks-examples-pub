const {By} = require('selenium-webdriver');
const FORM_SELECTOR = '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container';

class HomePage {
  btnSearch = () => driver.findElement(By.css(`${FORM_SELECTOR} > a`));
  typeDropdown = () => driver.findElement(By.css(`${FORM_SELECTOR} > div:nth-child(1) > div > div.dropdown.line`));

  whereDropdown = () => driver.findElement(By.css(`${FORM_SELECTOR} > div:nth-child(2) > div > div.dropdown.line`));
  tinyHomeOption = () => driver.findElement(By.css(`${FORM_SELECTOR} > div:nth-child(1) > div > ul > li:nth-child(2)`));

  eastCoastOption = () => driver.findElement(By.css(`${FORM_SELECTOR} > div:nth-child(2) > div > ul > li:nth-child(3)`));
}

module.exports.HomePage = new HomePage;
