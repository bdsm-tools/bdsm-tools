# Authorize and set project
gcloud config set project bdsm-tools &&

# Setup Bucket
gsutil mb -b on gs://${BUCKET_NAME} &&