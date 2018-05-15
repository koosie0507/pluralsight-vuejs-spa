const base = require('./webpack.base.config')
const webpack = require ('webpack')

const config = Object.assign({}, base, {
  plugins: base.plugins || []
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  )
}

module.exports = config
