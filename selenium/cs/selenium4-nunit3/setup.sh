#!/bin/bash

#set -x

if [ -z "$1" ]; then
    echo 'Path to local CS SDK is not set. In order to set it: "./setup.sh <path-to-local-cs-sdk>"'
    exit 1
else
    echo "Path local CS SDK is set to: $1"
    package_path="$1"
    package_name="Selenium.CS.SDK"
    package_ext="nupkg"
    package_source="$(dirname ${package_path})"
    package_version=$(echo "$package_path" | sed -e "s|${package_source}[\\\/]*${package_name}\.\(.*\)\.${package_ext}|\1|")
fi

dotnet add package "${package_name}" --version "${package_version}" --source "${package_source}"

dotnet restore

dotnet build
