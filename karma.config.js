module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: [
      'node_modules/sinon/pkg/sinon.js',
      'test/lib/mockfirebase.js',
      'webpack.test.js'
    ],

    preprocessors: {
      'webpack.test.js': ['webpack', 'sourcemap']
    },

    // webpack config
    webpack: require('./webpack.test'),

    // webpack server config
    webpackServer: {
      noInfo: true
    },

    reporters: ['mocha'],

    // options for karma-mocha-reporter
    mochaReporter: {
      colors: {
        error: 'red',
        info: 'blue',
        success: 'green',
        warning: 'yellow'
      }
    },

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false,

    customLaunchers: {
      TRAVIS_CHROME: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    browsers: process.env.TRAVIS ? ['TRAVIS_CHROME'] : ['Chrome']
  });
};
