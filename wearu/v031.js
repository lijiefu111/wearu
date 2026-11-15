// WEARU v031 — review fixes:
// 1 home card: drop the subtitle · 2 community: like straight from the card (in place, no re-render), no "用我的衣服搭一套类似的",
//   every item shows how it fits YOUR wardrobe (pairs with N of your items / you already own a near-twin) · 3 diagnosis: label new vs owned items

/* 1 */
const _appRender31 = appRender;
appRender = function () {
  _appRender31();
  document.querySelectorAll('.today-hero .today-copy em').forEach(e => e.remove());
};

/* 2a. like in place */
function likeCount(i) { const p = communityPosts()[i]; return p ? p.likes + (appState.liked[i] ? 1 : 0) : 0; }
function toggleLike(i) {
  appState.liked[i] = !appState.liked[i];
  const on = !!appState.liked[i], n = likeCount(i);
  document.querySelectorAll(`[data-like="${i}"]`).forEach(el => {
    el.classList.toggle('on', on);
    const c = el.querySelector('.lk-n'); if (c) c.textContent = n;
    const h = el.querySelector('.lk-h'); if (h) h.textContent = on ? '♥' : '♡';
    const t = el.querySelector('.lk-t'); if (t) t.textContent = on ? '已喜欢' : '喜欢';
    el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
  });
}
const _miniPage31 = miniPage;
miniPage = function (p, i) {
  const on = !!appState.liked[i];
  return _miniPage31(p, i).replace(/<em>[♥♡] \d+<\/em>(<\/span>\s*<\/button>)/,
    `<span class="cj-like ${on ? 'on' : ''}" data-like="${i}" role="button" aria-label="喜欢" onclick="event.stopPropagation();toggleLike(${i})"><b class="lk-h">${on ? '♥' : '♡'}</b><span class="lk-n">${likeCount(i)}</span></span>$1`);
};

