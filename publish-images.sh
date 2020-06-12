#!/usr/bin/env bash

docker_registry=master.rso:5000
version=$(jq -r .version package.json)
app_prefix=rso-chat

function publish_image() {
    name=$1
    path=$2
    docker build -f "$path" -t "$app_prefix-$name" .
    docker tag "$app_prefix-$name" "$docker_registry/$name:$version"
    docker push "$docker_registry/$name"
}

publish_image cdn ./src/backend/cdn/Dockerfile
publish_image session ./src/backend/session/Dockerfile
publish_image auth ./src/backend/auth/Dockerfile
