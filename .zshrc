###[ Kiro CLI pre ]#############################################################
# Kiro CLI pre block. Keep at the top of this file.
[[ -f "${HOME}/Library/Application Support/kiro-cli/shell/zshrc.pre.zsh" ]] && builtin source "${HOME}/Library/Application Support/kiro-cli/shell/zshrc.pre.zsh"

# Source environment variables first
[[ -f "$HOME/dotfiles/.zshenv" ]] && source "$HOME/dotfiles/.zshenv"

###[ PATH settings ]#############################################################
export PATH="$HOME/.cargo/bin:$PATH"
export PATH=~/.npm-global/bin:$PATH
export PATH="$(brew --prefix python)/libexec/bin:$PATH"
export PATH="$HOME/.skim:$PATH"
export PATH="$HOME/.claude/local:$PATH"

###[ Environment variables ]#####################################################
# spf config
export RUNEWIDTH_EASTASIAN=0
export LANG=C.utf8

# sk config
export SKIM_DEFAULT_COMMAND="fd --type f --exclude .git || git ls-tree -r --name-only HEAD || rg --files --glob '!**/.git/**' || find . -type f -not -path '*/.git/*'"

# libclang path
export LIBCLANG_PATH="/opt/homebrew/opt/llvm/lib"
export DYLD_LIBRARY_PATH="/opt/homebrew/opt/llvm/lib"

# FNM (Fast Node Manager)
if command -v fnm &> /dev/null; then
  eval "$(fnm env --use-on-cd)"
fi


###[ Functions ]##################################################################
function set_bat_theme {
  if [[ "$TERM" == "xterm-256color" ]]; then
    export BAT_THEME="Monokai Extended"
  elif [[ "$TERM" == "screen-256color" ]]; then
    export BAT_THEME="Nord"
  else
    export BAT_THEME="TwoDark"
  fi
}

set_bat_theme

###[ ZSH source ]###############################################################
if [ -d $ZSH_DIR ] && [ -r $ZSH_DIR ] && [ -x $ZSH_DIR ]; then
    for file in ${ZSH_DIR}/**/*.zsh; do
        [ -r $file ] && source $file
    done
fi

###[ ALIAS source ]#############################################################
# Main alias file
[ -r "$DOT/alias.zsh" ] && source "$DOT/alias.zsh"

# Additional zsh aliases
if [ -d $ALIASES_ZSH_DIR ] && [ -r $ALIASES_ZSH_DIR ] && [ -x $ALIASES_ZSH_DIR ]; then
    for alias in ${ALIASES_ZSH_DIR}/**/*.zsh; do
        [ -r $alias ] && source $alias
    done
fi

###[ Starship ]#################################################################
eval "$(starship init zsh)"

###[ Superfile ]##################################################################
function spf() {
    local os=$(uname -s)

    # Linux
    if [[ "$os" == "Linux" ]]; then
        export SPF_LAST_DIR="${XDG_STATE_HOME:-$HOME/.local/state}/superfile/lastdir"
    fi

    # macOS
    if [[ "$os" == "Darwin" ]]; then
        export SPF_LAST_DIR="$HOME/Library/Application Support/superfile/lastdir"
    fi

    command spf "$@"

    if [[ -f "$SPF_LAST_DIR" ]]; then
        source "$SPF_LAST_DIR"
        rm -f "$SPF_LAST_DIR" > /dev/null 2>&1
    fi
}

###[ Kiro CLI post ]############################################################
# Kiro CLI post block. Keep at the bottom of this file.
[[ -f "${HOME}/Library/Application Support/kiro-cli/shell/zshrc.post.zsh" ]] && builtin source "${HOME}/Library/Application Support/kiro-cli/shell/zshrc.post.zsh"