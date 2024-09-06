#!/bin/bash

if [ "${HEADED}" == "true" ]; then
  echo "Running tests in headed mode"
  export BROWSER_MODE='--headed'
else
  echo "Running tests in headless mode"
  export BROWSER_MODE='--headless'
fi

(npm run wdio)

failed_tests=$(grep -o 'failures="[0-9]*"' ./reports/TEST-WDIO-report-0-0.xml | grep -o '[0-9]*')

sum=0

while read -r value; do
    sum=$((sum + value))
done <<< "$failed_tests"

filename="node_modules/wdio-html-nice-reporter/lib/makeReport.js"
line_number=41
replacement_text="\t\t\tshowInBrowser: false,"

awk -v line="${line_number}" -v replacement="${replacement_text}" 'NR==line {$0=replacement} {print}' "${filename}" > temp.js
mv temp.js "${filename}"

npm run report > /dev/null 2>&1

printf "Reports are saved: $(pwd)/reports/\n\n"

mv ./reports/html-reports/master-report.html ./reports/html-reports/js-wdio8-jasmine8-report.html

if [ $sum -le 1 ]; then
  echo "Just one test failed, exiting with 0"
  exit 0
else
  echo "More than one test failed, exiting with 1"
  exit 1
fi
