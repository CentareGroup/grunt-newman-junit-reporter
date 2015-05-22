# grunt-newman-junit-reporter

> Converts newman json output to junit xml report

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-newman-junit-reporter --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-newman-junit-reporter');
```

## The "newman_junit_reporter" task

### Overview
In your project's Gruntfile, add a section named `newman_junit_reporter` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  newman_junit_reporter: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

Currently no options exist.

### Usage Examples

#### Default Options
In this example, the default options are used to convert all of the postman/newman result json data into a junit xml report file.

```js
grunt.initConfig({
  newman_junit_reporter: {
    options: {},
    files: {
      'dest/junit-report.xml': ['results.json'],
    },
  },
  // run newman to get a sample results file
  newman: {
      all: {
          options: {
              collection: '--- your collection ---',
              outputFile: 'results.json',
              responseHandler: 'TestResponseHandler'
          }
      }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 - Just a simple conversion.  Could use some better grouping and naming.