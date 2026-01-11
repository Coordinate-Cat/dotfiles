# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Settings

**IMPORTANT**: When working in this repository:

- Always respond to the user in **Japanese** (日本語)
- All code, command output, file contents, and code modifications must remain in **English**
- Only explanations, discussions, and communication with the user should be in Japanese

## Repository Overview

This is a macOS-focused dotfiles repository featuring a **dual shell system** with Bash and Zsh configurations, managed with visual indicators in the Starship prompt. The repository manages comprehensive system configuration including shell configs, application settings, and automated package installation.

## Common Commands

### Installation & Setup

```bash
# Fresh install (clones repo and creates symlinks)
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Coordinate-Cat/dotfiles/master/install.sh)"

# Install all packages and dependencies
cd $HOME/dotfiles/.bundle
./install.sh
```

The bundle installation script (`/.bundle/install.sh`) performs:

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
/Users/oka/dotfiles/
├── .shell/              # Multi-shell configuration system
│   ├── .zsh/           # Modular Zsh configs (zinit, fzf, pyenv, conda, etc.)
│   ├── .bashrc         # Bash configuration
│   ├── config.nu       # Nushell configuration (241 lines)
│   ├── config.fish     # Fish shell configuration
│   ├── rc.elv          # Elvish configuration
│   └── .xonshrc        # Xonsh configuration
├── .config/            # Application-specific configurations
│   ├── starship/       # Prompt config with shell mode indicators
│   ├── iterm2/         # Terminal emulator settings
│   ├── vscode/         # VS Code settings
│   └── [others]        # bat, neofetch, wezterm, Rectangle, etc.
├── .aliases/           # Shell-specific aliases organized by tool
│   ├── bash/           # Bash aliases
│   ├── zsh/            # 19 Zsh alias files (app, brew, cd, ls, tokei, etc.)
│   ├── nushell/        # Nushell aliases
│   └── xonsh/          # Xonsh aliases
├── .bundle/            # Package management manifests
│   ├── Brewfile        # Homebrew packages
│   ├── Cargofile       # Rust tools (nu, rg, exa, starship, etc.)
│   ├── Npmfile         # Node packages
│   ├── Vscfile         # VS Code extensions
│   └── install.sh      # Installation script
├── .rip/               # Custom tools and references
├── .github/            # CI/CD workflows and templates
└── Root files          # .zshrc, .bashrc, .vimrc, .zshenv, etc.
```

### Key Environment Variables

Defined in `.zshenv` and available across all shells:

```bash
DOT="$HOME/dotfiles"                    # Main dotfiles directory
SHELL_DIR="$DOT/.shell/"                # Shell configurations
BUNDLE_DIR="$DOT/.bundle"               # Package manifests
ALIASES_ZSH_DIR="$DOT/.aliases/zsh"     # Zsh aliases location
STARSHIP_CONFIG="$DOT/.config/starship/starship.toml"
NU_CONFIG_PATH="$DOT/.shell/config.nu"
BAT_CONFIG_PATH="$DOT/.config/bat/bat.conf"
```

### Multiple Shell Mode System

The standout architectural feature is the **shell-as-mode** paradigm:

1. **Visual Shell Indicators**: Each shell has a unique color-coded badge in Starship prompt

   - Bash: `#c4c431` (gold) - "BSH-MODE"
   - Zsh: `#94b3a8` (sage green) - "ZSH-MODE"
   - Nushell: `#fe6142` (orange-red) - "NSH-MODE"
   - Fish: `#5442f5` (purple-blue) - "FSH-MODE"
   - Elvish: `#a742f5` (magenta) - "ESH-MODE"
   - Xonsh: `#70ff24` (lime green) - "XSH-MODE"

2. **Per-Shell Configuration**: Located in `.shell/` with modular organization

   - Zsh uses 6 modular files: `zinit.zsh`, `fzf.zsh`, `pyenv.zsh`, `conda.zsh`, `config.zsh`, `others.zsh`
   - Each shell has dedicated config files in their subdirectories

3. **Unified Alias System**: Shell-specific aliases in `.aliases/` maintain consistency across shells

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

Install all bundles via `/.bundle/install.sh`.

### Symlink System

The `install.sh` script creates symlinks from `$HOME/dotfiles/*` to `$HOME/.*`, excluding:

- `.zshrc` (handled separately)
- `.git`, `.gitignore`, `.DS_Store`
- `README.md`, `install.sh`

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

1. **Zsh changes**: Edit files in `.shell/.zsh/` (not root `.zshrc` which sources them)
2. **Aliases**: Add to appropriate file in `.aliases/zsh/` or `.aliases/bash/`
3. **New packages**: Add to respective file in `.bundle/` (Brewfile, Cargofile, Vscfile, Npmfile)
4. **Starship prompt**: Edit `.config/starship/starship.toml` for prompt customization
5. **Environment variables**: Add to `.zshenv` to make available across all shells

After changes, reload shell or run: `source ~/.zshrc` (for Zsh) or equivalent for other shells.
