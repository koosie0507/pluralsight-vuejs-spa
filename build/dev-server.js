const webpack = require('webpack')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')
const path = require('path')
const MFS = require('memory-fs')

module.exports = function setupDevServer (app, onUpdate) {
  clientConfig.entry.app = [
    'webpack-hot-middleware/client',
    clientConfig.entry.app
  ]
  clientConfig.mode = 'development'
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
  const clientCompiler = webpack(clientConfig)
  app.use(
    require('webpack-dev-middleware')(clientCompiler, {
      stats: { colors: true }
    })
  )
  app.use(require('webpack-hot-middleware')(clientCompiler))

  const mfs = new MFS()
  const outputPath = path.join(serverConfig.output.path, 'server/main.js')
  const serverCompiler = webpack(serverConfig)
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, () => {
    try {
      const bundle = mfs.readFileSync(outputPath, 'utf-8')
      onUpdate(bundle)
    } catch (err) {
      console.log(err)
    }
  })
}
