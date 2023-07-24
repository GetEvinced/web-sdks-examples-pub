#!/bin/bash
set -e
exec
    
echo -e "\nLogging into ${NPM_SCOPE}...\n"
npm login --scope=${NPM_SCOPE} --registry=${NPM_REGISTRY}
