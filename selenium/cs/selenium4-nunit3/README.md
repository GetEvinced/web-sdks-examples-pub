# Evinced SDK - usage example:
## C# + Selenium 4.10.x + NUnit 3.13.x

## Contents:
1. [Setup](#setup)
2. [Running Tests](#running-tests)
3. [Reporting](#reporting)


## Setup

### Automated setup:

If you are using Unix-like operation system you can run `./setup.sh` script to automatically setup example test.

* `./setup.sh <path-to-local-build>` - will install C# Selenium SDK from the specified local build.


### Manual setup:

If you are using builds from Evinced JFrog you need to login there before doing the next steps.

For now we suggest downloading nupkg file and installing it as a local package:

Install the SDK
```bash
dotnet add package Selenium.CS.SDK -v <version> -s <path-to-folder-with-nupkg-file>
```

Then run
```bash
   dotnet restore
```
to install all required dependencies

Then run
```bash
   dotnet build
```

Export licensing environment variables
```bash
    export AUTH_SERVICE_ID=<serviceId>
    export AUTH_TOKEN=<token>
```

Or for Windows based machine
```bash
    set AUTH_SERVICE_ID=<serviceId>
    set AUTH_TOKEN=<token>
```

## Running Tests

You can run the tests in two ways:

1. Proceed to selenium4-nunit3 directory where the tests are located and run:
```bash
    ./run-tests.sh
```
You can run tests in headed mode by with:
```bash
    HEADED=true ./run-tests.sh
```

2. Proceed to selenium4-nunit3 directory where the tests are located and run:
```bash
    dotnet test
```

## Reporting

Html reports are being generated in `reports/` directory.

Evinced SDK HTML and JSON reports generated using `evSaveFile()` method are available at `web-sdks-examples/selenium/cs/selenium4-nunit3/reports<reportname>.<reportformat>`.
