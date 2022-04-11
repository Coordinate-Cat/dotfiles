###[ Fig pre ]##################################################################
# Fig pre block. Keep at the top of this file.
export PATH="${PATH}:${HOME}/.local/bin"
eval "$(fig init zsh pre)"

###[ ZSH source ]###############################################################
if [ -d $ZSH_DIR ] && [ -r $ZSH_DIR ] && [ -x $ZSH_DIR ]; then
    for file in ${ZSH_DIR}/**/*.zsh; do
        [ -r $file ] && source $file
    done
fi

###[ ALIAS source ]#############################################################
# zsh
if [ -d $ALIASES_ZSH_DIR ] && [ -r $ALIASES_ZSH_DIR ] && [ -x $ALIASES_ZSH_DIR ]; then
    for alias in ${ALIASES_ZSH_DIR}/**/*.zsh; do
        [ -r $alias ] && source $alias
    done
fi

###[ Starship ]#################################################################
eval "$(starship init zsh)"

###[ Fig post ]#################################################################
# Fig post block. Keep at the bottom of this file.
eval "$(fig init zsh post)"

