#!/bin/bash

JFROG_USER=${JFROG_USER:?-"Variable must be exported"}
JFROG_PASS=${JFROG_PASS:?-"Variable must be exported"}

[ -d setup_resources/META-INF ] && rm -rf setup_resources/META-INF

if [ -n "$1" ]; then
  echo "Using local version of playwright-sdk"
  cd setup_resources && jar -xf ../$1 META-INF/maven/com.evinced/java-playwright-sdk/pom.xml META-INF/maven/com.evinced/java-playwright-sdk/pom.properties && cd ..

  version=$(grep version setup_resources/META-INF/maven/com.evinced/java-playwright-sdk/pom.properties | cut -d= -f2)

  LOCAL_VER_NUM=version mvn install:install-file -Dfile=$1 -DpomFile=setup_resources/META-INF/maven/com.evinced/java-playwright-sdk/pom.xml

  echo "Version number: $version"
  export LOCAL_VER_NUM="$version"
fi

mvn clean install -DskipTests -gs settings.xml

[ -d logs ] || mkdir logs
mvn dependency:tree -Dincludes=com.evinced:java-playwright-sdk | grep java-playwright-sdk | awk -F: '{print $4}' > logs/sdk-version.txt

echo -e "\nSetup done!"
