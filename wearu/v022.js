// WEARU v022 — interface colour fixed to 云白 (cloud); the review-only theme picker is removed.
applyTheme('cloud');
document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#FAFAF8');
const _openProfile22 = openProfileSheet;
openProfileSheet = function () { _openProfile22(); document.querySelector('.profile-sheet .theme-row')?.remove(); };
appRender();
