const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const WebpackCdnPlugin = require('webpack-cdn-plugin');

const common = require('./webpack-common.config');
const cdnModules = require('./webpack-cdn-config');

const mode = 'development';
module.exports = merge(common, {
  mode,

  devServer: {
    compress: true,
    static: {
      directory: path.join(__dirname, 'www'),
      publicPath: '/',
    },
    host: '0.0.0.0',
    port: '3002',
    hot: true,
    historyApiFallback: {
      index: '/',
    },
  },

  devtool: 'inline-cheap-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        VERSION: JSON.stringify('development'),
        SCENE_NEGOTIATION_API_ROOT: JSON.stringify(
          'https://scene-negotiation.api.test.bdsmtools.org',
        ),
        FEATURE_FLAG_API_ROOT: JSON.stringify(
          'https://feature-flag.api.test.bdsmtools.org',
        ),
        SLAVE_TRAINING_API_ROOT: JSON.stringify('http://localhost:3300'),
      },
    }),
    new WebpackCdnPlugin({
      modules: cdnModules(mode),
    }),
  ],
});
