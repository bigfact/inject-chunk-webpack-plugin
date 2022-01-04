# inject-chunk-webpack-plugin

A simple Webpack plugin that inject chunks/content into html file

## Install

```
npm install inject-chunk-webpack-plugin --save-dev
```

## Usage

### 1. Add this plugin in webpack.config.js and configure it

```js
const InjectChunkWebpackPlugin = require('inject-chunk-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    app: './app.js'
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
      content: 'var a = 1;',
      chunks: ['app'],
      startTag: '<script id="script-app">',
      endTag: '</script>'
    })
  ]
}
```

### 2. Add custom tags to the file defined in the plugin configuration

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>inject-chunk-webpack-plugin-demo</title>

    <script id="script-app"></script>
  </head>

  <body></body>
</html>
```

## LICENSE

[MIT LICENSE](./LICENSE)
