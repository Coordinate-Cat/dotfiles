# multiple-shell-mode-system
[![GitHub license](https://img.shields.io/github/license/Coordinate-Cat/multiple-shell-mode-system)](https://github.com/Coordinate-Cat/multiple-shell-mode-system/blob/main/LICENSE)

Experimenting with my dotfiles and starship to visually change the shell.  
I'm using starship's module, shell indicator, to treat the various shells as vim-like "modes" so that I can easily switch from one shell to another via alias settings. The rc file needs to be maintained to adapt starship to all shells.
Also, some starship modules may not function partially in some shells, so auxiliary descriptions are required in rc files.
Here is my own experimental site ([dotfiles](https://github.com/Coordinate-Cat/dotfiles))  
This plan does not plan to support powershell, etc., which can currently only be checked on windows devices.
Currently, all rc files have not been maintained, so it is recommended not to clone or otherwise use them.

- multiple shell mode system
  - bash mode
  - zsh mode
  - nushell mode
  - fish mode
  - elvish mode
  - xonsh mode

## Rc files
| name        | default place                         |
|:------------|:--------------------------------------|
| .bashrc     | ~/.bashrc                             |
| .zshrc      | ~/.zshrc                              |
| config.nu   | ~/Library/Application Support/nushell |
| config.fish | ~/.config/fish/config.fish            |
| rc.elv      | ~/.config/elvish/rc.elv               |
| .xonshrc    | ~/.config/xonsh/.zxonhrc              |


## Shell Indicator
Prompts are colored in hexadecimal and decorations are created using nerd-font.
```
# starship.toml

[shell]
bash_indicator = "[](fg:#c4c431 bg:#6f6565)[B-MODE](fg:#fff1cf bg:#c4c431)[](fg:#c4c431 bg:#6f6565)[  ](fg:#c4c431 bg:#6f6565)[](fg:#6f6565)"
zsh_indicator = "[](fg:#94b3a8 bg:#6f6565)[Z-MODE](fg:#fff1cf bg:#94b3a8)[](fg:#94b3a8 bg:#6f6565)[  ](fg:#94b3a8 bg:#6f6565)[](fg:#6f6565)"
nu_indicator = "[](fg:#fe6142 bg:#6f6565)[N-MODE](fg:#fff1cf bg:#fe6142)[](fg:#fe6142 bg:#6f6565)[  ](fg:#fe6142 bg:#6f6565)[](fg:#6f6565)"
fish_indicator = "[](fg:#5442f5 bg:#6f6565)[F-MODE](fg:#fff1cf bg:#5442f5)[](fg:#5442f5 bg:#6f6565)[  ](fg:#5442f5 bg:#6f6565)[](fg:#6f6565)"
elvish_indicator = "[](fg:#a742f5 bg:#6f6565)[E-MODE](fg:#fff1cf bg:#a742f5)[](fg:#a742f5 bg:#6f6565)[  ](fg:#a742f5 bg:#6f6565)[](fg:#6f6565)"
xonsh_indicator = "[](fg:#70ff24 bg:#6f6565)[X-MODE](fg:#fff1cf bg:#70ff24)[](fg:#70ff24 bg:#6f6565)[  ](fg:#70ff24 bg:#6f6565)[](fg:#6f6565)"
unknown_indicator = "[](fg:#fff1cf bg:#6f6565) ?-MODE [](fg:#6f6565)"
style = "fg:#fff1cf bg:#6f6565"
disabled = false
```

## References
### Shell
| Shell   |                                    |
|:--------|:-----------------------------------|
| Bash    | https://www.gnu.org/software/bash/ |
| Zsh     | https://www.zsh.org/               |
| Nushell | https://www.nushell.sh/            |
| Fish    | https://fishshell.com/             |
| Elvish  | https://elv.sh/                    |
| Xonsh   | https://github.com/xonsh/xonsh     |
### Starship
| Starship |                                      |
|:---------|:-------------------------------------|
| Official | https://starship.rs/                 |
| Github   | https://github.com/starship/starship |
| Shell    | https://starship.rs/config/#shell    |

## LICENSE
[MIT license](https://github.com/Coordinate-Cat/multiple-shell-mode-system/blob/main/LICENSE)