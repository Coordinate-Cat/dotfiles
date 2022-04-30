# Fig pre block. Keep at the top of this file.
. "$HOME/.fig/shell/bashrc.pre.bash"
###[ Fig pre ]##################################################################
######[ Starship ]##############################################################
eval "$(starship init bash)"

. "$HOME/.cargo/env"

######[ shopt ]#################################################################
shopt -s checkwinsize

######[ alias ]#################################################################
alias sb='source .bashrc'

alias :b='bash'
alias :z='zsh'
alias :n='nu'
alias :f='fish'
alias :e='elvish'
alias :t='tcsh'
alias :x='xonsh'

######[ others ]################################################################
export BASH_SILENCE_DEPRECATION_WARNING=1

###[ Fig post ]#################################################################

# Fig post block. Keep at the bottom of this file.
. "$HOME/.fig/shell/bashrc.post.bash"
