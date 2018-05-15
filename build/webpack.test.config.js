const base = require('./webpack.base.config')

let config = Object.assign({}, base, {
  mode: 'development'
})

delete config.entry

module.exports = config
