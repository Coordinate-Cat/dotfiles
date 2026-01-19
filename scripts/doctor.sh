#!/usr/bin/env bash

# Dotfiles Doctor - Comprehensive health check and repair tool
# Diagnoses and optionally fixes common dotfiles issues

set -euo pipefail

DOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ISSUES=()
FIXES_APPLIED=()
DRY_RUN=false
AUTO_FIX=false

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

print_header() {
    echo -e "${CYAN}"
    echo "🩺 Dotfiles Doctor v1.0"
    echo "======================="
    echo -e "${NC}"
}

print_status() {
    local status="$1"
    local message="$2"
    case "$status" in
        "INFO") echo -e "${BLUE}ℹ${NC} $message" ;;
        "SUCCESS") echo -e "${GREEN}✓${NC} $message" ;;
        "WARNING") echo -e "${YELLOW}⚠${NC} $message" ;;
        "ERROR") echo -e "${RED}✗${NC} $message" ;;
        "FIX") echo -e "${CYAN}🔧${NC} $message" ;;
    esac
}

add_issue() {
    local severity="$1"
    local description="$2"
    local fix_command="${3:-}"

    ISSUES+=("$severity|$description|$fix_command")
    print_status "$severity" "$description"
}

apply_fix() {
    local fix_command="$1"
    local description="$2"

    if [[ "$DRY_RUN" == true ]]; then
        print_status "INFO" "[DRY RUN] Would execute: $fix_command"
        return 0
    fi

    print_status "FIX" "Applying fix: $description"
    if eval "$fix_command"; then
        FIXES_APPLIED+=("$description")
        print_status "SUCCESS" "Fix applied successfully"
        return 0
    else
        print_status "ERROR" "Fix failed"
        return 1
    fi
}

check_file_permissions() {
    print_status "INFO" "🔐 Checking file permissions..."

    # Check script executability
    local scripts=(
        "$DOT_DIR/install.sh"
        "$DOT_DIR/.bundle/install.sh"
        "$DOT_DIR/.bundle/cargo-install.sh"
        "$DOT_DIR/.shell/validate.sh"
        "$DOT_DIR/doctor.sh"
    )

    for script in "${scripts[@]}"; do
        if [[ -f "$script" && ! -x "$script" ]]; then
            add_issue "WARNING" "Script $script is not executable" "chmod +x '$script'"
        fi
    done
}

check_symlink_integrity() {
    print_status "INFO" "🔗 Checking symlink integrity..."

    # Check critical symlinks
    local dotfiles=(
        "$HOME/.zshrc:$DOT_DIR/.zshrc"
        "$HOME/.zshenv:$DOT_DIR/.zshenv"
        "$HOME/.vimrc:$DOT_DIR/.vimrc"
        "$HOME/.gitconfig:$DOT_DIR/.gitconfig"
    )

    for entry in "${dotfiles[@]}"; do
        IFS=':' read -r link target <<< "$entry"

        if [[ ! -L "$link" ]]; then
            if [[ -f "$link" ]]; then
                add_issue "WARNING" "$(basename "$link") exists but is not a symlink" "mv '$link' '$link.backup' && ln -s '$target' '$link'"
            else
                add_issue "ERROR" "$(basename "$link") symlink missing" "ln -s '$target' '$link'"
            fi
        elif [[ ! -e "$link" ]]; then
            add_issue "ERROR" "$(basename "$link") symlink is broken" "ln -sf '$target' '$link'"
        fi
    done
}

check_directory_structure() {
    print_status "INFO" "📁 Checking directory structure..."

    local required_dirs=(
        "$DOT_DIR/.shell"
        "$DOT_DIR/.shell/.zsh"
        "$DOT_DIR/.aliases"
        "$DOT_DIR/.aliases/zsh"
        "$DOT_DIR/.bundle"
        "$DOT_DIR/.config"
        "$DOT_DIR/.config/starship"
    )

    for dir in "${required_dirs[@]}"; do
        if [[ ! -d "$dir" ]]; then
            add_issue "ERROR" "Required directory missing: $(basename "$dir")" "mkdir -p '$dir'"
        fi
    done
}

check_environment_setup() {
    print_status "INFO" "🌍 Checking environment setup..."

    # Source .zshenv to check environment variables
    if [[ -f "$DOT_DIR/.zshenv" ]]; then
        source "$DOT_DIR/.zshenv" 2>/dev/null || true
    fi

    local env_vars=(
        "DOT"
        "SHELL_DIR"
        "BUNDLE_DIR"
        "ALIASES_ZSH_DIR"
    )

    for var in "${env_vars[@]}"; do
        if [[ -z "${!var:-}" ]]; then
            add_issue "ERROR" "Environment variable $var is not set" "echo 'Source .zshenv in your shell profile'"
        fi
    done
}

check_package_integrity() {
    print_status "INFO" "📦 Checking package integrity..."

    # Check if Cargofile exists and has content
    if [[ ! -f "$DOT_DIR/.bundle/Cargofile" ]]; then
        add_issue "ERROR" "Cargofile missing" "touch '$DOT_DIR/.bundle/Cargofile'"
    elif [[ ! -s "$DOT_DIR/.bundle/Cargofile" ]]; then
        add_issue "WARNING" "Cargofile is empty" ""
    fi

    # Check if essential tools are installed
    local essential_tools=("git" "brew")
    for tool in "${essential_tools[@]}"; do
        if ! command -v "$tool" >/dev/null 2>&1; then
            add_issue "ERROR" "$tool is not installed" ""
        fi
    done
}

