/* --- preview.js --- */
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
  iconTops: 'opt/images/icon-tops-v2.webp',
  iconBottoms: 'opt/images/icon-bottoms-v2.webp',
  iconOuter: 'opt/images/icon-outer-v2.webp',
  iconBags: 'opt/images/icon-bags-v2.webp',
  iconShoes: 'opt/images/icon-shoes-v2.webp',
  iconAccessories: 'opt/images/icon-accessories-v2.webp'
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
  return `<header class="brand-top">${brandLogo()}<span class="top-actions"><button class="circle-icon${appState.avatar ? ' has-avatar' : ''}" aria-label="个人档案" onclick="openProfileSheet()">${appState.avatar ? `<img loading="lazy" decoding="async" src="${appState.avatar}" alt="我">` : appIcons.user}</button></span></header>${appState.tab === 'styling' ? weatherBanner() : ''}<h1 class="page-title">${title}</h1>`;
}

function genderToggle() {
  return `<span class="gender-toggle" role="group" aria-label="切换演示版本">${[['female','女'],['male','男']].map(([g,l]) => `<button type="button" aria-pressed="${appGender===g}" onclick="setGender('${g}')">${l}</button>`).join('')}</span>`;
}
function brandLogo() {
  return `<span class="brand-lockup"><svg viewBox="0 0 44 44" aria-hidden="true"><rect width="44" height="44" rx="12" fill="#2E2C2A"/><path d="M13 12v13a9 9 0 0 0 18 0V12" fill="none" stroke="#F6EFE6" stroke-width="6" stroke-linecap="round"/><path d="M31 12v5" stroke="#C4644A" stroke-width="6" stroke-linecap="round"/></svg><b>WEARU</b></span>`;
}
function fashionCategoryArt(id) {
  const src = appGender === 'male' ? `category-male/${id}.webp` : `category/${id}.webp`;
  return `<span class="category-art" aria-hidden="true"><img loading="lazy" decoding="async" src="${src}" alt="" decoding="async"></span>`;
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
  return `<button class="garment-tile" onclick="openGarmentDetail('${item.id}')"><span class="wear-badge">穿过 ${item.worn} 次</span><img loading="lazy" decoding="async" src="${item.image}" alt="${escapeText(item.name)}"><span class="garment-copy"><b>${escapeText(item.name)}</b><small>${escapeText(item.detail)}</small></span></button>`;
}

function openGarmentDetail(id) {
  const item = appGarments.find(entry => entry.id === id);
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()"><section class="garment-modal"><div class="modal-handle"></div><img loading="lazy" decoding="async" src="${item.image}" alt="${escapeText(item.name)}"><p class="micro">${appCategories.find(c => c.id === item.category).name}</p><h2>${escapeText(item.name)}</h2><span>${escapeText(item.detail)} · 穿过 ${item.worn} 次</span><button class="dark-button" onclick="closeAppModal();startStyling('${item.id}')">用这件搭一套</button><button class="text-danger" id="del-${item.id}" onclick="confirmDeleteGarment('${item.id}')">移出衣橱</button></section></div>`);
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
        ? `<div class="picked-row">${picks.map(g => `<span class="picked-chip"><img loading="lazy" decoding="async" src="${g.image}" alt="">${escapeText(g.name.slice(0,6))}<i onclick="togglePick('${g.id}')">×</i></span>`).join('')}</div>
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
      ${items.map(g => { const on = appState.stylePicks.includes(g.id); return `<button class="pick-card ${on?'selected':''}" onclick="togglePick('${g.id}')"><span class="pick-check">${on?'✓':''}</span><img loading="lazy" decoding="async" src="${g.image}" alt="${escapeText(g.name)}"><b>${escapeText(g.name)}</b><small>${escapeText(g.detail)}</small></button>`; }).join('')}
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
  return `<span class="outfit-canvas" role="group" aria-label="整套穿搭">${images.slice(0, 5).map((src, i) => src ? `<img loading="lazy" decoding="async" class="outfit-piece piece-${slots[i]}" src="${escapeText(src)}" alt="${escapeText(names[i] || ['外套','上装','下装','鞋履','配饰'][i])}" loading="lazy">` : '').join('')}</span>`;
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
      ? `<div class="diary-photo"><img loading="lazy" decoding="async" src="${rec.photo}" alt="今日实拍"><button class="photo-retake" onclick="document.getElementById('diary-cam-${rec.date}').click()">重拍</button></div>`
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
  { user: 'Kern', avatar: '🧑🏻', scene: '度假', hero: 'opt/images/comm-12.webp', caption: '橄榄半拉链亚麻衬衫配白色阔腿裤，松弛的度假街头，斜挎小包点睛。', likes: 421, items: [{ name: '橄榄半拉链衬衫', q: '男 橄榄绿 半拉链 亚麻衬衫' }, { name: '白色阔腿裤', q: '男 白色 阔腿裤' }] },
  { user: '13', avatar: '🕶️', scene: '街头', hero: 'opt/images/comm-14.webp', caption: '复古拼色橄榄球 Polo 配水洗直筒牛仔，学院里带点街头痞感。', likes: 356, items: [{ name: '拼色橄榄球 Polo', q: '男 复古 拼色 橄榄球Polo' }, { name: '水洗直筒牛仔', q: '男 水洗 直筒牛仔裤' }] },
  { user: 'Noah', avatar: '🧑🏼', scene: '通勤', hero: 'opt/images/comm-21.webp', caption: '薄针织蓝 V 领叠白衬衫，白阔腿裤，夏天最通透的干净感。', likes: 298, items: [{ name: '蓝色 V 领针织', q: '男 蓝色 V领 薄针织' }, { name: '白色阔腿裤', q: '男 白色 阔腿裤' }] },
  { user: 'Ash', avatar: '🧑🏻‍🎤', scene: '约会', hero: 'opt/images/comm-30.webp', caption: '牛仔拼接短袖衬衫系一条印花丝巾，复古又精致，配黑西裤显利落。', likes: 264, items: [{ name: '牛仔拼接短袖衬衫', q: '男 牛仔拼接 短袖衬衫' }, { name: '印花丝巾', q: '印花 丝巾 领巾' }] },
  { user: 'ZL', avatar: '🧑🏻‍🦱', scene: '机能', hero: 'opt/images/comm-07.webp', caption: '做旧印花短袖 T 叠迷彩工装裤，慵懒里带点机能街头感。', likes: 233, items: [{ name: '做旧印花短袖 T', q: '男 做旧 印花 短袖T' }, { name: '迷彩工装裤', q: '男 迷彩 工装裤' }] }
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
      <div class="rec-img product"><img loading="lazy" decoding="async" src="${r.img}" alt="${r.name}"><span>单品</span></div>
      <div class="rec-img"><img loading="lazy" decoding="async" src="${r.onBody}" alt="${r.name}上身"><span>配你的衣服 · 效果演示</span></div>
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
  return `<div class="rec-outfit"><div class="rec-outfit-hero"><img loading="lazy" decoding="async" src="${o.img}" alt="${o.title}"></div><b>${o.title}</b><small>${o.note}</small></div>`;
}

function communityView() {
  return `<p class="swipe-hint">看看别人怎么穿，试穿看效果，喜欢的单品可以找同款</p>
    <div class="feed">${communityFeed.map(feedCard).join('')}</div>`;
}
function feedCard(p) {
  return `<section class="feed-card">
    <div class="feed-top"><span class="feed-avatar">${escapeText(p.user.slice(0,1).toUpperCase())}</span><div><b>${p.user}</b><small>${p.scene} · OOTD</small></div><span class="feed-like">♥ ${p.likes}</span></div>
    <div class="feed-hero"><img loading="lazy" decoding="async" src="${p.hero}" alt="${p.user} 的穿搭"><button class="feed-tryon" onclick="openTryOnViewer('${p.hero}','${p.user} 的穿搭','试穿这套')">${appIcons.hanger}试穿这套</button></div>
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
  setTimeout(() => { stage.innerHTML = `<div class="tryon-result"><img loading="lazy" decoding="async" src="${image}" alt="试穿效果"><p class="micro">效果演示 · 仅供参考、非真实合身</p></div>`; }, 800);
}
function onViewerPhoto(event) {
  const f = event.target.files?.[0]; if (!f) return;
  const dt = document.getElementById('tryon-tab-digital'), mt = document.getElementById('tryon-tab-me');
  if (dt) dt.classList.remove('on'); if (mt) mt.classList.add('on');
  const stage = document.getElementById('tryon-stage');
  stage.innerHTML = `<div class="generating small"><span class="spinner"></span><b>正在打开照片预览…</b></div>`;
  const url = URL.createObjectURL(f);
  setTimeout(() => { stage.innerHTML = `<div class="tryon-result"><img loading="lazy" decoding="async" src="${url}" alt="试穿效果"><p class="micro">本人照片 · 效果演示使用静态示例</p></div>`; }, 1100);
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
      <div class="similar-hero"><img loading="lazy" decoding="async" src="${thumb}" alt="${name}"><span>按版型、颜色和价格比较以下平台</span></div>
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
function readShopLink(category) { if (!document.getElementById('shop-url').value) return appToast('请粘贴购物链接'); showImportConfirm('opt/images/rec-denim-v1.webp', category || 'outer', '水洗丹宁外套'); }
function showImportConfirm(image, category, name) {
  appState.pendingImport = { image, name };
  const modal = document.getElementById('app-modal');
  modal.innerHTML = `<section class="import-sheet"><div class="modal-handle"></div><p class="micro">识别完成</p><h2>确认这件衣服</h2><div class="import-item"><img loading="lazy" decoding="async" src="${image}" alt=""><div><b>${name}</b><small>AI 已识别基础信息</small></div></div><label>名称<input id="new-name" type="text" value="${name}" style="min-width:150px;padding:7px 10px;border:1px solid #ddd2c8;border-radius:9px"></label><label>放入哪个区域？<select id="new-category">${appCategories.map(c=>`<option value="${c.id}" ${c.id===category?'selected':''}>${c.name}</option>`).join('')}</select></label><button class="dark-button" onclick="completeImport()">放进我的衣帽间</button></section>`;
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
  return `<section class="companion-panel"><div class="u-display u-${selected}" id="u-display"><img loading="lazy" decoding="async" src="opt/wearu/u-companion.webp" alt="你的 U 品牌伙伴"></div><div class="companion-copy"><span class="micro">THE U COMPANION</span><h3>你的 U，你的风格</h3><p>从真实衣橱出发，陪你发现自己的穿搭风格。</p><div class="u-swatches" aria-label="选择 U 的颜色">${Object.entries(companionColors).map(([key,[name,color]])=>`<button type="button" title="${name}" aria-label="${name}" aria-pressed="${selected===key}" style="--swatch:${color}" onclick="setCompanionColor('${key}',this)"></button>`).join('')}</div></div></section>`;
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

;
/* --- v011.js --- */
// WEARU v011 — loaded after preview.js and overrides parts of it:
// 1 U companion across the product · 2 home hero CTA · 3 live weather + animated icons
// 4 live try-on (camera; Decart Lucy VTON connector pending API key) · 5 diary as a flip-page journal
// 6 persona + smart shopping redesign · 7 two-column community

/* ---------- 1. U companion ---------- */
function uColor() { return (appState.profile && appState.profile.uColor) || 'ivory'; }
function uMark(size = 28, extra = '') {
  return `<span class="u-mark u-${uColor()} ${extra}" style="--u:${size}px" aria-hidden="true"><img loading="lazy" decoding="async" src="opt/wearu/u-companion.webp" alt=""></span>`;
}
function uSays(text) {
  return `<div class="u-says">${uMark(30)}<p><b>U 说</b>${text}</p></div>`;
}
// toast with U
appToast = function (message) {
  const el = document.getElementById('toast');
  el.innerHTML = `${uMark(22)}<span>${escapeText(message)}</span>`;
  el.classList.add('show');
  clearTimeout(appToastTimer);
  appToastTimer = setTimeout(() => el.classList.remove('show'), 2200);
};

/* ---------- 2. Home: one hero CTA at the top ---------- */
function greeting() {
  const h = new Date().getHours();
  return h < 6 ? '夜深了' : h < 11 ? '早上好' : h < 13 ? '中午好' : h < 18 ? '下午好' : '晚上好';
}
function todayLabel() {
  const d = new Date();
  return `${d.getMonth() + 1} 月 ${d.getDate()} 日 · 周${'日一二三四五六'[d.getDay()]}`;
}
wardrobePage = function () {
  if (appState.subview === 'category') return categoryPage();
  const ids = ['tops', 'outer', 'bottoms', 'bags', 'shoes', 'accessories'];
  return `<main class="app-page wardrobe-page">
    <header class="brand-top">${brandLogo()}<span class="top-actions"><button class="circle-icon${appState.avatar ? ' has-avatar' : ''}" aria-label="个人档案" onclick="openProfileSheet()">${appState.avatar ? `<img loading="lazy" decoding="async" src="${appState.avatar}" alt="我">` : appIcons.user}</button></span></header>
    <button class="today-hero" onclick="startStyling()">
      <span class="today-copy"><small>${todayLabel()} · ${greeting()}</small><b>今天穿什么？</b><em>选个场合，U 用你的衣服搭 3 套</em></span>
      <span class="today-go" aria-hidden="true">↗</span>
      ${uMark(74, 'hero-u')}
    </button>
    <div class="section-head"><h2>我的衣橱</h2><span>${appGarments.length} 件 · 点品类查看</span></div>
    <div class="category-collage" aria-label="按品类浏览衣橱">
      ${ids.map(id => `<button class="category-object object-${id}" onclick="openCategoryV3('${id}')" aria-label="浏览${appCategories.find(c => c.id === id).name}">${fashionCategoryArt(id)}<span class="category-name">${appCategories.find(c => c.id === id).name}${appGender === 'male' && !categoryCount(id) ? '<em class="gap-tag">缺口</em>' : ''}<span aria-hidden="true"> ↗</span></span></button>`).join('')}
    </div>
  </main>`;
};

/* ---------- 3. Live weather + animated colour icons ---------- */
function weatherType(code) {
  if (code === 0) return 'sun';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'cloud';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 95) return 'thunder';
  if (code >= 51) return 'rain';
  return 'cloud';
}
const wxDesc = { sun: '晴', partly: '晴间多云', cloud: '多云', fog: '有雾', rain: '有雨', snow: '有雪', thunder: '雷雨' };
function weatherIcon(type) {
  const sun = `<g class="wx-sun"><circle cx="20" cy="20" r="8" fill="#F5B83D"/><g class="wx-rays" stroke="#F5B83D" stroke-width="2.4" stroke-linecap="round">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<line x1="20" y1="5" x2="20" y2="8.5" transform="rotate(${a} 20 20)"/>`).join('')}</g></g>`;
  const cloud = (cls, fill, stroke = '#8FA5BC') => `<path class="${cls}" fill="${fill}" stroke="${stroke}" stroke-width="1.3" stroke-linejoin="round" d="M15 35h19a7 7 0 0 0 .6-14 9.5 9.5 0 0 0-18.2 2.6A5.8 5.8 0 0 0 15 35z"/>`;
  const svg = inner => `<svg class="wx wx-${type}" viewBox="0 0 48 48" aria-hidden="true">${inner}</svg>`;
  if (type === 'sun') return svg(`<g transform="translate(4 4)">${sun}</g>`);
  if (type === 'partly') return svg(`<g transform="translate(-2 -3)">${sun}</g>${cloud('wx-drift', '#FFFFFF')}`);
  if (type === 'fog') return svg(`${cloud('wx-drift', '#DCE6F0')}<g class="wx-fog" stroke="#7F96AE" stroke-width="2.4" stroke-linecap="round"><line x1="9" y1="39" x2="33" y2="39"/><line x1="14" y1="43" x2="40" y2="43"/></g>`);
  const base = `<g transform="translate(7 -5) scale(.8)">${cloud('wx-drift-slow', '#9DB4CB', '#7F96AE')}</g>${cloud('wx-drift', '#FFFFFF')}`;
  if (type === 'rain') return svg(`${base}<g class="wx-rain" stroke="#2F80D6" stroke-width="2.6" stroke-linecap="round"><line x1="18" y1="38" x2="16" y2="43"/><line x1="25" y1="38" x2="23" y2="43"/><line x1="32" y1="38" x2="30" y2="43"/></g>`);
  if (type === 'snow') return svg(`${base}<g class="wx-snow" fill="#8DB8E8"><circle cx="18" cy="40" r="1.8"/><circle cx="25" cy="42" r="1.8"/><circle cx="32" cy="40" r="1.8"/></g>`);
  if (type === 'thunder') return svg(`${base}<path class="wx-bolt" fill="#F5B83D" d="M24 34l-4 7h4l-2 6 7-9h-4l2-4z"/>`);
  return svg(base);
}
weatherBanner = function () {
  const w = appState.weather;
  const type = weatherType(w.code);
  const range = w.hi !== '' && w.hi !== undefined ? ` · ${w.lo}°–${w.hi}°` : '';
  return `<div class="weather-banner live"><span class="weather-icon">${weatherIcon(type)}</span><div class="weather-copy"><b>${w.temp}°<small> · ${w.desc || wxDesc[type]}</small></b><span>${w.location}${range}</span></div><button class="weather-locate" onclick="detectWeather(true)" aria-label="重新定位">${w.loading ? '<i class="wx-spin"></i>' : '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/></svg>'}</button></div>`;
};
detectWeather = async function (force = false) {
  const KEY = 'wearu-v11-weather';
  if (!force) { try { const c = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (c) { appState.weather = c; if (appState.tab === 'styling') appRender(); return; } } catch {} }
  appState.weather = { ...appState.weather, loading: true, location: '正在定位…' };
  if (appState.tab === 'styling') appRender();
  const fallback = { latitude: 31.2304, longitude: 121.4737, city: '上海' };
  const coords = await new Promise(resolve => {
    if (!navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(p => resolve(p.coords), () => resolve(null), { timeout: 6000, maximumAge: 600000 });
  }) || await fetch('https://ipapi.co/json/').then(r => r.json()).then(ip => ip && ip.latitude ? { latitude: ip.latitude, longitude: ip.longitude, city: ip.city } : null).catch(() => null) || fallback;
  try {
    const data = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`).then(r => r.json());
    const city = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=zh`).then(r => r.json()).then(g => g.city || g.locality || g.principalSubdivision).catch(() => '') || coords.city || '当前位置';
    const code = data.current.weather_code;
    appState.weather = { code, desc: wxDesc[weatherType(code)], location: city, temp: Math.round(data.current.temperature_2m), hi: Math.round(data.daily.temperature_2m_max[0]), lo: Math.round(data.daily.temperature_2m_min[0]) };
    sessionStorage.setItem(KEY, JSON.stringify(appState.weather));
  } catch {
    appState.weather = { code: 2, desc: '晴间多云', location: '上海 · 离线示例', temp: appGender === 'male' ? 24 : 15, hi: '', lo: '' };
  }
  if (appState.tab === 'styling') appRender();
};

/* generating screen with U */
const _generateLooks = generateLooks;
generateLooks = function () {
  _generateLooks();
  const screen = document.getElementById('screen');
  screen.innerHTML = `<div class="v3"><main class="app-page styling-page"><div class="generating u-loading">${uMark(84, 'u-bounce')}<b>U 正在翻你的衣橱…</b><small>结合天气、场合和你常穿的搭配</small></div></main></div>`;
};
lookSlide = function (look, i) {
  return `<section class="look-slide">
    <div class="look-heading"><div><p class="micro">方案 ${i + 1} / ${appState.styleLooks.length}</p><h2>${look.title}</h2></div><span>LOOK 0${i + 1}</span></div>
    ${outfitCanvas([look.outer, look.top, look.bottom, look.shoes, look.bag], look.items)}
    ${uSays(look.reason)}
    <div class="look-items">${look.items.map(t => `<span>${escapeText(t)}</span>`).join('')}</div>
  </section>`;
};

/* ---------- 4. Try-on: digital human + live camera ---------- */
// Live try-on uses Decart's real-time Lucy VTON model (the model behind Anywear).
// It needs a Decart API key; in the browser only short-lived client tokens may be used.
// Set window.WEARU_TRYON_TOKEN_URL to a local endpoint that returns { token } to enable it.
let liveStream = null;
openTryOnViewer = function (image, title, sub, withWear = false, garment = null) {
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeTryOn()">
    <section class="tryon-sheet">
      <div class="modal-handle"></div>
      <p class="micro">${sub} · ${escapeText(title)}</p>
      <h2>看穿上身的效果</h2>
      <div class="tryon-switch"><button class="on" id="tryon-tab-digital" onclick="viewerDigital('${image}')">数字人试穿</button><button id="tryon-tab-live" onclick="startLiveTryOn('${garment || image}')">实时试穿 · 镜头</button></div>
      <div id="tryon-stage"></div>
      ${withWear ? `<button class="coral-button tryon-wear" onclick="closeTryOn();wearThis()">穿这套 · 记入日记</button>` : ''}
      <button class="text-button tryon-close" onclick="closeTryOn()">关闭</button>
    </section>
  </div>`);
  viewerDigital(image);
};
function stopLive() { if (liveStream) { liveStream.getTracks().forEach(t => t.stop()); liveStream = null; } }
function closeTryOn() { stopLive(); closeAppModal(); }
viewerDigital = function (image) {
  stopLive();
  document.getElementById('tryon-tab-digital')?.classList.add('on');
  document.getElementById('tryon-tab-live')?.classList.remove('on');
  const stage = document.getElementById('tryon-stage');
  stage.innerHTML = `<div class="generating small u-loading">${uMark(48, 'u-bounce')}<b>正在生成试穿效果…</b></div>`;
  setTimeout(() => { stage.innerHTML = `<div class="tryon-result"><img loading="lazy" decoding="async" src="${image}" alt="试穿效果"><p class="micro">效果演示 · 仅供参考、非真实合身</p></div>`; }, 700);
};
async function startLiveTryOn(garment) {
  document.getElementById('tryon-tab-digital')?.classList.remove('on');
  document.getElementById('tryon-tab-live')?.classList.add('on');
  const stage = document.getElementById('tryon-stage');
  stage.innerHTML = `<div class="live-frame"><video id="live-video" autoplay playsinline muted></video><div class="live-hud"><span class="live-dot">LIVE</span><span id="live-status">正在打开摄像头…</span></div><img loading="lazy" decoding="async" class="live-garment" src="${garment}" alt="要试的衣服"></div><p class="micro live-note" id="live-note"></p>`;
  try {
    liveStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 1280 } }, audio: false });
    const video = document.getElementById('live-video');
    if (!video) return stopLive();
    video.srcObject = liveStream;
  } catch (e) {
    stage.innerHTML = `<div class="live-empty">${uMark(56)}<b>没有拿到摄像头权限</b><small>在浏览器地址栏允许摄像头后再试一次。实时试穿不会上传或保存你的画面。</small><button class="ghost-button" onclick="startLiveTryOn('${garment}')">再试一次</button></div>`;
    return;
  }
  if (window.WEARU_TRYON_TOKEN_URL) return connectLucyVton(garment);
  document.getElementById('live-status').textContent = '镜头预览中';
  document.getElementById('live-note').innerHTML = '实时换装接口（Decart Lucy VTON，Anywear 同款模型）待接入：接通后衣服会实时穿在镜头里的你身上，转身时会跟着动。';
}
async function connectLucyVton(garment) {
  // Wiring per docs.platform.decart.ai (realtime JS SDK). Enabled only once a token endpoint exists.
  const status = document.getElementById('live-status');
  try {
    status.textContent = '正在连接实时试穿…';
    const { createDecartClient, models } = await import('https://esm.sh/@decartai/sdk');
    const client = createDecartClient({ apiKeyProvider: async () => (await fetch(window.WEARU_TRYON_TOKEN_URL).then(r => r.json())).token });
    const blob = await fetch(garment).then(r => r.blob());
    const rt = await client.realtime.connect(liveStream, { model: models.realtime('lucy-vton-latest'), mirror: 'auto', onRemoteStream: s => { const v = document.getElementById('live-video'); if (v) v.srcObject = s; } });
    await rt.set({ prompt: 'Dress the person in this garment', image: blob, enhance: false });
    status.textContent = '实时试穿中';
  } catch (e) {
    status.textContent = '实时试穿连接失败，显示镜头预览';
  }
}

