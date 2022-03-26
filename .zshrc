###[ Fig pre ]##################################################################
export PATH="${PATH}:${HOME}/.local/bin"
eval "$(fig init zsh pre)"

###[ ~/.p10k ]#################################################################
# if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
#     source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
# fi

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

###[ p10k ]#####################################################################
# [[ ! -f .p10k.zsh ]] || source ~/.p10k.zsh

###[ Starship ]#################################################################
eval "$(starship init zsh)"

###[ Fig post ]#################################################################

# Fig post block. Keep at the bottom of this file.
eval "$(fig init zsh post)"

