package com.evinced.examples;

import com.evinced.*;
import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import org.junit.jupiter.api.*;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class ExampleEvincedHooksIntegrationTest {
    static Playwright playwright;
    static Browser browser;
    BrowserContext context;
    Page page;
    TestData data = new TestData();
    Map<String, String> selectors = data.getSelectors();
    EvPage evPage;

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
        evPage = EvPageFactory.create(page);
        evPage.evStart();
    }

    @AfterEach
    public void closeContext() {
        Report report = evPage.evStop();
        EvincedSDK.evSaveFile("reports/evinced-reports/evinced-hook-report", report, FileFormat.HTML);
        context.close();
    }

    @Test
    public void evStartStopExampleWithHooksIntegration() {
        evPage.navigate("https://demo.evinced.com");
        evPage.click(selectors.get("HOUSE_DROPDOWN"));
        evPage.click(selectors.get("TENT_OPTION"));
        evPage.click(selectors.get("LOCATION_DROPDOWN"));
        evPage.click(selectors.get("CANADA_OPTION"));
        evPage.click(selectors.get("SEARCH_BUTTON"));
        evPage.waitForLoadState();
        assertTrue(evPage.innerText(selectors.get("SEARCH_RESULTS")).contains("Tent in Canada"));
    }
}
