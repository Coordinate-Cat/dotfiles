#!/usr/bin/zsh

# 幅いっぱいdot線
function dot_border()  {
    # tputでターミナル幅取得
    $(tput cols 2>/dev/null 1>/dev/null) && {
        SCREEN_WIDTH=$(tput cols);
    }
    SCREEN_WIDTH=${SCREEN_WIDTH:-80};
    # 描く
    echo_hr(){
        printf -v _hr "%*s" ${SCREEN_WIDTH} && echo ${_hr// /${1--}}
    }
    # 動けこの野郎
    echo_hr
}

function sns() {
    dot_border
    #column表示
    column .links/sns.txt
}

function news() {
    dot_border
    #column表示
    column .links/news.txt
}

function streaming() {
    dot_border
    #column表示
    column .links/streaming.txt
}

function all() {
    dot_border
    column .links/sns.txt
    dot_border
    column .links/news.txt
    dot_border
    column .links/streaming.txt
}

alias sns=sns
alias news=news
alias streaming=streaming
alias all=all
