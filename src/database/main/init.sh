#!/bin/bash
set -e

cd "$(dirname $0)"
source .env

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<EOSQL
    alter user "$POSTGRES_USER" with password '$ADMIN_PASSWORD';
    create user "$BACKEND_USERNAME" with password '$BACKEND_PASSWORD';
    create database "$BACKEND_DATABASE";
    grant select on all tables in schema "$BACKEND_DATABASE" to "$BACKEND_USERNAME";
    grant insert on all tables in schema "$BACKEND_DATABASE" to "$BACKEND_USERNAME";
    grant update on all tables in schema "$BACKEND_DATABASE" to "$BACKEND_USERNAME";
    grant delete on all tables in schema "$BACKEND_DATABASE" to "$BACKEND_USERNAME";
EOSQL
