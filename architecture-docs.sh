#!/usr/bin/env bash

#
# Wygenerowanie obrazów z `docs/architecture.drawio`
# https://j2r2b.github.io/2019/08/06/drawio-cli.html
#

agen(){
    index=$1
    name=$2

    draw.io --export docs/architecture.drawio \
            --format svg \
            --page-index $index \
            --transparent \
            --output "docs/assets/$name.png"
}

agen 0 architecture
agen 3 chart-process1
agen 4 chart-process2
