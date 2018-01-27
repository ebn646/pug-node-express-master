// Modules
// =============================================================================
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
const path = require('path')
const DashboardPlugin = require('webpack-dashboard/plugin')
// Exports
// =============================================================================
module.exports = {
  entry: './public/assets/js/main.js',
  target: 'web',
  devtool: 'source-map',
  output: {
    path: __dirname + '/public/',
    filename: 'assets/js/bundle.js',
    publicPath: './public/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.css$|.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.woff2?$/,
        use: {
          loader: 'file-loader',
          options: {
            prefix: 'font/'
          }
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: 'file-loader'
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new WebpackNotifierPlugin({ title: 'Webpack' }),
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   // favicon: 'favicon.ico',
    //   template: './app/views/pages/index/index.pug'
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'page.html',
    //   template: './app/views/pages/page/index.pug'
    // }),
    // new DashboardPlugin({ port: 3000 }),
    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest',
      inlineManifest: false
    }),
    new ExtractTextPlugin({ filename: 'css/styles.css', allChunks: true })
  ]
}
