(function() {
  var $, instance, root,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.JQueryLanguage = (function() {
    JQueryLanguage.options = {
      active: 'auto',
      fallback: 'en',
      available: ['en'],
      urlParam: 'language',
      cookieName: 'language'
    };

    function JQueryLanguage(options1) {
      this.options = options1;
      this.fallback = bind(this.fallback, this);
      this.isValid = bind(this.isValid, this);
      this.setLanguage = bind(this.setLanguage, this);
      this.autodetectLanguage = bind(this.autodetectLanguage, this);
      this._autodetectLanguageAndSet = bind(this._autodetectLanguageAndSet, this);
      this.language = bind(this.language, this);
      this.config = bind(this.config, this);
      this._activeLanguage = null;
      this._initialized = false;
      this.config(jQuery.extend(this.options, this.constructor.options));
    }

    JQueryLanguage.prototype.config = function(options) {
      if (!options && this._initialized) {
        return this.options;
      }
      this.options = jQuery.extend(this.options, options);
      this._autodetectLanguageAndSet();
      this._initialized = true;
      return this;
    };

    JQueryLanguage.prototype.language = function() {
      return this._activeLanguage;
    };

    JQueryLanguage.prototype._autodetectLanguageAndSet = function() {
      var possibleLanguage;
      if (this.options.active === 'auto') {
        possibleLanguage = this.autodetectLanguage();
      } else {
        possibleLanguage = this.options.active;
      }
      this.setLanguage(possibleLanguage);
      return this;
    };

    JQueryLanguage.prototype.autodetectLanguage = function() {
      return jQuery.url("?" + this.options.urlParam) || jQuery.cookie(this.options.cookieName) || navigator.language || navigator.userLanguage || this.options.fallback;
    };

    JQueryLanguage.prototype.setLanguage = function(possibleLanguage) {
      var oldLanguage;
      possibleLanguage = this.normalize(possibleLanguage);
      if (this._activeLanguage === possibleLanguage) {
        return;
      }
      if (!this.isValid(possibleLanguage)) {
        jQuery('body').trigger('language.invalid', [
          {
            invalid: possibleLanguage,
            active: this._activeLanguage
          }
        ]);
        if (this._initialized) {
          return;
        }
        possibleLanguage = this.options.fallback;
      }
      oldLanguage = this._activeLanguage;
      this._activeLanguage = possibleLanguage;
      jQuery.cookie(this.options.cookieName, this._activeLanguage);
      return jQuery('body').trigger('language.change', [
        {
          active: this._activeLanguage,
          old: oldLanguage
        }
      ]);
    };

    JQueryLanguage.prototype.isValid = function(language) {
      return this.options.available.indexOf(language) !== -1;
    };

    JQueryLanguage.prototype.fallback = function() {
      return this.options.fallback;
    };

    JQueryLanguage.prototype.normalize = function(language) {
      if (!language || typeof language !== 'string') {
        return null;
      }
      return language.trim().substr(0, 2).toLowerCase();
    };

    return JQueryLanguage;

  })();

  if (typeof jQuery !== 'undefined') {
    instance = new JQueryLanguage();
    $ = jQuery;
    $.extend({
      language: function() {
        if (!arguments.length) {
          return instance.language();
        }
        if (typeof arguments[0] === 'string') {
          return instance.config({
            'active': arguments[0]
          });
        } else {
          return instance.config(arguments[0]);
        }
      }
    });
    $.extend($.language, instance);
    $.language.instance = instance;
  }

}).call(this);
