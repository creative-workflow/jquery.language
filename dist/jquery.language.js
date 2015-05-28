(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.language = (function() {
    var activeLanguage, initialized, l;
    l = function(options) {
      if (arguments.length === 0) {
        l.config();
        return activeLanguage;
      }
      if (typeof arguments[0] === 'string') {
        l.config({
          'active': arguments[0]
        });
      } else {
        l.config(arguments[0]);
      }
      return this;
    };
    activeLanguage = null;
    initialized = false;
    l.options = {
      active: 'auto',
      fallback: 'en',
      available: ['en'],
      urlParam: 'language',
      cookieName: 'language'
    };
    l.config = function(options) {
      if (!options && initialized) {
        return l.options;
      }
      l.options = $.extend(l.options, options);
      l.autodetectLanguageAndSet();
      initialized = true;
      return this;
    };
    l.autodetectLanguageAndSet = function() {
      var possibleLanguage;
      if (l.options.active === 'auto') {
        possibleLanguage = l.autodetectLanguage();
      } else {
        possibleLanguage = l.options.active;
      }
      l.setLanguage(possibleLanguage);
      return this;
    };
    l.fallback = function() {
      return l.options.fallback;
    };
    l.autodetectLanguage = function() {
      return $.url("?" + l.options.urlParam) || $.cookie(l.options.cookieName) || navigator.language || navigator.userLanguage || l.options.fallback;
    };
    l.setLanguage = function(possibleLanguage) {
      var oldLanguage;
      possibleLanguage = l.normalize(possibleLanguage);
      if (activeLanguage === possibleLanguage) {
        return activeLanguage;
      }
      if (!l.isValid(possibleLanguage)) {
        $('body').trigger('language.invalid', [
          {
            invalid: possibleLanguage,
            active: activeLanguage
          }
        ]);
        if (initialized) {
          return activeLanguage;
        }
        possibleLanguage = l.options.fallback;
      }
      oldLanguage = activeLanguage;
      activeLanguage = possibleLanguage;
      $.cookie(l.options.cookieName, activeLanguage);
      $('body').trigger('language.change', [
        {
          active: activeLanguage,
          old: oldLanguage
        }
      ]);
      return activeLanguage;
    };
    l.isValid = function(language) {
      return l.options.available.indexOf(language) !== -1;
    };
    l.normalize = function(language) {
      if (!language || typeof language !== 'string') {
        return null;
      }
      return language.trim().substr(0, 2).toLowerCase();
    };
    return l;
  })();

  if (typeof jQuery !== 'undefined') {
    jQuery.extend({
      language: root.language
    });
  }

}).call(this);
