#!/bin/bash

set -xe

O_PWD="$PWD"

if [ "$(basename $PWD)" = "scripts" ]; then
    cd ..
fi

SHA1SUM="2bbb98714cfd502cdef6de61b2c474aea0e4df75"

mkdir -p data
curl -L https://www.data.gouv.fr/fr/datasets/r/7eee8f09-5d1b-4f48-a304-5e99e8da1e26 > data/consolidation.geo.json

if [ ! "$(sha1sum data/consolidation.geo.json | cut -d' ' -f1)" = "$SHA1SUM" ]; then
    echo "Error: Checksum of download file isn't correct."
    echo "Exiting..."
    exit 1
fi

echo "data from www.data.gouv.fr, last consolidated the 2024-10-17 (file generated from $PWD/get_consolidated_data.sh)" > data/consolidation.geo.json.info

if [ ! "$PWD" = "$O_PWD" ]; then
    cd $PWD
fi
