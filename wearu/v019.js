// WEARU v019 — try-on lives inside each look card: 上身 / 单品 toggle + 实时试穿 button.
// Flow: ① 场合 → ② 单品 → ③ 挑一套 → ④ 穿这套.

appState.slideView = appState.slideView || {};
function slideView(i, look) { return appState.slideView[i] || (look.tryOn ? 'body' : 'items'); }

lookSlide = function (look, i) {
  const v = slideView(i, look);
  return `<section class="look-slide">
    <div class="look-heading"><div><p class="micro">方案 ${i + 1} / ${appState.styleLooks.length}</p><h2>${look.title}</h2></div><span>LOOK 0${i + 1}</span></div>
    <div class="look-media view-${v}" id="lm-${i}">
      <div class="lm-pane lm-items">${outfitCanvas([look.outer, look.top, look.bottom, look.shoes, look.bag], look.items)}</div>
      <div class="lm-pane lm-body">${look.tryOn ? `<img src="${look.tryOn}" alt="${escapeText(look.title)} 上身效果" loading="lazy">` : `<div class="try-empty">${uMark(40)}<b>这套暂无数字人试穿</b><small>可以点下面的「实时试穿」</small></div>`}<span class="lm-tag">效果演示 · 仅供参考</span></div>
      <div class="lm-pane lm-live"></div>
      <div class="lm-seg" role="tablist" aria-label="看这套的方式">
        <button role="tab" aria-selected="${v === 'body'}" onclick="setSlideView(${i},'body')">上身</button>
        <button role="tab" aria-selected="${v === 'items'}" onclick="setSlideView(${i},'items')">单品</button>
      </div>
    </div>
    <button class="live-btn ${v === 'live' ? 'on' : ''}" id="live-btn-${i}" onclick="toggleSlideLive(${i})">${appIcons.camera}<span>${v === 'live' ? '结束实时试穿' : '实时试穿 · 打开镜头看自己'}</span></button>
    ${uSays(look.reason)}
    <div class="look-items">${look.items.map(t => `<span>${escapeText(t)}</span>`).join('')}</div>
  </section>`;
};

function setSlideView(i, v) {
  if (appState.slideView[i] === 'live') stopSlideLive(i);
  appState.slideView[i] = v;
  const m = document.getElementById('lm-' + i); if (!m) return;
  m.className = `look-media view-${v}`;
  m.querySelectorAll('.lm-seg button').forEach(b => b.setAttribute('aria-selected', String(b.textContent === (v === 'body' ? '上身' : '单品'))));
}
async function toggleSlideLive(i) {
  if (appState.slideView[i] === 'live') { stopSlideLive(i); setSlideView(i, appState.styleLooks[i]?.tryOn ? 'body' : 'items'); return; }
  // only one camera at a time
  Object.keys(appState.slideView).forEach(k => { if (appState.slideView[k] === 'live') { stopSlideLive(+k); setSlideView(+k, 'body'); } });
  stopLive();
  appState.slideView[i] = 'live';
  const m = document.getElementById('lm-' + i); const btn = document.getElementById('live-btn-' + i);
  if (!m) return;
  m.className = 'look-media view-live';
  const look = appState.styleLooks[i] || {};
  const pane = m.querySelector('.lm-live');
  pane.innerHTML = `<div class="live-frame"><video autoplay playsinline muted></video><div class="live-hud"><span class="live-dot">LIVE</span><span>正在打开摄像头…</span></div><img class="live-garment" src="${look.top || look.outer || ''}" alt=""></div>`;
  if (btn) { btn.classList.add('on'); btn.querySelector('span').textContent = '结束实时试穿'; }
  try {
    liveStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
    if (appState.slideView[i] !== 'live') return stopLive();
    pane.querySelector('video').srcObject = liveStream;
    pane.querySelector('.live-hud span:last-child').textContent = '镜头预览 · 实时换装待接入';
  } catch (e) {
    pane.innerHTML = `<div class="try-empty">${uMark(40)}<b>没有拿到摄像头权限</b><small>在浏览器地址栏允许摄像头后再点一次</small></div>`;
  }
}
function stopSlideLive(i) {
  stopLive();
  const m = document.getElementById('lm-' + i); if (m) m.querySelector('.lm-live').innerHTML = '';
  const btn = document.getElementById('live-btn-' + i); if (btn) { btn.classList.remove('on'); btn.querySelector('span').textContent = '实时试穿 · 打开镜头看自己'; }
}

/* flow: drop the separate try-on step and renumber */
const _stylingPage19 = stylingPage;
stylingPage = function () {
  appState.tryOpen = false;
  let html = _stylingPage19();
  html = html.replace(/<section class="flow-step [^"]*"\s*><div class="flow-label">(?:<span class="now">Now<\/span>)?<b>④ 看上身效果<\/b><\/div>[\s\S]*?<\/section>/, '');
  const hasResult = appState.styleStep === 'result' && appState.styleLooks.length && !appState.genLoading;
  if (hasResult) {
    // ③ stays current until the look is worn; ④ (wear) is the next action
    html = html.replace(/<section class="flow-step (done|current)"\s*id="step-go"><div class="flow-label">(?:<span class="now">Now<\/span>)?/, `<section class="flow-step ${appState.flowWorn ? 'done' : 'current'}" id="step-go"><div class="flow-label">${appState.flowWorn ? '' : '<span class="now">Now</span>'}`);
    html = html.replace(/<section class="flow-step [^"]*"\s*><div class="flow-label">(?:<span class="now">Now<\/span>)?<b>⑤ 穿这套，写进手账<\/b>/, `<section class="flow-step ${appState.flowWorn ? 'done' : 'todo'}"><div class="flow-label"><b>④ 穿这套，写进手账</b>`);
  }
  return html;
};
// new results reset the per-card views; leaving the page stops the camera
const _gen19 = generateLooks;
generateLooks = function () { appState.slideView = {}; stopLive(); _gen19(); };

appRender();
