#!/bin/sh

. sentaku -n

_SENTAKU_SEPARATOR=$'\n'
_SENTAKU_NOHEADER=1
_SENTAKU_NONUMBER=1
shopt -s expand_aliases

alias resource='zsh /Users/ocat/dotfiles/.osint/OSINT-TOOLS-CLI/osint-resource.sh'

# Name of the function to be executed
menu="
   RESOURCE
   hashcat
   theHarvester
  ← exit
"

# List of functions to assign to the list
_sf_0 () { resource }
_sf_1 () { hashcat }
_sf_2 () { theHarvester -h }
_sf_3 () { exit }

# Search for a selected number of lines
func (){
  for i in `seq 0 99`
    do
    _sf_ + $i () {
      _s_current_n=$i
      _s_break=1
    }
    done
}

# Run the selected function.
_sf_select () {
  # The number of functions
  for i in `seq 0 2`
    do
      if   [ $_s_current_n -eq $i ];then
        _sf_$i
      fi
    done
}

echo "$menu" | _sf_main "$@"
