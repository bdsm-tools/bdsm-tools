gcloud config set project bdsm-tools &&
gcloud functions deploy feature-flag-test \
  --gen2 \
  --entry-point doProcess \
  --runtime nodejs18 \
  --trigger-http \
  --allow-unauthenticated \
  --memory 128Mi \
  --timeout 5s \
  --region europe-west2
