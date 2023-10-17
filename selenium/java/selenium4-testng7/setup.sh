#!/bin/bash
set -e

JFROG_USER=${JFROG_USER:?-"Variable must be exported"}
JFROG_PASS=${JFROG_PASS:?-"Variable must be exported"}

echo -e "\nRunning mvn install...\n"

[ -d setup_resources/META-INF ] && rm -rf setup_resources/META-INF

if [ -n "$1" ]; then
  echo "Using local version of selenium-sdk"
  path_to_sdk=$1

  if [[ ! $path_to_sdk == ./* ]]; then
    cp $path_to_sdk ./
    path_to_sdk=$(basename $path_to_sdk)
  fi

  cd setup_resources && jar -xf ../$path_to_sdk META-INF/maven/com.evinced/selenium-sdk/pom.xml META-INF/maven/com.evinced/selenium-sdk/pom.properties && cd ..

  version=$(grep version setup_resources/META-INF/maven/com.evinced/selenium-sdk/pom.properties | cut -d= -f2)

  LOCAL_VER_NUM=version mvn install:install-file -Dfile=$path_to_sdk -DpomFile=setup_resources/META-INF/maven/com.evinced/selenium-sdk/pom.xml

  echo "Version number: $version"
  export LOCAL_VER_NUM="$version"
fi

mvn clean install -DskipTests -gs settings.xml

[ -d logs ] || mkdir logs
mvn dependency:tree -Dincludes=com.evinced:selenium-sdk | grep selenium-sdk | awk -F: '{print $4}' > logs/sdk-version.txt

echo -e "\nSetup done!"
