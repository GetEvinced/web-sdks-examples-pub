#!/bin/bash
exec 

if [ "${HEADED}" == "true" ]; then
  echo "Running tests in headed mode"
  export BROWSER_MODE='--headed'
else
  echo "Running tests in headless mode"
  export BROWSER_MODE='--headless'
fi

rake test 2>&1
echo -e "\nTest report is generated at: ${current_dir}/reports/index.html\n"
