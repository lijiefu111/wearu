// WEARU v011 — loaded after preview.js and overrides parts of it:
// 1 U companion across the product · 2 home hero CTA · 3 live weather + animated icons
// 4 live try-on (camera; Decart Lucy VTON connector pending API key) · 5 diary as a flip-page journal
// 6 persona + smart shopping redesign · 7 two-column community

/* ---------- 1. U companion ---------- */
function uColor() { return (appState.profile && appState.profile.uColor) || 'ivory'; }
function uMark(size = 28, extra = '') {
  return `<span class="u-mark u-${uColor()} ${extra}" style="--u:${size}px" aria-hidden="true"><img src="u-companion.png" alt=""></span>`;
}
function uSays(text) {
  return `<div class="u-says">${uMark(30)}<p><b>U 说</b>${text}</p></div>`;
}
// toast with U
appToast = function (message) {
  const el = document.getElementById('toast');
  el.innerHTML = `${uMark(22)}<span>${escapeText(message)}</span>`;
  el.classList.add('show');
  clearTimeout(appToastTimer);
  appToastTimer = setTimeout(() => el.classList.remove('show'), 2200);
};

/* ---------- 2. Home: one hero CTA at the top ---------- */
function greeting() {
  const h = new Date().getHours();
  return h < 6 ? '夜深了' : h < 11 ? '早上好' : h < 13 ? '中午好' : h < 18 ? '下午好' : '晚上好';
}
function todayLabel() {
  const d = new Date();
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日 · 周${'日一二三四五六'[d.getDay()]}`;
}
wardrobePage = function () {
  if (appState.subview === 'category') return categoryPage();
  const ids = ['tops', 'outer', 'bottoms', 'bags', 'shoes', 'accessories'];
  return `<main class="app-page wardrobe-page">
    <header class="brand-top">${brandLogo()}<span class="top-actions"><button class="circle-icon${appState.avatar ? ' has-avatar' : ''}" aria-label="个人档案" onclick="openProfileSheet()">${appState.avatar ? `<img src="${appState.avatar}" alt="我">` : appIcons.user}</button></span></header>
    <button class="today-hero" onclick="startStyling()">
      <span class="today-copy"><small>${todayLabel()} · ${greeting()}</small><b>今天穿什么？</b><em>选个场合，U 用你的衣服搭 3 套</em></span>
      <span class="today-go" aria-hidden="true">↗</span>
      ${uMark(74, 'hero-u')}
    </button>
    <div class="section-head"><h2>我的衣橱</h2><span>${appGarments.length} 件 · 点品类查看</span></div>
    <div class="category-collage" aria-label="按品类浏览衣橱">
      ${ids.map(id => `<button class="category-object object-${id}" onclick="openCategoryV3('${id}')" aria-label="浏览${appCategories.find(c => c.id === id).name}">${fashionCategoryArt(id)}<span class="category-name">${appCategories.find(c => c.id === id).name}${appGender === 'male' && !categoryCount(id) ? '<em class="gap-tag">缺口</em>' : ''}<span aria-hidden="true"> ↗</span></span></button>`).join('')}
    </div>
  </main>`;
};

/* ---------- 3. Live weather + animated colour icons ---------- */
function weatherType(code) {
  if (code === 0) return 'sun';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'cloud';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 95) return 'thunder';
  if (code >= 51) return 'rain';
  return 'cloud';
}
const wxDesc = { sun: '晴', partly: '晴间多云', cloud: '多云', fog: '有雾', rain: '有雨', snow: '有雪', thunder: '雷雨' };
function weatherIcon(type) {
  const sun = `<g class="wx-sun"><circle cx="20" cy="20" r="8" fill="#F5B83D"/><g class="wx-rays" stroke="#F5B83D" stroke-width="2.4" stroke-linecap="round">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<line x1="20" y1="5" x2="20" y2="8.5" transform="rotate(${a} 20 20)"/>`).join('')}</g></g>`;
  const cloud = (cls, fill, stroke = '#8FA5BC') => `<path class="${cls}" fill="${fill}" stroke="${stroke}" stroke-width="1.3" stroke-linejoin="round" d="M15 35h19a7 7 0 0 0 .6-14 9.5 9.5 0 0 0-18.2 2.6A5.8 5.8 0 0 0 15 35z"/>`;
  const svg = inner => `<svg class="wx wx-${type}" viewBox="0 0 48 48" aria-hidden="true">${inner}</svg>`;
  if (type === 'sun') return svg(`<g transform="translate(4 4)">${sun}</g>`);
  if (type === 'partly') return svg(`<g transform="translate(-2 -3)">${sun}</g>${cloud('wx-drift', '#FFFFFF')}`);
  if (type === 'fog') return svg(`${cloud('wx-drift', '#DCE6F0')}<g class="wx-fog" stroke="#7F96AE" stroke-width="2.4" stroke-linecap="round"><line x1="9" y1="39" x2="33" y2="39"/><line x1="14" y1="43" x2="40" y2="43"/></g>`);
  const base = `<g transform="translate(7 -5) scale(.8)">${cloud('wx-drift-slow', '#9DB4CB', '#7F96AE')}</g>${cloud('wx-drift', '#FFFFFF')}`;
  if (type === 'rain') return svg(`${base}<g class="wx-rain" stroke="#2F80D6" stroke-width="2.6" stroke-linecap="round"><line x1="18" y1="38" x2="16" y2="43"/><line x1="25" y1="38" x2="23" y2="43"/><line x1="32" y1="38" x2="30" y2="43"/></g>`);
  if (type === 'snow') return svg(`${base}<g class="wx-snow" fill="#8DB8E8"><circle cx="18" cy="40" r="1.8"/><circle cx="25" cy="42" r="1.8"/><circle cx="32" cy="40" r="1.8"/></g>`);
  if (type === 'thunder') return svg(`${base}<path class="wx-bolt" fill="#F5B83D" d="M24 34l-4 7h4l-2 6 7-9h-4l2-4z"/>`);
  return svg(base);
}
weatherBanner = function () {
  const w = appState.weather;
  const type = weatherType(w.code);
  const range = w.hi !== '' && w.hi !== undefined ? ` · ${w.lo}°–${w.hi}°` : '';
  return `<div class="weather-banner live"><span class="weather-icon">${weatherIcon(type)}</span><div class="weather-copy"><b>${w.temp}°<small> · ${w.desc || wxDesc[type]}</small></b><span>${w.location}${range}</span></div><button class="weather-locate" onclick="detectWeather(true)" aria-label="重新定位">${w.loading ? '<i class="wx-spin"></i>' : '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/></svg>'}</button></div>`;
};
detectWeather = async function (force = false) {
  const KEY = 'wearu-v11-weather';
  if (!force) { try { const c = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (c) { appState.weather = c; if (appState.tab === 'styling') appRender(); return; } } catch {} }
  appState.weather = { ...appState.weather, loading: true, location: '正在定位…' };
  if (appState.tab === 'styling') appRender();
  const fallback = { latitude: 31.2304, longitude: 121.4737, city: '上海' };
  const coords = await new Promise(resolve => {
    if (!navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(p => resolve(p.coords), () => resolve(null), { timeout: 6000, maximumAge: 600000 });
  }) || await fetch('https://ipapi.co/json/').then(r => r.json()).then(ip => ip && ip.latitude ? { latitude: ip.latitude, longitude: ip.longitude, city: ip.city } : null).catch(() => null) || fallback;
  try {
    const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`).then(r => r.json());
    const city = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=zh`).then(r => r.json()).then(g => g.city || g.locality || g.principalSubdivision).catch(() => '') || coords.city || '当前位置';
    const code = data.current.weather_code;
    appState.weather = { code, desc: wxDesc[weatherType(code)], location: city, temp: Math.round(data.current.temperature_2m), hi: Math.round(data.daily.temperature_2m_max[0]), lo: Math.round(data.daily.temperature_2m_min[0]) };
    sessionStorage.setItem(KEY, JSON.stringify(appState.weather));
  } catch {
    appState.weather = { code: 2, desc: '晴间多云', location: '上海 · 离线示例', temp: appGender === 'male' ? 24 : 15, hi: '', lo: '' };
  }
  if (appState.tab === 'styling') appRender();
};

