// WEARU v014 — loaded after v011.js.
// 1 diary as an open two-page scrapbook with a real page-turn · 2 "U 眼中的你" as a section title
// 3 centred phone frame on desktop · 4 progress rail on the styling flow

/* ---------- helpers ---------- */
const hash = s => [...String(s)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const tilt = (seed, max = 6) => ((hash(seed) % (max * 20)) / 10 - max).toFixed(1);
const doodleStar = '<svg class="doodle" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4l4 11 12 1-9 8 3 12-10-7-10 7 3-12-9-8 12-1z"/></svg>';
const doodleCrown = '<svg class="doodle crown" viewBox="0 0 48 30" aria-hidden="true"><path d="M4 26h40M6 24 4 6l11 10 9-13 9 13 11-10-2 18z"/></svg>';
const doodleArrow = '<svg class="doodle arrow" viewBox="0 0 60 30" aria-hidden="true"><path d="M4 22c14-14 30-16 46-8m0 0-8-6m8 6-9 4"/></svg>';

/* ---------- 1. Diary: two-page scrapbook ---------- */
function spreadPages(book = currentBook()) {
  return bookPages(book).slice().reverse(); // oldest → newest, so "next page" goes forward in time
}
function spreadIndex() {
  const pages = spreadPages();
  const i = pages.findIndex(p => p.date === appState.bookDate);
  return i < 0 ? pages.length - 1 : i;
}
function pageLeft(rec) {
  if (!rec) return `<div class="sb-page sb-left sb-blank"><p class="hand">这一页还空着</p>${doodleArrow}</div>`;
  const f = fmtDate(rec.date);
  const pieces = (rec.images || []).filter(Boolean).slice(0, 5);
  const spots = [[6, 6, 58], [46, 4, 50], [8, 42, 56], [52, 48, 44], [30, 70, 38]];
  return `<div class="sb-page sb-left">
    <div class="sb-date"><b style="--r:${tilt(rec.date, 4)}deg">${f.md}</b><span class="hand">${f.week} · ${f.month}</span></div>
    <span class="sb-stamp" style="--r:${tilt(rec.date + 's', 7)}deg">${escapeText(rec.sceneLabel || sceneName(rec.scene))}${rec.temp ? ` ${rec.temp}°` : ''}</span>
    <div class="sb-collage">
      ${pieces.map((src, i) => `<img class="sb-piece" src="${src}" alt="" style="left:${spots[i][0]}%;top:${spots[i][1]}%;width:${spots[i][2]}%;--r:${tilt(rec.date + i, 9)}deg">`).join('')}
      <i class="tape t1"></i><i class="tape t2"></i>
    </div>
    <h3 class="sb-title hand"><mark>${escapeText(rec.title)}</mark></h3>
    <p class="sb-items hand">${(rec.items || []).slice(0, 4).map(escapeText).join(' / ')}</p>
    ${doodleStar}
  </div>`;
}
function pageRight(rec) {
  if (!rec) return `<div class="sb-page sb-right sb-blank"><p class="hand">搭配后点「穿这套」<br>就会写到这里</p>${doodleCrown}</div>`;
  const feels = feelOptions.map(x => `<button class="sb-feel hand ${(rec.feels || []).includes(x) ? 'on' : ''}" onclick="toggleDiaryFeel('${rec.date}','${x}')">${x}</button>`).join('');
  const custom = appState.books.filter(b => !b.rule);
  return `<div class="sb-page sb-right">
    <div class="sb-polaroid" style="--r:${tilt(rec.date + 'p', 5)}deg">
      ${rec.photo ? `<img src="${rec.photo}" alt="当天实穿照">` : `<button class="sb-photo-add hand" onclick="document.getElementById('diary-cam-${rec.date}').click()">${appIcons.camera}贴一张今天的照片</button>`}
      <i class="tape"></i>
    </div>
    <input id="diary-cam-${rec.date}" type="file" accept="image/*" capture="environment" hidden onchange="addDiaryPhoto(event,'${rec.date}')">
    <p class="sb-label hand">今天的心情 ↓</p>
    <div class="sb-feels">${feels}</div>
    <textarea class="sb-note hand" id="feel-note-${rec.date}" rows="3" placeholder="${rec.scene === 'date' ? '约会怎么样？写一句…' : '今天穿着感觉怎么样？'}" onblur="saveDiaryNote('${rec.date}')">${escapeText(rec.note || '')}</textarea>
    <div class="sb-foot">${custom.length ? `<select onchange="addToBook(this.value,'${rec.date}');this.value=''"><option value="">收进…</option>${custom.map(b => `<option value="${b.id}">${escapeText(b.name)}</option>`).join('')}</select>` : '<span></span>'}<span class="sb-u hand">${uMark(24)}U 记下了</span></div>
  </div>`;
}
diaryPage = function () {
  const pages = spreadPages();
  if (!appState.bookDate || !pages.some(p => p.date === appState.bookDate)) appState.bookDate = pages[pages.length - 1]?.date || null;
  const i = spreadIndex();
  const rec = pages[i];
  const book = currentBook();
  return `<main class="app-page diary-page scrapbook">
    ${pageTop('穿搭手账')}
    <div class="book-shelf" role="tablist" aria-label="我的手账">
      ${appState.books.map(b => `<button role="tab" aria-selected="${b.id === book.id}" style="--book:${b.color}" onclick="openBook('${b.id}')"><i></i>${escapeText(b.name)}<small>${bookPages(b).length}</small></button>`).join('')}
      <button class="book-new" onclick="newBook()">＋ 新手账</button>
    </div>
    <div class="date-jump">
      <div class="date-chips hand" id="date-chips">${pages.map(p => `<button class="${p.date === appState.bookDate ? 'on' : ''}" onclick="turnTo('${p.date}')">${fmtDate(p.date).md}</button>`).join('')}</div>
      <label class="date-pick" aria-label="按日期跳转"><svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14"/></svg><input type="date" onchange="jumpNear(this.value)"></label>
    </div>
    <div class="sb-book" id="sb-book" style="--book:${book.color}">
      <div class="sb-half sb-half-left" id="sb-left">${pageLeft(rec)}</div>
      <div class="sb-half sb-half-right" id="sb-right">${pageRight(rec)}</div>
      <i class="sb-spine"></i>
    </div>
    <div class="book-nav hand">
      <button onclick="turnBy(-1)" ${i <= 0 ? 'disabled' : ''}>‹ 往前翻</button>
      <span>${pages.length ? `${i + 1} / ${pages.length}` : '0 / 0'}</span>
      <button onclick="turnBy(1)" ${i >= pages.length - 1 ? 'disabled' : ''}>往后翻 ›</button>
    </div>
    ${personaSummary()}
  </main>`;
};
let turning = false;
function turnTo(date) {
  const pages = spreadPages(); const from = spreadIndex(); const to = pages.findIndex(p => p.date === date);
  if (to < 0 || to === from || turning) return;
  const cur = pages[from], next = pages[to], dir = to > from ? 1 : -1;
  const bookEl = document.getElementById('sb-book');
  if (!bookEl || matchMedia('(prefers-reduced-motion: reduce)').matches) { appState.bookDate = date; return refreshKeepScroll(); }
  turning = true;
  // underlay shows the destination spread on the side being revealed
  if (dir > 0) document.getElementById('sb-right').innerHTML = pageRight(next);
  else document.getElementById('sb-left').innerHTML = pageLeft(next);
  const leaf = document.createElement('div');
  leaf.className = `sb-leaf ${dir > 0 ? 'leaf-fwd' : 'leaf-back'}`;
  leaf.innerHTML = dir > 0
    ? `<div class="leaf-face front">${pageRight(cur)}</div><div class="leaf-face back">${pageLeft(next)}</div>`
    : `<div class="leaf-face front">${pageLeft(cur)}</div><div class="leaf-face back">${pageRight(next)}</div>`;
  bookEl.appendChild(leaf);
  void leaf.offsetWidth; // commit the start state, then animate
  leaf.classList.add('go');
  setTimeout(() => { turning = false; appState.bookDate = date; refreshKeepScroll(); document.querySelector('#date-chips .on')?.scrollIntoView({ inline: 'center', block: 'nearest' }); }, 760);
}
function turnBy(step) { const pages = spreadPages(); const p = pages[spreadIndex() + step]; if (p) turnTo(p.date); }
function refreshKeepScroll() { const y = window.scrollY; document.body.classList.add('no-enter'); appRender(); window.scrollTo(0, y); setTimeout(() => document.body.classList.remove('no-enter'), 50); }
jumpTo = turnTo;
flipBy = step => turnBy(-step);
jumpNear = function (value) {
  if (!value) return;
  const pages = spreadPages(); if (!pages.length) return;
  const t = new Date(value).getTime();
  const best = pages.reduce((a, p) => Math.abs(new Date(p.date) - t) < Math.abs(new Date(a.date) - t) ? p : a);
  if (best.date !== value) appToast(`那天没有记录，翻到最近的 ${fmtDate(best.date).md}`);
  turnTo(best.date);
};
openBook = function (id) { appState.bookId = id; appState.bookDate = null; appRender(); };
refreshDiaryBody = refreshKeepScroll;
// swipe on the book
document.addEventListener('touchstart', e => { if (e.target.closest?.('#sb-book')) appState._bx = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => { if (appState._bx == null) return; const dx = e.changedTouches[0].clientX - appState._bx; appState._bx = null; if (Math.abs(dx) > 50) turnBy(dx < 0 ? 1 : -1); }, { passive: true });

/* ---------- 2. Persona with a big title ---------- */
const _personaSummary = personaSummary;
personaSummary = function () {
  const html = _personaSummary();
  if (!html) return '';
  const head = html.match(/<div class="persona-head">[\s\S]*?<\/div><\/div>/);
  const h2 = (html.match(/<h2>([\s\S]*?)<\/h2>/) || [])[1] || '';
  const body = head ? html.replace(head[0], '') : html;
  return `<header class="u-title">${uMark(64, 'u-bounce-slow')}<div><h2 class="hand">U 眼中的你</h2><p>近 30 天 · ${h2}</p></div></header>${body}`;
};

/* ---------- 4. Styling progress rail ---------- */
function railStep(state, label, body, extra = '') {
  return `<section class="flow-step ${state}" ${extra}><div class="flow-label">${state === 'current' ? '<span class="now">Now</span>' : ''}<b>${label}</b></div>${body}</section>`;
}
stylingSetup = function () {
  const custom = appState.styleCustomScene;
  const activeScene = custom ? '' : appState.styleScene;
  const picks = pickedGarments();
  const s1 = appState.flowScene ? 'done' : 'current';
  const s2 = !appState.flowScene ? 'todo' : picks.length ? 'done' : 'optional';
  const s3 = appState.flowScene ? 'current' : 'todo';
  return `<main class="app-page styling-page">
    ${pageTop('今天的穿搭')}
    <div class="flow" id="flow">
      ${railStep(s1, '① 今天要去哪儿？', `
        <div class="scene-pills">${appScenes.map(s => `<button class="${activeScene === s.id && appState.flowScene ? 'selected' : ''}" onclick="pickScene('${s.id}',this)">${s.name}</button>`).join('')}</div>
        <input class="scene-input" id="scene-custom" placeholder="或者自己写：见客户、看展、朋友生日饭…" value="${escapeText(custom)}" oninput="appState.styleCustomScene=this.value;appState.flowScene=!!this.value;document.querySelectorAll('.scene-pills button').forEach(b=>b.classList.remove('selected'));updateRail()">`, 'id="step-scene"')}
      ${railStep(s2, '② 有想穿的单品吗？<small>可跳过</small>', picks.length
        ? `<div class="picked-row">${picks.map(g => `<span class="picked-chip"><img src="${g.image}" alt="">${escapeText(g.name.slice(0, 6))}<i onclick="togglePick('${g.id}')">×</i></span>`).join('')}</div><button class="wardrobe-pick-btn" onclick="openStylePicker()">${appIcons.plus}<span>从衣橱继续添加 / 修改</span></button>`
        : `<button class="wardrobe-pick-btn empty" onclick="openStylePicker()">${appIcons.wardrobe}<span><b>从衣橱中挑选</b><small>不选也行，U 会自己从衣橱里挑</small></span></button>`, 'id="step-pick"')}
      ${railStep(s3, '③ 生成 3 套', `<button class="coral-button generate-button" onclick="generateLooks()" ${appState.flowScene ? '' : 'disabled'}>生成 3 套搭配</button>`, 'id="step-go"')}
    </div>
  </main>`;
};
function updateRail() {
  const picks = pickedGarments();
  const set = (id, st) => { const el = document.getElementById(id); if (!el) return; el.className = 'flow-step ' + st; const lab = el.querySelector('.flow-label'); lab.querySelector('.now')?.remove(); if (st === 'current') lab.insertAdjacentHTML('afterbegin', '<span class="now">Now</span>'); };
  set('step-scene', appState.flowScene ? 'done' : 'current');
  set('step-pick', !appState.flowScene ? 'todo' : picks.length ? 'done' : 'optional');
  set('step-go', appState.flowScene ? 'current' : 'todo');
  const go = document.querySelector('#step-go .generate-button'); if (go) go.disabled = !appState.flowScene;
}
const _pickScene = pickScene;
pickScene = function (id, btn) { _pickScene(id, btn); appState.flowScene = true; updateRail(); };
const _startStyling = startStyling;
startStyling = function (id) { appState.flowTried = false; appState.flowWorn = false; _startStyling(id); };
stylingResult = function () {
  const looks = appState.styleLooks;
  const picks = pickedGarments();
  const tried = appState.flowTried, worn = appState.flowWorn;
  return `<main class="app-page styling-page result-page">
    ${pageTop('搭配方案', "appState.styleStep='setup';appRender()")}
    <div class="flow">
      ${railStep('done', `① ${escapeText(currentSceneLabel())} · ${appState.weather.temp}°`, '')}
      ${railStep(picks.length ? 'done' : 'optional', picks.length ? `② 围绕「${escapeText(picks.map(p => p.name).join('、'))}」` : '② 没指定单品，U 自己挑', '')}
      ${railStep(tried ? 'done' : 'current', '③ 挑一套 · 左右滑', `
        <div class="look-scroller" id="look-scroller" onscroll="onLookScroll()">${looks.map((look, i) => lookSlide(look, i)).join('')}</div>
        <div class="look-dots">${looks.map((_, i) => `<span class="${i === appState.styleActive ? 'on' : ''}"></span>`).join('')}</div>`)}
      ${railStep(tried ? 'done' : 'todo', '④ 看上身效果', `<button class="ghost-button" onclick="appState.flowTried=true;openTryOn();setTimeout(()=>{const y=scrollY;appRender();scrollTo(0,y)},50)">查看上身效果</button>`)}
      ${railStep(worn ? 'done' : tried ? 'current' : 'todo', '⑤ 穿这套，写进手账', `<button class="coral-button" onclick="appState.flowWorn=true;wearThis()">穿这套 · 记入手账</button>`)}
    </div>
  </main>`;
};
// keep the chosen look in view after any re-render of the result page
const _appRender = appRender;
appRender = function () {
  _appRender();
  const sc = document.getElementById('look-scroller');
  if (sc && appState.styleActive) { const w = sc.querySelector('.look-slide')?.getBoundingClientRect().width || 0; sc.style.scrollBehavior = 'auto'; sc.scrollLeft = appState.styleActive * (w + 14); }
};

/* ---------- boot ---------- */
appRender();
