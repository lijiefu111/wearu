// WEARU v018 — try-on opens inline in step ④ (digital human | live camera), following the selected look.

const tryBtn = `<button class="ghost-button" onclick="appState.flowTried=true;openTryOn();setTimeout(softRender,60)">查看上身效果</button>`;
function activeLook() { return (appState.styleLooks || [])[appState.styleActive || 0] || {}; }
function tryDigitalHTML() {
  const l = activeLook();
  return l.tryOn
    ? `<div class="tryon-result inline"><img id="inline-try-img" src="${l.tryOn}" alt="${escapeText(l.title || '')} 上身效果"><p class="micro">「${escapeText(l.title || '')}」· 效果演示 · 仅供参考、非真实合身</p></div>`
    : `<div class="try-empty">${uMark(44)}<b>这套暂时没有数字人试穿</b><small>可以切到「实时镜头」，或换一套看看</small></div>`;
}
function tryPanel() {
  if (!appState.tryOpen) return `<button class="ghost-button" onclick="openInlineTry()">查看上身效果</button>`;
  const live = appState.tryMode === 'live';
  return `<div class="try-inline">
    <div class="tryon-switch"><button class="${live ? '' : 'on'}" id="tryon-tab-digital" onclick="setTryDigital()">数字人试穿</button><button class="${live ? 'on' : ''}" id="tryon-tab-live" onclick="setTryLive()">实时镜头</button></div>
    <div id="tryon-stage">${live ? '' : tryDigitalHTML()}</div>
    <p class="try-hint">左右滑上面的搭配，这里会跟着换</p>
  </div>`;
}
function openInlineTry() {
  appState.tryOpen = true; appState.flowTried = true; appState.tryMode = 'digital';
  softRender();
  document.querySelector('.try-inline')?.scrollIntoView({ block: 'center' });
}
function setTryDigital() {
  stopLive(); appState.tryMode = 'digital';
  document.getElementById('tryon-tab-digital')?.classList.add('on');
  document.getElementById('tryon-tab-live')?.classList.remove('on');
  const st = document.getElementById('tryon-stage'); if (st) st.innerHTML = tryDigitalHTML();
}
function setTryLive() {
  appState.tryMode = 'live';
  const l = activeLook();
  startLiveTryOn(l.top || l.outer || '');
}

const _stylingPage18 = stylingPage;
stylingPage = function () {
  const html = _stylingPage18();
  return html.includes(tryBtn) ? html.replace(tryBtn, tryPanel()) : html;
};
// follow the carousel
const _onLookScroll18 = onLookScroll;
onLookScroll = function () {
  const before = appState.styleActive;
  _onLookScroll18();
  if (appState.tryOpen && appState.tryMode !== 'live' && appState.styleActive !== before) {
    const st = document.getElementById('tryon-stage'); if (st) st.innerHTML = tryDigitalHTML();
  }
};
// new results or leaving the page close the panel and the camera
const _generate18 = generateLooks;
generateLooks = function () { appState.tryOpen = false; stopLive(); _generate18(); };
const _switchTab18 = switchTab;
switchTab = function (tab) { stopLive(); if (tab !== 'styling') appState.tryOpen = false; _switchTab18(tab); };
const _wear18 = wearThis;
wearThis = function () { stopLive(); appState.tryOpen = false; _wear18(); };
const _appRender18 = appRender;
appRender = function () { _appRender18(); if (typeof liveStream !== 'undefined' && liveStream && !document.getElementById('live-video')) stopLive(); };

appRender();
