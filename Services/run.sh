#!/bin/sh

rootFolder="~/projects/YourStream/Services"
command="npm i"

for D in $rootFolder/*; do
    if [ ! -d "${D}" ]; then
        continue
    fi
    cd $D
    $command
    cd ..
done
