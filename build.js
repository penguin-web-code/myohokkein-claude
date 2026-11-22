const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const pages = [
  {
    src: 'src/index.ejs',
    out: 'index.html',
    data: {
      rootPath: '',
      title: 'Myohokkein — A Nichiren Buddhist Temple in Kobe',
      path: '',
      description: 'A contemporary Nichiren Buddhist temple in Kobe, rooted in tradition since 1884. A 1-minute walk from Shinkaichi station — all are welcome, open daily 9:00–17:00.',
      activePage: 'home',
      langUrl: 'http://www.myohokkein.jp/',
      footerBlurb: 'A Nichiren-shū branch temple on the mountainside of Kobe, welcoming visitors since 1884.',
      footerCopyright: '© Myohokkein · Gokokuzan · Established 1884',
    },
  },
  {
    src: 'src/about/index.ejs',
    out: 'about/index.html',
    data: {
      rootPath: '../',
      title: 'About — Myohokkein, A Nichiren Temple in Kobe',
      path: 'about/',
      description: 'The history of Myohokkein, a Nichiren-shū temple in Kobe since 1884, an introduction to Nichiren Buddhism, and a profile of the head priest.',
      activePage: 'about',
      langUrl: 'http://www.myohokkein.jp/concept1.html',
      footerBlurb: 'A Nichiren-shū branch temple on the mountainside of Kobe, welcoming visitors since 1884.',
      footerCopyright: '© Myohokkein · Gokokuzan · Since 1884',
    },
  },
  {
    src: 'src/faq/index.ejs',
    out: 'faq/index.html',
    data: {
      rootPath: '../',
      title: 'FAQ — Myohokkein, A Nichiren Temple in Kobe',
      path: 'faq/',
      description: 'Frequently asked questions about visiting Myohokkein, a Nichiren Buddhist temple in Kobe — opening hours, access, etiquette and more.',
      activePage: 'faq',
      langUrl: 'http://www.myohokkein.jp/',
      footerBlurb: 'A Nichiren-shū branch temple on the mountainside of Kobe, welcoming visitors since 1884.',
      footerCopyright: '© Myohokkein · Gokokuzan · Established 1884',
    },
  },
  {
    src: 'src/gallery/index.ejs',
    out: 'gallery/index.html',
    data: {
      rootPath: '../',
      title: 'Gallery — Myohokkein, A Nichiren Temple in Kobe',
      path: 'gallery/',
      description: 'Photographs of Myohokkein, a Nichiren Buddhist temple in Kobe — its grounds, ceremonies and seasonal moments.',
      activePage: 'gallery',
      langUrl: 'http://www.myohokkein.jp/',
      footerBlurb: 'A Nichiren-shū branch temple on the mountainside of Kobe, welcoming visitors since 1884.',
      footerCopyright: '© Myohokkein · Gokokuzan · Established 1884',
    },
  },
  {
    src: 'src/grounds/index.ejs',
    out: 'grounds/index.html',
    data: {
      rootPath: '../',
      title: 'Grounds — Myohokkein, A Nichiren Temple in Kobe',
      path: 'grounds/',
      description: 'A guide to the grounds of Myohokkein in Kobe — a temple of unusual modern architecture, with a ramp winding around the Koi Garden and two domes crowning the rooftop.',
      activePage: 'grounds',
      langUrl: 'http://www.myohokkein.jp/company1.html',
      footerBlurb: 'A Nichiren-shū branch temple on the mountainside of Kobe, welcoming visitors since 1884.',
      footerCopyright: '© Myohokkein · Gokokuzan · Since 1884',
    },
  },
  {
    src: 'src/memorial/index.ejs',
    out: 'memorial/index.html',
    data: {
      rootPath: '../',
      title: 'Animal Memorial & Ossuary — Myohokkein, A Nichiren Temple in Kobe',
      path: 'memorial/',
      description: 'Animal memorial and ossuary services at Myohokkein, Kobe. More than 1,000 animals rest beneath the memorial monument, open for visits 24 hours a day.',
      activePage: 'memorial',
      langUrl: 'http://www.myohokkein.jp/',
      footerBlurb: 'A Nichiren-shū branch temple in Kobe, offering animal memorial and ossuary services.',
      footerCopyright: '© Myohokkein · Gokokuzan · Since 1884',
    },
  },
];

// 本番の公開URL。og:url / og:image は絶対URLが必要なので、ここから組み立てる
const siteUrl = 'http://www.myohokkein.jp/en/';

const root = path.resolve('src');

// CSS/JSのURLに付けるバージョン。ファイルの更新時刻から作るので、
// ビルドするたびに変わり、ブラウザやCDNの古いキャッシュを踏まない。
const mtime = (f) => { try { return fs.statSync(f).mtimeMs; } catch { return 0; } };
const assetVersion = String(Math.floor(Math.max(mtime('css/site.css'), mtime('site.js')) / 1000));

// dist.js が出力ページ一覧を参照するので、require されたときはビルドしない
module.exports = { pages };
if (require.main !== module) return;

pages.forEach(({ src, out, data }) => {
  ejs.renderFile(src, { ...data, siteUrl, assetVersion }, { root }, (err, html) => {
    if (err) { console.error(`Error in ${src}:`, err.message); process.exit(1); }
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    console.log(`✓ ${out}`);
  });
});
