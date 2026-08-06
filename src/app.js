// Product demo v3: wardrobe, styling, diary, and diagnosis.
const appAssets = {
  dada: 'images/dada-hero-peach-v3.png',
  iconTops: 'images/icon-tops-v2.png',
  iconBottoms: 'images/icon-bottoms-v2.png',
  iconOuter: 'images/icon-outer-v2.png',
  iconBags: 'images/icon-bags-v2.png',
  iconShoes: 'images/icon-shoes-v2.png',
  iconAccessories: 'images/icon-accessories-v2.png'
};

const appCategories = [
  { id: 'tops', name: '上衣', icon: appAssets.iconTops },
  { id: 'bottoms', name: '下装', icon: appAssets.iconBottoms },
  { id: 'outer', name: '外套', icon: appAssets.iconOuter },
  { id: 'bags', name: '包袋', icon: appAssets.iconBags },
  { id: 'shoes', name: '鞋履', icon: appAssets.iconShoes },
  { id: 'accessories', name: '首饰', icon: appAssets.iconAccessories }
];

// 真实衣橱（用户提供、经清洗抠图的单品，男生街头风）
const defaultGarments = [
  // 上衣
  { id: 'wd-01', category: 'tops', name: '酒红印花衬衫', detail: '短袖 · 配窄领带', image: 'images/wd-01.png', worn: 9 },
  { id: 'wd-04', category: 'tops', name: '炭灰做旧印花 T', detail: '短袖 · 街头做旧', image: 'images/wd-04.png', worn: 14 },
  { id: 'wd-05', category: 'tops', name: '小狗刺绣衬衫', detail: '短袖 · 拼色领带领', image: 'images/wd-05.png', worn: 7 },
  { id: 'wd-08', category: 'tops', name: '粉色格纹衬衫', detail: '短袖 · 清爽格纹', image: 'images/wd-08.png', worn: 5 },
  { id: 'wd-10', category: 'tops', name: '美式印花 T', detail: '米白 · 复古字母', image: 'images/wd-10.png', worn: 11 },
  { id: 'wd-16', category: 'tops', name: '印花无袖背心', detail: '米色 · 做旧毛边', image: 'images/wd-16.png', worn: 8 },
  { id: 'wd-18', category: 'tops', name: '黄色宽松 T', detail: '短袖 · 亮色基础', image: 'images/wd-18.png', worn: 6 },
  { id: 'wd-23', category: 'tops', name: '做旧无袖背心', detail: '白色 · 手写印花', image: 'images/wd-23.png', worn: 5 },
  { id: 'wd-26', category: 'tops', name: '黄绿条纹 T', detail: '短袖 · 卡通刺绣', image: 'images/wd-26.png', worn: 7 },
  { id: 'wd-28', category: 'tops', name: '黄条纹卡通 T', detail: '短袖 · 漫画印花', image: 'images/wd-28.png', worn: 6 },
  // 下装
  { id: 'wd-06', category: 'bottoms', name: '小狗刺绣阔腿裤', detail: '黑色 · 满印刺绣', image: 'images/wd-06.png', worn: 10 },
  { id: 'wd-09', category: 'bottoms', name: '酒红格纹五分裤', detail: '阔腿 · 复古格纹', image: 'images/wd-09.png', worn: 4 },
  { id: 'wd-15', category: 'bottoms', name: '工装长裤', detail: '米灰 · 多袋阔腿', image: 'images/wd-15.png', worn: 12 },
  { id: 'wd-20', category: 'bottoms', name: '橄榄阔腿裤', detail: '针织腰 · 垂感', image: 'images/wd-20.png', worn: 9 },
  { id: 'wd-24', category: 'bottoms', name: '阔腿卫裤', detail: '花灰 · 拼格腰头', image: 'images/wd-24.png', worn: 8 },
  { id: 'wd-32', category: 'bottoms', name: '破洞阔腿牛仔', detail: '橄榄 · 做旧水洗', image: 'images/wd-32.png', worn: 7 },
  // 外套
  { id: 'wd-02', category: 'outer', name: '蓝紫拉链卫衣', detail: '连帽 · 照片印花', image: 'images/wd-02.png', worn: 6 },
  { id: 'wd-11', category: 'outer', name: '照片印花夹克', detail: '灰色 · 撞色领', image: 'images/wd-11.png', worn: 5 },
  { id: 'wd-27', category: 'outer', name: '棕褐工装夹克', detail: '灯芯绒领 · 复古', image: 'images/wd-27.png', worn: 8 },
  // 鞋履
  { id: 'wd-29', category: 'shoes', name: '麂皮穆勒鞋', detail: '棕色 · 蓝底', image: 'images/wd-29.png', worn: 9 },
  { id: 'wd-36', category: 'shoes', name: '印花穆勒鞋', detail: '蓝色 · 满印图腾', image: 'images/wd-36.png', worn: 6 },
  // 配饰
  { id: 'wd-17', category: 'accessories', name: '做旧棒球帽', detail: '灰色 · 复古水洗', image: 'images/wd-17.png', worn: 10 },
  { id: 'wd-22', category: 'accessories', name: '骷髅银链手链', detail: '银色 · 街头单品', image: 'images/wd-22.png', worn: 7 },
  { id: 'wd-31', category: 'accessories', name: '印花领带', detail: '黑色 · 涂鸦图案', image: 'images/wd-31.png', worn: 3 }
];
const savedGarments = (() => { try { return JSON.parse(localStorage.getItem('baida-garments-v3') || 'null'); } catch { return null; } })();
const removedGarments = (() => { try { return new Set(JSON.parse(localStorage.getItem('baida-removed-v1') || '[]')); } catch { return new Set(); } })();
let appGarments;
if (savedGarments && savedGarments.length) {
  // keep user's data, merge in new defaults, but never re-add ones the user deleted
  const ids = new Set(savedGarments.map(g => g.id));
  appGarments = savedGarments.concat(defaultGarments.filter(g => !ids.has(g.id) && !removedGarments.has(g.id)));
} else {
  appGarments = defaultGarments.filter(g => !removedGarments.has(g.id));
}
function saveGarments() { localStorage.setItem('baida-garments-v3', JSON.stringify(appGarments)); }
function categoryCount(id) { return appGarments.filter(g => g.category === id).length; }

const appScenes = [
  { id: 'commute', name: '通勤' },
  { id: 'daily', name: '日常' },
  { id: 'date', name: '约会' },
  { id: 'party', name: '聚会' },
  { id: 'travel', name: '出行' },
  { id: 'sport', name: '运动' }
];
function sceneName(id) { return (appScenes.find(s => s.id === id) || {}).name || id; }

