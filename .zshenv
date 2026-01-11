export PATH="$PATH:$HOME/.deno/bin:$PATH"

###[ DOTFILES ]#################################################################
export DOT="$HOME/dotfiles"
export SHELL_DIR="$DOT/.shell/"
export BUNDLE_DIR="$DOT/.bundle"
export GITHUB_DIR="$DOT/.github"

###[ SHELL MODE SYSTEM ]########################################################
export BASH_DIR="$SHELL_DIR/.bash"
export ZSH_DIR="$SHELL_DIR/.zsh"

###[ ZSH ]######################################################################
export ALIASES_ZSH_DIR="$DOT/.aliases/zsh"

###[ ZSH ]######################################################################
export BAT_CONFIG_PATH="$DOT/.config/bat/bat.conf"

###[ RIP ]######################################################################
# export OSINT_DIR="$DOT/.widgets/OSINT-TOOLS-CLI"

source "$HOME/.cargo/env"
