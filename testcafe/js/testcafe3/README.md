# Evinced SDK - usage example:
## JavaScript + TestCafe v3.x


## Contents:
1. [Setup](#setup)
2. [Running Tests](#running-tests)
3. [Reporting](#reporting)


## Setup

### Automated setup:

If you are using MAC you can run `./setup.sh` script to automatically setup example test:

* `./setup.sh` - will install by default latest version of JS TestCafe SDK.
* `JS_TESTCAFE_SDK_VER=<version-number> ./setup.sh` - will install the specified version of JS TestCafe SDK from the `restricted` JFrog repository.
* `./setup.sh <path-to-local-build>` - will install JS TestCafe SDK from the specified local build.


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

Export licensing environment variables
```bash
    export AUTH_SERVICE_ID=<serviceId>
    export AUTH_TOKEN=<token>
```

## Running Tests

You can run the TestCafe tests like that:

1. Proceed to TestCafe3 directory where the tests are located and run:
```bash
    ./run-tests.sh
```

Or you can run the tests manually:
```bash
   testcafe chrome tests/
```

## Reporting

Evinced SDK HTML and JSON reports generated using `evSaveFile()` method are available at `./<reportname>.<reportformat>`.
