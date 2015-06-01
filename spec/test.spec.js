(function() {
  describe('jquery.language', function() {
    beforeEach(function() {
      var $;
      $ = jQuery;
      return $.language({
        active: 'auto',
        fallback: 'de',
        urlParam: 'lang',
        cookieName: 'lang',
        available: ['en', 'de']
      });
    });
    describe('language detection', function() {
      it('recognizes url param "en"', function() {
        spyOn(jQuery, "url").and.returnValue('en');
        $.language._autodetectLanguageAndSet();
        return expect($.language()).toEqual('en');
      });
      it('recognizes url param "de"', function() {
        spyOn($, "url").and.returnValue('de');
        $.language._autodetectLanguageAndSet();
        return expect($.language()).toEqual('de');
      });
      it('recognizes cookie value "en"', function() {
        Cookies.set('lang', 'en');
        $.language._autodetectLanguageAndSet();
        return expect($.language()).toEqual('en');
      });
      it('recognizes cookie value "de"', function() {
        Cookies.set('lang', 'de');
        $.language._autodetectLanguageAndSet();
        return expect($.language()).toEqual('de');
      });
      return it('ignores invalid language', function() {
        $.language('de');
        expect($.language()).toEqual('de');
        $.language('en');
        expect($.language()).toEqual('en');
        $.language('es');
        return expect($.language()).toEqual('en');
      });
    });
    describe('#config', function() {
      it('.fallback returns "de"', function() {
        return expect($.language.config().fallback).toEqual('de');
      });
      it('.active returns "auto"', function() {
        return expect($.language.config().active).toEqual('auto');
      });
      it('.urlParam returns "lang"', function() {
        return expect($.language.config().urlParam).toEqual('lang');
      });
      return it('can be reconfigured', function() {
        expect($.language.config().fallback).toEqual('de');
        $.language({
          fallback: 'en'
        });
        return expect($.language.config().fallback).toEqual('en');
      });
    });
    return describe('events are triggerd', function() {
      it('on valid language change', function() {
        var spyEvent;
        $.language('en');
        spyEvent = spyOnEvent('body', 'language.change');
        $.language('de');
        return expect(spyEvent).toHaveBeenTriggered();
      });
      return it('on invalid language change', function() {
        var spyEvent;
        spyEvent = spyOnEvent('body', 'language.invalid');
        $.language('es');
        return expect(spyEvent).toHaveBeenTriggered();
      });
    });
  });

}).call(this);
