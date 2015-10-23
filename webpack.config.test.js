var path = require('path');
var webpack = require('webpack');


module.exports = {
  devtool: 'inline-source-map',

  externals: {
    firebase: 'MockFirebase'
  },

  module: {
    loaders: [
      { exclude: /node_modules/, loader: 'babel', test: /\.js$/ }
    ]
  },

  resolve: {
    root: path.resolve('./src')
  }
};
