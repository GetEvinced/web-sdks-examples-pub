#!/bin/bash

if [ "${HEADED}" == "true" ]; then
  echo "Running tests in headed mode"
  export BROWSER_MODE='--headed'
else
  echo "Running tests in headless mode"
  export BROWSER_MODE='--headless'
fi

npm run wdio

printf "Reports are saved: $(pwd)/reports/html-reports/wdio7-mocha-report.html\n"
