# Dotfiles Usage Guide

This document provides comprehensive usage instructions for the macOS dotfiles system with complete environment automation.

## Overview

This dotfiles repository provides multiple shell mode system with complete automation for macOS development environment setup. It supports one-command installation, testing, and rollback capabilities.

## Installation Methods

### 1. Full Automated Installation (Recommended)

Complete environment setup with single command:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Coordinate-Cat/dotfiles/master/bootstrap.sh)"
```

This method performs:
- Xcode Command Line Tools installation
- Homebrew installation and package setup
- Dotfiles repository cloning and symlink creation
- All package installations (Homebrew, Cargo, npm, VS Code extensions)
- SSH key generation and Git configuration
- macOS system preferences configuration
- App Store applications installation
- Service startup (yabai window manager)

### 2. Minimal Installation

Basic dotfiles setup without packages:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Coordinate-Cat/dotfiles/master/install.sh)"
cd ~/dotfiles && npm run setup
```

### 3. Manual Installation

Step-by-step manual installation:

```bash
# Clone repository
git clone https://github.com/Coordinate-Cat/dotfiles.git ~/dotfiles
cd ~/dotfiles

# Install packages
npm run install:bundle

# Health check
npm run doctor
```

## Testing and Safety

### Dry Run Mode

Preview installation actions without executing:

```bash
npm run test:dry-run
```

### Safe Testing with Backup

Test installation with automatic backup and rollback capability:

```bash
./test-bootstrap.sh --test
```

### Rollback

Restore system to pre-test state:

```bash
BACKUP_DIR=/path/to/backup ./test-bootstrap.sh --rollback
```

## npm Scripts Reference

### Installation Scripts

- `npm run install` - Run basic install.sh script
- `npm run bootstrap` - Run bootstrap.sh script
- `npm run bootstrap-full` - Full automated installation
- `npm run install:bundle` - Install all packages from .bundle/
- `npm run install:cargo` - Install Cargo packages only
- `npm run setup` - Basic setup (install + bundle)
- `npm run setup:minimal` - Minimal setup (install + cargo only)

### Testing Scripts

- `npm run test:bootstrap` - Interactive test menu
- `npm run test:dry-run` - Dry run preview mode
- `npm run test` - Run GitHub Actions locally
- `npm run test:markdown` - Validate markdown files

### Maintenance Scripts

- `npm run doctor` - Health check and diagnostics
- `npm run doctor:fix` - Auto-fix detected issues
- `npm run doctor:dry-run` - Preview doctor fixes
- `npm run validate` - Validate shell configurations
- `npm run health` - Combined doctor and validate
- `npm run clean` - Clean temporary files and caches
- `npm run update` - Update all packages
- `npm run update:cargo` - Update Cargo packages only

### Information Scripts

- `npm run status` - Git status and health check
- `npm run info` - Show dotfiles and system info
- `npm run aliases:zsh` - List available Zsh aliases
- `npm run modules:zsh` - List Zsh modules
- `npm run cargo:list` - List installed Cargo packages
- `npm run brew:list` - List installed Homebrew packages
- `npm run symlinks` - Show dotfiles symlinks

### Utility Scripts

- `npm run backup` - Create backup archive
- `npm run shell:zsh` - Switch to Zsh
- `npm run shell:bash` - Switch to Bash
- `npm run watch` - Watch for file changes
- `npm run serve:docs` - Serve documentation locally
- `npm run benchmark` - Benchmark shell startup times

## Package Management

### Bundle Files

Package manifests are stored in `.bundle/` directory:

- `Brewfile` - Homebrew formulas and casks (30+ packages)
- `Cargofile` - Rust CLI tools (8 packages)
- `Npmfile` - Node.js packages
- `Vscfile` - VS Code extensions (117 extensions)

### Adding Packages

To add new packages:

1. Edit appropriate bundle file
2. Run `npm run install:bundle` to install
3. Commit changes to repository

## Shell System

