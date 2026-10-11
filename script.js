(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const gift = $('gift'), stage = $('stage'), wrap = $('letterWrap'), letter = $('letter'),
        burst = $('burst'), musicBtn = $('musicBtn'), replayBtn = $('replay'), floaters = $('floaters');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rand = (a, b) => a + Math.random() * (b - a);
  let state = 'idle'; // idle | opening | open
  let timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));

  letter.querySelectorAll('p').forEach((p, i) => p.style.setProperty('--i', i));

  /* floating hearts & petals */
  if (!reduce) {
    const items = ['❤','🤍','💗','🌸','🌹'];
    const count = innerWidth < 600 ? 12 : 20;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'f';
      el.textContent = items[i % items.length];
      el.style.cssText = `--x:${rand(0,100)}%;--s:${rand(.8,1.5)}rem;--d:${rand(14,26)}s;--dl:${-rand(0,26)}s;--dx:${rand(-60,60)}px;--r:${rand(-180,180)}deg`;
      floaters.appendChild(el);
    }
  }

  /* music */
  const audio = new Audio('assets/music.mp3');
  audio.loop = true; audio.preload = 'auto'; audio.volume = 0;
  let fadeTimer, audioOk = true;
  audio.addEventListener('error', () => { audioOk = false; musicBtn.hidden = true; });
  const setBtn = on => { musicBtn.setAttribute('aria-pressed', on); musicBtn.setAttribute('aria-label', on ? 'توقف موسیقی' : 'پخش موسیقی'); };
  function fadeTo(target, ms, done) {
    clearInterval(fadeTimer);
    const start = audio.volume, t0 = performance.now();
    fadeTimer = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      audio.volume = Math.max(0, Math.min(1, start + (target - start) * k));
      if (k === 1) { clearInterval(fadeTimer); done && done(); }
    }, 50);
  }
  async function play() {
    if (!audioOk) return;
    try { await audio.play(); musicBtn.hidden = false; setBtn(true); fadeTo(.6, 4000); }
    catch (e) { if (audioOk) { musicBtn.hidden = false; setBtn(false); } }
  }
  function pause() { fadeTo(0, 400, () => audio.pause()); setBtn(false); }
  musicBtn.addEventListener('click', () => audio.paused ? play() : pause());

  /* burst of hearts and petals */
  function spawnBurst() {
    if (reduce) return;
    const items = ['❤','💗','🌸','🌹','🤍'];
    for (let i = 0; i < 18; i++) {
      const el = document.createElement('span');
      el.className = 'p';
      el.textContent = items[i % items.length];
      el.style.cssText = `--x:${rand(-150,150)}px;--y:${-rand(120,300)}px;--r:${rand(-200,200)}deg;--s:${rand(1,1.8)}rem;animation-delay:${rand(0,.5)}s`;
      burst.appendChild(el);
    }
    later(() => { burst.textContent = ''; }, 3200);
  }

  /* open */
  function openGift() {
    if (state !== 'idle') return;
    state = 'opening';
    gift.classList.add('open');
    gift.setAttribute('aria-expanded', 'true');
    play();
    later(spawnBurst, 500);
    later(() => {
      wrap.hidden = false;
      stage.classList.add('done');
      letter.classList.add('show');
      letter.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      letter.focus({ preventScroll: true });
      state = 'open';
    }, reduce ? 100 : 2300);
  }

  /* replay */
  function replay() {
    if (state !== 'open') return;
    timers.forEach(clearTimeout); timers = [];
    state = 'idle';
    letter.classList.remove('show');
    wrap.hidden = true;
    stage.classList.remove('done');
    gift.classList.remove('open');
    gift.removeAttribute('aria-expanded');
    if (!audio.paused) pause();
    scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    later(() => gift.focus({ preventScroll: true }), 600);
  }

  gift.addEventListener('click', openGift);
  replayBtn.addEventListener('click', replay);
})();
