const FORM_SELECTOR = '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container';

class HomePage {
  btnSearch = (page) => page.locator(`${FORM_SELECTOR} > a`);

  typeDropdown = (page) => page.locator(`${FORM_SELECTOR} > div:nth-child(1) > div > div.dropdown.line`);

  whereDropdown = (page) => page.locator(`${FORM_SELECTOR} > div:nth-child(2) > div > div.dropdown.line`);

  tinyHomeOption = (page) => page.locator(`${FORM_SELECTOR} > div:nth-child(1) > div > ul > li:nth-child(2)`);

  eastCoastOption = (page) => page.locator(`${FORM_SELECTOR} > div:nth-child(2) > div > ul > li:nth-child(3)`);
}

module.exports.HomePage = new HomePage;
