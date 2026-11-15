// WEARU v033 — sheets match the phone width · no "先别买" card in 懂你 · wardrobe tiles: 🔥/🧊 top-left, worn count bottom-right

/* 懂你: drop the duplicate-purchase card */
const _shopping33 = shoppingPage;
shoppingPage = function () { return _shopping33().replace(/<section class="dup-warning">[\s\S]*?<\/section>/, ''); };

/* wardrobe tiles */
const _garmentTile33 = garmentTile;
garmentTile = function (item) {
  const h = wearHeat();
  const heat = h.hot.has(item.id) ? '<span class="tile-heat hot" title="近期常穿">🔥</span>' : h.cold(item.id) ? '<span class="tile-heat cold" title="30 天没穿">🧊</span>' : '';
  return _garmentTile33(item).replace(/<span class="wear-badge">穿过 (\d+) 次<\/span>/, `${heat}<span class="wear-badge v33">穿过 $1 次</span>`);
};

appRender();
