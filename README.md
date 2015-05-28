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

# Contributing

Check out the [Contributing Guidelines](CONTRIBUTING.md)

## Authors

[Tom Hanoldt](https://github.com/monotom)
