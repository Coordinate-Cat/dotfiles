###[ Benchmark ]################################################################
# https://zenn.dev/odan/articles/17a86574b724c9
set -eux

rm -f benchmark-results/*

gtime --format="%e" --output=benchmark-results/zsh-install-time.txt zsh -i -c exit

for i in $(seq 1 10); do
    gtime --format="%e" --output=benchmark-results/zsh-load-time-${i}.txt zsh -i -c exit;
done

ZSH_LOAD_TIME=$(cat benchmark-results/zsh-load-time.txt | awk '{ total += $1 } END { print total/NR }')
ZSH_INSTALL_TIME=$(cat benchmark-results/zsh-install-time.txt)

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