# Fig pre block. Keep at the top of this file.
. "$HOME/.fig/shell/bashrc.pre.bash"
###[ Fig pre ]##################################################################
######[ Starship ]##############################################################
eval "$(starship init bash)"

. "$HOME/.cargo/env"

######[ shopt ]#################################################################
shopt -s checkwinsize

######[ source ]#################################################################
source ~/dotfiles/.aliases/bash/ls.sh
source ~/dotfiles/.aliases/bash/shell.sh
source ~/dotfiles/.aliases/bash/source.sh

######[ others ]################################################################
export BASH_SILENCE_DEPRECATION_WARNING=1

###[ Fig post ]#################################################################

# Fig post block. Keep at the bottom of this file.
. "$HOME/.fig/shell/bashrc.post.bash"
