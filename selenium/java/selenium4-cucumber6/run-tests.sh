#!/bin/bash

if [ "${HEADED}" == "true" ]; then
  echo "Running tests in headed mode"
  export BROWSER_MODE='--headed'
else
  echo "Running tests in headless mode"
  export BROWSER_MODE='--headless'
fi

mvn --color=always surefire-report:report 2>&1 | tee logs/test.log
echo -e "\nTest report is generated at: $(pwd)/reports/index.html\n"
