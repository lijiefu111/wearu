// WEARU v032 — review fixes:
// 1 stacked sheets close front-first · 2 找同款 = "how it looks on you with your clothes" (digital-human try-on) then platforms
// 3 drop the new+owned row in diagnosis · 4 trim small hint texts

/* 1. close the top-most sheet first */
closeAppModal = function () {
  const all = document.querySelectorAll('.modal-backdrop');
  const top = all[all.length - 1]; if (!top) return;
  const sheet = top.querySelector('section');
  if (sheet) { sheet.style.transition = 'transform .2s ease, opacity .2s ease'; sheet.style.transform = 'translateY(24px)'; sheet.style.opacity = '0'; }
  top.style.transition = 'opacity .2s ease'; top.style.opacity = '0';
  setTimeout(() => top.remove(), 200);
};

/* 3. no new+owned row */
const _whatIf32 = whatIfPair;
whatIfPair = function (r, mo) { return _whatIf32(r, mo).replace(/<div class="wi-mix">[\s\S]*?<\/div>$/, ''); };

/* category fixes for community items */
itemCategory = function (name) {
  if (/鞋|靴/.test(name)) return 'shoes';
  if (/包/.test(name)) return 'bags';
  if (/裤|裙|牛仔$/.test(name)) return 'bottoms';
  if (/手镯|项链|手链|帽|抓夹|发夹|围巾|丝巾|戒指|耳/.test(name)) return 'accessories';
  if (/外套|夹克|大衣|开衫|风衣|西装外套/.test(name)) return 'outer';
  return 'tops';
};
// hand-picked partners from the user's wardrobe (what a stylist would reach for), with a matching try-on image
const fitLooks = appGender === 'male' ? {
  '橄榄半拉链衬衫': ['m01', ['wd-24', 'wd-42']], '白色阔腿裤': ['m02', ['wd-26', 'wd-29']], '拼色橄榄球 Polo': ['m03', ['wd-20', 'wd-40']],
  '水洗直筒牛仔': ['m04', ['wd-10', 'wd-42', 'wd-27']], '蓝色 V 领针织': ['m05', ['wd-15', 'wd-40']], '牛仔拼接短袖衬衫': ['m06', ['wd-06', 'wd-29']],
  '印花丝巾': ['m07', ['wd-04', 'wd-15', 'wd-40']], '做旧印花短袖 T': ['m08', ['wd-20', 'wd-36']], '迷彩工装裤': ['m09', ['wd-04', 'wd-42']]
} : {
  '漏肩垂褶上衣': ['f01', ['F16', 'F30', 'F08']], '白色阔腿裤': ['f02', ['F28', 'F30']], '水洗直筒牛仔': ['f03', ['F18', 'F21']], '灰色阔腿裤': ['f04', ['F11', 'F19']]
};
function fitPartners(name) {
  const f = wardrobeFit(name); if (f.kind !== 'good') return [];
  const cur = fitLooks[name];
  if (cur) return cur[1].map(id => appGarments.find(g => g.id === id)).filter(Boolean);
  return (pairWith[itemCategory(name)] || []).map(c => f.pals.find(g => g.category === c)).filter(Boolean).slice(0, 3);
}

/* 2. 找同款 → 放进你的衣橱看看 */
openSimilarSheet = function (name, query, thumb) {
  const q = encodeURIComponent(query || name);
  const base = 200 + (name.length * 37) % 300;
  const shops = [['淘宝', '同款多 · 价格带广', Math.max(89, base - 120), 'https://s.taobao.com/search?q=' + q],
    ['天猫', '品牌旗舰 · 质感好', base + 260, 'https://list.tmall.com/search_product.htm?q=' + q],
    ['京东', '次日达 · 售后省心', base + 120, 'https://search.jd.com/Search?keyword=' + q]];
  const shopList = `<p class="fs-sub">想买的话</p>${shops.map(([s, t, p, u]) => `<button class="similar-item" onclick="window.open('${u}','_blank');appToast('已跳转 ${s} 搜索同款')"><span><b>${s}</b><small>${t}</small></span><i>约 ¥${p} ›</i></button>`).join('')}`;
  const f = wardrobeFit(name);
  let body;
  if (f.kind === 'twin') {
    body = `<section class="fs-fit twin"><p class="fit-head">🧊 你衣橱里已经有很像的，先别买</p>
      <div class="fit-row"><figure><img src="${thumb}" alt=""><figcaption>${escapeText(name)}</figcaption></figure><span class="fit-eq">≈</span><figure><img src="${f.twin.image}" alt=""><figcaption>你的「${escapeText(f.twin.name)}」</figcaption></figure></div></section>`;
  } else if (f.kind === 'good') {
    const pals = fitPartners(name);
    const img = fitLooks[name] ? `${appGender}/fit-${fitLooks[name][0]}.webp` : '';
    body = `<section class="fs-fit good"><p class="fit-head">✓ 能和你衣橱里 ${f.pals.length} 件搭配</p>
      ${img ? `<div class="fs-try"><img src="${img}" alt="${escapeText(name)} 搭你的衣服"><span class="lm-tag">效果演示 · 仅供参考</span></div>` : ''}
      <div class="fs-with"><span class="fs-new"><img src="${thumb}" alt=""><i>它</i></span><b>＋</b>${pals.map(g => `<span title="${escapeText(g.name)}"><img src="${g.image}" alt="${escapeText(g.name)}"></span>`).join('')}<small>${pals.map(g => escapeText(g.name)).join(' · ')}</small></div></section>`;
  } else {
    body = `<section class="fs-fit weak"><p class="fit-head">△ 和你现在的衣橱不太搭</p><p class="fit-note">能配的单品太少，买回来可能会被冷落。</p></section>`;
  }
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()">
    <section class="similar-sheet fs-v32"><div class="modal-handle"></div>
      <h2>「${escapeText(name)}」放进你的衣橱</h2>
      ${body}${shopList}
    </section></div>`);
};

/* 4. trim small hint texts */
const _appRender32 = appRender;
appRender = function () {
  _appRender32();
  const kill = (sel, test) => document.querySelectorAll(sel).forEach(e => { if (!test || test(e)) e.remove(); });
  document.querySelectorAll('.section-head span').forEach(s => { s.textContent = s.textContent.replace(' · 点品类查看', ''); });
  kill('.wardrobe-pick-btn.empty small');                      // 不选也行，U 会自己从衣橱里挑
  kill('.inline-loading small');                                // 结合天气、场合和你常穿的搭配
  kill('.jf-tip, .ghost-nav');                                  // 每次「穿这套」，都会写进这本手账
  kill('.sb-u');                                                // U 记下了这一天
  kill('.cj-intro');                                            // 翻翻大家的手账…
  kill('.wi-product small');                                    // repeats the diagnosis note
  const p = document.querySelector('.diag-head p');
  if (p) p.textContent = p.textContent.replace(/。一次看一个。$/, '。');
};
const _openPost32 = openJournalPost;
openJournalPost = function (i) { _openPost32(i); const l = document.querySelector('.cj-sheet .sb-label'); if (l) l.textContent = '这一身穿了'; };
const _openPicker32 = openStylePicker;
openStylePicker = function () { _openPicker32(); document.querySelector('.heat-legend')?.remove(); };

appRender();
