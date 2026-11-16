// WEARU v042 — logo redrawn from the brand poster (04_assets/raw/brand_v002/crop_logo.png):
// wide cream card, front cream card, terracotta card, black leaf with a white running stitch.
wearuMark = function (cls = 'wearu-mark') {
  return `<svg class="${cls}" viewBox="30 50 860 880" aria-hidden="true">
    <path d="M168 600 L652 548 Q668 546 668 562 L668 766 Q668 782 652 785 L132 905 Q114 909 116 891 L150 618 Q152 602 168 600 Z" fill="#C8733F"/>
    <path d="M116 428 L860 272 Q878 268 878 286 L870 588 Q870 602 856 604 L58 716 Q40 718 42 700 L96 446 Q100 431 116 428 Z" fill="#EADFCB"/>
    <path d="M292 466 L852 300 Q870 295 870 313 L868 594 Q868 608 854 612 L296 770 Q276 775 276 755 L276 488 Q276 471 292 466 Z" fill="#F2E7D5"/>
    <path d="M300 232 L748 72 Q776 63 774 92 L752 388 C744 468 694 518 612 544 L276 646 L276 262 Q276 240 300 232 Z" fill="#33302D"/>
    <path d="M722 128 L707 376 C700 440 662 476 602 498 L300 596" fill="none" stroke="#F6F1E8" stroke-width="22" stroke-linecap="round" stroke-dasharray="44 34"/>
  </svg>`;
};
// favicon follows the new mark
(() => {
  const svg = wearuMark('').replace('<svg class=""', '<svg xmlns="http://www.w3.org/2000/svg"');
  const l = document.querySelector('link[rel="icon"]');
  if (l) l.href = 'data:image/svg+xml,' + encodeURIComponent(svg);
})();
appRender();
