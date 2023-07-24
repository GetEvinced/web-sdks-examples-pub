#!/bin/bash

if [ ! -d "reports" ]; then
    mkdir reports
fi
if [ ! -d "reports/evinced-reports" ]; then
    mkdir reports/evinced-reports
fi

mvn clean test
mvn clean:clean -q
echo -e "\nTest reports are generated at: $(pwd)/reports"
echo -e "\nTo view HTML report run: mvn allure:serve\n"
