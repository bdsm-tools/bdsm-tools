gcloud config set project bdsm-tools &&
gcloud functions deploy scene-negotiation-test \
  --gen2 \
  --entry-point doProcess \
  --runtime nodejs18 \
  --trigger-http \
  --allow-unauthenticated \
  --memory 512MB \
  --timeout 10s \
  --region europe-west2
