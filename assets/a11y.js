/* Lead Elite Academy accessibility helpers (WCAG 2.1 AA) - Nov 18, 2026
   - Skip link to main content (2.4.1)
   - Pause/play control for all motion: background videos, ticker, animations (2.2.2)
   - Respects prefers-reduced-motion; remembers the choice
   - Visible keyboard focus (2.4.7)
   - Accessibility statement link in the footer */
(function () {
  var d = document, KEY = 'lea-motion';
  var css = d.createElement('style');
  css.textContent =
    '.a11y-skip{position:absolute;left:12px;top:-60px;z-index:10000;background:#c8a24a;color:#030a16;padding:10px 16px;border-radius:6px;font:600 15px/1.2 system-ui,sans-serif;text-decoration:none}' +
    '.a11y-skip:focus{top:12px}' +
    ':focus-visible{outline:2px solid #c8a24a!important;outline-offset:3px!important}' +
    '.a11y-motion{position:fixed;left:14px;bottom:14px;z-index:9999;font:600 12px/1 system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#efeae1;background:rgba(3,10,22,.88);border:1px solid rgba(239,234,225,.5);border-radius:999px;padding:10px 14px;cursor:pointer}' +
    '@media (max-width:760px){.a11y-motion{bottom:84px}}' +
    'footer .fl{flex-wrap:wrap;row-gap:.9em}' +
    'html.a11y-still *,html.a11y-still *::before,html.a11y-still *::after{animation-play-state:paused!important;transition:none!important}';
  d.head.appendChild(css);

  function ready(fn) { if (d.readyState !== 'loading') fn(); else d.addEventListener('DOMContentLoaded', fn); }
  ready(function () {
    // 1. skip link
    var target = d.querySelector('main') || d.querySelector('header + section, nav + section, section');
    if (target) {
      if (!target.id) target.id = 'main';
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      var a = d.createElement('a');
      a.className = 'a11y-skip'; a.href = '#' + target.id; a.textContent = 'Skip to main content';
      d.body.insertBefore(a, d.body.firstChild);
    }

    // 2. motion control
    var vids = Array.prototype.slice.call(d.querySelectorAll('video[autoplay], video[loop]'));
    var animated = vids.length || d.querySelector('.marquee, [class*="marquee"], [class*="ticker"]');
    if (animated) {
      var stored = null; try { stored = localStorage.getItem(KEY); } catch (e) {}
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var still = stored ? stored === 'off' : reduce;
      var btn = d.createElement('button');
      btn.type = 'button'; btn.className = 'a11y-motion';
      function apply() {
        d.documentElement.classList.toggle('a11y-still', still);
        vids.forEach(function (v) { if (still) { v.pause(); } else { var p = v.play(); if (p && p.catch) p.catch(function () {}); } });
        btn.textContent = still ? 'Play motion' : 'Pause motion';
        btn.setAttribute('aria-pressed', still ? 'true' : 'false');
      }
      btn.addEventListener('click', function () { still = !still; try { localStorage.setItem(KEY, still ? 'off' : 'on'); } catch (e) {} apply(); });
      d.body.appendChild(btn);
      apply();
    }

    // 3. accessibility statement link in footer
    var foot = d.querySelector('footer .fl') || d.querySelector('footer');
    if (foot && !d.querySelector('footer a[href="/accessibility/"]')) {
      var l = d.createElement('a'); l.href = '/accessibility/'; l.textContent = 'Accessibility';
      foot.appendChild(l);
    }
  });
})();


// TRIBL chat widget (Lead Elite Academy), added Nov 19 2026. Loads on every page that includes this file.
(function () {
  function load() {
    if (document.querySelector('script[data-widget-id="6aff6833e6cd500e96913ddd"]')) return;
    var s = document.createElement('script');
    s.src = 'https://widgets.leadconnectorhq.com/loader.js';
    s.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    s.setAttribute('data-widget-id', '6aff6833e6cd500e96913ddd');
    document.body.appendChild(s);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load); else load();
})();
