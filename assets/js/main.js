/* ============================================================
   4J Innovation Limited — main.js  v2.0
   Added: Google Maps / Google Earth (satellite) map view toggle
============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* YEAR */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ACTIVE NAV LINK */
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.classList.add('active-link');
  });

  /* NAVBAR SCROLL STATE */
  var navbar = document.getElementById('navbar');
  var toTop = document.getElementById('toTop');
  window.addEventListener('scroll', function () {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
    if (toTop) toTop.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });

  /* MOBILE MENU */
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var active = burger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      burger.setAttribute('aria-expanded', active);
      document.body.style.overflow = active ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* SCROLL REVEAL */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* COUNTERS */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var duration = 1400, start = performance.now();
          function tick(now) {
            var progress = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(tick); else el.textContent = target;
          }
          requestAnimationFrame(tick);
          counterIO.unobserve(el);
        }
      });
    }, { threshold: .5 });
    counters.forEach(function (c) { counterIO.observe(c); });
  }

  /* FAQ ACCORDION */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    if (!btn || !answer) return;
    btn.addEventListener('click', function () {
      var isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('active');
        i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        i.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* TESTIMONIAL DOTS */
  var tTrack = document.getElementById('tTrack');
  if (tTrack) {
    var tDots = document.getElementById('tDots');
    var tCards = tTrack.querySelectorAll('.t-card');
    tCards.forEach(function (_, i) {
      var dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.addEventListener('click', function () {
        tCards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      });
      tDots.appendChild(dot);
    });
    tTrack.addEventListener('scroll', function () {
      var closest = 0, minDist = Infinity;
      tCards.forEach(function (card, i) {
        var dist = Math.abs(card.getBoundingClientRect().left - tTrack.getBoundingClientRect().left);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      tDots.querySelectorAll('button').forEach(function (d, i) { d.classList.toggle('active', i === closest); });
    }, { passive: true });
  }

  /* GALLERY FILTER */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var galleryItems = document.querySelectorAll('#galleryGrid .gallery-item');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var filter = btn.getAttribute('data-filter');
        galleryItems.forEach(function (item) {
          var match = filter === 'all' || item.getAttribute('data-category') === filter;
          item.classList.toggle('hide', !match);
        });
      });
    });
  }

  /* LIGHTBOX */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxTitle = document.getElementById('lightboxTitle');
    var lightboxDesc = document.getElementById('lightboxDesc');
    document.querySelectorAll('[data-lightbox]').forEach(function (item) {
      item.addEventListener('click', function () {
        var img = item.querySelector('img');
        lightboxImg.src = img ? img.src : '';
        lightboxImg.alt = img ? img.alt : '';
        lightboxTitle.textContent = item.getAttribute('data-title') || '';
        lightboxDesc.textContent = item.getAttribute('data-desc') || '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
    var lbClose = document.getElementById('lightboxClose');
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
  }

  /* BACK TO TOP */
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* CONTACT FORM */
  var quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    var formSuccess = document.getElementById('formSuccess');
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!quoteForm.checkValidity()) { quoteForm.reportValidity(); return; }
      // TODO: connect to backend / Formspree / email API here
      formSuccess.classList.add('show');
      quoteForm.reset();
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(function () { formSuccess.classList.remove('show'); }, 6000);
    });
  }

  /* MAP VIEW TOGGLE (Map / Google Earth satellite) */
  var locationMap = document.getElementById('locationMap');
  var mapBtns = document.querySelectorAll('.map-view-btn');
  if (locationMap && mapBtns.length) {
    var MAP_SOURCES = {
      roadmap: 'https://www.google.com/maps?q=Lot+128+Sec+64+Leander+Street+Boroko+Port+Moresby+Papua+New+Guinea&t=m&z=17&output=embed',
      satellite: 'https://www.google.com/maps?q=Lot+128+Sec+64+Leander+Street+Boroko+Port+Moresby+Papua+New+Guinea&t=k&z=17&output=embed'
    };
    mapBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var view = btn.getAttribute('data-map-view');
        if (!MAP_SOURCES[view]) return;
        mapBtns.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle('active', active);
          b.setAttribute('aria-pressed', active ? 'true' : 'false');
        });
        locationMap.src = MAP_SOURCES[view];
      });
    });
  }

});