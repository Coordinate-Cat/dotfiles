# dotfiles

macOSに特化した完全自動環境構築と多シェル対応のdotfiles

## クイックスタート

### ワンコマンド完全セットアップ

新しいMacで完全な自動化を実行する場合：

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Coordinate-Cat/dotfiles/master/bootstrap.sh)"
```

この一つのコマンドで以下を自動インストール・設定：
- Xcode Command Line Tools
- 30+パッケージのHomebrew
- 8つのCLIツールを含むRustツールチェーン
- 117の拡張機能を持つVS Code
- SSHキーとGit設定
- macOSシステム環境設定
- App Storeアプリケーション
- 多シェル環境（6つのシェル対応）

### 安全なテスト

変更を加える前にプレビューしたい場合：

```bash
# 最初にクローンして安全にテスト
git clone https://github.com/Coordinate-Cat/dotfiles.git ~/dotfiles
cd ~/dotfiles

# ドライラン（インストール予定の内容を表示）
npm run test:dry-run

# バックアップ・ロールバック機能付きテスト
./scripts/test-bootstrap.sh --test
```

### 代替インストール

最小限のdotfiles専用セットアップ：

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/Coordinate-Cat/dotfiles/master/install.sh)"
cd ~/dotfiles && npm run setup
```

## 主要機能

### 完全自動化
- 新しいmacOSシステムでの設定ゼロセットアップ
- 複数システムにわたる自動パッケージ管理
- SSHキー生成とGitHub統合
- macOSシステム環境設定の自動設定
- 安全テスト用のバックアップ・ロールバック機能

### 多シェル環境
包括的な設定を持つメインシェル：
- **Zsh**（メイン） - Zinitプラグインマネージャー、モジュール設定、統合エイリアスシステムを備えたZSH-MODE
- `alias.zsh`での統一エイリアス定義による一貫性のある体験
- シェルモード表示とGruvboxテーマを持つStarshipプロンプト

色分けされたインジケーターで追加シェルにも対応可能な拡張アーキテクチャ。

### パッケージエコシステム
- **Homebrew**: 30+の公式パッケージとcask（開発ツール、アプリケーション）
- **Cargo**: 8つのRust CLIツール（nu、ripgrep、exa、starship等）
- **npm**: Node.js開発パッケージ
- **VS Code**: 117の拡張機能（テーマ、リンター、フォーマッター、生産性向上）
- **App Store**: 必須アプリケーション（Xcode、ユーティリティ）

### 統一テーマシステム
- **ビジュアルテーマ**: 全アプリケーション共通のGruvbox dark
- **ターミナル**: StarshipプロンプトでのiTerm2
- **エディター**: 一貫したテーマのVim、VS Code
- **ウィンドウ管理**: yabaiタイリングマネージャー + Rectangle
- **フォント**: アイコンサポート付きHack Nerd Font

## よく使うコマンド

### インストールとセットアップ
```bash
npm run bootstrap-full    # 完全自動インストール
npm run setup            # パッケージのみインストール
npm run install:bundle   # パッケージマニフェストからインストール
```

### テストと安全性
```bash
npm run test:dry-run      # 安全にインストールをプレビュー
npm run test:bootstrap    # バックアップ機能付きテスト
npm run doctor           # 包括的なヘルスチェック
npm run doctor:fix       # 検出された問題を自動修正
```

### メンテナンス
```bash
npm run update           # 全パッケージ更新
npm run clean            # 一時ファイルとキャッシュ削除
npm run backup           # 設定のバックアップ作成
npm run health           # システムヘルス確認
```

### 情報表示
```bash
npm run status           # Gitステータスとヘルス概要
npm run symlinks         # dotfilesのシンボリックリンク表示
npm run docs             # ドキュメント表示
```

## リポジトリ構造

```
~/dotfiles/
├── .shell/              # シェル設定
│   ├── .zsh/           # モジュール式Zsh設定（4ファイル）
│   └── validate.sh     # シェル検証スクリプト
├── .config/            # アプリケーション設定
│   ├── starship/       # シェルモード表示付きプロンプト
│   ├── iterm2/         # ターミナル設定
│   ├── vscode/         # エディター設定
│   ├── ghostty/        # GPU加速ターミナル
│   └── superfile/      # ファイルマネージャー（ayu-darkテーマ）
├── .aliases/           # カテゴリ別に整理されたシェル固有エイリアス
│   └── zsh/            # ツール・目的別Zshエイリアスファイル
├── .bundle/            # パッケージ管理マニフェスト
│   ├── Brewfile        # Homebrewパッケージとcask
│   ├── Cargofile       # Rust CLIツール
│   ├── Vscfile         # VS Code拡張機能（117個）
│   └── install.sh      # バンドルインストールスクリプト
├── scripts/           # スクリプトと自動化
│   ├── bootstrap.sh   # 完全自動化スクリプト
│   ├── test-bootstrap.sh # バックアップ・ロールバック付き安全テスト
│   ├── doctor.sh      # ヘルスチェックと診断
│   └── install.sh     # 基本dotfilesインストール
├── docs/              # ドキュメント
│   ├── CLAUDE.md      # Claude Code統合設定
│   ├── usage.md       # 包括的なドキュメント
│   ├── CODE_OF_CONDUCT.md
│   └── LICENSE
├── .zshrc              # メインZsh設定
├── alias.zsh           # 統合エイリアス定義
├── .vimrc              # Vim設定
├── .zshenv             # 環境変数
└── package.json        # npmスクリプト（25+コマンド）
```

## ドキュメント

- **README.md** - クイックスタートと概要（英語版）
- **README_ja.md** - クイックスタートと概要（この日本語版）
- **docs/usage.md** - 完全な使用ガイドとリファレンス
- **docs/CLAUDE.md** - Claude Code統合設定
- **docs/CODE_OF_CONDUCT.md** - コミュニティガイドライン
- **docs/LICENSE** - WTFPLライセンス

ドキュメントアクセス：
```bash
npm run docs           # docs/usage.mdを開く
```

## 必要環境

- **macOS**: 10.15 (Catalina) 以降
- **ネットワーク**: ダウンロード用インターネット接続
- **アカウント**: GitHubアカウント（SSHキー設定用）
- **権限**: 管理者アクセス（システム環境設定用）

## 安全性とテスト

このリポジトリには包括的なテスト機能が含まれています：
- **ドライランモード**: 実行前の全変更プレビュー
- **自動バックアップ**: テスト中のシステム状態保持
- **完全ロールバック**: インストール前状態への復元
- **ヘルス監視**: 継続的なシステム検証

## 特記事項

### 日本語環境での使用について
- すべてのコマンドとスクリプトは英語ですが、日本語環境での使用に問題ありません
- ターミナルの日本語表示も適切に処理されます
- 文字エンコーディングはUTF-8で統一されています

### カスタマイズについて
- 設定ファイルは自由にカスタマイズ可能です
- 追加したい機能や設定がある場合は、該当するファイルを編集してください
- 変更後は `source ~/.zshrc` でリロードするか、ターミナルを再起動してください

## ライセンス

WTFPL (DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE) - 詳細はLICENSEファイルをご覧ください

---

**注意**: このdotfilesはmacOS専用に最適化されています。他のOSでの動作は保証されません。