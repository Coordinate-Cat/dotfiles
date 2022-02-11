#!/bin/sh

### [ DON'T TOUCH ] ############################################################
. sentaku -n

_SENTAKU_SEPARATOR=$'\n'
_SENTAKU_NOHEADER=1
_SENTAKU_NONUMBER=1
shopt -s expand_aliases

ERROR_ASCII='\e[31;5;7m
                                                                                                          
  ███████╗██████╗ ██╗   ██╗    ███╗   ██╗ ██████╗ ████████╗    ██████╗ ███████╗ █████╗ ██████╗ ██╗   ██╗  
  ██╔════╝██╔══██╗╚██╗ ██╔╝    ████╗  ██║██╔═══██╗╚══██╔══╝    ██╔══██╗██╔════╝██╔══██╗██╔══██╗╚██╗ ██╔╝  
  ███████╗██████╔╝ ╚████╔╝     ██╔██╗ ██║██║   ██║   ██║       ██████╔╝█████╗  ███████║██║  ██║ ╚████╔╝   
  ╚════██║██╔══██╗  ╚██╔╝      ██║╚██╗██║██║   ██║   ██║       ██╔══██╗██╔══╝  ██╔══██║██║  ██║  ╚██╔╝    
  ███████║██║  ██║   ██║▄█╗    ██║ ╚████║╚██████╔╝   ██║       ██║  ██║███████╗██║  ██║██████╔╝   ██║     
  ╚══════╝╚═╝  ╚═╝   ╚═╝╚═╝    ╚═╝  ╚═══╝ ╚═════╝    ╚═╝       ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝    ╚═╝     
                                                                                                          
\e[m
'

EXIT_ASCII='\e[32;5;7m
                                                                        
   ██████╗  ██████╗  ██████╗ ██████╗     ██████╗ ██╗   ██╗███████╗██╗   
  ██╔════╝ ██╔═══██╗██╔═══██╗██╔══██╗    ██╔══██╗╚██╗ ██╔╝██╔════╝██║   
  ██║  ███╗██║   ██║██║   ██║██║  ██║    ██████╔╝ ╚████╔╝ █████╗  ██║   
  ██║   ██║██║   ██║██║   ██║██║  ██║    ██╔══██╗  ╚██╔╝  ██╔══╝  ╚═╝   
  ╚██████╔╝╚██████╔╝╚██████╔╝██████╔╝    ██████╔╝   ██║   ███████╗██╗   
   ╚═════╝  ╚═════╝  ╚═════╝ ╚═════╝     ╚═════╝    ╚═╝   ╚══════╝╚═╝   
                                                                        
\e[31m
'
### [ Error hiding and alias loading in shopt ] ################################
clear && source $HOME/dotfiles/.zshrc

### [ Aliases ] ################################################################
alias AMAZON_CMD='zsh $AMAZON && bash $AMAZON'

alias ERROR_CMD='clear && echo $ERROR_ASCII && sleep 3m;clear && echo "$menu" | _sf_main "$@"'
alias TOC_CMD='zsh $TOC && bash $TOC'

### [ Name of the function to be executed ] ####################################
menu="
   openownership.org — Wordwide beneficial ownership data.
   opensanctions.org — Open source data on sanctioned people and companies in various countries from 35 (!) different sources.
   Lei.bloomberg.com — search information about company by Legal Identify Number
   FDIC search — Search banks by FDIC (Federal Deposit Insurance Corporation) certificate number and get detailed information about it
   990 finder — Enter the company name and select the state to get a link to download its 900 form.
   Iban.com — Check the validity of the IBAN (International Bank Account Number) of the company and see the information about the bank where it is serviced
   Related List — find company-related contacts and confidential documents leaked online
   Open Corporates Command Line Client (Occli) — Gathering detailed information about company through cli.
   NewsBrief — Looking for recent mentions of the company in online media around the world
   Investing.com — View a detailed investment profile of the company
   FCCID.IO — seacrh by FCC ID, Country, Date, Company name or Frequency ( in Mhz)
   Freebin Checker — easy-to-use API for getting bank details by BIN. 850,000+ BIN records in FreeBinChecker's database
   Tradeint — Quick access for more than 85 tools for gathering information about company and company website, location and sector
   Corporative Registry Catalog — worldwide catalog of business registries (63 countries)
   WIPO.int — Global Brands Database (46,020,000 records)
   TMDN Design View — Search 17 684 046 products designs across the European Union and beyond
   TESS — Search engine for #USA trademarks
   TendersInfo — Search tenders around the world by keywords.
   [ Amazon ]
  ﴚ [ BACK TO TOC ]
"

# CODE URL PUSH
_sf_0 ()  { open "http://openownership.org" }
_sf_1 ()  { open "https://opensanctions.org" }
_sf_2 ()  { open "https://lei.bloomberg.com/search?.=1&.=-lastUpdateDate&.=&.=&.=%5B%5D&ts=2447821118" }
_sf_3 ()  { open "https://banks.data.fdic.gov/bankfind-suite/bankfind" }
_sf_4 ()  { open "https://candid.org/research-and-verify-nonprofits/990-finder" }
_sf_5 ()  { open "https://www.iban.com/iban-checker" }
_sf_6 ()  { open "http://relateoak2hkvdty6ldp7x67hys7pzaeax3hwhidbqkjzva3223jpxqd.onion.pet/" }
_sf_7 ()  { open "https://github.com/rlyonheart/occli" }
_sf_8 ()  { open "https://emm.newsbrief.eu/NewsBrief/clusteredition/ru/latest.html" }
_sf_9 ()  { open "https://www.investing.com/" }
_sf_10 () { open "https://fccid.io" }
_sf_11 () { open "https://api.freebinchecker.com/bin/658205" }
_sf_12 () { open "https://tradint.io/tradint-researcher/" }
_sf_13 () { open "https://cipher387.github.io/corporative_registry_worldwide_catalog/" }
_sf_14 () { open "https://www3.wipo.int/branddb/en/" }
_sf_15 () { open "https://www.tmdn.org/tmdsview-web/" }
_sf_16 () { open "https://tmsearch.uspto.gov/bin/gate.exe?f=login&p_lang=english&p_d=trmk" }
_sf_17 () { open "https://www.tendersinfo.com" }
_sf_18 () { AMAZON_CMD }
_sf_19 () { TOC_CMD }

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
  for i in `seq 0 99`
    do
      if   [ $_s_current_n -eq $i ];then
        _sf_$i
      fi
    done
}

echo "$menu" | _sf_main "$@"
