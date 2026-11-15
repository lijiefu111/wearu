// WEARU v015 — loaded after v014.js.
// 1 generate looks inline on the same page · 3 journal: closed cover → open → full-page turns · 5 colour themes for review

/* ---------- shared: keep scroll on re-render when asked ---------- */
const _appRender14 = appRender;
appRender = function () {
  const y = window.scrollY;
  if (appState.genLoading) { appState.keepScroll = true; appState.noEnter = true; }
  _appRender14();
  if (appState.noEnter) { document.querySelectorAll('.app-page').forEach(el => el.style.animation = 'none'); appState.noEnter = false; }
  if (appState.keepScroll) { window.scrollTo(0, y); appState.keepScroll = false; }
};
function softRender() { appState.keepScroll = true; appState.noEnter = true; appRender(); }
refreshKeepScroll = softRender; refreshDiaryBody = softRender;

/* ---------- 1. Inline generation ---------- */
stylingPage = function () {
  if (appState.styleSubview === 'pick') return stylingPickPage();
  return stylingSetup();
};
stylingSetup = function () {
  const custom = appState.styleCustomScene;
  const activeScene = custom ? '' : appState.styleScene;
  const picks = pickedGarments();
  const hasResult = appState.styleStep === 'result' && appState.styleLooks.length;
  const loading = appState.genLoading;
  const tried = appState.flowTried, worn = appState.flowWorn;
  const s1 = appState.flowScene ? 'done' : 'current';
  const s2 = !appState.flowScene ? 'todo' : picks.length ? 'done' : 'optional';
  const s3 = hasResult ? (tried ? 'done' : 'current') : appState.flowScene ? 'current' : 'todo';
  const looks = appState.styleLooks;
  return `<main class="app-page styling-page">
    ${pageTop('今天的穿搭')}
    <div class="flow" id="flow">
      ${railStep(s1, '① 今天要去哪儿？', `
        <div class="scene-pills">${appScenes.map(s => `<button class="${activeScene === s.id && appState.flowScene ? 'selected' : ''}" onclick="pickScene('${s.id}',this)">${s.name}</button>`).join('')}</div>
        <input class="scene-input" id="scene-custom" placeholder="或者自己写：见客户、看展、朋友生日饭…" value="${escapeText(custom)}" oninput="appState.styleCustomScene=this.value;appState.flowScene=!!this.value;resetResults();document.querySelectorAll('.scene-pills button').forEach(b=>b.classList.remove('selected'));updateRail()">`, 'id="step-scene"')}
      ${railStep(s2, '② 有想穿的单品吗？<small>可跳过</small>', picks.length
        ? `<div class="picked-row">${picks.map(g => `<span class="picked-chip"><img src="${g.image}" alt="">${escapeText(g.name.slice(0, 6))}<i onclick="togglePick('${g.id}')">×</i></span>`).join('')}</div><button class="wardrobe-pick-btn" onclick="openStylePicker()">${appIcons.plus}<span>从衣橱继续添加 / 修改</span></button>`
        : `<button class="wardrobe-pick-btn empty" onclick="openStylePicker()">${appIcons.wardrobe}<span><b>从衣橱中挑选</b><small>不选也行，U 会自己从衣橱里挑</small></span></button>`, 'id="step-pick"')}
      ${railStep(s3, hasResult ? '③ 挑一套 · 左右滑' : '③ 生成 3 套', loading
        ? `<div class="inline-loading">${uMark(56, 'u-bounce')}<b>U 正在翻你的衣橱…</b><small>结合天气、场合和你常穿的搭配</small></div>`
        : hasResult
          ? `<div class="result-meta"><span class="meta-chip">${escapeText(currentSceneLabel())}</span><span class="meta-chip">${appState.weather.temp}° ${appState.weather.desc || ''}</span><button class="regen" onclick="generateLooks()">换一批</button></div>
             <div class="look-scroller" id="look-scroller" onscroll="onLookScroll()">${looks.map((look, i) => lookSlide(look, i)).join('')}</div>
             <div class="look-dots">${looks.map((_, i) => `<span class="${i === appState.styleActive ? 'on' : ''}"></span>`).join('')}</div>`
          : `<button class="coral-button generate-button" onclick="generateLooks()" ${appState.flowScene ? '' : 'disabled'}>生成 3 套搭配</button>`, 'id="step-go"')}
      ${hasResult && !loading ? `
        ${railStep(tried ? 'done' : 'todo', '④ 看上身效果', `<button class="ghost-button" onclick="appState.flowTried=true;openTryOn();setTimeout(softRender,60)">查看上身效果</button>`)}
        ${railStep(worn ? 'done' : tried ? 'current' : 'todo', '⑤ 穿这套，写进手账', `<button class="coral-button" onclick="appState.flowWorn=true;wearThis()">穿这套 · 记入手账</button>`)}` : ''}
    </div>
  </main>`;
};
function resetResults() { if (appState.styleStep === 'result') { appState.styleStep = 'setup'; appState.styleLooks = []; appState.flowTried = false; appState.flowWorn = false; softRender(); } }
const _pickScene15 = pickScene;
pickScene = function (id, btn) { const had = appState.styleStep === 'result'; _pickScene15(id, btn); if (had) resetResults(); };
const _togglePick15 = togglePick;
togglePick = function (id) { appState.styleStep = 'setup'; appState.styleLooks = []; _togglePick15(id); };
const _generate15 = generateLooks;
generateLooks = function () {
  appState.flowTried = false; appState.flowWorn = false;
  _generate15(); // computes looks (and paints the old loading screen, replaced right below)
  appState.genLoading = true;
  softRender();
  document.getElementById('step-go')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  clearTimeout(appState._genT);
  appState._genT = setTimeout(() => {
    appState.genLoading = false; softRender();
    const el = document.getElementById('step-go');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70 });
  }, 1100);
};

