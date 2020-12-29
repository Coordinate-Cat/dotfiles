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
### list segments aliases
alias ll='ls -lF'
alias lla='ls -alF'
alias la='ls -A'
alias l='ls -CF'

### brew aliases
alias bl='brew list'
alias bi='brew install'
alias bu='brew uninstall'

### Whether
alias wt='curl wttr.in/Tokyo'
alias wt2='curl v2d.wttr.in/Tokyo'
alias wt3='curl v3.wttr.in/Tokyo.sxl'
alias wtf='curl wttr.in/Tokyo?format=3'

### neofetch
alias neo="neofetch --iterm2 /Users/ocat/dotfiles/.config/neofetch/neofetch_iterm2.png"
alias neo2="neofetch --jp2a /Users/ocat/dotfiles/.config/neofetch/neofetch_jp2a.jpeg"
alias neo3="neofetch --caca /Users/ocat/dotfiles/.config/neofetch/neofetch_iterm2.png"

### christmas
alias merry="cat .links/ascii/tree_ascii.txt"

### ------ ∠( ᐛ 」∠)_ ------ ᕕ( ᐛ )ᕗ ------------
###  neofetch when term is opened
### ----------------------------------------------
# neofetch --jp2a /Users/ocat/dotfiles/.config/neofetch/neofetch_jp2a.jpeg

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
export MY_CONFIG="/Users/ocat/dotfiles/.config"

source $ZSH/oh-my-zsh.sh
source $MY_ALIASES/links.zsh
source ~ZSH_CUSTOM/plugins/fzf-tab

plugins=(git)

[[ ! -f .p10k.zsh ]] || source .p10k.zsh
