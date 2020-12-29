function news() {
    cat .links/ascii/news_ascii.txt
    column .links/news.txt
}

function video() {
    cat .links/ascii/video_ascii.txt
    column .links/video.txt
}

alias news=news
alias video=video
