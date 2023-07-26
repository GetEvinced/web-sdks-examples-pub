#!/bin/bash

export RUBY_REGISTRY=${RUBY_REGISTRY:-evinced.jfrog.io/artifactory/api/gems/restricted-ruby}

unset $RUBY_SDK_VER
unset $RUBY_SDK_LOCAL

if [ -n "$RUBY_SDK_VER" ]; then
  export RUBY_SDK_VER=${RUBY_SDK_VER}
else
  unset $RUBY_SDK_VER
fi

[ -f "Gemfile.lock" ] && rm -f ""Gemfile.lock

evinced_gem_name=evinced-rubysdk

echo -e "\nUninstalling previous evinced gems...\n"
gem uninstall -a ${evinced_gem_name}

JFROG_USER=${JFROG_USER:?-"Variable must be exported"}
JFROG_PASS=${JFROG_PASS:?-"Variable must be exported"}

if [ -n "$1" ] ; then
  export RUBY_SDK_LOCAL=${1}
  bundle install
else
  bundle install
fi


echo -e "\nSetup complete!"