// Look templates: three distinct male street-style looks built from the real wardrobe.
const lookTemplates = [
  {
    id: 'look-utility', title: '复古工装街头',
    reason: '棕褐工装夹克配小狗刺绣衬衫，米灰工装裤和棕色穆勒鞋收住复古街头感，帽子点睛，日常出街最稳。',
    outer: 'images/wd-27.png', top: 'images/wd-05.png', bottom: 'images/wd-15.png',
    shoes: 'images/wd-29.png', bag: 'images/wd-17.png',
    outerId: 'wd-27', topId: 'wd-05', bottomId: 'wd-15', shoesId: 'wd-29', bagId: 'wd-17',
    tryOn: 'images/tryon-look-a-v1.png',
    items: ['棕褐工装夹克', '小狗刺绣衬衫', '工装长裤', '麂皮穆勒鞋', '做旧棒球帽']
  },
  {
    id: 'look-stripe', title: '条纹丹宁街头',
    reason: '蓝紫拉链卫衣叠黄绿条纹 T，橄榄破洞牛仔配蓝色印花穆勒鞋，撞色又和谐，骷髅手链加一点态度。',
    outer: 'images/wd-02.png', top: 'images/wd-26.png', bottom: 'images/wd-32.png',
    shoes: 'images/wd-36.png', bag: 'images/wd-22.png',
    outerId: 'wd-02', topId: 'wd-26', bottomId: 'wd-32', shoesId: 'wd-36', bagId: 'wd-22',
    tryOn: 'images/tryon-look-b-v1.png',
    items: ['蓝紫拉链卫衣', '黄绿条纹 T', '破洞阔腿牛仔', '印花穆勒鞋', '骷髅手链']
  },
  {
    id: 'look-print', title: '印花休闲',
    reason: '灰色照片印花夹克配炭灰做旧 T，橄榄阔腿裤利落，棕色穆勒鞋和涂鸦领带点睛，松弛但有细节。',
    outer: 'images/wd-11.png', top: 'images/wd-04.png', bottom: 'images/wd-20.png',
    shoes: 'images/wd-29.png', bag: 'images/wd-31.png',
    outerId: 'wd-11', topId: 'wd-04', bottomId: 'wd-20', shoesId: 'wd-29', bagId: 'wd-31',
    tryOn: 'images/tryon-look-c-v1.png',
    items: ['照片印花夹克', '炭灰做旧 T', '橄榄阔腿裤', '麂皮穆勒鞋', '涂鸦领带']
  }
];

const defaultProfile = { height: '', size: 'M', bodyShape: '', styles: [], constraints: [], goals: '' };
const savedProfile = (() => { try { return JSON.parse(localStorage.getItem('baida-profile') || 'null'); } catch { return null; } })();
const savedAvatar = (() => { try { return localStorage.getItem('baida-avatar') || ''; } catch { return ''; } })();

// Diary records persisted to localStorage. Seed with the recent month so the persona summary is meaningful.
function dateStr(offsetDays) { const d = new Date(); d.setDate(d.getDate() - offsetDays); return d.toISOString().slice(0, 10); }
const seedDiary = [
  { date: dateStr(1), scene: 'commute', title: '复古工装街头', reason: '工装夹克 + 小狗刺绣衬衫 + 工装裤。', items: ['棕褐工装夹克', '小狗刺绣衬衫', '工装长裤', '麂皮穆勒鞋'], images: ['images/wd-27.png', 'images/wd-05.png', 'images/wd-15.png', 'images/wd-29.png'], feel: '很舒服', temp: 24 },
  { date: dateStr(3), scene: 'daily', title: '条纹丹宁街头', reason: '蓝拉链卫衣配条纹 T 和破洞牛仔。', items: ['蓝紫拉链卫衣', '黄绿条纹 T', '破洞阔腿牛仔', '印花穆勒鞋'], images: ['images/wd-02.png', 'images/wd-26.png', 'images/wd-32.png', 'images/wd-36.png'], feel: '回头率高', temp: 22 },
  { date: dateStr(5), scene: 'commute', title: '印花休闲', reason: '照片夹克配做旧印花 T。', items: ['照片印花夹克', '炭灰做旧 T', '橄榄阔腿裤', '麂皮穆勒鞋'], images: ['images/wd-11.png', 'images/wd-04.png', 'images/wd-20.png', 'images/wd-29.png'], feel: '很舒服', temp: 20 },
  { date: dateStr(8), scene: 'date', title: '复古工装街头', reason: '约会也走松弛复古风。', items: ['棕褐工装夹克', '小狗刺绣衬衫', '工装长裤', '麂皮穆勒鞋'], images: ['images/wd-27.png', 'images/wd-05.png', 'images/wd-15.png', 'images/wd-29.png'], feel: '版型好看', temp: 23 },
  { date: dateStr(11), scene: 'commute', title: '印花休闲', reason: '经典印花休闲组合。', items: ['照片印花夹克', '炭灰做旧 T', '橄榄阔腿裤', '麂皮穆勒鞋'], images: ['images/wd-11.png', 'images/wd-04.png', 'images/wd-20.png', 'images/wd-29.png'], feel: '很舒服', temp: 19 },
  { date: dateStr(15), scene: 'daily', title: '条纹丹宁街头', reason: '省心的街头搭配。', items: ['蓝紫拉链卫衣', '黄绿条纹 T', '破洞阔腿牛仔', '印花穆勒鞋'], images: ['images/wd-02.png', 'images/wd-26.png', 'images/wd-32.png', 'images/wd-36.png'], feel: '回头率高', temp: 21 },
  { date: dateStr(20), scene: 'commute', title: '复古工装街头', reason: '工装 × 穆勒鞋。', items: ['棕褐工装夹克', '小狗刺绣衬衫', '工装长裤', '麂皮穆勒鞋'], images: ['images/wd-27.png', 'images/wd-05.png', 'images/wd-15.png', 'images/wd-29.png'], feel: '很舒服', temp: 25 },
  { date: dateStr(26), scene: 'party', title: '条纹丹宁街头', reason: '聚会里也够松弛。', items: ['蓝紫拉链卫衣', '黄绿条纹 T', '破洞阔腿牛仔', '印花穆勒鞋'], images: ['images/wd-02.png', 'images/wd-26.png', 'images/wd-32.png', 'images/wd-36.png'], feel: '还想再穿', temp: 24 }
];
const savedDiary = (() => { try { return JSON.parse(localStorage.getItem('baida-diary-v3') || 'null'); } catch { return null; } })();

const today = new Date();
const appState = {
  tab: 'wardrobe',
  subview: null,
  category: null,
  profile: savedProfile || defaultProfile,
  avatar: savedAvatar || '',
  pendingImport: null,
  diary: savedDiary || seedDiary,
  // styling flow
  styleStep: 'setup',          // setup | result
  styleSubview: null,          // null | 'pick' (choose garments from wardrobe)
  styleScene: 'commute',
  styleCustomScene: '',
  stylePicks: [],              // optional garment ids to build the look around
  styleFilter: 'all',          // category filter inside the picker
  styleLooks: [],
  styleActive: 0,
  // diary selectors
  diaryYear: today.getFullYear(),
  diaryMonth: today.getMonth() + 1,
  diaryDay: today.getDate(),
  // shopping
  shopTab: 'smart',            // 'smart' | 'community'
  shopBudget: '',
  weather: { location: '正在定位…', temp: '--', desc: '', icon: '🧭', hi: '', lo: '' }
};
function saveDiary() { localStorage.setItem('baida-diary-v3', JSON.stringify(appState.diary)); }

const appIcons = {
  wardrobe: '<svg viewBox="0 0 24 24"><path d="M7 4 12 2l5 2 4 4-3 4-2-1v10H8V11l-2 1-3-4z"/></svg>',
  styling: '<svg viewBox="0 0 24 24"><path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4zM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z"/></svg>',
  diary: '<svg viewBox="0 0 24 24"><path d="M5 4h14v17H5zM8 2v5m8-5v5M8 11h8m-8 4h5"/></svg>',
  diagnosis: '<svg viewBox="0 0 24 24"><path d="M4 20V9m5 11V4m5 16v-7m5 7V7M2 20h20"/></svg>',
  shopping: '<svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7zM9 8V6a3 3 0 0 1 6 0v2"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4.5 21c.8-4.2 3.3-6 7.5-6s6.7 1.8 7.5 6"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="m15 5-7 7 7 7"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  camera: '<svg viewBox="0 0 24 24"><path d="M3 8h4l2-3h6l2 3h4v12H3z"/><circle cx="12" cy="14" r="4"/></svg>',
  upload: '<svg viewBox="0 0 24 24"><path d="M4 16v4h16v-4M12 16V3m-5 5 5-5 5 5"/></svg>',
  link: '<svg viewBox="0 0 24 24"><path d="M10 14 8 16a4 4 0 0 1-6-6l3-3a4 4 0 0 1 6 0m3 3 2-2a4 4 0 1 1 6 6l-3 3a4 4 0 0 1-6 0M8 12h8"/></svg>'
};

