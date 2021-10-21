const InjectChunkWebpackPlugin = require('../index')
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
    new InjectChunkWebpackPlugin([
      {
        chunkName: 'app',
        filePath: './src/index.html',
        startTag: '<!-- code start --><script>',
        endTag: '</script><!-- code end -->'
      },
      {
        chunkName: 'app',
        filePath: './public/index.js',
        startTag: '/** code start */',
        endTag: '/** code end */'
      }
    ])
  ]
}