/* ---------- 5. Diary as a flip-page journal ---------- */
const defaultBooks = [
  { id: 'all', name: '我的穿搭手账', color: '#2E2C2A', rule: 'all' },
  { id: 'date', name: '约会篇', color: '#C4644A', rule: 'scene:date' }
];
appState.books = (() => { try { return JSON.parse(localStorage.getItem(K('books')) || 'null') || defaultBooks; } catch { return defaultBooks; } })();
appState.bookId = appState.bookId || 'all';
function saveBooks() { try { localStorage.setItem(K('books'), JSON.stringify(appState.books)); } catch {} }
function currentBook() { return appState.books.find(b => b.id === appState.bookId) || appState.books[0]; }
function bookPages(book = currentBook()) {
  const all = [...appState.diary].sort((a, b) => b.date.localeCompare(a.date));
  if (book.rule === 'all') return all;
  if (book.rule && book.rule.startsWith('scene:')) return all.filter(r => r.scene === book.rule.slice(6));
  return all.filter(r => (book.ids || []).includes(r.date));
}
function fmtDate(key) {
  const d = new Date(key + 'T00:00:00');
  return { md: `${d.getMonth() + 1}.${String(d.getDate()).padStart(2, '0')}`, week: '周' + '日一二三四五六'[d.getDay()], month: `${d.getFullYear()} 年 ${d.getMonth() + 1} 月` };
}
diaryPage = function () {
  const pages = bookPages();
  if (!appState.bookDate || !pages.some(p => p.date === appState.bookDate)) appState.bookDate = pages[0]?.date || null;
  const book = currentBook();
  return `<main class="app-page diary-page journal">
    ${pageTop('穿搭手账')}
    <div class="book-shelf" role="tablist" aria-label="我的手账">
      ${appState.books.map(b => `<button role="tab" aria-selected="${b.id === book.id}" style="--book:${b.color}" onclick="openBook('${b.id}')"><i></i>${escapeText(b.name)}<small>${bookPages(b).length}</small></button>`).join('')}
      <button class="book-new" onclick="newBook()">＋ 新手账</button>
    </div>
    <div class="date-jump">
      <div class="date-chips" id="date-chips">${pages.map(p => `<button class="${p.date === appState.bookDate ? 'on' : ''}" onclick="jumpTo('${p.date}')">${fmtDate(p.date).md}</button>`).join('')}</div>
      <label class="date-pick" aria-label="按日期跳转"><svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14"/></svg><input type="date" onchange="jumpNear(this.value)"></label>
    </div>
    <div class="book" style="--book:${book.color}">
      <div class="book-rings" aria-hidden="true">${'<i></i>'.repeat(7)}</div>
      <div class="book-page-wrap" id="book-page-wrap">${journalPage()}</div>
    </div>
    <div class="book-nav">
      <button onclick="flipBy(1)" ${pageIndex() >= pages.length - 1 ? 'disabled' : ''}>‹ 前一页</button>
      <span>${pages.length ? `${pages.length - pageIndex()} / ${pages.length}` : '0 / 0'}</span>
      <button onclick="flipBy(-1)" ${pageIndex() <= 0 ? 'disabled' : ''}>后一页 ›</button>
    </div>
    ${personaSummary()}
  </main>`;
};
function pageIndex() { return Math.max(0, bookPages().findIndex(p => p.date === appState.bookDate)); }
function journalPage() {
  const rec = bookPages().find(p => p.date === appState.bookDate);
  if (!rec) return `<article class="journal-page empty">${uMark(64)}<b>这本手账还是空的</b><small>${currentBook().rule === 'all' || currentBook().rule?.startsWith('scene:') ? '搭配后点「穿这套」，这一天就会写进来。' : '在任意一页点「收进手账」，把那天放进这本。'}</small><button class="ghost-button" onclick="startStyling()">去搭配</button></article>`;
  const f = fmtDate(rec.date);
  const chips = feelOptions.map(x => `<button class="sticker ${(rec.feels || []).includes(x) ? 'on' : ''}" onclick="toggleDiaryFeel('${rec.date}','${x}')">${x}</button>`).join('');
  const custom = appState.books.filter(b => !b.rule);
  return `<article class="journal-page" id="journal-page">
    <header class="jp-head"><div><b>${f.md}</b><span>${f.week} · ${f.month}</span></div><span class="jp-stamp">${escapeText(rec.sceneLabel || sceneName(rec.scene))}${rec.temp ? ` · ${rec.temp}°` : ''}</span></header>
    <div class="jp-body">
      <div class="jp-outfit">${outfitCanvas(rec.images, rec.items)}</div>
      <div class="jp-photo">${rec.photo ? `<img loading="lazy" decoding="async" src="${rec.photo}" alt="当天实穿照"><button onclick="document.getElementById('diary-cam-${rec.date}').click()">换一张</button>` : `<button class="jp-photo-add" onclick="document.getElementById('diary-cam-${rec.date}').click()">${appIcons.camera}<span>贴一张<br>今天的照片</span></button>`}<i class="tape"></i></div>
      <input id="diary-cam-${rec.date}" type="file" accept="image/*" capture="environment" hidden onchange="addDiaryPhoto(event,'${rec.date}')">
    </div>
    <h3 class="jp-title">${escapeText(rec.title)}</h3>
    <p class="jp-items">${(rec.items || []).map(escapeText).join(' · ')}</p>
    <div class="jp-stickers">${chips}</div>
    <div class="jp-note"><textarea id="feel-note-${rec.date}" rows="2" placeholder="${rec.scene === 'date' ? '约会怎么样？写一句…' : '今天穿着感觉怎么样？写一句…'}">${escapeText(rec.note || '')}</textarea><button onclick="saveDiaryNote('${rec.date}')">记下</button></div>
    <footer class="jp-foot">${custom.length ? `<select onchange="addToBook(this.value,'${rec.date}');this.value=''"><option value="">收进手账…</option>${custom.map(b => `<option value="${b.id}">${escapeText(b.name)}</option>`).join('')}</select>` : '<span></span>'}<span class="jp-u">${uMark(26)}U 记下了这一天</span></footer>
  </article>`;
}
function openBook(id) { appState.bookId = id; appState.bookDate = null; appRender(); }
function newBook() {
  const name = prompt('给新手账起个名字', '旅行篇');
  if (!name) return;
  const colors = ['#97A789', '#8b654c', '#5f7ea6', '#a64d36'];
  const book = { id: 'b' + Date.now(), name: name.slice(0, 10), color: colors[appState.books.length % colors.length], ids: [] };
  appState.books.push(book); saveBooks(); openBook(book.id); appToast(`新建了「${book.name}」`);
}
function addToBook(id, date) {
  const b = appState.books.find(x => x.id === id); if (!b) return;
  b.ids = [...new Set([...(b.ids || []), date])]; saveBooks(); appToast(`已收进「${b.name}」`); appRender();
}
function flipTo(date, dir) {
  const wrap = document.getElementById('book-page-wrap');
  const old = document.getElementById('journal-page');
  if (!wrap || !old || matchMedia('(prefers-reduced-motion: reduce)').matches) { appState.bookDate = date; return appRender(); }
  old.classList.add(dir > 0 ? 'flip-out-next' : 'flip-out-prev');
  setTimeout(() => {
    appState.bookDate = date;
    const y = window.scrollY; appRender(); window.scrollTo(0, y);
    document.getElementById('journal-page')?.classList.add(dir > 0 ? 'flip-in-next' : 'flip-in-prev');
    document.querySelector('#date-chips .on')?.scrollIntoView({ inline: 'center', block: 'nearest' });
  }, 330);
}
function flipBy(step) { const pages = bookPages(); const i = pageIndex() + step; if (pages[i]) flipTo(pages[i].date, step < 0 ? 1 : -1); }
function jumpTo(date) { const i = bookPages().findIndex(p => p.date === date); flipTo(date, i < pageIndex() ? 1 : -1); }
function jumpNear(value) {
  if (!value) return;
  const pages = bookPages(); if (!pages.length) return;
  const t = new Date(value).getTime();
  const best = pages.reduce((a, p) => Math.abs(new Date(p.date).getTime() - t) < Math.abs(new Date(a.date).getTime() - t) ? p : a);
  if (best.date !== value) appToast(`那天没有记录，翻到最近的 ${fmtDate(best.date).md}`);
  jumpTo(best.date);
}
refreshDiaryBody = function () { const y = window.scrollY; appRender(); window.scrollTo(0, y); };
// swipe to flip
document.addEventListener('touchstart', e => { const p = e.target.closest?.('.journal-page'); if (p) appState._sx = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => { if (appState._sx == null) return; const dx = e.changedTouches[0].clientX - appState._sx; appState._sx = null; if (Math.abs(dx) > 60) flipBy(dx < 0 ? -1 : 1); }, { passive: true });
const _wearThis = wearThis;
wearThis = function () { appState.bookId = 'all'; appState.bookDate = dateStr(0); _wearThis(); };

/* ---------- 6a. Persona: "U 眼中的你" ---------- */
personaSummary = function () {
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 30);
  const recent = appState.diary.filter(r => new Date(r.date) >= cutoff);
  if (recent.length < 2) return '';
  const count = {};
  recent.forEach(r => (r.garmentIds || []).forEach(id => count[id] = (count[id] || 0) + 1));
  const top = Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([id, n]) => ({ g: appGarments.find(x => x.id === id), n })).filter(x => x.g);
  const max = top[0]?.n || 1;
  const scenes = {}; recent.forEach(r => scenes[r.scene] = (scenes[r.scene] || 0) + 1);
  const palette = { daily: '#2E2C2A', commute: '#97A789', date: '#C4644A', party: '#D9A441', travel: '#5f7ea6', sport: '#8b654c', custom: '#b9aea2' };
  const idle = appGarments.filter(g => !count[g.id]);
  const topScene = Object.entries(scenes).sort((a, b) => b[1] - a[1])[0][0];
  return `<section class="persona">
    <div class="persona-head">${uMark(40)}<div><p class="micro">U 眼中的你 · 近 30 天</p><h2>${recent.length} 次穿搭，偏爱「${escapeText(top[0]?.g.name || '')}」</h2></div></div>
    <div class="persona-block"><p class="pb-title">最常穿</p>
      ${top.map(t => `<div class="top-row"><img loading="lazy" decoding="async" src="${t.g.image}" alt=""><span>${escapeText(t.g.name)}</span><i style="--w:${Math.round(t.n / max * 100)}%"></i><b>${t.n}</b></div>`).join('')}
    </div>
    <div class="persona-block"><p class="pb-title">去了哪些场合</p>
      <div class="scene-bar">${Object.entries(scenes).map(([s, n]) => `<i style="flex:${n};background:${palette[s] || '#b9aea2'}"></i>`).join('')}</div>
      <div class="scene-legend">${Object.entries(scenes).map(([s, n]) => `<span><i style="background:${palette[s] || '#b9aea2'}"></i>${sceneName(s)} ${Math.round(n / recent.length * 100)}%</span>`).join('')}</div>
    </div>
    <div class="persona-block"><p class="pb-title">被冷落的衣服 · ${idle.length} 件 30 天没穿</p>
      <div class="idle-row">${idle.slice(0, 8).map(g => `<button onclick="startStyling('${g.id}')" title="用「${escapeText(g.name)}」搭一套"><img loading="lazy" decoding="async" src="${g.image}" alt="${escapeText(g.name)}"></button>`).join('')}</div>
    </div>
    ${uSays(appGender === 'male' ? `你最常在「${sceneName(topScene)}」穿搭。印花 T 已经够多了，缺的是能把它们串起来的基础款；点上面任意一件，我用它给你搭一套。` : `你最常在「${sceneName(topScene)}」穿搭，黑色针织和直筒牛仔几乎天天出场。那些为特定场合买的衣服——马海毛开衫、缎面裙——还在等你；点上面任意一件，我用它给你搭一套。`)}
    <button class="ghost-button" onclick="switchTab('shopping')">看看衣橱缺口 →</button>
  </section>`;
};

