BUCKET_NAME="bdsmtools.org" &&
IP_NAME="bdsm-tools-ipv4" &&
LOAD_BALANCER_NAME="bdsm-tools-lb" &&

# Authorize and set project
gcloud config set project bdsm-tools &&

./scripts/setup/setup-bucket.sh ${BUCKET_NAME} &&
IP_ADDRESS=$(./scripts/setup/setup-ip-address.sh ${IP_NAME}) &&
./scripts/setup/setup-load-balancer.sh ${BUCKET_NAME} &&

