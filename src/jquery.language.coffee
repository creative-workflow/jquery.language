root = exports ? this

class root.JQueryLanguage
  @options =
    active: 'auto'
    fallback: 'en'
    available: [ 'en' ]
    urlParam: 'language'
    cookieName: 'language'

  constructor: (options) ->
    @_activeLanguage = null
    @_initialized    = false
    @config jQuery.extend(options, @options)

  config: (options) =>
    return @options if !options && @_initialized

    @options = jQuery.extend(@options, options)
    @_autodetectLanguageAndSet()
    @_initialized = true
    this

  language: =>
    @_activeLanguage

  _autodetectLanguageAndSet: =>
    if @options.active == 'auto'
      possibleLanguage = @autodetectLanguage()
    else
      possibleLanguage = @options.active

    @setLanguage possibleLanguage
    this

  autodetectLanguage: =>
    jQuery.url("?#{@options.urlParam}") ||
    jQuery.cookie(@options.cookieName) ||
    navigator.language || navigator.userLanguage ||
    @options.fallback

  setLanguage: (possibleLanguage) =>
    possibleLanguage = @normalize possibleLanguage

    return if @_activeLanguage == possibleLanguage

    if !@isValid(possibleLanguage)
      jQuery('body').trigger 'language.invalid', [ {
        invalid: possibleLanguage
        active: @_activeLanguage
      } ]

      return if @_initialized
      possibleLanguage = @options.fallback

    oldLanguage    = @_activeLanguage
    @_activeLanguage = possibleLanguage

    jQuery.cookie(@options.cookieName, @_activeLanguage)
    jQuery('body').trigger 'language.change', [{
      active: @_activeLanguage
      old: oldLanguage
    }]

  isValid: (language) =>
    @options.available.indexOf(language) != -1

  fallback: =>
    @options.fallback

  normalize: (language) ->
    return null if !language or typeof language != 'string'
    language.trim().substr(0, 2).toLowerCase()


if typeof jQuery != 'undefined'
  instance = new JQueryLanguage()
  $        = jQuery

  $.extend language: ->
    return instance.language() unless arguments.length

    if typeof arguments[0] == 'string'
      instance.config 'active': arguments[0]
    else
      instance.config arguments[0]

  #for calling instance methods directly
  $.extend $.language, instance

  #for test stubbing we need the real instance, the real this
  $.language.instance = instance
