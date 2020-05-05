#!/usr/bin/env bash

#
# Skrypt do uruchomienia docker'a i kontenerów z bazami danych
#

systemctl start docker.service
./src/database/start.sh main
./src/database/start.sh user
