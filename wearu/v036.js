// WEARU v036 — gender switch returns you to exactly where you were · Plus plans show original price and discount

/* 1. gender: the demo data is built per gender when the page loads, so we still reload,
      but remember the tab, scroll and the open profile sheet and put you straight back */
const RESUME36 = 'wearu-v36-resume';
setGender = function (g) {
  if (g === appGender) return;
  document.querySelectorAll('.gender-toggle button').forEach(b => b.setAttribute('aria-pressed', String(b.textContent.trim() === (g === 'female' ? '女' : '男'))));
  const sheet = document.querySelector('.profile-sheet');
  try {
    sessionStorage.setItem(RESUME36, JSON.stringify({ tab: appState.tab, profile: !!sheet, sheetY: sheet ? sheet.scrollTop : 0, y: window.scrollY, g }));
    localStorage.setItem('wearu-v10-gender', g);
  } catch {}
  document.documentElement.classList.add('switching');
  setTimeout(() => location.reload(), 180);
};
(() => {
  let r = null;
  try { r = JSON.parse(sessionStorage.getItem(RESUME36) || 'null'); sessionStorage.removeItem(RESUME36); } catch {}
  if (!r) return;
  document.documentElement.classList.add('resuming');
  appState.tab = r.tab || appState.tab;
  appRender();
  window.scrollTo(0, r.y || 0);
  if (r.profile) {
    openProfileSheet();
    const s = document.querySelector('.profile-sheet');
    if (s) { s.scrollTop = r.sheetY || 0; }
  }
  appToast(r.g === 'female' ? '已切换到女生版' : '已切换到男生版');
  setTimeout(() => document.documentElement.classList.remove('resuming'), 400);
})();

/* 2. Plus: original price + discount, deeper the longer you commit (prices unchanged) */
const plusDeal = {
  month: { orig: '¥25', off: '8 折', save: '省 ¥5.1' },
  quarter: { orig: '¥75', off: '6.7 折', save: '省 ¥25.1' },
  year: { orig: '¥300', off: '5.3 折', save: '省 ¥141' }
};
const _openPlus36 = openPlus;
openPlus = function (reason) {
  _openPlus36(reason);
  document.querySelectorAll('.plus-plans button').forEach(b => {
    const d = plusDeal[b.dataset.plan]; if (!d) return;
    b.querySelector('strong')?.insertAdjacentHTML('beforebegin', `<s class="pp-orig">${d.orig}</s>`);
    b.querySelector('span')?.insertAdjacentHTML('afterend', `<i class="pp-off">${d.off} · ${d.save}</i>`);
  });
  document.querySelector('.plus-plans')?.insertAdjacentHTML('beforebegin', '<p class="pp-note">原价 ¥25 / 月 · 订得越久越划算</p>');
};