function appNav() {
  const items = [
    ['wardrobe', '衣橱', appIcons.wardrobe],
    ['styling', '穿搭', appIcons.styling],
    ['diary', '日记', appIcons.diary],
    ['shopping', '购物', appIcons.shopping]
  ];
  return `<nav class="app-nav">${items.map(([id, label, icon]) => `<button class="${appState.tab === id ? 'active' : ''}" onclick="switchTab('${id}')">${icon}<span>${label}</span></button>`).join('')}</nav>`;
}

function switchTab(tab) {
  appState.tab = tab;
  appState.subview = null;
  appState.category = null;
  appRender();
}

function appRender() {
  const views = { wardrobe: wardrobePage, styling: stylingPage, diary: diaryPage, shopping: shoppingPage };
  document.getElementById('screen').innerHTML = `<div class="v3">${views[appState.tab]()}</div>${appNav()}`;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function weatherBanner() {
  const w = appState.weather;
  return `<div class="weather-banner"><span class="weather-icon">${w.icon}</span><div class="weather-copy"><b>${w.temp}°<small>${w.desc ? ' · ' + w.desc : ''}</small></b><span>${w.location}${w.hi !== '' ? ' · 今日 ' + w.hi + '° / ' + w.lo + '°' : ''}</span></div><button class="weather-refresh" onclick="detectWeather(true)" aria-label="刷新天气">⟳</button></div>`;
}

function pageTop(title, backAction = '') {
  if (backAction) return `<header class="page-top compact"><button class="circle-icon" onclick="${backAction}">${appIcons.back}</button><h1>${title}</h1><span class="top-spacer"></span></header>`;
  return `<header class="brand-top"><b>BaiDa</b><button class="circle-icon${appState.avatar ? ' has-avatar' : ''}" onclick="openProfileSheet()">${appState.avatar ? `<img src="${appState.avatar}" alt="我">` : appIcons.user}</button></header>${weatherBanner()}<h1 class="page-title">${title}</h1>`;
}

function wardrobePage() {
  if (appState.subview === 'category') return categoryPage();
  return `<main class="app-page wardrobe-page">
    ${pageTop('我的衣帽间')}
    <section class="dada-hero">
      <div class="dada-visual"><img src="${appAssets.dada}" alt="搭搭"></div>
      <div class="dada-hero-copy"><h2>下午好，今天穿什么？</h2><p>你的衣橱里有 ${appGarments.length} 件单品，来看看今天的搭配方案。</p><button onclick="startStyling()">开始搭配</button></div>
    </section>

    <section class="wardrobe-section">
      <div class="section-title"><h2>CLOTHES · 衣橱</h2><span>${appGarments.length} 件</span></div>
      <div class="category-panel">
        ${appCategories.map(categoryTile).join('')}
      </div>
    </section>
  </main>`;
}

function categoryTile(category) {
  return `<button class="category-tile" onclick="openCategoryV3('${category.id}')">
    <span class="tile-badge">${categoryCount(category.id)}</span>
    <span class="tile-illust"><img src="${category.icon}" alt="${category.name}"></span>
    <span class="tile-label">${category.name}</span>
  </button>`;
}

function openCategoryV3(category) {
  appState.category = category;
  appState.subview = 'category';
  appRender();
}

function categoryPage() {
  const category = appCategories.find(item => item.id === appState.category);
  const items = appGarments.filter(item => item.category === appState.category);
  return `<main class="app-page category-page">
    ${pageTop(category.name, "appState.subview=null;appRender()")}
    <div class="category-summary"><span>${items.length} 件</span><button onclick="appToast('已按最近穿着排序')">最近穿过⌄</button></div>
    <div class="garment-grid">${items.map(garmentTile).join('')}<button class="add-garment-tile" onclick="openImportSheet('${category.id}')">${appIcons.plus}<span>添加${category.name}</span></button></div>
  </main>`;
}

function garmentTile(item) {
  return `<button class="garment-tile" onclick="openGarmentDetail('${item.id}')"><span class="wear-badge">穿过 ${item.worn} 次</span><img src="${item.image}" alt="${item.name}"><span class="garment-copy"><b>${item.name}</b><small>${item.detail}</small></span></button>`;
}

function openGarmentDetail(id) {
  const item = appGarments.find(entry => entry.id === id);
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()"><section class="garment-modal"><div class="modal-handle"></div><img src="${item.image}" alt="${item.name}"><p class="micro">${appCategories.find(c => c.id === item.category).name}</p><h2>${item.name}</h2><span>${item.detail} · 穿过 ${item.worn} 次</span><button class="dark-button" onclick="closeAppModal();startStyling()">用这件搭一套</button><button class="text-danger" id="del-${item.id}" onclick="confirmDeleteGarment('${item.id}')">移出衣橱</button></section></div>`);
}
function confirmDeleteGarment(id) {
  const btn = document.getElementById('del-' + id);
  if (!btn) return;
  if (btn.dataset.confirm === '1') { deleteGarment(id); return; }
  btn.dataset.confirm = '1';
  btn.textContent = '再点一次确认删除';
  btn.classList.add('armed');
}
function deleteGarment(id) {
  appGarments = appGarments.filter(g => g.id !== id);
  appState.stylePicks = appState.stylePicks.filter(pid => pid !== id);
  removedGarments.add(id);
  localStorage.setItem('baida-removed-v1', JSON.stringify([...removedGarments]));
  saveGarments();
  closeAppModal();
  appRender();
  appToast('已移出衣橱');
}

function startStyling() { appState.tab = 'styling'; appState.subview = null; appState.styleStep = 'setup'; appRender(); }

// ---------- Styling: step 1 setup, step 2 results ----------
function stylingPage() {
  if (appState.styleSubview === 'pick') return stylingPickPage();
  return appState.styleStep === 'result' ? stylingResult() : stylingSetup();
}

function pickedGarments() { return appState.stylePicks.map(id => appGarments.find(g => g.id === id)).filter(Boolean); }

function stylingSetup() {
  const custom = appState.styleCustomScene;
  const activeScene = custom ? '' : appState.styleScene;
  const picks = pickedGarments();
  return `<main class="app-page styling-page">
    ${pageTop('今天的穿搭')}
    <section class="setup-block">
      <div class="setup-label"><b>今天要去哪儿？</b><small>选择场合，或自己填一个</small></div>
      <div class="scene-pills">${appScenes.map(s => `<button class="${activeScene===s.id?'selected':''}" onclick="pickScene('${s.id}',this)">${s.name}</button>`).join('')}</div>
      <input class="scene-input" id="scene-custom" placeholder="例如：见客户、看展、朋友生日饭…" value="${custom}" oninput="appState.styleCustomScene=this.value;document.querySelectorAll('.scene-pills button').forEach(b=>b.classList.remove('selected'))">
    </section>
    <section class="setup-block">
      <div class="setup-label"><b>有想穿的单品吗？</b><small>可选 · 从衣橱里挑，搭搭会围绕它来搭</small></div>
      ${picks.length
        ? `<div class="picked-row">${picks.map(g => `<span class="picked-chip"><img src="${g.image}" alt="">${g.name.slice(0,6)}<i onclick="togglePick('${g.id}')">×</i></span>`).join('')}</div>
           <button class="wardrobe-pick-btn" onclick="openStylePicker()">${appIcons.plus}<span>从衣橱继续添加 / 修改</span></button>`
        : `<button class="wardrobe-pick-btn empty" onclick="openStylePicker()">${appIcons.wardrobe}<span><b>从衣橱中挑选</b><small>先选想穿的单品（可选，可跳过）</small></span></button>`
      }
    </section>
    <button class="coral-button generate-button" onclick="generateLooks()">✨ 生成搭配方案</button>
  </main>`;
}

function pickScene(id, btn) {
  appState.styleScene = id;
  appState.styleCustomScene = '';
  // only recolor the pills, no full page re-render (avoids flicker)
  document.querySelectorAll('.scene-pills button').forEach(b => b.classList.remove('selected'));
  if (btn) btn.classList.add('selected');
  const input = document.getElementById('scene-custom');
  if (input) input.value = '';
}
function openStylePicker() { appState.styleSubview = 'pick'; appState.styleFilter = 'all'; appRender(); }
function togglePick(id) {
  const set = new Set(appState.stylePicks);
  set.has(id) ? set.delete(id) : set.add(id);
  appState.stylePicks = [...set];
  appRender();
}

// Wardrobe selection page for styling: filter by category, multi-select, confirm.
function stylingPickPage() {
  const filter = appState.styleFilter;
  const items = filter === 'all' ? appGarments : appGarments.filter(g => g.category === filter);
  const n = appState.stylePicks.length;
  return `<main class="app-page pick-page">
    ${pageTop('从衣橱中挑选', "appState.styleSubview=null;appRender()")}
    <div class="scene-filter">
      <button class="${filter==='all'?'on':''}" onclick="appState.styleFilter='all';appRender()">全部</button>
      ${appCategories.map(c => `<button class="${filter===c.id?'on':''}" onclick="appState.styleFilter='${c.id}';appRender()">${c.name}</button>`).join('')}
    </div>
    <div class="pick-grid">
      ${items.map(g => { const on = appState.stylePicks.includes(g.id); return `<button class="pick-card ${on?'selected':''}" onclick="togglePick('${g.id}')"><span class="pick-check">${on?'✓':''}</span><img src="${g.image}" alt="${g.name}"><b>${g.name}</b><small>${g.detail}</small></button>`; }).join('')}
    </div>
    <div class="pick-footer">
      <button class="coral-button" onclick="appState.styleSubview=null;appRender()">${n?`确认选择（${n} 件）`:'先不指定，直接搭配'}</button>
    </div>
  </main>`;
}

function generateLooks() {
  // Build 3 candidate looks; slot each picked garment into its category slot.
  let looks = lookTemplates.map(l => ({ ...l }));
  const picks = pickedGarments();
  if (picks.length) {
    looks.forEach(l => {
      picks.forEach(pick => {
        if (pick.category === 'outer') { l.outer = pick.image; l.outerId = pick.id; }
        else if (pick.category === 'tops') { l.top = pick.image; l.topId = pick.id; }
        else if (pick.category === 'bottoms') { l.bottom = pick.image; l.bottomId = pick.id; }
        else if (pick.category === 'shoes') { l.shoes = pick.image; l.shoesId = pick.id; }
        else if (pick.category === 'bags') { l.bag = pick.image; l.bagId = pick.id; }
      });
      // refresh item name chips to reflect the actual garments in this look
      l.items = [l.outerId, l.topId, l.bottomId, l.shoesId, l.bagId]
        .map(id => (appGarments.find(g => g.id === id) || {}).name).filter(Boolean);
    });
  }
  appState.styleLooks = looks;
  appState.styleActive = 0;
  appState.styleStep = 'result';
  const screen = document.getElementById('screen');
  screen.innerHTML = `<div class="v3"><main class="app-page styling-page"><div class="generating"><span class="spinner"></span><b>搭搭正在为你搭配…</b><small>结合天气、场合和你的衣橱</small></div></main></div>`;
  setTimeout(() => appRender(), 900);
}

function currentSceneLabel() { return appState.styleCustomScene || sceneName(appState.styleScene); }

function stylingResult() {
  const looks = appState.styleLooks;
  return `<main class="app-page styling-page result-page">
    ${pageTop('搭搭的方案', "appState.styleStep='setup';appRender()")}
    <div class="result-meta"><span class="meta-chip">${currentSceneLabel()}</span><span class="meta-chip">${appState.weather.temp}° ${appState.weather.desc||''}</span>${appState.stylePicks.length?`<span class="meta-chip">含指定单品 ${appState.stylePicks.length} 件</span>`:''}</div>
    <p class="swipe-hint">为你准备了 ${looks.length} 套 · 左右滑动看看 →</p>
    <div class="look-scroller" id="look-scroller" onscroll="onLookScroll()">
      ${looks.map((look, i) => lookSlide(look, i)).join('')}
    </div>
    <div class="look-dots">${looks.map((_, i) => `<span class="${i===appState.styleActive?'on':''}"></span>`).join('')}</div>
    <button class="ghost-button" onclick="openTryOn()">👗 AI 试穿这套</button>
    <button class="coral-button" onclick="wearThis()">穿这套 · 记入日记</button>
  </main>`;
}

function lookSlide(look, i) {
  return `<section class="look-slide">
    <div class="look-heading"><div><p class="micro">方案 ${i+1} / ${appState.styleLooks.length}</p><h2>${look.title}</h2></div><span>LOOK 0${i+1}</span></div>
    <div class="look-layout">
      <img class="look-jacket" src="${look.outer}" alt="">
      <img class="look-top" src="${look.top}" alt="">
      <img class="look-bottom" src="${look.bottom}" alt="">
      <img class="look-shoes" src="${look.shoes}" alt="">
      <img class="look-bag" src="${look.bag}" alt="">
    </div>
    <p class="look-reason">${look.reason}</p>
    <div class="look-items">${look.items.map(t => `<span>${t}</span>`).join('')}</div>
  </section>`;
}

function onLookScroll() {
  const sc = document.getElementById('look-scroller');
  if (!sc) return;
  const i = Math.round(sc.scrollLeft / sc.clientWidth);
  if (i !== appState.styleActive) {
    appState.styleActive = i;
    document.querySelectorAll('.look-dots span').forEach((d, idx) => d.classList.toggle('on', idx === i));
  }
}

// ---------- AI try-on ----------
function openTryOn() {
  const look = appState.styleLooks[appState.styleActive] || {};
  openTryOnViewer(look.tryOn || 'images/tryon-look-a-v1.png', look.title || '这套', 'AI 试穿');
}

// ---------- confirm & write to diary ----------
function wearThis() {
  const look = appState.styleLooks[appState.styleActive];
  const garmentIds = [look.outerId, look.topId, look.bottomId, look.shoesId, look.bagId].filter(Boolean);
  // wearing this outfit bumps each garment's worn count
  let bumped = 0;
  garmentIds.forEach(id => { const g = appGarments.find(x => x.id === id); if (g) { g.worn = (g.worn || 0) + 1; bumped++; } });
  saveGarments();
  const rec = {
    date: dateStr(0),
    scene: appState.styleCustomScene ? 'custom' : appState.styleScene,
    sceneLabel: currentSceneLabel(),
    title: look.title,
    reason: look.reason,
    items: look.items,
    garmentIds,
    images: [look.outer, look.top, look.bottom, look.shoes],
    temp: appState.weather.temp,
    feel: null
  };
  appState.diary = appState.diary.filter(r => r.date !== rec.date);
  appState.diary.unshift(rec);
  saveDiary();
  appState.tab = 'diary';
  appState.diaryYear = today.getFullYear();
  appState.diaryMonth = today.getMonth() + 1;
  appState.diaryDay = today.getDate();
  appRender();
  appToast(`已记入日记 · ${bumped} 件衣服穿着 +1`);
}

// ---------- Diary: date picker + scene filter + persona summary ----------
function pad(n) { return String(n).padStart(2, '0'); }
function selectedDateKey() { return `${appState.diaryYear}-${pad(appState.diaryMonth)}-${pad(appState.diaryDay)}`; }
function daysInMonth(y, m) { return new Date(y, m, 0).getDate(); }

function diaryPage() {
  const y = appState.diaryYear, m = appState.diaryMonth;
  const nDays = daysInMonth(y, m);
  if (appState.diaryDay > nDays) appState.diaryDay = nDays;
  const dotDates = new Set(appState.diary.map(r => r.date));
  const years = [today.getFullYear(), today.getFullYear() - 1];

  return `<main class="app-page diary-page">
    ${pageTop('穿搭日记')}
    <div class="date-picker">
      <select onchange="appState.diaryYear=+this.value;appRender()">${years.map(v => `<option value="${v}" ${v===y?'selected':''}>${v} 年</option>`).join('')}</select>
      <select onchange="appState.diaryMonth=+this.value;appRender()">${Array.from({length:12},(_, i) => i+1).map(v => `<option value="${v}" ${v===m?'selected':''}>${v} 月</option>`).join('')}</select>
    </div>
    <div class="day-strip" id="day-strip">${Array.from({length:nDays},(_, i) => i+1).map(d => `<button class="${d===appState.diaryDay?'active':''}" onclick="selectDiaryDay(${d},this)"><b>${d}</b>${dotDates.has(`${y}-${pad(m)}-${pad(d)}`)?'<i></i>':''}</button>`).join('')}</div>

    <div id="diary-body">${renderDiaryBody()}</div>
  </main>`;
}

// records + persona for the selected day (re-rendered on day click without touching the day strip)
function renderDiaryBody() {
  const key = selectedDateKey();
  const dayRecords = appState.diary.filter(r => r.date === key);
  return `${dayRecords.length ? dayRecords.map(diaryCard).join('') : `<div class="diary-empty"><span>🗓️</span><b>这天还没有记录</b><small>去穿搭页选一套，点「穿这套」就会出现在这里</small><button onclick="startStyling()">去搭配</button></div>`}
    ${personaSummary()}`;
}
function refreshDiaryBody() {
  const el = document.getElementById('diary-body');
  if (el) el.innerHTML = renderDiaryBody(); else appRender();
}
// clicking a day only updates the highlight + the detail below; the day strip keeps its scroll position
function selectDiaryDay(d, btn) {
  appState.diaryDay = d;
  const strip = document.getElementById('day-strip');
  if (strip) strip.querySelectorAll('button').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  refreshDiaryBody();
}

const feelOptions = ['很舒服', '版型好看', '有点热', '有点冷', '偏正式了', '回头率高', '还想再穿'];
function diaryCard(rec) {
  const chips = feelOptions.map(f => `<button class="feel-chip ${(rec.feels||[]).includes(f)?'on':''}" onclick="toggleDiaryFeel('${rec.date}','${f}')">${f}</button>`).join('');
  return `<section class="diary-entry">
    <div class="entry-date"><span>${rec.sceneLabel || sceneName(rec.scene)} · ${rec.temp||''}°</span><i>已穿出门</i></div>
    <div class="entry-look">${(rec.images||[]).map(src => `<img src="${src}" alt="">`).join('')}</div>
    <h2>${rec.title}</h2><p>${rec.reason||''}</p>
    ${rec.photo
      ? `<div class="diary-photo"><img src="${rec.photo}" alt="今日实拍"><button class="photo-retake" onclick="document.getElementById('diary-cam-${rec.date}').click()">重拍</button></div>`
      : `<button class="diary-photo-add" onclick="document.getElementById('diary-cam-${rec.date}').click()">${appIcons.camera}<span>拍一张今天的实穿照</span></button>`}
    <input id="diary-cam-${rec.date}" type="file" accept="image/*" capture="environment" hidden onchange="addDiaryPhoto(event,'${rec.date}')">
    <div class="feel-block">
      <p class="feel-title">当天感受（可多选，也可以自己写）</p>
      <div class="feel-chips">${chips}</div>
      <div class="feel-write"><input id="feel-note-${rec.date}" type="text" placeholder="想补充点什么…" value="${rec.note||''}"><button onclick="saveDiaryNote('${rec.date}')">记下</button></div>
      ${rec.note ? `<div class="saved-feedback">已记：${rec.note}</div>` : ''}
    </div>
  </section>`;
}
function toggleDiaryFeel(date, value) {
  const r = appState.diary.find(x => x.date === date); if (!r) return;
  const set = new Set(r.feels || []);
  set.has(value) ? set.delete(value) : set.add(value);
  r.feels = [...set]; r.feel = r.feels.join('、'); saveDiary(); refreshDiaryBody();
}
function saveDiaryNote(date) {
  const r = appState.diary.find(x => x.date === date); if (!r) return;
  const el = document.getElementById('feel-note-' + date);
  r.note = el ? el.value : r.note; saveDiary(); refreshDiaryBody(); appToast('已记下你的感受');
}
function addDiaryPhoto(event, date) {
  const f = event.target.files?.[0]; if (!f) return;
  const r = appState.diary.find(x => x.date === date); if (!r) return;
  const reader = new FileReader();
  reader.onload = () => { r.photo = reader.result; saveDiary(); refreshDiaryBody(); appToast('已加入今天的实穿照'); };
  reader.readAsDataURL(f);
}

function personaSummary() {
  // last 30 days
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 30);
  const recent = appState.diary.filter(r => new Date(r.date) >= cutoff);
  if (recent.length < 2) return '';
  const itemCount = {}, sceneCount = {}, titleCount = {};
  recent.forEach(r => {
    (r.items || []).forEach(it => itemCount[it] = (itemCount[it] || 0) + 1);
    sceneCount[r.scene] = (sceneCount[r.scene] || 0) + 1;
    titleCount[r.title] = (titleCount[r.title] || 0) + 1;
  });
  const top = obj => Object.entries(obj).sort((a, b) => b[1] - a[1])[0] || ['', 0];
  const [topItem, topItemN] = top(itemCount);
  const [topScene, topSceneN] = top(sceneCount);
  const [topTitle] = top(titleCount);
  return `<section class="profile-insight">
    <div class="section-title"><h2>搭搭逐渐懂你</h2><span>近 30 天 · 个人画像</span></div>
    <div class="persona-grid">
      <div class="persona-cell"><small>记录穿搭</small><b>${recent.length} 次</b></div>
      <div class="persona-cell"><small>最常穿</small><b>${topItem}</b><em>${topItemN} 次</em></div>
      <div class="persona-cell"><small>高频场景</small><b>${sceneName(topScene)}</b><em>占 ${Math.round(topSceneN/recent.length*100)}%</em></div>
      <div class="persona-cell"><small>偏好风格</small><b>${topTitle}</b></div>
    </div>
    <p class="persona-note">你近一个月最常在「${sceneName(topScene)}」场景穿搭，「${topItem}」是回头率最高的单品。想让搭配更有余地吗？搭搭已经根据现状准备了选购建议。</p>
    <button class="ghost-button" onclick="switchTab('shopping')">看看衣橱诊断，去添几件衣服 →</button>
  </section>`;
}

