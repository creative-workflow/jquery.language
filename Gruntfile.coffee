'use strict'

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    coffee:
      compile:
        files:
          'dist/jquery.language.js': 'src/jquery.language.coffee'
          'spec/test.spec.js': 'spec/test.spec.coffee'
    coffeelint:
      app:
        [ 'src/*.coffee' ]
    uglify:
      options:
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> | <%= pkg.license %> */\n'
      build:
        files: 'dist/jquery.language-<%= pkg.version %>.min.js': 'dist/jquery.language.js'
    compress:
      main:
        options:
          mode: 'gzip'
        files: [ {
          src: [ 'dist/jquery.language.js' ]
          dest: 'dist/jquery.language.js.gz'
        }]
    jasmine:
      specs:
        src: 'dist/jquery.language.js'
        options:
          specs: 'spec/*spec.js'
          helpers: 'spec/*helper.js'
          vendor: [
            "bower_components/jquery/dist/jquery.min.js"
            "bower_components/jquery.cookie/jquery.cookie.js"
            "bower_components/js-url/url.min.js"
            "bower_components/jasmine-jquery/lib/jasmine-jquery.js"
          ]
    watch:
      options: livereload: true
      files: '{src,spec}/*.coffee'
      tasks: 'default'

  # Loading dependencies
  for key of grunt.file.readJSON('package.json').devDependencies
    if key != 'grunt' and key.indexOf('grunt') == 0
      grunt.loadNpmTasks key

  grunt.registerTask 'default', [
    'coffeelint'
    'coffee'
    'jasmine'
    'uglify'
    'compress'
  ]

  grunt.registerTask 'test', [
    'coffeelint'
    'coffee'
    'jasmine'
  ]

  grunt.registerTask 'ci', [
    'coffeelint'
    'coffee'
    'jasmine'
  ]
