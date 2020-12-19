BUCKET_URI="bdsmtools.org" &&

npm run build &&

echo Deploying to: ${BUCKET_URI} &&

# Authorize and set project
gcloud config set project bdsm-tools &&

# Copy Files
gsutil -m cp -r ./dist/* gs://${BUCKET_URI} &&

# Edit the website configuration
gsutil web set -m index.html -e index.html gs://${BUCKET_URI}
gsutil web get gs://${BUCKET_URI}