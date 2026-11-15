// WEARU v028 — new brand: layered-swatch logo + felt companion figures (5 to choose from).

/* ---------- logo ---------- */
function wearuMark(cls = 'wearu-mark') {
  return `<svg class="${cls}" viewBox="0 0 64 62" aria-hidden="true">
    <rect x="10" y="44" width="28" height="15" rx="1.2" fill="#C4643F" transform="rotate(-2 24 51)"/>
    <rect x="2" y="27" width="47" height="22" rx="1.2" fill="#EFE5D3" stroke="#D8CBB4" stroke-width=".6" transform="rotate(-3 25 38)"/>
    <path d="M18 10.5 52.4 2.4c1.9-.4 3.2.6 3.2 2.5V25c0 11.4-7.6 19-18.6 19H18.4z" fill="#2B2A28"/>
    <path d="M52 7.2V25c0 9.2-6 15.4-15 15.4H21.4" fill="none" stroke="#F4EFE7" stroke-width="1.4" stroke-dasharray="2.8 2.2" stroke-linecap="round"/>
  </svg>`;
}
brandLogo = function () { return `<span class="brand-lockup v28">${wearuMark()}<b>WEARU</b></span>`; };
// favicon
(() => {
  const svg = wearuMark('').replace('<svg class=""', '<svg xmlns="http://www.w3.org/2000/svg"');
  let l = document.querySelector('link[rel="icon"]');
  if (!l) { l = document.createElement('link'); l.rel = 'icon'; document.head.appendChild(l); }
  l.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
})();

/* ---------- companion figures ---------- */
const ipFigures = {
  navy: ['藏青', 'ip/navy.webp'], ink: ['墨黑', 'ip/ink.webp'], stone: ['石灰', 'ip/stone.webp'],
  clay: ['陶土', 'ip/clay.webp'], mustard: ['芥黄', 'ip/mustard.webp']
};
const legacyU = { ivory: 'navy', sage: 'stone', charcoal: 'ink', clay: 'clay' };
uColor = function () {
  const c = (appState.profile && appState.profile.uColor) || 'navy';
  return ipFigures[c] ? c : (legacyU[c] || 'navy');
};
uMark = function (size = 28, extra = '') {
  return `<span class="u-mark ip-mark ${extra}" style="--u:${size}px" aria-hidden="true"><img src="${ipFigures[uColor()][1]}" alt=""></span>`;
};
companionPanel = function () {
  const sel = uColor();
  return `<section class="companion-panel ip-panel">
    <div class="u-display" id="u-display"><img src="${ipFigures[sel][1]}" alt="你的穿搭伙伴"></div>
    <div class="companion-copy"><span class="micro">YOUR WARDROBE COMPANION</span><h3>选一个陪你穿搭的小伙伴</h3><p>它会出现在搭配、手账和衣橱诊断里。</p>
      <div class="ip-pick" aria-label="选择穿搭伙伴">${Object.entries(ipFigures).map(([k, [n, src]]) => `<button type="button" aria-pressed="${k === sel}" title="${n}" onclick="setCompanionColor('${k}',this)"><img src="${src}" alt="${n}"></button>`).join('')}</div>
    </div></section>`;
};
setCompanionColor = function (c, btn) {
  if (!ipFigures[c]) return;
  appState.profile.uColor = c;
  const img = document.querySelector('#u-display img'); if (img) img.src = ipFigures[c][1];
  document.querySelectorAll('.ip-pick button').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
  try { localStorage.setItem(K('profile'), JSON.stringify(appState.profile)); } catch {}
  softRender();
};

/* ---------- nav: 懂你 uses a stitched swatch instead of the old U ---------- */
appIcons.insight = '<svg viewBox="0 0 24 24"><path d="M5 6.5 18.6 4.2c.8-.1 1.4.4 1.4 1.2v6.2c0 4.3-3 7.4-7.3 7.4H5.6z"/><path d="M17.8 7v4.6c0 3-2 5.1-5 5.1H8" stroke-dasharray="1.6 1.6"/></svg>';

appRender();
