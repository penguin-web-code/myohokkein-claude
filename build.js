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
      activePage: 'home',
      langUrl: 'http://www.myohokkein.jp/',
      footerBlurb: 'A Nichiren-shū branch temple on the Rokko mountainside of Kobe, welcoming visitors since 1632.',
      footerCopyright: '© Myohokkein · Gokokuzan · Established 1884',
    },
  },
  {
    src: 'src/about/index.ejs',
    out: 'about/index.html',
    data: {
      rootPath: '../',
      title: 'About — Myohokkein, A Nichiren Temple in Kobe',
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
      activePage: 'faq',
      langUrl: 'http://www.myohokkein.jp/',
      footerBlurb: 'A Nichiren-shū branch temple on the Rokko mountainside of Kobe, welcoming visitors since 1632.',
      footerCopyright: '© Myohokkein · Gokokuzan · Established 1884',
    },
  },
  {
    src: 'src/gallery/index.ejs',
    out: 'gallery/index.html',
    data: {
      rootPath: '../',
      title: 'Gallery — Myohokkein, A Nichiren Temple in Kobe',
      activePage: 'gallery',
      langUrl: 'http://www.myohokkein.jp/',
      footerBlurb: 'A Nichiren-shū branch temple on the Rokko mountainside of Kobe, welcoming visitors since 1632.',
      footerCopyright: '© Myohokkein · Gokokuzan · Established 1884',
    },
  },
  {
    src: 'src/grounds/index.ejs',
    out: 'grounds/index.html',
    data: {
      rootPath: '../',
      title: 'Grounds — Myohokkein, A Nichiren Temple in Kobe',
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
      activePage: 'memorial',
      langUrl: 'http://www.myohokkein.jp/',
      footerBlurb: 'A Nichiren-shū branch temple in Kobe, offering animal memorial and ossuary services.',
      footerCopyright: '© Myohokkein · Gokokuzan · Since 1884',
    },
  },
];

const root = path.resolve('src');

// CSS/JSのURLに付けるバージョン。ファイルの更新時刻から作るので、
// ビルドするたびに変わり、ブラウザやCDNの古いキャッシュを踏まない。
const mtime = (f) => { try { return fs.statSync(f).mtimeMs; } catch { return 0; } };
const assetVersion = String(Math.floor(Math.max(mtime('css/site.css'), mtime('site.js')) / 1000));

pages.forEach(({ src, out, data }) => {
  ejs.renderFile(src, { ...data, assetVersion }, { root }, (err, html) => {
    if (err) { console.error(`Error in ${src}:`, err.message); process.exit(1); }
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    console.log(`✓ ${out}`);
  });
});