/* ---------- 6b. Smart shopping ---------- */
function findSame(query) { window.open('https://s.taobao.com/search?q=' + encodeURIComponent(query), '_blank'); appToast('已在淘宝搜索同款'); }
shopRecCard = function (r) {
  return `<article class="rec-card v11">
    <div class="rec-pair">
      <figure class="rec-product"><img loading="lazy" decoding="async" src="${r.img}" alt="${r.name}"><figcaption>单品</figcaption></figure>
      <figure class="rec-body"><img loading="lazy" decoding="async" src="${r.onBody}" alt="${r.name}上身效果"><figcaption>买了还能这么穿</figcaption></figure>
    </div>
    <div class="rec-info">
      <div class="rec-head"><b>${r.name}</b><i>${r.range}</i></div>
      <span class="rec-gap">补缺口 · ${r.fills}</span>
      <p>${r.note}</p>
      ${r.unlock ? `<span class="rec-unlock">${r.unlock}</span>` : ''}
      <div class="rec-actions">
        <button class="rec-tryon" onclick="openTryOnViewer('${r.onBody}','${r.name}','试穿这件',false,'${r.img}')">${appIcons.hanger}实时试穿</button>
        <button class="rec-find" onclick="findSame('${r.query}')">${appIcons.search}找同款 ↗</button>
      </div>
    </div>
  </article>`;
};
const _smartShopping = smartShopping;
smartShopping = function () {
  const html = _smartShopping();
  const cut = html.indexOf('<div class="section-title"><h2>买了能这么穿');
  return cut > 0 ? html.slice(0, cut) : html;
};

/* ---------- 7. Community: two-column masonry ---------- */
communityView = function () {
  return `<p class="swipe-hint">看看大家怎么穿 · 点开可试穿、找同款</p><div class="masonry">${communityFeed.map(feedCard).join('')}</div>`;
};
feedCard = function (p, i) {
  return `<button class="m-card" onclick="openFeed(${communityFeed.indexOf(p)})"><img loading="lazy" decoding="async" src="${p.hero}" alt="${p.user} 的穿搭" loading="lazy"><span class="m-cap">${escapeText(p.caption.slice(0, 22))}…</span><span class="m-meta"><i>${escapeText(p.user.slice(0, 1).toUpperCase())}</i>${escapeText(p.user)}<em>♥ ${p.likes}</em></span></button>`;
};
function openFeed(i) {
  const p = communityFeed[i];
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()"><section class="feed-sheet"><div class="modal-handle"></div><img loading="lazy" decoding="async" src="${p.hero}" alt=""><p class="micro">${p.scene} · OOTD · ${escapeText(p.user)}</p><p class="feed-caption">${p.caption}</p><div class="feed-items">${p.items.map(it => `<button onclick="findSame('${it.q}')">${appIcons.search}${it.name} · 找同款 ↗</button>`).join('')}</div><button class="coral-button" onclick="closeAppModal();openTryOnViewer('${p.hero}','${p.user} 的穿搭','试穿这套')">试穿这套</button></section></div>`);
}

/* U colour change re-tints U across the page */
const _setCompanionColor = setCompanionColor;
setCompanionColor = function (color, button) { _setCompanionColor(color, button); appRender(); };

/* ---------- boot ---------- */
appState.weather = { code: 2, temp: '--', desc: '', location: '正在定位…', hi: '', lo: '', loading: true };

detectWeather();

;
/* --- v014.js --- */
// WEARU v014 — loaded after v011.js.
// 1 diary as an open two-page scrapbook with a real page-turn · 2 "U 眼中的你" as a section title
// 3 centred phone frame on desktop · 4 progress rail on the styling flow

