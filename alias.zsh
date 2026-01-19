###[ Application aliases ]#####################################################
alias vc="vscode"
alias figma='open -a "figma"'
alias st='open -a "SourceTree"'
alias ch='open -a "Google Chrome"'
alias vscode='open -a "Visual Studio Code"'

###[ Benchmark ]################################################################
alias bench='zsh $DOT/.github/benchmark.sh'

###[ Brew ]#####################################################################
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

###[ Cabal ]####################################################################
### https://github.com/cabal-club/cabal-cli
### simply running
alias cb='cabal'
### cabal <key>
alias cbo='cabal ocat'
### new instance
alias cbn='cabal --new'
### show saved cabals
alias cbn='cabal --cabals'

### cabal --save <key>
### e.g. cabal --save cabal://xxxxxxxxxxxx
alias cbn='cabal --save'

### cabal --alias <name> --key <key>
### cabal <name>

###[ CD ]#######################################################################
function cd() {
    builtin cd "$@" && clear && exa -la --icons
}
function cdls() {
    \cd "$@" && clear && exa -la --icons
}
alias cd="cd"
alias cdls="cdls"

###[ CUE ]######################################################################
alias cv='cue eval'
# cue export input.cue conditions.cue variables.cue test_target.cue -e outputParams
# rename test_target.cue
function ce() {
    cue export $1 $2 $3 $4 --out json;
}
alias ce=ce

###[ Deno ]#####################################################################
alias denor="deno run --allow-read --allow-write main.ts"

###[ Git ]######################################################################
alias gc='git clone'
alias gs='git status'

###[ Hyperfine ]################################################################
alias h1='hyperfine 'ls''

alias h2='hyperfine 'zsh''
alias h3='hyperfine 'bash''

alias h4='hyperfine --show-output 'neo5''


alias hf='h1&&h2&&h3&&h4'

###[ LS ]#######################################################################
# alias ls='exa -la'
alias ls1='clear && exa -1'
alias lsa='clear && exa -a'
alias lsh='clear && exa -h'
alias lsl='clear && exa -l'
alias lsr='clear && exa -r'
alias lsaa='clear && exa -A'
alias lsf='clear && exa -F'
alias lsrr='clear && exa -R'
alias lss='clear && exa -lS'
alias lst='clear && exa -lt'

###[ Neo ]######################################################################
alias neo1='clear && neofetch --iterm2 /Users/ocat/dotfiles/.config/neofetch/darkarmy.jpg'
alias neo2='clear && neofetch --jp2a /Users/ocat/dotfiles/.config/neofetch/darkarmy.jpg'
alias neo3='clear && neofetch --caca /Users/ocat/dotfiles/.config/neofetch/darkarmy.jpg'
alias neo4='clear && neofetch --jp2a /Users/ocat/dotfiles/.assets/darkarmy.jpg'
alias neo5='clear && neofetch --source /Users/ocat/dotfiles/.config/neofetch/pepe.txt'

###[ OSINT ]####################################################################
alias osint='zsh $DOT/.widgets/OSINT-TOOLS-CLI/osint.sh'

###[ Others ]###################################################################
# Basic aliases
alias as='alias'
alias cat='bat'
alias c='clear'
alias v='vim'
alias md='mkdir'
alias merry='cat .links/ascii/tree_ascii.txt'
alias dsstore="find . -name '*.DS_Store' -type f -ls -delete"
# alias nuopen="open"
# alias open="^open"

# zsh alias
alias sz='source ~/.zshrc'

# ls alias (additional)
alias lsa='ls -la'

# npm alias
alias nrtd='npm run tauri dev'
alias nrtb='npm run tauri build'

# spf alias (override)
alias spf='RUNEWIDTH_EASTASIAN=0 spf'

# sk alias
alias sk='sk --preview "bat --style=numbers --color=always --line-range :500 {}"'

###[ Shell mode ]###############################################################
alias :b='bash'
alias :z='zsh'
alias :f='fish'
alias :n='nu'
alias :e='elvish'
alias :x='xonsh'

###[ Tokei ]####################################################################
alias tk='tokei --hidden . >> ./.analysis/tokei.md'
alias tkym='tokei --hidden . --output yaml >> ./.analysis/tokei.yaml'

alias tes='tokei --hidden . > ./.analysis/tokei.txt && cat ./.analysis/tokei.txt'

###[ Vim ]######################################################################
alias vi='vim'
alias vim='vim'
alias nvim='nvim'

###[ Weather ]##################################################################
alias wt='curl wttr.in/Tokyo'
alias wt2='curl v2d.wttr.in/Tokyo'
alias wt3='curl v3.wttr.in/Tokyo.sxl'
alias wtf='curl wttr.in/Tokyo?format=3'