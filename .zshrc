export ZSH="/Users/ocat/dotfiles/.oh-my-zsh"

ZSH_THEME="agnoster"
ZSH_THEME="powerlevel10k/powerlevel10k"

source $ZSH/oh-my-zsh.sh
# source ~/powerlevel10k/powerlevel10k.zsh-theme

# ┌───────────────────────┐
# │ neofetch ᕕ( ᐛ )ᕗ ↓↓↓↓│
# └───────────────────────┘
alias neofetch="neofetch --jp2a /Users/ocat/dotfiles/.config/neofetch/neofetch.jpeg"
# neofetch --jp2a /Users/ocat/dotfiles/.config/neofetch/neofetch.jpeg
# ┌───────────────────────┐
# │ ∠( ᐛ 」∠)_ end ↑↑↑↑↑↑↑│
# └───────────────────────┘

plugins=(git)

[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
