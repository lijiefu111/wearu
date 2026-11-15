// WEARU v025 — the "if you had it" card stays only in 懂你; 穿搭 shows just the looks again.
const _stylingPage25 = stylingPage;
stylingPage = function () { return _stylingPage25().replace(/<section class="wi-styling">[\s\S]*?<\/section>/, ''); };
appRender();
