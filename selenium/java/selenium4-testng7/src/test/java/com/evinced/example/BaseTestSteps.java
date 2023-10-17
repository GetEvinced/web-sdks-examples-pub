package com.evinced.example;

import com.evinced.EvincedWebDriver;
import com.evinced.dto.results.Report;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import java.nio.file.Path;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

public class BaseTestSteps {
  protected final Map<String, String> selectors = new HashMap<>() {
    {
      put("ROOT_SELECTOR",
          "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(1)");
      put("HOUSE_DROPDOWN",
          "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(1) > div > div.dropdown.line");
      put("TINY_HOME_OPTION",
          "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(1) > div > ul > li:nth-child(2)");
      put("LOCATION_DROPDOWN",
          "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(2) > div > div.dropdown.line");
      put("SEARCH_BUTTON", "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > a");
      put("SEARCH_RESULTS", "#gatsby-focus-wrapper > main > h1");
      put("EAST_COAST_OPTION",
          "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(2) > div > ul > li:nth-child(3)");
    }
  };

  public static EvincedWebDriver driver;
  public Report report;

  protected void directorySetup() {
    String directoryPath = "reports/allure-results";

    Path path = Paths.get(directoryPath);

    if (!Files.exists(path)) {
      try {
        Files.createDirectories(path);
        System.out.println("Directory created successfully.");
      } catch (Exception e) {
        System.err.println("Failed to create directory: " + e.getMessage());
      }
    } else {
      System.out.println("Directory already exists.");
    }
  };

  protected void initDriver() {
    ChromeOptions options = new ChromeOptions();
    String browserMode = System.getenv("BROWSER_MODE");
    if (browserMode != null) {
      options.addArguments(browserMode);
    }
    driver = new EvincedWebDriver(new ChromeDriver(options));
  }
}
