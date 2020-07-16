const webpack = require('webpack');
const { merge } = require("webpack-merge");

const common = require("./webpack-common.config");

module.exports = merge(common, {
  mode: 'development',

  devServer: {
    compress: true,
    contentBase: 'www',
    host: '0.0.0.0',
    port: '3002',
    hot: true,
    historyApiFallback: true,
  },
});
