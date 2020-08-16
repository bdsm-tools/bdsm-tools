const webpack = require('webpack');
const { merge } = require("webpack-merge");
const CompressionPlugin = require('compression-webpack-plugin');

const common = require("./webpack-common.config");

module.exports = merge(common, {
  mode: 'production',

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
      env: {
        SCENE_NEGOTIATION_API_ROOT: 'https://europe-west2-bdsm-tools.cloudfunctions.net/scene-negotiation',
      },
    }),
  ]
});
