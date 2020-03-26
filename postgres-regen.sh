#!/usr/bin/env bash
set -e

function exportDBM() {
    name=$1

    root="$(dirname $0)/src/database/${name}/"
    input="${root}/model.dbm"

    pgmodeler-cli --export-to-png --input "${input}" --output "${root}/model.png"
    pgmodeler-cli --export-to-file --input "${input}" --output "${root}/init.sql"
}

exportDBM main
exportDBM user

