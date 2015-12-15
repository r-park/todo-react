var path = require('path');
var webpack = require('webpack');


module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    alias: {
      test: path.resolve('./test')
    },
    root: path.resolve('./src')
  },

  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'}
    ]
  }
};
