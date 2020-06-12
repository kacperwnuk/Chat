#!/usr/bin/env bash

docker_registry=master.rso:5000
version=$(jq -r .version package.json)

function publish_image() {
    name=$1
    path=$2
    docker build -f "$path" -t "rso-chat-$name:$version" .
}

publish_image cdn ./src/backend/cdn/Dockerfile
publish_image session ./src/backend/session/Dockerfile
publish_image auth ./src/backend/auth/Dockerfile
