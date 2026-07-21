// RavLight site — shared behaviour.
// Lightbox: click any screenshot (docs shots, project media) to expand it
// full-screen; click the backdrop, the ✕, or press Esc to close.
(function () {
  var SEL = 'img.doc-shot, .shots img, .project-media img, .project-body img';
  var lb = null;

  function build() {
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lb-close" aria-label="Close">×</button><img alt="">';
    document.body.appendChild(lb);
    lb.addEventListener('click', close);
    return lb;
  }

  function open(src, alt) {
    if (!lb) build();
    var img = lb.querySelector('img');
    img.src = src;
    img.alt = alt || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    var img = e.target.closest && e.target.closest(SEL);
    if (img) { e.preventDefault(); open(img.currentSrc || img.src, img.alt); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();

// Landing page: reveal the fixed nav only once the visitor scrolls down
// past the hero; hide it again near the top. See body.home .nav in site.css.
(function () {
  if (!document.body.classList.contains('home')) return;
  var nav = document.querySelector('.nav');
  if (!nav) return;

  var SHOW_AFTER = 10; // px scrolled before the nav appears
  var ticking = false;

  function update() {
    nav.classList.toggle('nav-visible', window.scrollY > SHOW_AFTER);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
})();