// ---------- Shopping: smart picks (wardrobe status + budget) + community ----------
const shopRecs = [
  { name: '水洗丹宁外套', price: 460, range: '¥350–650', scene: '外套 · 街头', fills: '缺基础中性外层', unlock: '新增约 5 套', note: '外套偏卫衣/工装，缺一件百搭丹宁；和条纹 T、破洞牛仔天生一对', img: 'images/rec-denim-v1.png', onBody: 'images/recwear-denim-v1.png', query: '男 水洗 做旧 丹宁外套', gap: true },
  { name: '黑色机能斜挎包', price: 220, range: '¥150–350', scene: '配件 · 通勤', fills: '包袋 0 件', unlock: '给每套收尾', note: '衣橱目前一个包都没有，一只黑色斜挎能给所有穿搭收尾', img: 'images/rec-bag-v1.png', onBody: 'images/recwear-bag-v1.png', query: '男 黑色 机能 斜挎包', gap: true },
  { name: '复古厚底板鞋', price: 380, range: '¥280–600', scene: '鞋履 · 街头', fills: '鞋型单一（仅穆勒）', unlock: '新增约 6 套', note: '现有 2 双都是穆勒拖鞋型，缺一双能走量、包脚的鞋', img: 'images/rec-shoes-v1.png', onBody: 'images/recwear-shoes-v1.png', query: '男 复古 厚底 板鞋', gap: true },
  { name: '黑色重磅基础 Tee', price: 120, range: '¥80–200', scene: '打底 · 百搭', fills: '缺纯色打底', unlock: '解锁外套叠穿', note: '10 件上衣几乎都是印花，缺一件纯黑打底，叠穿才不打架', img: 'images/rec-tee-v1.png', onBody: 'images/recwear-tee-v1.png', query: '男 黑色 重磅 纯棉 Tee', gap: true }
];
const shopOutfits = [
  { title: '丹宁 × 条纹街头', img: 'images/reccombo-denim-v1.png', note: '买了丹宁外套后能这么穿' },
  { title: '斜挎 × 工装', img: 'images/reccombo-bag-v1.png', note: '加只斜挎，工装更利落' },
  { title: '黑 Tee 叠印花', img: 'images/reccombo-tee-v1.png', note: '纯黑打底稳住花色叠穿' }
];
const communityFeed = [
  { user: 'Kern', avatar: '🧑🏻', scene: '度假', hero: 'images/comm-12.png', caption: '橄榄半拉链亚麻衬衫配白色阔腿裤，松弛的度假街头，斜挎小包点睛。', likes: 421, items: [{ name: '橄榄半拉链衬衫', q: '男 橄榄绿 半拉链 亚麻衬衫' }, { name: '白色阔腿裤', q: '男 白色 阔腿裤' }] },
  { user: '13', avatar: '🕶️', scene: '街头', hero: 'images/comm-14.png', caption: '复古拼色橄榄球 Polo 配水洗直筒牛仔，学院里带点街头痞感。', likes: 356, items: [{ name: '拼色橄榄球 Polo', q: '男 复古 拼色 橄榄球Polo' }, { name: '水洗直筒牛仔', q: '男 水洗 直筒牛仔裤' }] },
  { user: 'Noah', avatar: '🧑🏼', scene: '通勤', hero: 'images/comm-21.png', caption: '薄针织蓝 V 领叠白衬衫，白阔腿裤，夏天最通透的干净感。', likes: 298, items: [{ name: '蓝色 V 领针织', q: '男 蓝色 V领 薄针织' }, { name: '白色阔腿裤', q: '男 白色 阔腿裤' }] },
  { user: 'Ash', avatar: '🧑🏻‍🎤', scene: '约会', hero: 'images/comm-30.png', caption: '牛仔拼接短袖衬衫系一条印花丝巾，复古又精致，配黑西裤显利落。', likes: 264, items: [{ name: '牛仔拼接短袖衬衫', q: '男 牛仔拼接 短袖衬衫' }, { name: '印花丝巾', q: '印花 丝巾 领巾' }] },
  { user: 'ZL', avatar: '🧑🏻‍🦱', scene: '机能', hero: 'images/comm-07.png', caption: '做旧印花短袖 T 叠迷彩工装裤，慵懒里带点机能街头感。', likes: 233, items: [{ name: '做旧印花短袖 T', q: '男 做旧 印花 短袖T' }, { name: '迷彩工装裤', q: '男 迷彩 工装裤' }] }
];

