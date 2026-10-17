# Myohokkein

妙法華院（護国山 妙法華院）の英語サイト。静的HTML + EJSテンプレート + SCSSで構成。

## フォルダ構成

```
src/                   ← 編集するソースファイル
  partials/
    head.ejs           ← <head>（title・CSS）共通
    header.ejs         ← ヘッダー・モバイルメニュー共通
    footer.ejs         ← フッター共通
  index.ejs
  about/index.ejs
  faq/index.ejs
  gallery/index.ejs
  grounds/index.ejs
scss/
  site.scss            ← スタイルのソース（編集する）
css/
  site.css             ← SCSSからコンパイルされた出力（編集しない）
img/                   ← 画像
site.js                ← 共通JS（ヘッダースクロール・ハンバーガーメニュー）
build.js               ← EJSビルドスクリプト
```

出力HTMLは `index.html` / `about/index.html` などに生成される。直接編集しないこと。

## 開発

```bash
npm install
npm run watch    # SCSS + EJSを同時にwatch
```

個別に実行する場合：

```bash
npm run watch:css    # SCSSのみwatch
npm run watch:html   # EJSのみwatch（src/変更時に自動ビルド）
```

一回だけビルド：

```bash
npm run build
```

テストアップ・納品用ファイルの出力：

```bash
npm run dist
```

ビルド後、サーバーに置くファイル（HTML・`css/site.css`・`site.js`・`img/`・`video.mp4`）だけを `dist/` にコピーする。
`dist/` は毎回作り直され、git管理外。アップロードは `dist/` の中身をそのまま公開ディレクトリへ置く。

## ページ一覧

| URL | ソース |
|-----|--------|
| `/` | `src/index.ejs` |
| `/about/` | `src/about/index.ejs` |
| `/faq/` | `src/faq/index.ejs` |
| `/gallery/` | `src/gallery/index.ejs` |
| `/grounds/` | `src/grounds/index.ejs` |

## 共通パーツの編集

- **ヘッダー・ナビ** → `src/partials/header.ejs`
- **フッター** → `src/partials/footer.ejs`
- **`<head>`（CSS・フォント）** → `src/partials/head.ejs`
- **スタイル** → `scss/site.scss`

変更後は `npm run build` で全ページ再生成される（watchモード中は自動）。
