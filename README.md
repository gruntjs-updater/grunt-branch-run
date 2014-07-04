# grunt-branch-run

> Run specific tasks only on a specific branch

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-branch-run --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-branch-run');
```

## The "branch_run" task

### Overview
In your project's Gruntfile, add a section named `branch_run` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  branch_run: {
    options:{
      master: ['foo', 'bar'],
      develop: ['bar']
    }
  },
});
```

### Options

#### options.branch_name
Type: `Array`

Array with task names which should be run if that task is checked out.

#### options.branch_env_var
Type: `String`

Name of the ENV variable with the branch name. 
If you are using travis-ci or gitlab-ci it will automatically check `TRAVIS_BRANCH` or `CI_BUILD_REF_NAME` for the branch name.
If you are using any other build system you have to specify the ENV variable name via the `branch_env_var` option.



### Usage Examples

Run task `test`, `build` and `deploy` only if you are in the master branch
Run task `test` and `build` for the develop branch
Run task `test` for all the other branches.

```js
grunt.initConfig({
  branch_run: {
    options:{
      master: ['test', 'build', 'deploy],
      develop: ['test', 'build'],
      '*': ['test']
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
