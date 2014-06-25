/*
 * grunt-branch-run
 * https://github.com/PhilWaldmann/grunt-branch-run
 *
 * Copyright (c) 2014 Philipp Waldmann
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Configuration to be run (and then tested).
    branch_run: {
      master:{
        options:{
          master: ['foo', 'bar'],
          develop: ['bar']
        }
      },
      bar:{
        options:{
          master: ['foo222', 'bar'],
          develop: ['bar22']
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['branch_run']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};
