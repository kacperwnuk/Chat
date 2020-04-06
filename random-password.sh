#!/usr/bin/env bash

#
# Generowanie losowego hasła
#

date | md5sum | cut -d' ' -f 1
