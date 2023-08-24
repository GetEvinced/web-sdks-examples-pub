using Evinced.SDK;
using OpenQA.Selenium.Chrome;
using NUnit.Framework;

namespace Test.Utils {
  public abstract class BaseTest {
    internal static protected IEvincedDriver _driver;

    [OneTimeSetUp]
    public void OneTimeSetUp() {
      string directoryPath = "../../../reports";

      if (!Directory.Exists(directoryPath)) {
        Directory.CreateDirectory(directoryPath);
        Console.WriteLine("Directory created successfully.");
      } else {
        Console.WriteLine("Directory already exists.");
      }

      EvincedSDK.SetOfflineCredentials(Environment.GetEnvironmentVariable("AUTH_SERVICE_ID"), Environment.GetEnvironmentVariable("AUTH_TOKEN"));
    }

    [SetUp]
    public void TestConsoleReporter() {
      Console.WriteLine("====== Scenario ======");
    }

    [SetUp]
    public void SetUp() => _driver = getDriver();

    [TearDown]
    public void TearDown() => _driver.Quit();

    [TearDown]
    public void TestStatus() {
      var status = TestContext.CurrentContext.Result.Outcome.Status;
      string description = TestContext.CurrentContext.Test.Properties.Get("Description") as string;
      Console.WriteLine("Scenario '" + description + "' " + status.ToString());
    }

    private static IEvincedDriver getDriver() {
      ChromeOptions options = new();
      try {
        options.AddArgument(Environment.GetEnvironmentVariable("BROWSER_MODE"));
      }
      catch {
        options.AddArgument("--headless");
      }
      var chromeDriverService = ChromeDriverService.CreateDefaultService();
      chromeDriverService.SuppressInitialDiagnosticInformation = true;
      return EvincedDriverFactory.Create(new ChromeDriver(chromeDriverService, options));
    }
  }
}
