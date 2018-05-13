const base = require('./webpack.base.config')
const MiniCssExtract = require('mini-css-extract-plugin')

const config = Object.assign({}, base, {
  plugins: base.plugins || []
})

config.plugins.push(new MiniCssExtract({
  filename: 'assets/css/[name].css',
  chunkFilename: 'assets/css/[id].css'
}))

config.module.rules
  .filter(r => { return r.use && r.use[0] == 'vue-style-loader' })
  .forEach(r => { r.use.splice(0, 1, MiniCssExtract.loader) })

module.exports = config
