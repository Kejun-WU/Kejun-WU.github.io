<script>
// ===== Language Toggle for Jekyll pages =====
(function () {
  const LS_KEY = 'site_lang';
  const DEFAULT_LANG = 'en'; // 设定站点默认语言：'zh' 或 'en'

  function getCurrentLang() {
    try {
      const ls = localStorage.getItem(LS_KEY);
      if (ls === 'zh' || ls === 'en') return ls;
    } catch (e) {}
    // 支持从 URL ?lang=xx 临时切换
    const usp = new URLSearchParams(window.location.search);
    const ql = usp.get('lang');
    if (ql === 'zh' || ql === 'en') return ql;
    // 浏览器语言兜底
    const n = (navigator.language || '').toLowerCase();
    if (n.startsWith('zh')) return 'zh';
    return DEFAULT_LANG;
  }

  function setCurrentLang(lang) {
    try { localStorage.setItem(LS_KEY, lang); } catch (e) {}
    applyLang(lang);
  }

  function applyLang(lang) {
    // 内容区：显示匹配 data-lang 的块
    const blocks = document.querySelectorAll('[data-lang]');
    blocks.forEach(el => {
      const visible = el.getAttribute('data-lang') === lang;
      el.style.display = visible ? '' : 'none';
    });

    // 导航/菜单：可选对 <li>/<a> 使用 data-lang
    const navItems = document.querySelectorAll('.masthead [data-lang]');
    navItems.forEach(el => {
      const visible = el.getAttribute('data-lang') === lang;
      el.style.display = visible ? '' : 'none';
    });

    // 顶栏按钮选中态
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const target = btn.getAttribute('data-set-lang');
      if (target === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // <html lang="..."> 有利于可访问性与 SEO
    try { document.documentElement.setAttribute('lang', lang); } catch (e) {}
  }

  // 初次应用
  const initialLang = getCurrentLang();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyLang(initialLang));
  } else {
    applyLang(initialLang);
  }

  // 绑定按钮
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    const lang = btn.getAttribute('data-set-lang');
    if (lang === 'zh' || lang === 'en') {
      setCurrentLang(lang);
      // 如需滚动到锚点可开启（示例锚点 #about-me）
      // const el = document.querySelector('#about-me');
      // if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();
</script>
