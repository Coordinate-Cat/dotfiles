#!/usr/bin/zsh

# 幅最大dot線
function dot_border()  {
    # ターミナル幅取得
    $(tput cols 2>/dev/null 1>/dev/null) && {
        SCREEN_WIDTH=$(tput cols);
    }
    SCREEN_WIDTH=${SCREEN_WIDTH:-80};
    # 描く
    echo_hr(){
        printf -v _hr "%*s" ${SCREEN_WIDTH} && echo ${_hr// /${1--}}
    }

    echo_hr
}

# DIR
li='.aliases/links'

# FILENAME + EXT
links=(
    sns.txt
    news.txt
    streaming.txt
    live.txt
)

# FILENAME
filename=(
    all
    sns
    news
    stream
    live
)

# セレクトモード
function sel() {
    PS3="PLEASE SELECT THE LIST BY NUMBER >>> "

    select ANS in "${filename[@]}"
    do
        if [ -z "$ANS" ]; then
            continue
        else
            break
        fi
    done

    echo YOU SELECTED $REPLY\) $ANS
    $ANS
    # dot_border
}

# 全表示
function all() {
    echo "Hey bro, Time to surf the net.\nShort url service(https://qr.paps.jp/)\nMade by Coordinate-Cat" | boxes -d ian_jones
    for i in "${links[@]}";
    do
        dot_border
        column -c 80 $li/$i
    done
    dot_border
}

# 個別表示
function sns() {
    dot_border
    echo "HERE IS THE LIST OF SNS LINKS" | boxes -d unicornsay
    dot_border
    #column表示
    column -c 80 $li/sns.txt
}

function news() {
    dot_border
    echo "HERE IS THE LIST OF NEWS LINKS" | boxes -d unicornsay
    dot_border
    #column表示
    column -c 80 $li/news.txt
}

function stream() {
    # dot_border
    echo "HERE IS THE LIST OF STREAM LINKS" | boxes -d unicornsay
    dot_border
    #column表示
    column -c 80 $li/streaming.txt
}

function live() {
    dot_border
    echo "HERE IS THE LIST OF LIVE LINKS" | boxes -d unicornsay
    dot_border
    #column表示
    column -c 80 $li/live.txt
}

alias sel=sel
alias all=all
alias sns=sns
alias news=news
alias stream=stream
alias live=live
