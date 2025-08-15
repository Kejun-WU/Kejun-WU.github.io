<script>
(function () {
  const LS_KEY = 'site_lang';
  const DEFAULT_LANG = 'en';

  function getCurrentLang() {
    try {
      const ls = localStorage.getItem(LS_KEY);
      if (ls === 'zh' || ls === 'en') return ls;
    } catch (e) {}
    const usp = new URLSearchParams(window.location.search);
    const ql = usp.get('lang');
    if (ql === 'zh' || ql === 'en') return ql;
    const n = (navigator.language || '').toLowerCase();
    if (n.startsWith('zh')) return 'zh';
    return DEFAULT_LANG;
  }

  function setCurrentLang(lang) {
    try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
    applyLang(lang);
  }

  function applyLang(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
      el.style.display = (el.getAttribute('data-lang') === lang) ? '' : 'none';
    });

    // 顶栏链接选中态
    document.querySelectorAll('.lang-link').forEach(a => {
      const target = a.getAttribute('data-set-lang');
      if (target === lang) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'true');
      } else {
        a.classList.remove('active');
        a.removeAttribute('aria-current');
      }
    });

    try { document.documentElement.setAttribute('lang', lang); } catch (e) {}
  }

  const initialLang = getCurrentLang();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyLang(initialLang));
  } else {
    applyLang(initialLang);
  }

  // 事件代理：点击“中文/English”链接
  document.addEventListener('click', (e) => {
    const a = e.target.closest('.lang-link');
    if (!a) return;
    e.preventDefault(); // 阻止 # 跳转
    const lang = a.getAttribute('data-set-lang');
    if (lang === 'zh' || lang === 'en') setCurrentLang(lang);
  });
})();
</script>
