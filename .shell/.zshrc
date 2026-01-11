###[ Kiro CLI pre ]#############################################################
# Kiro CLI pre block. Keep at the top of this file.
[[ -f "${HOME}/Library/Application Support/kiro-cli/shell/zshrc.pre.zsh" ]] && builtin source "${HOME}/Library/Application Support/kiro-cli/shell/zshrc.pre.zsh"

###[ PATH settings ]#############################################################
export PATH="$HOME/.cargo/bin:$PATH"
export PATH=~/.npm-global/bin:$PATH
export PATH="$(brew --prefix python)/libexec/bin:$PATH"
export PATH="$HOME/.skim:$PATH"

###[ Environment variables ]#####################################################
# spf config
export RUNEWIDTH_EASTASIAN=0
export LANG=C.utf8

# sk config
export SKIM_DEFAULT_COMMAND="fd --type f --exclude .git || git ls-tree -r --name-only HEAD || rg --files --glob '!**/.git/**' || find . -type f -not -path '*/.git/*'"

# libclang path
export LIBCLANG_PATH="/opt/homebrew/opt/llvm/lib"
export DYLD_LIBRARY_PATH="/opt/homebrew/opt/llvm/lib"

# NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

###[ Additional aliases ]########################################################
# Basic aliases
alias as='alias'
alias cat='bat'
alias c='clear'
alias v='vim'

# npm alias
alias nrtd='npm run tauri dev'
alias nrtb='npm run tauri build'

# zsh alias
alias sz='source ~/.zshrc'

# ls alias
alias lsa='ls -la'

# git alias
alias gc='git clone'
alias gs='git status'

# spf alias
alias spf='RUNEWIDTH_EASTASIAN=0 spf'

# sk alias
alias sk='sk --preview "bat --style=numbers --color=always --line-range :500 {}"'

# claude alias
alias claude="/Users/ocat/.claude/local/claude"

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
# zsh
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
