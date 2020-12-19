BUCKET_NAME="$1" &&
LB_NAME="${BUCKET_NAME}/https-lb"

# Authorize and set project
gcloud config set project bdsm-tools &&

gcloud compute backend-buckets create "${LB_NAME}" \
    --gcs-bucket-name="${BUCKET_NAME}"

gcloud compute url-maps create http-lb \
    --default-backend-bucket="${LB_NAME}"