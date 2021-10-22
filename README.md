# inject-chunk-webpack-plugin

A simple webpack plugin that inject chunks into any file

## Install

```
npm install inject-chunk-webpack-plugin --save-dev
```

## Usage

### 1. Add this plugin in webpack.config.js and configure it

```js
const InjectChunkWebpackPlugin = require('inject-chunk-webpack-plugin')
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
    new InjectChunkWebpackPlugin([
      {
        chunkName: 'app',
        filePath: './index.html',
        startTag: '<!-- code start --><script>',
        endTag: '</script><!-- code end -->'
      }
    ])
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

    <!-- code start -->
    <script></script>
    <!-- code end -->
  </head>

  <body></body>
</html>
```

## LICENSE

[MIT LICENSE](./LICENSE)
