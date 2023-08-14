package com.evinced.example;

import com.evinced.EvincedReporter;
import com.evinced.dto.configuration.EvincedConfiguration;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;

import static com.evinced.EvincedReporter.evSaveFile;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class StepsDefinitions extends BaseTestSteps {
    @Given("I am on {string}")
    public void iAmOn(String url) {
        driver.get(url);
    }

    @Given("I print the versions information")
    public void printVersions() {
        driver.get("https://demo.evinced.com");
        driver.evAnalyze();
    }

    @When("I run evAnalyze command")
    public void iRunEvAnalyzeCommand() {
        report = driver.evAnalyze();
    }

    @When("I run evStart command")
    public void iRunEvStartCommand() {
        driver.evStart();
    }

    @When("I run evStop command")
    public void iRunEvStopCommand() {
        report = driver.evStop();
    }

    @When("I run evSaveFile command in {string} format and save it as {string}")
    public void iRunEvSaveFileCommand(String format, String fileName) {
        EvincedReporter.FileFormat fileFormat = format.equals("html") ? EvincedReporter.FileFormat.HTML :
                format.equals("json") ? EvincedReporter.FileFormat.JSON : EvincedReporter.FileFormat.SARIF;
            
        String filePath = "../reports/" + fileName;

        EvincedReporter.evSaveFile(filePath, report, fileFormat);
    }

    @And("I click on {string}")
    public void iClickOn(String element) {
        driver.findElement(By.cssSelector(selectors.get(element))).click();
    }

    @Then("{string} should contain {string}")
    public void shouldContain(String element, String value) {
        String elementText = driver.findElement(By.cssSelector(selectors.get(element))).getText();
        assertTrue(elementText.contains(value));
    }

    @When("I set the root selector to {string}")
    public void iSetTheRootSelectorTo(String rootSelector) {
        driver.setConfiguration(new EvincedConfiguration().setRootSelector(selectors.get(rootSelector)));
    }

    @Then("There should be no accessibility issues found")
    public void thereShouldBeNoAccessibilityIssuesFound() {
        assertTrue(report.getIssues().isEmpty());
    }
}
