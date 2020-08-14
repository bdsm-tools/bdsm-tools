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

  devtool: 'inline-cheap-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        SCENE_NEGOTIATION_API_ROOT: 'https://europe-west2-bdsm-tools.cloudfunctions.net/scene-negotiation-test',
      },
    }),
  ],
});
