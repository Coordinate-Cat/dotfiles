#! /bin/bash

BUNDLE="$HOME/.bundle"

###[ Homebrew ]#################################################################
brew upgrade
brew bundle --file ${BUNDLE}/Brewfile
brew services start yabai

###[ Zsh ]######################################################################
sh -c "$(curl -fsSL https://raw.githubusercontent.com/zdharma/zinit/master/doc/install.sh)"
source ${HOME}/.zshrc

###[ Rust ]#####################################################################
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
rustup --version
rustc --version

###[ Cargo ]####################################################################
cargo --version
cargo install $(cat ${BUNDLE}/Cargofile)

###[ Vscode ]###################################################################
for vsc in $(cat ${BUNDLE}/Vscfile); do
    code --install-extension $vsc
done
