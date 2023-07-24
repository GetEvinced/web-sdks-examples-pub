#!/bin/bash

if [ "${HEADED}" == "true" ]; then
  echo "Running tests in headed mode"
  FORCE_COLOR=true npx cypress run --headed --browser=chrome --config video=false
else
  echo "Running tests in headless mode"
  FORCE_COLOR=true npx cypress run --browser=chrome --config video=false
fi
