set -e

cd ${CODEBUILD_SRC_DIR}/waylo-site
yarn install --frozen-lockfile
echo "Running build"
yarn build

echo "DONE with synth - moving back to ${CODEBUILD_SRC_DIR}"
cd ${CODEBUILD_SRC_DIR} 