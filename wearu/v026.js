// WEARU v026 — the before/after in 懂你 is two digital humans: same model, same pose, only the gap item differs.
const beforeShots = appGender === 'male' ? {
  '黑色机能斜挎包': 'male/before-bag.webp', '复古厚底板鞋': 'male/before-shoes.webp',
  '黑色重磅基础 Tee': 'male/before-tee.webp', '水洗丹宁外套': 'male/before-denim.webp'
} : { '黑色玛丽珍鞋': 'female/before-maryjane.webp', '深棕色针织背心': 'female/before-vest.webp' };
const _whatIfPair26 = whatIfPair;
whatIfPair = function (r, mo) {
  const html = _whatIfPair26(r, mo);
  const src = beforeShots[r.name]; if (!src) return html;
  return html.replace(/<figure class="wi-then"><div class="wi-img">[\s\S]*?<\/div><figcaption>/, `<figure class="wi-then"><div class="wi-img wi-human"><img src="${src}" alt="那天的穿搭 · 数字人还原"><span class="wi-demo">效果演示</span></div><figcaption>`);
};
appRender();
