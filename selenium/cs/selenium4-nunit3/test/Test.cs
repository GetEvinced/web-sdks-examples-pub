using Test.Utils;
using NUnit.Framework;
using AventStack.ExtentReports;
using OpenQA.Selenium;
using Evinced.SDK;
using Evinced.SDK.Implementation.Configuration;
using System.Xml;

namespace Test {
  [TestFixture]
  public class Tests : BaseTest {
    private ExtentReports extent = ExtentManager.GetExtent();
    private ExtentTest test;

    private IReport result;

    [SetUp]
    public void Setup() {
      string description = TestContext.CurrentContext.Test.Properties.Get("Description") as string;

      test = extent.CreateTest(TestContext.CurrentContext.Test.Name, description);

      var testName = TestContext.CurrentContext.Test.Name;
      if (testName == "EvCommandsInBeforeAfterHooksTest") {
        _driver.EvStart();
      }
    }

    [Test, Description("Test Information")]
    public void TestInformation() {
      string csprojPath = @"../../../cs.csproj";

      XmlDocument xmlDocument = new XmlDocument();
      xmlDocument.Load(csprojPath);
      XmlNode seleniumReference = xmlDocument.SelectSingleNode("/Project/ItemGroup/"
        + "PackageReference[@Include='Selenium.WebDriver']");
      XmlAttribute seleniumVersion = seleniumReference.Attributes["Version"];
      XmlNode sdkReference = xmlDocument.SelectSingleNode("/Project/ItemGroup/"
      + "PackageReference[@Include='Selenium.CS.SDK']");
      XmlAttribute sdkVersion = sdkReference.Attributes["Version"];
      DateTime currentDateTime = DateTime.Now;

      test.Log(Status.Info, "This test is running with...");
      test.Log(Status.Info, "CS Selenium SDK version: " + sdkVersion.Value);
      test.Log(Status.Info, "Test run date: " + currentDateTime);
      test.Log(Status.Info, "Selenium version: " + seleniumVersion.Value);
    }

    [Test, Description("Example without Evinced SDK - As a user I want to " +
        "choose the stay and see proper results")]
    public void WithoutEvincedTest() {
      _driver.Navigate().GoToUrl("https://demo.evinced.com/");
      _driver.FindElement(By.CssSelector(Locators.TYPE_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.TINY_HOME_OPTION_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.WHERE_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.EAST_COAST_OPTION_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.SEARCH_BTN)).Click();

      Assert.That(_driver.FindElement(By.CssSelector(Locators.SEARCH_RESULT_HEADER)).Text,
          Contains.Substring("Results for: Tiny House in East Coast"));
    }

    [Test, Description("Example with evStart-evStop - As a user I want to " +
        "record all accessibility issues during my interaction with page")]
    public void WithEvStartEvStopTest() {
      _driver.EvStart();
      _driver.Navigate().GoToUrl("https://demo.evinced.com/");
      _driver.FindElement(By.CssSelector(Locators.TYPE_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.TINY_HOME_OPTION_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.WHERE_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.EAST_COAST_OPTION_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.SEARCH_BTN)).Click();
      result = _driver.EvStop();
      Assert.That(_driver.FindElement(By.CssSelector(Locators.SEARCH_RESULT_HEADER)).Text,
          Contains.Substring("Results for: Tiny House in East Coast"));
      Assert.AreEqual(0, result.GetIssues().Count());
    }

    [Test, Description("Example with evStart-evStop and evSaveFile - As a user I want to " +
        "record all occuring acessibility issues and save them as html report")]
    public void EvStartEvStopHtmlReportTest() {
      _driver.EvStart();
      _driver.Navigate().GoToUrl("https://demo.evinced.com/");
      _driver.FindElement(By.CssSelector(Locators.TYPE_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.TINY_HOME_OPTION_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.WHERE_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.EAST_COAST_OPTION_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.SEARCH_BTN)).Click();
      result = _driver.EvStop();
      Assert.That(_driver.FindElement(By.CssSelector(Locators.SEARCH_RESULT_HEADER)).Text,
          Contains.Substring("Results for: Tiny House in East Coast"));

      EvincedSDK.EvSaveFile("../../../reports/evStartStopReport", result, FileFormat.HTML, _driver);
    }

    [Test, Description("Example with different configuration - As a user I want to " +
        "record all issues occuring in a given root selector")]
    public void DifferentConfigurationTest() {
      EvincedConfig config = new() {
        RootSelector = "#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(1)"
      };
      _driver.EvStart(config);
      _driver.Navigate().GoToUrl("https://demo.evinced.com/");
      _driver.FindElement(By.CssSelector(Locators.TYPE_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.TINY_HOME_OPTION_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.WHERE_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.EAST_COAST_OPTION_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.SEARCH_BTN)).Click();
      result = _driver.EvStop();
      Assert.That(_driver.FindElement(By.CssSelector(Locators.SEARCH_RESULT_HEADER)).Text,
          Contains.Substring("Results for: Tiny House in East Coast"));

      EvincedSDK.EvSaveFile("../../../reports/evConfigChangeReport", result, FileFormat.HTML, _driver);
    }

    [Test, Description("Example with before-after hooks - As a user I want to " +
        "record all accessibility issues and save the report")]
    public void EvCommandsInBeforeAfterHooksTest() {
      _driver.Navigate().GoToUrl("https://demo.evinced.com/");
      _driver.FindElement(By.CssSelector(Locators.TYPE_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.TINY_HOME_OPTION_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.WHERE_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.EAST_COAST_OPTION_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.SEARCH_BTN)).Click();
      Assert.That(_driver.FindElement(By.CssSelector(Locators.SEARCH_RESULT_HEADER)).Text,
          Contains.Substring("Results for: Tiny House in East Coast"));
    }

    [Test, Description("Example with evAnalyze - I want to " +
        "snapshot all issues on home page with evAnalyze and save report as json")]
    public void EvAnalyzeJsonReportTest() {
      _driver.Navigate().GoToUrl("https://demo.evinced.com/");
      _driver.EvAnalyze();
      _driver.FindElement(By.CssSelector(Locators.TYPE_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.TINY_HOME_OPTION_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.WHERE_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.EAST_COAST_OPTION_SELECTOR)).Click();
      _driver.FindElement(By.CssSelector(Locators.SEARCH_BTN)).Click();
      Assert.That(_driver.FindElement(By.CssSelector(Locators.SEARCH_RESULT_HEADER)).Text,
          Contains.Substring("Results for: Tiny House in East Coast"));

      EvincedSDK.EvSaveFile("../../../reports/evAnalyzeReport", result, FileFormat.JSON);
    }

    [TearDown]
    public void TearDown() {
      var testName = TestContext.CurrentContext.Test.Name;
      if (testName == "EvCommandsInBeforeAfterHooksTest") {
        result = _driver.EvStop();
      }

      var status = TestContext.CurrentContext.Result.Outcome.Status;

      if (status.ToString() == "Passed") {
        test.Pass("Test passed");
      } else {
        test.Fail("Test failed");
      }
      extent.Flush();
    }
  }
}
