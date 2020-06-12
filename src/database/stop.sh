#!/usr/bin/env bash

#
# Wyłączanie danego kontenera
#

set -e
cd "$(dirname $0)"
dbpath=$(./_resolve.sh $1)
source "${dbpath}/.front_env"


docker stop "${CONTAINER_NAME}"
