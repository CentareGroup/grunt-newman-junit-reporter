/*
 * grunt-newman-junit-reporter
 * https://github.com/CentareGroup/grunt-newman-junit-reporter
 *
 * Copyright (c) 2015 Michael Weinand
 * Licensed under the MIT license.
 */

'use strict';

var junitBuilder = require('junit-report-builder');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('newman_junit_reporter', 'Converts newman json output to junit xml report', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({ });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      junitBuilder.newBuilder();
      
      var passCount = 0;
      var failCount = 0;
      
      // Concat specified files.
      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(function(filepath) {
        // Read file source.
        var newmanResults = grunt.file.readJSON(filepath);
        var suite = junitBuilder.testSuite().name(filepath);
        
        // convert to junit
        newmanResults.results.forEach(function(result) {
          grunt.log.writeln(result.name);
          for(var test in result.tests) {
            // build the test case
            var testCase = suite.testCase().className(result.name).name(test);
            
            // did the test pass?
            var testPassed = result.tests[test];
            
            if (testPassed) {
              passCount++;
            } else {
              failCount++;
            }
            
            if (!testPassed)
            {
              testCase.failure();
            }
          }
        });
                
      });

      // Handle options.
      // junitSuites += options.punctuation;

      // Write the destination file.
      junitBuilder.writeTo(f.dest);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
      
      grunt.log.writeln('Passed: ' + passCount + ' Failed: ' + failCount);
    });    
  });

};
