###[ fzf ]######################################################################

###[ keybind ]##################################################################
export FZF_DEFAULT_COMMAND='rg --hidden --no-ignore -l ""'
export FZF_DEFAULT_OPTS='--reverse --preview "bat --color=always --style=header,grid --line-range :100 {}"'

###[ app command ]##############################################################
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh

app() {
    sapp_list=$(find /System/Applications -maxdepth 3 -type d |
                grep '\.app$' |
                sed 's/\/System\/Applications\///' |
                sed 's/\.app$//' |
                sed 's/^/ : /')
    aapp_list=$(find /Applications -maxdepth 3 -type d |
                grep '\.app$' |
                sed 's/\/Applications\///' |
                sed 's/\.app$//' |
                sed 's/^/ : /')
    uapp_dest="/Users/$(whoami)/Applications"
    uapp_dest_sed="s/\/Users\/$(whoami)\/Applications\///"
    # echo $uapp_dest_sed
    uapp_list=$(find $uapp_dest -maxdepth 3 -type d |
                grep '\.app$' |
                sed $uapp_dest_sed |
                sed 's/\.app$//' |
                sed 's/^/ : /')
    # echo -e $uapp_list
    app_path=$(echo -e "$sapp_list\n$aapp_list\n$uapp_list" | fzf --query="$1" --prompt="App > " --exit-0)
    if [ -n "$app_path" ]; then
        open_path_u="s/U::/\/Users\/$(whoami)\/Applications\//"
        open_path=$(echo "$app_path" |
                    sed 's/ : /\/System\/Applications\//' |
                    sed 's/ : /\/Applications\//' |
                    sed $open_path_u)
        # echo $open_path
        open -a "$open_path.app"
        # preventing open command returns not 0
        :
    fi
}