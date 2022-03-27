###[ Fig pre ]##################################################################
export PATH="${PATH}:${HOME}/.local/bin"
eval "$(fig init bash pre)"

###[ Starship ]#################################################################
eval "$(starship init bash)"

. "$HOME/.cargo/env"

###[ Fig post ]#################################################################
eval "$(fig init bash post)"
