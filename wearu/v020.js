// WEARU v020 — pick items in a bottom sheet: tap toggles in place, 完成 stays pinned at the top.

let pickDraft = null;
let pickFilter = 'all';
function pickCards() {
  const items = pickFilter === 'all' ? appGarments : appGarments.filter(g => g.category === pickFilter);
  return items.map(g => {
    const on = pickDraft.has(g.id);
    return `<button class="pick-card ${on ? 'selected' : ''}" data-id="${g.id}" onclick="togglePickDraft('${g.id}', this)"><span class="pick-check">${on ? '✓' : ''}</span><img src="${g.image}" alt="${escapeText(g.name)}" loading="lazy"><b>${escapeText(g.name)}</b><small>${escapeText(g.detail)} · 穿过 ${g.worn} 次</small></button>`;
  }).join('');
}
function pickDoneLabel() { return pickDraft.size ? `完成 · 已选 ${pickDraft.size} 件` : '先不指定，直接搭配'; }
openStylePicker = function () {
  pickDraft = new Set(appState.stylePicks);
  pickFilter = 'all';
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop pick-backdrop" id="app-modal" onclick="if(event.target===this)closePicker(false)">
    <section class="pick-sheet" role="dialog" aria-label="从衣橱中挑选">
      <header class="pick-top">
        <div class="modal-handle"></div>
        <div class="pick-bar"><button class="pick-cancel" onclick="closePicker(false)">取消</button><b>从衣橱中挑选</b><button class="pick-done" id="pick-done" onclick="closePicker(true)">${pickDoneLabel()}</button></div>
        <div class="scene-filter pick-filter">
          <button class="on" data-f="all" onclick="setPickFilter('all',this)">全部</button>
          ${appCategories.map(c => `<button data-f="${c.id}" onclick="setPickFilter('${c.id}',this)">${c.name}</button>`).join('')}
        </div>
      </header>
      <div class="pick-grid" id="pick-grid">${pickCards()}</div>
    </section>
  </div>`);
};
function setPickFilter(f, btn) {
  pickFilter = f;
  btn.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === btn));
  const grid = document.getElementById('pick-grid'); grid.innerHTML = pickCards(); grid.scrollTop = 0;
  document.querySelector('.pick-sheet').scrollTop = 0;
}
function togglePickDraft(id, el) {
  pickDraft.has(id) ? pickDraft.delete(id) : pickDraft.add(id);
  const on = pickDraft.has(id);
  el.classList.toggle('selected', on);
  el.querySelector('.pick-check').textContent = on ? '✓' : '';
  const done = document.getElementById('pick-done'); if (done) done.textContent = pickDoneLabel();
}
function closePicker(apply) {
  const sheet = document.querySelector('.pick-sheet');
  if (apply && pickDraft) {
    const next = [...pickDraft];
    const changed = next.length !== appState.stylePicks.length || next.some(id => !appState.stylePicks.includes(id));
    if (changed) { appState.stylePicks = next; appState.styleStep = 'setup'; appState.styleLooks = []; appState.flowWorn = false; }
  }
  pickDraft = null;
  if (sheet) sheet.classList.add('closing');
  setTimeout(() => { closeAppModal(); if (apply) softRender(); }, sheet ? 220 : 0);
}
// chips on the main page: removing a pick also stays in place
togglePick = function (id) {
  appState.stylePicks = appState.stylePicks.filter(x => x !== id);
  appState.styleStep = 'setup'; appState.styleLooks = [];
  softRender();
};

appRender();
