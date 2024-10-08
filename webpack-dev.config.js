const webpack = require('webpack');
const { merge } = require("webpack-merge");
const WebpackCdnPlugin = require('webpack-cdn-plugin');

const common = require("./webpack-common.config");
const cdnModules = require('./webpack-cdn-config');

const mode = 'development';
module.exports = merge(common, {
  mode,

  devtool: 'inline-cheap-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        VERSION: JSON.stringify('development'),
        SCENE_NEGOTIATION_API_ROOT: JSON.stringify(
          'https://scene-negotiation.api.test.bdsmtools.org'
        ),
        FEATURE_FLAG_API_ROOT: JSON.stringify(
          'https://feature-flag.api.test.bdsmtools.org'
        ),
        SLAVE_TRAINING_API_ROOT: JSON.stringify(
          'https://slave-training.api.test.bdsmtools.org'
        ),
      },
    }),
    new WebpackCdnPlugin({
      modules: cdnModules(mode),
    }),
  ],
});
