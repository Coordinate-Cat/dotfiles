export PATH="$PATH:$HOME/.deno/bin:$PATH"

###[ DOTFILES ]#################################################################
export DOT="$HOME/dotfiles"
export SHELL_DIR="$DOT/.shell/"
export BUNDLE_DIR="$DOT/.bundle"
export GITHUB_DIR="$DOT/.github"

###[ MULTIPLE SHELL MODE SYSTEM ]###############################################
export BASH_DIR="$SHELL_DIR/.bash"
export ZSH_DIR="$SHELL_DIR/.zsh"
export FISH_DIR="$SHELL_DIR/.fish"
export NUSHELL_DIR="$SHELL_DIR/.nushell"
export ELVISH_DIR="$SHELL_DIR/.elvish"
export XONSH_DIR="$SHELL_DIR/.xonsh"

export STARSHIP_CONFIG="$DOT/.config/starship/starship.toml"
export NU_CONFIG_PATH="$DOT/.shell/config.nu"

###[ ZSH ]######################################################################
export ALIASES_ZSH_DIR="$DOT/.aliases/zsh"

###[ ZSH ]######################################################################
export BAT_CONFIG_PATH="$DOT/.config/bat/bat.conf"

###[ RIP ]######################################################################
# export OSINT_DIR="$DOT/.widgets/OSINT-TOOLS-CLI"

source "$HOME/.cargo/env"