/* ---------- 3. Journal: cover → full pages ---------- */
function bookTitle(book) {
  const who = appGender === 'male' ? '陈野' : '周可';
  return book.rule === 'all' ? `${who}的穿搭手账` : book.name;
}
function journalFull(rec) {
  if (!rec) return `<article class="jf-page jf-blank"><p class="hand">这一页还空着</p><small class="hand">搭配后点「穿这套」就会写进来</small>${doodleArrow}</article>`;
  const f = fmtDate(rec.date);
  const pieces = (rec.images || []).filter(Boolean).slice(0, 5);
  const spots = [[0, 0, 56], [46, 2, 48], [2, 40, 54], [48, 50, 44], [22, 70, 38]];
  const feels = feelOptions.map(x => `<button class="sb-feel hand ${(rec.feels || []).includes(x) ? 'on' : ''}" onclick="toggleDiaryFeel('${rec.date}','${x}')">${x}</button>`).join('');
  const custom = appState.books.filter(b => !b.rule);
  return `<article class="jf-page">
    <header class="jf-head"><div class="sb-date"><b style="--r:${tilt(rec.date, 3)}deg">${f.md}</b><span class="hand">${f.week} · ${f.month}</span></div>
      <span class="jf-stamp" style="--r:${tilt(rec.date + 's', 7)}deg">${escapeText(rec.sceneLabel || sceneName(rec.scene))}${rec.temp ? ` · ${rec.temp}°` : ''}</span></header>
    <div class="jf-mid">
      <div class="jf-collage">${pieces.map((src, i) => `<img class="sb-piece" src="${src}" alt="" style="left:${spots[i][0]}%;top:${spots[i][1]}%;width:${spots[i][2]}%;--r:${tilt(rec.date + i, 8)}deg">`).join('')}<i class="tape t1"></i><i class="tape t2"></i></div>
      <div class="sb-polaroid jf-polaroid" style="--r:${tilt(rec.date + 'p', 6)}deg">${rec.photo ? `<img src="${rec.photo}" alt="当天实穿照">` : `<button class="sb-photo-add hand" onclick="document.getElementById('diary-cam-${rec.date}').click()">${appIcons.camera}贴一张<br>今天的照片</button>`}<i class="tape"></i></div>
      <input id="diary-cam-${rec.date}" type="file" accept="image/*" capture="environment" hidden onchange="addDiaryPhoto(event,'${rec.date}')">
    </div>
    <h3 class="sb-title hand"><mark>${escapeText(rec.title)}</mark></h3>
    <p class="sb-items hand">${(rec.items || []).map(escapeText).join(' / ')}</p>
    <p class="sb-label hand">今天的心情 ↓</p>
    <div class="sb-feels">${feels}</div>
    <textarea class="sb-note hand" id="feel-note-${rec.date}" rows="2" placeholder="${rec.scene === 'date' ? '约会怎么样？写一句…' : '今天穿着感觉怎么样？'}" onblur="saveDiaryNote('${rec.date}')">${escapeText(rec.note || '')}</textarea>
    <footer class="jf-foot">${custom.length ? `<select onchange="addToBook(this.value,'${rec.date}');this.value=''"><option value="">收进…</option>${custom.map(b => `<option value="${b.id}">${escapeText(b.name)}</option>`).join('')}</select>` : '<span></span>'}<span class="sb-u hand">${uMark(24)}U 记下了这一天</span></footer>
    ${doodleStar}
  </article>`;
}
function journalCover(book) {
  const tint = book.rule === 'all' ? 'transparent' : book.color;
  return `<button class="jf-cover" onclick="openCover()" style="--tint:${tint}" aria-label="翻开手账">
    <span class="jf-cover-art"></span>
    <span class="jf-label"><b class="hand">${escapeText(bookTitle(book))}</b><small class="hand">${bookPages(book).length} 天 · 从 ${bookPages(book).length ? fmtDate(spreadPages(book)[0].date).md : '今天'} 开始</small></span>
    ${uMark(54, 'jf-cover-u')}
    <span class="jf-hint hand">点一下翻开 →</span>
  </button>`;
}
diaryPage = function () {
  const pages = spreadPages();
  if (!appState.bookDate || !pages.some(p => p.date === appState.bookDate)) appState.bookDate = pages[pages.length - 1]?.date || null;
  const i = spreadIndex();
  const book = currentBook();
  const open = appState.bookOpen;
  return `<main class="app-page diary-page journal-v15">
    ${pageTop('穿搭手账')}
    <div class="book-shelf" role="tablist" aria-label="我的手账">
      ${appState.books.map(b => `<button role="tab" aria-selected="${b.id === book.id}" style="--book:${b.color}" onclick="openBook('${b.id}')"><i></i>${escapeText(b.name)}<small>${bookPages(b).length}</small></button>`).join('')}
      <button class="book-new" onclick="newBook()">＋ 新手账</button>
    </div>
    ${open ? `<div class="date-jump"><div class="date-chips hand" id="date-chips">${pages.map(p => `<button class="${p.date === appState.bookDate ? 'on' : ''}" onclick="turnTo('${p.date}')">${fmtDate(p.date).md}</button>`).join('')}</div><label class="date-pick" aria-label="按日期跳转"><svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14"/></svg><input type="date" onchange="jumpNear(this.value)"></label></div>` : ''}
    <div class="jf-book ${open ? 'is-open' : 'is-closed'}" id="jf-book" style="--book:${book.color}">
      <div class="jf-rings" aria-hidden="true">${'<i></i>'.repeat(9)}</div>
      <div class="jf-stack" id="jf-stack">${open ? journalFull(pages[i]) : journalCover(book)}</div>
    </div>
    ${open ? `<div class="book-nav hand"><button onclick="turnBy(-1)" ${i <= 0 ? 'disabled' : ''}>‹ 往前翻</button><button class="jf-close" onclick="closeCover()">合上</button><button onclick="turnBy(1)" ${i >= pages.length - 1 ? 'disabled' : ''}>往后翻 ›</button></div>` : '<p class="jf-tip hand">每次「穿这套」，都会写进这本手账</p>'}
    ${personaSummary()}
  </main>`;
};
function openCover() {
  const stack = document.getElementById('jf-stack'); const book = currentBook();
  if (!stack || turning) return;
  turning = true;
  const pages = spreadPages(); const rec = pages[spreadIndex()];
  stack.innerHTML = journalFull(rec) + `<div class="jf-leaf cover-leaf" style="--book:${book.color}"><div class="leaf-face front">${journalCover(book)}</div><div class="leaf-face back"><div class="jf-endpaper"></div></div></div>`;
  const leaf = stack.querySelector('.jf-leaf'); void leaf.offsetWidth; leaf.classList.add('go');
  setTimeout(() => { turning = false; appState.bookOpen = true; softRender(); }, 900);
}
function closeCover() {
  const stack = document.getElementById('jf-stack'); const book = currentBook();
  if (!stack || turning) return;
  turning = true;
  stack.insertAdjacentHTML('beforeend', `<div class="jf-leaf cover-leaf closing" style="--book:${book.color}"><div class="leaf-face front">${journalCover(book)}</div><div class="leaf-face back"><div class="jf-endpaper"></div></div></div>`);
  const leaf = stack.querySelector('.jf-leaf'); void leaf.offsetWidth; leaf.classList.add('go');
  setTimeout(() => { turning = false; appState.bookOpen = false; softRender(); }, 900);
}
turnTo = function (date) {
  const pages = spreadPages(); const from = spreadIndex(); const to = pages.findIndex(p => p.date === date);
  if (to < 0 || to === from || turning) return;
  const stack = document.getElementById('jf-stack');
  if (!stack || !appState.bookOpen || matchMedia('(prefers-reduced-motion: reduce)').matches) { appState.bookDate = date; return softRender(); }
  turning = true;
  const cur = pages[from], next = pages[to];
  if (to > from) { // forward: current page lifts off to the left, next page is underneath
    stack.innerHTML = journalFull(next) + `<div class="jf-leaf fwd"><div class="leaf-face front">${journalFull(cur)}</div><div class="leaf-face back"><div class="jf-back"></div></div></div>`;
  } else { // backward: previous page swings back in over the current one
    stack.innerHTML = journalFull(cur) + `<div class="jf-leaf back-in"><div class="leaf-face front">${journalFull(next)}</div><div class="leaf-face back"><div class="jf-back"></div></div></div>`;
  }
  const leaf = stack.querySelector('.jf-leaf'); void leaf.offsetWidth; leaf.classList.add('go');
  setTimeout(() => { turning = false; appState.bookDate = date; softRender(); document.querySelector('#date-chips .on')?.scrollIntoView({ inline: 'center', block: 'nearest' }); }, 780);
};
openBook = function (id) { appState.bookId = id; appState.bookDate = null; appState.bookOpen = false; appRender(); };
const _wearThis15 = wearThis;
wearThis = function () { appState.bookOpen = true; _wearThis15(); };
document.addEventListener('touchstart', e => { if (e.target.closest?.('#jf-book.is-open')) appState._jx = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => { if (appState._jx == null) return; const dx = e.changedTouches[0].clientX - appState._jx; appState._jx = null; if (Math.abs(dx) > 50) turnBy(dx < 0 ? 1 : -1); }, { passive: true });

/* ---------- 5. Colour themes (for review) ---------- */
const themes = {
  warm: { name: '暖米（现在）', note: '温暖、偏复古' },
  cloud: { name: '云白', note: '干净明亮，衣服颜色最准' },
  mist: { name: '雾蓝', note: '冷静、偏科技感' },
  blush: { name: '奶油粉', note: '更可爱、更柔和' }
};
function applyTheme(t) {
  if (!themes[t]) t = 'cloud';
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('wearu-v15-theme', t); } catch {}
}
applyTheme(new URLSearchParams(location.search).get('theme') || (() => { try { return localStorage.getItem('wearu-v15-theme'); } catch { return null; } })() || 'cloud');
const _openProfile15 = openProfileSheet;
openProfileSheet = function () {
  _openProfile15();
  const row = document.querySelector('.profile-sheet .gender-row');
  if (!row) return;
  const cur = document.documentElement.dataset.theme;
  row.insertAdjacentHTML('afterend', `<div class="theme-row"><span><b>界面配色</b><small>评审用，挑一个最喜欢的</small></span><div class="theme-chips">${Object.entries(themes).map(([k, v]) => `<button type="button" data-t="${k}" aria-pressed="${k === cur}" onclick="applyTheme('${k}');this.parentElement.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b===this))"><i></i>${v.name}</button>`).join('')}</div></div>`);
};

/* ---------- boot ---------- */
appState.bookOpen = false;
appRender();
