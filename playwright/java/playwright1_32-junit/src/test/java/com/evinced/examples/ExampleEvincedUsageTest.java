package com.evinced.examples;

import com.evinced.*;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import org.junit.jupiter.api.*;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class ExampleEvincedUsageTest {
    static Playwright playwright;
    static Browser browser;
    BrowserContext context;
    Page page;
    TestData data = new TestData();
    Map<String, String> selectors = data.getSelectors();

    @BeforeAll
    static void launchBrowser() {
        playwright = Playwright.create();
        browser = playwright.chromium().launch();
        EvincedSDK.setOfflineCredentials(System.getenv("AUTH_SERVICE_ID"), System.getenv("AUTH_TOKEN"));
    }

    @AfterAll
    static void closeBrowser() {
        playwright.close();
    }

    @BeforeEach
    public void createContextAndPage() {
        context = browser.newContext();
        page = context.newPage();
    }

    @AfterEach
    public void closeContext() {
        context.close();
    }

    @Test
    public void testWithoutEvincedSDK() {
        page.navigate("https://demo.evinced.com");
        page.click(selectors.get("HOUSE_DROPDOWN"));
        page.click(selectors.get("TENT_OPTION"));
        page.click(selectors.get("LOCATION_DROPDOWN"));
        page.click(selectors.get("CANADA_OPTION"));
        page.click(selectors.get("SEARCH_BUTTON"));
        page.waitForLoadState();
        assertTrue(page.innerText(selectors.get("SEARCH_RESULTS")).contains("Tent in Canada"));
    }

    @Test
    public void testWithEvAnalyze() {
        EvPage evPage = EvPageFactory.create(page);
        evPage.navigate("https://demo.evinced.com");
        evPage.click(selectors.get("HOUSE_DROPDOWN"));
        evPage.click(selectors.get("TENT_OPTION"));
        evPage.click(selectors.get("LOCATION_DROPDOWN"));
        evPage.click(selectors.get("CANADA_OPTION"));
        Report report = evPage.evAnalyze();
        evPage.click(selectors.get("SEARCH_BUTTON"));
        EvincedSDK.evSaveFile("reports/evinced-reports/evAnalyzeReport", report, FileFormat.HTML);
        assertTrue(page.innerText(selectors.get("SEARCH_RESULTS")).contains("Tent in Canada"));
    }

    @Test
    public void testWithEvStartStop() {
        EvPage evPage = EvPageFactory.create(page);
        evPage.navigate("https://demo.evinced.com");
        evPage.evStart();
        evPage.click(selectors.get("HOUSE_DROPDOWN"));
        evPage.click(selectors.get("TENT_OPTION"));
        evPage.click(selectors.get("LOCATION_DROPDOWN"));
        evPage.click(selectors.get("CANADA_OPTION"));
        evPage.click(selectors.get("SEARCH_BUTTON"));
        Report report = evPage.evStop();
        assertTrue(page.innerText(selectors.get("SEARCH_RESULTS")).contains("Tent in Canada"));
        // This step is intended to fail to demonstrate how to assert accessibility issues
        assertEquals(0, report.getIssues().size());
    }

    @Test
    public void testWithEvStartStopAndEvSaveFileHTMLFormat() {
        EvPage evPage = EvPageFactory.create(page);
        evPage.navigate("https://demo.evinced.com");
        evPage.evStart();
        evPage.click(selectors.get("HOUSE_DROPDOWN"));
        evPage.click(selectors.get("TENT_OPTION"));
        evPage.click(selectors.get("LOCATION_DROPDOWN"));
        evPage.click(selectors.get("CANADA_OPTION"));
        evPage.click(selectors.get("SEARCH_BUTTON"));
        Report report = evPage.evStop();
        EvincedSDK.evSaveFile("reports/evinced-reports/evStartStopReport", report, FileFormat.HTML);
        assertTrue(page.innerText(selectors.get("SEARCH_RESULTS")).contains("Tent in Canada"));
    }

    @Test
    public void testWithEvStartStopAndEvSaveFileJSONFormat() {
        EvPage evPage = EvPageFactory.create(page);
        evPage.navigate("https://demo.evinced.com");
        evPage.evStart();
        evPage.click(selectors.get("HOUSE_DROPDOWN"));
        evPage.click(selectors.get("TENT_OPTION"));
        evPage.click(selectors.get("LOCATION_DROPDOWN"));
        evPage.click(selectors.get("CANADA_OPTION"));
        evPage.click(selectors.get("SEARCH_BUTTON"));
        Report report = evPage.evStop();
        EvincedSDK.evSaveFile("reports/evinced-reports/evStartStopReport", report, FileFormat.JSON);
        assertTrue(page.innerText(selectors.get("SEARCH_RESULTS")).contains("Tent in Canada"));
    }

    @Test
    public void testWithEvStartStopAndEvSaveFileSARIFFormat() {
        EvPage evPage = EvPageFactory.create(page);
        evPage.navigate("https://demo.evinced.com");
        evPage.evStart();
        evPage.click(selectors.get("HOUSE_DROPDOWN"));
        evPage.click(selectors.get("TENT_OPTION"));
        evPage.click(selectors.get("LOCATION_DROPDOWN"));
        evPage.click(selectors.get("CANADA_OPTION"));
        evPage.click(selectors.get("SEARCH_BUTTON"));
        Report report = evPage.evStop();
        EvincedSDK.evSaveFile("reports/evinced-reports/evStartStopReport", report, FileFormat.SARIF);
        assertTrue(page.innerText(selectors.get("SEARCH_RESULTS")).contains("Tent in Canada"));
    }
}
