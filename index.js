/**
 * inject chunk content to a file
 * @see {@link https://webpack.js.org/contribute/writing-a-plugin/}
 */

const pluginName = 'InjectChunkWebpackPlugin'
const fs = require('fs')
const path = require('path')

function handleRegxpTplStr(str = '') {
  return str.replace(/\*/g, '\\*').replace(/\//g, '\\/')
}

function replaceContentByCode(config, source) {
  const filePath = path.resolve(process.cwd(), config.filePath)
  let reg = null
  if (!config.startTag || !config.startTag) {
    reg = /[\S\s]*/
  } else {
    reg = new RegExp(handleRegxpTplStr(config.startTag) + '[\\S\\s]*?' + handleRegxpTplStr(config.endTag))
    source = config.startTag + source + config.endTag
  }
  fs.writeFileSync(filePath, fs.readFileSync(filePath).toString().replace(reg, source))
}

class InjectChunkWebpackPlugin {
  constructor(config) {
    this.config = config || []
  }

  apply(compiler) {
    compiler.hooks.emit.tap(pluginName, compilation => {
      this.config.forEach(config => {
        const chunks = [...compilation.chunks]
        chunks
          .filter(chunk => config.chunkName === chunk.name)
          .forEach(chunk => {
            chunk.files.forEach(chunkFileName => {
              replaceContentByCode(config, compilation.assets[chunkFileName].source())
            })
          })
      })
    })
  }
}

module.exports = InjectChunkWebpackPlugin
