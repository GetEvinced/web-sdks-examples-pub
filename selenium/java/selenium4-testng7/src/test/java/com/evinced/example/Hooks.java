package com.evinced.example;

import org.testng.annotations.BeforeSuite;
import org.testng.annotations.BeforeTest;

import com.evinced.EvincedSDK;

import org.testng.annotations.AfterTest;

public class Hooks extends BaseTestSteps {

  @BeforeSuite
  protected void beforeSuite() {
    EvincedSDK.setOfflineCredentials(System.getenv("AUTH_SERVICE_ID"), System.getenv("AUTH_TOKEN"));
    directorySetup();
  }

  @BeforeTest
  protected void beforeTest() {
    initDriver();
  }

  @AfterTest
  protected void afterTest() {
    driver.quit();
  }
}
