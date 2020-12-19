IP_NAME="$1" &&

# Authorize and set project
gcloud config set project bdsm-tools > /dev/null 2>&1 &&

# Reserve IP Address
gcloud compute addresses create "${IP_NAME}" \
    --network-tier=PREMIUM \
    --ip-version=IPV4 \
    --global > /dev/null 2>&1 &&

# Read IP Address
IP_ADDRESS=$(gcloud compute addresses describe "${IP_NAME}" \
    --format="get(address)" \
    --global
) &&

echo "$IP_ADDRESS"