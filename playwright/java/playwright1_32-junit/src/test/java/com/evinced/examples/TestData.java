package com.evinced.examples;

import java.util.Map;

public class TestData {
    public Map<String, String> getSelectors() {
        return selectors;
    }

    final Map<String, String> selectors = Map.of(
            "HOUSE_DROPDOWN", "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(1) > div > div.dropdown.line",
            "TENT_OPTION", "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(1) > div > ul > li:nth-child(4)",
            "LOCATION_DROPDOWN", "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(2) > div > div.dropdown.line",
            "CANADA_OPTION", "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(2) > div > ul > li:nth-child(1)",
            "SEARCH_BUTTON", "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > a",
            "SEARCH_RESULTS", "#gatsby-focus-wrapper > main > h1",
            "EAST_COAST_OPTION", "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(2) > div > ul > li:nth-child(3)"
    );
}