/* ---------- helpers ---------- */
const hash = s => [...String(s)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
const tilt = (seed, max = 6) => ((hash(seed) % (max * 20)) / 10 - max).toFixed(1);
const doodleStar = '<svg class="doodle" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4l4 11 12 1-9 8 3 12-10-7-10 7 3-12-9-8 12-1z"/></svg>';
const doodleCrown = '<svg class="doodle crown" viewBox="0 0 48 30" aria-hidden="true"><path d="M4 26h40M6 24 4 6l11 10 9-13 9 13 11-10-2 18z"/></svg>';
const doodleArrow = '<svg class="doodle arrow" viewBox="0 0 60 30" aria-hidden="true"><path d="M4 22c14-14 30-16 46-8m0 0-8-6m8 6-9 4"/></svg>';

/* ---------- 1. Diary: two-page scrapbook ---------- */
function spreadPages(book = currentBook()) {
  return bookPages(book).slice().reverse(); // oldest → newest, so "next page" goes forward in time
}
function spreadIndex() {
  const pages = spreadPages();
  const i = pages.findIndex(p => p.date === appState.bookDate);
  return i < 0 ? pages.length - 1 : i;
}
function pageLeft(rec) {
  if (!rec) return `<div class="sb-page sb-left sb-blank"><p class="hand">这一页还空着</p>${doodleArrow}</div>`;
  const f = fmtDate(rec.date);
  const pieces = (rec.images || []).filter(Boolean).slice(0, 5);
  const spots = [[6, 6, 58], [46, 4, 50], [8, 42, 56], [52, 48, 44], [30, 70, 38]];
  return `<div class="sb-page sb-left">
    <div class="sb-date"><b style="--r:${tilt(rec.date, 4)}deg">${f.md}</b><span class="hand">${f.week} · ${f.month}</span></div>
    <span class="sb-stamp" style="--r:${tilt(rec.date + 's', 7)}deg">${escapeText(rec.sceneLabel || sceneName(rec.scene))}${rec.temp ? ` ${rec.temp}°` : ''}</span>
    <div class="sb-collage">
      ${pieces.map((src, i) => `<img loading="lazy" decoding="async" class="sb-piece" src="${src}" alt="" style="left:${spots[i][0]}%;top:${spots[i][1]}%;width:${spots[i][2]}%;--r:${tilt(rec.date + i, 9)}deg">`).join('')}
      <i class="tape t1"></i><i class="tape t2"></i>
    </div>
    <h3 class="sb-title hand"><mark>${escapeText(rec.title)}</mark></h3>
    <p class="sb-items hand">${(rec.items || []).slice(0, 4).map(escapeText).join(' / ')}</p>
    ${doodleStar}
  </div>`;
}
function pageRight(rec) {
  if (!rec) return `<div class="sb-page sb-right sb-blank"><p class="hand">搭配后点「穿这套」<br>就会写到这里</p>${doodleCrown}</div>`;
  const feels = feelOptions.map(x => `<button class="sb-feel hand ${(rec.feels || []).includes(x) ? 'on' : ''}" onclick="toggleDiaryFeel('${rec.date}','${x}')">${x}</button>`).join('');
  const custom = appState.books.filter(b => !b.rule);
  return `<div class="sb-page sb-right">
    <div class="sb-polaroid" style="--r:${tilt(rec.date + 'p', 5)}deg">
      ${rec.photo ? `<img loading="lazy" decoding="async" src="${rec.photo}" alt="当天实穿照">` : `<button class="sb-photo-add hand" onclick="document.getElementById('diary-cam-${rec.date}').click()">${appIcons.camera}贴一张今天的照片</button>`}
      <i class="tape"></i>
    </div>
    <input id="diary-cam-${rec.date}" type="file" accept="image/*" capture="environment" hidden onchange="addDiaryPhoto(event,'${rec.date}')">
    <p class="sb-label hand">今天的心情 ↓</p>
    <div class="sb-feels">${feels}</div>
    <textarea class="sb-note hand" id="feel-note-${rec.date}" rows="3" placeholder="${rec.scene === 'date' ? '约会怎么样？写一句…' : '今天穿着感觉怎么样？'}" onblur="saveDiaryNote('${rec.date}')">${escapeText(rec.note || '')}</textarea>
    <div class="sb-foot">${custom.length ? `<select onchange="addToBook(this.value,'${rec.date}');this.value=''"><option value="">收进…</option>${custom.map(b => `<option value="${b.id}">${escapeText(b.name)}</option>`).join('')}</select>` : '<span></span>'}<span class="sb-u hand">${uMark(24)}U 记下了</span></div>
  </div>`;
}
diaryPage = function () {
  const pages = spreadPages();
  if (!appState.bookDate || !pages.some(p => p.date === appState.bookDate)) appState.bookDate = pages[pages.length - 1]?.date || null;
  const i = spreadIndex();
  const rec = pages[i];
  const book = currentBook();
  return `<main class="app-page diary-page scrapbook">
    ${pageTop('穿搭手账')}
    <div class="book-shelf" role="tablist" aria-label="我的手账">
      ${appState.books.map(b => `<button role="tab" aria-selected="${b.id === book.id}" style="--book:${b.color}" onclick="openBook('${b.id}')"><i></i>${escapeText(b.name)}<small>${bookPages(b).length}</small></button>`).join('')}
      <button class="book-new" onclick="newBook()">＋ 新手账</button>
    </div>
    <div class="date-jump">
      <div class="date-chips hand" id="date-chips">${pages.map(p => `<button class="${p.date === appState.bookDate ? 'on' : ''}" onclick="turnTo('${p.date}')">${fmtDate(p.date).md}</button>`).join('')}</div>
      <label class="date-pick" aria-label="按日期跳转"><svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14"/></svg><input type="date" onchange="jumpNear(this.value)"></label>
    </div>
    <div class="sb-book" id="sb-book" style="--book:${book.color}">
      <div class="sb-half sb-half-left" id="sb-left">${pageLeft(rec)}</div>
      <div class="sb-half sb-half-right" id="sb-right">${pageRight(rec)}</div>
      <i class="sb-spine"></i>
    </div>
    <div class="book-nav hand">
      <button onclick="turnBy(-1)" ${i <= 0 ? 'disabled' : ''}>‹ 往前翻</button>
      <span>${pages.length ? `${i + 1} / ${pages.length}` : '0 / 0'}</span>
      <button onclick="turnBy(1)" ${i >= pages.length - 1 ? 'disabled' : ''}>往后翻 ›</button>
    </div>
    ${personaSummary()}
  </main>`;
};
let turning = false;
function turnTo(date) {
  const pages = spreadPages(); const from = spreadIndex(); const to = pages.findIndex(p => p.date === date);
  if (to < 0 || to === from || turning) return;
  const cur = pages[from], next = pages[to], dir = to > from ? 1 : -1;
  const bookEl = document.getElementById('sb-book');
  if (!bookEl || matchMedia('(prefers-reduced-motion: reduce)').matches) { appState.bookDate = date; return refreshKeepScroll(); }
  turning = true;
  // underlay shows the destination spread on the side being revealed
  if (dir > 0) document.getElementById('sb-right').innerHTML = pageRight(next);
  else document.getElementById('sb-left').innerHTML = pageLeft(next);
  const leaf = document.createElement('div');
  leaf.className = `sb-leaf ${dir > 0 ? 'leaf-fwd' : 'leaf-back'}`;
  leaf.innerHTML = dir > 0
    ? `<div class="leaf-face front">${pageRight(cur)}</div><div class="leaf-face back">${pageLeft(next)}</div>`
    : `<div class="leaf-face front">${pageLeft(cur)}</div><div class="leaf-face back">${pageRight(next)}</div>`;
  bookEl.appendChild(leaf);
  void leaf.offsetWidth; // commit the start state, then animate
  leaf.classList.add('go');
  setTimeout(() => { turning = false; appState.bookDate = date; refreshKeepScroll(); document.querySelector('#date-chips .on')?.scrollIntoView({ inline: 'center', block: 'nearest' }); }, 760);
}
function turnBy(step) { const pages = spreadPages(); const p = pages[spreadIndex() + step]; if (p) turnTo(p.date); }
function refreshKeepScroll() { const y = window.scrollY; document.body.classList.add('no-enter'); appRender(); window.scrollTo(0, y); setTimeout(() => document.body.classList.remove('no-enter'), 50); }
jumpTo = turnTo;
flipBy = step => turnBy(-step);
jumpNear = function (value) {
  if (!value) return;
  const pages = spreadPages(); if (!pages.length) return;
  const t = new Date(value).getTime();
  const best = pages.reduce((a, p) => Math.abs(new Date(p.date) - t) < Math.abs(new Date(a.date) - t) ? p : a);
  if (best.date !== value) appToast(`那天没有记录，翻到最近的 ${fmtDate(best.date).md}`);
  turnTo(best.date);
};
openBook = function (id) { appState.bookId = id; appState.bookDate = null; appRender(); };
refreshDiaryBody = refreshKeepScroll;
// swipe on the book
document.addEventListener('touchstart', e => { if (e.target.closest?.('#sb-book')) appState._bx = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => { if (appState._bx == null) return; const dx = e.changedTouches[0].clientX - appState._bx; appState._bx = null; if (Math.abs(dx) > 50) turnBy(dx < 0 ? 1 : -1); }, { passive: true });

/* ---------- 2. Persona with a big title ---------- */
const _personaSummary = personaSummary;
personaSummary = function () {
  const html = _personaSummary();
  if (!html) return '';
  const head = html.match(/<div class="persona-head">[\s\S]*?<\/div><\/div>/);
  const h2 = (html.match(/<h2>([\s\S]*?)<\/h2>/) || [])[1] || '';
  const body = head ? html.replace(head[0], '') : html;
  return `<header class="u-title">${uMark(64, 'u-bounce-slow')}<div><h2 class="hand">U 眼中的你</h2><p>近 30 天 · ${h2}</p></div></header>${body}`;
};

/* ---------- 4. Styling progress rail ---------- */
function railStep(state, label, body, extra = '') {
  return `<section class="flow-step ${state}" ${extra}><div class="flow-label">${state === 'current' ? '<span class="now">Now</span>' : ''}<b>${label}</b></div>${body}</section>`;
}
stylingSetup = function () {
  const custom = appState.styleCustomScene;
  const activeScene = custom ? '' : appState.styleScene;
  const picks = pickedGarments();
  const s1 = appState.flowScene ? 'done' : 'current';
  const s2 = !appState.flowScene ? 'todo' : picks.length ? 'done' : 'optional';
  const s3 = appState.flowScene ? 'current' : 'todo';
  return `<main class="app-page styling-page">
    ${pageTop('今天的穿搭')}
    <div class="flow" id="flow">
      ${railStep(s1, '① 今天要去哪儿？', `
        <div class="scene-pills">${appScenes.map(s => `<button class="${activeScene === s.id && appState.flowScene ? 'selected' : ''}" onclick="pickScene('${s.id}',this)">${s.name}</button>`).join('')}</div>
        <input class="scene-input" id="scene-custom" placeholder="或者自己写：见客户、看展、朋友生日饭…" value="${escapeText(custom)}" oninput="appState.styleCustomScene=this.value;appState.flowScene=!!this.value;document.querySelectorAll('.scene-pills button').forEach(b=>b.classList.remove('selected'));updateRail()">`, 'id="step-scene"')}
      ${railStep(s2, '② 有想穿的单品吗？<small>可跳过</small>', picks.length
        ? `<div class="picked-row">${picks.map(g => `<span class="picked-chip"><img loading="lazy" decoding="async" src="${g.image}" alt="">${escapeText(g.name.slice(0, 6))}<i onclick="togglePick('${g.id}')">×</i></span>`).join('')}</div><button class="wardrobe-pick-btn" onclick="openStylePicker()">${appIcons.plus}<span>从衣橱继续添加 / 修改</span></button>`
        : `<button class="wardrobe-pick-btn empty" onclick="openStylePicker()">${appIcons.wardrobe}<span><b>从衣橱中挑选</b><small>不选也行，U 会自己从衣橱里挑</small></span></button>`, 'id="step-pick"')}
      ${railStep(s3, '③ 生成 3 套', `<button class="coral-button generate-button" onclick="generateLooks()" ${appState.flowScene ? '' : 'disabled'}>生成 3 套搭配</button>`, 'id="step-go"')}
    </div>
  </main>`;
};
function updateRail() {
  const picks = pickedGarments();
  const set = (id, st) => { const el = document.getElementById(id); if (!el) return; el.className = 'flow-step ' + st; const lab = el.querySelector('.flow-label'); lab.querySelector('.now')?.remove(); if (st === 'current') lab.insertAdjacentHTML('afterbegin', '<span class="now">Now</span>'); };
  set('step-scene', appState.flowScene ? 'done' : 'current');
  set('step-pick', !appState.flowScene ? 'todo' : picks.length ? 'done' : 'optional');
  set('step-go', appState.flowScene ? 'current' : 'todo');
  const go = document.querySelector('#step-go .generate-button'); if (go) go.disabled = !appState.flowScene;
}
const _pickScene = pickScene;
pickScene = function (id, btn) { _pickScene(id, btn); appState.flowScene = true; updateRail(); };
const _startStyling = startStyling;
startStyling = function (id) { appState.flowTried = false; appState.flowWorn = false; _startStyling(id); };
stylingResult = function () {
  const looks = appState.styleLooks;
  const picks = pickedGarments();
  const tried = appState.flowTried, worn = appState.flowWorn;
  return `<main class="app-page styling-page result-page">
    ${pageTop('搭配方案', "appState.styleStep='setup';appRender()")}
    <div class="flow">
      ${railStep('done', `① ${escapeText(currentSceneLabel())} · ${appState.weather.temp}°`, '')}
      ${railStep(picks.length ? 'done' : 'optional', picks.length ? `② 围绕「${escapeText(picks.map(p => p.name).join('、'))}」` : '② 没指定单品，U 自己挑', '')}
      ${railStep(tried ? 'done' : 'current', '③ 挑一套 · 左右滑', `
        <div class="look-scroller" id="look-scroller" onscroll="onLookScroll()">${looks.map((look, i) => lookSlide(look, i)).join('')}</div>
        <div class="look-dots">${looks.map((_, i) => `<span class="${i === appState.styleActive ? 'on' : ''}"></span>`).join('')}</div>`)}
      ${railStep(tried ? 'done' : 'todo', '④ 看上身效果', `<button class="ghost-button" onclick="appState.flowTried=true;openTryOn();setTimeout(()=>{const y=scrollY;appRender();scrollTo(0,y)},50)">查看上身效果</button>`)}
      ${railStep(worn ? 'done' : tried ? 'current' : 'todo', '⑤ 穿这套，写进手账', `<button class="coral-button" onclick="appState.flowWorn=true;wearThis()">穿这套 · 记入手账</button>`)}
    </div>
  </main>`;
};
// keep the chosen look in view after any re-render of the result page
const _appRender = appRender;
appRender = function () {
  _appRender();
  const sc = document.getElementById('look-scroller');
  if (sc && appState.styleActive) { const w = sc.querySelector('.look-slide')?.getBoundingClientRect().width || 0; sc.style.scrollBehavior = 'auto'; sc.scrollLeft = appState.styleActive * (w + 14); }
};

/* ---------- boot ---------- */

;
/* --- v015.js --- */
// WEARU v015 — loaded after v014.js.
// 1 generate looks inline on the same page · 3 journal: closed cover → open → full-page turns · 5 colour themes for review

/* ---------- shared: keep scroll on re-render when asked ---------- */
const _appRender14 = appRender;
appRender = function () {
  const y = window.scrollY;
  if (appState.genLoading) { appState.keepScroll = true; appState.noEnter = true; }
  _appRender14();
  if (appState.noEnter) { document.querySelectorAll('.app-page').forEach(el => el.style.animation = 'none'); appState.noEnter = false; }
  if (appState.keepScroll) { window.scrollTo(0, y); appState.keepScroll = false; }
};
function softRender() { appState.keepScroll = true; appState.noEnter = true; appRender(); }
refreshKeepScroll = softRender; refreshDiaryBody = softRender;

/* ---------- 1. Inline generation ---------- */
stylingPage = function () {
  if (appState.styleSubview === 'pick') return stylingPickPage();
  return stylingSetup();
};
stylingSetup = function () {
  const custom = appState.styleCustomScene;
  const activeScene = custom ? '' : appState.styleScene;
  const picks = pickedGarments();
  const hasResult = appState.styleStep === 'result' && appState.styleLooks.length;
  const loading = appState.genLoading;
  const tried = appState.flowTried, worn = appState.flowWorn;
  const s1 = appState.flowScene ? 'done' : 'current';
  const s2 = !appState.flowScene ? 'todo' : picks.length ? 'done' : 'optional';
  const s3 = hasResult ? (tried ? 'done' : 'current') : appState.flowScene ? 'current' : 'todo';
  const looks = appState.styleLooks;
  return `<main class="app-page styling-page">
    ${pageTop('今天的穿搭')}
    <div class="flow" id="flow">
      ${railStep(s1, '① 今天要去哪儿？', `
        <div class="scene-pills">${appScenes.map(s => `<button class="${activeScene === s.id && appState.flowScene ? 'selected' : ''}" onclick="pickScene('${s.id}',this)">${s.name}</button>`).join('')}</div>
        <input class="scene-input" id="scene-custom" placeholder="或者自己写：见客户、看展、朋友生日饭…" value="${escapeText(custom)}" oninput="appState.styleCustomScene=this.value;appState.flowScene=!!this.value;resetResults();document.querySelectorAll('.scene-pills button').forEach(b=>b.classList.remove('selected'));updateRail()">`, 'id="step-scene"')}
      ${railStep(s2, '② 有想穿的单品吗？<small>可跳过</small>', picks.length
        ? `<div class="picked-row">${picks.map(g => `<span class="picked-chip"><img loading="lazy" decoding="async" src="${g.image}" alt="">${escapeText(g.name.slice(0, 6))}<i onclick="togglePick('${g.id}')">×</i></span>`).join('')}</div><button class="wardrobe-pick-btn" onclick="openStylePicker()">${appIcons.plus}<span>从衣橱继续添加 / 修改</span></button>`
        : `<button class="wardrobe-pick-btn empty" onclick="openStylePicker()">${appIcons.wardrobe}<span><b>从衣橱中挑选</b><small>不选也行，U 会自己从衣橱里挑</small></span></button>`, 'id="step-pick"')}
      ${railStep(s3, hasResult ? '③ 挑一套 · 左右滑' : '③ 生成 3 套', loading
        ? `<div class="inline-loading">${uMark(56, 'u-bounce')}<b>U 正在翻你的衣橱…</b><small>结合天气、场合和你常穿的搭配</small></div>`
        : hasResult
          ? `<div class="result-meta"><span class="meta-chip">${escapeText(currentSceneLabel())}</span><span class="meta-chip">${appState.weather.temp}° ${appState.weather.desc || ''}</span><button class="regen" onclick="generateLooks()">换一批</button></div>
             <div class="look-scroller" id="look-scroller" onscroll="onLookScroll()">${looks.map((look, i) => lookSlide(look, i)).join('')}</div>
             <div class="look-dots">${looks.map((_, i) => `<span class="${i === appState.styleActive ? 'on' : ''}"></span>`).join('')}</div>`
          : `<button class="coral-button generate-button" onclick="generateLooks()" ${appState.flowScene ? '' : 'disabled'}>生成 3 套搭配</button>`, 'id="step-go"')}
      ${hasResult && !loading ? `
        ${railStep(tried ? 'done' : 'todo', '④ 看上身效果', `<button class="ghost-button" onclick="appState.flowTried=true;openTryOn();setTimeout(softRender,60)">查看上身效果</button>`)}
        ${railStep(worn ? 'done' : tried ? 'current' : 'todo', '⑤ 穿这套，写进手账', `<button class="coral-button" onclick="appState.flowWorn=true;wearThis()">穿这套 · 记入手账</button>`)}` : ''}
    </div>
  </main>`;
};
function resetResults() { if (appState.styleStep === 'result') { appState.styleStep = 'setup'; appState.styleLooks = []; appState.flowTried = false; appState.flowWorn = false; softRender(); } }
const _pickScene15 = pickScene;
pickScene = function (id, btn) { const had = appState.styleStep === 'result'; _pickScene15(id, btn); if (had) resetResults(); };
const _togglePick15 = togglePick;
togglePick = function (id) { appState.styleStep = 'setup'; appState.styleLooks = []; _togglePick15(id); };
const _generate15 = generateLooks;
generateLooks = function () {
  appState.flowTried = false; appState.flowWorn = false;
  _generate15(); // computes looks (and paints the old loading screen, replaced right below)
  appState.genLoading = true;
  softRender();
  document.getElementById('step-go')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  clearTimeout(appState._genT);
  appState._genT = setTimeout(() => {
    appState.genLoading = false; softRender();
    const el = document.getElementById('step-go');
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70 });
  }, 1100);
};

