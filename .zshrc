###[ FIG ENV VARIABLES ]########################################################
[ -s ~/.fig/shell/pre.sh ] && source ~/.fig/shell/pre.sh
###[ END FIG ENV VARIABLES ]####################################################

###[ ~/.zshrc ]#################################################################
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
    source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

###[ global variable ]##########################################################
export DOT="$HOME/dotfiles"
export ZSH_DIR="$DOT/.zsh"
export ALIASES_DIR="$DOT/.aliases"
export OSINTDIR="$DOT/.widgets/OSINT-TOOLS-CLI"
export BAT_CONFIG_PATH="$DOT/.config/bat/bat.conf"

###[ ZSH source ]###############################################################
if [ -d $ZSH_DIR ] && [ -r $ZSH_DIR ] && [ -x $ZSH_DIR ]; then
    for file in ${ZSH_DIR}/**/*.zsh; do
        [ -r $file ] && source $file
    done
fi

###[ ALIAS source ]#############################################################
if [ -d $ALIASES_DIR ] && [ -r $ALIASES_DIR ] && [ -x $ALIASES_DIR ]; then
    for alias in ${ALIASES_DIR}/**/*.zsh; do
        [ -r $alias ] && source $alias
    done
fi

###[ config ]###################################################################
plugins=(git)
setopt HIST_IGNORE_SPACE
POWERLEVEL9K_DISABLE_CONFIGURATION_WIZARD=true

###[ p10k ]#####################################################################
# ZSH_THEME="powerlevel10k/powerlevel10k"
[[ ! -f .p10k.zsh ]] || source ~/.p10k.zsh

###[ FIG ENV VARIABLES ]########################################################
[ -s ~/.fig/fig.sh ] && source ~/.fig/fig.sh
###[ END FIG ENV VARIABLES ]####################################################
