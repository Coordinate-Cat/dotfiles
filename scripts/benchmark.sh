#!/bin/bash

set -eux

rm -f benchmark-results/*

os=$(uname -s | tr '[A-Z]' '[a-z]')

case $os in
    darwin)
        TIME_COMMAND=gtime
    ;;
    linux)
        TIME_COMMAND=time
    ;;
esac

$TIME_COMMAND --format="%e" --output=.analysis/benchmark-results/zsh-install-time.txt zsh -i -c exit

for i in $(seq 1 10); do 
    $TIME_COMMAND --format="%e" --output=.analysis/benchmark-results/zsh-load-time-${i}.txt zsh -i -c exit;
done

ZSH_LOAD_TIME=$(cat .analysis/benchmark-results/zsh-load-time-*.txt | awk '{ total += $1 } END { print total/NR }')
ZSH_INSTALL_TIME=$(cat .analysis/benchmark-results/zsh-install-time.txt)

cat<<EOJ
[
    {
        "name": "zsh load time",
        "unit": "Second",
        "value": ${ZSH_LOAD_TIME}
    },
    {
        "name": "zsh install time",
        "unit": "Second",
        "value": ${ZSH_INSTALL_TIME}
    }
]
EOJ