/* ---------- 3. Journal: cover → full pages ---------- */
function bookTitle(book) {
  const who = appGender === 'male' ? '陈野' : '周可';
  return book.rule === 'all' ? `${who}的穿搭手账` : book.name;
}
function journalFull(rec) {
  if (!rec) return `<article class="jf-page jf-blank"><p class="hand">这一页还空着</p><small class="hand">搭配后点「穿这套」就会写进来</small>${doodleArrow}</article>`;
  const f = fmtDate(rec.date);
  const pieces = (rec.images || []).filter(Boolean).slice(0, 5);
  const spots = [[0, 0, 56], [46, 2, 48], [2, 40, 54], [48, 50, 44], [22, 70, 38]];
  const feels = feelOptions.map(x => `<button class="sb-feel hand ${(rec.feels || []).includes(x) ? 'on' : ''}" onclick="toggleDiaryFeel('${rec.date}','${x}')">${x}</button>`).join('');
  const custom = appState.books.filter(b => !b.rule);
  return `<article class="jf-page">
    <header class="jf-head"><div class="sb-date"><b style="--r:${tilt(rec.date, 3)}deg">${f.md}</b><span class="hand">${f.week} · ${f.month}</span></div>
      <span class="jf-stamp" style="--r:${tilt(rec.date + 's', 7)}deg">${escapeText(rec.sceneLabel || sceneName(rec.scene))}${rec.temp ? ` · ${rec.temp}°` : ''}</span></header>
    <div class="jf-mid">
      <div class="jf-collage">${pieces.map((src, i) => `<img loading="lazy" decoding="async" class="sb-piece" src="${src}" alt="" style="left:${spots[i][0]}%;top:${spots[i][1]}%;width:${spots[i][2]}%;--r:${tilt(rec.date + i, 8)}deg">`).join('')}<i class="tape t1"></i><i class="tape t2"></i></div>
      <div class="sb-polaroid jf-polaroid" style="--r:${tilt(rec.date + 'p', 6)}deg">${rec.photo ? `<img loading="lazy" decoding="async" src="${rec.photo}" alt="当天实穿照">` : `<button class="sb-photo-add hand" onclick="document.getElementById('diary-cam-${rec.date}').click()">${appIcons.camera}贴一张<br>今天的照片</button>`}<i class="tape"></i></div>
      <input id="diary-cam-${rec.date}" type="file" accept="image/*" capture="environment" hidden onchange="addDiaryPhoto(event,'${rec.date}')">
    </div>
    <h3 class="sb-title hand"><mark>${escapeText(rec.title)}</mark></h3>
    <p class="sb-items hand">${(rec.items || []).map(escapeText).join(' / ')}</p>
    <p class="sb-label hand">今天的心情 ↓</p>
    <div class="sb-feels">${feels}</div>
    <textarea class="sb-note hand" id="feel-note-${rec.date}" rows="2" placeholder="${rec.scene === 'date' ? '约会怎么样？写一句…' : '今天穿着感觉怎么样？'}" onblur="saveDiaryNote('${rec.date}')">${escapeText(rec.note || '')}</textarea>
    <footer class="jf-foot">${custom.length ? `<select onchange="addToBook(this.value,'${rec.date}');this.value=''"><option value="">收进…</option>${custom.map(b => `<option value="${b.id}">${escapeText(b.name)}</option>`).join('')}</select>` : '<span></span>'}<span class="sb-u hand">${uMark(24)}U 记下了这一天</span></footer>
    ${doodleStar}
  </article>`;
}
function journalCover(book) {
  const tint = book.rule === 'all' ? 'transparent' : book.color;
  return `<button class="jf-cover" onclick="openCover()" style="--tint:${tint}" aria-label="翻开手账">
    <span class="jf-cover-art"></span>
    <span class="jf-label"><b class="hand">${escapeText(bookTitle(book))}</b><small class="hand">${bookPages(book).length} 天 · 从 ${bookPages(book).length ? fmtDate(spreadPages(book)[0].date).md : '今天'} 开始</small></span>
    ${uMark(54, 'jf-cover-u')}
    <span class="jf-hint hand">点一下翻开 →</span>
  </button>`;
}
diaryPage = function () {
  const pages = spreadPages();
  if (!appState.bookDate || !pages.some(p => p.date === appState.bookDate)) appState.bookDate = pages[pages.length - 1]?.date || null;
  const i = spreadIndex();
  const book = currentBook();
  const open = appState.bookOpen;
  return `<main class="app-page diary-page journal-v15">
    ${pageTop('穿搭手账')}
    <div class="book-shelf" role="tablist" aria-label="我的手账">
      ${appState.books.map(b => `<button role="tab" aria-selected="${b.id === book.id}" style="--book:${b.color}" onclick="openBook('${b.id}')"><i></i>${escapeText(b.name)}<small>${bookPages(b).length}</small></button>`).join('')}
      <button class="book-new" onclick="newBook()">＋ 新手账</button>
    </div>
    ${open ? `<div class="date-jump"><div class="date-chips hand" id="date-chips">${pages.map(p => `<button class="${p.date === appState.bookDate ? 'on' : ''}" onclick="turnTo('${p.date}')">${fmtDate(p.date).md}</button>`).join('')}</div><label class="date-pick" aria-label="按日期跳转"><svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14"/></svg><input type="date" onchange="jumpNear(this.value)"></label></div>` : ''}
    <div class="jf-book ${open ? 'is-open' : 'is-closed'}" id="jf-book" style="--book:${book.color}">
      <div class="jf-rings" aria-hidden="true">${'<i></i>'.repeat(9)}</div>
      <div class="jf-stack" id="jf-stack">${open ? journalFull(pages[i]) : journalCover(book)}</div>
    </div>
    ${open ? `<div class="book-nav hand"><button onclick="turnBy(-1)" ${i <= 0 ? 'disabled' : ''}>‹ 往前翻</button><button class="jf-close" onclick="closeCover()">合上</button><button onclick="turnBy(1)" ${i >= pages.length - 1 ? 'disabled' : ''}>往后翻 ›</button></div>` : '<p class="jf-tip hand">每次「穿这套」，都会写进这本手账</p>'}
    ${personaSummary()}
  </main>`;
};
function openCover() {
  const stack = document.getElementById('jf-stack'); const book = currentBook();
  if (!stack || turning) return;
  turning = true;
  const pages = spreadPages(); const rec = pages[spreadIndex()];
  stack.innerHTML = journalFull(rec) + `<div class="jf-leaf cover-leaf" style="--book:${book.color}"><div class="leaf-face front">${journalCover(book)}</div><div class="leaf-face back"><div class="jf-endpaper"></div></div></div>`;
  const leaf = stack.querySelector('.jf-leaf'); void leaf.offsetWidth; leaf.classList.add('go');
  setTimeout(() => { turning = false; appState.bookOpen = true; softRender(); }, 900);
}
function closeCover() {
  const stack = document.getElementById('jf-stack'); const book = currentBook();
  if (!stack || turning) return;
  turning = true;
  stack.insertAdjacentHTML('beforeend', `<div class="jf-leaf cover-leaf closing" style="--book:${book.color}"><div class="leaf-face front">${journalCover(book)}</div><div class="leaf-face back"><div class="jf-endpaper"></div></div></div>`);
  const leaf = stack.querySelector('.jf-leaf'); void leaf.offsetWidth; leaf.classList.add('go');
  setTimeout(() => { turning = false; appState.bookOpen = false; softRender(); }, 900);
}
turnTo = function (date) {
  const pages = spreadPages(); const from = spreadIndex(); const to = pages.findIndex(p => p.date === date);
  if (to < 0 || to === from || turning) return;
  const stack = document.getElementById('jf-stack');
  if (!stack || !appState.bookOpen || matchMedia('(prefers-reduced-motion: reduce)').matches) { appState.bookDate = date; return softRender(); }
  turning = true;
  const cur = pages[from], next = pages[to];
  if (to > from) { // forward: current page lifts off to the left, next page is underneath
    stack.innerHTML = journalFull(next) + `<div class="jf-leaf fwd"><div class="leaf-face front">${journalFull(cur)}</div><div class="leaf-face back"><div class="jf-back"></div></div></div>`;
  } else { // backward: previous page swings back in over the current one
    stack.innerHTML = journalFull(cur) + `<div class="jf-leaf back-in"><div class="leaf-face front">${journalFull(next)}</div><div class="leaf-face back"><div class="jf-back"></div></div></div>`;
  }
  const leaf = stack.querySelector('.jf-leaf'); void leaf.offsetWidth; leaf.classList.add('go');
  setTimeout(() => { turning = false; appState.bookDate = date; softRender(); document.querySelector('#date-chips .on')?.scrollIntoView({ inline: 'center', block: 'nearest' }); }, 780);
};
openBook = function (id) { appState.bookId = id; appState.bookDate = null; appState.bookOpen = false; appRender(); };
const _wearThis15 = wearThis;
wearThis = function () { appState.bookOpen = true; _wearThis15(); };
document.addEventListener('touchstart', e => { if (e.target.closest?.('#jf-book.is-open')) appState._jx = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => { if (appState._jx == null) return; const dx = e.changedTouches[0].clientX - appState._jx; appState._jx = null; if (Math.abs(dx) > 50) turnBy(dx < 0 ? 1 : -1); }, { passive: true });

/* ---------- 5. Colour themes (for review) ---------- */
const themes = {
  warm: { name: '暖米（现在）', note: '温暖、偏复古' },
  cloud: { name: '云白', note: '干净明亮，衣服颜色最准' },
  mist: { name: '雾蓝', note: '冷静、偏科技感' },
  blush: { name: '奶油粉', note: '更可爱、更柔和' }
};
function applyTheme(t) {
  if (!themes[t]) t = 'cloud';
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('wearu-v15-theme', t); } catch {}
}
applyTheme(new URLSearchParams(location.search).get('theme') || (() => { try { return localStorage.getItem('wearu-v15-theme'); } catch { return null; } })() || 'cloud');
const _openProfile15 = openProfileSheet;
openProfileSheet = function () {
  _openProfile15();
  const row = document.querySelector('.profile-sheet .gender-row');
  if (!row) return;
  const cur = document.documentElement.dataset.theme;
  row.insertAdjacentHTML('afterend', `<div class="theme-row"><span><b>界面配色</b><small>评审用，挑一个最喜欢的</small></span><div class="theme-chips">${Object.entries(themes).map(([k, v]) => `<button type="button" data-t="${k}" aria-pressed="${k === cur}" onclick="applyTheme('${k}');this.parentElement.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b===this))"><i></i>${v.name}</button>`).join('')}</div></div>`);
};

/* ---------- boot ---------- */
appState.bookOpen = false;

;
/* --- v016.js --- */
// WEARU v016 — loaded after v015.js.
// 1 journal opens/closes without layout shift · 2 tabs: 衣橱 / 穿搭（含看看大家）/ 手账 / 懂你
// 3 diagnosis → what to add → budget → go, one gap at a time

/* ---------- 2. navigation ---------- */
appIcons.insight = '<svg viewBox="0 0 24 24"><path d="M7 4v9a5 5 0 0 0 10 0V4"/><path d="M17 4v2.5"/></svg>';
appNav = function () {
  const items = [['wardrobe', '衣橱', appIcons.wardrobe], ['styling', '穿搭', appIcons.styling], ['diary', '手账', appIcons.diary], ['shopping', '懂你', appIcons.insight]];
  return `<nav class="app-nav">${items.map(([id, label, icon]) => `<button class="${appState.tab === id ? 'active' : ''}" onclick="switchTab('${id}')">${icon}<span>${label}</span></button>`).join('')}</nav>`;
};

/* 穿搭 page: today's outfit | look at others */
const _stylingPage16 = stylingPage;
stylingPage = function () {
  if (appState.styleSubview === 'pick') return _stylingPage16();
  const inspo = appState.styleMode === 'inspo';
  const html = inspo
    ? `<main class="app-page styling-page">${pageTop('穿搭')}${modeSwitch(true)}<p class="swipe-hint">看看大家怎么穿 · 点开可试穿、找同款</p><div class="masonry">${communityFeed.map(feedCard).join('')}</div></main>`
    : _stylingPage16();
  return inspo ? html : html.replace(' disabled>生成 3 套搭配', '>生成 3 套搭配').replace('<h1 class="page-title">今天的穿搭</h1>', `<h1 class="page-title">今天的穿搭</h1>${modeSwitch(false)}`);
};
function modeSwitch(inspo) {
  return `<div class="mode-switch" role="tablist"><button role="tab" aria-selected="${!inspo}" onclick="appState.styleMode='today';softRender()">今天穿什么</button><button role="tab" aria-selected="${inspo}" onclick="appState.styleMode='inspo';softRender()">看看大家</button></div>`;
}

/* 手账 tab keeps only the journal; persona moves to 懂你 */
const _diaryPage16 = diaryPage;
diaryPage = function () {
  const html = _diaryPage16();
  const persona = personaSummary();
  return persona ? html.replace(persona, '<button class="to-insight hand" onclick="switchTab(\'shopping\')">看看 U 从手账里读到了什么 →</button>') : html;
};

/* ---------- 3. 懂你: persona → diagnosis, one gap at a time ---------- */
const gapDefs = appGender === 'male' ? [
  { rec: '黑色机能斜挎包', title: '包都偏大，约会没有合适的小包', evidence: ['wd-43', 'wd-44'], note: '双肩包和托特装得多，但约会、看展背着都显得在赶课。', tiers: ['帆布尼龙', '机能面料', '皮质设计款'] },
  { rec: '复古厚底板鞋', title: '5 双鞋都是深色或运动款，没有浅色干净的', evidence: ['wd-29', 'wd-36', 'wd-40', 'wd-42', 'wd-41'], note: '粉衬衫、条纹 T 配深色鞋都偏重，一双米白板鞋能把它们提亮。', tiers: ['基础帆布', '厚底帆布', '皮质板鞋'] },
  { rec: '黑色重磅基础 Tee', title: '10 件上衣几乎全是印花，缺纯色打底', evidence: ['wd-04', 'wd-10', 'wd-16', 'wd-26', 'wd-28'], note: '叠外套时印花和印花打架，一件纯黑就能稳住。', tiers: ['普通纯棉', '重磅纯棉', '精梳长绒棉'] },
  { rec: '水洗丹宁外套', title: '外套都偏卫衣和工装，缺一件中性外层', evidence: ['wd-27', 'wd-02', 'wd-11'], note: '降温后想穿得干净一点时，没有能压住印花的外套。', tiers: ['基础丹宁', '水洗做旧', '日系原色'] }
] : [
  { rec: '黑色玛丽珍鞋', title: '4 双鞋全是平底，裙子没鞋配', evidence: ['F19', 'F30', 'F10', 'F21'], note: '缎面裙、百褶裙配平底鞋都差一点精神，一双有一点跟的鞋就够。', tiers: ['PU 入门款', '真皮', '设计师款'] },
  { rec: '深棕色针织背心', title: '针织和衬衫之间缺一层能叠穿的', evidence: ['F28', 'F18', 'F13'], note: '白衬衫、条纹长袖单穿太素，叠一件背心就有层次。', tiers: ['混纺', '羊毛', '羊绒'] }
];
const tierLabels = ['入门', '推荐', '进阶'];
function tiersFor(r) {
  const p = r.price;
  const a = Math.round(p * 0.6 / 10) * 10, b = Math.round(p * 1.25 / 10) * 10;
  return [`¥${a} 以内`, `¥${a}–${b}`, `¥${b} 以上`];
}
appState.gapTier = appState.gapTier || {};
appState.gapOpen = appState.gapOpen ?? 0;
function gapCard(g, i) {
  const r = shopRecs.find(x => x.name === g.rec); if (!r) return '';
  const open = appState.gapOpen === i;
  const tier = appState.gapTier[i];
  const tiers = tiersFor(r);
  const ev = g.evidence.map(id => appGarments.find(x => x.id === id)).filter(Boolean);
  return `<article class="gp-card ${open ? 'open' : ''}" id="gap-${i}">
    <button class="gp-head" onclick="appState.gapOpen=${open ? -1 : i};softRender()">
      <span class="gp-no">${i + 1}</span>
      <span class="gp-q"><b>${g.title}</b><small>${open ? '收起' : '→ 补一件「' + r.name + '」'}</small></span>
    </button>
    ${open ? `<div class="flow gp-flow">
      ${railStep('done', '诊断', `<div class="gp-ev">${ev.map(x => `<img loading="lazy" decoding="async" src="${x.image}" alt="${escapeText(x.name)}" title="${escapeText(x.name)}">`).join('')}</div><p class="gp-note">${g.note}</p>`)}
      ${railStep('done', '该补什么', `<div class="rec-pair"><figure class="rec-product"><img loading="lazy" decoding="async" src="${r.img}" alt="${r.name}"><figcaption>${r.name}</figcaption></figure><figure class="rec-body"><img loading="lazy" decoding="async" src="${r.onBody}" alt=""><figcaption>买了还能这么穿</figcaption></figure></div><p class="gp-note"><b>${r.unlock || ''}</b> · ${r.note}</p>`)}
      ${railStep(tier == null ? 'current' : 'done', '这件你想花多少？', `<div class="tier-row">${tiers.map((t, k) => `<button class="${tier === k ? 'on' : ''}" onclick="appState.gapTier[${i}]=${k};softRender()"><small>${tierLabels[k]}${k === 1 ? ' · 多数人选' : ''}</small><b>${t}</b><em>${g.tiers[k]}</em></button>`).join('')}</div>`)}
      ${railStep(tier == null ? 'todo' : 'current', '去看看', `<div class="rec-actions"><button class="rec-tryon" onclick="openTryOnViewer('${r.onBody}','${r.name}','试穿这件',false,'${r.img}')">${appIcons.hanger}实时试穿</button><button class="rec-find" onclick="findSameTier('${r.query}',${i})">${appIcons.search}${tier == null ? '先选预算' : '找同款 · ' + tiers[tier]} ↗</button></div><p class="ad-note">推荐只由衣橱缺口触发 · 不抽佣</p>`)}
    </div>` : ''}
  </article>`;
}
function findSameTier(query, i) {
  const r = shopRecs.find(x => x.name === gapDefs[i].rec); const t = appState.gapTier[i];
  if (t == null) { appToast('先选一个预算，U 按价位帮你找'); return; }
  const words = ['平价', '', '高端'][t] || '';
  window.open('https://s.taobao.com/search?q=' + encodeURIComponent(`${query} ${gapDefs[i].tiers[t]} ${words}`.trim()), '_blank');
  appToast(`已打开淘宝搜索 · 预算 ${tiersFor(r)[t]}`);
}
shoppingPage = function () {
  const persona = personaSummary().replace("switchTab('shopping')", "document.getElementById('gaps')?.scrollIntoView({behavior:'smooth'})");
  const score = wardrobeScore();
  return `<main class="app-page insight-page">
    ${pageTop('懂你')}
    ${persona}
    <section class="diag-head" id="gaps">
      <div class="diag-score"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="27"/><circle class="arc" cx="32" cy="32" r="27" style="--p:${score}"/></svg><b>${score}%</b></div>
      <div><h2 class="hand">衣橱诊断</h2><p>你的 ${appGarments.length} 件衣服里，能互相搭配的组合占 ${score}%。下面 ${gapDefs.length} 个缺口补上后，预计升到 85%。一次看一个。</p></div>
    </section>
    <div class="gap-list v16">${gapDefs.map(gapCard).join('')}</div>
    ${dupWarning()}
  </main>`;
};
function dupWarning() {
  return appGender === 'male'
    ? `<section class="dup-warning"><p class="micro">先别买 · 避免重复</p><div><b>你收藏的「复古印花短袖 T」</b><small>衣橱里已有 6 件印花 T 和背心，其中「黄条纹卡通 T」近 30 天没穿过。先把已有的穿起来。</small></div></section>`
    : `<section class="dup-warning"><p class="micro">先别买 · 避免重复</p><div><b>你收藏的「白色宽松衬衫」</b><small>和衣橱里的「白色府绸衬衫」几乎一样，它已经穿过 ${(appGarments.find(g => g.id === 'F18') || {}).worn || 0} 次。先别买，把钱留给玛丽珍鞋。</small></div></section>`;
}

/* ---------- 1. journal: stable layout between closed and open ---------- */
const _diaryPage16b = diaryPage;
diaryPage = function () {
  let html = _diaryPage16b();
  if (!appState.bookOpen) {
    // reserve the date row and nav row so opening doesn't push the book down
    const pages = spreadPages();
    html = html.replace('<div class="jf-book is-closed"', `<div class="date-jump ghost" aria-hidden="true"><div class="date-chips hand">${pages.slice(-5).map(p => `<button>${fmtDate(p.date).md}</button>`).join('')}</div><label class="date-pick"><svg viewBox="0 0 24 24"><path d="M5 5h14v15H5zM8 3v4m8-4v4M5 10h14"/></svg></label></div><div class="jf-book is-closed"`)
      .replace('<p class="jf-tip hand">每次「穿这套」，都会写进这本手账</p>', '<div class="book-nav hand ghost-nav"><span class="jf-tip">每次「穿这套」，都会写进这本手账</span></div>');
  }
  return html;
};

/* generate is always clickable; without a scene it points back to step ① */
const _gen16 = generateLooks;
generateLooks = function () {
  if (!appState.flowScene) {
    appToast('先选个场合，U 才知道怎么搭');
    const st = document.getElementById('step-scene');
    if (st) { st.classList.remove('nudge'); void st.offsetWidth; st.classList.add('nudge'); st.scrollIntoView({ block: 'center' }); }
    return;
  }
  _gen16();
};
const _updateRail16 = updateRail;
updateRail = function () { _updateRail16(); const go = document.querySelector('#step-go .generate-button'); if (go) go.disabled = false; };

/* ---------- boot ---------- */

;
/* --- v017.js --- */
// WEARU v017 — journal community lives inside 手账: 我的手账 | 手账社区.
// Community posts are journal pages; every item label opens 找同款. My pages can be shared.

const sceneOf = { '约会': 'date', '通勤': 'commute', '聚会': 'party', '日常': 'daily', '街头': 'daily', '度假': 'travel', '机能': 'daily' };
const postDates = ['11.14', '11.13', '11.11', '11.10', '11.08', '11.06'];
appState.liked = appState.liked || {};
try { appState.shared = JSON.parse(localStorage.getItem(K('shared')) || '{}'); } catch { appState.shared = {}; }
function saveShared() { try { localStorage.setItem(K('shared'), JSON.stringify(appState.shared)); } catch {} }

function journalModeSwitch(community) {
  return `<div class="mode-switch journal-mode" role="tablist"><button role="tab" aria-selected="${!community}" onclick="appState.diaryMode='mine';softRender()">我的手账</button><button role="tab" aria-selected="${community}" onclick="appState.diaryMode='community';softRender()">手账社区</button></div>`;
}

/* ---------- my journal: mode switch + share button ---------- */
const _diaryPage17 = diaryPage;
diaryPage = function () {
  if (appState.diaryMode === 'community') return communityJournal();
  let html = _diaryPage17().replace('<h1 class="page-title">穿搭手账</h1>', `<h1 class="page-title">穿搭手账</h1>${journalModeSwitch(false)}`);
  const d = appState.bookDate;
  if (appState.bookOpen && d) {
    const on = !!appState.shared[d];
    html = html.replace('<span class="sb-u hand">', `<button class="share-btn hand ${on ? 'on' : ''}" onclick="toggleShare('${d}')">${on ? '已分享到社区 ✓' : '分享到手账社区'}</button><span class="sb-u hand">`);
  }
  return html;
};
function toggleShare(date) {
  appState.shared[date] = !appState.shared[date]; saveShared();
  appToast(appState.shared[date] ? '这一页已分享到手账社区' : '已取消分享');
  softRender();
}

/* ---------- community feed ---------- */
function communityPosts() {
  const mine = Object.keys(appState.shared).filter(k => appState.shared[k]).map(date => appState.diary.find(r => r.date === date)).filter(Boolean).map(r => ({
    mine: true, user: '我', date: fmtDate(r.date).md, scene: r.sceneLabel || sceneName(r.scene), caption: r.note || r.title,
    hero: r.photo || null, images: r.images, likes: 0,
    items: (r.garmentIds || []).map(id => appGarments.find(g => g.id === id)).filter(Boolean).map(g => ({ name: g.name, q: g.name, img: g.image }))
  }));
  const others = communityFeed.map((p, i) => ({ ...p, date: postDates[i % postDates.length] }));
  return [...mine, ...others];
}
function miniPage(p, i) {
  const liked = appState.liked[i];
  return `<button class="cj-card" onclick="openJournalPost(${i})" style="--r:${tilt(p.user + i, 2)}deg">
    <span class="cj-top hand"><b>${p.date}</b><em>${escapeText(p.scene)}</em></span>
    <span class="cj-photo">${p.hero ? `<img loading="lazy" decoding="async" src="${p.hero}" alt="" loading="lazy">` : miniGrid(p.images)}<i class="tape"></i></span>
    <span class="cj-cap hand">${escapeText((p.caption || '').slice(0, 26))}${(p.caption || '').length > 26 ? '…' : ''}</span>
    <span class="cj-meta"><i>${escapeText(p.user.slice(0, 1).toUpperCase())}</i>${escapeText(p.user)}${p.mine ? '<small>我分享的</small>' : ''}<em>${liked ? '♥' : '♡'} ${p.likes + (liked ? 1 : 0)}</em></span>
  </button>`;
}
function miniGrid(images = []) {
  return `<span class="cj-grid">${images.filter(Boolean).slice(0, 4).map(src => `<img loading="lazy" decoding="async" src="${src}" alt="">`).join('')}</span>`;
}
function communityJournal() {
  const posts = communityPosts();
  return `<main class="app-page diary-page journal-community">
    ${pageTop('穿搭手账')}
    ${journalModeSwitch(true)}
    <p class="cj-intro hand">翻翻大家的手账 · 看上哪件，点它就能找同款</p>
    <div class="cj-masonry">${posts.map(miniPage).join('')}</div>
  </main>`;
}
function openJournalPost(i) {
  const p = communityPosts()[i]; if (!p) return;
  const liked = appState.liked[i];
  const tags = (p.items || []).map((it, k) => `<button class="cj-tag hand" style="--r:${tilt(it.name + k, 4)}deg" onclick="openSimilarSheet('${escapeText(it.name)}','${escapeText(it.q)}','${it.img || p.hero || ''}')">${it.img ? `<img loading="lazy" decoding="async" src="${it.img}" alt="">` : ''}<span>${escapeText(it.name)}</span><b>找同款 ↗</b></button>`).join('');
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()">
    <section class="cj-sheet">
      <div class="modal-handle"></div>
      <article class="cj-page">
        <header class="jf-head"><div class="sb-date"><b>${p.date}</b><span class="hand">${escapeText(p.user)} 的手账</span></div><span class="jf-stamp" style="--r:6deg">${escapeText(p.scene)}</span></header>
        <div class="cj-photo big" style="--r:-2deg">${p.hero ? `<img loading="lazy" decoding="async" src="${p.hero}" alt="">` : miniGrid(p.images)}<i class="tape"></i></div>
        <p class="cj-says hand">${escapeText(p.caption || '')}</p>
        <p class="sb-label hand">这一身穿了 ↓ 点哪件找哪件</p>
        <div class="cj-tags">${tags || '<span class="hand">（没有标注单品）</span>'}</div>
      </article>
      <div class="cj-actions">
        <button class="ghost-button" onclick="appState.liked[${i}]=!appState.liked[${i}];closeAppModal();openJournalPost(${i});softRender()">${liked ? '♥ 已喜欢' : '♡ 喜欢'}</button>
        <button class="coral-button" onclick="copyLook('${escapeText(p.scene)}')">用我的衣服搭一套类似的</button>
      </div>
    </section>
  </div>`);
}
function copyLook(scene) {
  closeAppModal();
  appState.styleScene = sceneOf[scene] || 'daily'; appState.styleCustomScene = ''; appState.flowScene = true;
  appState.stylePicks = []; appState.styleStep = 'setup'; appState.styleLooks = [];
  switchTab('styling');
  appToast(`按「${scene}」从你的衣橱里找类似的`);
}

