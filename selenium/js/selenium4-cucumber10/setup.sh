#!/bin/bash

export NPM_REGISTRY=${NPM_REGISTRY:-https://evinced.jfrog.io/artifactory/api/npm/restricted-npm/}
export NPM_SCOPE=${NPM_SCOPE:-@evinced}

if [ -z "$JS_SELENIUM_SDK_VER" ]; then
  JS_SELENIUM_SDK_VER="latest"
fi

if [ -n "$1" ]; then
	echo -e "\nInstalling js-selenium-sdk from local file: $1"
	npm i --save $1
else
	if [ -z "$NPM_LOGGED_IN" ]; then
		../../../npm-login.sh
	fi
	echo -e "\nInstalling ${NPM_SCOPE}/js-selenium-sdk ver. ${JS_SELENIUM_SDK_VER}"
	npm i ${NPM_SCOPE}/js-selenium-sdk@${JS_SELENIUM_SDK_VER}
fi

echo -e "\nInstalling dependencies...\n"
npm i

echo -e "\nSetup done!\n"
