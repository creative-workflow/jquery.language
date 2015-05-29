describe 'jquery.language', ->
  beforeEach ->
    $ = jQuery
    $.language
      active: 'auto'
      fallback: 'de'
      urlParam: 'lang'
      cookieName: 'lang'
      available: [
        'en'
        'de'
      ]

  describe 'language detection', ->
    it 'recognizes url param "en"', ->
      spyOn(jQuery, "url").and.returnValue 'en'
      $.language.autodetectLanguageAndSet()
      expect($.language()).toEqual 'en'

    it 'recognizes url param "de"', ->
      spyOn($, "url").and.returnValue 'de'
      $.language.autodetectLanguageAndSet()
      expect($.language()).toEqual 'de'

    it 'recognizes cookie value "en"', ->
      $.cookie('lang', 'en')
      $.language.autodetectLanguageAndSet()
      expect($.language()).toEqual 'en'

    it 'recognizes cookie value "de"', ->
      $.cookie('lang', 'de')
      $.language.autodetectLanguageAndSet()
      expect($.language()).toEqual 'de'

    it 'ignores invalid language', ->
      $.language('de')
      expect($.language()).toEqual 'de'

      $.language('en')
      expect($.language()).toEqual 'en'

      $.language('es')
      expect($.language()).toEqual 'en'

  describe '#config', ->
    it '.fallback returns "de"', ->
      expect($.language.config().fallback).toEqual 'de'

    it '.active returns "auto"', ->
      expect($.language.config().active).toEqual 'auto'

    it '.urlParam returns "lang"', ->
      expect($.language.config().urlParam).toEqual 'lang'

    it 'can be reconfigured', ->
      expect($.language.config().fallback).toEqual 'de'

      $.language
        fallback: 'en'

      expect($.language.config().fallback).toEqual 'en'

  describe 'events are triggerd', ->
    it 'on valid language change', ->
      $.language('en')
      spyEvent = spyOnEvent('body', 'language.change')
      $.language('de')

      expect(spyEvent).toHaveBeenTriggered()

    it 'on invalid language change', ->
      spyEvent = spyOnEvent('body', 'language.invalid')
      $.language('es')

      expect(spyEvent).toHaveBeenTriggered()
