// WEARU v034 — 添加衣服: ① 订单截图（批量） → ② 商品链接 → ③ 拍照 / 相册

openImportSheet = function (preselected = '') {
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()"><section class="import-sheet v34">
    <div class="modal-handle"></div><h2>添加衣服</h2>
    <button class="imp-main" onclick="startOrderShot()">${appIcons.upload}<span><b>上传订单截图</b><small>淘宝 / 京东 / 得物的「我的订单」，一次识别多件</small></span><em>推荐</em></button>
    <button onclick="showLinkSheet('${preselected}')">${appIcons.link}<span><b>粘贴商品链接</b><small>在购物 App 里点「分享 → 复制链接」</small></span></button>
    <button onclick="document.getElementById('camera-file').click()">${appIcons.camera}<span><b>拍照 / 从相册选</b><small>自动抠图、统一成衣橱里的样子</small></span></button>
    <input id="camera-file" type="file" accept="image/*" hidden onchange="previewImport(event,'${preselected}')">
  </section></div>`);
};

/* demo of the order-screenshot path: recognise → confirm several items at once */
function orderShotItems() {
  if (appGender === 'male') {
    return [['male/rec-tee.webp', 'tops', '黑色重磅纯棉 T'], ['male/rec-denim.webp', 'outer', '水洗丹宁夹克'], ['male/rec-shoes.webp', 'shoes', '米白厚底板鞋']];
  }
  return [['female/F12.webp', 'tops', '订单里的上衣'], ['female/F31.webp', 'accessories', '订单里的配饰'], [(shopRecs[0] || {}).img || 'female/F12.webp', 'shoes', '黑色玛丽珍鞋']];
}
function startOrderShot() {
  const modal = document.getElementById('app-modal'); if (!modal) return;
  modal.innerHTML = `<section class="import-sheet v34"><div class="modal-handle"></div><div class="inline-loading">${uMark(84, 'u-bounce')}<b>正在识别订单截图…</b></div></section>`;
  setTimeout(() => {
    const items = orderShotItems();
    appState.orderPick = items.map(() => true);
    const m = document.getElementById('app-modal'); if (!m) return;
    m.innerHTML = `<section class="import-sheet v34"><div class="modal-handle"></div><h2>识别到 ${items.length} 件</h2>
      <div class="order-list">${items.map(([img, cat, name], i) => `<label class="order-item"><input type="checkbox" checked onchange="appState.orderPick[${i}]=this.checked"><img src="${img}" alt=""><span><b>${escapeText(name)}</b><small>${appCategories.find(c => c.id === cat)?.name || ''}</small></span></label>`).join('')}</div>
      <button class="dark-button" onclick="finishOrderShot()">放进我的衣橱</button></section>`;
  }, 1200);
}
function finishOrderShot() {
  const items = orderShotItems(); let n = 0;
  items.forEach(([image, category, name], i) => {
    if (!appState.orderPick[i]) return;
    appGarments.push({ id: 'o-' + Date.now() + i, category, name, detail: '订单导入', image, worn: 0 }); n++;
  }); // demo only: not saved, so the demo resets on reload
  closeAppModal(); appRender();
  appToast(n ? `已放进衣橱 ${n} 件` : '没有选择单品');
}

appRender();
