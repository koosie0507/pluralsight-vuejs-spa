const base = require('./webpack.base.config')
const webpack = require ('webpack')

const config = Object.assign({}, base, {
  plugins: base.plugins || []
})

config.optimization = {
  splitChunks: {
    chunks: 'all',
    minSize: 0,
    maxAsyncRequests: Infinity,
    maxInitialRequests: Infinity,
    name: true,

    cacheGroups: {
      default: {
        chunks: 'async',
        minSize: 3000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        priority: -20,
        reuseExistingChunk: true
      },
      vendor: {
        name: 'vendor',
        chunks: 'initial',
        reuseExistingChunk: true,
        priority: -5,
        enforce: true,
        test: /[\\/]node_modules[\\/]/
      }
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = 'source-map'
  config.mode = 'production'
  config.plugins.push(
    new webpack.DefinePlugin({
      'NODE_ENV': 'production'
    })
  )
}

module.exports = config