function shoppingPage() {
  return `<main class="app-page shopping-page">
    ${pageTop('购物')}
    <div class="shop-tabs">
      <button class="${appState.shopTab==='smart'?'active':''}" onclick="setShopTab('smart')">智能选购</button>
      <button class="${appState.shopTab==='community'?'active':''}" onclick="setShopTab('community')">穿搭社区</button>
    </div>
    ${appState.shopTab==='community' ? communityView() : smartShopping()}
  </main>`;
}
function setShopTab(tab) { appState.shopTab = tab; appRender(); }

function wardrobeScore() {
  let s = 100;
  if (categoryCount('bags') === 0) s -= 15;
  if (categoryCount('shoes') < 3) s -= 12;
  s -= 8;  // 上衣缺纯色打底
  s -= 3;  // 缺基础中性外层
  return Math.max(40, s);
}

function smartShopping() {
  const budget = parseInt(appState.shopBudget, 10);
  const recs = budget ? shopRecs.filter(r => r.price <= budget) : shopRecs;
  const score = wardrobeScore();
  const bags = categoryCount('bags'), shoes = categoryCount('shoes'), tops = categoryCount('tops');
  return `<section class="diagnosis-overview"><div><p class="micro">当前衣橱连接度</p><strong>${score}%</strong></div><p>你的 ${appGarments.length} 件单品能组出不少搭配，但受限于下面 4 个缺口，很多组合都「差一件」。补齐后连接度预计升到约 85%。</p></section>

    <div class="section-title"><h2>诊断 → 该补什么</h2><span>缺口决定推荐</span></div>
    <div class="gap-list">
      <div class="gap-row"><span class="gap-x">包袋 ${bags} 件</span><i>→</i><b>黑色机能斜挎包</b></div>
      <div class="gap-row"><span class="gap-x">鞋履仅 ${shoes} 双 · 都是穆勒鞋型</span><i>→</i><b>复古厚底板鞋</b></div>
      <div class="gap-row"><span class="gap-x">${tops} 件上衣几乎全是印花 · 缺纯色打底</span><i>→</i><b>黑色重磅基础 Tee</b></div>
      <div class="gap-row"><span class="gap-x">外套偏卫衣/工装 · 缺基础中性外层</span><i>→</i><b>水洗丹宁外套</b></div>
    </div>

    <section class="budget-block">
      <div class="setup-label"><b>你的预算是多少？</b><small>搭搭会结合上面的缺口，只推真正值得买的</small></div>
      <div class="budget-row">
        <span class="budget-yen">¥</span>
        <input class="budget-input" id="shop-budget" type="number" inputmode="numeric" placeholder="不限" value="${appState.shopBudget}" oninput="appState.shopBudget=this.value">
        <button class="budget-go" onclick="appState.shopBudget=document.getElementById('shop-budget').value;appRender();appToast('已按预算重新推荐')">智能推荐</button>
      </div>
      ${budget ? `<p class="budget-note">预算 ¥${budget} 内，为你精选 ${recs.length} 件</p>` : ''}
    </section>

    <div class="section-title"><h2>推荐单品</h2><span>逐一对应缺口</span></div>
    <div class="rec-list">
      ${recs.length ? recs.map((r, i) => shopRecCard(r, i)).join('') : `<p class="budget-note">这个预算暂时没有强推的单品，可以先看看社区找灵感。</p>`}
    </div>

    <div class="section-title"><h2>买了能这么穿</h2><span>结合你现有衣橱</span></div>
    <div class="rec-outfits">${shopOutfits.map(shopOutfitCard).join('')}</div>`;
}

