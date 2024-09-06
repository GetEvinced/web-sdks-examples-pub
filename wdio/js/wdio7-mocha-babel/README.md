# Evinced SDK - usage example:
## JavaScript + WebdriverIO v7.x + Mocha


## Contents:
1. [Setup](#setup)
2. [Running Tests](#running-tests)
3. [Reporting](#reporting)


## Setup

### Automated setup:

If you are using MAC you can run `./setup.sh` script to automatically setup example test:

* `./setup.sh` - will install by default latest version of Webdriverio SDK.
* `WDIO_SDK_VER=<version-number> ./setup.sh` - will install the specified version of Webdriverio SDK from the `restricted` JFrog repository.
* `./setup.sh <path-to-local-build>` - will install Webdriverio SDK from the specified local build.


### Manual setup:

If you are using Windows or cannot use automated `./setup.sh` script you can go through the whole process manually:

- If you have access to JFrog repository then:

First Login to JFrog

When using npm v9+ you might encounter "Web login not supported", use --auth-type=legacy option:
```bash
    npm login --auth-type=legacy --scope=@evinced --registry=https://evinced.jfrog.io/artifactory/api/npm/restricted-npm/
```

- If you have access only to bundled archive then use:
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

You can run the BDD tests in two ways:

1. Proceed to wdio7-mocha directory where the tests are located and run:
```bash
    npm run wdio
```

2. Proceed to wdio7-mocha directory where the tests are located and run:
```bash
    ./run-tests.sh
```

## Reporting

After running the tests .json report is generated in `js/wdio/wdio7-mocha/reports/html-reports` directory.
To generate and open html report run:
```bash
    npm run report
```

Evinced SDK HTML and JSON reports generated using `evSaveFile()` method are available at `js/wdio/wdio8-jasmine8/reports/evReports/<reportname>.<reportformat>`.
