function news() {
    # cat表示
    cat .links/ascii/news_ascii.txt

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

    #column表示
    column .links/news.txt
}

function streaming() {
    # cat表示
    cat .links/ascii/streaming_ascii.txt

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

    #column表示
    column .links/streaming.txt
}

alias news=news
alias streaming=streaming
