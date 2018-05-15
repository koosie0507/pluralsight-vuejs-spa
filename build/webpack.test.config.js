const base = require('./webpack.base.config')

let config = Object.assign({}, base, {})

delete config.entry

module.exports = config
