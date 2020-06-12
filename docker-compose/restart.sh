#!/usr/bin/env bash

docker-compose down
docker-compose build
docker system prune
docker-compose up --scale session_server=3