function shopRecCard(r, i) {
  return `<div class="rec-card">
    <div class="rec-imgs">
      <div class="rec-img"><img src="${r.img}" alt="${r.name}"><span>单品</span></div>
      <div class="rec-img"><img src="${r.onBody}" alt="${r.name}上身"><span>数字人上身</span></div>
    </div>
    <div class="rec-body">
      <div class="rec-head"><b>${r.name}</b><i>${r.range}</i></div>
      <small>${r.scene}</small>
      ${r.gap ? `<span class="rec-gap">补缺口 · ${r.fills}</span>` : ''}
      <em>${r.note}</em>
      ${r.unlock ? `<span class="rec-unlock">✦ ${r.unlock}</span>` : ''}
      <div class="rec-actions">
        <button class="rec-tryon" onclick="openTryOnViewer('${r.onBody}','${r.name}','试穿这件')">👗 试穿</button>
        <button class="rec-find" onclick="openSimilarSheet('${r.name}','${r.query}','${r.img}')">🔍 找同款</button>
      </div>
    </div>
  </div>`;
}
function shopOutfitCard(o) {
  return `<div class="rec-outfit"><div class="rec-outfit-hero"><img src="${o.img}" alt="${o.title}"></div><b>${o.title}</b><small>${o.note}</small></div>`;
}

