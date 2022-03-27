###[ Fig pre ]##################################################################
export PATH="${PATH}:${HOME}/.local/bin"
eval "$(fig init zsh pre)"

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

###[ Starship ]#################################################################
eval "$(starship init zsh)"

###[ Fig post ]#################################################################
eval "$(fig init zsh post)"

