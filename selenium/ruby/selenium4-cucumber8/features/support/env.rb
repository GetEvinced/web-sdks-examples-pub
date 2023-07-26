require 'selenium-webdriver'
require 'evinced/rubysdk'

options = Selenium::WebDriver::Chrome::Options.new
options.add_argument(ENV['BROWSER_MODE'])

SELECTORS = {
  'HOUSE_DROPDOWN' => '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(1) > div > div.dropdown.line',
  'LOCATION_DROPDOWN' => '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(2) > div > div.dropdown.line',
  'TENT_OPTION' => '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(1) > div > ul > li:nth-child(4)',
  'CANADA_OPTION' => '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(2) > div > ul > li:nth-child(1)',
  'SEARCH_BUTTON' => '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > a',
  'SEARCH_RESULTS' => '#gatsby-focus-wrapper > main > h1',
  'EAST_COAST_OPTION' => '#gatsby-focus-wrapper > main > div.wrapper-banner > div.filter-container > div:nth-child(2) > div > ul > li:nth-child(3)'
}

unless Dir.exist?("reports")
  Dir.mkdir("reports")
end

unless Dir.exist?("reports/evReports")
  Dir.mkdir("reports/evReports")
end

Before do |scenario|
  @driver = Selenium::WebDriver.for :chrome, options: options
  Evinced.set_offline_credentials token: ENV['AUTH_TOKEN'], service_id: ENV['AUTH_SERVICE_ID']
end

Before('@evinced_hooks_integration') do |scenario|
  @driver.ev_start
end

After('@evinced_hooks_integration') do |scenario|
  @issues = @driver.ev_stop
  @driver.ev_save_file destination: 'reports/evReports/evStartStopReport.json', format: 'json', report: @issues
end

After('@aggregated_report') do |scenario|
  @driver.ev_save_file destination: 'reports/evReports/aggregatedReport.json', format: 'json'
end

After('@testInformation') do |scenario|
  test_information = %Q^
    VM version: #{`ruby -v`.chop}
    Framework version: #{Selenium::WebDriver::VERSION}
    Test run date: #{$test_start_time}
    SDK version: #{Evinced::Rubysdk::VERSION}
  ^
  attach test_information, 'text/plain'
end

AfterAll do
  puts "\nEvinced reports are being stored at: #{Dir.pwd}/ev_reports"
end
