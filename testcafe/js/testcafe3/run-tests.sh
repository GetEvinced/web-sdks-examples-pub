#!/bin/bash

set -o pipefail

testcafe chrome:headless tests/ -r spec,html:report/testcafe3-report.html
echo "Test report is generated in report/testcafe3-report.html"
echo $? > logs/exit_code.log

