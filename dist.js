const fs = require('fs');
const path = require('path');
const { pages } = require('./build');

// テストアップ・納品用に、サーバーへ置くファイルだけを dist/ に集める。
// 先に npm run build を通した成果物をコピーするだけなので、ソースは触らない。
const outDir = 'dist';

// ページHTML以外にサーバーで必要なもの。site.css.map や src/ などの開発用ファイルは含めない
const assets = ['css/site.css', 'site.js', 'img', 'video.mp4'];

// 前回の出力を残すと、削除・リネームした画像が dist に残り続けるので毎回作り直す
fs.rmSync(outDir, { recursive: true, force: true });

const copy = (from) => {
  const to = path.join(outDir, from);
  fs.cpSync(from, to, {
    recursive: true,
    filter: (f) => path.basename(f) !== '.DS_Store',
  });
  console.log(`✓ ${to}`);
};

pages.forEach(({ out }) => copy(out));
assets.forEach(copy);
