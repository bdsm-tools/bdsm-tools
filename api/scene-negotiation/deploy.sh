gcloud config set project bdsm-tools &&
gcloud functions deploy scene-negotiation-test \
  --entry-point doProcess \
  --runtime nodejs10 \
  --trigger-http \
  --allow-unauthenticated \
  --memory 512MB \
  --timeout 10s \
  --region europe-west2

