const base = require('./webpack.base.config')

let config = Object.assign({}, base, {
  mode: 'development'
})
config.module.rules.splice(0, 1)
delete config.entry

module.exports = config
