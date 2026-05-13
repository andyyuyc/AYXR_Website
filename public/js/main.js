// AYXR — small enhancements. No deps.

(function () {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- typing rotator ----------
  const typedEl = document.querySelector('.typed');
  if (typedEl) {
    let phrases;
    try {
      phrases = JSON.parse(typedEl.dataset.type || '[]');
    } catch (e) {
      phrases = [];
    }
    if (phrases.length === 0) phrases = ['building things.'];

    if (reduced) {
      typedEl.textContent = phrases[0];
    } else {
      let pIdx = 0;
      let cIdx = 0;
      let deleting = false;

      const tick = () => {
        const current = phrases[pIdx];
        if (!deleting) {
          cIdx++;
          typedEl.textContent = current.slice(0, cIdx);
          if (cIdx === current.length) {
            deleting = true;
            return setTimeout(tick, 1800);
          }
          return setTimeout(tick, 55 + Math.random() * 35);
        } else {
          cIdx--;
          typedEl.textContent = current.slice(0, cIdx);
          if (cIdx === 0) {
            deleting = false;
            pIdx = (pIdx + 1) % phrases.length;
            return setTimeout(tick, 320);
          }
          return setTimeout(tick, 28);
        }
      };
      setTimeout(tick, 600);
    }
  }

  // ---------- card mouse-follow glow ----------
  if (!reduced) {
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

  // ---------- subtle scramble on hero meta ----------
  if (!reduced) {
    const scrambleChars = '!<>-_\\/[]{}—=+*^?#________';
    document.querySelectorAll('[data-scramble]').forEach((el) => {
      const target = el.textContent;
      let frame = 0;
      const queue = [];
      for (let i = 0; i < target.length; i++) {
        queue.push({
          to: target[i],
          start: Math.floor(Math.random() * 20),
          end: 20 + Math.floor(Math.random() * 20),
        });
      }
      const run = () => {
        let out = '';
        let done = 0;
        for (let i = 0; i < queue.length; i++) {
          const { to, start, end } = queue[i];
          if (frame >= end) {
            done++;
            out += to;
          } else if (frame >= start) {
            out += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          } else {
            out += to;
          }
        }
        el.textContent = out;
        if (done < queue.length) {
          frame++;
          requestAnimationFrame(run);
        }
      };
      run();
    });
  }
})();
