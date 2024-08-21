: "${MONGO_CLUSTER_PASSWORD:?No MONGO_CLUSTER_PASSWORD environment variable found}"
: "${MONGO_CLUSTER_URI:?No MONGO_CLUSTER_URI environment variable found}"
: "${MONGO_DB:?No MONGO_DB environment variable found}"

gcloud config set project bdsm-tools &&
gcloud functions deploy slave-training-test \
  --gen2 \
  --entry-point app \
  --runtime nodejs18 \
  --trigger-http \
  --allow-unauthenticated \
  --memory 128Mi \
  --timeout 2s \
  --region europe-west2 \
  --set-env-vars MONGO_CLUSTER_PASSWORD="${MONGO_CLUSTER_PASSWORD}",MONGO_CLUSTER_URI="${MONGO_CLUSTER_URI}",MONGO_DB="${MONGO_DB},SESSION_KEY_V1="${SESSION_KEY_V1}"
