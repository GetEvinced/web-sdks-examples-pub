#!/bin/bash

export NPM_REGISTRY=${NPM_REGISTRY:-https://evinced.jfrog.io/artifactory/api/npm/restricted-npm/}
export NPM_SCOPE=${NPM_SCOPE:-@evinced}

if [ -z "$CYPRESS_SDK_VER" ]; then
  CYPRESS_SDK_VER="latest"
fi

if [ -n "$1" ]; then
	echo -e "\nInstalling cypress-sdk from local file: $1\n"
	npm i --save $1
else
	if [ -z "$NPM_LOGGED_IN" ]; then
		../../../npm-login.sh
	fi

	echo -e "\nInstalling ${NPM_SCOPE}/cypress-sdk ver. ${CYPRESS_SDK_VER}\n"
	npm i ${NPM_SCOPE}/cypress-sdk@${CYPRESS_SDK_VER}
fi

echo -e "\nInstalling other dependencies...\n"
npm i

echo -e "\nSetup done!\n"
