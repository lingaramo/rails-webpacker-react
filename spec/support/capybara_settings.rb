require 'capybara/rspec'
require "selenium/webdriver"

Capybara.register_driver :chrome_headless do |app|
  options = Selenium::WebDriver::Chrome::Options.new(
    args: %w[disable-gpu]
  )
  Capybara::Selenium::Driver.new(
    app,
    browser: :chrome,
    clear_local_storage: true,
    clear_session_storage: true,
    options: options
  )
end

Capybara.register_driver :selenium_firefox do |app|
  options = Selenium::WebDriver::Firefox::Options.new
  options.args << '-headless'
  Capybara::Selenium::Driver.new(
    app,
    browser: :firefox,
    clear_local_storage: true,
    clear_session_storage: true,
    options: options
  )
end

Capybara.default_selector = :xpath
Capybara.default_driver = :selenium_firefox
Capybara.javascript_driver = :selenium_firefox
