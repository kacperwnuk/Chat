#!/usr/bin/env bash

#
# Utworzenie danego obrazu z kontenerem
#

set -e
cd "$(dirname $0)"
dbpath=$(./_resolve.sh $1)

source "${dbpath}/.env"


docker build -t "${IMAGE_NAME}" "${dbpath}"

docker run -d \
    --name "${CONTAINER_NAME}" \
    --publish $DB_PORT:5432 \
    "${IMAGE_NAME}"
