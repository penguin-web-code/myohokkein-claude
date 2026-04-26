// shared site behavior: header scroll state, hamburger menu
(function(){
  const hdr = document.querySelector('header.site');
  if (hdr) {
    window.addEventListener('scroll', () => {
      hdr.classList.toggle('scrolled', window.scrollY > 40);
    });
  }
  const burger = document.getElementById('burger');
  const menu = document.getElementById('mobileMenu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('on');
      menu.classList.toggle('on', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('on');
        menu.classList.remove('on');
        document.body.style.overflow = '';
      });
    });
  }
})();
