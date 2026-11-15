// WEARU v030 — review fixes:
// 1 look card keeps one label · 2 「U 说」: companion always top-left with speech marks
// 3 journal: one date line, mood is a prominent writing field · 4 picker: 🔥 often worn / 🧊 30 days unworn; no "看看衣橱缺口" button
// 5 opening a gap scrolls to that gap's top

/* 1. one label per look */
const _lookSlide30 = lookSlide;
lookSlide = function (look, i) { return _lookSlide30(look, i).replace(/<span>LOOK 0\d<\/span>/, ''); };

/* 2. 「U 说」 */
const talkMarks = '<svg class="us-talk" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 2.5 5 9.5M15.5 7.5l-5.5 4.5"/></svg>';
uSays = function (text) {
  return `<div class="u-says v30"><span class="us-who">${uMark(40)}${talkMarks}</span><p><b>U 说</b>${text}</p></div>`;
};

/* 3. journal page */
const _journalFull30 = journalFull;
journalFull = function (rec) {
  let html = _journalFull30(rec);
  if (!rec) return html;
  html = html.replace(/(<div class="sb-date">[\s\S]*?<span class="hand">)(周.)[^<]*(<\/span>)/, '$1$2$3');
  html = html.replace(/<p class="sb-label hand">今天的心情 ↓<\/p>\s*<div class="sb-feels">[\s\S]*?<\/div>\s*/, '');
  const ph = rec.scene === 'date' ? '约会怎么样？随手写一句…' : '今天穿着感觉怎么样？随手写一句…';
  html = html.replace(/<textarea class="sb-note hand"([^>]*?)placeholder="[^"]*"([^>]*)>([\s\S]*?)<\/textarea>/,
    `<div class="mood-box"><span class="mood-tag hand">✎ 今天的心情</span><textarea class="sb-note mood-note hand"$1placeholder="${ph}"$2>$3</textarea></div>`);
  return html;
};

/* 4a. picker badges: 🔥 often worn (top 3 in 30 days), 🧊 not worn in 30 days */
function wearHeat() {
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 30);
  const count = {};
  (appState.diary || []).filter(r => new Date(r.date) >= cutoff).forEach(r => (r.garmentIds || []).forEach(id => count[id] = (count[id] || 0) + 1));
  const hot = new Set(Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 5).filter(([, n]) => n >= 3).map(([id]) => id));
  return { hot, cold: id => !count[id], count };
}
const _pickCards30 = pickCards;
pickCards = function () {
  const h = wearHeat();
  return _pickCards30().replace(/<button class="pick-card([^"]*)" data-id="([^"]+)"([^>]*)>/g, (m, cls, id, rest) => {
    const tag = h.hot.has(id) ? `<span class="heat hot">🔥 近期常穿</span>` : h.cold(id) ? '<span class="heat cold">🧊 30 天没穿</span>' : '';
    return `<button class="pick-card${cls}" data-id="${id}"${rest}>${tag}`;
  });
};
const _openPicker30 = openStylePicker;
openStylePicker = function () {
  _openPicker30();
  document.querySelector('.pick-filter')?.insertAdjacentHTML('afterend', '<p class="heat-legend"><span>🔥 最近常穿</span><span>🧊 30 天没穿，试试让它出场</span></p>');
};

/* 4b. 懂你: diagnosis sits right below, so no "看看衣橱缺口 →" button */
const _persona30 = personaSummary;
personaSummary = function () { return _persona30().replace(/<button class="ghost-button" onclick="switchTab\('shopping'\)">看看衣橱缺口 →<\/button>/, ''); };

/* 5. opening a gap lands on its top, not wherever the page shifted to */
function openGap(i) {
  appState.gapOpen = i;
  softRender();
  requestAnimationFrame(() => {
    const el = document.getElementById('gap-' + i); if (!el) return;
    const bar = document.querySelector('.app-page > .brand-top');
    const under = bar ? bar.getBoundingClientRect().bottom + 8 : 80;
    window.scrollTo({ top: Math.max(0, window.scrollY + el.getBoundingClientRect().top - under) });
  });
}
const _gapCard30 = gapCard;
gapCard = function (g, i) { return _gapCard30(g, i).replace(/onclick="appState\.gapOpen=(\d+);softRender\(\)"/, 'onclick="openGap($1)"'); };

appRender();