/* generating screen with U */
const _generateLooks = generateLooks;
generateLooks = function () {
  _generateLooks();
  const screen = document.getElementById('screen');
  screen.innerHTML = `<div class="v3"><main class="app-page styling-page"><div class="generating u-loading">${uMark(84, 'u-bounce')}<b>U 正在翻你的衣橱…</b><small>结合天气、场合和你常穿的搭配</small></div></main></div>`;
};
lookSlide = function (look, i) {
  return `<section class="look-slide">
    <div class="look-heading"><div><p class="micro">方案 ${i + 1} / ${appState.styleLooks.length}</p><h2>${look.title}</h2></div><span>LOOK 0${i + 1}</span></div>
    ${outfitCanvas([look.outer, look.top, look.bottom, look.shoes, look.bag], look.items)}
    ${uSays(look.reason)}
    <div class="look-items">${look.items.map(t => `<span>${escapeText(t)}</span>`).join('')}</div>
  </section>`;
};

/* ---------- 4. Try-on: digital human + live camera ---------- */
// Live try-on uses Decart's real-time Lucy VTON model (the model behind Anywear).
// It needs a Decart API key; in the browser only short-lived client tokens may be used.
// Set window.WEARU_TRYON_TOKEN_URL to a local endpoint that returns { token } to enable it.
let liveStream = null;
openTryOnViewer = function (image, title, sub, withWear = false, garment = null) {
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeTryOn()">
    <section class="tryon-sheet">
      <div class="modal-handle"></div>
      <p class="micro">${sub} · ${escapeText(title)}</p>
      <h2>看穿上身的效果</h2>
      <div class="tryon-switch"><button class="on" id="tryon-tab-digital" onclick="viewerDigital('${image}')">数字人试穿</button><button id="tryon-tab-live" onclick="startLiveTryOn('${garment || image}')">实时试穿 · 镜头</button></div>
      <div id="tryon-stage"></div>
      ${withWear ? `<button class="coral-button tryon-wear" onclick="closeTryOn();wearThis()">穿这套 · 记入日记</button>` : ''}
      <button class="text-button tryon-close" onclick="closeTryOn()">关闭</button>
    </section>
  </div>`);
  viewerDigital(image);
};
function stopLive() { if (liveStream) { liveStream.getTracks().forEach(t => t.stop()); liveStream = null; } }
function closeTryOn() { stopLive(); closeAppModal(); }
viewerDigital = function (image) {
  stopLive();
  document.getElementById('tryon-tab-digital')?.classList.add('on');
  document.getElementById('tryon-tab-live')?.classList.remove('on');
  const stage = document.getElementById('tryon-stage');
  stage.innerHTML = `<div class="generating small u-loading">${uMark(48, 'u-bounce')}<b>正在生成试穿效果…</b></div>`;
  setTimeout(() => { stage.innerHTML = `<div class="tryon-result"><img src="${image}" alt="试穿效果"><p class="micro">效果演示 · 仅供参考、非真实合身</p></div>`; }, 700);
};
async function startLiveTryOn(garment) {
  document.getElementById('tryon-tab-digital')?.classList.remove('on');
  document.getElementById('tryon-tab-live')?.classList.add('on');
  const stage = document.getElementById('tryon-stage');
  stage.innerHTML = `<div class="live-frame"><video id="live-video" autoplay playsinline muted></video><div class="live-hud"><span class="live-dot">LIVE</span><span id="live-status">正在打开摄像头…</span></div><img class="live-garment" src="${garment}" alt="要试的衣服"></div><p class="micro live-note" id="live-note"></p>`;
  try {
    liveStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 1280 } }, audio: false });
    const video = document.getElementById('live-video');
    if (!video) return stopLive();
    video.srcObject = liveStream;
  } catch (e) {
    stage.innerHTML = `<div class="live-empty">${uMark(56)}<b>没有拿到摄像头权限</b><small>在浏览器地址栏允许摄像头后再试一次。实时试穿不会上传或保存你的画面。</small><button class="ghost-button" onclick="startLiveTryOn('${garment}')">再试一次</button></div>`;
    return;
  }
  if (window.WEARU_TRYON_TOKEN_URL) return connectLucyVton(garment);
  document.getElementById('live-status').textContent = '镜头预览中';
  document.getElementById('live-note').innerHTML = '实时换装接口（Decart Lucy VTON，Anywear 同款模型）待接入：接通后衣服会实时穿在镜头里的你身上，转身时会跟着动。';
}
async function connectLucyVton(garment) {
  // Wiring per docs.platform.decart.ai (realtime JS SDK). Enabled only once a token endpoint exists.
  const status = document.getElementById('live-status');
  try {
    status.textContent = '正在连接实时试穿…';
    const { createDecartClient, models } = await import('https://esm.sh/@decartai/sdk');
    const client = createDecartClient({ apiKeyProvider: async () => (await fetch(window.WEARU_TRYON_TOKEN_URL).then(r => r.json())).token });
    const blob = await fetch(garment).then(r => r.blob());
    const rt = await client.realtime.connect(liveStream, { model: models.realtime('lucy-vton-latest'), mirror: 'auto', onRemoteStream: s => { const v = document.getElementById('live-video'); if (v) v.srcObject = s; } });
    await rt.set({ prompt: 'Dress the person in this garment', image: blob, enhance: false });
    status.textContent = '实时试穿中';
  } catch (e) {
    status.textContent = '实时试穿连接失败，显示镜头预览';
  }
}

/* ---------- 5. Diary as a flip-page journal ---------- */
const defaultBooks = [
  { id: 'all', name: '我的穿搭手账', color: '#2E2C2A', rule: 'all' },
  { id: 'date', name: '约会篇', color: '#C4644A', rule: 'scene:date' }
];
appState.books = (() => { try { return JSON.parse(localStorage.getItem(K('books')) || 'null') || defaultBooks; } catch { return defaultBooks; } })();
appState.bookId = appState.bookId || 'all';
function saveBooks() { try { localStorage.setItem(K('books'), JSON.stringify(appState.books)); } catch {} }
function currentBook() { return appState.books.find(b => b.id === appState.bookId) || appState.books[0]; }
function bookPages(book = currentBook()) {
  const all = [...appState.diary].sort((a, b) => b.date.localeCompare(a.date));
  if (book.rule === 'all') return all;
  if (book.rule && book.rule.startsWith('scene:')) return all.filter(r => r.scene === book.rule.slice(6));
  return all.filter(r => (book.ids || []).includes(r.date));
}
function fmtDate(key) {
  const d = new Date(key + 'T00:00:00');
  return { md: `${d.getMonth() + 1}.${String(d.getDate()).padStart(2, '0')}`, week: '周' + '日一二三四五六'[d.getDay()], month: `${d.getFullYear()} 年 ${d.getMonth() + 1} 月` };
}
diaryPage = function () {
  const pages = bookPages();
  if (!appState.bookDate || !pages.some(p => p.date === appState.bookDate)) appState.bookDate = pages[0]?.date || null;
  const book = currentBook();
  return `<main class="app-page diary-page journal">
    ${pageTop('穿搭手账')}
    <div class="book-shelf" role="tablist" aria-label="我的手账">
      ${appState.books.map(b => `<button role="tab" aria-selected="${b.id === book.id}" style="--book:${b.color}" onclick="openBook('${b.id}')"><i></i>${escapeText(b.name)}<small>${bookPages(b).length}</small></button>`).join('')}
      <button class="book-new" onclick="newBook()">＋ 新手账</button>
    </div>
    <div class="date-jump">
      <div class="date-chips" id="date-chips">${pages.map(p => `<button class="${p.date === appState.bookDate ? 'on' : ''}" onclick="jumpTo('${p.date}')">${fmtDate(p.date).md}</button>`).join('')}</div>
      <label class="date-pick" aria-label="按日期跳转"><svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14"/></svg><input type="date" onchange="jumpNear(this.value)"></label>
    </div>
    <div class="book" style="--book:${book.color}">
      <div class="book-rings" aria-hidden="true">${'<i></i>'.repeat(7)}</div>
      <div class="book-page-wrap" id="book-page-wrap">${journalPage()}</div>
    </div>
    <div class="book-nav">
      <button onclick="flipBy(1)" ${pageIndex() >= pages.length - 1 ? 'disabled' : ''}>‹ 前一页</button>
      <span>${pages.length ? `${pages.length - pageIndex()} / ${pages.length}` : '0 / 0'}</span>
      <button onclick="flipBy(-1)" ${pageIndex() <= 0 ? 'disabled' : ''}>后一页 ›</button>
    </div>
    ${personaSummary()}
  </main>`;
};
function pageIndex() { return Math.max(0, bookPages().findIndex(p => p.date === appState.bookDate)); }
function journalPage() {
  const rec = bookPages().find(p => p.date === appState.bookDate);
  if (!rec) return `<article class="journal-page empty">${uMark(64)}<b>这本手账还是空的</b><small>${currentBook().rule === 'all' || currentBook().rule?.startsWith('scene:') ? '搭配后点「穿这套」，这一天就会写进来。' : '在任意一页点「收进手账」，把那天放进这本。'}</small><button class="ghost-button" onclick="startStyling()">去搭配</button></article>`;
  const f = fmtDate(rec.date);
  const chips = feelOptions.map(x => `<button class="sticker ${(rec.feels || []).includes(x) ? 'on' : ''}" onclick="toggleDiaryFeel('${rec.date}','${x}')">${x}</button>`).join('');
  const custom = appState.books.filter(b => !b.rule);
  return `<article class="journal-page" id="journal-page">
    <header class="jp-head"><div><b>${f.md}</b><span>${f.week} · ${f.month}</span></div><span class="jp-stamp">${escapeText(rec.sceneLabel || sceneName(rec.scene))}${rec.temp ? ` · ${rec.temp}°` : ''}</span></header>
    <div class="jp-body">
      <div class="jp-outfit">${outfitCanvas(rec.images, rec.items)}</div>
      <div class="jp-photo">${rec.photo ? `<img src="${rec.photo}" alt="当天实穿照"><button onclick="document.getElementById('diary-cam-${rec.date}').click()">换一张</button>` : `<button class="jp-photo-add" onclick="document.getElementById('diary-cam-${rec.date}').click()">${appIcons.camera}<span>贴一张<br>今天的照片</span></button>`}<i class="tape"></i></div>
      <input id="diary-cam-${rec.date}" type="file" accept="image/*" capture="environment" hidden onchange="addDiaryPhoto(event,'${rec.date}')">
    </div>
    <h3 class="jp-title">${escapeText(rec.title)}</h3>
    <p class="jp-items">${(rec.items || []).map(escapeText).join(' · ')}</p>
    <div class="jp-stickers">${chips}</div>
    <div class="jp-note"><textarea id="feel-note-${rec.date}" rows="2" placeholder="${rec.scene === 'date' ? '约会怎么样？写一句…' : '今天穿着感觉怎么样？写一句…'}">${escapeText(rec.note || '')}</textarea><button onclick="saveDiaryNote('${rec.date}')">记下</button></div>
    <footer class="jp-foot">${custom.length ? `<select onchange="addToBook(this.value,'${rec.date}');this.value=''"><option value="">收进手账…</option>${custom.map(b => `<option value="${b.id}">${escapeText(b.name)}</option>`).join('')}</select>` : '<span></span>'}<span class="jp-u">${uMark(26)}U 记下了这一天</span></footer>
  </article>`;
}
function openBook(id) { appState.bookId = id; appState.bookDate = null; appRender(); }
function newBook() {
  const name = prompt('给新手账起个名字', '旅行篇');
  if (!name) return;
  const colors = ['#97A789', '#8b654c', '#5f7ea6', '#a64d36'];
  const book = { id: 'b' + Date.now(), name: name.slice(0, 10), color: colors[appState.books.length % colors.length], ids: [] };
  appState.books.push(book); saveBooks(); openBook(book.id); appToast(`新建了「${book.name}」`);
}
function addToBook(id, date) {
  const b = appState.books.find(x => x.id === id); if (!b) return;
  b.ids = [...new Set([...(b.ids || []), date])]; saveBooks(); appToast(`已收进「${b.name}」`); appRender();
}
function flipTo(date, dir) {
  const wrap = document.getElementById('book-page-wrap');
  const old = document.getElementById('journal-page');
  if (!wrap || !old || matchMedia('(prefers-reduced-motion: reduce)').matches) { appState.bookDate = date; return appRender(); }
  old.classList.add(dir > 0 ? 'flip-out-next' : 'flip-out-prev');
  setTimeout(() => {
    appState.bookDate = date;
    const y = window.scrollY; appRender(); window.scrollTo(0, y);
    document.getElementById('journal-page')?.classList.add(dir > 0 ? 'flip-in-next' : 'flip-in-prev');
    document.querySelector('#date-chips .on')?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, 330);
}
function flipBy(step) { const pages = bookPages(); const i = pageIndex() + step; if (pages[i]) flipTo(pages[i].date, step < 0 ? 1 : -1); }
function jumpTo(date) { const i = bookPages().findIndex(p => p.date === date); flipTo(date, i < pageIndex() ? 1 : -1); }
function jumpNear(value) {
  if (!value) return;
  const pages = bookPages(); if (!pages.length) return;
  const t = new Date(value).getTime();
  const best = pages.reduce((a, p) => Math.abs(new Date(p.date).getTime() - t) < Math.abs(new Date(a.date).getTime() - t) ? p : a);
  if (best.date !== value) appToast(`那天没有记录，翻到最近的 ${fmtDate(best.date).md}`);
  jumpTo(best.date);
}
refreshDiaryBody = function () { const y = window.scrollY; appRender(); window.scrollTo(0, y); };
// swipe to flip
document.addEventListener('touchstart', e => { const p = e.target.closest?.('.journal-page'); if (p) appState._sx = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => { if (appState._sx == null) return; const dx = e.changedTouches[0].clientX - appState._sx; appState._sx = null; if (Math.abs(dx) > 60) flipBy(dx < 0 ? -1 : 1); }, { passive: true });
const _wearThis = wearThis;
wearThis = function () { appState.bookId = 'all'; appState.bookDate = dateStr(0); _wearThis(); };

/* ---------- 6a. Persona: "U 眼中的你" ---------- */
personaSummary = function () {
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 30);
  const recent = appState.diary.filter(r => new Date(r.date) >= cutoff);
  if (recent.length < 2) return '';
  const count = {};
  recent.forEach(r => (r.garmentIds || []).forEach(id => count[id] = (count[id] || 0) + 1));
  const top = Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id, n]) => ({ g: appGarments.find(x => x.id === id), n })).filter(x => x.g);
  const max = top[0]?.n || 1;
  const scenes = {}; recent.forEach(r => scenes[r.scene] = (scenes[r.scene] || 0) + 1);
  const palette = { daily: '#2E2C2A', commute: '#97A789', date: '#C4644A', party: '#D9A441', travel: '#5f7ea6', sport: '#8b654c', custom: '#b9aea2' };
  const idle = appGarments.filter(g => !count[g.id]);
  const topScene = Object.entries(scenes).sort((a, b) => b[1] - a[1])[0][0];
  return `<section class="persona">
    <div class="persona-head">${uMark(40)}<div><p class="micro">U 眼中的你 · 近 30 天</p><h2>${recent.length} 次穿搭，偏爱「${escapeText(top[0]?.g.name || '')}」</h2></div></div>
    <div class="persona-block"><p class="pb-title">最常穿</p>
      ${top.map(t => `<div class="top-row"><img src="${t.g.image}" alt=""><span>${escapeText(t.g.name)}</span><i style="--w:${Math.round(t.n / max * 100)}%"></i><b>${t.n}</b></div>`).join('')}
    </div>
    <div class="persona-block"><p class="pb-title">去了哪些场合</p>
      <div class="scene-bar">${Object.entries(scenes).map(([s, n]) => `<i style="flex:${n};background:${palette[s] || '#b9aea2'}"></i>`).join('')}</div>
      <div class="scene-legend">${Object.entries(scenes).map(([s, n]) => `<span><i style="background:${palette[s] || '#b9aea2'}"></i>${sceneName(s)} ${Math.round(n / recent.length * 100)}%</span>`).join('')}</div>
    </div>
    <div class="persona-block"><p class="pb-title">被冷落的衣服 · ${idle.length} 件 30 天没穿</p>
      <div class="idle-row">${idle.slice(0, 8).map(g => `<button onclick="startStyling('${g.id}')" title="用「${escapeText(g.name)}」搭一套"><img src="${g.image}" alt="${escapeText(g.name)}"></button>`).join('')}</div>
    </div>
    ${uSays(appGender === 'male' ? `你最常在「${sceneName(topScene)}」穿搭。印花 T 已经够多了，缺的是能把它们串起来的基础款；点上面任意一件，我用它给你搭一套。` : `你最常在「${sceneName(topScene)}」穿搭，黑色针织和直筒牛仔几乎天天出场。那些为特定场合买的衣服——马海毛开衫、缎面裙——还在等你；点上面任意一件，我用它给你搭一套。`)}
    <button class="ghost-button" onclick="switchTab('shopping')">看看衣橱缺口 →</button>
  </section>`;
};

/* ---------- 6b. Smart shopping ---------- */
function findSame(query) { window.open('https://s.taobao.com/search?q=' + encodeURIComponent(query), '_blank'); appToast('已在淘宝搜索同款'); }
shopRecCard = function (r) {
  return `<article class="rec-card v11">
    <div class="rec-pair">
      <figure class="rec-product"><img src="${r.img}" alt="${r.name}"><figcaption>单品</figcaption></figure>
      <figure class="rec-body"><img src="${r.onBody}" alt="${r.name}上身效果"><figcaption>买了还能这么穿</figcaption></figure>
    </div>
    <div class="rec-info">
      <div class="rec-head"><b>${r.name}</b><i>${r.range}</i></div>
      <span class="rec-gap">补缺口 · ${r.fills}</span>
      <p>${r.note}</p>
      ${r.unlock ? `<span class="rec-unlock">${r.unlock}</span>` : ''}
      <div class="rec-actions">
        <button class="rec-tryon" onclick="openTryOnViewer('${r.onBody}','${r.name}','试穿这件',false,'${r.img}')">${appIcons.hanger}实时试穿</button>
        <button class="rec-find" onclick="findSame('${r.query}')">${appIcons.search}找同款 ↗</button>
      </div>
    </div>
  </article>`;
};
const _smartShopping = smartShopping;
smartShopping = function () {
  const html = _smartShopping();
  const cut = html.indexOf('<div class="section-title"><h2>买了能这么穿');
  return cut > 0 ? html.slice(0, cut) : html;
};

/* ---------- 7. Community: two-column masonry ---------- */
communityView = function () {
  return `<p class="swipe-hint">看看大家怎么穿 · 点开可试穿、找同款</p><div class="masonry">${communityFeed.map(feedCard).join('')}</div>`;
};
feedCard = function (p, i) {
  return `<button class="m-card" onclick="openFeed(${communityFeed.indexOf(p)})"><img src="${p.hero}" alt="${p.user} 的穿搭" loading="lazy"><span class="m-cap">${escapeText(p.caption.slice(0, 22))}…</span><span class="m-meta"><i>${escapeText(p.user.slice(0, 1).toUpperCase())}</i>${escapeText(p.user)}<em>♥ ${p.likes}</em></span></button>`;
};
function openFeed(i) {
  const p = communityFeed[i];
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()"><section class="feed-sheet"><div class="modal-handle"></div><img src="${p.hero}" alt=""><p class="micro">${p.scene} · OOTD · ${escapeText(p.user)}</p><p class="feed-caption">${p.caption}</p><div class="feed-items">${p.items.map(it => `<button onclick="findSame('${it.q}')">${appIcons.search}${it.name} · 找同款 ↗</button>`).join('')}</div><button class="coral-button" onclick="closeAppModal();openTryOnViewer('${p.hero}','${p.user} 的穿搭','试穿这套')">试穿这套</button></section></div>`);
}

/* U colour change re-tints U across the page */
const _setCompanionColor = setCompanionColor;
setCompanionColor = function (color, button) { _setCompanionColor(color, button); appRender(); };

/* ---------- boot ---------- */
appState.weather = { code: 2, temp: '--', desc: '', location: '正在定位…', hi: '', lo: '', loading: true };
appRender();
detectWeather();
