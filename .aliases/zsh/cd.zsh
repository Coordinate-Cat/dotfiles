function cd() {
    builtin cd "$@" && clear && exa -la --icons
}
function cdls() {
    \cd "$@" && clear && exa -la --icons
}
alias cd="cd"
alias cdls="cdls"