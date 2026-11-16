// WEARU v041 — each gap's "回到那一天" no longer depends on what's stored in the journal
// (stored entries keep their old dates when the calendar moves on, so the lookup failed and the before/after disappeared).
// Each gap now carries its own demo day + scene.
const gapScenes = appGender === 'male'
  ? { '黑色机能斜挎包': '日常', '复古厚底板鞋': '通勤', '黑色重磅基础 Tee': '通勤', '水洗丹宁外套': '日常' }
  : { '黑色玛丽珍鞋': '聚会', '深棕色针织背心': '通勤' };
momentFor = function (recName) {
  const m = gapMoments[recName]; if (!m) return null;
  return { ...m, pieces: [], sceneName: gapScenes[recName] || '日常', md: fmtDate(dateStr(m.off)).md };
};
appRender();
