// WEARU v037 — 性别 behaves like any other field: tapping it only flips the switch (and the gender-specific chips).
// The demo data is swapped once, quietly, when the profile sheet is closed — you stay on the same tab and scroll position.

const constraintSets = { male: ['不穿短裤', '避免紧身', '避免太正式', '不戴帽子'], female: ['不露腿', '不穿高跟', '避免紧身', '避免太正式'] };
let pendingGender = null;

setGender = function (g) {
  const cur = pendingGender || appGender;
  if (g === cur) return;
  pendingGender = g === appGender ? null : g;
  document.querySelectorAll('.gender-toggle button').forEach(b => b.setAttribute('aria-pressed', String(b.textContent.trim() === (g === 'female' ? '女' : '男'))));
  const box = [...document.querySelectorAll('.profile-sheet .chip-group')].find(c => c.querySelector('span')?.textContent === '穿着限制')?.querySelector('div');
  if (box) box.innerHTML = constraintSets[g].map(x => `<button class="chip" onclick="toggleProfileChip('constraints','${x}',this)">${x}</button>`).join('');
};

// apply the pending switch when the profile sheet goes away (保存档案 or tapping outside)
const _close37 = closeAppModal;
closeAppModal = function () {
  const all = document.querySelectorAll('.modal-backdrop');
  const top = all[all.length - 1];
  const isProfile = !!top?.querySelector('.profile-sheet');
  _close37();
  if (isProfile && pendingGender && pendingGender !== appGender) {
    const g = pendingGender; pendingGender = null;
    try {
      sessionStorage.setItem(RESUME36, JSON.stringify({ tab: appState.tab, profile: false, y: window.scrollY, g }));
      localStorage.setItem('wearu-v10-gender', g);
    } catch {}
    setTimeout(() => { document.documentElement.classList.add('switching'); setTimeout(() => location.reload(), 150); }, 200);
  }
};
