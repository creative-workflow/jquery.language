# jquery.language [![Build Status](https://travis-ci.org/creative-workflow/jquery.language.svg?branch=master)](https://travis-ci.org/creative-workflow/jquery.language) [![Code Climate](https://codeclimate.com/github/creative-workflow/jquery.language/badges/gpa.svg)](https://codeclimate.com/github/creative-workflow/jquery.language)

This plugin helps managing browser languages. It looks for a url param or the navigator language and stores the language in a cookie.

## Usage
### javascript
    $.language({
      active: 'auto',
      fallback: 'de',
      available: ['en', 'de']
    });

    console.log($.language()); //prints de or en

    $.language('de') //sets the language

### coffee script
    $.language
      active: 'auto'
      fallback: 'de'
      available: [
        'en'
        'de'
      ]

    console.log $.language() #prints de or en

    $.language 'de' #sets the language

### Dependencies
  * [jquery](https://jquery.com)
  * [jquery-cookie](https://github.com/carhartl/jquery-cookie)
  * [js-url](https://github.com/websanova/js-url)

### Respurces
  * https://github.com/creative-workflow/jquery.language
  * https://travis-ci.org/creative-workflow/jquery.language
  * https://codeclimate.com/github/creative-workflow/jquery.language
  * https://www.npmjs.com/package/jquery.language
  * http://bower.io/search/?q=jquery.language

## Parameter
### active
    auto - default, means try to detect from url param, cookie, navigator or use fallback
    or a available language

### fallback
    language that is used if no language could be detected

### available
    array of allowed languages, default is ['en']

### urlParam
    name of the url param to watch for, default is 'language'

### cookieName
    name of the cookie for language storing, default is 'language'

## Functions
### $.language(configuration|language|null)
Initialize the plugin.
  * with an configuration object.
  * or with a language string
  * If no parameter is given it returns the actual language.

### $.language.config(configuration|null)
Updates the configuration.
* calls `$.language.autodetectLanguageAndSet()`
* if no parameter is given returns the actual configuration

### $.language.setLanguage(possibleLanguage)
Normalizes, validates and stores the `possibleLanguage` if it is different from the actual language.
* Returns the actual language.
* triggers event `language.invalid` with parameter `{invalid: possibleLanguage, active: activeLanguage}` if the possibleLang is invalid
* triggers event `language.changed' with parameter `{active: activeLanguage, old: oldLanguage}` if language was successfully changed

### $.language.autodetectLanguage()
Returns the auto detected language by looking first
* at the url param with the name given by config.urlParam
* then look for a cookie with the name config.cookieName
* then try to get the first language from navigator.language and navigator.userLanguage
* or finally returns config.fallback

### $.language.autodetectLanguageAndSet()
  * calls `$.language.autodetectLanguage()`.
  * calls `$.language.setLanguage` with the detected language.


### $.language.isValid(language)
  * checks if a language is defined in `config.available`

### $.language.normalize(language)
Normalizes a language string.
  * trim string
  * only use the first to chars
  * return the lower case equivalent

# Contributing

Check out the [Contributing Guidelines](CONTRIBUTING.md)

## Authors

[Tom Hanoldt](https://github.com/monotom)
