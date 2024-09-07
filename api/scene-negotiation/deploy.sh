gcloud config set project bdsm-tools &&
gcloud functions deploy scene-negotiation-test \
  --gen2 \
  --entry-point app \
  --runtime nodejs18 \
  --trigger-http \
  --allow-unauthenticated \
  --memory 128Mi \
  --timeout 10s \
  --region europe-west1
