/*
 * grunt-newman-junit-reporter
 * https://github.com/CentareGroup/grunt-newman-junit-reporter
 *
 * Copyright (c) 2015 Michael Weinand
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', 'results.json']
    },

    // run newman to get a sample results file
    newman: {
        all: {
            options: {
                collection: 'test/fixtures/TestJUnitOutput.json.postman_collection',
                outputFile: 'results.json',
                responseHandler: 'TestResponseHandler'
            }
        }
    },

    // Configuration to be run (and then tested).
    newman_junit_reporter: {
      default_options: {
        options: { },
        files: {
          'tmp/default_options.xml': ['results.json']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-newman');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'newman', 'newman_junit_reporter', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
