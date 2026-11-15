// WEARU v038 — 懂你 on the free plan: only the unlock card, nothing blurred behind it and nothing to scroll.
// After subscribing, the full analysis appears.

const _persona38 = personaSummary;
personaSummary = function () {
  const html = _persona38();
  const m = html.match(/^<div class="plus-blur">([\s\S]*)<div class="plus-over">/);
  return m ? m[1] : html; // the whole page is gated below, so no blur layer
};
const _shopping38 = shoppingPage;
shoppingPage = function () {
  if (isPlus()) return _shopping38();
  return `<main class="app-page insight-page plus-gated">
    ${pageTop('懂你')}
    <section class="plus-gate">
      ${uMark(110)}
      <h2>进阶衣橱分析是 Plus 功能</h2>
      <p>穿着频率 · 闲置单品 · 衣橱缺口与新搭配</p>
      <button class="coral-button" onclick="openPlus('insight')">解锁 Plus</button>
    </section>
  </main>`;
};
appRender();
