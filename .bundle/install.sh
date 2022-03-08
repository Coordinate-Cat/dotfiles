#! /bin/bash

B=".bundle"

###[ Homebrew ]#################################################################
brew upgrade
brew bundle --file ${B}/Brewfile

###[ Zsh ]######################################################################
sh -c "$(curl -fsSL https://raw.githubusercontent.com/zdharma/zinit/master/doc/install.sh)"
source "${HOME}"/.zshrc

###[ Rust ]#####################################################################
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
rustup update

###[ Cargo ]####################################################################
cargo install $(cat ${B}/Cargofile)

###[ Vscode ]###################################################################
for ce in $(cat ${B}/Vscodefile); do
    code --install-extension $ce
done
