// WEARU v016 — loaded after v015.js.
// 1 journal opens/closes without layout shift · 2 tabs: 衣橱 / 穿搭（含看看大家）/ 手账 / 懂你
// 3 diagnosis → what to add → budget → go, one gap at a time

/* ---------- 2. navigation ---------- */
appIcons.insight = '<svg viewBox="0 0 24 24"><path d="M7 4v9a5 5 0 0 0 10 0V4"/><path d="M17 4v2.5"/></svg>';
appNav = function () {
  const items = [['wardrobe', '衣橱', appIcons.wardrobe], ['styling', '穿搭', appIcons.styling], ['diary', '手账', appIcons.diary], ['shopping', '懂你', appIcons.insight]];
  return `<nav class="app-nav">${items.map(([id, label, icon]) => `<button class="${appState.tab === id ? 'active' : ''}" onclick="switchTab('${id}')">${icon}<span>${label}</span></button>`).join('')}</nav>`;
};

/* 穿搭 page: today's outfit | look at others */
const _stylingPage16 = stylingPage;
stylingPage = function () {
  if (appState.styleSubview === 'pick') return _stylingPage16();
  const inspo = appState.styleMode === 'inspo';
  const html = inspo
    ? `<main class="app-page styling-page">${pageTop('穿搭')}${modeSwitch(true)}<p class="swipe-hint">看看大家怎么穿 · 点开可试穿、找同款</p><div class="masonry">${communityFeed.map(feedCard).join('')}</div></main>`
    : _stylingPage16();
  return inspo ? html : html.replace(' disabled>生成 3 套搭配', '>生成 3 套搭配').replace('<h1 class="page-title">今天的穿搭</h1>', `<h1 class="page-title">今天的穿搭</h1>${modeSwitch(false)}`);
};
function modeSwitch(inspo) {
  return `<div class="mode-switch" role="tablist"><button role="tab" aria-selected="${!inspo}" onclick="appState.styleMode='today';softRender()">今天穿什么</button><button role="tab" aria-selected="${inspo}" onclick="appState.styleMode='inspo';softRender()">看看大家</button></div>`;
}

/* 手账 tab keeps only the journal; persona moves to 懂你 */
const _diaryPage16 = diaryPage;
diaryPage = function () {
  const html = _diaryPage16();
  const persona = personaSummary();
  return persona ? html.replace(persona, '<button class="to-insight hand" onclick="switchTab(\'shopping\')">看看 U 从手账里读到了什么 →</button>') : html;
};

