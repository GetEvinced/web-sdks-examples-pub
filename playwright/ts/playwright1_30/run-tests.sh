#!/bin/bash

if [ "${HEADED}" == "true" ]; then
  echo "Running tests in headed mode"
  npx playwright test --headed
else
  echo "Running tests in headless mode"
  npx playwright test
fi

printf "Reports are saved in reports/ directory\n\n"
