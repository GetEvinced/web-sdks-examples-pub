Given(/^I am on "([^"]*)"$/) do |url|
  @driver.get url
end

Given(/^I print the versions information$/) do
  @driver.get 'https://demo.evinced.com'
  @driver.ev_analyze
  $test_start_time = Time.new.strftime("%Y-%m-%d %H:%M:%S")
end

When(/^I run evAnalyze command$/) do
  @issues = @driver.ev_analyze
end

When(/^I run evStart command$/) do
  @driver.ev_start
end

When(/^I run evStop command$/) do
  @issues = @driver.ev_stop
end

When(/^I run evSaveFile command in "([^"]*)" format and save it as "([^"]*)"$/) do |format, filename|
  @driver.ev_save_file destination: 'reports/evReports/' + filename + '.' + format, format: format, report: @issues
end

When(/^I set the root selector to "([^"]*)"$/) do |selector|
  Evinced::Rubysdk::OVERALL_RESULT.clear
  Evinced.global_config.root_selector = SELECTORS[selector]
end

When(/^I click on "([^"]*)"$/) do |selector|
  @driver.find_element(css: SELECTORS[selector]).click
end

Then(/^"([^"]*)" should contain "([^"]*)"$/) do |selector, text|
  @driver.find_element(css: SELECTORS[selector]).text.include? text
end

Then(/^There should be no accessibility issues found$/) do
  expect(@issues).to be_empty
end

