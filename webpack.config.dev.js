// Modules
// =============================================================================
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// Exports
// =============================================================================
module.exports = {
  entry: {
    library: __dirname + '/app/assets/js/main.js'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/static/',
    filename: 'assets/js/main.js',
    publicPath: './'
  },
  module: {
    loaders: [
      {
        test: /\.css$/
        // loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      { test: /\.png$/, loader: 'file-loader' },
      { test: /\.pug$/, loader: 'pug-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      // favicon: 'favicon.ico',
      template: './app/views/template.pug'
    })
  ]
}
