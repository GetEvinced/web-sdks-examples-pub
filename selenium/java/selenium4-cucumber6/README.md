
# Evinced SDK - usage example:
## Java Selenium v4.x + Cucumber BDD v6.x



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

If you don't have access to the JFrog you can use the local jar file in the pom.xml file:
```xml
    <dependency>
        <groupId>com.evinced</groupId>
        <artifactId>evinced-sdk</artifactId>
        <version>1.16.1</version>
        <scope>system</scope>
        <systemPath>${project.basedir}/lib/evinced-sdk-1.16.1.jar</systemPath>
    </dependency>
```

Then either run:
```bash
  mvn clean install -DskipTests -gs settings.xml
```
or using shell script:
```bash
  ./setup.sh
```

## Running Tests

In order to run the Cucumber BDD tests you can:

1. Run tests in IDE

   Example for *Intelij IDEA* using <a href="https://plugins.jetbrains.com/plugin/7212-cucumber-for-java">Cucumber for Java plugin</a>:

   - edit Run/Debug Configuration Template for Cucumber Java plugin by adding ***authentication token*** and ***authentication service id*** in the ***Environment variables section*** as:
     ```bash
       AUTH_TOKEN=<authentication_token>
       AUTH_SERVICE_ID=<authentication_service_id>
     ```
   - open `src/test/java/com.evinced.example/RunCucumberTest.java` file,
   - run the `RunCucumberTest` class which is going to run all test scenarios from `src/test/resources/com.evinced.example.features/examples.feature`
   
   </br>In order to run specific test scenarios:
   - Open `src/test/java/resources/com.evinced.example.features/examples.feature` folder
   - Run any `Scenario` inside the file.


2. Run tests using command line

    Export ***authentication token*** and ***authentication service id*** as:
    ```bash
      export AUTH_TOKEN=<authentication_token>
      export AUTH_SERVICE_ID=<authentication_service_id>
    ```

    In order to run the Cucumber BDD tests using command line you can either run:
    ```bash
      mvn surefire-report:report
    ```
    or using shell script:
    ```bash
      ./run-tests.sh
    ```
    which is going to run all tests from `src/test/resources/com.evinced.example.features/examples.feature` file.

    When using script you can run tests in headed mode by with:
    ```bash
    HEADED=true ./run-tests.sh
    ```

## Reporting
  
  Cucumber HTML reports are being generated in `./reports/` directory.

  Evinced SDK HTML and JSON reports generated using `evSaveFile()` method are available at `./evinced-report/<report_name>.<report_format>`.
  
