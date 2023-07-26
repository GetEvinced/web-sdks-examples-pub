
# Evinced SDK - usage example:
## Java Playwright v1.32.0 + Junit v5.8.1



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

When you run `./setup.sh` script, without specifying any additional environment variables, then **the latest version** of Java Playwright SDK from the `private` JFrog repository will be installed.

### Custom setup:

Besides the default setup, you can also specify the following environment variables:

* `PLAYWRIGHT_SDK_VER=<version-number> ./setup.sh` - will install the specified version of Java Playwright SDK from the `private` JFrog repository.
* `EVINCED_REPOSITORY=<private/restricted> ./setup.sh` - will install the latest version of Java Playwright SDK from either `private` or `restricted` JFrog repository.
* `./setup.sh <path-to-local-build>` - will install Java Selenium SDK from the local build.

### Manual setup:

If you are using Windows or cannot use automated `./setup.sh` script you can install it with:

```bash
  mvn clean install -DskipTests -gs settings.xml
```

## Running Tests

In order to run the JUnit tests you can:

1. Run tests in IDE

   Example for *Intelij IDEA*:

    - edit Run/Debug Configuration Template for JUnit by adding ***authentication token*** and ***authentication service id*** in the ***Environment variables section*** as:
      ```bash
        AUTH_TOKEN=<authentication_token>;AUTH_SERVICE_ID=<authentication_service_id>
      ```
    - run any of the two test classes:
      - `src/test/java/com/evinced/examples/ExampleEvincedUsageTest.java`  
      - `src/test/java/com/evinced/examples/ExampleEvincedHooksIntegratinoTest.java`  

   </br>In order to run specific tests:
    - Open any of the `src/test/java/com.evinced.example/*Test.java` files,
    - Run any test inside the file.


2. Run tests using command line

   In order to run the JUnit tests using command line you can either run:
    ```bash
      mvn clean test
    ```
   or using shell script:
    ```bash
      ./run-tests.sh
    ```
## Reporting

After running the tests, you need to run `allure generate target/surefire-reports/` command to generate the html report.

Allure HTML reports are being generated in `./allure-report/` directory.

Evinced SDK HTML and JSON reports generated using `evSaveFile()` method are available at `./evinced-reports/<report_name>.<report_format>`.
  