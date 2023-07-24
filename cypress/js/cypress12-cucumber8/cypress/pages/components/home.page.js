const FORM_SELECTOR = '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container';

class HomePage {
  btnSearch = () => cy.get(`${FORM_SELECTOR} > a`);

  typeDropdown = () => cy.get(`${FORM_SELECTOR} > div:nth-child(1) > div > div.dropdown.line`);

  whereDropdown = () => cy.get(`${FORM_SELECTOR} > div:nth-child(2) > div > div.dropdown.line`);

  tinyHomeOption = () => cy.get(`${FORM_SELECTOR} > div:nth-child(1) > div > ul > li:nth-child(2)`);

  eastCoastOption = () => cy.get(`${FORM_SELECTOR} > div:nth-child(2) > div > ul > li:nth-child(3)`);
}

export default new HomePage();
