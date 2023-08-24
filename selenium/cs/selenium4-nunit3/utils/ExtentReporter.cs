using AventStack.ExtentReports;
using AventStack.ExtentReports.Reporter;

public class ExtentManager {
  private static ExtentReports extent;
  private static ExtentHtmlReporter htmlReporter;

  public static ExtentReports GetExtent() {
    if (extent == null) {
      string reportPath = "../../../reports/ExtentReport.html";
      htmlReporter = new ExtentHtmlReporter(reportPath);
      extent = new ExtentReports();
      extent.AttachReporter(htmlReporter);
    }
    return extent;
  }
}
