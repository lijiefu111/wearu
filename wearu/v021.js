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
appRender();
