// WEARU v035 — gender moves into the profile form · WEARU Plus (free 7-day trial → subscription)
// Entry points: ① membership card at the top of 个人档案 ② at the feature itself (每日搭配 / 实时试穿 / 进阶衣橱分析 / 衣橱容量)

/* ---------- plan state (demo) ---------- */
const PLAN_KEY = 'wearu-v35-plan';
function plan() { try { return localStorage.getItem(PLAN_KEY) || 'trial'; } catch { return 'trial'; } }
function setPlan(p) { try { localStorage.setItem(PLAN_KEY, p); } catch {} }
const trialLeft = 6;
const isPlus = () => plan() !== 'free';
const plusPlans = [
  { id: 'month', name: '月付', price: '¥19.90', unit: '/月', per: '¥19.90 / 月' },
  { id: 'quarter', name: '季付', price: '¥49.90', unit: '/季', per: '约 ¥16.63 / 月' },
  { id: 'year', name: '年付', price: '¥159', unit: '/年', per: '¥13.25 / 月', tag: '最划算' }
];
appState.plusPick = appState.plusPick || 'year';
const plusRows = [
  ['数字衣橱', '最多 30 件', '最多 150 件'],
  ['穿搭日记', '每天 1 条', '每天 3 条'],
  ['手账社区', '分享 · 浏览 · 找同款', '同基础版'],
  ['每日搭配建议', '—', '每天 3 套'],
  ['AI 实时视频试穿', '—', '每天 1 次 · 30 秒'],
  ['进阶衣橱分析', '—', '穿着频率 · 闲置单品 · 新搭配']
];
const plusWhy = { daily: '每天用你已有的衣服搭 3 套', live: 'AI 实时视频试穿', insight: '进阶衣橱分析', closet: '衣橱扩容到 150 件' };

