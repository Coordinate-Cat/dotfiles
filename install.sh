#!/bin/sh

dirs=$(find "$PWD" -depth 1 -type d -not -name '.*' | sort -n)
for dir in $dirs;
do
  echo 📁 "$dir"
  sh "$dir"/install.sh
done
