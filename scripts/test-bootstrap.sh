#!/bin/bash

# Safe Bootstrap Testing Script
# Creates backup and provides rollback functionality

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

BACKUP_DIR="$HOME/.dotfiles-test-backup-$(date +%Y%m%d-%H%M%S)"
TEST_MODE=false
DRY_RUN=false

print_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo "Options:"
    echo "  --dry-run     Show what would be done without executing"
    echo "  --test        Run in test mode with backup/rollback"
    echo "  --rollback    Rollback from previous test"
    echo "  --help        Show this help"
}

create_backup() {
    echo -e "${GREEN}Creating backup at $BACKUP_DIR...${NC}"
    mkdir -p "$BACKUP_DIR"

    # Backup existing dotfiles
    for file in .zshrc .zshenv .vimrc .gitconfig .ssh/config; do
        if [ -f "$HOME/$file" ]; then
            mkdir -p "$BACKUP_DIR/$(dirname $file)"
            cp "$HOME/$file" "$BACKUP_DIR/$file"
        fi
    done

    # Backup directories
    for dir in .config .aliases .shell .cargo; do
        if [ -d "$HOME/$dir" ]; then
            cp -r "$HOME/$dir" "$BACKUP_DIR/"
        fi
    done

    # Save installed packages list
    if command -v brew &> /dev/null; then
        brew list --formula > "$BACKUP_DIR/brew-formulas.txt"
        brew list --cask > "$BACKUP_DIR/brew-casks.txt"
    fi

    if command -v code &> /dev/null; then
        code --list-extensions > "$BACKUP_DIR/vscode-extensions.txt"
    fi

    echo "✅ Backup created: $BACKUP_DIR"
}

rollback() {
    if [ ! -d "$BACKUP_DIR" ]; then
        echo -e "${RED}No backup directory found. Specify with BACKUP_DIR env var${NC}"
        exit 1
    fi

    echo -e "${YELLOW}Rolling back from $BACKUP_DIR...${NC}"

    # Remove dotfiles directory
    if [ -d "$HOME/dotfiles" ]; then
        rm -rf "$HOME/dotfiles"
    fi

    # Restore files
    if [ -d "$BACKUP_DIR" ]; then
        cp -r "$BACKUP_DIR"/* "$HOME/"
    fi

    # Remove symlinks created by bootstrap
    for file in .vimrc .editorconfig .npmrc .aliases .shell; do
        if [ -L "$HOME/$file" ]; then
            rm "$HOME/$file"
        fi
    done

    echo -e "${GREEN}✅ Rollback complete${NC}"
}

dry_run_bootstrap() {
    echo -e "${BLUE}DRY RUN MODE - Nothing will be installed${NC}"
    echo ""
    echo "Would perform the following actions:"
    echo "1. Install Xcode Command Line Tools"
    echo "2. Install Homebrew"
    echo "3. Clone dotfiles repository"
    echo "4. Create symlinks:"
    echo "   - ~/.vimrc -> ~/dotfiles/.vimrc"
    echo "   - ~/.editorconfig -> ~/dotfiles/.editorconfig"
    echo "   - ~/.npmrc -> ~/dotfiles/.npmrc"
    echo "   - ~/.aliases -> ~/dotfiles/.aliases"
    echo "   - ~/.shell -> ~/dotfiles/.shell"
    echo "5. Install packages from .bundle/:"
    echo "   - Homebrew packages (30+)"
    echo "   - Cargo packages (8)"
    echo "   - VS Code extensions (117)"
    echo "6. Configure Git with provided username/email"
    echo "7. Generate SSH keys"
    echo "8. Configure macOS system preferences"
    echo "9. Install App Store apps"
    echo "10. Start services"
}

test_bootstrap() {
    echo -e "${GREEN}Running bootstrap in test mode...${NC}"
    create_backup

    # Run actual bootstrap with test flag
    DOTFILES_TEST=true ./bootstrap.sh

    echo ""
    echo -e "${YELLOW}Test completed. To rollback:${NC}"
    echo "BACKUP_DIR=$BACKUP_DIR $0 --rollback"
}

main() {
    case "${1:-}" in
        --dry-run)
            dry_run_bootstrap
            ;;
        --test)
            test_bootstrap
            ;;
        --rollback)
            BACKUP_DIR="${BACKUP_DIR:-$2}" rollback
            ;;
        --help)
            print_usage
            ;;
        *)
            echo "Select test mode:"
            echo "1. Dry run (safe preview)"
            echo "2. Test with backup/rollback"
            echo "3. Show help"
            read -p "Choice [1-3]: " choice
            case $choice in
                1) dry_run_bootstrap ;;
                2) test_bootstrap ;;
                3) print_usage ;;
                *) echo "Invalid choice" ;;
            esac
            ;;
    esac
}

main "$@"