/* ---------- 穿搭: back to a single flow (community moved to 手账) ---------- */
const _stylingPage17 = stylingPage;
stylingPage = function () {
  appState.styleMode = 'today';
  return _stylingPage17().replace(/<div class="mode-switch" role="tablist">[\s\S]*?<\/div>/, '');
};
const _switchTab17 = switchTab;
switchTab = function (tab) { if (tab !== 'diary') appState.diaryMode = appState.diaryMode || 'mine'; _switchTab17(tab); };


;
/* --- v018.js --- */
// WEARU v018 — try-on opens inline in step ④ (digital human | live camera), following the selected look.

const tryBtn = `<button class="ghost-button" onclick="appState.flowTried=true;openTryOn();setTimeout(softRender,60)">查看上身效果</button>`;
function activeLook() { return (appState.styleLooks || [])[appState.styleActive || 0] || {}; }
function tryDigitalHTML() {
  const l = activeLook();
  return l.tryOn
    ? `<div class="tryon-result inline"><img loading="lazy" decoding="async" id="inline-try-img" src="${l.tryOn}" alt="${escapeText(l.title || '')} 上身效果"><p class="micro">「${escapeText(l.title || '')}」· 效果演示 · 仅供参考、非真实合身</p></div>`
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


;
/* --- v019.js --- */
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
      <div class="lm-pane lm-body">${look.tryOn ? `<img loading="lazy" decoding="async" src="${look.tryOn}" alt="${escapeText(look.title)} 上身效果" loading="lazy">` : `<div class="try-empty">${uMark(40)}<b>这套暂无数字人试穿</b><small>可以点下面的「实时试穿」</small></div>`}<span class="lm-tag">效果演示 · 仅供参考</span></div>
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
  pane.innerHTML = `<div class="live-frame"><video autoplay playsinline muted></video><div class="live-hud"><span class="live-dot">LIVE</span><span>正在打开摄像头…</span></div><img loading="lazy" decoding="async" class="live-garment" src="${look.top || look.outer || ''}" alt=""></div>`;
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


;
/* --- v020.js --- */
// WEARU v020 — pick items in a bottom sheet: tap toggles in place, 完成 stays pinned at the top.

let pickDraft = null;
let pickFilter = 'all';
function pickCards() {
  const items = pickFilter === 'all' ? appGarments : appGarments.filter(g => g.category === pickFilter);
  return items.map(g => {
    const on = pickDraft.has(g.id);
    return `<button class="pick-card ${on ? 'selected' : ''}" data-id="${g.id}" onclick="togglePickDraft('${g.id}', this)"><span class="pick-check">${on ? '✓' : ''}</span><img loading="lazy" decoding="async" src="${g.image}" alt="${escapeText(g.name)}" loading="lazy"><b>${escapeText(g.name)}</b><small>${escapeText(g.detail)} · 穿过 ${g.worn} 次</small></button>`;
  }).join('');
}
function pickDoneLabel() { return pickDraft.size ? `完成 · 已选 ${pickDraft.size} 件` : '先不指定，直接搭配'; }
openStylePicker = function () {
  pickDraft = new Set(appState.stylePicks);
  pickFilter = 'all';
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop pick-backdrop" id="app-modal" onclick="if(event.target===this)closePicker(false)">
    <section class="pick-sheet" role="dialog" aria-label="从衣橱中挑选">
      <header class="pick-top">
        <div class="modal-handle"></div>
        <div class="pick-bar"><button class="pick-cancel" onclick="closePicker(false)">取消</button><b>从衣橱中挑选</b><button class="pick-done" id="pick-done" onclick="closePicker(true)">${pickDoneLabel()}</button></div>
        <div class="scene-filter pick-filter">
          <button class="on" data-f="all" onclick="setPickFilter('all',this)">全部</button>
          ${appCategories.map(c => `<button data-f="${c.id}" onclick="setPickFilter('${c.id}',this)">${c.name}</button>`).join('')}
        </div>
      </header>
      <div class="pick-grid" id="pick-grid">${pickCards()}</div>
    </section>
  </div>`);
};
function setPickFilter(f, btn) {
  pickFilter = f;
  btn.parentElement.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === btn));
  const grid = document.getElementById('pick-grid'); grid.innerHTML = pickCards(); grid.scrollTop = 0;
  document.querySelector('.pick-sheet').scrollTop = 0;
}
function togglePickDraft(id, el) {
  pickDraft.has(id) ? pickDraft.delete(id) : pickDraft.add(id);
  const on = pickDraft.has(id);
  el.classList.toggle('selected', on);
  el.querySelector('.pick-check').textContent = on ? '✓' : '';
  const done = document.getElementById('pick-done'); if (done) done.textContent = pickDoneLabel();
}
function closePicker(apply) {
  const sheet = document.querySelector('.pick-sheet');
  if (apply && pickDraft) {
    const next = [...pickDraft];
    const changed = next.length !== appState.stylePicks.length || next.some(id => !appState.stylePicks.includes(id));
    if (changed) { appState.stylePicks = next; appState.styleStep = 'setup'; appState.styleLooks = []; appState.flowWorn = false; }
  }
  pickDraft = null;
  if (sheet) sheet.classList.add('closing');
  setTimeout(() => { closeAppModal(); if (apply) softRender(); }, sheet ? 220 : 0);
}
// chips on the main page: removing a pick also stays in place
togglePick = function (id) {
  appState.stylePicks = appState.stylePicks.filter(x => x !== id);
  appState.styleStep = 'setup'; appState.styleLooks = [];
  softRender();
};


;
/* --- v021.js --- */
// WEARU v021 — community cards show a feeling + 1–2 style keywords, not an item list.
const postVoice = {
  Kern: { feel: '走了一下午也不热，被路人问了裤子', tags: ['松弛', '度假'] },
  '13': { feel: '学院风也可以有点痞', tags: ['复古', '学院'] },
  Noah: { feel: '一身浅色，整个人都轻了', tags: ['干净', '通透'] },
  Ash: { feel: '丝巾是点睛，约会被夸了', tags: ['复古', '精致'] },
  ZL: { feel: '舒服到不想换下来', tags: ['机能', '慵懒'] },
  Mia: { feel: '第一次被问链接', tags: ['温柔', '小心机'] },
  Yuki: { feel: '日常也想穿得有点法式', tags: ['法式', '日常'] },
  Lin: { feel: '蓝灰色真的很耐看', tags: ['通勤', '低饱和'] }
};
function voiceOf(p) {
  if (p.mine) {
    const r = appState.diary.find(x => fmtDate(x.date).md === p.date) || {};
    return { feel: r.note || (r.feels && r.feels[0]) || '今天的穿搭', tags: [p.scene, ...(r.feels || []).slice(0, 1)].filter(Boolean).slice(0, 2) };
  }
  return postVoice[p.user] || { feel: p.caption, tags: [p.scene] };
}
const _miniPage21 = miniPage;
miniPage = function (p, i) {
  const v = voiceOf(p);
  return _miniPage21(p, i).replace(/<span class="cj-cap hand">[\s\S]*?<\/span>/, `<span class="cj-cap hand">“${escapeText(v.feel)}”</span><span class="cj-kw">${v.tags.map(t => `<i>#${escapeText(t)}</i>`).join('')}</span>`);
};
const _openPost21 = openJournalPost;
openJournalPost = function (i) {
  _openPost21(i);
  const p = communityPosts()[i]; if (!p) return;
  const v = voiceOf(p);
  const says = document.querySelector('.cj-sheet .cj-says');
  if (says) says.outerHTML = `<p class="cj-says hand">“${escapeText(v.feel)}”</p><p class="cj-kw big">${v.tags.map(t => `<i>#${escapeText(t)}</i>`).join('')}</p>${p.caption && !p.mine ? `<p class="cj-desc">${escapeText(p.caption)}</p>` : ''}`;
};

;
/* --- v022.js --- */
// WEARU v022 — interface colour fixed to 云白 (cloud); the review-only theme picker is removed.
applyTheme('cloud');
document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#FAFAF8');
const _openProfile22 = openProfileSheet;
openProfileSheet = function () { _openProfile22(); document.querySelector('.profile-sheet .theme-row')?.remove(); };

;
/* --- v024.js --- */
// WEARU v024 — a gap's suggestion goes back to the real day it showed up:
// 懂你: 「该补什么」 shows that day's look next to "if you'd had it". 穿搭: picking the same kind of scene shows the same "if you had it" card under the looks.

// one real journal day per gap (offset in days from today, matching the seeded journal), what was missing then, and which 穿搭 scenes it belongs to
const gapMoments = appGender === 'male' ? {
  '黑色机能斜挎包': { off: 1, scenes: ['date', 'party'], then: '那天背的是翻盖双肩包，去看展一路像在赶课。', swap: 'wd-43', ifText: '同一套工装，换成小斜挎' },
  '复古厚底板鞋': { off: 26, scenes: ['daily', 'travel'], then: '印花 T 配灰色跑鞋，整个人往下坠。', swap: 'wd-40', ifText: '同样的印花 T + 橄榄阔腿，换一双浅色板鞋' },
  '黑色重磅基础 Tee': { off: 12, scenes: ['commute'], then: '照片印花夹克里又配了印花 T，两层图案打架。', swap: 'wd-10', ifText: '还是这件印花夹克，里面换成纯黑 Tee' },
  '水洗丹宁外套': { off: 22, scenes: ['daily', 'party'], then: '降温只能套拉链卫衣，条纹 T 被压得有点乱。', swap: 'wd-02', ifText: '条纹 T + 做旧牛仔不变，外层换丹宁' }
} : {
  '黑色玛丽珍鞋': { off: 11, scenes: ['date', 'party'], then: '本想穿缎面裙去生日饭，可鞋全是平底，最后换回了牛仔裤。', swap: 'F23', ifText: '皮夹克不变，裙子 + 玛丽珍终于能穿出去' },
  '深棕色针织背心': { off: 1, scenes: ['commute', 'daily'], then: '又是黑针织 + 牛仔，这个月第 5 次。', swap: 'F28', ifText: '同一条牛仔，换成白衬衫 + 背心叠穿' }
};
function momentFor(recName) {
  const m = gapMoments[recName]; if (!m) return null;
  const rec = (appState.diary || []).find(r => r.date === dateStr(m.off));
  if (!rec) return null;
  const ids = rec.garmentIds || [];
  const pieces = ids.map(id => appGarments.find(g => g.id === id)).filter(Boolean);
  return { ...m, rec, pieces, sceneName: rec.sceneLabel || sceneName(rec.scene), md: fmtDate(rec.date).md };
}
function thenCanvas(mo) {
  const by = c => mo.pieces.find(g => g.category === c)?.image || '';
  return outfitCanvas([by('outer'), by('tops'), by('bottoms'), by('shoes'), by('bags') || by('accessories')], mo.pieces.map(g => g.name));
}
function whatIfPair(r, mo) {
  const swapped = appGarments.find(g => g.id === mo.swap);
  return `<div class="wi-pair">
    <figure class="wi-then"><div class="wi-img">${thenCanvas(mo)}</div><figcaption><b>那天你穿的</b>${swapped ? `<small>当时：${escapeText(swapped.name)}</small>` : ''}</figcaption></figure>
    <span class="wi-arrow" aria-hidden="true">→</span>
    <figure class="wi-if"><div class="wi-img"><img loading="lazy" decoding="async" src="${r.onBody}" alt="${escapeText(r.name)} 上身效果"><span class="wi-demo">效果演示</span></div><figcaption><b>如果有「${escapeText(r.name)}」</b><small>${escapeText(mo.ifText)}</small></figcaption></figure>
  </div>`;
}

/* ---------- 懂你: 「该补什么」 replays that day ---------- */
const _gapCard24 = gapCard;
gapCard = function (g, i) {
  let html = _gapCard24(g, i);
  const r = shopRecs.find(x => x.name === g.rec); const mo = r && momentFor(r.name);
  if (!mo || appState.gapOpen !== i) return html;
  const block = `<div class="wi-moment"><span class="wi-chip">回到 ${mo.md} · ${escapeText(mo.sceneName)}</span><p class="gp-note">${escapeText(mo.then)}</p></div>
    ${whatIfPair(r, mo)}
    <div class="wi-product"><img loading="lazy" decoding="async" src="${r.img}" alt=""><span><b>${escapeText(r.name)}</b><small>${escapeText(r.unlock || '')} · ${escapeText(r.note)}</small></span></div>`;
  return html.replace(/<div class="rec-pair">[\s\S]*?<\/div><p class="gp-note">[\s\S]*?<\/p>/, block);
};

/* ---------- 穿搭: the same suggestion shows up under the looks for that kind of scene ---------- */
function whatIfForScene(sceneId) {
  for (let i = 0; i < gapDefs.length; i++) {
    const r = shopRecs.find(x => x.name === gapDefs[i].rec); const mo = r && momentFor(r.name);
    if (mo && mo.scenes.includes(sceneId)) return { r, mo, i };
  }
  return null;
}
function openGapFromStyling(i) { appState.gapOpen = i; switchTab('shopping'); setTimeout(() => document.getElementById('gap-' + i)?.scrollIntoView({ block: 'start' }), 80); }
const _stylingPage24 = stylingPage;
stylingPage = function () {
  const html = _stylingPage24();
  const hasResult = appState.styleStep === 'result' && appState.styleLooks.length && !appState.genLoading;
  if (!hasResult || appState.styleCustomScene) return html;
  const w = whatIfForScene(appState.styleScene); if (!w) return html;
  const card = `<section class="wi-styling">
    <p class="wi-head"><b>${escapeText(sceneName(appState.styleScene))}这类场合，你的衣橱能搭的有限</b><small>上次 ${w.mo.md} · ${escapeText(w.mo.then)}</small></p>
    ${whatIfPair(w.r, w.mo)}
    <div class="wi-foot"><span class="wi-tag">建议 · 由衣橱缺口推导，不抽佣</span><button onclick="openGapFromStyling(${w.i})">看看这件 →</button></div>
  </section>`;
  return html.replace(/(<div class="look-dots">[\s\S]*?<\/div>)/, `$1${card}`);
};


;
/* --- v025.js --- */
// WEARU v025 — the "if you had it" card stays only in 懂你; 穿搭 shows just the looks again.
const _stylingPage25 = stylingPage;
stylingPage = function () { return _stylingPage25().replace(/<section class="wi-styling">[\s\S]*?<\/section>/, ''); };

;
/* --- v026.js --- */
// WEARU v026 — the before/after in 懂你 is two digital humans: same model, same pose, only the gap item differs.
const beforeShots = appGender === 'male' ? {
  '黑色机能斜挎包': 'male/before-bag.webp', '复古厚底板鞋': 'male/before-shoes.webp',
  '黑色重磅基础 Tee': 'male/before-tee.webp', '水洗丹宁外套': 'male/before-denim.webp'
} : { '黑色玛丽珍鞋': 'female/before-maryjane.webp', '深棕色针织背心': 'female/before-vest.webp' };
const _whatIfPair26 = whatIfPair;
whatIfPair = function (r, mo) {
  const html = _whatIfPair26(r, mo);
  const src = beforeShots[r.name]; if (!src) return html;
  return html.replace(/<figure class="wi-then"><div class="wi-img">[\s\S]*?<\/div><figcaption>/, `<figure class="wi-then"><div class="wi-img wi-human"><img loading="lazy" decoding="async" src="${src}" alt="那天的穿搭 · 数字人还原"><span class="wi-demo">效果演示</span></div><figcaption>`);
};

;
/* --- v028.js --- */
// WEARU v028 — new brand: layered-swatch logo + felt companion figures (5 to choose from).

/* ---------- logo ---------- */
function wearuMark(cls = 'wearu-mark') {
  return `<svg class="${cls}" viewBox="0 0 64 62" aria-hidden="true">
    <rect x="10" y="44" width="28" height="15" rx="1.2" fill="#C4643F" transform="rotate(-2 24 51)"/>
    <rect x="2" y="27" width="47" height="22" rx="1.2" fill="#EFE5D3" stroke="#D8CBB4" stroke-width=".6" transform="rotate(-3 25 38)"/>
    <path d="M18 10.5 52.4 2.4c1.9-.4 3.2.6 3.2 2.5V25c0 11.4-7.6 19-18.6 19H18.4z" fill="#2B2A28"/>
    <path d="M52 7.2V25c0 9.2-6 15.4-15 15.4H21.4" fill="none" stroke="#F4EFE7" stroke-width="1.4" stroke-dasharray="2.8 2.2" stroke-linecap="round"/>
  </svg>`;
}
brandLogo = function () { return `<span class="brand-lockup v28">${wearuMark()}<b>WEARU</b></span>`; };
// favicon
(() => {
  const svg = wearuMark('').replace('<svg class=""', '<svg xmlns="http://www.w3.org/2000/svg"');
  let l = document.querySelector('link[rel="icon"]');
  if (!l) { l = document.createElement('link'); l.rel = 'icon'; document.head.appendChild(l); }
  l.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
})();

/* ---------- companion figures ---------- */
const ipFigures = {
  navy: ['藏青', 'ip/navy.webp'], ink: ['墨黑', 'ip/ink.webp'], stone: ['石灰', 'ip/stone.webp'],
  clay: ['陶土', 'ip/clay.webp'], mustard: ['芥黄', 'ip/mustard.webp']
};
const legacyU = { ivory: 'navy', sage: 'stone', charcoal: 'ink', clay: 'clay' };
uColor = function () {
  const c = (appState.profile && appState.profile.uColor) || 'navy';
  return ipFigures[c] ? c : (legacyU[c] || 'navy');
};
uMark = function (size = 28, extra = '') {
  return `<span class="u-mark ip-mark ${extra}" style="--u:${size}px" aria-hidden="true"><img loading="lazy" decoding="async" src="${ipFigures[uColor()][1]}" alt=""></span>`;
};
companionPanel = function () {
  const sel = uColor();
  return `<section class="companion-panel ip-panel">
    <div class="u-display" id="u-display"><img loading="lazy" decoding="async" src="${ipFigures[sel][1]}" alt="你的穿搭伙伴"></div>
    <div class="companion-copy"><span class="micro">YOUR WARDROBE COMPANION</span><h3>选一个陪你穿搭的小伙伴</h3><p>它会出现在搭配、手账和衣橱诊断里。</p>
      <div class="ip-pick" aria-label="选择穿搭伙伴">${Object.entries(ipFigures).map(([k, [n, src]]) => `<button type="button" aria-pressed="${k === sel}" title="${n}" onclick="setCompanionColor('${k}',this)"><img loading="lazy" decoding="async" src="${src}" alt="${n}"></button>`).join('')}</div>
    </div></section>`;
};
setCompanionColor = function (c, btn) {
  if (!ipFigures[c]) return;
  appState.profile.uColor = c;
  const img = document.querySelector('#u-display img'); if (img) img.src = ipFigures[c][1];
  document.querySelectorAll('.ip-pick button').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
  try { localStorage.setItem(K('profile'), JSON.stringify(appState.profile)); } catch {}
  softRender();
};

/* ---------- nav: 懂你 uses a stitched swatch instead of the old U ---------- */
appIcons.insight = '<svg viewBox="0 0 24 24"><path d="M5 6.5 18.6 4.2c.8-.1 1.4.4 1.4 1.2v6.2c0 4.3-3 7.4-7.3 7.4H5.6z"/><path d="M17.8 7v4.6c0 3-2 5.1-5 5.1H8" stroke-dasharray="1.6 1.6"/></svg>';


;
/* --- v030.js --- */
// WEARU v030 — review fixes:
// 1 look card keeps one label · 2 「U 说」: companion always top-left with speech marks
// 3 journal: one date line, mood is a prominent writing field · 4 picker: 🔥 often worn / 🧊 30 days unworn; no "看看衣橱缺口" button
// 5 opening a gap scrolls to that gap's top

/* 1. one label per look */
const _lookSlide30 = lookSlide;
lookSlide = function (look, i) { return _lookSlide30(look, i).replace(/<span>LOOK 0\d<\/span>/, ''); };

/* 2. 「U 说」 */
const talkMarks = '<svg class="us-talk" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 2.5 5 9.5M15.5 7.5l-5.5 4.5"/></svg>';
uSays = function (text) {
  return `<div class="u-says v30"><span class="us-who">${uMark(40)}${talkMarks}</span><p><b>U 说</b>${text}</p></div>`;
};

/* 3. journal page */
const _journalFull30 = journalFull;
journalFull = function (rec) {
  let html = _journalFull30(rec);
  if (!rec) return html;
  html = html.replace(/(<div class="sb-date">[\s\S]*?<span class="hand">)(周.)[^<]*(<\/span>)/, '$1$2$3');
  html = html.replace(/<p class="sb-label hand">今天的心情 ↓<\/p>\s*<div class="sb-feels">[\s\S]*?<\/div>\s*/, '');
  const ph = rec.scene === 'date' ? '约会怎么样？随手写一句…' : '今天穿着感觉怎么样？随手写一句…';
  html = html.replace(/<textarea class="sb-note hand"([^>]*?)placeholder="[^"]*"([^>]*)>([\s\S]*?)<\/textarea>/,
    `<div class="mood-box"><span class="mood-tag hand">✎ 今天的心情</span><textarea class="sb-note mood-note hand"$1placeholder="${ph}"$2>$3</textarea></div>`);
  return html;
};

/* 4a. picker badges: 🔥 often worn (top 3 in 30 days), 🧊 not worn in 30 days */
function wearHeat() {
  const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 30);
  const count = {};
  (appState.diary || []).filter(r => new Date(r.date) >= cutoff).forEach(r => (r.garmentIds || []).forEach(id => count[id] = (count[id] || 0) + 1));
  const hot = new Set(Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 5).filter(([, n]) => n >= 3).map(([id]) => id));
  return { hot, cold: id => !count[id], count };
}
const _pickCards30 = pickCards;
pickCards = function () {
  const h = wearHeat();
  return _pickCards30().replace(/<button class="pick-card([^"]*)" data-id="([^"]+)"([^>]*)>/g, (m, cls, id, rest) => {
    const tag = h.hot.has(id) ? `<span class="heat hot">🔥 近期常穿</span>` : h.cold(id) ? '<span class="heat cold">🧊 30 天没穿</span>' : '';
    return `<button class="pick-card${cls}" data-id="${id}"${rest}>${tag}`;
  });
};
const _openPicker30 = openStylePicker;
openStylePicker = function () {
  _openPicker30();
  document.querySelector('.pick-filter')?.insertAdjacentHTML('afterend', '<p class="heat-legend"><span>🔥 最近常穿</span><span>🧊 30 天没穿，试试让它出场</span></p>');
};

/* 4b. 懂你: diagnosis sits right below, so no "看看衣橱缺口 →" button */
const _persona30 = personaSummary;
personaSummary = function () { return _persona30().replace(/<button class="ghost-button" onclick="switchTab\('shopping'\)">看看衣橱缺口 →<\/button>/, ''); };

/* 5. opening a gap lands on its top, not wherever the page shifted to */
function openGap(i) {
  appState.gapOpen = i;
  softRender();
  requestAnimationFrame(() => {
    const el = document.getElementById('gap-' + i); if (!el) return;
    const bar = document.querySelector('.app-page > .brand-top');
    const under = bar ? bar.getBoundingClientRect().bottom + 8 : 80;
    window.scrollTo({ top: Math.max(0, window.scrollY + el.getBoundingClientRect().top - under) });
  });
}
const _gapCard30 = gapCard;
gapCard = function (g, i) { return _gapCard30(g, i).replace(/onclick="appState\.gapOpen=(\d+);softRender\(\)"/, 'onclick="openGap($1)"'); };


;
/* --- v031.js --- */
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
    html = `<section class="fit-box twin"><p class="fit-head">🧊 先别买：你衣橱里已经有很像的</p><div class="fit-row"><figure><img loading="lazy" decoding="async" src="${thumb}" alt=""><figcaption>${escapeText(name)}</figcaption></figure><span class="fit-eq">≈</span><figure><img loading="lazy" decoding="async" src="${f.twin.image}" alt=""><figcaption>你的「${escapeText(f.twin.name)}」· 穿过 ${f.twin.worn || 0} 次</figcaption></figure></div><p class="fit-note">把预算留给真正的衣橱缺口。</p></section>`;
  } else {
    const top = (pairWith[itemCategory(name)] || []).map(c => f.pals.find(g => g.category === c)).filter(Boolean).slice(0, 3);
    html = `<section class="fit-box ${f.kind}"><p class="fit-head">${f.kind === 'good' ? `✓ 能和你衣橱里 ${f.pals.length} 件搭配` : '△ 和你现在的衣橱不太搭'}</p>
      ${top.length ? `<div class="fit-row"><figure class="new"><img loading="lazy" decoding="async" src="${thumb}" alt=""><figcaption>它</figcaption></figure><span class="fit-eq">＋</span>${top.map(g => `<figure><img loading="lazy" decoding="async" src="${g.image}" alt=""><figcaption>${escapeText(g.name)}</figcaption></figure>`).join('')}</div>` : ''}
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
  const mix = `<div class="wi-mix"><span class="wi-lbl">右边这套 =</span><span class="wi-th wi-new" title="${escapeText(r.name)}"><img loading="lazy" decoding="async" src="${r.img}" alt=""><i>新</i></span><b>＋</b><span class="wi-lbl">你已有的</span>${own.map(g => `<span class="wi-th" title="${escapeText(g.name)}"><img loading="lazy" decoding="async" src="${g.image}" alt="${escapeText(g.name)}"></span>`).join('')}</div>`;
  return _whatIf31(r, mo) + mix;
};

const _community31 = communityJournal;
communityJournal = function () { return _community31().replace('翻翻大家的手账 · 看上哪件，点它就能找同款', '翻翻大家的手账 · 看上哪件，先看看和你的衣橱搭不搭'); };


;
/* --- v032.js --- */
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
      <div class="fit-row"><figure><img loading="lazy" decoding="async" src="${thumb}" alt=""><figcaption>${escapeText(name)}</figcaption></figure><span class="fit-eq">≈</span><figure><img loading="lazy" decoding="async" src="${f.twin.image}" alt=""><figcaption>你的「${escapeText(f.twin.name)}」</figcaption></figure></div></section>`;
  } else if (f.kind === 'good') {
    const pals = fitPartners(name);
    const img = fitLooks[name] ? `${appGender}/fit-${fitLooks[name][0]}.webp` : '';
    body = `<section class="fs-fit good"><p class="fit-head">✓ 能和你衣橱里 ${f.pals.length} 件搭配</p>
      ${img ? `<div class="fs-try"><img loading="lazy" decoding="async" src="${img}" alt="${escapeText(name)} 搭你的衣服"><span class="lm-tag">效果演示 · 仅供参考</span></div>` : ''}
      <div class="fs-with"><span class="fs-new"><img loading="lazy" decoding="async" src="${thumb}" alt=""><i>它</i></span><b>＋</b>${pals.map(g => `<span title="${escapeText(g.name)}"><img loading="lazy" decoding="async" src="${g.image}" alt="${escapeText(g.name)}"></span>`).join('')}<small>${pals.map(g => escapeText(g.name)).join(' · ')}</small></div></section>`;
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


;
/* --- v033.js --- */
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


;
/* --- v034.js --- */
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
      <div class="order-list">${items.map(([img, cat, name], i) => `<label class="order-item"><input type="checkbox" checked onchange="appState.orderPick[${i}]=this.checked"><img loading="lazy" decoding="async" src="${img}" alt=""><span><b>${escapeText(name)}</b><small>${appCategories.find(c => c.id === cat)?.name || ''}</small></span></label>`).join('')}</div>
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


;
/* --- v035.js --- */
// WEARU v035 — gender moves into the profile form · WEARU Plus (free 7-day trial → subscription)
// Entry points: ① membership card at the top of 个人档案 ② at the feature itself (每日搭配 / 实时试穿 / 进阶衣橱分析 / 衣橱容量)

/* ---------- plan state (demo) ---------- */
const PLAN_KEY = 'wearu-v35-plan';
function plan() { try { return localStorage.getItem(PLAN_KEY) || 'trial'; } catch { return 'trial'; } }
function setPlan(p) { try { localStorage.setItem(PLAN_KEY, p); } catch {} }
const trialLeft = 6;
const isPlus = () => plan() !== 'free';
const plusPlans = [
  { id: 'month', name: '月付', price: '¥19.90', unit: '/月', per: '¥19.90 / 月' },
  { id: 'quarter', name: '季付', price: '¥49.90', unit: '/季', per: '约 ¥16.63 / 月' },
  { id: 'year', name: '年付', price: '¥159', unit: '/年', per: '¥13.25 / 月', tag: '最划算' }
];
appState.plusPick = appState.plusPick || 'year';
const plusRows = [
  ['数字衣橱', '最多 30 件', '最多 150 件'],
  ['穿搭日记', '每天 1 条', '每天 3 条'],
  ['手账社区', '分享 · 浏览 · 找同款', '同基础版'],
  ['每日搭配建议', '—', '每天 3 套'],
  ['AI 实时视频试穿', '—', '每天 1 次 · 30 秒'],
  ['进阶衣橱分析', '—', '穿着频率 · 闲置单品 · 新搭配']
];
const plusWhy = { daily: '每天用你已有的衣服搭 3 套', live: 'AI 实时视频试穿', insight: '进阶衣橱分析', closet: '衣橱扩容到 150 件' };

function openPlus(reason = '') {
  const p = plan();
  const pick = plusPlans.find(x => x.id === appState.plusPick) || plusPlans[2];
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="app-modal" onclick="if(event.target===this)closeAppModal()"><section class="plus-sheet">
    <div class="modal-handle"></div>
    <header class="plus-hero">${uMark(76)}<div><p class="plus-kicker">WEARU Plus</p><h2>${reason && plusWhy[reason] ? `解锁${plusWhy[reason]}` : '让 U 每天帮你搭'}</h2>
      <p class="plus-state">${p === 'trial' ? `试用中 · 还剩 ${trialLeft} 天` : p === 'plus' ? '已开通' : '新用户注册可免费试用 7 天'}</p></div></header>
    <div class="plus-table" role="table">
      <div class="pt-head" role="row"><span></span><span>基础版</span><span>Plus</span></div>
      ${plusRows.map(([k, a, b]) => `<div class="pt-row" role="row"><span>${k}</span><span>${a}</span><span>${b}</span></div>`).join('')}
    </div>
    ${p === 'plus' ? '' : `<div class="plus-plans">${plusPlans.map(x => `<button class="${x.id === pick.id ? 'on' : ''}" data-plan="${x.id}" onclick="pickPlusPlan('${x.id}')">${x.tag ? `<em>${x.tag}</em>` : ''}<b>${x.name}</b><strong>${x.price}<small>${x.unit}</small></strong><span>${x.per}</span></button>`).join('')}</div>
    <button class="coral-button plus-cta" onclick="subscribePlus()">${plusCta(pick)}</button>`}
    <button class="plus-demo" onclick="setPlan('${p === 'free' ? 'trial' : 'free'}');closeAppModal();softRender();appToast('${p === 'free' ? '已恢复为试用中（演示）' : '已切到免费基础版（演示）'}')">演示：${p === 'free' ? '恢复试用' : '切到免费基础版'}</button>
  </section></div>`);
}
function plusCta(pick) { return plan() === 'trial' ? `试用结束后续费 · ${pick.price}${pick.unit}` : `开通 Plus · ${pick.price}${pick.unit}`; }
function pickPlusPlan(id) {
  appState.plusPick = id;
  document.querySelectorAll('.plus-plans button').forEach(b => b.classList.toggle('on', b.dataset.plan === id));
  const cta = document.querySelector('.plus-cta'); if (cta) cta.textContent = plusCta(plusPlans.find(x => x.id === id));
}
function subscribePlus() {
  const pick = plusPlans.find(x => x.id === appState.plusPick);
  setPlan('plus'); closeAppModal(); softRender();
  appToast(`已开通 WEARU Plus · ${pick.name}（演示，未扣费）`);
}

