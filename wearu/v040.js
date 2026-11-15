// WEARU v040 — once the first screen is up, quietly download the images the other tabs will need,
// so tapping 穿搭 / 手账 / 懂你 shows them straight away. Only the current gender's images; a few at a time; stops if the tab is hidden.
(function warmUp() {
  const start = async () => {
    const other = appGender === 'male' ? 'female/' : 'male/';
    const found = new Set();
    const add = p => { if (p && typeof p === 'string' && !p.startsWith('data:') && !p.startsWith(other) && !/u-companion|legacy|category-objects/.test(p)) found.add(p); };
    // 1. things we know from the data
    (appGarments || []).forEach(g => add(g.image));
    (typeof communityFeed !== 'undefined' ? communityFeed : []).forEach(p => { add(p.hero); (p.images || []).forEach(add); });
    (typeof shopRecs !== 'undefined' ? shopRecs : []).forEach(r => { add(r.img); add(r.onBody); });
    if (typeof ipFigures !== 'undefined') Object.values(ipFigures).forEach(v => add(v[1]));
    if (typeof beforeShots !== 'undefined') Object.values(beforeShots).forEach(add);
    if (typeof fitLooks !== 'undefined') Object.values(fitLooks).forEach(v => add(`${appGender}/fit-${v[0]}.webp`));
    // 2. every image path written in the code (journal cover, try-ons, category art…)
    const srcs = [...document.querySelectorAll('script[src]')].map(s => s.src);
    for (const s of srcs) {
      try {
        const txt = await fetch(s, { cache: 'force-cache' }).then(r => r.text());
        (txt.match(/(?:\.\.\/images|opt|ip|journal|category(?:-male)?|male|female)\/[A-Za-z0-9_./-]+\.(?:webp|png|jpe?g)/g) || []).forEach(add);
      } catch {}
    }
    const already = new Set([...document.images].map(i => i.src));
    const queue = [...found].map(p => new URL(p, document.baseURI).href).filter(u => !already.has(u));
    let i = 0;
    const next = () => {
      if (i >= queue.length) return;
      if (document.hidden) { document.addEventListener('visibilitychange', next, { once: true }); return; }
      const img = new Image(); img.decoding = 'async';
      img.onload = img.onerror = next;
      img.src = queue[i++];
    };
    for (let k = 0; k < 4; k++) next();
  };
  const idle = window.requestIdleCallback || (fn => setTimeout(fn, 600));
  if (document.readyState === 'complete') idle(start); else window.addEventListener('load', () => idle(start), { once: true });
})();
