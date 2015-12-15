module.exports = (config) => {
  config.set({
    frameworks: ['mocha'],

    files: [
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/mockfirebase/browser/mockfirebase.js',
      'karma.entry.js'
    ],

    preprocessors: {
      'karma.entry.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack.test'),

    webpackServer: {
      noInfo: true
    },

    reporters: ['mocha'],

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
