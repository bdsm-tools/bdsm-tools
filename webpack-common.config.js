const webpack = require('webpack');
const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AntdMomentWebpackPlugin = require('@ant-design/moment-webpack-plugin');

require('dotenv').config();

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      url: false,
      http: false,
      https: false,
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      vm: require.resolve('vm-browserify'),
      'process/browser': require.resolve('process/browser'),
    },
  },

  entry: './src/index.jsx',
  output: {
    filename: 'bundle/[name].[contenthash].bundle.js',
    chunkFilename: 'bundle/[name].[contenthash].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },

  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 5000,
      cacheGroups: {
        // Group 1: The Core Framework (Highest Stability)
        framework: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)[\\/]/,
          name: 'vendor/framework',
          priority: 40,
          enforce: true,
        },
        // Group 2: Your existing "Per-Package" logic
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `vendor/${packageName.replace('@', '')}`;
          },
          priority: 10,
        },
        // Group 3: Your JSON logic
        json: {
          test: /\.json$/,
          name(module) {
            const fileName = module.resource.match(
              /[\\/](.*?)([^\\/]+)\.json$/,
            );
            return fileName ? `json/${fileName[2]}` : 'json/unknown';
          },
          priority: 20,
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.enc$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
            },
          },
          {
            loader: 'decryption-loader',
            options: {
              password: process.env.OBJ_DECRYPTION_PASSWORD,
            },
          },
        ],
      },
      {
        test: /\.(tif|png|glb|fbx)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              implementation: 'less',
              lessOptions: {
                modifyVars: {
                  'link-color': '#c41212',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'BDSM Tools',
      favicon: 'favicon.ico',
      base: '/',
    }),
    new CleanWebpackPlugin(),
    new webpack.ids.HashedModuleIdsPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new AntdMomentWebpackPlugin(),
  ],
};
