# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Settings

**IMPORTANT**: When working in this repository:

- Always respond to the user in **Japanese** (日本語)
- All code, command output, file contents, and code modifications must remain in **English**
- Only explanations, discussions, and communication with the user should be in Japanese

## Repository Overview

This is a macOS-focused dotfiles repository featuring a **Zsh-centered configuration system** with modular shell setup, managed with visual indicators in the Starship prompt. The repository manages comprehensive system configuration including shell configs, application settings, automated package installation, and unified alias management.

## Common Commands

### Installation & Setup

```bash
# Fresh install (clones repo and creates symlinks)
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Coordinate-Cat/dotfiles/master/install.sh)"

# Install all packages and dependencies
cd $HOME/dotfiles/.bundle
./install.sh
```

The bundle installation script (`.bundle/install.sh`) performs:

- Homebrew package upgrades and installation from `Brewfile`
- Zinit (Zsh plugin manager) setup
- Rust toolchain installation via rustup
- Cargo tools installation from `Cargofile`
- VS Code extensions installation from `Vscfile` (110+ extensions)
- macOS services startup (yabai window manager)

### Testing & Validation

```bash
# Run GitHub Actions workflows locally (requires act)
act -j setup

# Validate markdown files
act -j markdown
```

### Shell Switching

The repository supports switching between multiple shells with visual mode indicators:

```bash
bash      # Enter B-MODE (Bash)
zsh       # Enter Z-MODE (Zsh)
```

Each shell displays a unique colored indicator badge in the Starship prompt.

## Architecture

### Directory Structure

```
/Users/ocat/dotfiles/
├── .shell/              # Shell configuration system
│   ├── .zsh/           # Modular Zsh configs (zinit, fzf, config, others)
│   ├── validate.sh     # Shell validation script
│   └── .gitignore      # Git ignore for shell secrets
├── .config/            # Application-specific configurations
│   ├── starship/       # Prompt config with shell mode indicators
│   ├── iterm2/         # Terminal emulator settings
│   ├── vscode/         # VS Code settings
│   ├── ghostty/        # GPU-accelerated terminal
│   └── [others]        # bat, neofetch, wezterm, Rectangle, etc.
├── .aliases/           # Shell-specific aliases organized by tool
│   └── zsh/            # Zsh alias files organized by category
├── .bundle/            # Package management manifests
│   ├── Brewfile        # Homebrew packages
│   ├── Cargofile       # Rust tools (nu, rg, exa, starship, etc.)
│   ├── Npmfile         # Node packages
│   ├── Vscfile         # VS Code extensions
│   └── install.sh      # Installation script
├── scripts/            # Scripts and automation
│   ├── bootstrap.sh    # Complete automation script
│   ├── doctor.sh       # Health check and diagnostics
│   ├── install.sh      # Basic dotfiles installation
│   └── test-bootstrap.sh # Safe testing with backup/rollback
├── docs/               # Documentation
│   ├── CLAUDE.md       # Claude Code instructions (this file)
│   ├── usage.md        # Comprehensive documentation
│   ├── CODE_OF_CONDUCT.md
│   └── LICENSE
├── .github/            # CI/CD workflows and templates
├── .zshrc              # Main Zsh configuration
├── alias.zsh           # Unified alias definitions
├── .vimrc              # Vim configuration
├── .zshenv             # Environment variables
└── package.json        # npm scripts and project metadata
```

### Key Environment Variables

Defined in `.zshenv` and available across all shells:

```bash
DOT="$HOME/dotfiles"                    # Main dotfiles directory
SHELL_DIR="$DOT/.shell/"                # Shell configurations
BUNDLE_DIR="$DOT/.bundle"               # Package manifests
ALIASES_ZSH_DIR="$DOT/.aliases/zsh"     # Zsh aliases location
ZSH_DIR="$SHELL_DIR/.zsh"               # Zsh modular configs
STARSHIP_CONFIG="$DOT/.config/starship/starship.toml"
BAT_CONFIG_PATH="$DOT/.config/bat/bat.conf"
```

