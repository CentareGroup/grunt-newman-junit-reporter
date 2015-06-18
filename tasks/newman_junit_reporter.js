/*
 * grunt-newman-junit-reporter
 * https://github.com/CentareGroup/grunt-newman-junit-reporter
 *
 * Copyright (c) 2015 Michael Weinand
 * Licensed under the MIT license.
 */

'use strict';

var junitBuilder = require('junit-report-builder');
var _ = require('underscore');

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
        
        // convert to junit
        newmanResults.collection.folders.forEach(function(folder) {
          var suite = junitBuilder.testSuite().name(folder.name);
         
        
          folder.order.forEach(function(testId) {
            
            var result = _.find(newmanResults.results, function(r) { return r.id === testId; });
            
            if(!result)
            {
              return;
            }
            
            grunt.log.debug(result.name);
            
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
              
              /// testCase.time(result.meanResponseTime);
              
              if (!testPassed)
              {
                var failMessage = result.url + ' returned ' + result.responseCode.code; 
                testCase.failure(failMessage);
              }
            }            
          });
        });
                
      });

      // Write the destination file.
      junitBuilder.writeTo(f.dest);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
      
      grunt.log.writeln('Tests Passed: ' + passCount + ' Failed: ' + failCount);
    });    
  });

};
