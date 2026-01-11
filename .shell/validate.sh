#!/usr/bin/env bash

# Shell configuration validator
# Checks for missing dependencies, broken symlinks, and configuration issues

set -euo pipefail

DOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ERRORS=()
WARNINGS=()

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    local status="$1"
    local message="$2"
    case "$status" in
        "INFO") echo -e "${BLUE}ℹ${NC} $message" ;;
        "SUCCESS") echo -e "${GREEN}✓${NC} $message" ;;
        "WARNING") echo -e "${YELLOW}⚠${NC} $message" ;;
        "ERROR") echo -e "${RED}✗${NC} $message" ;;
    esac
}

add_error() {
    ERRORS+=("$1")
    print_status "ERROR" "$1"
}

add_warning() {
    WARNINGS+=("$1")
    print_status "WARNING" "$1"
}

check_environment_variables() {
    print_status "INFO" "Checking environment variables..."

    local required_vars=(
        "DOT"
        "SHELL_DIR"
        "BUNDLE_DIR"
        "ALIASES_ZSH_DIR"
    )

    for var in "${required_vars[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            add_error "Environment variable $var is not set"
        else
            print_status "SUCCESS" "$var = ${!var}"
        fi
    done
}

check_symlinks() {
    print_status "INFO" "Checking symlinks..."

    local dotfiles=(
        "$HOME/.zshrc"
        "$HOME/.zshenv"
        "$HOME/.vimrc"
        "$HOME/.gitconfig"
    )

    for dotfile in "${dotfiles[@]}"; do
        if [[ -L "$dotfile" ]]; then
            if [[ -e "$dotfile" ]]; then
                print_status "SUCCESS" "$(basename "$dotfile") symlink is valid"
            else
                add_error "$(basename "$dotfile") symlink is broken"
            fi
        elif [[ -e "$dotfile" ]]; then
            add_warning "$(basename "$dotfile") exists but is not a symlink"
        else
            add_warning "$(basename "$dotfile") does not exist"
        fi
    done
}

check_shell_configs() {
    print_status "INFO" "Checking shell configurations..."

    # Check .zsh directory and modules
    if [[ -d "$DOT_DIR/.shell/.zsh" ]]; then
        local zsh_modules=(
            "zinit.zsh"
            "fzf.zsh"
            "pyenv.zsh"
            "conda.zsh"
            "config.zsh"
            "others.zsh"
        )

        for module in "${zsh_modules[@]}"; do
            if [[ -f "$DOT_DIR/.shell/.zsh/$module" ]]; then
                print_status "SUCCESS" "Zsh module $module found"
            else
                add_warning "Zsh module $module not found"
            fi
        done
    else
        add_error ".shell/.zsh directory not found"
    fi

    # Check aliases directory
    if [[ -d "$DOT_DIR/.aliases/zsh" ]]; then
        local alias_count=$(find "$DOT_DIR/.aliases/zsh" -name "*.zsh" | wc -l)
        print_status "SUCCESS" "Found $alias_count Zsh alias files"
    else
        add_warning "Zsh aliases directory not found"
    fi
}

check_required_tools() {
    print_status "INFO" "Checking required tools..."

    # Read from Cargofile
    local cargofile="$DOT_DIR/.bundle/Cargofile"
    if [[ -f "$cargofile" ]]; then
        while IFS= read -r tool; do
            [[ -z "$tool" || "$tool" =~ ^[[:space:]]*# ]] && continue

            # Handle special cases
            local binary="$tool"
            case "$tool" in
                "rg"|"ripgrep") binary="rg" ;;
                "dust"|"du-dust") binary="dust" ;;
            esac

            if command -v "$binary" >/dev/null 2>&1; then
                print_status "SUCCESS" "$binary is installed"
            else
                add_warning "$binary is not installed"
            fi
        done < "$cargofile"
    else
        add_error "Cargofile not found"
    fi

    # Check other essential tools
    local essential_tools=(
        "git"
        "brew"
        "starship"
    )

    for tool in "${essential_tools[@]}"; do
        if command -v "$tool" >/dev/null 2>&1; then
            print_status "SUCCESS" "$tool is installed"
        else
            add_error "$tool is not installed"
        fi
    done
}

check_starship_config() {
    print_status "INFO" "Checking Starship configuration..."

    if [[ -f "$HOME/.config/starship.toml" ]]; then
        print_status "SUCCESS" "Starship config found at ~/.config/starship.toml"
    elif [[ -f "$DOT_DIR/.config/starship/starship.toml" ]]; then
        add_warning "Starship config found in dotfiles but not linked to ~/.config/"
    else
        add_error "Starship configuration not found"
    fi
}

check_syntax() {
    print_status "INFO" "Checking shell script syntax..."

    # Check .zshrc syntax
    if [[ -f "$DOT_DIR/.shell/.zshrc" ]]; then
        if zsh -n "$DOT_DIR/.shell/.zshrc" 2>/dev/null; then
            print_status "SUCCESS" ".shell/.zshrc syntax is valid"
        else
            add_error ".shell/.zshrc has syntax errors"
        fi
    fi

    # Check shell scripts in .bundle
    for script in "$DOT_DIR/.bundle"/*.sh; do
        [[ -f "$script" ]] || continue
        if bash -n "$script" 2>/dev/null; then
            print_status "SUCCESS" "$(basename "$script") syntax is valid"
        else
            add_error "$(basename "$script") has syntax errors"
        fi
    done
}

print_summary() {
    echo ""
    print_status "INFO" "Validation Summary:"

    if [[ ${#ERRORS[@]} -eq 0 && ${#WARNINGS[@]} -eq 0 ]]; then
        print_status "SUCCESS" "All checks passed! Your dotfiles configuration is healthy."
        return 0
    fi

    if [[ ${#WARNINGS[@]} -gt 0 ]]; then
        echo -e "\n${YELLOW}Warnings (${#WARNINGS[@]}):${NC}"
        printf ' • %s\n' "${WARNINGS[@]}"
    fi

    if [[ ${#ERRORS[@]} -gt 0 ]]; then
        echo -e "\n${RED}Errors (${#ERRORS[@]}):${NC}"
        printf ' • %s\n' "${ERRORS[@]}"
        return 1
    fi

    return 0
}

main() {
    echo "🔍 Dotfiles Configuration Validator"
    echo "===================================="

    check_environment_variables
    echo ""
    check_symlinks
    echo ""
    check_shell_configs
    echo ""
    check_required_tools
    echo ""
    check_starship_config
    echo ""
    check_syntax

    print_summary
}

# Help option
if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
    cat << EOF
Dotfiles Configuration Validator

Usage: $0 [options]

This script validates your dotfiles configuration by checking:
• Environment variables are properly set
• Symlinks are valid and not broken
• Required shell modules and aliases exist
• Essential tools are installed
• Configuration files have valid syntax
• Starship prompt is properly configured

Options:
    -h, --help    Show this help message

EOF
    exit 0
fi

main "$@"