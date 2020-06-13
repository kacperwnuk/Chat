#!/bin/bash
set -e

host=$1

project_dir=$(dirname $0)/../../

helm_values="$project_dir/helm-chart/values.yaml"

function get_data() {
    yq --raw-output "$1" "$helm_values"
}

app_prefix=$(get_data .appPrefix)

function init_db(){
    index=$1

    port=$(get_data ".psqlServers[$index].port")
    name=$(get_data ".psqlServers[$index].name")
    admin_username=$(get_data ".psqlServers[$index].adminUser.username")
    admin_password=$(get_data ".psqlServers[$index].adminUser.password")
    backend_username=$(get_data ".psqlServers[$index].backendUser.username")
    backend_password=$(get_data ".psqlServers[$index].backendUser.password")


    PGPASSWORD="${admin_password}" \
    psql --host "$host" --port "$port" --username ${admin_username} --dbname "$app_prefix-$name" <<EOSQL
        create user "${backend_username}" with password '${backend_password}';
        grant select on all tables in schema "public" to "${backend_username}";
        grant insert on all tables in schema "public" to "${backend_username}";
        grant update on all tables in schema "public" to "${backend_username}";
        grant delete on all tables in schema "public" to "${backend_username}";
EOSQL

    PGPASSWORD="${admin_password}" \
    psql --host "$host" --port "$port" --username ${admin_username} --dbname "$app_prefix-$name" \
        --file="$(dirname $0)/$name/init.sql"
}

init_db 0
init_db 1
