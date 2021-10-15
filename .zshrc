### ------ ∠( ᐛ 」∠)_ ------ ᕕ( ᐛ )ᕗ ------------
###  prompt
### ----------------------------------------------
### The code below should be written at the top of ~/.zshrc
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

function _update_ps1() {
  PS1=$(powerline-shell $?)
}

if [[ $TERM != linux && ! $PROMPT_COMMAND =~ _update_ps1 ]]; then
  PROMPT_COMMAND="_update_ps1; $PROMPT_COMMAND"
fi

### ------ ∠( ᐛ 」∠)_ ------ ᕕ( ᐛ )ᕗ ------------
###  aliases
### ----------------------------------------------
### cd aliases
alias d='cd ./dotfiles'

### list segments aliases
alias ll='ls -lF'
alias lla='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias vscode='open -a "Visual Studio Code"'

alias flx='zsh /Users/ocat/Flexxx/sns.sh'
alias flxsns='zsh /Users/ocat/Flexxx/sns.sh'
alias flxapp='zsh /Users/ocat/Flexxx/app.sh'

### brew aliases
alias bl='brew list'
alias bi='brew install'
alias bu='brew uninstall'

### nodebrew aliases
alias nb lr='nodebrew ls-remote'

### Whether
alias wt='curl wttr.in/Tokyo'
alias wt2='curl v2d.wttr.in/Tokyo'
alias wt3='curl v3.wttr.in/Tokyo.sxl'
alias wtf='curl wttr.in/Tokyo?format=3'

### neofetch
alias neo="neofetch --iterm2 /Users/ocat/dotfiles/.config/neofetch/neofetch_iterm2.png"
alias neo2="neofetch --jp2a /Users/ocat/dotfiles/.config/neofetch/neofetch_jp2a.jpeg"
alias neo3="neofetch --caca /Users/ocat/dotfiles/.config/neofetch/neofetch_iterm2.png"
alias neo4="neofetch --iterm2 /Users/ocat/dotfiles/.config/neofetch/jeff.png"


### christmas
alias merry="cat .links/ascii/tree_ascii.txt"

## links
alias figma="open https://www.figma.com/file/5jOfkehBg8VJEITcPdMYKG/subwayUI-Project"

### ------ ∠( ᐛ 」∠)_ ------ ᕕ( ᐛ )ᕗ ------------
###  neofetch when term is opened
### ----------------------------------------------
neofetch --iterm2 /Users/ocat/dotfiles/.config/neofetch/jeff.png

### ------ ∠( ᐛ 」∠)_ ------ ᕕ( ᐛ )ᕗ ------------
###  fzf
### ----------------------------------------------
export FZF_DEFAULT_COMMAND='rg --files'
export FZF_DEFAULT_OPTS='--reverse --preview "bat --color=always --style=header,grid --line-range :100 {}"'
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

### ------ ∠( ᐛ 」∠)_ ------ ᕕ( ᐛ )ᕗ ------------
###  others
### ----------------------------------------------
ZSH_THEME="powerlevel10k/powerlevel10k"
export ZSH="/Users/ocat/dotfiles/.oh-my-zsh"
export BAT_CONFIG_PATH="/Users/ocat/dotfiles/.config/bat/bat.conf"
export MY_ALIASES="/Users/ocat/dotfiles/.aliases"

### llvm & dosfstools
export PATH=/usr/local/Cellar/llvm/11.1.0/bin:$PATH
export PATH=/usr/local/Cellar/dosfstools/4.2/sbin:$PATH

### nodebrew
export PATH=$HOME/.nodebrew/current/bin:$PATH

ZSH_DISABLE_COMPFIX="true"
source $ZSH/oh-my-zsh.sh
source $MY_ALIASES/links.zsh
source ~ZSH_CUSTOM/plugins/fzf-tab

plugins=(git)

[[ ! -f .p10k.zsh ]] || source .p10k.zsh
POWERLEVEL9K_DISABLE_CONFIGURATION_WIZARD=true