function communityView() {
  return `<p class="swipe-hint">看看别人怎么穿，试穿看效果，喜欢的单品让搭搭找同款</p>
    <div class="feed">${communityFeed.map(feedCard).join('')}</div>`;
}
function feedCard(p) {
  return `<section class="feed-card">
    <div class="feed-top"><span class="feed-avatar">${p.avatar}</span><div><b>${p.user}</b><small>${p.scene} · OOTD</small></div><span class="feed-like">♥ ${p.likes}</span></div>
    <div class="feed-hero"><img src="${p.hero}" alt="${p.user} 的穿搭"><button class="feed-tryon" onclick="openTryOnViewer('${p.hero}','${p.user} 的穿搭','试穿这套')">👗 试穿这套</button></div>
    <p class="feed-caption">${p.caption}</p>
    <div class="feed-items">${p.items.map(it => `<button onclick="openSimilarSheet('${it.name}','${it.q}','${p.hero}')">🔍 ${it.name} · 找同款</button>`).join('')}</div>
  </section>`;
}

// generic try-on viewer: digital-human preview + option to try on your own photo
function openTryOnViewer(image, title, sub) {
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()">
    <section class="tryon-sheet">
      <div class="modal-handle"></div>
      <p class="micro">${sub} · ${title}</p>
      <h2>看穿上身的效果</h2>
      <div class="tryon-switch"><button class="on" id="tryon-tab-digital" onclick="viewerDigital('${image}')">数字人试穿</button><button id="tryon-tab-me" onclick="document.getElementById('viewer-photo').click()">上传本人照片</button></div>
      <div id="tryon-stage"></div>
      <input id="viewer-photo" type="file" accept="image/*" hidden onchange="onViewerPhoto(event)">
    </section>
  </div>`);
  viewerDigital(image);
}
function viewerDigital(image) {
  const dt = document.getElementById('tryon-tab-digital'), mt = document.getElementById('tryon-tab-me');
  if (dt) dt.classList.add('on'); if (mt) mt.classList.remove('on');
  const stage = document.getElementById('tryon-stage');
  stage.innerHTML = `<div class="generating small"><span class="spinner"></span><b>正在生成试穿效果…</b></div>`;
  setTimeout(() => { stage.innerHTML = `<div class="tryon-result"><img src="${image}" alt="试穿效果"><p class="micro">数字人预览 · 仅供参考</p></div>`; }, 800);
}
function onViewerPhoto(event) {
  const f = event.target.files?.[0]; if (!f) return;
  const dt = document.getElementById('tryon-tab-digital'), mt = document.getElementById('tryon-tab-me');
  if (dt) dt.classList.remove('on'); if (mt) mt.classList.add('on');
  const stage = document.getElementById('tryon-stage');
  stage.innerHTML = `<div class="generating small"><span class="spinner"></span><b>正在把这套穿到你身上…</b></div>`;
  const url = URL.createObjectURL(f);
  setTimeout(() => { stage.innerHTML = `<div class="tryon-result"><img src="${url}" alt="试穿效果"><p class="micro">基于你的照片生成 · 仅供参考，非真实合身</p></div>`; }, 1100);
}

// find similar products across e-commerce platforms, with a thumbnail and real search links
function openSimilarSheet(name, query, thumb) {
  const q = encodeURIComponent(query || name);
  const priceBase = 200 + Math.floor(Math.random() * 300);
  const platforms = [
    { shop: '淘宝', tag: '同款多 · 价格带广', price: Math.max(89, priceBase - 120), url: 'https://s.taobao.com/search?q=' + q },
    { shop: '天猫', tag: '品牌旗舰 · 质感好', price: priceBase + 260, url: 'https://list.tmall.com/search_product.htm?q=' + q },
    { shop: '京东', tag: '次日达 · 售后省心', price: priceBase + 120, url: 'https://search.jd.com/Search?keyword=' + q }
  ];
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()">
    <section class="similar-sheet">
      <div class="modal-handle"></div>
      <p class="micro">搭搭找同款</p>
      <h2>「${name}」的相似单品</h2>
      <div class="similar-hero"><img src="${thumb}" alt="${name}"><span>搭搭已对比版型、颜色和价格，帮你挑了几个平台方向 👇</span></div>
      ${platforms.map(s => `<button class="similar-item" onclick="window.open('${s.url}','_blank');appToast('已跳转 ${s.shop} 搜索同款')"><span><b>${s.shop}</b><small>${s.tag}</small></span><i>约 ¥${s.price} ›</i></button>`).join('')}
      <p class="add-lead" style="margin-top:12px">买回来后拍张照，就能直接加进你的衣橱。</p>
    </section>
  </div>`);
}

