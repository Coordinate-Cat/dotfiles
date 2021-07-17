cat .links/ascii/flexxx

# options
autoload -Uz colors       # Autoload
colors                    # Colors func
COLUMNS=12                # Vertically
PS3="%F{yellow} CHOOSE:" # Select prompt settings
echo -e '\n'              # Last line of ASCII art

link=(
  "sns"
  "news"
  "streaming"
  exit
)

select VAR in $link
do
  case $VAR in
    "sns" )
      echo -e "${fg[red]}$VAR${reset_color}"
    ;;
    "news" )
      echo -e "${fg[red]} $VAR${reset_color}"
      cat .links/news.txt
    ;;
    "streaming" )
      echo -e "${fg[red]} $VAR${reset_color}"
      cat .links/streaming.txt
    ;;
    "exit" )
      echo -e "${fg[red]} LOGOUT${reset_color}"
      break
    ;;
  esac
done
