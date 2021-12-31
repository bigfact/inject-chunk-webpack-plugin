const InjectChunkWebpackPlugin = require('../index')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: path.resolve(__dirname, './src/index.html'),
      chunks: []
    }),
    new InjectChunkWebpackPlugin({
      filename: './index.html', // === HtmlWebpackPlugin filename
      chunks: ['app'],
      startTag: '<script id="script-app">',
      endTag: '</script>'
    })
  ]
}
