### ------ ∠( ᐛ 」∠)_ ------ ᕕ( ᐛ )ᕗ ------------
###  ~/.zshrc
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

ZSH_THEME="powerlevel10k/powerlevel10k"
DOT="/Users/ocat/dotfiles"
export ZSH="/Users/ocat/dotfiles/.oh-my-zsh"
export BAT_CONFIG_PATH="$DOT/.config/bat/bat.conf"
export MY_ALIASES="$DOT/.aliases"

### nodebrew
export PATH=$HOME/.nodebrew/current/bin:$PATH

### nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

### llvm & dosfstools
export PATH=/usr/local/Cellar/llvm/11.1.0/bin:$PATH
export PATH=/usr/local/Cellar/dosfstools/4.2/sbin:$PATH

### fzf
export FZF_DEFAULT_COMMAND='rg --files'
export FZF_DEFAULT_OPTS='--reverse --preview "bat --color=always --style=header,grid --line-range :100 {}"'
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

app() {
  sapp_list=$(find /System/Applications -maxdepth 3 -type d |
                grep '\.app$' |
                sed 's/\/System\/Applications\///' |
                sed 's/\.app$//' |
                sed 's/^/ : /')
  aapp_list=$(find /Applications -maxdepth 3 -type d |
                grep '\.app$' |
                sed 's/\/Applications\///' |
                sed 's/\.app$//' |
                sed 's/^/ : /')
  uapp_dest="/Users/$(whoami)/Applications"
  uapp_dest_sed="s/\/Users\/$(whoami)\/Applications\///"
  # echo $uapp_dest_sed
  uapp_list=$(find $uapp_dest -maxdepth 3 -type d |
                grep '\.app$' |
                sed $uapp_dest_sed |
                sed 's/\.app$//' |
                sed 's/^/ : /')
  # echo -e $uapp_list
  app_path=$(echo -e "$sapp_list\n$aapp_list\n$uapp_list" | fzf --query="$1" --prompt="App > " --exit-0)
  if [ -n "$app_path" ]; then
    open_path_u="s/U::/\/Users\/$(whoami)\/Applications\//"
    open_path=$(echo "$app_path" |
                  sed 's/ : /\/System\/Applications\//' |
                  sed 's/ : /\/Applications\//' |
                  sed $open_path_u)
    # echo $open_path
    open -a "$open_path.app"
    # preventing open command returns not 0
    :
  fi
}

### alias source
source $MY_ALIASES/app.zsh
source $MY_ALIASES/brew.zsh
source $MY_ALIASES/cabal.zsh
source $MY_ALIASES/git.zsh
source $MY_ALIASES/ls.zsh
source $MY_ALIASES/links.zsh
source $MY_ALIASES/neo.zsh
source $MY_ALIASES/osint.zsh
source $MY_ALIASES/others.zsh
source $MY_ALIASES/wttr.zsh

### others
source $ZSH/oh-my-zsh.sh
source ~ZSH_CUSTOM/plugins/fzf-tab
source ~/.nvm/nvm.sh
[[ ! -f .p10k.zsh ]] || source .p10k.zsh

plugins=(git)
ZSH_DISABLE_COMPFIX="true"
POWERLEVEL9K_DISABLE_CONFIGURATION_WIZARD=true
