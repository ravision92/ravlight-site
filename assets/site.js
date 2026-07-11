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
