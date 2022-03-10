###[ Benchmark ]################################################################
# https://zenn.dev/odan/articles/17a86574b724c9
set -eu
GH=$GITHUB_DIR

gtime --format="%e" zsh -i -c exit 2> ${GH}/benchmark-results/zsh-install-time.txt

{ for i in $(seq 1 10); do gtime --format="%e" zsh -i -c exit; done } 2> ${GH}/benchmark-results/zsh-load-time.txt

ZSH_LOAD_TIME=$(cat ${GH}/benchmark-results/zsh-load-time.txt | awk '{ total += $1 } END { print total/NR }')
ZSH_INSTALL_TIME=$(cat ${GH}/benchmark-results/zsh-install-time.txt)

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