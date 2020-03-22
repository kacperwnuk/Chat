#!/usr/bin/env bash
set -e
cd "$(dirname $0)"
dbpath=$(./_resolve.sh $1)
source "${dbpath}/.env"


cid=$(docker container ls -a -q -f name=${CONTAINER_NAME})
if [ ! "$(docker ps -q -f name=$cid)" ]; then
    docker container stop $cid
    docker container rm $cid
fi

iid=$(docker images -q  ${IMAGE_NAME})
if [ ! "$(docker ps -q -f name=$cid)" ]; then
    docker rmi $iid
fi