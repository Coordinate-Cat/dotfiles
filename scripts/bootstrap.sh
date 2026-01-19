#!/bin/bash

# macOS Full Environment Bootstrap Script
# One command setup for complete development environment

set -euo pipefail

# Test mode detection
DOTFILES_TEST=${DOTFILES_TEST:-false}

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DOT_DIR="$HOME/dotfiles"
GITHUB_USERNAME=""
GITHUB_EMAIL=""

print_header() {
    echo -e "${BLUE}"
    echo "🚀 macOS Environment Bootstrap"
    echo "============================="
    echo -e "${NC}"
}

prompt_user_info() {
    echo -e "${YELLOW}Enter your GitHub information (required for SSH setup):${NC}"
    read -p "GitHub username: " GITHUB_USERNAME
    read -p "GitHub email: " GITHUB_EMAIL

    if [[ -z "$GITHUB_USERNAME" || -z "$GITHUB_EMAIL" ]]; then
        echo -e "${RED}GitHub info required for full automation${NC}"
        exit 1
    fi
}

install_xcode_tools() {
    echo -e "${GREEN}Installing Xcode Command Line Tools...${NC}"
    if ! xcode-select -p &> /dev/null; then
        if [ "$DOTFILES_TEST" = "true" ]; then
            echo "TEST MODE: Would install Xcode Command Line Tools"
            return
        fi
        xcode-select --install
        echo "Please complete Xcode tools installation and re-run this script"
        exit 1
    fi
}

install_homebrew() {
    echo -e "${GREEN}Installing Homebrew...${NC}"
    if ! command -v brew &> /dev/null; then
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
}

setup_dotfiles() {
    echo -e "${GREEN}Setting up dotfiles...${NC}"
    if [ ! -d "$DOT_DIR" ]; then
        git clone https://github.com/Coordinate-Cat/dotfiles.git "$DOT_DIR"
    fi

    cd "$DOT_DIR"

    # Create symlinks
    for f in .vimrc .editorconfig .npmrc .zshrc .zshenv .aliases .shell .config .bundle .cargo; do
        if [ -e "$f" ]; then
            ln -snf "$DOT_DIR/$f" "$HOME/$f"
            echo "Linked $f"
        fi
    done
}

install_packages() {
    echo -e "${GREEN}Installing packages...${NC}"
    cd "$DOT_DIR"

    # Homebrew packages
    brew bundle --file .bundle/Brewfile

    # Rust
    if ! command -v rustup &> /dev/null; then
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
        source "$HOME/.cargo/env"
    fi

    # Cargo packages
    cargo install $(cat .bundle/Cargofile | tr '\n' ' ')

    # Zinit
    if [ ! -d "$HOME/.local/share/zinit" ]; then
        bash -c "$(curl --fail --show-error --silent --location https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
    fi

    # VS Code extensions
    if command -v code &> /dev/null; then
        while read -r extension; do
            code --install-extension "$extension" --force
        done < .bundle/Vscfile
    fi
}

setup_ssh() {
    echo -e "${GREEN}Setting up SSH keys...${NC}"
    if [ ! -f "$HOME/.ssh/id_ed25519" ]; then
        ssh-keygen -t ed25519 -C "$GITHUB_EMAIL" -f "$HOME/.ssh/id_ed25519" -N ""
        ssh-add "$HOME/.ssh/id_ed25519"

        echo -e "${YELLOW}SSH public key generated. Add this to your GitHub account:${NC}"
        cat "$HOME/.ssh/id_ed25519.pub"
        echo -e "${YELLOW}Press any key after adding the key to GitHub...${NC}"
        read -n 1
    fi
}

configure_git() {
    echo -e "${GREEN}Configuring Git...${NC}"
    git config --global user.name "$GITHUB_USERNAME"
    git config --global user.email "$GITHUB_EMAIL"
    git config --global init.defaultBranch main
    git config --global pull.rebase true
}

configure_macos() {
    echo -e "${GREEN}Configuring macOS preferences...${NC}"

    # Dock
    defaults write com.apple.dock autohide -bool true
    defaults write com.apple.dock show-recents -bool false
    defaults write com.apple.dock tilesize -int 48

    # Finder
    defaults write com.apple.finder ShowPathbar -bool true
    defaults write com.apple.finder ShowStatusBar -bool true
    defaults write NSGlobalDomain AppleShowAllExtensions -bool true

    # Screenshots
    defaults write com.apple.screencapture location -string "$HOME/Desktop"
    defaults write com.apple.screencapture type -string "png"

    # Trackpad
    defaults write com.apple.driver.AppleBluetoothMultitouch.trackpad Clicking -bool true
    defaults write NSGlobalDomain com.apple.mouse.tapBehavior -int 1

    # Keyboard
    defaults write NSGlobalDomain KeyRepeat -int 2
    defaults write NSGlobalDomain InitialKeyRepeat -int 15

    # Menu bar
    defaults write com.apple.menuextra.clock DateFormat -string "EEE MMM d  h:mm a"

    killall Dock Finder SystemUIServer
}

setup_app_store() {
    echo -e "${GREEN}Setting up App Store apps...${NC}"
    if command -v mas &> /dev/null; then
        echo -e "${YELLOW}Please sign in to App Store manually, then press any key...${NC}"
        open -a "App Store"
        read -n 1
        mas install 497799835 # Xcode
        mas install 1429033973 # RunCat
    fi
}

start_services() {
    echo -e "${GREEN}Starting services...${NC}"
    brew services start yabai 2>/dev/null || true
}

main() {
    print_header

    prompt_user_info
    install_xcode_tools
    install_homebrew
    setup_dotfiles
    install_packages
    setup_ssh
    configure_git
    configure_macos
    setup_app_store
    start_services

    echo -e "${GREEN}"
    echo "🎉 Setup complete!"
    echo "Please restart your terminal to apply all changes."
    echo -e "${NC}"
}

main "$@"