#!/bin/bash

reports_dir=${REPORTS_DIR:-'./reports'}
html_report_path=${REPORT_PATH:-"${reports_dir}/inbuiltReporter/index.html"}

set -o pipefail

npx cucumber-js --exit --format @cucumber/pretty-formatter --format html:${html_report_path} --publish-quiet 2>&1 | tee logs/test.log

echo $? > logs/exit_code.log

echo -e "\nTest report is generated at: ${current_dir}/reports/index.html\n"i
