#!/bin/bash

# Exit on any command failure
set -e

echo "Going to synth pipeline in ${CODEBUILD_SRC_DIR}/cdk"
cd ${CODEBUILD_SRC_DIR}/cdk
yarn install --frozen-lockfile
yarn cdk synth

echo "DONE with synth - moving back to ${CODEBUILD_SRC_DIR}"
cd ${CODEBUILD_SRC_DIR}
