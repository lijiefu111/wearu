// WEARU review v010: male / female demo lines (male = storyline_v002, female = assets pending).
const appGender = (() => { try { return localStorage.getItem('wearu-v10-gender') || 'male'; } catch { return 'male'; } })();
const K = key => `wearu-v10-${appGender}-${key}`;
const M = id => id.startsWith('F') ? `female/${id}.webp` : `male/${id}.webp`;
function setGender(g) {
  if (g === appGender) return;
  try { localStorage.setItem('wearu-v10-gender', g); } catch {}
  location.reload();
}
const appAssets = {
  iconTops: '../images/icon-tops-v2.png',
  iconBottoms: '../images/icon-bottoms-v2.png',
  iconOuter: '../images/icon-outer-v2.png',
  iconBags: '../images/icon-bags-v2.png',
  iconShoes: '../images/icon-shoes-v2.png',
  iconAccessories: '../images/icon-accessories-v2.png'
};

const appCategories = [
  { id: 'tops', name: '上衣', icon: appAssets.iconTops },
  { id: 'bottoms', name: '下装', icon: appAssets.iconBottoms },
  { id: 'outer', name: '外套', icon: appAssets.iconOuter },
  { id: 'bags', name: '包袋', icon: appAssets.iconBags },
  { id: 'shoes', name: '鞋履', icon: appAssets.iconShoes },
  { id: 'accessories', name: '配饰', icon: appAssets.iconAccessories }
];

// 男生线衣橱（storyline_v002 · 陈野），图片来自 04_assets/cut/male_v001 清理后的单品
const maleGarments = [
  { id: 'wd-04', category: 'tops', name: '炭灰做旧印花 T', detail: '短袖 · 照片印花', worn: 14 },
  { id: 'wd-10', category: 'tops', name: '美式印花 T', detail: '短袖 · 复古字母', worn: 11 },
  { id: 'wd-01', category: 'tops', name: '酒红印花衬衫', detail: '短袖 · 配窄领带', worn: 9 },
  { id: 'wd-16', category: 'tops', name: '印花无袖背心', detail: '背心 · 做旧铆钉', worn: 8 },
  { id: 'wd-05', category: 'tops', name: '小狗刺绣衬衫', detail: '短袖 · 拼色领带领', worn: 7 },
  { id: 'wd-26', category: 'tops', name: '黄绿条纹 T', detail: '短袖 · 卡通刺绣', worn: 7 },
  { id: 'wd-18', category: 'tops', name: '黄色宽松 T', detail: '短袖 · 亮色基础', worn: 6 },
  { id: 'wd-28', category: 'tops', name: '黄条纹卡通 T', detail: '短袖 · 漫画印花', worn: 6 },
  { id: 'wd-23', category: 'tops', name: '做旧无袖背心', detail: '背心 · 手写印花', worn: 5 },
  { id: 'wd-08', category: 'tops', name: '粉色格纹衬衫', detail: '短袖 · 细格纹', worn: 0 },
  { id: 'wd-27', category: 'outer', name: '棕褐工装夹克', detail: '夹克 · 灯芯绒领', worn: 8 },
  { id: 'wd-02', category: 'outer', name: '蓝紫拉链卫衣', detail: '卫衣 · 照片印花', worn: 6 },
  { id: 'wd-11', category: 'outer', name: '照片印花夹克', detail: '夹克 · 撞色领', worn: 5 },
  { id: 'wd-15', category: 'bottoms', name: '工装长裤', detail: '长裤 · 米灰多袋', worn: 12 },
  { id: 'wd-06', category: 'bottoms', name: '小狗刺绣阔腿裤', detail: '长裤 · 黑色刺绣', worn: 10 },
  { id: 'wd-20', category: 'bottoms', name: '橄榄阔腿裤', detail: '长裤 · 褶裥垂感', worn: 9 },
  { id: 'wd-24', category: 'bottoms', name: '阔腿卫裤', detail: '长裤 · 花灰', worn: 8 },
  { id: 'wd-32', category: 'bottoms', name: '破洞阔腿牛仔', detail: '牛仔 · 橄榄水洗', worn: 7 },
  { id: 'wd-09', category: 'bottoms', name: '酒红格纹五分裤', detail: '短裤 · 复古格纹', worn: 4 },
  { id: 'wd-29', category: 'shoes', name: '麂皮穆勒鞋', detail: '穆勒 · 棕色蓝底', worn: 9 },
  { id: 'wd-36', category: 'shoes', name: '印花穆勒鞋', detail: '穆勒 · 蓝色图腾', worn: 6 },
  { id: 'wd-17', category: 'accessories', name: '做旧棒球帽', detail: '帽子 · 水洗灰', worn: 10 },
  { id: 'wd-22', category: 'accessories', name: '骷髅银链手链', detail: '手链 · 银色', worn: 7 },
  { id: 'wd-31', category: 'accessories', name: '印花领带', detail: '领带 · 刺绣补丁', worn: 3 },
  { id: 'wd-45', category: 'accessories', name: '串珠银项链', detail: '项链 · 珍珠绿石', worn: 2 },
  { id: 'wd-46', category: 'accessories', name: '叠戴星星项链', detail: '项链 · 双层', worn: 4 },
  { id: 'wd-40', category: 'shoes', name: '灰色复古跑鞋', detail: '跑鞋 · 银灰', worn: 15 },
  { id: 'wd-42', category: 'shoes', name: '黑色高帮帆布鞋', detail: '帆布 · 高帮', worn: 8 },
  { id: 'wd-41', category: 'shoes', name: '黑色工装靴', detail: '靴子 · 磨砂', worn: 3 },
  { id: 'wd-43', category: 'bags', name: '黑色翻盖双肩包', detail: '双肩 · 上课', worn: 20 },
  { id: 'wd-44', category: 'bags', name: '黑色帆布托特', detail: '托特 · 帆布', worn: 6 }
].map(g => ({ ...g, image: M(g.id) }));
// 女生线：组员找图中（07_deliverables/female_sourcing_template_v001.md），素材到齐前为空
const femaleGarments = [
  { id: 'F28', category: 'tops', name: '黑色修身针织衫', detail: '长袖 · 贴身', worn: 22 },
  { id: 'F18', category: 'tops', name: '白色府绸衬衫', detail: '衬衫 · 宽松', worn: 8 },
  { id: 'F06', category: 'tops', name: '黑白细条纹长袖', detail: '长袖 · 小纽扣', worn: 7 },
  { id: 'F13', category: 'tops', name: '灰白条纹亨利领', detail: '长袖 · 亨利领', worn: 6 },
  { id: 'F02', category: 'tops', name: '白色垂领上衣', detail: '短袖 · 垂领', worn: 2 },
  { id: 'F11', category: 'tops', name: '浅蓝牛仔衬衫', detail: '衬衫 · 水洗', worn: 2 },
  { id: 'F01', category: 'tops', name: '燕麦色漏肩垂褶上衣', detail: '短袖 · 漏肩 · 为约会买的', worn: 0 },
  { id: 'F05', category: 'tops', name: '薄荷绿垂领长袖', detail: '长袖 · 垂领', worn: 1 },
  { id: 'F32', category: 'outer', name: '黑色短款皮夹克', detail: '夹克 · 立领', worn: 9 },
  { id: 'F27', category: 'outer', name: '驼色羊毛大衣', detail: '大衣 · 中长', worn: 5 },
  { id: 'F15', category: 'outer', name: '炭灰廓形西装', detail: '西装 · 廓形', worn: 4 },
  { id: 'F04', category: 'outer', name: '奶油色马海毛开衫', detail: '开衫 · 吊牌没剪', worn: 0 },
  { id: 'F23', category: 'bottoms', name: '浅蓝直筒牛仔裤', detail: '牛仔 · 直筒', worn: 20 },
  { id: 'F16', category: 'bottoms', name: '灰色西装裤', detail: '长裤 · 阔腿', worn: 7 },
  { id: 'F03', category: 'bottoms', name: '卡其百褶中长裙', detail: '裙装 · 百褶', worn: 3 },
  { id: 'F14', category: 'bottoms', name: '灰色百褶半身裙', detail: '裙装 · 中长', worn: 2 },
  { id: 'F09', category: 'bottoms', name: '棕色灯芯绒半裙', detail: '裙装 · 及膝', worn: 1 },
  { id: 'F22', category: 'bottoms', name: '藏青灯芯绒短裙', detail: '裙装 · 短款', worn: 1 },
  { id: 'F24', category: 'bottoms', name: '雾蓝缎面半身裙', detail: '裙装 · 缎面', worn: 0 },
  { id: 'F19', category: 'shoes', name: '白色板鞋', detail: '平底 · 运动', worn: 18 },
  { id: 'F30', category: 'shoes', name: '黑色方头乐福鞋', detail: '平底 · 皮质', worn: 6 },
  { id: 'F10', category: 'shoes', name: '波点芭蕾平底鞋', detail: '平底 · 蝴蝶结', worn: 2 },
  { id: 'F21', category: 'shoes', name: '红色芭蕾平底鞋', detail: '平底 · 亮色', worn: 1 },
  { id: 'F29', category: 'bags', name: '黑色托特包', detail: '托特 · 通勤', worn: 15 },
  { id: 'F20', category: 'bags', name: '酒红腋下包', detail: '腋下 · 皮质', worn: 3 },
  { id: 'F08', category: 'bags', name: '棕色弧形腋下包', detail: '腋下 · 弯月', worn: 2 },
  { id: 'F25', category: 'bags', name: '豹纹针织托特', detail: '托特 · 针织', worn: 1 },
  { id: 'F17', category: 'accessories', name: '玳瑁抓夹', detail: '发饰 · 玳瑁', worn: 5 },
  { id: 'F26', category: 'accessories', name: '银色雕塑手镯', detail: '手镯 · 银色', worn: 4 },
  { id: 'F07', category: 'accessories', name: '格纹羊毛围巾', detail: '围巾 · 羊毛', worn: 2 }
].map(g => ({ ...g, image: M(g.id) }));
const defaultGarments = appGender === 'male' ? maleGarments : femaleGarments;
const savedGarments = (() => { try { return JSON.parse(localStorage.getItem(K('garments')) || 'null'); } catch { return null; } })();
const removedGarments = (() => { try { return new Set(JSON.parse(localStorage.getItem(K('removed')) || '[]')); } catch { return new Set(); } })();
let appGarments;
if (savedGarments && savedGarments.length) {
  // keep user's data, merge in new defaults, but never re-add ones the user deleted
  const ids = new Set(savedGarments.map(g => g.id));
  appGarments = savedGarments.concat(defaultGarments.filter(g => !ids.has(g.id) && !removedGarments.has(g.id)));
} else {
  appGarments = defaultGarments.filter(g => !removedGarments.has(g.id));
}
function saveGarments() { localStorage.setItem(K('garments'), JSON.stringify(appGarments)); }
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

