### ------ ∠( ᐛ 」∠)_ ------ ᕕ( ᐛ )ᕗ ------------
### prompt
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
### alias
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

### ------ ∠( ᐛ 」∠)_ ------ ᕕ( ᐛ )ᕗ ------------
### neofetch
### ----------------------------------------------
alias neo="neofetch --jp2a /Users/ocat/dotfiles/.config/neofetch/neofetch_jp2a.jpeg"
alias neo2="neofetch --iterm2 /Users/ocat/dotfiles/.config/neofetch/neofetch_iterm2.png"
neofetch --jp2a /Users/ocat/dotfiles/.config/neofetch/neofetch_jp2a.jpeg

### ------ ∠( ᐛ 」∠)_ ------ ᕕ( ᐛ )ᕗ ------------
### other
### ----------------------------------------------
ZSH_THEME="powerlevel10k/powerlevel10k"
export ZSH="/Users/ocat/dotfiles/.oh-my-zsh"

source $ZSH/oh-my-zsh.sh
source ~ZSH_CUSTOM/plugins/fzf-tab

plugins=(git)

[[ ! -f .p10k.zsh ]] || source .p10k.zsh
