#!/usr/bin/env bash

#
# Uruchamianie danego kontenera
#

set -e
cd "$(dirname $0)"
dbpath=$(./_resolve.sh $1)
source "${dbpath}/.front_env"

docker container start "${CONTAINER_NAME}"