/* 2b. how an item fits your wardrobe */
const fitColors = ['燕麦', '酒红', '卡其', '黑', '白', '灰', '蓝', '棕', '米', '红', '绿', '粉', '驼', '银', '黄', '紫'];
const neutralColors = ['黑', '白', '灰', '米', '燕麦', '卡其', '驼', '棕', '蓝', '银'];
function itemCategory(name) {
  if (/鞋|靴/.test(name)) return 'shoes';
  if (/包/.test(name)) return 'bags';
  if (/裤|裙/.test(name)) return 'bottoms';
  if (/手镯|项链|手链|帽|抓夹|发夹|围巾|戒指|耳/.test(name)) return 'accessories';
  if (/外套|夹克|大衣|开衫|风衣|西装$|西装外套/.test(name)) return 'outer';
  return 'tops';
}
const colorOf = n => fitColors.find(c => n.includes(c)) || '';
const pairWith = { tops: ['bottoms', 'shoes', 'outer'], bottoms: ['tops', 'shoes', 'outer'], outer: ['tops', 'bottoms'], shoes: ['bottoms', 'tops'], bags: ['tops', 'bottoms', 'outer'], accessories: ['tops', 'outer'] };
function wardrobeFit(name) {
  const cat = itemCategory(name), col = colorOf(name), tail = name.slice(-2);
  const twin = appGarments.find(g => g.category === cat && colorOf(g.name) === col && col && g.name.slice(-2) === tail);
  if (twin) return { kind: 'twin', twin };
  const okColor = g => { const c = colorOf(g.name); return !c || !col || neutralColors.includes(c) || neutralColors.includes(col); };
  const pals = appGarments.filter(g => (pairWith[cat] || []).includes(g.category) && okColor(g)).sort((a, b) => (b.worn || 0) - (a.worn || 0));
  return pals.length >= 3 ? { kind: 'good', pals } : { kind: 'weak', pals };
}
function fitBadge(name) {
  const f = wardrobeFit(name);
  return f.kind === 'twin' ? '<em class="fit twin">你已有类似</em>' : f.kind === 'good' ? `<em class="fit good">能搭你 ${f.pals.length} 件</em>` : '<em class="fit weak">和衣橱不太搭</em>';
}
const _openPost31 = openJournalPost;
openJournalPost = function (i) {
  _openPost31(i);
  const sheet = document.querySelector('.cj-sheet'); if (!sheet) return;
  sheet.querySelectorAll('.cj-tag').forEach(t => { const n = t.querySelector('span')?.textContent || ''; t.querySelector('b')?.insertAdjacentHTML('beforebegin', fitBadge(n)); });
  const lbl = sheet.querySelector('.sb-label'); if (lbl) lbl.innerHTML = '这一身穿了 ↓ 先看看和你的衣橱搭不搭';
  const acts = sheet.querySelector('.cj-actions');
  if (acts) { const on = !!appState.liked[i]; acts.outerHTML = `<div class="cj-actions one"><button class="ghost-button cj-like-big ${on ? 'on' : ''}" data-like="${i}" onclick="toggleLike(${i})"><b class="lk-h">${on ? '♥' : '♡'}</b> <span class="lk-t">${on ? '已喜欢' : '喜欢'}</span> · <span class="lk-n">${likeCount(i)}</span></button></div>`; }
};
const _openSimilar31 = openSimilarSheet;
openSimilarSheet = function (name, query, thumb) {
  _openSimilar31(name, query, thumb);
  const hero = document.querySelector('.similar-sheet .similar-hero'); if (!hero) return;
  const f = wardrobeFit(name);
  let html;
  if (f.kind === 'twin') {
    html = `<section class="fit-box twin"><p class="fit-head">🧊 先别买：你衣橱里已经有很像的</p><div class="fit-row"><figure><img src="${thumb}" alt=""><figcaption>${escapeText(name)}</figcaption></figure><span class="fit-eq">≈</span><figure><img src="${f.twin.image}" alt=""><figcaption>你的「${escapeText(f.twin.name)}」· 穿过 ${f.twin.worn || 0} 次</figcaption></figure></div><p class="fit-note">把预算留给真正的衣橱缺口。</p></section>`;
  } else {
    const top = (pairWith[itemCategory(name)] || []).map(c => f.pals.find(g => g.category === c)).filter(Boolean).slice(0, 3);
    html = `<section class="fit-box ${f.kind}"><p class="fit-head">${f.kind === 'good' ? `✓ 能和你衣橱里 ${f.pals.length} 件搭配` : '△ 和你现在的衣橱不太搭'}</p>
      ${top.length ? `<div class="fit-row"><figure class="new"><img src="${thumb}" alt=""><figcaption>它</figcaption></figure><span class="fit-eq">＋</span>${top.map(g => `<figure><img src="${g.image}" alt=""><figcaption>${escapeText(g.name)}</figcaption></figure>`).join('')}</div>` : ''}
      <p class="fit-note">${f.kind === 'good' ? '这几件是你最常穿的，和它在一起最容易穿出门。' : '能配的单品太少，买回来可能会被冷落。先收藏看看。'}</p></section>`;
  }
  hero.insertAdjacentHTML('afterend', html);
};

/* 3. diagnosis: the "if" look = the new item + what you already own */
const afterOwned = appGender === 'male' ? {
  '黑色机能斜挎包': ['wd-27', 'wd-04', 'wd-15', 'wd-29'], '复古厚底板鞋': ['wd-10', 'wd-20'],
  '黑色重磅基础 Tee': ['wd-11', 'wd-24', 'wd-29'], '水洗丹宁外套': ['wd-26', 'wd-32', 'wd-36']
} : { '黑色玛丽珍鞋': ['F32', 'F02', 'F24', 'F20'], '深棕色针织背心': ['F18', 'F23', 'F19'] };
const _whatIf31 = whatIfPair;
whatIfPair = function (r, mo) {
  const own = (afterOwned[r.name] || []).map(id => appGarments.find(g => g.id === id)).filter(Boolean);
  if (!own.length) return _whatIf31(r, mo);
  const mix = `<div class="wi-mix"><span class="wi-lbl">右边这套 =</span><span class="wi-th wi-new" title="${escapeText(r.name)}"><img src="${r.img}" alt=""><i>新</i></span><b>＋</b><span class="wi-lbl">你已有的</span>${own.map(g => `<span class="wi-th" title="${escapeText(g.name)}"><img src="${g.image}" alt="${escapeText(g.name)}"></span>`).join('')}</div>`;
  return _whatIf31(r, mo) + mix;
};

const _community31 = communityJournal;
communityJournal = function () { return _community31().replace('翻翻大家的手账 · 看上哪件，点它就能找同款', '翻翻大家的手账 · 看上哪件，先看看和你的衣橱搭不搭'); };

appRender();