const G = id => maleGarments.concat(femaleGarments).find(g => g.id === id) || {};
function makeLook(id, title, reason, slots, tryOn) {
  // slots: [outer, top, bottom, shoes, accessory] garment ids (null = empty slot)
  const [o, t, b, sh, a] = slots;
  return { id, title, reason, tryOn,
    outer: o && M(o), top: t && M(t), bottom: b && M(b), shoes: sh && M(sh), bag: a && M(a),
    outerId: o, topId: t, bottomId: b, shoesId: sh, bagId: a,
    items: slots.filter(Boolean).map(x => G(x).name) };
}
// 搭配库：每套一个 id；按场合分组。r = {outer, top, bottom, shoes, bag, acc}
function look(id, title, reason, r, tryOn) {
  const slot5 = r.bag || r.acc || null;
  const L = makeLook(id, title, reason, [r.outer || null, r.top || null, r.bottom || null, r.shoes || null, slot5], tryOn);
  const all = [r.outer, r.top, r.bottom, r.shoes, r.bag, r.acc].filter(Boolean);
  L.allIds = all; L.items = all.map(x => G(x).name);
  // canvas: when there is no outer layer, the top takes the large left slot
  if (!r.outer) { L.outer = M(r.top); L.outerId = r.top; L.top = r.bag && r.acc ? M(r.acc) : null; L.topId = r.bag && r.acc ? r.acc : null; }
  return L;
}
const femaleLooks = {
  f01: look('f01', '柔雾约会', '奶油开衫配雾蓝缎面，软糯对光泽；酒红腋下包是唯一的深色，把整体收住。', { outer: 'F04', top: 'F02', bottom: 'F24', shoes: 'F10', bag: 'F20' }, 'female/look01.webp'),
  f02: look('f02', '法式条纹', '开衫叠细条纹是法式经典；浅牛仔放松，红色芭蕾鞋是全身唯一的亮色。', { outer: 'F04', top: 'F06', bottom: 'F23', shoes: 'F21', acc: 'F17' }, 'female/look02.webp'),
  f03: look('f03', '静奢暖调', '奶油、卡其、棕、黑一路往深走，同色系渐变，不费力的高级。', { outer: 'F04', top: 'F28', bottom: 'F03', shoes: 'F30', bag: 'F08' }, 'female/look03.webp'),
  f04: look('f04', '甜酷缎面', '皮衣的硬配缎面的软；上身黑、下身浅，比例最显高。', { outer: 'F32', top: 'F28', bottom: 'F24', shoes: 'F10', bag: 'F20' }, 'female/look04.webp'),
  f05: look('f05', '西装牛仔', '廓形西装 + 白衬衫领口 + 浅牛仔，通勤里最松弛的一套；银手镯压在衬衫袖口上。', { outer: 'F15', top: 'F18', bottom: 'F23', shoes: 'F30', bag: 'F29', acc: 'F26' }, 'female/look05.webp'),
  f06: look('f06', '驼色静奢', '驼、黑、灰三色收得很干净，格纹围巾把颜色串起来。', { outer: 'F27', top: 'F28', bottom: 'F16', shoes: 'F30', bag: 'F08', acc: 'F07' }, 'female/look06.webp'),
  f07: look('f07', '秋日学院', '白衬衫 + 藏青灯芯绒短裙 + 驼色大衣：长外套配短裙，腿显得最长。', { outer: 'F27', top: 'F18', bottom: 'F22', shoes: 'F30', acc: 'F17' }, 'female/look07.webp'),
  f08: look('f08', '薄荷卡其', '薄荷绿配卡其百褶，两种低饱和色最温柔；波点鞋添一点俏皮。', { top: 'F05', bottom: 'F03', shoes: 'F10', bag: 'F08', acc: 'F26' }, 'female/look08.webp'),
  f09: look('f09', '漏肩西裤', '为约会买的漏肩上衣终于出场：一侧露肩是小心机，灰色西装裤让它不过分；银手镯呼应肩线，晚餐也合适。', { top: 'F01', bottom: 'F16', shoes: 'F30', bag: 'F08', acc: 'F26' }, 'female/look09.webp'),
  f10: look('f10', '美式复古', '牛仔衬衫配灰色百褶长裙，白板鞋和豹纹托特一下子减龄。', { top: 'F11', bottom: 'F14', shoes: 'F19', bag: 'F25' }, 'female/look10.webp'),
  f11: look('f11', '灯芯绒红鞋', '黑皮衣 + 白垂领 + 棕色灯芯绒，红鞋和酒红腋下包上下呼应，复古电影感。', { outer: 'F32', top: 'F02', bottom: 'F09', shoes: 'F21', bag: 'F20', acc: 'F17' }, 'female/look11.webp'),
  f12: look('f12', '周末条纹', '亨利领细条纹 + 浅牛仔 + 白板鞋，最轻松也最不会出错；围巾和豹纹托特添一点层次。', { top: 'F13', bottom: 'F23', shoes: 'F19', bag: 'F25', acc: 'F07' }, 'female/look12.webp')
};
const maleLooks = {
  m_l1: look('m_l1', '干净约会', '粉配橄榄绿是两种低饱和色的对比，粉色不显嫩反而干净；灰色跑鞋比穆勒更利落，串珠项链在领口点一下。', { top: 'wd-08', bottom: 'wd-20', shoes: 'wd-40', acc: 'wd-45' }, 'male/tryon-l1.webp'),
  m_l2: look('m_l2', '叠穿街头', '粉衬衫敞开当外层，灰 T 压住粉色的面积；米灰工装裤是中性色；黑色高帮帆布鞋和帽子收住街头感。', { outer: 'wd-08', top: 'wd-04', bottom: 'wd-15', shoes: 'wd-42', acc: 'wd-17' }, 'male/tryon-l2.webp'),
  m_l3: look('m_l3', '松弛领带', '黑色阔腿裤稳住重心，让粉色成为唯一亮色；领带的补丁和裤子的小狗刺绣彼此呼应。', { top: 'wd-08', bottom: 'wd-06', shoes: 'wd-29', acc: 'wd-31' }, 'male/tryon-l3.webp'),
  m_d1: look('m_d1', '工装靴', '工装夹克配灰 T 和做旧牛仔，黑色工装靴让整身更硬朗，双肩包单肩背更随性。', { outer: 'wd-27', top: 'wd-04', bottom: 'wd-32', shoes: 'wd-41', bag: 'wd-43' }, 'male/tryon-d1.webp'),
  m_d2: look('m_d2', '条纹帆布', '拉链卫衣敞开露出条纹 T，黑色刺绣阔腿裤配黑色高帮帆布鞋，黑托特把颜色收住。', { outer: 'wd-02', top: 'wd-26', bottom: 'wd-06', shoes: 'wd-42', bag: 'wd-44' }, 'male/tryon-d2.webp'),
  m_d3: look('m_d3', '印花跑鞋', '照片夹克配米白印花 T，橄榄阔腿裤和银灰跑鞋同属低饱和，星星项链加一点亮。', { outer: 'wd-11', top: 'wd-10', bottom: 'wd-20', shoes: 'wd-40', acc: 'wd-46' }, 'male/tryon-d3.webp')
};
const lookGroups = appGender === 'male'
  ? { date: ['m_l1', 'm_l2', 'm_l3'], other: ['m_d1', 'm_d2', 'm_d3'] }
  : { date: ['f09', 'f11', 'f12'], party: ['f04', 'f01', 'f02'], commute: ['f05', 'f06', 'f03'], other: ['f07', 'f08', 'f10'] };
