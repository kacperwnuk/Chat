#!/usr/bin/env bash

set -e
cd "$(dirname $0)"

dbname=$1

resove(){
    source "./$dbname/.env"
    printf $(realpath $dbname)
}

case ${dbname} in
  "main") resove  ;;
  "user") resove ;;
  *) echo "Brak takie bazy danych" && exit 1
esac