### Multi-Shell Support

The system supports 6 shells with visual mode indicators:

- Zsh (primary) - ZSH-MODE indicator
- Bash - BSH-MODE indicator
- Nushell - NSH-MODE indicator
- Fish - FSH-MODE indicator
- Elvish - ESH-MODE indicator
- Xonsh - XSH-MODE indicator

### Shell Configuration

Shell configurations are located in `.shell/` directory:

- `.shell/.zsh/` - Modular Zsh configurations
- `.shell/.bashrc` - Bash configuration
- `.shell/config.nu` - Nushell configuration
- `.shell/config.fish` - Fish configuration
- `.shell/rc.elv` - Elvish configuration
- `.shell/.xonshrc` - Xonsh configuration

### Aliases

Shell-specific aliases are organized in `.aliases/` directory:

- `.aliases/zsh/` - Zsh aliases (19 files by category)
- `.aliases/bash/` - Bash aliases
- `.aliases/nushell/` - Nushell aliases
- `.aliases/xonsh/` - Xonsh aliases

## Configuration Files

### Symlinked Files

The following files are automatically symlinked to home directory:

- `.vimrc` - Vim configuration
- `.zshrc` - Zsh configuration
- `.zshenv` - Zsh environment variables
- `.editorconfig` - Editor configuration
- `.npmrc` - npm configuration
- `.aliases` - Alias directory
- `.shell` - Shell configuration directory
- `.config` - Application configurations
- `.cargo` - Rust/Cargo configuration

### Application Configurations

Application-specific configurations in `.config/`:

- `starship/` - Shell prompt configuration
- `iterm2/` - Terminal configuration
- `vscode/` - VS Code settings
- `superfile/` - File manager configuration
- `git/` - Git configuration
- `gh/` - GitHub CLI configuration

## Troubleshooting

### Health Check

Run comprehensive health check:

```bash
npm run doctor
```

Auto-fix detected issues:

```bash
npm run doctor:fix
```

### Common Issues

1. **Missing symlinks**: Run `npm run symlinks` to check status
2. **Package installation failures**: Run `npm run update`
3. **Shell configuration issues**: Run `npm run validate`
4. **Permission issues**: Check file permissions with `ls -la`

### Manual Fixes

Recreate symlinks manually:

```bash
cd ~/dotfiles
ln -snf $(pwd)/.vimrc ~/.vimrc
ln -snf $(pwd)/.zshrc ~/.zshrc
# ... repeat for other files
```

## Environment Variables

Key environment variables defined in `.zshenv`:

- `DOT` - Dotfiles directory path
- `SHELL_DIR` - Shell configurations path
- `BUNDLE_DIR` - Package manifests path
- `ALIASES_ZSH_DIR` - Zsh aliases path
- `STARSHIP_CONFIG` - Starship configuration path

## Requirements

- macOS 10.15 or later
- Internet connection
- GitHub account (for SSH setup in full installation)
- Administrator privileges (for some system configurations)

## Advanced Usage

### Custom Configurations

1. Modify files in dotfiles repository
2. Changes are immediately reflected via symlinks
3. Commit changes to preserve them

### Adding New Applications

1. Add package to appropriate bundle file
2. Add configuration to `.config/` if needed
3. Add aliases to `.aliases/` if needed
4. Run `npm run install:bundle`

### Shell Customization

1. Edit shell-specific files in `.shell/`
2. Add aliases to appropriate `.aliases/` subdirectory
3. Restart shell or source configuration files

## Security Considerations

- SSH keys are generated with ed25519 algorithm
- Private configurations use `.shell/.zsh/secret.zsh` (gitignored)
- App Store authentication requires manual sign-in
- System preference changes require administrator privileges

## Backup and Recovery

The system provides automatic backup capabilities:

- `npm run backup` - Create timestamped backup archive
- Test mode creates automatic backups before changes
- Rollback functionality restores previous state
- Git version control tracks configuration changes