function openImportSheet(preselected = '') {
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()"><section class="import-sheet"><div class="modal-handle"></div><p class="micro">添加到衣帽间</p><h2>选择添加方式</h2><button onclick="document.getElementById('camera-file').click()">${appIcons.camera}<span><b>拍一张照片</b><small>直接拍摄手边的衣服</small></span></button><button onclick="document.getElementById('upload-file').click()">${appIcons.upload}<span><b>上传图片</b><small>从手机相册选择</small></span></button><button onclick="showLinkSheet('${preselected}')">${appIcons.link}<span><b>导入购物链接</b><small>读取商品图片和信息</small></span></button><input id="camera-file" type="file" accept="image/*" capture="environment" hidden onchange="previewImport(event,'${preselected}')"><input id="upload-file" type="file" accept="image/*" hidden onchange="previewImport(event,'${preselected}')"></section></div>`);
}
function previewImport(event, category) {
  const file = event.target.files?.[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = () => showImportConfirm(reader.result, category || 'tops', '新添加的单品');
  reader.readAsDataURL(file);
}
function showLinkSheet(category) { const modal = document.getElementById('app-modal'); modal.innerHTML = `<section class="import-sheet link-sheet"><div class="modal-handle"></div><p class="micro">购物链接</p><h2>粘贴商品页面</h2><input id="shop-url" type="url" placeholder="https://..."><button class="dark-button" onclick="readShopLink('${category}')">读取商品</button></section>`; }
function readShopLink(category) { if (!document.getElementById('shop-url').value) return appToast('请粘贴购物链接'); showImportConfirm('images/rec-denim-v1.png', category || 'outer', '水洗丹宁外套'); }
function showImportConfirm(image, category, name) {
  appState.pendingImport = { image, name };
  const modal = document.getElementById('app-modal');
  modal.innerHTML = `<section class="import-sheet"><div class="modal-handle"></div><p class="micro">识别完成</p><h2>确认这件衣服</h2><div class="import-item"><img src="${image}" alt=""><div><b>${name}</b><small>AI 已识别基础信息</small></div></div><label>名称<input id="new-name" type="text" value="${name}" style="min-width:150px;padding:7px 10px;border:1px solid #ddd2c8;border-radius:9px"></label><label>放入哪个区域？<select id="new-category">${appCategories.map(c=>`<option value="${c.id}" ${c.id===category?'selected':''}>${c.name}</option>`).join('')}</select></label><button class="dark-button" onclick="completeImport()">放进我的衣帽间</button></section>`;
}
function completeImport() {
  const pending = appState.pendingImport;
  if (!pending) { closeAppModal(); return; }
  const category = document.getElementById('new-category').value;
  const name = (document.getElementById('new-name').value || pending.name).trim() || '新单品';
  const garment = { id: 'g-' + Date.now(), category, name, detail: '刚添加 · 待完善信息', image: pending.image, worn: 0 };
  appGarments.push(garment);
  saveGarments();
  appState.pendingImport = null;
  closeAppModal();
  appRender();
  appToast(`已放入「${appCategories.find(c => c.id === category).name}」`);
}
function closeAppModal() { document.getElementById('app-modal')?.remove(); }

let appToastTimer;
function appToast(message) { const el = document.getElementById('toast'); el.textContent = message; el.classList.add('show'); clearTimeout(appToastTimer); appToastTimer = setTimeout(()=>el.classList.remove('show'),1900); }

const weatherCodeMap = {
  0: ['☀️','晴'], 1: ['🌤️','晴间多云'], 2: ['⛅','多云'], 3: ['☁️','阴'],
  45: ['🌫️','有雾'], 48: ['🌫️','雾凇'],
  51: ['🌦️','小毛毛雨'], 53: ['🌦️','毛毛雨'], 55: ['🌦️','大毛毛雨'],
  61: ['🌧️','小雨'], 63: ['🌧️','中雨'], 65: ['⛈️','大雨'],
  71: ['🌨️','小雪'], 73: ['🌨️','中雪'], 75: ['❄️','大雪'],
  80: ['🌦️','阵雨'], 81: ['🌧️','中阵雨'], 82: ['⛈️','强阵雨'],
  95: ['⛈️','雷阵雨'], 96: ['⛈️','雷阵雨伴冰雹'], 99: ['⛈️','强雷雨']
};

async function detectWeather(force = false) {
  if (!force && sessionStorage.getItem('baida-weather')) {
    try { appState.weather = JSON.parse(sessionStorage.getItem('baida-weather')); appRender(); return; } catch {}
  }
  try {
    const coords = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) return reject('no geolocation');
      navigator.geolocation.getCurrentPosition(pos => resolve(pos.coords), reject, { timeout: 6000, maximumAge: 600000 });
    }).catch(async () => {
      try {
        const ip = await fetch('https://ipapi.co/json/').then(response => response.json());
        return { latitude: ip.latitude, longitude: ip.longitude, city: ip.city };
      } catch { return { latitude: 39.9042, longitude: 116.4074, city: '北京' }; }
    });
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
    const data = await fetch(url).then(response => response.json());
    const code = data.current.weather_code;
    const [icon, desc] = weatherCodeMap[code] || ['🌈','未知'];
    let city = coords.city;
    if (!city) {
      try {
        const reverse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=zh`).then(response => response.json());
        city = reverse.city || reverse.locality || reverse.principalSubdivision || '当前位置';
      } catch { city = '当前位置'; }
    }
    appState.weather = {
      location: city, icon, desc,
      temp: Math.round(data.current.temperature_2m),
      hi: Math.round(data.daily.temperature_2m_max[0]),
      lo: Math.round(data.daily.temperature_2m_min[0])
    };
    sessionStorage.setItem('baida-weather', JSON.stringify(appState.weather));
    appRender();
  } catch (error) {
    appState.weather = { location: '北京', temp: 24, desc: '晴', icon: '☀️', hi: 27, lo: 18 };
    appRender();
  }
}

function openProfileSheet() {
  const profile = appState.profile;
  const isSelected = (list, value) => (list || []).includes(value) ? 'selected' : '';
  const styleOptions = ['利落', '松弛', '温柔', '鲜活', '有力量', '简约'];
  const constraintOptions = ['不露腿', '不穿高跟', '避免紧身', '避免太正式'];
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()">
    <section class="profile-sheet">
      <div class="modal-handle"></div>
      <p class="micro">个人档案</p>
      <h2>让搭搭更懂你</h2>
      <div class="avatar-edit">
        <span id="avatar-preview" class="avatar-preview" style="${appState.avatar ? `background-image:url(${appState.avatar})` : ''}">${appState.avatar ? '' : appIcons.user}</span>
        <div>
          <b>我的头像</b>
          <small>点右侧按钮上传一张你的照片</small>
        </div>
        <button class="avatar-upload" onclick="document.getElementById('avatar-file').click()">上传头像</button>
        <input id="avatar-file" type="file" accept="image/*" hidden onchange="onAvatarPick(event)">
      </div>
      <p class="add-lead">这些信息只用于搭配推荐，随时可以修改。</p>
      <label>身高<input id="pf-height" type="number" inputmode="numeric" placeholder="cm" value="${profile.height || ''}"></label>
      <label>常穿尺码<select id="pf-size">${['XS','S','M','L','XL'].map(size => `<option ${size===profile.size?'selected':''}>${size}</option>`).join('')}</select></label>
      <label>身材轮廓<select id="pf-shape"><option value="">选择一个（可跳过）</option>${['苹果型','梨型','沙漏型','矩形','倒三角'].map(shape => `<option ${shape===profile.bodyShape?'selected':''}>${shape}</option>`).join('')}</select></label>
      <div class="chip-group"><span>风格偏好</span><div>${styleOptions.map(style => `<button class="chip ${isSelected(profile.styles, style)}" onclick="toggleProfileChip('styles','${style}',this)">${style}</button>`).join('')}</div></div>
      <div class="chip-group"><span>穿着限制</span><div>${constraintOptions.map(constraint => `<button class="chip ${isSelected(profile.constraints, constraint)}" onclick="toggleProfileChip('constraints','${constraint}',this)">${constraint}</button>`).join('')}</div></div>
      <label>今天的期待<textarea id="pf-goals" rows="2" placeholder="例如：想显得利落，但下午会走比较远">${profile.goals || ''}</textarea></label>
      <button class="dark-button" onclick="saveProfile()">保存档案</button>
    </section>
  </div>`);
}

function toggleProfileChip(field, value, element) {
  const list = new Set(appState.profile[field] || []);
  list.has(value) ? list.delete(value) : list.add(value);
  appState.profile[field] = [...list];
  element.classList.toggle('selected');
}

function saveProfile() {
  appState.profile = {
    height: document.getElementById('pf-height').value,
    size: document.getElementById('pf-size').value,
    bodyShape: document.getElementById('pf-shape').value,
    styles: appState.profile.styles,
    constraints: appState.profile.constraints,
    goals: document.getElementById('pf-goals').value
  };
  localStorage.setItem('baida-profile', JSON.stringify(appState.profile));
  closeAppModal();
  appToast('档案已保存');
}

function onAvatarPick(event) {
  const file = event.target.files?.[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    appState.avatar = reader.result;
    localStorage.setItem('baida-avatar', reader.result);
    const preview = document.getElementById('avatar-preview');
    if (preview) { preview.style.backgroundImage = `url(${reader.result})`; preview.innerHTML = ''; }
    appRender();
    appToast('头像已更新');
  };
  reader.readAsDataURL(file);
}

appRender();
detectWeather();
