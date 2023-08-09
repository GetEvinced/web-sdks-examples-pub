#!/bin/bash
set -e

JFROG_USER=${JFROG_USER:?-"Variable must be exported"}
JFROG_PASS=${JFROG_PASS:?-"Variable must be exported"}

echo -e "\nRunning mvn install...\n"
mvn clean install -DskipTests -gs settings.xml

echo -e "\nSetup done!"
