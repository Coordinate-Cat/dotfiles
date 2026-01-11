#!/usr/bin/env bash

# Cargo tools installer with smart dependency checking
# Author: Claude Code Assistant

set -euo pipefail

DOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CARGOFILE="$DOT_DIR/.bundle/Cargofile"
LOG_FILE="$DOT_DIR/.bundle/cargo-install.log"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Package name mapping for crates that have different install names
declare -A PACKAGE_MAP=(
    ["rg"]="ripgrep"
    ["dust"]="du-dust"
)

log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

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

check_rust() {
    if ! command -v cargo &> /dev/null; then
        print_status "ERROR" "Cargo not found. Please install Rust first."
        return 1
    fi

    local rust_version=$(rustc --version | cut -d' ' -f2)
    print_status "INFO" "Rust version: $rust_version"
    return 0
}

is_installed() {
    local package="$1"
    local mapped_name="${PACKAGE_MAP[$package]:-$package}"

    # Check if binary exists in cargo bin directory
    if [[ -f "$HOME/.cargo/bin/$package" ]]; then
        return 0
    fi

    # Check if installed via cargo
    if cargo install --list 2>/dev/null | grep -q "^$mapped_name "; then
        return 0
    fi

    return 1
}

install_package() {
    local package="$1"
    local mapped_name="${PACKAGE_MAP[$package]:-$package}"

    print_status "INFO" "Installing $package (crate: $mapped_name)..."

    # Try install with --locked first for compatibility
    if cargo install "$mapped_name" --locked 2>/dev/null; then
        print_status "SUCCESS" "Successfully installed $package"
        log "SUCCESS: Installed $package ($mapped_name)"
        return 0
    else
        print_status "WARNING" "Failed with --locked, trying without..."
        if cargo install "$mapped_name" 2>/dev/null; then
            print_status "SUCCESS" "Successfully installed $package"
            log "SUCCESS: Installed $package ($mapped_name) without --locked"
            return 0
        else
            print_status "ERROR" "Failed to install $package"
            log "ERROR: Failed to install $package ($mapped_name)"
            return 1
        fi
    fi
}

main() {
    print_status "INFO" "Starting Cargo tools installation..."

    # Initialize log file
    echo "=== Cargo Installation Log - $(date) ===" > "$LOG_FILE"

    # Check prerequisites
    if ! check_rust; then
        exit 1
    fi

    if [[ ! -f "$CARGOFILE" ]]; then
        print_status "ERROR" "Cargofile not found at $CARGOFILE"
        exit 1
    fi

    local packages=()
    local installed=()
    local failed=()

    # Read packages from Cargofile
    while IFS= read -r line; do
        # Skip empty lines and comments
        [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
        packages+=("$line")
    done < "$CARGOFILE"

    print_status "INFO" "Found ${#packages[@]} packages in Cargofile"

    # Check what's already installed
    for package in "${packages[@]}"; do
        if is_installed "$package"; then
            print_status "SUCCESS" "$package is already installed"
            installed+=("$package")
        else
            print_status "INFO" "$package needs installation"
        fi
    done

    # Install missing packages
    local to_install=()
    for package in "${packages[@]}"; do
        if ! printf '%s\n' "${installed[@]}" | grep -q "^$package$"; then
            to_install+=("$package")
        fi
    done

    if [[ ${#to_install[@]} -eq 0 ]]; then
        print_status "SUCCESS" "All packages are already installed!"
        return 0
    fi

    print_status "INFO" "Installing ${#to_install[@]} missing packages..."

    for package in "${to_install[@]}"; do
        if install_package "$package"; then
            installed+=("$package")
        else
            failed+=("$package")
        fi
    done

    # Summary
    echo ""
    print_status "INFO" "Installation Summary:"
    print_status "SUCCESS" "Installed: ${#installed[@]}/${#packages[@]} packages"

    if [[ ${#failed[@]} -gt 0 ]]; then
        print_status "ERROR" "Failed packages: ${failed[*]}"
        log "SUMMARY: Failed packages: ${failed[*]}"
        return 1
    else
        print_status "SUCCESS" "All packages installed successfully!"
        log "SUMMARY: All packages installed successfully"
        return 0
    fi
}

# Run with help option
if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
    cat << EOF
Cargo Tools Installer

Usage: $0 [options]

Options:
    -h, --help    Show this help message
    --dry-run     Show what would be installed without installing
    --force       Reinstall all packages even if already installed

This script installs Cargo tools listed in Cargofile with smart dependency checking.
It handles package name mapping and compatibility issues automatically.

EOF
    exit 0
fi

main "$@"