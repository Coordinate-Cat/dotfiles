function bi() {
    clear && brew install "$@"
}
function bu() {
    clear && brew uninstall "$@"
}
alias bi='bi'
alias bu='bu'

alias bl='clear && brew list'
alias bb='clear && brew bundle --file ${BUNDLE}/Brewfile'