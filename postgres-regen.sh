#!/usr/bin/env bash

#
# Modele bazy danych tworzymy w [pgModeler](https://pgmodeler.io/)
# Ten skrypt eksportuje pliki *.dbm do plików *.sql i tworzy obrazy *.png modeli
#

set -e

function exportDBM() {
    name=$1

    root="$(dirname $0)/src/database/${name}/"
    input="${root}/model.dbm"

    pgmodeler-cli --export-to-png --input "${input}" --output "docs/assets/db-${name}-model.png"
    pgmodeler-cli --export-to-file --input "${input}" --output "${root}/init.sql"
}

exportDBM main
exportDBM user

