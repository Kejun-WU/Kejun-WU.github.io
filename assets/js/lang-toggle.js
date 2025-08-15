// assets/js/lang-toggle.js
(function () {
  var html = document.documentElement;
  var key = 'site_lang';
  var saved = localStorage.getItem(key);

  function apply(lang) {
    html.classList.remove('lang-zh', 'lang-en');
    html.classList.add(lang === 'zh' ? 'lang-zh' : 'lang-en');
    localStorage.setItem(key, lang);
  }

  // 初始：若本地未保存，则按浏览器语言猜测一次
  if (!saved) {
    var guess = (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
    apply(guess);
  } else {
    apply(saved);
  }

  // 绑定导航里的“中文 / English”
  function byId(id){ return document.getElementById(id); }
  var zh = byId('lang-zh-link');
  var en = byId('lang-en-link');
  if (zh) zh.addEventListener('click', function(){ apply('zh'); });
  if (en) en.addEventListener('click', function(){ apply('en'); });
})();