/* ---------- profile: membership card on top, gender inside the form ---------- */
const _openProfile35 = openProfileSheet;
openProfileSheet = function () {
  _openProfile35();
  const sheet = document.querySelector('.profile-sheet'); if (!sheet) return;
  sheet.querySelector('.gender-row')?.remove();
  const p = plan();
  sheet.querySelector('h2')?.insertAdjacentHTML('afterend', `<button class="plus-card ${p}" onclick="closeAppModal();setTimeout(()=>openPlus(),220)">
    <span><b>${p === 'free' ? '免费基础版' : 'WEARU Plus'}</b><small>${p === 'trial' ? `试用中 · 还剩 ${trialLeft} 天` : p === 'plus' ? '已开通 · 每日搭配、实时试穿、进阶分析' : '升级 Plus：每日搭配 · 实时试穿 · 进阶分析'}</small></span><i>${p === 'plus' ? '查看' : p === 'trial' ? '续费方案' : '升级'} →</i></button>`);
  const firstField = sheet.querySelector('label');
  firstField?.insertAdjacentHTML('beforebegin', `<div class="pf-row"><span>性别</span>${genderToggle()}</div>`);
};

/* ---------- gates at the feature ---------- */
// 每日搭配建议
const _stylingPage35 = stylingPage;
stylingPage = function () {
  let html = _stylingPage35();
  if (!isPlus()) {
    html = html.replace(/<button class="coral-button generate-button"[^>]*>生成 3 套搭配<\/button>/,
      `<div class="plus-lock"><b>每日搭配建议是 Plus 功能</b><button class="coral-button" onclick="openPlus('daily')">解锁 Plus · 每天 3 套</button></div>`);
  } else if (plan() === 'trial') {
    html = html.replace(/(<button class="coral-button generate-button"[^>]*>生成 3 套搭配<\/button>)/, `$1<span class="plus-chip">Plus 试用 · 剩 ${trialLeft} 天</span>`);
  }
  return html;
};
const _generate35 = generateLooks;
generateLooks = function () { if (!isPlus()) return openPlus('daily'); _generate35(); };
// AI 实时视频试穿
const _lookSlide35 = lookSlide;
lookSlide = function (look, i) { return _lookSlide35(look, i).replace(/(<button class="live-btn[^"]*"[^>]*>[\s\S]*?<span>[^<]*<\/span>)/, '$1<em class="plus-tag">Plus</em>'); };
const _live35 = toggleSlideLive;
toggleSlideLive = function (i) { if (!isPlus()) return openPlus('live'); return _live35(i); };
// 进阶衣橱分析
const _persona35 = personaSummary;
personaSummary = function () {
  const html = _persona35();
  if (isPlus() || !html) return html;
  return `<div class="plus-blur">${html}<div class="plus-over"><b>进阶衣橱分析是 Plus 功能</b><small>穿着频率 · 闲置单品 · 新搭配</small><button class="coral-button" onclick="openPlus('insight')">解锁 Plus</button></div></div>`;
};
// 衣橱容量
const _appRender35 = appRender;
appRender = function () {
  _appRender35();
  const cap = isPlus() ? 150 : 30;
  document.querySelectorAll('.wardrobe-page .section-head span, .section-head span').forEach(s => {
    const m = s.textContent.match(/^(\d+) 件$/); if (!m) return;
    const n = +m[1];
    s.innerHTML = `${n} / ${cap} 件${n > cap ? ` <button class="cap-up" onclick="openPlus('closet')">扩容</button>` : ''}`;
  });
};


;
/* --- v036.js --- */
// WEARU v036 — gender switch returns you to exactly where you were · Plus plans show original price and discount

/* 1. gender: the demo data is built per gender when the page loads, so we still reload,
      but remember the tab, scroll and the open profile sheet and put you straight back */
const RESUME36 = 'wearu-v36-resume';
setGender = function (g) {
  if (g === appGender) return;
  document.querySelectorAll('.gender-toggle button').forEach(b => b.setAttribute('aria-pressed', String(b.textContent.trim() === (g === 'female' ? '女' : '男'))));
  const sheet = document.querySelector('.profile-sheet');
  try {
    sessionStorage.setItem(RESUME36, JSON.stringify({ tab: appState.tab, profile: !!sheet, sheetY: sheet ? sheet.scrollTop : 0, y: window.scrollY, g }));
    localStorage.setItem('wearu-v10-gender', g);
  } catch {}
  document.documentElement.classList.add('switching');
  setTimeout(() => location.reload(), 180);
};
(() => {
  let r = null;
  try { r = JSON.parse(sessionStorage.getItem(RESUME36) || 'null'); sessionStorage.removeItem(RESUME36); } catch {}
  if (!r) return;
  document.documentElement.classList.add('resuming');
  appState.tab = r.tab || appState.tab;
  appRender();
  window.scrollTo(0, r.y || 0);
  if (r.profile) {
    openProfileSheet();
    const s = document.querySelector('.profile-sheet');
    if (s) { s.scrollTop = r.sheetY || 0; }
  }
  appToast(r.g === 'female' ? '已切换到女生版' : '已切换到男生版');
  setTimeout(() => document.documentElement.classList.remove('resuming'), 400);
})();

/* 2. Plus: original price + discount, deeper the longer you commit (prices unchanged) */
const plusDeal = {
  month: { orig: '¥25', off: '8 折', save: '省 ¥5.1' },
  quarter: { orig: '¥75', off: '6.7 折', save: '省 ¥25.1' },
  year: { orig: '¥300', off: '5.3 折', save: '省 ¥141' }
};
const _openPlus36 = openPlus;
openPlus = function (reason) {
  _openPlus36(reason);
  document.querySelectorAll('.plus-plans button').forEach(b => {
    const d = plusDeal[b.dataset.plan]; if (!d) return;
    b.querySelector('strong')?.insertAdjacentHTML('beforebegin', `<s class="pp-orig">${d.orig}</s>`);
    b.querySelector('span')?.insertAdjacentHTML('afterend', `<i class="pp-off">${d.off} · ${d.save}</i>`);
  });
  document.querySelector('.plus-plans')?.insertAdjacentHTML('beforebegin', '<p class="pp-note">原价 ¥25 / 月 · 订得越久越划算</p>');
};

;
/* --- v037.js --- */
// WEARU v037 — 性别 behaves like any other field: tapping it only flips the switch (and the gender-specific chips).
// The demo data is swapped once, quietly, when the profile sheet is closed — you stay on the same tab and scroll position.

const constraintSets = { male: ['不穿短裤', '避免紧身', '避免太正式', '不戴帽子'], female: ['不露腿', '不穿高跟', '避免紧身', '避免太正式'] };
let pendingGender = null;

setGender = function (g) {
  const cur = pendingGender || appGender;
  if (g === cur) return;
  pendingGender = g === appGender ? null : g;
  document.querySelectorAll('.gender-toggle button').forEach(b => b.setAttribute('aria-pressed', String(b.textContent.trim() === (g === 'female' ? '女' : '男'))));
  const box = [...document.querySelectorAll('.profile-sheet .chip-group')].find(c => c.querySelector('span')?.textContent === '穿着限制')?.querySelector('div');
  if (box) box.innerHTML = constraintSets[g].map(x => `<button class="chip" onclick="toggleProfileChip('constraints','${x}',this)">${x}</button>`).join('');
};

// apply the pending switch when the profile sheet goes away (保存档案 or tapping outside)
const _close37 = closeAppModal;
closeAppModal = function () {
  const all = document.querySelectorAll('.modal-backdrop');
  const top = all[all.length - 1];
  const isProfile = !!top?.querySelector('.profile-sheet');
  _close37();
  if (isProfile && pendingGender && pendingGender !== appGender) {
    const g = pendingGender; pendingGender = null;
    try {
      sessionStorage.setItem(RESUME36, JSON.stringify({ tab: appState.tab, profile: false, y: window.scrollY, g }));
      localStorage.setItem('wearu-v10-gender', g);
    } catch {}
    setTimeout(() => { document.documentElement.classList.add('switching'); setTimeout(() => location.reload(), 150); }, 200);
  }
};

;
/* --- v038.js --- */
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

;
/* --- v039.js --- */
// WEARU v039 — photos you add while trying the demo are not saved (only kept until you reload); old saved ones are cleared.
const stripPhotos = list => (list || []).map(r => (r.photo && String(r.photo).startsWith('data:')) ? { ...r, photo: null } : r);
saveDiary = function () { try { localStorage.setItem(K('diary'), JSON.stringify(stripPhotos(appState.diary))); } catch {} };
(() => {
  try {
    const raw = JSON.parse(localStorage.getItem(K('diary')) || 'null');
    if (raw && raw.some(r => r.photo && String(r.photo).startsWith('data:'))) {
      localStorage.setItem(K('diary'), JSON.stringify(stripPhotos(raw)));
      appState.diary = appState.diary.map(r => (r.photo && String(r.photo).startsWith('data:')) ? { ...r, photo: null } : r);
    }
    localStorage.removeItem(K('avatar')); // avatar is also session-only now
  } catch {}
})();
// avatar upload: keep it for this visit only
const _setItem39 = Storage.prototype.setItem;
Storage.prototype.setItem = function (k, v) { if (typeof k === 'string' && k.endsWith('-avatar')) return; return _setItem39.call(this, k, v); };
// journal stamp: don't show "--°" when the weather hadn't loaded yet
const _journalFull39 = journalFull;
journalFull = function (rec) { return _journalFull39(rec).replace(/ · (?:--|NaN|undefined)°/, ''); };

;
/* --- v040.js --- */
// WEARU v040 — once the first screen is up, quietly download the images the other tabs will need,
// so tapping 穿搭 / 手账 / 懂你 shows them straight away. Only the current gender's images; a few at a time; stops if the tab is hidden.
(function warmUp() {
  const start = async () => {
    const other = appGender === 'male' ? 'female/' : 'male/';
    const found = new Set();
    const add = p => { if (p && typeof p === 'string' && !p.startsWith('data:') && !p.startsWith(other) && !/u-companion|legacy|category-objects/.test(p)) found.add(p); };
    // 1. things we know from the data
    (appGarments || []).forEach(g => add(g.image));
    (typeof communityFeed !== 'undefined' ? communityFeed : []).forEach(p => { add(p.hero); (p.images || []).forEach(add); });
    (typeof shopRecs !== 'undefined' ? shopRecs : []).forEach(r => { add(r.img); add(r.onBody); });
    if (typeof ipFigures !== 'undefined') Object.values(ipFigures).forEach(v => add(v[1]));
    if (typeof beforeShots !== 'undefined') Object.values(beforeShots).forEach(add);
    if (typeof fitLooks !== 'undefined') Object.values(fitLooks).forEach(v => add(`${appGender}/fit-${v[0]}.webp`));
    // 2. every image path written in the code (journal cover, try-ons, category art…)
    const srcs = [...document.querySelectorAll('script[src]')].map(s => s.src);
    for (const s of srcs) {
      try {
        const txt = await fetch(s, { cache: 'force-cache' }).then(r => r.text());
        (txt.match(/(?:\.\.\/images|opt|ip|journal|category(?:-male)?|male|female)\/[A-Za-z0-9_./-]+\.(?:webp|png|jpe?g)/g) || []).forEach(add);
      } catch {}
    }
    const already = new Set([...document.images].map(i => i.src));
    const queue = [...found].map(p => new URL(p, document.baseURI).href).filter(u => !already.has(u));
    let i = 0;
    const next = () => {
      if (i >= queue.length) return;
      if (document.hidden) { document.addEventListener('visibilitychange', next, { once: true }); return; }
      const img = new Image(); img.decoding = 'async';
      img.onload = img.onerror = next;
      img.src = queue[i++];
    };
    for (let k = 0; k < 4; k++) next();
  };
  const idle = window.requestIdleCallback || (fn => setTimeout(fn, 600));
  if (document.readyState === 'complete') idle(start); else window.addEventListener('load', () => idle(start), { once: true });
})();

;
appRender();
