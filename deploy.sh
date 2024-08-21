BUCKET_URI="test.bdsmtools.org" &&

rm -rf ./dist/ &&
npm run test-build &&

echo Deploying to: ${BUCKET_URI} &&

# Authorize and set project
gcloud config set project bdsm-tools &&

# Copy Files
gsutil -m cp -r ./dist/* gs://${BUCKET_URI}
