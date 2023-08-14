package com.evinced.example;

import com.evinced.EvincedReporter;
import com.evinced.EvincedSDK;
import com.evinced.dto.results.Report;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.stream.Collectors;

import static com.evinced.EvincedReporter.evSaveFile;

public class Hooks extends BaseTestSteps {
    @Before(value = "@evinced_hooks_integration", order = 1)
    public void evStartBeforeScenario() {
        driver.evStart();
    }

    @Before(order = 0)
    public void beforeScenario() {
        initDriver();
        EvincedSDK.setOfflineCredentials(System.getenv("AUTH_SERVICE_ID"), System.getenv("AUTH_TOKEN"));
    }

    @After(value = "@evinced_hooks_integration", order = 1)
    public void evStopAfterScenario() {
        report = driver.evStop();
        EvincedReporter.evSaveFile("../reports/hooksReport", report, EvincedReporter.FileFormat.HTML);
    }

    @After(order = 0)
    public void afterScenario() {
        if (driver != null) {
            driver.quit();
        }
    }

    @After("@aggregated_report")
    public void afterAll() {
        report = new Report();
        EvincedReporter.evSaveFile("../reports/aggregatedReport", report, EvincedReporter.FileFormat.HTML);
    }

    @After("@testInformation")
    public void testInformation(Scenario scenario){
        try {
            PropertiesReader propertiesReader = new PropertiesReader("properties-from-pom.properties");
            String engineVersion = (String) driver.executeScript(
                    "return window.Evinced.analysisClientCore.getVersion();");

            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
            LocalDateTime startTime = LocalDateTime.now();
            String testRunDate = dtf.format(startTime);

            HashMap<String, String> testInformation = new HashMap<>() {{
                put("SDK version", "Java Selenium SDK " + propertiesReader.getProperty("selenium.sdk.version"));
                put("Engine version", engineVersion);
                put("Test run date", testRunDate);
                put("VM version", "Java version \"" + vmVersion + "\" " + vmVersionDate);
                put("Framework version", "selenium-webdriver " + propertiesReader.getProperty("selenium.java.version"));
                put("Cucumber java version", "Cucumber v." + propertiesReader.getProperty("cucumber.java.version"));
            }};
            scenario.attach("\n"+
                            testInformation.entrySet().stream().map(
                                    e->e.getKey()+": "+e.getValue()).collect(Collectors.joining("\n")),
                    "text/plain", "Test suite information");

            System.out.println("=============\nTest suite information:");
            testInformation.forEach((k, v) -> System.out.println(k + ": " + v));
            System.out.println("=============");

        } catch (IOException e) {
            System.out.println("Error while reading properties file");
        }
    }
}
