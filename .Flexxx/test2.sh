. sentaku -n

_SENTAKU_SEPARATOR=$'\n'
_SENTAKU_NOHEADER=1
_SENTAKU_NONUMBER=1

# main menu
menu="
  1: SNS
  2: test1
  3: test2
  4: test3
  5: test4
"

_sf_initialize_user () {
  push=""
}

_sf_execute () {
  echo "$push"
}

# First layer
_sf_1 () {
  push=$(_sf_links)
  case "$push" in
    *Twitter*)
      open https://twitter.com/
      exit
    ;;
    *Instagram*)
      open https://www.instagram.com
      exit
    ;;
    *Facebook*)
      open https://www.facebook.com
      exit
    ;;
    *Reddit*)
      open https://www.reddit.com
      exit
    ;;
    *Pinterest*)
      open https://jp.pinterest.com
      exit
    ;;
    *Telegram*)
      open https://web.telegram.org
      exit
    ;;
    *Keybase*)
      open https://keybase.io
      exit
    ;;
    *Github*)
      open https://github.com
      exit
    ;;
  esac
}
_sf_2 () {
  echo Under maintenance
}
_sf_3 () {
  echo Under maintenance
}
_sf_4 () {
  echo Under maintenance
}
_sf_5 () {
  echo Under maintenance
}

# First layer
func (){
  _sf_1 () { # SNS
    _s_current_n=0
    open https://twitter.com/
      exit
    _s_break=1
  }
  _sf_2 () { # test
    _s_current_n=1
    open https://www.instagram.com
    exit
    _s_break=1
  }
  _sf_3 () { # test
    _s_current_n=2
    _s_break=1
  }
  _sf_4 () { # test
    _s_current_n=3
    _s_break=1
  }
  _sf_5 () { # test
    _s_current_n=4
    _s_break=1
  }
}
# First layer
_sf_select () {
  if   [ $_s_current_n -eq 0 ];then # SNS
    _sf_1
  elif [ $_s_current_n -eq 1 ];then # test
    _sf_2
  elif [ $_s_current_n -eq 2 ];then # test
    _sf_3
  elif [ $_s_current_n -eq 3 ];then # test
    _sf_4
  elif [ $_s_current_n -eq 4 ];then # test
    _sf_5
  fi
}


_sf_links () { # {{
. sentaku -n -c
_SENTAKU_SEPARATOR=$'\n'
_SENTAKU_NOHEADER=1
_SENTAKU_NONUMBER=1

menu="
  1 |  Twitter   : (https://twitter.com/)
  2 |  Instagram : (https://www.instagram.com)
  3 |  Facebook  : (https://www.facebook.com)
  4 |  Reddit    : (https://www.reddit.com)
  5 |  Pinterest : (https://jp.pinterest.com)
  6 |  Telegram  : (https://web.telegram.org)
  7 |  Keybase   : (https://keybase.io)
  8 |  Github    : (https://github.com)
"

_sf_execute () {
  echo ${_s_inputs[$_s_current_n]: 7}
}

func
echo "$menu" | _sf_main
} # }}

echo "$menu" | _sf_main "$@"