const lookPool = appGender === 'male' ? maleLooks : femaleLooks;
const isHeroPath = () => false;

const defaultProfile = { height: '', size: 'M', bodyShape: '', styles: [], constraints: [] };
const savedProfile = (() => { try { return JSON.parse(localStorage.getItem(K('profile')) || 'null'); } catch { return null; } })();
const savedAvatar = (() => { try { return localStorage.getItem(K('avatar')) || ''; } catch { return ''; } })();

// Diary records persisted to localStorage. Seed with the recent month so the persona summary is meaningful.
function dateStr(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
const seedRec = (off, scene, title, reason, ids, feel, temp) => ({ date: dateStr(off), scene, title, reason, garmentIds: ids, items: ids.map(x => G(x).name), images: ids.map(M), feel, feels: [feel], temp });
const femaleSeedDiary = [
  seedRec(1, 'commute', '黑白基础', '最省心的一套。', ['F28','F23','F19','F29'], '很舒服', 16),
  seedRec(2, 'commute', '西装通勤', '周会穿得正式一点。', ['F15','F28','F16','F30','F29'], '偏正式了', 17),
  seedRec(4, 'daily', '黑白基础', '周末逛街。', ['F32','F28','F23','F19'], '很舒服', 18),
  seedRec(6, 'commute', '条纹牛仔', '换了件条纹。', ['F06','F23','F19','F29'], '很舒服', 19),
  seedRec(8, 'commute', '黑白基础', '又是这一套。', ['F28','F23','F19','F29'], '很舒服', 20),
  seedRec(11, 'party', '皮夹克聚会', '同事生日饭。', ['F32','F28','F23','F30','F20'], '版型好看', 21),
  seedRec(14, 'commute', '亨利领通勤', '灰白条纹配西裤。', ['F13','F16','F30','F29'], '很舒服', 22),
  seedRec(17, 'commute', '黑白基础', '早起赶地铁。', ['F28','F23','F19','F29'], '很舒服', 22),
  seedRec(21, 'daily', '大衣周末', '降温了。', ['F27','F28','F23','F19','F17'], '很舒服', 19),
  seedRec(25, 'commute', '黑白基础', '雨天也穿它。', ['F28','F16','F19','F29'], '有点冷', 18)
];
const seedDiary = appGender !== 'male' ? femaleSeedDiary : [
  seedRec(1, 'daily', '复古工装街头', '工装夹克 + 灰 T + 工装裤。', ['wd-27','wd-04','wd-15','wd-40','wd-43'], '很舒服', 23),
  seedRec(3, 'daily', '条纹丹宁街头', '蓝拉链卫衣配条纹 T 和做旧牛仔。', ['wd-02','wd-26','wd-32','wd-42'], '回头率高', 22),
  seedRec(5, 'commute', '灰 T 卫裤', '上课最省心的一套。', ['wd-04','wd-24','wd-40','wd-43','wd-17'], '很舒服', 21),
  seedRec(7, 'daily', '复古工装街头', '工装 × 跑鞋。', ['wd-27','wd-04','wd-15','wd-40','wd-43'], '很舒服', 24),
  seedRec(9, 'party', '条纹丹宁街头', '聚会里也够松弛。', ['wd-02','wd-26','wd-32','wd-42','wd-46'], '还想再穿', 24),
  seedRec(12, 'commute', '印花休闲', '照片夹克配印花 T。', ['wd-11','wd-10','wd-20','wd-40','wd-43'], '版型好看', 22),
  seedRec(15, 'commute', '灰 T 卫裤', '赶早课。', ['wd-04','wd-24','wd-40','wd-43'], '很舒服', 25),
  seedRec(18, 'daily', '复古工装街头', '周末出街。', ['wd-27','wd-04','wd-15','wd-29','wd-17'], '很舒服', 25),
  seedRec(22, 'daily', '条纹丹宁街头', '省心的街头搭配。', ['wd-02','wd-26','wd-32','wd-36','wd-44'], '回头率高', 22),
  seedRec(26, 'commute', '印花休闲', '经典印花休闲组合。', ['wd-11','wd-10','wd-20','wd-40','wd-43'], '很舒服', 26)
];
const savedDiary = (() => { try { return JSON.parse(localStorage.getItem(K('diary')) || 'null'); } catch { return null; } })();

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
function saveDiary() { localStorage.setItem(K('diary'), JSON.stringify(appState.diary)); }

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
  hanger: '<svg viewBox="0 0 24 24"><path d="M12 7a2 2 0 1 1 2-2c0 1.2-2 1.6-2 3.2L3 15c-.8.6-.4 2 .7 2h16.6c1.1 0 1.5-1.4.7-2l-9-6.8"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/></svg>',
  cloud: '<svg viewBox="0 0 24 24"><path d="M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18z"/></svg>',
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
  if (tab === 'diary') appState.diaryView = 'gallery';
  appState.tab = tab;
  appState.subview = null;
  appState.category = null;
  appRender();
}

function appRender() {
  const views = { wardrobe: wardrobePage, styling: stylingPage, diary: diaryPage, shopping: shoppingPage };
  const page = views[appState.tab];
  document.getElementById('screen').innerHTML = `<div class="v3">${page()}</div>${appNav()}`;
  window.scrollTo({ top: 0, behavior: 'instant' });
  // Keep the selected diary day in view instead of always showing the 1st.
  const activeDay = document.querySelector('#day-strip button.active');
  if (activeDay) activeDay.parentElement.scrollLeft = activeDay.offsetLeft - activeDay.parentElement.clientWidth / 2 + activeDay.clientWidth / 2;
}

function femalePendingPage() {
  const titles = { styling: '今天的穿搭', diary: '穿搭日记', shopping: '购物' };
  return `<main class="app-page">${pageTop(titles[appState.tab])}<section class="pending-card"><p class="micro">FEMALE DEMO · IN PROGRESS</p><h2>女生演示线素材收集中</h2><p>故事：周可周六去武康路看展，想穿上那件买了两个月、一次没穿过的奶油色马海毛开衫。组员正在找对应的衣服图片，到齐后这里会换成她的搭配、日记和诊断。</p><button class="dark-button" onclick="setGender('male')">先看男生版完整流程</button></section></main>`;
}
function weatherBanner() {
  const w = appState.weather;
  return `<div class="weather-banner"><span class="weather-icon">${appIcons.cloud}</span><div class="weather-copy"><b>${w.temp}°<small>${w.desc ? ' · ' + w.desc : ''}</small></b><span>${w.location}${w.hi !== '' ? ' · 今日 ' + w.hi + '° / ' + w.lo + '°' : ''}</span></div><button class="weather-refresh" onclick="appToast('当前为示例天气')" aria-label="天气说明">示例</button></div>`;
}

function pageTop(title, backAction = '') {
  if (backAction) return `<header class="page-top compact"><button class="circle-icon" aria-label="返回" onclick="${backAction}">${appIcons.back}</button><h1>${title}</h1><span class="top-spacer"></span></header>`;
  return `<header class="brand-top">${brandLogo()}<span class="top-actions"><button class="circle-icon${appState.avatar ? ' has-avatar' : ''}" aria-label="个人档案" onclick="openProfileSheet()">${appState.avatar ? `<img src="${appState.avatar}" alt="我">` : appIcons.user}</button></span></header>${appState.tab === 'styling' ? weatherBanner() : ''}<h1 class="page-title">${title}</h1>`;
}

