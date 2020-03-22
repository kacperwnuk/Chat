#!/usr/bin/env bash
set -e
cd "$(dirname $0)"
dbpath=$(./_resolve.sh $1)
source "${dbpath}/.env"


docker stop "${CONTAINER_NAME}"
