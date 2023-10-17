# Evinced SDK - usage example:
## Java Selenium v4.x + TestNG v7.x

## Contents:
1. [Setup](#setup)
2. [Running Tests](#running-tests)
3. [Reporting](#reporting)

## Setup

In order to install the Evinced SDK first export JFrog credentials:
```bash
  export JFROG_USER=<username>
  export JFROG_PASS=<password>
```

### Default setup:

When you run `./setup.sh` script, without specifying any additional environment variables, then **the latest version** of Java Selenium SDK from the `private` JFrog repository will be installed.

### Custom setup:

Besides the default setup, you can also specify the following environment variables:

* `SELENIUM_SDK_VER=<version-number> ./setup.sh` - will install the specified version of Java Selenium SDK from the `private` JFrog repository.
* `EVINCED_REPOSITORY=<private/restricted> ./setup.sh` - will install the latest version of Java Selenium SDK from either `private` or `restricted` JFrog repository.
* `./setup.sh <path-to-local-build>` - will install Java Selenium SDK from the local build.

## Running Tests

First export credentials:

Export `AUTH_TOKEN` and `AUTH_SERVICE_ID` as:
  ```bash
    export AUTH_TOKEN=<authentication_token>
    export AUTH_SERVICE_ID=<authentication_service_id>
  ```

1. Run tests with `./run-tests.sh` script:

  ```bash
    ./run-tests.sh
  ```

*  you can also run tests in headed mode like that:

  ```bash
    HEADED=true ./run-tests.sh
  ```

2. Or run tests using command:

  ```bash
    mvn clean test
  ```

## Reporting

  Allure results are being generated in `reports/allure-results` directory. If you would like to view HTML report for the whole test execution, run: `allure serve reports/allure-results`.

  Evinced SDK HTML and JSON reports generated using `evSaveFile()` method are available at `reports/` directory.