function genderToggle() {
  return `<span class="gender-toggle" role="group" aria-label="切换演示版本">${[['female','女'],['male','男']].map(([g,l]) => `<button type="button" aria-pressed="${appGender===g}" onclick="setGender('${g}')">${l}</button>`).join('')}</span>`;
}
function brandLogo() {
  return `<span class="brand-lockup"><svg viewBox="0 0 44 44" aria-hidden="true"><rect width="44" height="44" rx="12" fill="#2E2C2A"/><path d="M13 12v13a9 9 0 0 0 18 0V12" fill="none" stroke="#F6EFE6" stroke-width="6" stroke-linecap="round"/><path d="M31 12v5" stroke="#C4644A" stroke-width="6" stroke-linecap="round"/></svg><b>WEARU</b></span>`;
}
function fashionCategoryArt(id) {
  const src = appGender === 'male' ? `category-male/${id}.webp` : `category/${id}.webp`;
  return `<span class="category-art" aria-hidden="true"><img src="${src}" alt="" decoding="async"></span>`;
}
function wardrobePage() {
  if (appState.subview === 'category') return categoryPage();
  return `<main class="app-page wardrobe-page">
    ${pageTop('我的衣橱')}
    <p class="wardrobe-subtitle">穿搭灵感，从你拥有的开始。</p>
    <div class="category-collage" aria-label="按品类浏览衣橱">
      ${['tops','outer','bottoms','bags','shoes','accessories'].map((id,i) => `<button class="category-object object-${id}" onclick="openCategoryV3('${id}')" aria-label="浏览${appCategories.find(c=>c.id===id).name}">${fashionCategoryArt(id)}<span class="category-name">${appCategories.find(c=>c.id===id).name}${appGender==='male' && !categoryCount(id) ? '<em class="gap-tag">缺口</em>' : ''}<span aria-hidden="true"> ↗</span></span></button>`).join('')}
    </div>
    <section class="closet-cta"><div><p class="micro">MAKE IT YOURS</p><h2>今天穿什么？</h2></div><button class="dark-button" onclick="startStyling()">开始搭配 <span aria-hidden="true">↗</span></button></section>
  </main>`;
}

const categoryArt = {
  tops: '<path d="M28 18l12-5c2 9 14 9 16 0l12 5 12 14-13 10-7-6v33H36V36l-7 6-13-10z"/>',
  outer: '<path d="m35 14-14 8-8 34 14 4 6-23-3 35h36l-3-35 6 23 14-4-8-34-14-8-13 11z"/><path d="M35 14l-2 21 12-6 3 43m13-58 2 21-12-6M36 57h6m12 0h6"/>',
  bottoms: '<path d="M30 12h36l4 61H53l-5-40-5 40H26z"/><path d="M30 22h36m-18 0v11"/>',
  accessories: '<path d="M24 25c0 21 9 34 24 34s24-13 24-34"/><path d="m48 55 8 10-8 9-8-9z"/>',
  shoes: '<path d="M18 46c5-4 11-14 14-23l11 5 6 10 24 8c6 2 9 7 9 12v6H14V51z"/><path d="M14 57h68m-44-23 10 4m-13 3 12 4"/>',
  bags: '<path d="M23 32h50l5 40H18z"/><path d="M35 35V25a13 13 0 0 1 26 0v10"/>'
};

