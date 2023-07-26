# Evinced SDK - usage example
## TypeScript + Playwright v1.30.x + Playwright Testrunner v1.30.x


## Contents:
1. [Setup](#setup)
2. [Running Tests](#running-tests)
3. [Reporting](#reporting)


## Setup

### Automated setup:

If you are using MAC you can run `./setup.sh` script to automatically setup example test:

* `./setup.sh` - will install by default latest version of Playwright SDK.
* `PLAYWRIGHT_SDK_VER=<version-number> ./setup.sh` - will install the specified version of Playwright SDK from the `restricted` JFrog repository.
* `./setup.sh <path-to-local-build>` - will install Playwright SDK from the specified local build.


### Manual setup:

If you are using Windows or cannot use automated `./setup.sh` script you can go through the whole process manually:

First Login to JFrog.

When using npm v9+ you might encounter "Web login not supported", use --auth-type=legacy flag like that to ommit this error:
```bash
    npm login --auth-type=legacy --scope=@evinced --registry=https://evinced.jfrog.io/artifactory/api/npm/restricted-npm/
```

If you have access only to bundled archive then use:
```bash
    npm i <path_to_archive>
```

Then run 
```bash
    npm i
```
to install all required dependencies

Export licensing environment variables
```bash
    export AUTH_SERVICE_ID=<serviceId>
    export AUTH_TOKEN=<token>
```

## Running Tests

You can run the tests in two ways:

1. In this project proceed to playwright1_30-testrunner1_30 directory where the tests are located and run:
```bash
    ./run-tests.sh
```
You can run tests in headed mode by with:
```bash
    HEADED=true ./run-tests.sh
```

2. In this project proceed to playwright1_30-testrunner1_30 directory where the tests are located and run:
```bash
    npx playwright test
```

## Reporting
  
Playwright .html and .json reports are being generated in `ts/playwright/playwright1_30-testrunner1_30/reports/evReports` directory.

Evinced SDK HTML and JSON reports generated using `evSaveFile()` method are available at `ts/playwright/playwright1_30-testrunner1_30/reports/evReports/<reportname>.<reportformat>`.
  