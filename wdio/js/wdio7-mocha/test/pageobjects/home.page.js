const FORM_SELECTOR = '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container';

class HomePage {
  btnSearch() {
    return $(`${FORM_SELECTOR} > a`);
  }

  typeDropdown() {
    return $(`${FORM_SELECTOR} > div:nth-child(1) > div > div.dropdown.line`);
  }

  whereDropdown() {
    return $(`${FORM_SELECTOR} > div:nth-child(2) > div > div.dropdown.line`);
  }

  tinyHomeOption() {
    return $(`${FORM_SELECTOR} > div:nth-child(1) > div > ul > li:nth-child(2)`);
  }

  eastCoastOption() {
    return $(`${FORM_SELECTOR} > div:nth-child(2) > div > ul > li:nth-child(3)`);
  }
}

module.exports.HomePage = new HomePage;
