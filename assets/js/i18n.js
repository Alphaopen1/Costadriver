/**
 * i18n.js - Translation engine for static HTML website
 * Loads translations from JSON files and swaps page text based on user preference.
 */
(function () {
  'use strict';

  var DEFAULT_LANG = 'en';
  var SUPPORTED_LANGS = ['en', 'fr', 'ru', 'es'];
  var STORAGE_KEY = 'preferred_language';

  // Cache for loaded translations
  var translations = {};

  /**
   * Determine the base path to assets/lang/ depending on page depth.
   * Works for root pages, /destinations/, /services/, etc.
   */
  function getBasePath() {
    var scripts = document.querySelectorAll('script[src*="i18n.js"]');
    if (scripts.length > 0) {
      var src = scripts[0].getAttribute('src');
      // src might be "assets/js/i18n.js" or "../assets/js/i18n.js" etc.
      var base = src.replace(/js\/i18n\.js$/, '');
      return base + 'lang/';
    }
    // Fallback: guess from current path
    var depth = window.location.pathname.split('/').filter(function (s) { return s.length > 0; }).length;
    var prefix = '';
    for (var i = 0; i < depth; i++) {
      prefix += '../';
    }
    return prefix + 'assets/lang/';
  }

  /**
   * Load a translation JSON file. Returns a Promise.
   */
  function loadTranslation(lang) {
    if (translations[lang]) {
      return Promise.resolve(translations[lang]);
    }

    var url = getBasePath() + lang + '.json';

    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed to load ' + url + ': ' + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        translations[lang] = data;
        return data;
      });
  }

  /**
   * Store original English text on first encounter.
   */
  function storeOriginals() {
    var elements = document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-placeholder]');
    elements.forEach(function (el) {
      if (el.hasAttribute('data-i18n') && !el.hasAttribute('data-i18n-original')) {
        el.setAttribute('data-i18n-original', el.textContent);
      }
      if (el.hasAttribute('data-i18n-html') && !el.hasAttribute('data-i18n-original')) {
        el.setAttribute('data-i18n-original', el.innerHTML);
      }
      if (el.hasAttribute('data-i18n-placeholder') && !el.hasAttribute('data-i18n-original')) {
        el.setAttribute('data-i18n-original', el.getAttribute('placeholder') || '');
      }
    });
  }

  /**
   * Apply translations to the page.
   */
  function applyTranslations(lang) {
    if (lang === DEFAULT_LANG) {
      // Restore originals
      document.querySelectorAll('[data-i18n][data-i18n-original]').forEach(function (el) {
        el.textContent = el.getAttribute('data-i18n-original');
      });
      document.querySelectorAll('[data-i18n-html][data-i18n-original]').forEach(function (el) {
        el.innerHTML = el.getAttribute('data-i18n-original');
      });
      document.querySelectorAll('[data-i18n-placeholder][data-i18n-original]').forEach(function (el) {
        el.setAttribute('placeholder', el.getAttribute('data-i18n-original'));
      });
      updateHtmlLang(lang);
      updateActiveLangLink(lang);
      return;
    }

    loadTranslation(lang).then(function (data) {
      // textContent replacements
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.getAttribute('data-i18n');
        if (data[key] !== undefined) {
          el.textContent = data[key];
        }
      });

      // innerHTML replacements
      document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-html');
        if (data[key] !== undefined) {
          el.innerHTML = data[key];
        }
      });

      // placeholder replacements
      document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-placeholder');
        if (data[key] !== undefined) {
          el.setAttribute('placeholder', data[key]);
        }
      });

      updateHtmlLang(lang);
      updateActiveLangLink(lang);
    }).catch(function (err) {
      console.error('[i18n] Error applying translations:', err);
    });
  }

  /**
   * Update the <html lang> attribute.
   */
  function updateHtmlLang(lang) {
    document.documentElement.setAttribute('lang', lang);
  }

  /**
   * Update active class on language switcher links.
   */
  function updateActiveLangLink(lang) {
    var selectors = '.lang-switcher a, .mobile-lang a';
    var links = document.querySelectorAll(selectors);
    links.forEach(function (link) {
      var linkLang = link.textContent.trim().toLowerCase();
      if (linkLang === lang) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Set language, save preference, and apply.
   */
  function setLanguage(lang) {
    lang = lang.toLowerCase();
    if (SUPPORTED_LANGS.indexOf(lang) === -1) {
      return;
    }
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(lang);
  }

  /**
   * Get saved language or default.
   */
  function getSavedLanguage() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LANGS.indexOf(saved) !== -1) {
      return saved;
    }
    return DEFAULT_LANG;
  }

  /**
   * Bind click events to language switcher links.
   */
  function bindSwitchers() {
    var selectors = '.lang-switcher a, .mobile-lang a';
    var links = document.querySelectorAll(selectors);
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var lang = this.textContent.trim().toLowerCase();
        setLanguage(lang);
      });
    });
  }

  /**
   * Initialize i18n on DOM ready.
   */
  function init() {
    storeOriginals();
    bindSwitchers();

    var savedLang = getSavedLanguage();
    if (savedLang !== DEFAULT_LANG) {
      applyTranslations(savedLang);
    } else {
      updateActiveLangLink(DEFAULT_LANG);
    }
  }

  // Run on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for programmatic use
  window.i18n = {
    setLanguage: setLanguage,
    getSavedLanguage: getSavedLanguage
  };

})();
