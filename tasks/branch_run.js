/*
 * grunt-branch-run
 * https://github.com/PhilWaldmann/grunt-branch-run
 *
 * Copyright (c) 2014 Philipp Waldmann
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var spawn = grunt.util.spawn;

  grunt.registerMultiTask('branch_run', 'Run specific tasks only on a specific branch', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();
    
    var src = this.filesSrc[0] || '.';

    if (!grunt.file.isDir(src)) {
      grunt.fail.warn('A source directory is needed.');
      return false;
    }
    
    var done = this.async();
    
    //get current branch name
    spawn({
      cmd: 'git',
      args: ['rev-parse', '--abbrev-ref', 'HEAD'],
      opts: {cwd: src}
    }, function(err, result, code){
      if(err){
        var msg = result.stderr;
        if(!msg) msg = result.stdout;
        if(!msg) msg = err;
        grunt.fail.warn('git error: ' + msg + '.');
        return false;
      }
      
      var branch = result.stdout;
      
      //for gitlab-ci
      if(process.env.CI_BUILD_REF_NAME){
        branch = process.env.CI_BUILD_REF_NAME;
      }
          
      //for travis-ci
      if(process.env.TRAVIS_BRANCH){
        branch = process.env.TRAVIS_BRANCH;
      }
      
      if(options.branch_env_var && process.env[options.branch_env_var]){
        branch = process.env[options.branch_env_var];
      }
      
      if(!options[branch]){
        if(options['*']){
          branch = '*';
        }else{
          return done();
        }        
      }
      
      grunt.log.writeln('On branch "' + branch + '". Run ' + options[branch].join(', '));
      
      grunt.task.run(options[branch]);
      
      done();
    });
    
  });
};
