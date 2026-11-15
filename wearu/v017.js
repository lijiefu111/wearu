// WEARU v017 — journal community lives inside 手账: 我的手账 | 手账社区.
// Community posts are journal pages; every item label opens 找同款. My pages can be shared.

const sceneOf = { '约会': 'date', '通勤': 'commute', '聚会': 'party', '日常': 'daily', '街头': 'daily', '度假': 'travel', '机能': 'daily' };
const postDates = ['11.14', '11.13', '11.11', '11.10', '11.08', '11.06'];
appState.liked = appState.liked || {};
try { appState.shared = JSON.parse(localStorage.getItem(K('shared')) || '{}'); } catch { appState.shared = {}; }
function saveShared() { try { localStorage.setItem(K('shared'), JSON.stringify(appState.shared)); } catch {} }

function journalModeSwitch(community) {
  return `<div class="mode-switch journal-mode" role="tablist"><button role="tab" aria-selected="${!community}" onclick="appState.diaryMode='mine';softRender()">我的手账</button><button role="tab" aria-selected="${community}" onclick="appState.diaryMode='community';softRender()">手账社区</button></div>`;
}

/* ---------- my journal: mode switch + share button ---------- */
const _diaryPage17 = diaryPage;
diaryPage = function () {
  if (appState.diaryMode === 'community') return communityJournal();
  let html = _diaryPage17().replace('<h1 class="page-title">穿搭手账</h1>', `<h1 class="page-title">穿搭手账</h1>${journalModeSwitch(false)}`);
  const d = appState.bookDate;
  if (appState.bookOpen && d) {
    const on = !!appState.shared[d];
    html = html.replace('<span class="sb-u hand">', `<button class="share-btn hand ${on ? 'on' : ''}" onclick="toggleShare('${d}')">${on ? '已分享到社区 ✓' : '分享到手账社区'}</button><span class="sb-u hand">`);
  }
  return html;
};
function toggleShare(date) {
  appState.shared[date] = !appState.shared[date]; saveShared();
  appToast(appState.shared[date] ? '这一页已分享到手账社区' : '已取消分享');
  softRender();
}

/* ---------- community feed ---------- */
function communityPosts() {
  const mine = Object.keys(appState.shared).filter(k => appState.shared[k]).map(date => appState.diary.find(r => r.date === date)).filter(Boolean).map(r => ({
    mine: true, user: '我', date: fmtDate(r.date).md, scene: r.sceneLabel || sceneName(r.scene), caption: r.note || r.title,
    hero: r.photo || null, images: r.images, likes: 0,
    items: (r.garmentIds || []).map(id => appGarments.find(g => g.id === id)).filter(Boolean).map(g => ({ name: g.name, q: g.name, img: g.image }))
  }));
  const others = communityFeed.map((p, i) => ({ ...p, date: postDates[i % postDates.length] }));
  return [...mine, ...others];
}
function miniPage(p, i) {
  const liked = appState.liked[i];
  return `<button class="cj-card" onclick="openJournalPost(${i})" style="--r:${tilt(p.user + i, 2)}deg">
    <span class="cj-top hand"><b>${p.date}</b><em>${escapeText(p.scene)}</em></span>
    <span class="cj-photo">${p.hero ? `<img src="${p.hero}" alt="" loading="lazy">` : miniGrid(p.images)}<i class="tape"></i></span>
    <span class="cj-cap hand">${escapeText((p.caption || '').slice(0, 26))}${(p.caption || '').length > 26 ? '…' : ''}</span>
    <span class="cj-meta"><i>${escapeText(p.user.slice(0, 1).toUpperCase())}</i>${escapeText(p.user)}${p.mine ? '<small>我分享的</small>' : ''}<em>${liked ? '♥' : '♡'} ${p.likes + (liked ? 1 : 0)}</em></span>
  </button>`;
}
function miniGrid(images = []) {
  return `<span class="cj-grid">${images.filter(Boolean).slice(0, 4).map(src => `<img src="${src}" alt="">`).join('')}</span>`;
}
function communityJournal() {
  const posts = communityPosts();
  return `<main class="app-page diary-page journal-community">
    ${pageTop('穿搭手账')}
    ${journalModeSwitch(true)}
    <p class="cj-intro hand">翻翻大家的手账 · 看上哪件，点它就能找同款</p>
    <div class="cj-masonry">${posts.map(miniPage).join('')}</div>
  </main>`;
}
function openJournalPost(i) {
  const p = communityPosts()[i]; if (!p) return;
  const liked = appState.liked[i];
  const tags = (p.items || []).map((it, k) => `<button class="cj-tag hand" style="--r:${tilt(it.name + k, 4)}deg" onclick="openSimilarSheet('${escapeText(it.name)}','${escapeText(it.q)}','${it.img || p.hero || ''}')">${it.img ? `<img src="${it.img}" alt="">` : ''}<span>${escapeText(it.name)}</span><b>找同款 ↗</b></button>`).join('');
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()">
    <section class="cj-sheet">
      <div class="modal-handle"></div>
      <article class="cj-page">
        <header class="jf-head"><div class="sb-date"><b>${p.date}</b><span class="hand">${escapeText(p.user)} 的手账</span></div><span class="jf-stamp" style="--r:6deg">${escapeText(p.scene)}</span></header>
        <div class="cj-photo big" style="--r:-2deg">${p.hero ? `<img src="${p.hero}" alt="">` : miniGrid(p.images)}<i class="tape"></i></div>
        <p class="cj-says hand">${escapeText(p.caption || '')}</p>
        <p class="sb-label hand">这一身穿了 ↓ 点哪件找哪件</p>
        <div class="cj-tags">${tags || '<span class="hand">（没有标注单品）</span>'}</div>
      </article>
      <div class="cj-actions">
        <button class="ghost-button" onclick="appState.liked[${i}]=!appState.liked[${i}];closeAppModal();openJournalPost(${i});softRender()">${liked ? '♥ 已喜欢' : '♡ 喜欢'}</button>
        <button class="coral-button" onclick="copyLook('${escapeText(p.scene)}')">用我的衣服搭一套类似的</button>
      </div>
    </section>
  </div>`);
}
function copyLook(scene) {
  closeAppModal();
  appState.styleScene = sceneOf[scene] || 'daily'; appState.styleCustomScene = ''; appState.flowScene = true;
  appState.stylePicks = []; appState.styleStep = 'setup'; appState.styleLooks = [];
  switchTab('styling');
  appToast(`按「${scene}」从你的衣橱里找类似的`);
}

/* ---------- 穿搭: back to a single flow (community moved to 手账) ---------- */
const _stylingPage17 = stylingPage;
stylingPage = function () {
  appState.styleMode = 'today';
  return _stylingPage17().replace(/<div class="mode-switch" role="tablist">[\s\S]*?<\/div>/, '');
};
const _switchTab17 = switchTab;
switchTab = function (tab) { if (tab !== 'diary') appState.diaryMode = appState.diaryMode || 'mine'; _switchTab17(tab); };

appRender();
