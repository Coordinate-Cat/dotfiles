export ZSH="/Users/ocat/dotfiles/.oh-my-zsh"

ZSH_THEME="agnoster"
ZSH_THEME="powerlevel10k/powerlevel10k"


source $ZSH/oh-my-zsh.sh
source ~/powerlevel10k/powerlevel10k.zsh-theme

# ┌───────────────────────┐
# │ neofetch ᕕ( ᐛ )ᕗ ↓↓↓↓│
# └───────────────────────┘
alias neofetch="neofetch --iterm2 /Users/ocat/dotfiles/.config/neofetch/neofetch.png"
neofetch --iterm2 /Users/ocat/dotfiles/.config/neofetch/neofetch.png

plugins=(git)

[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

export PS1="[\[\033[00;36m\]\s \W\[\033[00m\]]\$ "