### Shell Configuration System

The primary shell system centers around **Zsh** with comprehensive configuration:

1. **Visual Shell Indicators**: Starship prompt displays current shell mode

   - Zsh: `#94b3a8` (sage green) - "ZSH-MODE"
   - Extensible architecture for additional shells with unique color codes

2. **Modular Zsh Configuration**: Located in `.shell/.zsh/` with organized modules

   - `zinit.zsh`: Plugin manager with fast-syntax-highlighting
   - `fzf.zsh`: Fuzzy finder integration and app launcher function
   - `config.zsh`: Core Zsh settings and options
   - `others.zsh`: FNM (Fast Node Manager) integration

3. **Unified Alias System**: Centralized alias management
   - Main aliases in root `alias.zsh` file for easy access
   - Category-specific aliases in `.aliases/zsh/` by tool/purpose
   - Consistent experience across shell sessions

### Starship Configuration

Location: `.config/starship/starship.toml`

- **Theme**: Gruvbox (dark)
- **Background**: `#6f6565` (dark gray)
- **Foreground**: `#fff1cf` (cream)
- **Format**: `username → directory → git_branch → git_status → time → shell → character`
- **Key Features**: Shell mode indicators, time display, git integration, directory truncation

### Package Management

The `.bundle/` directory centralizes all dependency declarations:

- **Brewfile**: ~20+ packages (gh, bat, fzf, nvim, rust, neofetch, yabai, etc.) and casks
- **Cargofile**: Rust CLI tools (nushell, ripgrep, exa, fnm, dust, tokei, starship, hyperfine)
- **Npmfile**: Node.js packages
- **Vscfile**: 110+ VS Code extensions (themes, linters, formatters, cloud tools, ML extensions)

Install all bundles via `.bundle/install.sh`.

### Symlink System

The `scripts/install.sh` script creates symlinks from `$HOME/dotfiles/*` to `$HOME/.*`, excluding:

- `.git`, `.gitignore`, `.DS_Store`
- `README.md`, scripts directory, docs directory
- `package.json`

This allows version-controlled dotfiles to be used directly by applications.

## Design System

- **Theme**: Gruvbox (dark variant)
- **Font**: Hack Nerd Font
- **Terminal**: iTerm2 (alternative: Wezterm)
- **Window Manager**: yabai (tiling WM) with Rectangle fallback
- **Menu Bar**: Übersicht with simple-bar widget
- **Prompt**: Starship with custom shell indicators
- **Wallpaper**: Gruvbox-themed from FrenzyExists/wallpapers

## CI/CD

Located in `.github/workflows/`:

- **setup.yml**: Runs full installation on push (macOS-latest runner)
- **markdown.yml**: Validates markdown files

Both workflows test the installation process and ensure repository health.

## Code Organization Patterns

1. **Modular Shell Configs**: Zsh configuration is split into logical modules (plugins, tools, environments) in `.shell/.zsh/`
2. **Categorized Aliases**: Aliases organized by tool/purpose in separate files (`.aliases/zsh/ls.zsh`, `.aliases/zsh/brew.zsh`, etc.)
3. **Environment-Based Paths**: All critical paths exported in `.zshenv` for cross-shell consistency
4. **Bundle-Based Dependencies**: Package lists stored as plain text files for easy tracking and installation

## Modifying Configurations

When editing shell configurations:

1. **Zsh changes**: Edit files in `.shell/.zsh/` (modular configs) or root `.zshrc` (main config)
2. **Aliases**: Add to root `alias.zsh` for main aliases or specific files in `.aliases/zsh/` by category
3. **New packages**: Add to respective file in `.bundle/` (Brewfile, Cargofile, Vscfile, Npmfile)
4. **Starship prompt**: Edit `.config/starship/starship.toml` for prompt customization
5. **Environment variables**: Add to `.zshenv` to make available across shell sessions

After changes, reload shell: `source ~/.zshrc` or restart terminal session.