check_git_status() {
    print_status "INFO" "📝 Checking git status..."

    if [[ -d "$DOT_DIR/.git" ]]; then
        cd "$DOT_DIR"

        # Check for uncommitted changes
        if ! git diff --quiet; then
            add_issue "WARNING" "Uncommitted changes in dotfiles repository" ""
        fi

        # Check for untracked files (excluding logs and cache)
        local untracked=$(git ls-files --others --exclude-standard)
        if [[ -n "$untracked" ]]; then
            add_issue "INFO" "Untracked files found: $(echo "$untracked" | tr '\n' ' ')" ""
        fi

        # Check if branch is up to date
        local behind=$(git rev-list HEAD..origin/$(git branch --show-current) --count 2>/dev/null || echo "0")
        if [[ "$behind" -gt 0 ]]; then
            add_issue "INFO" "Local branch is $behind commits behind origin" "git pull"
        fi
    else
        add_issue "WARNING" "Not a git repository" "git init && git remote add origin <your-repo-url>"
    fi
}

check_config_conflicts() {
    print_status "INFO" "⚡ Checking for configuration conflicts..."

    # Check for conflicting shell configs
    local shell_configs=(
        "$HOME/.bash_profile"
        "$HOME/.bashrc"
        "$HOME/.profile"
    )

    for config in "${shell_configs[@]}"; do
        if [[ -f "$config" && ! -L "$config" ]]; then
            add_issue "WARNING" "$(basename "$config") might conflict with dotfiles setup" "mv '$config' '$config.backup'"
        fi
    done
}

print_diagnosis() {
    echo ""
    print_status "INFO" "🔍 Diagnosis Complete"
    echo "==================="

    if [[ ${#ISSUES[@]} -eq 0 ]]; then
        print_status "SUCCESS" "🎉 Your dotfiles are healthy! No issues found."
        return 0
    fi

    # Categorize issues
    local errors=0
    local warnings=0
    local info=0

    for issue in "${ISSUES[@]}"; do
        IFS='|' read -r severity _ _ <<< "$issue"
        case "$severity" in
            "ERROR") ((errors++)) ;;
            "WARNING") ((warnings++)) ;;
            "INFO") ((info++)) ;;
        esac
    done

    echo -e "\n📊 Issue Summary:"
    [[ $errors -gt 0 ]] && echo -e "${RED}  ✗ Errors: $errors${NC}"
    [[ $warnings -gt 0 ]] && echo -e "${YELLOW}  ⚠ Warnings: $warnings${NC}"
    [[ $info -gt 0 ]] && echo -e "${BLUE}  ℹ Info: $info${NC}"

    if [[ "$AUTO_FIX" == true ]]; then
        echo -e "\n🔧 Auto-fixing issues..."
        auto_fix_issues
    fi
}

auto_fix_issues() {
    local fixed=0

    for issue in "${ISSUES[@]}"; do
        IFS='|' read -r severity description fix_command <<< "$issue"

        if [[ -n "$fix_command" && "$severity" != "INFO" ]]; then
            if apply_fix "$fix_command" "$description"; then
                ((fixed++))
            fi
        fi
    done

    if [[ $fixed -gt 0 ]]; then
        print_status "SUCCESS" "🎉 Applied $fixed fixes successfully!"
        print_status "INFO" "💡 Run the doctor again to verify all issues are resolved."
    fi
}

print_recommendations() {
    cat << EOF

💡 Recommendations:
=================
• Run 'doctor.sh --fix' to automatically fix issues
• Use './.bundle/cargo-install.sh' to install missing Cargo tools
• Use './.shell/validate.sh' to check shell configuration
• Keep your dotfiles updated with 'git pull'
• Regularly run the doctor to maintain health

EOF
}

show_help() {
    cat << EOF
🩺 Dotfiles Doctor - Health Check & Repair Tool

Usage: $0 [options]

Options:
    --fix         Automatically fix issues where possible
    --dry-run     Show what would be fixed without making changes
    -h, --help    Show this help message

This tool performs a comprehensive health check of your dotfiles:
• File permissions and executability
• Symlink integrity and validity
• Directory structure completeness
• Environment variable configuration
• Package and tool availability
• Git repository status
• Configuration conflicts

EOF
}

main() {
    print_header

    check_file_permissions
    echo ""
    check_symlink_integrity
    echo ""
    check_directory_structure
    echo ""
    check_environment_setup
    echo ""
    check_package_integrity
    echo ""
    check_git_status
    echo ""
    check_config_conflicts

    print_diagnosis

    if [[ ${#FIXES_APPLIED[@]} -gt 0 ]]; then
        echo -e "\n✅ Fixes Applied:"
        printf '  • %s\n' "${FIXES_APPLIED[@]}"
    fi

    print_recommendations
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        --fix)
            AUTO_FIX=true
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            AUTO_FIX=true
            shift
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

main