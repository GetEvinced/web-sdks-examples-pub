package com.evinced.example;

import io.qameta.allure.*;
import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.ITestContext;
import org.testng.ITestResult;

import com.evinced.EvincedReporter;
import com.evinced.dto.configuration.EvincedConfiguration;

import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ExampleTests extends BaseTestSteps {

  @BeforeMethod
  protected void evStartBeforeMethod(ITestContext context, ITestResult result) {
    String methodName = result.getMethod().getMethodName();
    if ("testWithBeforeAfterHook".equals(methodName)) {
      driver.evStart();
    }
  }

  @Test(testName = "Test information")
  public void testInformation() {
    try {
      PropertiesReader propertiesReader = new PropertiesReader("properties-from-pom.properties");
      String javaSeleniumSDKVersion = new String(Files.readAllBytes(Paths.get("logs/sdk-version.txt")),
          StandardCharsets.UTF_8);
      DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
      LocalDateTime startTime = LocalDateTime.now();
      String testRunDate = dtf.format(startTime);

      Allure.addAttachment("Test run date", testRunDate);
      Allure.addAttachment("Selenium SDK Version", javaSeleniumSDKVersion);
      Allure.addAttachment("Selenium Java Version", propertiesReader.getProperty("selenium.java.version"));
      Allure.addAttachment("Java Version", System.getProperty("java.vm.version"));
    } catch (IOException e) {
    }
  }

  @Test(testName = "Example without Evinced SDK - As a user I want to " +
      "choose the stay and see proper results")
  public void testWithoutEvinced() {
    driver.get("https://demo.evinced.com/");
    driver.findElement(By.cssSelector(selectors.get("HOUSE_DROPDOWN"))).click();
    driver.findElement(By.cssSelector(selectors.get("TINY_HOME_OPTION"))).click();
    driver.findElement(By.cssSelector(selectors.get("LOCATION_DROPDOWN"))).click();
    driver.findElement(By.cssSelector(selectors.get("EAST_COAST_OPTION"))).click();
    driver.findElement(By.cssSelector(selectors.get("SEARCH_BUTTON"))).click();

    String elementText = driver.findElement(By.cssSelector(selectors.get("SEARCH_RESULTS"))).getText();
    Assert.assertTrue(elementText.contains("Results for: Tiny House in East Coast"));
  }

  @Test(testName = "Example with evStart-evStop - As a user I want to " +
      "record all accessibility issues during my interaction with page")
  public void testWithEvStartStop() {
    driver.get("https://demo.evinced.com/");
    driver.evStart();
    driver.findElement(By.cssSelector(selectors.get("HOUSE_DROPDOWN"))).click();
    driver.findElement(By.cssSelector(selectors.get("TINY_HOME_OPTION"))).click();
    driver.findElement(By.cssSelector(selectors.get("LOCATION_DROPDOWN"))).click();
    driver.findElement(By.cssSelector(selectors.get("EAST_COAST_OPTION"))).click();
    driver.findElement(By.cssSelector(selectors.get("SEARCH_BUTTON"))).click();
    report = driver.evStop();

    String elementText = driver.findElement(By.cssSelector(selectors.get("SEARCH_RESULTS"))).getText();
    Assert.assertTrue(elementText.contains("Results for: Tiny House in East Coast"));

    // This assertion is intended to fail to demonstrate how to assert accessibility issues
    Assert.assertEquals(report.getIssues().size(), 0);
  }

  @Test(testName = "Example with evStart-evStop and evSaveFile - As a user I want to " +
      "record all occuring acessibility issues and save them as html report")
  public void testWithEvSaveFileHTML() {
    driver.get("https://demo.evinced.com/");
    driver.evStart();
    driver.findElement(By.cssSelector(selectors.get("HOUSE_DROPDOWN"))).click();
    driver.findElement(By.cssSelector(selectors.get("TINY_HOME_OPTION"))).click();
    driver.findElement(By.cssSelector(selectors.get("LOCATION_DROPDOWN"))).click();
    driver.findElement(By.cssSelector(selectors.get("EAST_COAST_OPTION"))).click();
    driver.findElement(By.cssSelector(selectors.get("SEARCH_BUTTON"))).click();
    report = driver.evStop();

    String elementText = driver.findElement(By.cssSelector(selectors.get("SEARCH_RESULTS"))).getText();
    Assert.assertTrue(elementText.contains("Results for: Tiny House in East Coast"));

    EvincedReporter.evSaveFile("../reports/evStartStopReport", report, EvincedReporter.FileFormat.HTML);
  }

  @Test(testName = "Example with different configuration - As a user I want to " +
      "record all issues occuring in a given root selector")
  public void testWithRootSelector() {
    driver.get("https://demo.evinced.com/");
    driver.setConfiguration(new EvincedConfiguration().setRootSelector(selectors.get("ROOT_SELECTOR")));
    driver.evStart();
    driver.findElement(By.cssSelector(selectors.get("HOUSE_DROPDOWN"))).click();
    driver.findElement(By.cssSelector(selectors.get("TINY_HOME_OPTION"))).click();
    driver.findElement(By.cssSelector(selectors.get("LOCATION_DROPDOWN"))).click();
    driver.findElement(By.cssSelector(selectors.get("EAST_COAST_OPTION"))).click();
    driver.findElement(By.cssSelector(selectors.get("SEARCH_BUTTON"))).click();
    report = driver.evStop();

    String elementText = driver.findElement(By.cssSelector(selectors.get("SEARCH_RESULTS"))).getText();
    Assert.assertTrue(elementText.contains("Results for: Tiny House in East Coast"));

    EvincedReporter.evSaveFile("../reports/rootSelectorReport", report, EvincedReporter.FileFormat.HTML);
  }

  @Test(testName = "Example with before-after hooks - As a user I want to " +
      "record all accessibility issues and save the report", groups = "hooksTest")
  public void testWithBeforeAfterHook() {
    driver.get("https://demo.evinced.com/");
    driver.findElement(By.cssSelector(selectors.get("HOUSE_DROPDOWN"))).click();
    driver.findElement(By.cssSelector(selectors.get("TINY_HOME_OPTION"))).click();
    driver.findElement(By.cssSelector(selectors.get("LOCATION_DROPDOWN"))).click();
    driver.findElement(By.cssSelector(selectors.get("EAST_COAST_OPTION"))).click();
    driver.findElement(By.cssSelector(selectors.get("SEARCH_BUTTON"))).click();

    String elementText = driver.findElement(By.cssSelector(selectors.get("SEARCH_RESULTS"))).getText();
    Assert.assertTrue(elementText.contains("Results for: Tiny House in East Coast"));
  }

  @Test(testName = "Example with evAnalyze - I want to " +
      "snapshot all issues on home page with evAnalyze and save report as json")
  public void testWithEvAnalyze() {
    driver.get("https://demo.evinced.com/");
    report = driver.evAnalyze();
    driver.findElement(By.cssSelector(selectors.get("HOUSE_DROPDOWN"))).click();
    driver.findElement(By.cssSelector(selectors.get("TINY_HOME_OPTION"))).click();
    driver.findElement(By.cssSelector(selectors.get("LOCATION_DROPDOWN"))).click();
    driver.findElement(By.cssSelector(selectors.get("EAST_COAST_OPTION"))).click();
    driver.findElement(By.cssSelector(selectors.get("SEARCH_BUTTON"))).click();

    String elementText = driver.findElement(By.cssSelector(selectors.get("SEARCH_RESULTS"))).getText();
    Assert.assertTrue(elementText.contains("Results for: Tiny House in East Coast"));

    EvincedReporter.evSaveFile("../reports/evAnalyzeReport", report, EvincedReporter.FileFormat.JSON);
  }

  @AfterMethod
  protected void evStopAfterMethod(ITestContext context, ITestResult result) {
    String methodName = result.getMethod().getMethodName();
    if ("testWithBeforeAfterHook".equals(methodName)) {
      report = driver.evStop();
      EvincedReporter.evSaveFile("../reports/hooksReport", report, EvincedReporter.FileFormat.JSON);
    }
  }
}