/* ---------- 3. 懂你: persona → diagnosis, one gap at a time ---------- */
const gapDefs = appGender === 'male' ? [
  { rec: '黑色机能斜挎包', title: '包都偏大，约会没有合适的小包', evidence: ['wd-43', 'wd-44'], note: '双肩包和托特装得多，但约会、看展背着都显得在赶课。', tiers: ['帆布尼龙', '机能面料', '皮质设计款'] },
  { rec: '复古厚底板鞋', title: '5 双鞋都是深色或运动款，没有浅色干净的', evidence: ['wd-29', 'wd-36', 'wd-40', 'wd-42', 'wd-41'], note: '粉衬衫、条纹 T 配深色鞋都偏重，一双米白板鞋能把它们提亮。', tiers: ['基础帆布', '厚底帆布', '皮质板鞋'] },
  { rec: '黑色重磅基础 Tee', title: '10 件上衣几乎全是印花，缺纯色打底', evidence: ['wd-04', 'wd-10', 'wd-16', 'wd-26', 'wd-28'], note: '叠外套时印花和印花打架，一件纯黑就能稳住。', tiers: ['普通纯棉', '重磅纯棉', '精梳长绒棉'] },
  { rec: '水洗丹宁外套', title: '外套都偏卫衣和工装，缺一件中性外层', evidence: ['wd-27', 'wd-02', 'wd-11'], note: '降温后想穿得干净一点时，没有能压住印花的外套。', tiers: ['基础丹宁', '水洗做旧', '日系原色'] }
] : [
  { rec: '黑色玛丽珍鞋', title: '4 双鞋全是平底，裙子没鞋配', evidence: ['F19', 'F30', 'F10', 'F21'], note: '缎面裙、百褶裙配平底鞋都差一点精神，一双有一点跟的鞋就够。', tiers: ['PU 入门款', '真皮', '设计师款'] },
  { rec: '深棕色针织背心', title: '针织和衬衫之间缺一层能叠穿的', evidence: ['F28', 'F18', 'F13'], note: '白衬衫、条纹长袖单穿太素，叠一件背心就有层次。', tiers: ['混纺', '羊毛', '羊绒'] }
];
const tierLabels = ['入门', '推荐', '进阶'];
function tiersFor(r) {
  const p = r.price;
  const a = Math.round(p * 0.6 / 10) * 10, b = Math.round(p * 1.25 / 10) * 10;
  return [`¥${a} 以内`, `¥${a}–${b}`, `¥${b} 以上`];
}
appState.gapTier = appState.gapTier || {};
appState.gapOpen = appState.gapOpen ?? 0;
function gapCard(g, i) {
  const r = shopRecs.find(x => x.name === g.rec); if (!r) return '';
  const open = appState.gapOpen === i;
  const tier = appState.gapTier[i];
  const tiers = tiersFor(r);
  const ev = g.evidence.map(id => appGarments.find(x => x.id === id)).filter(Boolean);
  return `<article class="gp-card ${open ? 'open' : ''}" id="gap-${i}">
    <button class="gp-head" onclick="appState.gapOpen=${open ? -1 : i};softRender()">
      <span class="gp-no">${i + 1}</span>
      <span class="gp-q"><b>${g.title}</b><small>${open ? '收起' : '→ 补一件「' + r.name + '」'}</small></span>
    </button>
    ${open ? `<div class="flow gp-flow">
      ${railStep('done', '诊断', `<div class="gp-ev">${ev.map(x => `<img src="${x.image}" alt="${escapeText(x.name)}" title="${escapeText(x.name)}">`).join('')}</div><p class="gp-note">${g.note}</p>`)}
      ${railStep('done', '该补什么', `<div class="rec-pair"><figure class="rec-product"><img src="${r.img}" alt="${r.name}"><figcaption>${r.name}</figcaption></figure><figure class="rec-body"><img src="${r.onBody}" alt=""><figcaption>买了还能这么穿</figcaption></figure></div><p class="gp-note"><b>${r.unlock || ''}</b> · ${r.note}</p>`)}
      ${railStep(tier == null ? 'current' : 'done', '这件你想花多少？', `<div class="tier-row">${tiers.map((t, k) => `<button class="${tier === k ? 'on' : ''}" onclick="appState.gapTier[${i}]=${k};softRender()"><small>${tierLabels[k]}${k === 1 ? ' · 多数人选' : ''}</small><b>${t}</b><em>${g.tiers[k]}</em></button>`).join('')}</div>`)}
      ${railStep(tier == null ? 'todo' : 'current', '去看看', `<div class="rec-actions"><button class="rec-tryon" onclick="openTryOnViewer('${r.onBody}','${r.name}','试穿这件',false,'${r.img}')">${appIcons.hanger}实时试穿</button><button class="rec-find" onclick="findSameTier('${r.query}',${i})">${appIcons.search}${tier == null ? '先选预算' : '找同款 · ' + tiers[tier]} ↗</button></div><p class="ad-note">推荐只由衣橱缺口触发 · 不抽佣</p>`)}
    </div>` : ''}
  </article>`;
}
function findSameTier(query, i) {
  const r = shopRecs.find(x => x.name === gapDefs[i].rec); const t = appState.gapTier[i];
  if (t == null) { appToast('先选一个预算，U 按价位帮你找'); return; }
  const words = ['平价', '', '高端'][t] || '';
  window.open('https://s.taobao.com/search?q=' + encodeURIComponent(`${query} ${gapDefs[i].tiers[t]} ${words}`.trim()), '_blank');
  appToast(`已打开淘宝搜索 · 预算 ${tiersFor(r)[t]}`);
}
shoppingPage = function () {
  const persona = personaSummary().replace("switchTab('shopping')", "document.getElementById('gaps')?.scrollIntoView({behavior:'smooth'})");
  const score = wardrobeScore();
  return `<main class="app-page insight-page">
    ${pageTop('懂你')}
    ${persona}
    <section class="diag-head" id="gaps">
      <div class="diag-score"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27"/><circle class="arc" cx="32" cy="32" r="27" style="--p:${score}"/></svg><b>${score}%</b></div>
      <div><h2 class="hand">衣橱诊断</h2><p>你的 ${appGarments.length} 件衣服里，能互相搭配的组合占 ${score}%。下面 ${gapDefs.length} 个缺口补上后，预计升到 85%。一次看一个。</p></div>
    </section>
    <div class="gap-list v16">${gapDefs.map(gapCard).join('')}</div>
    ${dupWarning()}
  </main>`;
};
function dupWarning() {
  return appGender === 'male'
    ? `<section class="dup-warning"><p class="micro">先别买 · 避免重复</p><div><b>你收藏的「复古印花短袖 T」</b><small>衣橱里已有 6 件印花 T 和背心，其中「黄条纹卡通 T」近 30 天没穿过。先把已有的穿起来。</small></div></section>`
    : `<section class="dup-warning"><p class="micro">先别买 · 避免重复</p><div><b>你收藏的「白色宽松衬衫」</b><small>和衣橱里的「白色府绸衬衫」几乎一样，它已经穿过 ${(appGarments.find(g => g.id === 'F18') || {}).worn || 0} 次。先别买，把钱留给玛丽珍鞋。</small></div></section>`;
}

/* ---------- 1. journal: stable layout between closed and open ---------- */
const _diaryPage16b = diaryPage;
diaryPage = function () {
  let html = _diaryPage16b();
  if (!appState.bookOpen) {
    // reserve the date row and nav row so opening doesn't push the book down
    const pages = spreadPages();
    html = html.replace('<div class="jf-book is-closed"', `<div class="date-jump ghost" aria-hidden="true"><div class="date-chips hand">${pages.slice(-5).map(p => `<button>${fmtDate(p.date).md}</button>`).join('')}</div><label class="date-pick"><svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14"/></svg></label></div><div class="jf-book is-closed"`)
      .replace('<p class="jf-tip hand">每次「穿这套」，都会写进这本手账</p>', '<div class="book-nav hand ghost-nav"><span class="jf-tip">每次「穿这套」，都会写进这本手账</span></div>');
  }
  return html;
};

/* generate is always clickable; without a scene it points back to step ① */
const _gen16 = generateLooks;
generateLooks = function () {
  if (!appState.flowScene) {
    appToast('先选个场合，U 才知道怎么搭');
    const st = document.getElementById('step-scene');
    if (st) { st.classList.remove('nudge'); void st.offsetWidth; st.classList.add('nudge'); st.scrollIntoView({ block: 'center' }); }
    return;
  }
  _gen16();
};
const _updateRail16 = updateRail;
updateRail = function () { _updateRail16(); const go = document.querySelector('#step-go .generate-button'); if (go) go.disabled = false; };

/* ---------- boot ---------- */
appRender();
