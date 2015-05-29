root = exports ? this

root.language = do ->
  $ = jQuery
  activeLanguage = null
  initialized    = false

  l = (options) ->
    if arguments.length == 0
      l.config()
      return activeLanguage

    if typeof arguments[0] == 'string'
      l.config 'active': arguments[0]
    else
      l.config arguments[0]

    this

  l.options =
    active: 'auto'
    fallback: 'en'
    available: [ 'en' ]
    urlParam: 'language'
    cookieName: 'language'

  l.config = (options) ->
    return l.options if !options and initialized

    l.options = $.extend(l.options, options)
    l.autodetectLanguageAndSet()
    initialized = true
    this

  l.autodetectLanguageAndSet = ->
    if l.options.active == 'auto'
      possibleLanguage = l.autodetectLanguage()
    else
      possibleLanguage = l.options.active

    l.setLanguage possibleLanguage
    this

  l.autodetectLanguage = ->
    $.url("?#{l.options.urlParam}") || $.cookie(l.options.cookieName) ||
    navigator.language || navigator.userLanguage || l.options.fallback

  l.setLanguage = (possibleLanguage) ->
    possibleLanguage = l.normalize(possibleLanguage)

    return activeLanguage if activeLanguage == possibleLanguage

    if !l.isValid(possibleLanguage)
      $('body').trigger 'language.invalid', [ {
        invalid: possibleLanguage
        active: activeLanguage
      } ]

      return activeLanguage if initialized
      possibleLanguage = l.options.fallback

    oldLanguage    = activeLanguage
    activeLanguage = possibleLanguage

    $.cookie(l.options.cookieName, activeLanguage)
    $('body').trigger 'language.change', [{
      active: activeLanguage
      old: oldLanguage
    }]
    activeLanguage

  l.isValid = (language) ->
    l.options.available.indexOf(language) != -1

  l.fallback = () ->
    l.options.fallback

  l.normalize = (language) ->
    return null if !language or typeof language != 'string'
    language.trim().substr(0, 2).toLowerCase()

  return l

if typeof jQuery != 'undefined'
  jQuery.extend language: root.language
