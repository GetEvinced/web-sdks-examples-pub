# Evinced SDK - usage example:
## TypeScript + Cypress v12.x + Cucumber BDD v8.x


## Contents:
1. [Setup](#setup)
2. [Running Tests](#running-tests)
3. [Reporting](#reporting)


## Setup

### Automated setup:

If you are using MAC you can run `./setup.sh` script to automatically setup example test:

* `./setup.sh` - will install by default latest version of Cypress SDK.
* `CYPRESS_SDK_VER=<version-number> ./setup.sh` - will install the specified version of Cypress SDK from the `restricted` JFrog repository.
* `./setup.sh <path-to-local-build>` - will install Cypress SDK from the specified local build.


### Manual setup:

If you are using Windows or cannot use automated `./setup.sh` script you can go through the whole process manually:

First Login to JFrog

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

## Running Tests

First export authentication credentials like that:

```bash
    export CYPRESS_AUTH_SERVICE_ID=<serviceId>
    export CYPRESS_AUTH_TOKEN=<token>
```

Then you can run the Cucumber BDD tests in two ways:

1. Proceed to cypress12-cucumber8 directory where the tests are located and run:
```bash
    ./run-tests.sh
```

2. Proceed to cypress12-cucumber8 directory where the tests are located and run:
```bash
    npx cypress run
```
You can run tests in headed mode by with:
```bash
    HEADED=true ./run-tests.sh
```

## Reporting
  
Mochawesome .json and html reports are being generated in `ts/cypress/cypress12-cucumber8/reports/mochawesome` directory.

Evinced SDK HTML and JSON reports generated using `evSaveFile()` method are available at `ts/cypress/cypress12-cucumber8/reports/evReports`.
  