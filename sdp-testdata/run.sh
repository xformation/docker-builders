#!/bin/bash

args="$@"

args="$@ -p 80"

file=/data/data.json
if [ -f $file ]; then
    echo "Found data.json, trying to open"
    args="$args data.json"
fi

file=/data/file.js
if [ -f $file ]; then
    echo "Found file.js seed file, trying to open"
    args="$args file.js"
fi

json-server $args