function openPlus(reason = '') {
  const p = plan();
  const pick = plusPlans.find(x => x.id === appState.plusPick) || plusPlans[2];
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()"><section class="plus-sheet">
    <div class="modal-handle"></div>
    <header class="plus-hero">${uMark(76)}<div><p class="plus-kicker">WEARU Plus</p><h2>${reason && plusWhy[reason] ? `解锁${plusWhy[reason]}` : '让 U 每天帮你搭'}</h2>
      <p class="plus-state">${p === 'trial' ? `试用中 · 还剩 ${trialLeft} 天` : p === 'plus' ? '已开通' : '新用户注册可免费试用 7 天'}</p></div></header>
    <div class="plus-table" role="table">
      <div class="pt-head" role="row"><span></span><span>基础版</span><span>Plus</span></div>
      ${plusRows.map(([k, a, b]) => `<div class="pt-row" role="row"><span>${k}</span><span>${a}</span><span>${b}</span></div>`).join('')}
    </div>
    ${p === 'plus' ? '' : `<div class="plus-plans">${plusPlans.map(x => `<button class="${x.id === pick.id ? 'on' : ''}" data-plan="${x.id}" onclick="pickPlusPlan('${x.id}')">${x.tag ? `<em>${x.tag}</em>` : ''}<b>${x.name}</b><strong>${x.price}<small>${x.unit}</small></strong><span>${x.per}</span></button>`).join('')}</div>
    <button class="coral-button plus-cta" onclick="subscribePlus()">${plusCta(pick)}</button>`}
    <button class="plus-demo" onclick="setPlan('${p === 'free' ? 'trial' : 'free'}');closeAppModal();softRender();appToast('${p === 'free' ? '已恢复为试用中（演示）' : '已切到免费基础版（演示）'}')">演示：${p === 'free' ? '恢复试用' : '切到免费基础版'}</button>
  </section></div>`);
}
function plusCta(pick) { return plan() === 'trial' ? `试用结束后续费 · ${pick.price}${pick.unit}` : `开通 Plus · ${pick.price}${pick.unit}`; }
function pickPlusPlan(id) {
  appState.plusPick = id;
  document.querySelectorAll('.plus-plans button').forEach(b => b.classList.toggle('on', b.dataset.plan === id));
  const cta = document.querySelector('.plus-cta'); if (cta) cta.textContent = plusCta(plusPlans.find(x => x.id === id));
}
function subscribePlus() {
  const pick = plusPlans.find(x => x.id === appState.plusPick);
  setPlan('plus'); closeAppModal(); softRender();
  appToast(`已开通 WEARU Plus · ${pick.name}（演示，未扣费）`);
}

/* ---------- profile: membership card on top, gender inside the form ---------- */
const _openProfile35 = openProfileSheet;
openProfileSheet = function () {
  _openProfile35();
  const sheet = document.querySelector('.profile-sheet'); if (!sheet) return;
  sheet.querySelector('.gender-row')?.remove();
  const p = plan();
  sheet.querySelector('h2')?.insertAdjacentHTML('afterend', `<button class="plus-card ${p}" onclick="closeAppModal();setTimeout(()=>openPlus(),220)">
    <span><b>${p === 'free' ? '免费基础版' : 'WEARU Plus'}</b><small>${p === 'trial' ? `试用中 · 还剩 ${trialLeft} 天` : p === 'plus' ? '已开通 · 每日搭配、实时试穿、进阶分析' : '升级 Plus：每日搭配 · 实时试穿 · 进阶分析'}</small></span><i>${p === 'plus' ? '查看' : p === 'trial' ? '续费方案' : '升级'} →</i></button>`);
  const firstField = sheet.querySelector('label');
  firstField?.insertAdjacentHTML('beforebegin', `<div class="pf-row"><span>性别</span>${genderToggle()}</div>`);
};

/* ---------- gates at the feature ---------- */
// 每日搭配建议
const _stylingPage35 = stylingPage;
stylingPage = function () {
  let html = _stylingPage35();
  if (!isPlus()) {
    html = html.replace(/<button class="coral-button generate-button"[^>]*>生成 3 套搭配<\/button>/,
      `<div class="plus-lock"><b>每日搭配建议是 Plus 功能</b><button class="coral-button" onclick="openPlus('daily')">解锁 Plus · 每天 3 套</button></div>`);
  } else if (plan() === 'trial') {
    html = html.replace(/(<button class="coral-button generate-button"[^>]*>生成 3 套搭配<\/button>)/, `$1<span class="plus-chip">Plus 试用 · 剩 ${trialLeft} 天</span>`);
  }
  return html;
};
const _generate35 = generateLooks;
generateLooks = function () { if (!isPlus()) return openPlus('daily'); _generate35(); };
// AI 实时视频试穿
const _lookSlide35 = lookSlide;
lookSlide = function (look, i) { return _lookSlide35(look, i).replace(/(<button class="live-btn[^"]*"[^>]*>[\s\S]*?<span>[^<]*<\/span>)/, '$1<em class="plus-tag">Plus</em>'); };
const _live35 = toggleSlideLive;
toggleSlideLive = function (i) { if (!isPlus()) return openPlus('live'); return _live35(i); };
// 进阶衣橱分析
const _persona35 = personaSummary;
personaSummary = function () {
  const html = _persona35();
  if (isPlus() || !html) return html;
  return `<div class="plus-blur">${html}<div class="plus-over"><b>进阶衣橱分析是 Plus 功能</b><small>穿着频率 · 闲置单品 · 新搭配</small><button class="coral-button" onclick="openPlus('insight')">解锁 Plus</button></div></div>`;
};
// 衣橱容量
const _appRender35 = appRender;
appRender = function () {
  _appRender35();
  const cap = isPlus() ? 150 : 30;
  document.querySelectorAll('.wardrobe-page .section-head span, .section-head span').forEach(s => {
    const m = s.textContent.match(/^(\d+) 件$/); if (!m) return;
    const n = +m[1];
    s.innerHTML = `${n} / ${cap} 件${n > cap ? ` <button class="cap-up" onclick="openPlus('closet')">扩容</button>` : ''}`;
  });
};

appRender();
