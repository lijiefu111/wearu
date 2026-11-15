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
appRender();
