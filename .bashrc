# Fig pre block. Keep at the top of this file.
export PATH="${PATH}:${HOME}/.local/bin"
eval "$(fig init bash pre)"

###[ Fig pre ]#####################################################################[ Starship ]#################################################################
eval "$(starship init bash)"

. "$HOME/.cargo/env"

###[ Fig post ]#################################################################

# Fig post block. Keep at the bottom of this file.
eval "$(fig init bash post)"

