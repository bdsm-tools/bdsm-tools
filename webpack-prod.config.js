const webpack = require('webpack');
const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const WebpackCdnPlugin = require('webpack-cdn-plugin');

const { version } = require('./package.json');
const common = require('./webpack-common.config');
const cdnModules = require('./webpack-cdn-config');

const mode = 'production';
module.exports = merge(common, {
  mode,

  optimization: {
    minimize: true,
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        VERSION: JSON.stringify(version),
        SCENE_NEGOTIATION_API_ROOT: JSON.stringify(
          'https://scene-negotiation.api.bdsmtools.org',
        ),
        FEATURE_FLAG_API_ROOT: JSON.stringify(
          'https://feature-flag.api.bdsmtools.org',
        ),
        SLAVE_TRAINING_API_ROOT: JSON.stringify(
          'https://slave-training.api.bdsmtools.org',
        ),
      },
    }),
    new WebpackCdnPlugin({
      modules: cdnModules(mode),
    }),
  ],
});
