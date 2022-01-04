/**
 * inject chunk content to a file
 * @see {@link https://webpack.js.org/contribute/writing-a-plugin/}
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const PluginName = 'InjectChunkWebpackPlugin'

function handleRegxpTplStr(str = '') {
  return str.replace(/\*/g, '\\*').replace(/\//g, '\\/')
}

function replaceContentByCode(sourceHtml, config, injectString) {
  let reg = null
  if (!config.startTag || !config.startTag) {
    reg = /[\S\s]*/
  } else {
    reg = new RegExp(handleRegxpTplStr(config.startTag) + '[\\S\\s]*?' + handleRegxpTplStr(config.endTag))
    injectString = config.startTag + injectString + config.endTag
  }
  return sourceHtml.replace(reg, injectString)
}

function findChunk(compilation = [], chunkNames = []) {
  const result = []
  compilation.chunks.forEach(chunk => {
    if (chunkNames.indexOf(chunk.name) >= 0) {
      chunk.files.forEach(chunkFileName => {
        result.push(compilation.assets[chunkFileName].source())
      })
    }
  })
  return result.join('')
}

class InjectChunkWebpackPlugin {
  constructor(config) {
    this.config = config || {}
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(PluginName, compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(PluginName, (data, cb) => {
        if (data.plugin.options.filename === this.config.filename) {
          const injectContent = Object.keys(this.config)
            .map(key => {
              const val = this.config[key] || ''
              if (key === 'content') {
                return val
              } else if (key === 'chunks') {
                return findChunk(compilation, val)
              }
              return ''
            })
            .filter(el => !!el)
            .join('')
          data.html = replaceContentByCode(data.html, this.config, injectContent)
        }
        cb(null, data)
      })
    })
  }
}

module.exports = InjectChunkWebpackPlugin
