###[ FIG ENV VARIABLES ]########################################################
[ -s ~/.fig/shell/pre.sh ] && source ~/.fig/shell/pre.sh
###[ END FIG ENV VARIABLES ]####################################################

###[ ~/.zshrc ]#################################################################
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

function _update_ps1() {
  PS1=$(powerline-shell $?)
}

if [[ $TERM != linux && ! $PROMPT_COMMAND =~ _update_ps1 ]]; then
  PROMPT_COMMAND="_update_ps1; $PROMPT_COMMAND"
fi

# setopt auto_cd
# setopt auto_pushd # cd -[tab]で過去のディレクトリにひとっ飛びできるようにする
setopt HIST_IGNORE_SPACE

###[ global variable ]##########################################################
export DOT="$HOME/dotfiles"
export MY_ALIASES="$DOT/.aliases"
export BAT_CONFIG_PATH="$DOT/.config/bat/bat.conf"
export OSINTDIR="$DOT/.osint/OSINT-TOOLS-CLI"

###[ alias source ]#############################################################
source $OSINTDIR/devenv.zsh
# source $OSINTDIR/env.zsh

source $MY_ALIASES/app.zsh
source $MY_ALIASES/brew.zsh
source $MY_ALIASES/cabal.zsh
source $MY_ALIASES/cue.zsh
source $MY_ALIASES/git.zsh
source $MY_ALIASES/ls.zsh
source $MY_ALIASES/links.zsh
source $MY_ALIASES/neo.zsh
source $MY_ALIASES/osint.zsh
source $MY_ALIASES/others.zsh
source $MY_ALIASES/wttr.zsh

###[ fnm ]######################################################################
# eval "$(fnm env --use-on-cd)"

###[ nodebrew ]#################################################################
# export PATH=$HOME/.nodebrew/current/bin:$PATH

###[ nodenv ]###################################################################
# eval "$(nodenv init -)"

###[ nvm ]######################################################################
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

###[ llvm & dosfstools ]########################################################
export PATH=/usr/local/Cellar/llvm/11.1.0/bin:$PATH
export PATH=/usr/local/Cellar/dosfstools/4.2/sbin:$PATH

###[ fzf ]######################################################################
export FZF_DEFAULT_COMMAND='rg --hidden --no-ignore -l ""'
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

###[ pyenv(py3) ]###############################################################
# export PYENV_ROOT="$HOME/.pyenv"
# export PATH="$PYENV_ROOT/bin:$PATH"
# eval "$(pyenv init --path)"

###[ others ]###################################################################
# source $ZSH/oh-my-zsh.sh
# source ~ZSH_CUSTOM/plugins/fzf-tab
# source ~/.nvm/nvm.sh

plugins=(git)
ZSH_DISABLE_COMPFIX="true"
POWERLEVEL9K_DISABLE_CONFIGURATION_WIZARD=true

###[ conda initialize ]#########################################################
__conda_setup="$('/Users/ocat/opt/anaconda3/bin/conda' 'shell.zsh' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/Users/ocat/opt/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/Users/ocat/opt/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/Users/ocat/opt/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup

###[ Added by Zinit's installer ]###############################################
if [[ ! -f $HOME/.local/share/zinit/zinit.git/zinit.zsh ]]; then
    print -P "%F{33} %F{220}Installing %F{33}ZDHARMA-CONTINUUM%F{220} Initiative Plugin Manager (%F{33}zdharma-continuum/zinit%F{220})…%f"
    command mkdir -p "$HOME/.local/share/zinit" && command chmod g-rwX "$HOME/.local/share/zinit"
    command git clone https://github.com/zdharma-continuum/zinit "$HOME/.local/share/zinit/zinit.git" && \
        print -P "%F{33} %F{34}Installation successful.%f%b" || \
        print -P "%F{160} The clone has failed.%f%b"
fi

source "$HOME/.local/share/zinit/zinit.git/zinit.zsh"
autoload -Uz _zinit
(( ${+_comps} )) && _comps[zinit]=_zinit

zinit ice depth=1
# zinit light zsh-users/zsh-completions
# zinit light zsh-users/zsh-autosuggestions
# zinit light zsh-users/zsh-syntax-highlighting
# zinit light zdharma-continuum/fast-syntax-highlighting

###[ cd & lsd ]#################################################################

function cd() {
    builtin cd "$@" && clear && lsd -la
}
function cdls() {
    \cd "$@" && clear && lsd -la
}

# alias cd="cdls"

###[ p10k ]#####################################################################

# ZSH_THEME="powerlevel10k/powerlevel10k"
zinit light romkatv/powerlevel10k
[[ ! -f .p10k.zsh ]] || source ~/.p10k.zsh

###[ FIG ENV VARIABLES ]########################################################
[ -s ~/.fig/fig.sh ] && source ~/.fig/fig.sh
###[ END FIG ENV VARIABLES ]####################################################
