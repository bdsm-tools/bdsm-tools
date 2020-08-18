const webpack = require('webpack');
const { merge } = require("webpack-merge");
const WebpackCdnPlugin = require('webpack-cdn-plugin');

const common = require("./webpack-common.config");
const cdnModules = require('./webpack-cdn-config');

const mode = 'development';
module.exports = merge(common, {
  mode,

  devServer: {
    compress: true,
    contentBase: 'www',
    host: '0.0.0.0',
    port: '3002',
    hot: true,
    historyApiFallback: true,
  },

  devtool: 'inline-cheap-source-map',

  plugins: [
    new webpack.DefinePlugin({
      SCENE_NEGOTIATION_API_ROOT: JSON.stringify(
        'https://europe-west2-bdsm-tools.cloudfunctions.net/scene-negotiation-test'
      ),
    }),
    new WebpackCdnPlugin({
      modules: cdnModules(mode),
    }),
  ],
});
