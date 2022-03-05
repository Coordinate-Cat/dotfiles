""###[ vim-plug ]###############################################################
if empty(glob('~/.vim/autoload/plug.vim'))
  silent !curl -fLo ~/.vim/autoload/plug.vim --create-dirs
    \ https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
    \ >/dev/null 2>&1
  autocmd VimEnter * PlugInstall --sync | source $MYVIMRC
endif

call plug#begin('~/.vim/plugged')
Plug 'Shougo/ddc.vim'
Plug 'Shougo/pum.vim'
Plug 'Shougo/ddc-around'
Plug 'preservim/nerdtree'
Plug 'LumaKernel/ddc-file'
Plug 'Shougo/ddc-sorter_rank'
Plug 'ryanoasis/vim-devicons'
Plug 'Shougo/ddc-matcher_head'
Plug 'vim-airline/vim-airline'
Plug 'sainnhe/gruvbox-material'
Plug 'vim-airline/vim-airline-themes'
Plug 'Shougo/ddc-converter_remove_overlap'
call plug#end()

let g:airline_powerline_fonts = 1
let g:airline#extensions#tabline#enabled = 1
let NERDTreeShowHidden=1
" let g:airline_theme='gruvbox'

augroup TransparentBG
  autocmd!
  "" airline transparent
	autocmd Colorscheme * highlight Normal ctermbg=none
	autocmd Colorscheme * highlight NonText ctermbg=none
	autocmd Colorscheme * highlight LineNr ctermbg=none
	autocmd Colorscheme * highlight Folded ctermbg=none
	autocmd Colorscheme * highlight EndOfBuffer ctermbg=none
  "" Statement
  autocmd colorscheme * highlight clear Statement
  autocmd colorscheme * highlight Statement ctermfg=202
  "" Comment
  autocmd colorscheme * highlight Comment ctermbg=15
  autocmd colorscheme * highlight clear Comment
  "" Keyword
  autocmd colorscheme * highlight clear Keyword
  autocmd colorscheme * highlight Keyword ctermfg=202
  "" Conditional
  autocmd colorscheme * highlight clear Conditional
  autocmd colorscheme * highlight Conditional ctermfg=202
augroup END


""###[ config ]#################################################################
set nowritebackup                        "" ファイルを上書きする前にバックアップを作ることを無効化
set nobackup                             "" ファイルを上書きする前にバックアップを作ることを無効化
set virtualedit=block                    "" vim の矩形選択で文字が無くても右へ進める
set backspace=indent,eol,start           "" 挿入モードでバックスペースで削除できるようにする
set ambiwidth=single                     "" 全角文字専用の設定
set wildmenu                             "" wildmenuオプションを有効(vimバーからファイルを選択できる)

""###[ config(search) ]#########################################################
set ignorecase                           "" 検索するときに大文字小文字を区別しない
set smartcase                            "" 小文字で検索すると大文字と小文字を無視して検索
set wrapscan                             "" 検索がファイル末尾まで進んだら、ファイル先頭から再び検索
set incsearch                            "" インクリメンタル検索 (検索ワードの最初の文字を入力した時点で検索が開始)
set hlsearch                             "" 検索結果をハイライト表示

""###[ config(editor) ]#########################################################
set t_Co=256                             "" 256色対応
set background=dark                      "" バックグラウンドを暗くする
set noerrorbells                         "" エラーメッセージの表示時にビープを鳴らさない
set shellslash                           "" Windowsでパスの区切り文字をスラッシュで扱う
set showmatch matchtime=1                "" 対応する括弧やブレースを表示
set cinoptions+=:0                       "" インデント方法の変更
set cmdheight=2                          "" メッセージ表示欄を2行確保
set laststatus=2                         "" ステータス行を常に表示
set showcmd                              "" ウィンドウの右下にまだ実行していない入力中のコマンドを表示
set display=lastline                     "" 省略されずに表示
set list                                 "" タブ文字を CTRL-I で表示し、行末に $ で表示する
set listchars=tab:^\ ,trail:~            "" 行末のスペースを可視化
set history=10000                        "" コマンドラインの履歴を10000件保存する
hi Comment ctermfg=3                     "" コメントの色を水色
set expandtab                            "" 入力モードでTabキー押下時に半角スペースを挿入
set shiftwidth=2                         "" インデント幅
set softtabstop=2                        "" タブキー押下時に挿入される文字幅を指定
set tabstop=2                            "" ファイル内にあるタブ文字の表示幅
set guioptions-=T                        "" ツールバーを非表示にする
set guioptions+=a                        "" yでコピーした時にクリップボードに入る
set guioptions-=m                        "" メニューバーを非表示にする
set guioptions+=R                        "" 右スクロールバーを非表示
set showmatch                            "" 対応する括弧を強調表示
set smartindent                          "" 改行時に入力された行の末尾に合わせて次の行のインデントを増減する
set noswapfile                           "" スワップファイルを作成しない
set nofoldenable                         "" 検索にマッチした行以外を折りたたむ(フォールドする)機能
set title                                "" タイトルを表示
set number                               "" 行番号の表示
" set clipboard=unnamed,autoselect         "" ヤンクでクリップボードにコピー
nnoremap <Esc><Esc> :nohlsearch<CR><ESC> "" Escの2回押しでハイライト消去
syntax on                                "" シンタックスハイライト
set nrformats=                           "" すべての数を10進数として扱う
set whichwrap=b,s,h,l,<,>,[,],~          "" 行をまたいで移動
set mouse=a                              "" バッファスクロール
set ttimeoutlen=50                       "" airlineモード切り替え軽量化
" set cursorline
" set cursorcolumn

""###[ auto reload .vimrc ]#####################################################
augroup source-vimrc
  autocmd!
  autocmd BufWritePost *vimrc source $MYVIMRC | set foldmethod=marker
  autocmd BufWritePost *gvimrc if has('gui_running') source $MYGVIMRC
augroup END

""###[ auto comment off ]#######################################################
augroup auto_comment_off
  autocmd!
  autocmd BufEnter * setlocal formatoptions-=r
  autocmd BufEnter * setlocal formatoptions-=o
augroup END

""###[ html/xml auto close tag ]################################################
augroup MyXML
  autocmd!
  autocmd Filetype xml inoremap <buffer> </ </<C-x><C-o>
  autocmd Filetype html inoremap <buffer> </ </<C-x><C-o>
augroup END

""###[ memorize the cursor of the edited part ]#################################
if has("autocmd")
  augroup redhat
    " In text files, alwaycの2回押しでハイライト消去[B limit the width of text to 78 characters
    autocmd BufRead *.txt set tw=78
    " When editing a file, always jump to the last cursor position
    autocmd BufReadPost *
    \ if line("'\"") > 0 && line ("'\"") <= line("$") |
    \   exe "normal! g'\"" |
    \ endif
  augroup END
endif

colorscheme gruvbox-material