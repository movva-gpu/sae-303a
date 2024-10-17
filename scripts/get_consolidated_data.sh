#!/bin/bash

set -xe

O_PWD="$PWD"

if [ "$(basename $PWD)" = "scripts" ]; then
    cd ..
fi

mkdir -p data
echo "data from www.data.gouv.fr, last consolidated the 2024-10-17 (file generated from $PWD/get_consolidated_data.sh)" > data/consolidation.geo.json.info
curl -L https://www.data.gouv.fr/fr/datasets/r/7eee8f09-5d1b-4f48-a304-5e99e8da1e26 > data/consolidation.geo.json

if [ ! "$PWD" = "$O_PWD" ]; then
    cd $PWD
fi
