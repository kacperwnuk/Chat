#!/usr/bin/env bash
systemctl start docker.service
./src/database/start.sh main
./src/database/start.sh user
