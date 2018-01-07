// Modules
// =============================================================================
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// Exports
// =============================================================================
module.exports = {
  entry: {
    library: __dirname + '/public/assets/js/main.js'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/static/',
    filename: 'assets/js/main.js',
    publicPath: './public/assets'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'postcss-loader']
      },
      { test: /\.png$/, loader: 'file-loader' },
      { test: /\.pug$/, loader: 'pug-loader' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // favicon: 'favicon.ico',
      template: './app/views/pages/default/index.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'page.html',
      template: './app/views/pages/page/index.pug'
    })
  ]
}
