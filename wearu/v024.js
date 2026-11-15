// WEARU v024 — a gap's suggestion goes back to the real day it showed up:
// 懂你: 「该补什么」 shows that day's look next to "if you'd had it". 穿搭: picking the same kind of scene shows the same "if you had it" card under the looks.

// one real journal day per gap (offset in days from today, matching the seeded journal), what was missing then, and which 穿搭 scenes it belongs to
const gapMoments = appGender === 'male' ? {
  '黑色机能斜挎包': { off: 1, scenes: ['date', 'party'], then: '那天背的是翻盖双肩包，去看展一路像在赶课。', swap: 'wd-43', ifText: '同一套工装，换成小斜挎' },
  '复古厚底板鞋': { off: 26, scenes: ['daily', 'travel'], then: '印花 T 配灰色跑鞋，整个人往下坠。', swap: 'wd-40', ifText: '同样的印花 T + 橄榄阔腿，换一双浅色板鞋' },
  '黑色重磅基础 Tee': { off: 12, scenes: ['commute'], then: '照片印花夹克里又配了印花 T，两层图案打架。', swap: 'wd-10', ifText: '还是这件印花夹克，里面换成纯黑 Tee' },
  '水洗丹宁外套': { off: 22, scenes: ['daily', 'party'], then: '降温只能套拉链卫衣，条纹 T 被压得有点乱。', swap: 'wd-02', ifText: '条纹 T + 做旧牛仔不变，外层换丹宁' }
} : {
  '黑色玛丽珍鞋': { off: 11, scenes: ['date', 'party'], then: '本想穿缎面裙去生日饭，可鞋全是平底，最后换回了牛仔裤。', swap: 'F23', ifText: '皮夹克不变，裙子 + 玛丽珍终于能穿出去' },
  '深棕色针织背心': { off: 1, scenes: ['commute', 'daily'], then: '又是黑针织 + 牛仔，这个月第 5 次。', swap: 'F28', ifText: '同一条牛仔，换成白衬衫 + 背心叠穿' }
};
function momentFor(recName) {
  const m = gapMoments[recName]; if (!m) return null;
  const rec = (appState.diary || []).find(r => r.date === dateStr(m.off));
  if (!rec) return null;
  const ids = rec.garmentIds || [];
  const pieces = ids.map(id => appGarments.find(g => g.id === id)).filter(Boolean);
  return { ...m, rec, pieces, sceneName: rec.sceneLabel || sceneName(rec.scene), md: fmtDate(rec.date).md };
}
function thenCanvas(mo) {
  const by = c => mo.pieces.find(g => g.category === c)?.image || '';
  return outfitCanvas([by('outer'), by('tops'), by('bottoms'), by('shoes'), by('bags') || by('accessories')], mo.pieces.map(g => g.name));
}
function whatIfPair(r, mo) {
  const swapped = appGarments.find(g => g.id === mo.swap);
  return `<div class="wi-pair">
    <figure class="wi-then"><div class="wi-img">${thenCanvas(mo)}</div><figcaption><b>那天你穿的</b>${swapped ? `<small>当时：${escapeText(swapped.name)}</small>` : ''}</figcaption></figure>
    <span class="wi-arrow" aria-hidden="true">→</span>
    <figure class="wi-if"><div class="wi-img"><img src="${r.onBody}" alt="${escapeText(r.name)} 上身效果"><span class="wi-demo">效果演示</span></div><figcaption><b>如果有「${escapeText(r.name)}」</b><small>${escapeText(mo.ifText)}</small></figcaption></figure>
  </div>`;
}

/* ---------- 懂你: 「该补什么」 replays that day ---------- */
const _gapCard24 = gapCard;
gapCard = function (g, i) {
  let html = _gapCard24(g, i);
  const r = shopRecs.find(x => x.name === g.rec); const mo = r && momentFor(r.name);
  if (!mo || appState.gapOpen !== i) return html;
  const block = `<div class="wi-moment"><span class="wi-chip">回到 ${mo.md} · ${escapeText(mo.sceneName)}</span><p class="gp-note">${escapeText(mo.then)}</p></div>
    ${whatIfPair(r, mo)}
    <div class="wi-product"><img src="${r.img}" alt=""><span><b>${escapeText(r.name)}</b><small>${escapeText(r.unlock || '')} · ${escapeText(r.note)}</small></span></div>`;
  return html.replace(/<div class="rec-pair">[\s\S]*?<\/div><p class="gp-note">[\s\S]*?<\/p>/, block);
};

/* ---------- 穿搭: the same suggestion shows up under the looks for that kind of scene ---------- */
function whatIfForScene(sceneId) {
  for (let i = 0; i < gapDefs.length; i++) {
    const r = shopRecs.find(x => x.name === gapDefs[i].rec); const mo = r && momentFor(r.name);
    if (mo && mo.scenes.includes(sceneId)) return { r, mo, i };
  }
  return null;
}
function openGapFromStyling(i) { appState.gapOpen = i; switchTab('shopping'); setTimeout(() => document.getElementById('gap-' + i)?.scrollIntoView({ block: 'start' }), 80); }
const _stylingPage24 = stylingPage;
stylingPage = function () {
  const html = _stylingPage24();
  const hasResult = appState.styleStep === 'result' && appState.styleLooks.length && !appState.genLoading;
  if (!hasResult || appState.styleCustomScene) return html;
  const w = whatIfForScene(appState.styleScene); if (!w) return html;
  const card = `<section class="wi-styling">
    <p class="wi-head"><b>${escapeText(sceneName(appState.styleScene))}这类场合，你的衣橱能搭的有限</b><small>上次 ${w.mo.md} · ${escapeText(w.mo.then)}</small></p>
    ${whatIfPair(w.r, w.mo)}
    <div class="wi-foot"><span class="wi-tag">建议 · 由衣橱缺口推导，不抽佣</span><button onclick="openGapFromStyling(${w.i})">看看这件 →</button></div>
  </section>`;
  return html.replace(/(<div class="look-dots">[\s\S]*?<\/div>)/, `$1${card}`);
};

appRender();
