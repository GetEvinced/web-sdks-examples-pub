# Evinced SDK - usage example:
## Java Selenium v4.x + Cucumber BDD v8.x



## Contents:
1. [Setup](#setup)
2. [Running Tests](#running-tests)
3. [Reporting](#reporting)
## Setup

### Automated setup:

If you are using MAC you can run `./setup.sh` script to automatically setup example test:

* `./setup.sh` - will install by default latest version of Ruby Selenium SDK.
* `RUBY_SDK_VER=<version-number> ./setup.sh` - will install the specified version of Ruby Selenium SDK from the `restricted` JFrog repository.
* `./setup.sh <path-to-local-build>` - will install Ruby Selenium SDK from the specified local build (gem has to be unpacked - to unpack use: `gem unpack <path_to_gem>`).


### Manual setup:

If you are using Windows or cannot use automated `./setup.sh` script you can go through the whole process manually:

In order to install the Evinced SDK first export JFrog credentials:
```bash
  export JFROG_USER=<username>
  export JFROG_PASS=<password>
```

If you don't have access to the JFrog you can use the local jar file in the pom.xml file:
```bash
    gem install --local path_to_gem/evinced-rubysdk-1.5.1.gem
```

Then run:
```bash
   bundle install # If you don't have bundler installed run: gem install bundler
```
which is going to install all dependencies from the `Gemfile` file.

## Running Tests

In order to run the Cucumber BDD tests you can:

Export ***authentication token*** and ***authentication service id*** as:
```bash
    export AUTH_TOKEN=<authentication_token>
    export AUTH_SERVICE_ID=<authentication_service_id>
```

In order to run the Cucumber BDD tests using command line you can run:
```bash
    rake test
```
which is going to run all tests from `features/examples.feature` file.

## Reporting

Cucumber HTML reports are being generated in `./reports/` directory.

Evinced SDK HTML and JSON reports generated using `evSaveFile()` method are available at `./ev_reports/<report_name>.<report_format>`.