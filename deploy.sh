BUCKET_URI="test.bdsmtools.org" &&

rm -rf ./dist/ &&
npm run test-build &&

echo Deploying to: ${BUCKET_URI} &&

# Authorize and set project
gcloud config set project bdsm-tools &&

# Copy Files
gsutil -m cp -r ./dist/* gs://${BUCKET_URI}

# Set Cache Control
gcloud storage objects update gs://${BUCKET_URI}/index.html --cache-control=no-cache,no-store,max-age=0
gcloud storage objects update gs://${BUCKET_URI}/version.json --cache-control=no-cache,no-store,max-age=0