function escapeText(value) {
  return String(value ?? '').replace(/[&<>"']/g, char =>
    ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
}

const categoryBrowse = { filter:'', order:'default' };
function openCategoryV3(category) {
  appState.category = category;
  appState.subview = 'category';
  Object.assign(categoryBrowse, {filter:'',order:'default'});
  appRender();
  document.querySelector('.category-page .page-top button')?.focus({preventScroll:true});
}

function updateCategoryBrowse(key, value, control) {
  categoryBrowse[key] = value;
  const top = window.scrollY;
  document.querySelector('.category-browser').outerHTML = categoryBrowser();
  document.getElementById(control)?.focus({preventScroll:true});
  window.scrollTo(0, top);
}

function categoryPage() {
  const category = appCategories.find(item => item.id === appState.category);
  return `<main class="app-page category-page">
    ${pageTop(category.name, "appState.subview=null;appRender()")}
    ${categoryBrowser()}
  </main>`;
}

function categoryBrowser() {
  const all = appGarments.filter(item => item.category === appState.category);
  const typeOf = item => (item.detail || '').split('·')[0].trim();
  const types = [...new Set(all.map(typeOf).filter(Boolean))];
  const items = all.filter(item => !categoryBrowse.filter || typeOf(item) === categoryBrowse.filter);
  if (categoryBrowse.order === 'worn') items.sort((a,b) => (b.worn || 0) - (a.worn || 0));
  if (categoryBrowse.order === 'new') items.sort((a,b) => Number(b.id.startsWith('g-')) - Number(a.id.startsWith('g-')) || (b.id.startsWith('g-') ? Number(b.id.slice(2)) - Number(a.id.slice(2)) : 0));
  const add = `<button class="closet-control" onclick="openImportSheet('${appState.category}')">${appIcons.plus} 添加衣服</button>`;
  return `<section class="category-browser">
    <div class="closet-tools"><span>${all.length} 件单品</span>${add}</div>
    <div class="browse-controls">
      <select id="closet-filter" aria-label="筛选类型" onchange="updateCategoryBrowse('filter',this.value,this.id)">
        <option value="">全部类型</option>
        ${types.map(type => `<option ${type === categoryBrowse.filter ? 'selected' : ''}>${escapeText(type)}</option>`).join('')}
      </select>
      <select id="closet-order" aria-label="排序" onchange="updateCategoryBrowse('order',this.value,this.id)">
        <option value="default">默认顺序</option>
        <option value="worn" ${categoryBrowse.order === 'worn' ? 'selected' : ''}>穿得最多</option>
        <option value="new" ${categoryBrowse.order === 'new' ? 'selected' : ''}>最近添加</option>
      </select>
    </div>
    ${items.length ? `<div class="garment-grid" aria-label="衣橱单品">${items.map(garmentTile).join('')}</div>` : emptyCategory(all.length)}
  </section>`;
}

function emptyCategory(total) {
  if (appGender === 'female') return '<div class="closet-empty"><b>女生衣橱素材整理中</b><small>组员正在找图，素材到齐后放进这里。可以先切到「男」体验完整流程。</small><button class="ghost-button" onclick="setGender(\'male\')">切换到男生版</button></div>';
  if (!total) return `<div class="closet-empty"><b>这里还空着</b><small>衣橱诊断发现这是一个缺口：补上它，很多搭配就不再「差一件」。</small><button class="ghost-button" onclick="switchTab('shopping')">看看衣橱缺口 →</button></div>`;
  return '<p class="closet-empty">这里还没有符合条件的衣服。</p>';
}
function garmentTile(item) {
  return `<button class="garment-tile" onclick="openGarmentDetail('${item.id}')"><span class="wear-badge">穿过 ${item.worn} 次</span><img src="${item.image}" alt="${escapeText(item.name)}"><span class="garment-copy"><b>${escapeText(item.name)}</b><small>${escapeText(item.detail)}</small></span></button>`;
}

function openGarmentDetail(id) {
  const item = appGarments.find(entry => entry.id === id);
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()"><section class="garment-modal"><div class="modal-handle"></div><img src="${item.image}" alt="${escapeText(item.name)}"><p class="micro">${appCategories.find(c => c.id === item.category).name}</p><h2>${escapeText(item.name)}</h2><span>${escapeText(item.detail)} · 穿过 ${item.worn} 次</span><button class="dark-button" onclick="closeAppModal();startStyling('${item.id}')">用这件搭一套</button><button class="text-danger" id="del-${item.id}" onclick="confirmDeleteGarment('${item.id}')">移出衣橱</button></section></div>`);
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
  localStorage.setItem(K('removed'), JSON.stringify([...removedGarments]));
  saveGarments();
  closeAppModal();
  appRender();
  appToast('已移出衣橱');
}

function startStyling(id) {
  appState.tab = 'styling';
  appState.subview = null;
  appState.styleSubview = null;
  appState.styleStep = 'setup';
  if (id) appState.stylePicks = [id];
  appRender();
}

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
      <input class="scene-input" id="scene-custom" placeholder="例如：见客户、看展、朋友生日饭…" value="${escapeText(custom)}" oninput="appState.styleCustomScene=this.value;document.querySelectorAll('.scene-pills button').forEach(b=>b.classList.remove('selected'))">
    </section>
    <section class="setup-block">
      <div class="setup-label"><b>有想穿的单品吗？</b><small>可选 · 从衣橱里挑，方案会围绕这件衣服搭配</small></div>
      ${picks.length
        ? `<div class="picked-row">${picks.map(g => `<span class="picked-chip"><img src="${g.image}" alt="">${escapeText(g.name.slice(0,6))}<i onclick="togglePick('${g.id}')">×</i></span>`).join('')}</div>
           <button class="wardrobe-pick-btn" onclick="openStylePicker()">${appIcons.plus}<span>从衣橱继续添加 / 修改</span></button>`
        : `<button class="wardrobe-pick-btn empty" onclick="openStylePicker()">${appIcons.wardrobe}<span><b>从衣橱中挑选</b><small>先选想穿的单品（可选，可跳过）</small></span></button>`
      }
    </section>
    <button class="coral-button generate-button" onclick="generateLooks()">生成 3 套搭配</button>
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
      ${items.map(g => { const on = appState.stylePicks.includes(g.id); return `<button class="pick-card ${on?'selected':''}" onclick="togglePick('${g.id}')"><span class="pick-check">${on?'✓':''}</span><img src="${g.image}" alt="${escapeText(g.name)}"><b>${escapeText(g.name)}</b><small>${escapeText(g.detail)}</small></button>`; }).join('')}
    </div>
    <div class="pick-footer">
      <button class="coral-button" onclick="appState.styleSubview=null;appRender()">${n?`确认选择（${n} 件）`:'先不指定，直接搭配'}</button>
    </div>
  </main>`;
}

function generateLooks() {
  const scene = appState.styleCustomScene ? 'other' : appState.styleScene;
  const group = (lookGroups[scene] || lookGroups.other).map(id => lookPool[id]);
  const picks = pickedGarments();
  let looks;
  if (!picks.length) {
    looks = group.map(l => ({ ...l }));
  } else {
    // prefer looks that already contain every picked item: same scene first, then any scene
    const has = l => picks.every(p => l.allIds.includes(p.id));
    const matched = [...group.filter(has), ...Object.values(lookPool).filter(l => has(l) && !group.includes(l))];
    looks = matched.slice(0, 3).map(l => ({ ...l }));
    const slotOf = { outer: 'outer', tops: 'top', bottoms: 'bottom', shoes: 'shoes', accessories: 'bag', bags: 'bag' };
    for (const base of group) {
      if (looks.length >= 3) break;
      if (looks.some(l => l.id === base.id)) continue;
      const l = { ...base };
      picks.forEach(pick => { const k = slotOf[pick.category]; if (k) { l[k] = pick.image; l[k + 'Id'] = pick.id; } });
      l.allIds = [l.outerId, l.topId, l.bottomId, l.shoesId, l.bagId].filter(Boolean);
      l.items = l.allIds.map(id => (appGarments.find(g => g.id === id) || {}).name).filter(Boolean);
      l.reason = `围绕你选的「${picks.map(p => p.name).join('、')}」：${l.items.join(' + ')}。`;
      l.tryOn = null;
      looks.push(l);
    }
  }
  appState.styleLooks = looks;
  appState.styleActive = 0;
  appState.styleStep = 'result';
  const screen = document.getElementById('screen');
  screen.innerHTML = `<div class="v3"><main class="app-page styling-page"><div class="generating"><span class="spinner"></span><b>正在为你搭配…</b><small>结合天气、场合和你的衣橱</small></div></main></div>`;
  setTimeout(() => appRender(), 900);
}

function currentSceneLabel() { return appState.styleCustomScene || sceneName(appState.styleScene); }

function stylingResult() {
  const looks = appState.styleLooks;
  return `<main class="app-page styling-page result-page">
    ${pageTop('搭配方案', "appState.styleStep='setup';appRender()")}
    <div class="result-meta"><span class="meta-chip">${escapeText(currentSceneLabel())}</span><span class="meta-chip">${appState.weather.temp}° ${appState.weather.desc||''}</span>${appState.stylePicks.length?`<span class="meta-chip">含指定单品 ${appState.stylePicks.length} 件</span>`:''}</div>
    <p class="swipe-hint">为你准备了 ${looks.length} 套 · 左右滑动看看 →</p>
    <div class="look-scroller" id="look-scroller" onscroll="onLookScroll()">
      ${looks.map((look, i) => lookSlide(look, i)).join('')}
    </div>
    <div class="look-dots">${looks.map((_, i) => `<span class="${i===appState.styleActive?'on':''}"></span>`).join('')}</div>
    <button class="ghost-button" onclick="openTryOn()">查看上身效果</button>
    <button class="coral-button" onclick="wearThis()">穿这套 · 记入日记</button>
  </main>`;
}

// One shared composition for recommendations, archive covers and diary details.
function outfitCanvas(images = [], names = []) {
  const slots = ['outer', 'top', 'bottom', 'shoes', 'accessory'];
  return `<span class="outfit-canvas" role="group" aria-label="整套穿搭">${images.slice(0, 5).map((src, i) => src ? `<img class="outfit-piece piece-${slots[i]}" src="${escapeText(src)}" alt="${escapeText(names[i] || ['外套','上装','下装','鞋履','配饰'][i])}" loading="lazy">` : '').join('')}</span>`;
}

function lookSlide(look, i) {
  return `<section class="look-slide">
    <div class="look-heading"><div><p class="micro">方案 ${i+1} / ${appState.styleLooks.length}</p><h2>${look.title}</h2></div><span>LOOK 0${i+1}</span></div>
    ${outfitCanvas([look.outer, look.top, look.bottom, look.shoes, look.bag], look.items)}
    <p class="look-reason">${look.reason}</p>
    <div class="look-items">${look.items.map(t => `<span>${escapeText(t)}</span>`).join('')}</div>
  </section>`;
}

function onLookScroll() {
  const sc = document.getElementById('look-scroller');
  if (!sc) return;
  const i = Math.max(0, Math.min(appState.styleLooks.length - 1, Math.round(sc.scrollLeft / ((sc.querySelector('.look-slide')?.getBoundingClientRect().width || sc.clientWidth) + 14))));
  if (i !== appState.styleActive) {
    appState.styleActive = i;
    document.querySelectorAll('.look-dots span').forEach((d, idx) => d.classList.toggle('on', idx === i));
  }
}

// ---------- AI try-on ----------
function openTryOn() {
  onLookScroll();
  const look = appState.styleLooks[appState.styleActive] || {};
  if (!look.tryOn) return appToast('这套暂无试穿演示 · 演示路径：约会 + 粉色格纹衬衫');
  openTryOnViewer(look.tryOn, look.title || '这套', 'AI 试穿', true);
}

// ---------- confirm & write to diary ----------
function wearThis() {
  onLookScroll();
  const look = appState.styleLooks[appState.styleActive];
  const garmentIds = look.allIds ? [...new Set(look.allIds)] : [look.outerId, look.topId, look.bottomId, look.shoesId, look.bagId].filter(Boolean);
  const date = dateStr(0);
  const previous = appState.diary.find(record => record.date === date);
  const previousIds = new Set(previous?.garmentIds || []);
  const nextIds = new Set(garmentIds);
  let bumped = 0;
  const firstWear = appGarments.filter(g => nextIds.has(g.id) && !previousIds.has(g.id) && !(g.worn > 0)).map(g => g.name);
  for (const garment of appGarments) {
    const change = Number(nextIds.has(garment.id)) - Number(previousIds.has(garment.id));
    if (change) garment.worn = Math.max(0, (garment.worn || 0) + change);
    if (change > 0) bumped++;
  }
  saveGarments();
  const rec = {
    date,
    scene: appState.styleCustomScene ? 'custom' : appState.styleScene,
    sceneLabel: currentSceneLabel(),
    title: look.title,
    reason: look.reason,
    items: look.items,
    garmentIds,
    images: [look.outer, look.top, look.bottom, look.shoes, look.bag],
    temp: appState.weather.temp,
    feel: previous?.feel ?? null,
    feels: previous?.feels || [],
    photo: previous?.photo,
    note: previous?.note
  };
  appState.diary = appState.diary.filter(r => r.date !== rec.date);
  appState.diary.unshift(rec);
  saveDiary();
  appState.tab = 'diary';
  appState.diaryView = 'day';
  appState.diaryYear = today.getFullYear();
  appState.diaryMonth = today.getMonth() + 1;
  appState.diaryDay = today.getDate();
  appRender();
  appToast(firstWear.length ? `「${firstWear[0]}」第一次出门 · ${bumped} 件衣服穿着 +1` : bumped ? `已记入日记 · ${bumped} 件衣服穿着 +1` : '已更新今天的穿搭');
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
    <div class="archive-intro"><span>YOUR STYLE, IN REAL LIFE</span><p>每一次穿出门，都是你的风格。</p></div>
    <div class="diary-view-switch" aria-label="日记视图">
      <button aria-pressed="${appState.diaryView !== 'day'}" onclick="setDiaryView('gallery')">穿搭集</button>
      <button aria-pressed="${appState.diaryView === 'day'}" onclick="setDiaryView('day')">按日期记录</button>
    </div>
    <div class="date-picker">
      <select onchange="appState.diaryYear=+this.value;appRender()">${years.map(v => `<option value="${v}" ${v===y?'selected':''}>${v} 年</option>`).join('')}</select>
      <select onchange="appState.diaryMonth=+this.value;appRender()">${Array.from({length:12},(_, i) => i+1).map(v => `<option value="${v}" ${v===m?'selected':''}>${v} 月</option>`).join('')}</select>
    </div>
    <div class="day-strip" id="day-strip" ${appState.diaryView !== 'day' ? 'hidden' : ''}>${Array.from({length:nDays},(_, i) => i+1).map(d => `<button class="${d===appState.diaryDay?'active':''}" onclick="selectDiaryDay(${d},this)"><b>${d}</b>${dotDates.has(`${y}-${pad(m)}-${pad(d)}`)?'<i></i>':''}</button>`).join('')}</div>

    <div id="diary-body">${renderDiaryBody()}</div>
  </main>`;
}

// records + persona for the selected day (re-rendered on day click without touching the day strip)
function setDiaryView(view) {
  appState.diaryView = view;
  appRender();
}
function openDiaryRecord(date) {
  const [y, m, d] = date.split('-').map(Number);
  appState.diaryYear = y; appState.diaryMonth = m; appState.diaryDay = d;
  setDiaryView('day');
}
function diaryGallery() {
  const prefix = `${appState.diaryYear}-${pad(appState.diaryMonth)}-`;
  const records = appState.diary.filter(r => r.date.startsWith(prefix)).sort((a,b) => b.date.localeCompare(a.date));
  return `<div class="archive-count"><span>${records.length} 套真实穿搭</span><span>点击查看当天记录 ↗</span></div>
    ${records.length ? `<div class="outfit-gallery">${records.map(r => `<button class="outfit-cover" onclick="openDiaryRecord('${r.date}')" aria-label="查看 ${r.date} ${escapeText(r.title)}">
      <span class="outfit-cover-art">${outfitCanvas(r.images, r.items)}<span class="cover-date">${r.date.slice(5).replace('-', ' / ')}</span>${r.photo ? '<span class="cover-photo">含实穿照</span>' : ''}</span>
      <span class="cover-title">${escapeText(r.title)}</span><span class="cover-caption">${escapeText(r.sceneLabel || sceneName(r.scene))}${r.feels?.length ? ' · ' + escapeText(r.feels[0]) : ''}</span>
    </button>`).join('')}</div>` : '<div class="diary-empty"><b>这个月的风格故事，等你开始</b><small>搭配后点「穿这套」，整套造型会收藏在这里。</small><button onclick="startStyling()">开始搭配</button></div>'}
    ${personaSummary()}`;
}
function renderDiaryBody() {
  if (appState.diaryView !== 'day') return diaryGallery();
  const key = selectedDateKey();
  const dayRecords = appState.diary.filter(r => r.date === key);
  return `${dayRecords.length ? dayRecords.map(diaryCard).join('') : `<div class="diary-empty"><b>这天还没有记录</b><small>去穿搭页选一套，点「穿这套」就会出现在这里</small><button onclick="startStyling()">去搭配</button></div>`}
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
    <div class="entry-date"><span>${escapeText(rec.sceneLabel || sceneName(rec.scene))} · ${rec.temp||''}°</span><i>已穿出门</i></div>
    ${outfitCanvas(rec.images, rec.items)}
    <h2>${rec.title}</h2><p>${rec.reason||''}</p>
    ${rec.photo
      ? `<div class="diary-photo"><img src="${rec.photo}" alt="今日实拍"><button class="photo-retake" onclick="document.getElementById('diary-cam-${rec.date}').click()">重拍</button></div>`
      : `<button class="diary-photo-add" onclick="document.getElementById('diary-cam-${rec.date}').click()">${appIcons.camera}<span>拍一张今天的实穿照</span></button>`}
    <input id="diary-cam-${rec.date}" type="file" accept="image/*" capture="environment" hidden onchange="addDiaryPhoto(event,'${rec.date}')">
    <div class="feel-block">
      <p class="feel-title">当天感受（可多选，也可以自己写）</p>
      <div class="feel-chips">${chips}</div>
      <div class="feel-write"><input id="feel-note-${rec.date}" type="text" placeholder="想补充点什么…" value="${escapeText(rec.note)}"><button onclick="saveDiaryNote('${rec.date}')">记下</button></div>
      ${rec.note ? `<div class="saved-feedback">已记：${escapeText(rec.note)}</div>` : ''}
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
  const wornIds = new Set(recent.flatMap(r => r.garmentIds || []));
  const idle = appGarments.filter(g => !wornIds.has(g.id));
  return `<section class="profile-insight">
    <div class="section-title"><h2>WEARU 更懂你</h2><span>近 30 天 · 个人画像</span></div>
    <div class="persona-grid">
      <div class="persona-cell"><small>记录穿搭</small><b>${recent.length} 次</b></div>
      <div class="persona-cell"><small>最常穿</small><b>${escapeText(topItem)}</b><em>${topItemN} 次</em></div>
      <div class="persona-cell"><small>高频场景</small><b>${sceneName(topScene)}</b><em>占 ${Math.round(topSceneN/recent.length*100)}%</em></div>
      <div class="persona-cell"><small>偏好风格</small><b>${topTitle}</b></div>
    </div>
    <p class="persona-note">近 30 天你最常穿「${escapeText(topItem)}」，有 <b>${idle.length} 件衣服一次都没穿过</b>${idle.length ? `，比如「${escapeText(idle.slice(0,3).map(g => g.name).join('」「'))}」` : ''}。你的印花 T 已经够多了，缺的是能把它们串起来的基础款。</p>
    <button class="ghost-button" onclick="switchTab('shopping')">看看衣橱诊断，去添几件衣服 →</button>
  </section>`;
}

// ---------- Shopping: smart picks (wardrobe status + budget) + community ----------
const maleShopRecs = [
  { name: '水洗丹宁外套', price: 460, range: '¥350–650', scene: '外套 · 街头', fills: '缺基础中性外层', unlock: '新增约 5 套', note: '外套偏卫衣/工装，缺一件百搭丹宁；和你的条纹 T、做旧牛仔天生一对', img: 'male/rec-denim.webp', onBody: 'male/recwear-denim.webp', query: '男 水洗 做旧 丹宁外套', gap: true },
  { name: '黑色机能斜挎包', price: 220, range: '¥150–350', scene: '配件 · 通勤', fills: '包都偏大，缺约会小包', unlock: '约会、看展都能背', note: '双肩包和托特都偏大偏随意，一只黑色小斜挎能给约会穿搭收尾', img: 'male/rec-bag.webp', onBody: 'male/recwear-bag.webp', query: '男 黑色 机能 斜挎包', gap: true },
  { name: '复古厚底板鞋', price: 380, range: '¥280–600', scene: '鞋履 · 街头', fills: '没有浅色干净的鞋', unlock: '新增约 6 套', note: '5 双鞋都是深色或运动款，一双米白厚底板鞋能配粉衬衫、条纹 T 和所有浅色裤子', img: 'male/rec-shoes.webp', onBody: 'male/recwear-shoes.webp', query: '男 复古 厚底 板鞋', gap: true },
  { name: '黑色重磅基础 Tee', price: 120, range: '¥80–200', scene: '打底 · 百搭', fills: '缺纯色打底', unlock: '解锁外套叠穿', note: '10 件上衣几乎都是印花，缺一件纯黑打底，叠穿才不打架', img: 'male/rec-tee.webp', onBody: 'male/recwear-tee.webp', query: '男 黑色 重磅 纯棉 Tee', gap: true }
];
const shopOutfits = [
  { title: '丹宁 × 条纹街头', img: 'male/recwear-denim.webp', note: '丹宁外套 + 你的条纹 T、做旧牛仔、印花穆勒' },
  { title: '斜挎 × 工装', img: 'male/recwear-bag.webp', note: '斜挎包 + 你的工装夹克、灰 T、工装裤' },
  { title: '黑 Tee 叠印花', img: 'male/recwear-tee.webp', note: '黑 Tee 打底 + 你的照片印花夹克、卫裤' },
  { title: '板鞋 × 阔腿', img: 'male/recwear-shoes.webp', note: '厚底板鞋 + 你的印花 T、橄榄阔腿裤' }
];
const maleCommunityFeed = [
  { user: 'Kern', avatar: '🧑🏻', scene: '度假', hero: '../images/comm-12.png', caption: '橄榄半拉链亚麻衬衫配白色阔腿裤，松弛的度假街头，斜挎小包点睛。', likes: 421, items: [{ name: '橄榄半拉链衬衫', q: '男 橄榄绿 半拉链 亚麻衬衫' }, { name: '白色阔腿裤', q: '男 白色 阔腿裤' }] },
  { user: '13', avatar: '🕶️', scene: '街头', hero: '../images/comm-14.png', caption: '复古拼色橄榄球 Polo 配水洗直筒牛仔，学院里带点街头痞感。', likes: 356, items: [{ name: '拼色橄榄球 Polo', q: '男 复古 拼色 橄榄球Polo' }, { name: '水洗直筒牛仔', q: '男 水洗 直筒牛仔裤' }] },
  { user: 'Noah', avatar: '🧑🏼', scene: '通勤', hero: '../images/comm-21.png', caption: '薄针织蓝 V 领叠白衬衫，白阔腿裤，夏天最通透的干净感。', likes: 298, items: [{ name: '蓝色 V 领针织', q: '男 蓝色 V领 薄针织' }, { name: '白色阔腿裤', q: '男 白色 阔腿裤' }] },
  { user: 'Ash', avatar: '🧑🏻‍🎤', scene: '约会', hero: '../images/comm-30.png', caption: '牛仔拼接短袖衬衫系一条印花丝巾，复古又精致，配黑西裤显利落。', likes: 264, items: [{ name: '牛仔拼接短袖衬衫', q: '男 牛仔拼接 短袖衬衫' }, { name: '印花丝巾', q: '印花 丝巾 领巾' }] },
  { user: 'ZL', avatar: '🧑🏻‍🦱', scene: '机能', hero: '../images/comm-07.png', caption: '做旧印花短袖 T 叠迷彩工装裤，慵懒里带点机能街头感。', likes: 233, items: [{ name: '做旧印花短袖 T', q: '男 做旧 印花 短袖T' }, { name: '迷彩工装裤', q: '男 迷彩 工装裤' }] }
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

const femaleShopRecs = [
  { name: '黑色玛丽珍鞋', price: 420, range: '¥300–500', scene: '鞋履 · 约会', fills: '4 双鞋全是平底', unlock: '缎面裙、百褶裙新增约 6 套', note: '你的裙子只能配平底鞋，一双有一点跟的玛丽珍，让雾蓝缎面裙和百褶裙终于能出门', img: M('F31'), onBody: 'female/recwear-maryjane.webp', query: '黑色 玛丽珍鞋 中跟 女', gap: true },
  { name: '深棕色针织背心', price: 220, range: '¥150–300', scene: '上衣 · 叠穿', fills: '缺能叠穿的中间层', unlock: '新增约 5 套', note: '针织和衬衫之间缺一层，深棕背心叠在白衬衫外，和马海毛开衫、牛仔都搭', img: M('F12'), onBody: 'female/recwear-vest.webp', query: '深棕色 针织背心 V领 女', gap: true }
];
const femaleCommunityFeed = [
  { user: 'Mia', avatar: '', scene: '约会', hero: 'female/comm-1.webp', caption: '燕麦色漏肩垂褶上衣配白色阔腿裤，温柔又有一点小心机。', likes: 512, items: [{ name: '漏肩垂褶上衣', q: '燕麦色 漏肩 垂褶 上衣 女' }, { name: '白色阔腿裤', q: '白色 阔腿裤 女' }] },
  { user: 'Yuki', avatar: '', scene: '日常', hero: 'female/comm-2.webp', caption: '白色垂领上衣塞进水洗牛仔，日常也能穿出法式感。', likes: 438, items: [{ name: '白色垂领上衣', q: '白色 垂领 短袖 上衣 女' }, { name: '水洗直筒牛仔', q: '水洗 直筒 牛仔裤 女' }] },
  { user: 'Lin', avatar: '', scene: '通勤', hero: 'female/comm-3.webp', caption: '浅蓝牛仔衬衫配灰色阔腿裤，一身蓝灰很耐看。', likes: 301, items: [{ name: '浅蓝牛仔衬衫', q: '浅蓝 牛仔衬衫 女 修身' }, { name: '灰色阔腿裤', q: '灰色 阔腿裤 女' }] }
];
const shopRecs = appGender === 'male' ? maleShopRecs : femaleShopRecs;
const communityFeed = appGender === 'male' ? maleCommunityFeed : femaleCommunityFeed;
function wardrobeScore() {
  if (appGender === 'female') return 58;
  return 66;
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
  return `<section class="diagnosis-overview"><div><p class="micro">当前衣橱连接度</p><strong>${score}%</strong></div><p>你的 ${appGarments.length} 件单品能组出不少搭配，但受限于下面 ${appGender === 'male' ? 4 : 2} 个缺口，很多组合都「差一件」。补齐后连接度预计升到约 85%。</p></section>

    <div class="section-title"><h2>诊断 → 该补什么</h2><span>缺口决定推荐</span></div>
    <div class="gap-list">
      ${appGender === 'male' ? `
      <div class="gap-row"><span class="gap-x">包袋 ${bags} 个 · 都偏大，缺约会出门的小包</span><i>→</i><b>黑色机能斜挎包</b></div>
      <div class="gap-row"><span class="gap-x">鞋履 ${shoes} 双 · 没有一双浅色干净的</span><i>→</i><b>复古厚底板鞋</b></div>
      <div class="gap-row"><span class="gap-x">${tops} 件上衣几乎全是印花 · 缺纯色打底</span><i>→</i><b>黑色重磅基础 Tee</b></div>
      <div class="gap-row"><span class="gap-x">外套偏卫衣/工装 · 缺基础中性外层</span><i>→</i><b>水洗丹宁外套</b></div>` : `
      <div class="gap-row"><span class="gap-x">鞋履 ${shoes} 双 · 全是平底，裙子没鞋配</span><i>→</i><b>黑色玛丽珍鞋</b></div>
      <div class="gap-row"><span class="gap-x">针织和衬衫之间 · 缺能叠穿的中间层</span><i>→</i><b>深棕色针织背心</b></div>`}
    </div>

    ${appGender === 'male' ? `<section class="dup-warning"><p class="micro">先别买 · 避免重复</p><div><b>你收藏的「复古印花短袖 T」</b><small>衣橱里已有 ${appGarments.filter(g => ['wd-04','wd-10','wd-16','wd-23','wd-26','wd-28'].includes(g.id)).length} 件印花 T 和背心，其中「${escapeText((appGarments.find(g => g.id === 'wd-28') || {}).name || '')}」近 30 天没穿过。先把已有的穿起来。</small></div></section>` : `<section class="dup-warning"><p class="micro">先别买 · 避免重复</p><div><b>你收藏的「白色宽松衬衫」</b><small>和衣橱里的「白色府绸衬衫」几乎一样，它已经穿过 ${(appGarments.find(g => g.id === 'F18') || {}).worn || 0} 次。先别买，把钱留给玛丽珍鞋。</small></div></section>`}

    <section class="budget-block">
      <div class="setup-label"><b>你的预算是多少？</b><small>根据衣橱缺口和预算筛选</small></div>
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
      <div class="rec-img product"><img src="${r.img}" alt="${r.name}"><span>单品</span></div>
      <div class="rec-img"><img src="${r.onBody}" alt="${r.name}上身"><span>配你的衣服 · 效果演示</span></div>
    </div>
    <div class="rec-body">
      <div class="rec-head"><b>${r.name}</b><i>${r.range}</i></div>
      <small>${r.scene}</small>
      ${r.gap ? `<span class="rec-gap">补缺口 · ${r.fills}</span>` : ''}
      <em>${r.note}</em>
      ${r.unlock ? `<span class="rec-unlock">${r.unlock}</span>` : ''}
      <div class="rec-actions">
        <button class="rec-tryon" onclick="openTryOnViewer('${r.onBody}','${r.name}','试穿这件')">${appIcons.hanger}试穿</button>
        <button class="rec-find" onclick="openSimilarSheet('${r.name}','${r.query}','${r.img}')">${appIcons.search}找同款</button>
      </div>
    </div>
  </div>`;
}
function shopOutfitCard(o) {
  return `<div class="rec-outfit"><div class="rec-outfit-hero"><img src="${o.img}" alt="${o.title}"></div><b>${o.title}</b><small>${o.note}</small></div>`;
}

function communityView() {
  return `<p class="swipe-hint">看看别人怎么穿，试穿看效果，喜欢的单品可以找同款</p>
    <div class="feed">${communityFeed.map(feedCard).join('')}</div>`;
}
function feedCard(p) {
  return `<section class="feed-card">
    <div class="feed-top"><span class="feed-avatar">${escapeText(p.user.slice(0,1).toUpperCase())}</span><div><b>${p.user}</b><small>${p.scene} · OOTD</small></div><span class="feed-like">♥ ${p.likes}</span></div>
    <div class="feed-hero"><img src="${p.hero}" alt="${p.user} 的穿搭"><button class="feed-tryon" onclick="openTryOnViewer('${p.hero}','${p.user} 的穿搭','试穿这套')">${appIcons.hanger}试穿这套</button></div>
    <p class="feed-caption">${p.caption}</p>
    <div class="feed-items">${p.items.map(it => `<button onclick="openSimilarSheet('${it.name}','${it.q}','${p.hero}')">${appIcons.search}${it.name} · 找同款</button>`).join('')}</div>
  </section>`;
}

// generic try-on viewer: digital-human preview + option to try on your own photo
function openTryOnViewer(image, title, sub, withWear = false) {
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()">
    <section class="tryon-sheet">
      <div class="modal-handle"></div>
      <p class="micro">${sub} · ${title}</p>
      <h2>看穿上身的效果</h2>
      <div class="tryon-switch"><button class="on" id="tryon-tab-digital" onclick="viewerDigital('${image}')">数字人试穿</button><button id="tryon-tab-me" onclick="document.getElementById('viewer-photo').click()">上传本人照片</button></div>
      <div id="tryon-stage"></div>
      <input id="viewer-photo" type="file" accept="image/*" hidden onchange="onViewerPhoto(event)">
      ${withWear ? `<button class="coral-button tryon-wear" onclick="closeAppModal();wearThis()">穿这套 · 记入日记</button>` : ''}
      <button class="text-button tryon-close" onclick="closeAppModal()">关闭</button>
    </section>
  </div>`);
  viewerDigital(image);
}
function viewerDigital(image) {
  const dt = document.getElementById('tryon-tab-digital'), mt = document.getElementById('tryon-tab-me');
  if (dt) dt.classList.add('on'); if (mt) mt.classList.remove('on');
  const stage = document.getElementById('tryon-stage');
  stage.innerHTML = `<div class="generating small"><span class="spinner"></span><b>正在生成试穿效果…</b></div>`;
  setTimeout(() => { stage.innerHTML = `<div class="tryon-result"><img src="${image}" alt="试穿效果"><p class="micro">效果演示 · 仅供参考、非真实合身</p></div>`; }, 800);
}
function onViewerPhoto(event) {
  const f = event.target.files?.[0]; if (!f) return;
  const dt = document.getElementById('tryon-tab-digital'), mt = document.getElementById('tryon-tab-me');
  if (dt) dt.classList.remove('on'); if (mt) mt.classList.add('on');
  const stage = document.getElementById('tryon-stage');
  stage.innerHTML = `<div class="generating small"><span class="spinner"></span><b>正在打开照片预览…</b></div>`;
  const url = URL.createObjectURL(f);
  setTimeout(() => { stage.innerHTML = `<div class="tryon-result"><img src="${url}" alt="试穿效果"><p class="micro">本人照片 · 效果演示使用静态示例</p></div>`; }, 1100);
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
      <p class="micro">找同款</p>
      <h2>「${name}」的相似单品</h2>
      <div class="similar-hero"><img src="${thumb}" alt="${name}"><span>按版型、颜色和价格比较以下平台</span></div>
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
function readShopLink(category) { if (!document.getElementById('shop-url').value) return appToast('请粘贴购物链接'); showImportConfirm('../images/rec-denim-v1.png', category || 'outer', '水洗丹宁外套'); }
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
  if (!force && sessionStorage.getItem('wearu-review-v4-weather')) {
    try { appState.weather = JSON.parse(sessionStorage.getItem('wearu-review-v4-weather')); appRender(); return; } catch {}
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
    sessionStorage.setItem('wearu-review-v4-weather', JSON.stringify(appState.weather));
    appRender();
  } catch (error) {
    appState.weather = { location: '北京', temp: 24, desc: '晴', icon: '☀️', hi: 27, lo: 18 };
    appRender();
  }
}

