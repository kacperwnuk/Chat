#!/usr/bin/env bash
set -e

version=$(jq --raw-output '.version' package.json)
app_name=$(jq --raw-output '.name' package.json)
docker_registry=master.rso:5000

# update version w helm chart
helm_chart=$(yq ".version = \"$version\"" helm-chart/Chart.yaml --yml-output)
echo "${helm_chart}" > helm-chart/Chart.yaml

echo "Publishing \"$app_name\" version $version"

# docker
docker build -f "./src/backend/Dockerfile" -t "$app_name" .
docker tag "$app_name" "$docker_registry/$app_name:$version"
docker push "$docker_registry/$app_name:$version"


helm package helm-chart/
