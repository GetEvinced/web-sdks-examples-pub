namespace Test.Utils {
  public static class Locators {
    public const string BASE_SELECTOR = "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container";
    public const string TYPE_SELECTOR = BASE_SELECTOR + " > div:nth-child(1) > div > div.dropdown.line";
    public const string WHERE_SELECTOR = BASE_SELECTOR + " > div:nth-child(2) > div > div.dropdown.line";
    public const string TINY_HOME_OPTION_SELECTOR = BASE_SELECTOR + " > div:nth-child(1) > div > ul > li:nth-child(2)";
    public const string EAST_COAST_OPTION_SELECTOR = BASE_SELECTOR + " > div:nth-child(2) > div > ul > li:nth-child(3)";
    public const string SEARCH_BTN = BASE_SELECTOR + " > a";
    public const string SEARCH_RESULT_HEADER = "#gatsby-focus-wrapper > main > h1";
  }
}
