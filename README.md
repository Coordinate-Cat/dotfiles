# dotfiles

macOS dotfiles with complete environment automation and multi-shell support

## Quick Start

### One-Command Complete Setup

For complete automation on a new Mac:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Coordinate-Cat/dotfiles/master/bootstrap.sh)"
```

This single command installs and configures:
- Xcode Command Line Tools
- Homebrew with 30+ packages
- Rust toolchain with 8 CLI tools
- VS Code with 117 extensions
- SSH keys and Git configuration
- macOS system preferences
- App Store applications
- Multi-shell environment (6 shells)

### Safe Testing

Preview installation without changes:

```bash
# Clone first to test safely
git clone https://github.com/Coordinate-Cat/dotfiles.git ~/dotfiles
cd ~/dotfiles

# Dry run (shows what would be installed)
npm run test:dry-run

# Test with backup/rollback capability
./scripts/test-bootstrap.sh --test
```

### Alternative Installation

Minimal dotfiles-only setup:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Coordinate-Cat/dotfiles/master/install.sh)"
cd ~/dotfiles && npm run setup
```

## Key Features

### Complete Automation
- Zero-configuration setup for new macOS systems
- Automatic package management across multiple systems
- SSH key generation and GitHub integration
- macOS system preference configuration
- Backup and rollback capabilities for safe testing

### Multi-Shell Environment
Primary shell with comprehensive configuration:
- **Zsh** (primary) - ZSH-MODE with Zinit plugin manager, modular configuration, and unified alias system
- Unified alias definitions in `alias.zsh` for consistent experience
- Starship prompt with shell mode indicators and Gruvbox theming

Expandable architecture supports additional shells with color-coded indicators.

### Package Ecosystem
- **Homebrew**: 30+ formulas and casks (development tools, applications)
- **Cargo**: 8 Rust CLI tools (nu, ripgrep, exa, starship, etc.)
- **npm**: Node.js development packages
- **VS Code**: 117 extensions (themes, linters, formatters, productivity)
- **App Store**: Essential applications (Xcode, utilities)

### Unified Theme System
- **Visual Theme**: Gruvbox dark across all applications
- **Terminal**: iTerm2 with Starship prompt
- **Editors**: Vim, VS Code with consistent theming
- **Window Management**: yabai tiling manager + Rectangle
- **Typography**: Hack Nerd Font with icon support

## Common Commands

### Installation and Setup
```bash
npm run bootstrap-full    # Complete automated installation
npm run setup            # Install packages only
npm run install:bundle   # Install from package manifests
```

### Testing and Safety
```bash
npm run test:dry-run      # Preview installation safely
npm run test:bootstrap    # Test with backup capability
npm run doctor           # Comprehensive health check
npm run doctor:fix       # Auto-fix detected issues
```

### Maintenance
```bash
npm run update           # Update all packages
npm run clean            # Clean temporary files and caches
npm run backup           # Create configuration backup
npm run health           # Check system health
```

### Information
```bash
npm run status           # Git status and health overview
npm run symlinks         # Show dotfiles symlinks
npm run docs             # View documentation
```

## Repository Structure

```
~/dotfiles/
├── .shell/              # Shell configurations
│   ├── .zsh/           # Modular Zsh configs (6 files)
│   └── validate.sh     # Shell validation script
├── .config/            # Application configurations
│   ├── starship/       # Shell prompt with mode indicators
│   ├── iterm2/         # Terminal settings
│   ├── vscode/         # Editor configuration
│   └── superfile/      # File manager (ayu-dark theme)
├── .aliases/           # Shell-specific aliases (organized by category)
│   └── zsh/            # Zsh alias files (by category)
├── .bundle/            # Package management manifests
│   ├── Brewfile        # Homebrew packages and casks
│   ├── Cargofile       # Rust CLI tools
│   ├── Vscfile         # VS Code extensions (117)
│   └── install.sh      # Bundle installation script
├── scripts/           # Scripts and automation
│   ├── bootstrap.sh   # Complete automation script
│   ├── test-bootstrap.sh # Safe testing with backup/rollback
│   ├── doctor.sh      # Health check and diagnostics
│   └── install.sh     # Basic dotfiles installation
├── docs/              # Documentation
│   ├── CLAUDE.md      # Claude Code instructions
│   ├── usage.md       # Comprehensive documentation
│   ├── CODE_OF_CONDUCT.md
│   └── LICENSE
├── .zshrc              # Main Zsh configuration
├── alias.zsh           # Unified alias definitions
├── .vimrc              # Vim configuration
├── .zshenv             # Environment variables
└── package.json        # npm scripts (25+ commands)
```

## Documentation

- **README.md** - Quick start and overview (this file)
- **docs/usage.md** - Complete usage guide and reference
- **docs/CLAUDE.md** - Claude Code integration settings
- **docs/CODE_OF_CONDUCT.md** - Community guidelines
- **docs/LICENSE** - WTFPL license

Access documentation:
```bash
npm run docs           # Open docs/usage.md
```

## Requirements

- **macOS**: 10.15 (Catalina) or later
- **Network**: Internet connection for downloads
- **Account**: GitHub account (for SSH key setup)
- **Privileges**: Administrator access (for system preferences)

## Safety and Testing

This repository includes comprehensive testing capabilities:
- **Dry run mode**: Preview all changes before execution
- **Automatic backup**: System state preservation during testing
- **Complete rollback**: Restore to pre-installation state
- **Health monitoring**: Continuous system validation

## License

WTFPL (DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE) - see LICENSE file for details