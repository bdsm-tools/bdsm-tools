#!/bin/bash
gcloud config set project bdsm-tools

for i in {0..49}
do
  gcloud compute addresses create mongo-atlas-ip-"$i" \
    --region=europe-west2 \
    --subnet=default
done

for i in {0..49}
do
  if [ "$(gcloud compute addresses describe mongo-atlas-ip-"$i" --region=europe-west2 --format="value(status)")" != "RESERVED" ]; then
    echo "mongo-atlas-ip-$i is not RESERVED";
    exit 1;
  fi
done

for i in {0..49}
do
  gcloud compute forwarding-rules create mongo-atlas-"$i" \
    --region=europe-west2 \
    --network=default \
    --address=mongo-atlas-ip-"$i" \
    --allow-psc-global-access \
    --target-service-attachment=projects/p-47vmessv6mzpgvqcxbdfrfdy/regions/europe-west2/serviceAttachments/sa-europe-west2-66a81a8a3d27cf79b3bbf7ab-"$i"
done

if [ "$(gcloud compute forwarding-rules list --regions=europe-west2 --format="csv[no-heading](name)" --filter="(name:mongo-atlas*)" | wc -l)" -gt 50 ]; then
  echo "Project has too many forwarding rules that match prefix mongo-atlas. Either delete the competing resources or choose another endpoint prefix."
  exit 2;
fi

gcloud compute forwarding-rules list --regions=europe-west2 --format="json(IPAddress,name)" --filter="name:(mongo-atlas*)" > atlasEndpoints-mongo-atlas.json

