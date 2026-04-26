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
      footerCopyright: '© Myohokkein · Gokokusan · Established 1632',
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
      footerCopyright: '© Myohokkein · Gokokusan · Since 1884',
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
      footerCopyright: '© Myohokkein · Gokokusan · Established 1632',
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
      footerCopyright: '© Myohokkein · Gokokusan · Established 1632',
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
      footerCopyright: '© Myohokkein · Gokokusan · Since 1884',
    },
  },
];

const root = path.resolve('src');

pages.forEach(({ src, out, data }) => {
  ejs.renderFile(src, data, { root }, (err, html) => {
    if (err) { console.error(`Error in ${src}:`, err.message); process.exit(1); }
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    console.log(`✓ ${out}`);
  });
});
