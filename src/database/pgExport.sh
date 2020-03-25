#!/usr/bin/env bash
set -e
cd "$(dirname $0)"


function exportDBM() {
    name=$1

    input="./${name}/model.dbm"

    pgmodeler-cli --export-to-png --input "${input}" --output "./${name}/model.png"
    pgmodeler-cli --export-to-file --input "${input}" --output "./${name}/init.sql"
}

exportDBM main
exportDBM user

