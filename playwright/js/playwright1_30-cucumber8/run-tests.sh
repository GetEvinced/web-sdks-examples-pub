#!/bin/bash

[ ! -d "/reports/" ] && mkdir ./reports
[ ! -d "/reports/html-report" ] && mkdir ./reports/html-report
[ ! -d "/reports/evReports" ] && mkdir ./reports/evReports

npx cucumber-js --exit --format @cucumber/pretty-formatter --format html:reports/html-report/index.html --publish-quiet

printf "\nHtml report is saved: $(pwd)/reports/html-report/index.html\n\n"