const companionColors = { ivory: ['象牙白','#F6EFE6'], sage: ['鼠尾草绿','#97A789'], clay: ['陶土橙','#C4644A'], charcoal: ['炭黑','#2E2C2A'] };
function companionPanel() {
  const selected = appState.profile.uColor || 'ivory';
  return `<section class="companion-panel"><div class="u-display u-${selected}" id="u-display"><img src="u-companion.png" alt="你的 U 品牌伙伴"></div><div class="companion-copy"><span class="micro">THE U COMPANION</span><h3>你的 U，你的风格</h3><p>从真实衣橱出发，陪你发现自己的穿搭风格。</p><div class="u-swatches" aria-label="选择 U 的颜色">${Object.entries(companionColors).map(([key,[name,color]])=>`<button type="button" title="${name}" aria-label="${name}" aria-pressed="${selected===key}" style="--swatch:${color}" onclick="setCompanionColor('${key}',this)"></button>`).join('')}</div></div></section>`;
}
function setCompanionColor(color, button) {
  if (!companionColors[color]) return;
  appState.profile.uColor = color;
  const display = document.getElementById('u-display');
  if (display) display.className = 'u-display u-' + color;
  document.querySelectorAll('.u-swatches button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  localStorage.setItem(K('profile'), JSON.stringify(appState.profile));
}

function openProfileSheet() {
  const profile = appState.profile;
  const isSelected = (list, value) => (list || []).includes(value) ? 'selected' : '';
  const styleOptions = ['利落', '松弛', '温柔', '鲜活', '有力量', '简约'];
  const constraintOptions = appGender === 'male' ? ['不穿短裤', '避免紧身', '避免太正式', '不戴帽子'] : ['不露腿', '不穿高跟', '避免紧身', '避免太正式'];
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()">
    <section class="profile-sheet">
      <div class="modal-handle"></div>
      <p class="micro">个人档案</p>
      <h2>让 WEARU 更懂你</h2>
      <div class="gender-row"><span><b>演示版本</b><small>切换后衣橱、日记和推荐一起换</small></span>${genderToggle()}</div>
      ${companionPanel()}
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
      <label>身材轮廓<select id="pf-shape"><option value="">选择一个（可跳过）</option>${(appGender === 'male' ? ['偏瘦','标准','倒三角','偏壮'] : ['苹果型','梨型','沙漏型','矩形','倒三角']).map(shape => `<option ${shape===profile.bodyShape?'selected':''}>${shape}</option>`).join('')}</select></label>
      <div class="chip-group"><span>风格偏好</span><div>${styleOptions.map(style => `<button class="chip ${isSelected(profile.styles, style)}" onclick="toggleProfileChip('styles','${style}',this)">${style}</button>`).join('')}</div></div>
      <div class="chip-group"><span>穿着限制</span><div>${constraintOptions.map(constraint => `<button class="chip ${isSelected(profile.constraints, constraint)}" onclick="toggleProfileChip('constraints','${constraint}',this)">${constraint}</button>`).join('')}</div></div>
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
    uColor: appState.profile.uColor || 'ivory',
    height: document.getElementById('pf-height').value,
    size: document.getElementById('pf-size').value,
    bodyShape: document.getElementById('pf-shape').value,
    styles: appState.profile.styles,
    constraints: appState.profile.constraints
  };
  localStorage.setItem(K('profile'), JSON.stringify(appState.profile));
  closeAppModal();
  appToast('档案已保存');
}

function onAvatarPick(event) {
  const file = event.target.files?.[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    appState.avatar = reader.result;
    localStorage.setItem(K('avatar'), reader.result);
    const preview = document.getElementById('avatar-preview');
    if (preview) { preview.style.backgroundImage = `url(${reader.result})`; preview.innerHTML = ''; }
    appRender();
    appToast('头像已更新');
  };
  reader.readAsDataURL(file);
}

appState.weather = appGender === 'male' ? { location:'上海 · 示例天气', temp:'24', desc:'多云', icon:'☁', hi:'', lo:'' } : { location:'上海 · 示例天气', temp:'15', desc:'多云', icon:'☁', hi:'', lo:'' };
appRender();
