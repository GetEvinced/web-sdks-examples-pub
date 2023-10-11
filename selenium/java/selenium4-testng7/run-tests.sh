#!/bin/bash

if [ "${HEADED}" == "true" ]; then
  echo "Running tests in headed mode"
  export BROWSER_MODE='--headed'
else
  echo "Running tests in headless mode"
  export BROWSER_MODE='--headless'
fi

mvn --color=always surefire-report:report 2>&1 | tee logs/test.log
echo -e "\nTest results are generated at: $(pwd)/reports/allure-results"
echo -e "\nTo view the report run: allure serve reports/allure-results\n"
