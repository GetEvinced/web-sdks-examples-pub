package com.evinced.example;

import com.evinced.EvincedWebDriver;
import com.evinced.dto.results.Report;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.HashMap;
import java.util.Map;

public class BaseTestSteps {
    protected final String vmVersion = System.getProperty("java.vm.version");
    protected final String vmVersionDate = System.getProperty("java.version.date");
    protected final String USE_CUSTOM_DRIVER = System.getenv("CUSTOM_DRIVER");
    protected final Map<String, String> selectors = new HashMap<>() {{
        put("HOUSE_DROPDOWN", "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(1) > div > div.dropdown.line");
        put("TENT_OPTION", "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(1) > div > ul > li:nth-child(4)");
        put("LOCATION_DROPDOWN", "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(2) > div > div.dropdown.line");
        put("CANADA_OPTION", "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(2) > div > ul > li:nth-child(1)");
        put("SEARCH_BUTTON", "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > a");
        put("SEARCH_RESULTS", "#gatsby-focus-wrapper > main > h1");
        put("EAST_COAST_OPTION", "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(2) > div > ul > li:nth-child(3)");
    }};
    protected Report report;
    public static EvincedWebDriver driver;
    public static CustomWebDriver customDriver;
    protected void initDriver() {
        if (USE_CUSTOM_DRIVER != null) {
            customDriver = new CustomWebDriver(getChromeOptions());
            driver = new EvincedWebDriver(
                    USE_CUSTOM_DRIVER.equals("inheritance") ? customDriver : customDriver.getWrappedDriver());
        } else {
            driver = new EvincedWebDriver(new ChromeDriver(getChromeOptions()));
        }
    }

    protected ChromeOptions getChromeOptions() {
        ChromeOptions options = new ChromeOptions();
        String browserName = System.getenv("BROWSER_MODE");
        if(browserName != null) {
            options.addArguments(browserName);
        }
        return options;
    }
}
