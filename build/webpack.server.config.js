const path = require('path')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtract = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = Object.assign({}, base, {
  entry: path.resolve(__dirname, '../src/server-entry.js'),
  target: 'node',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'server/[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtract({
      filename: 'server/[name].css',
      chunkFilename: '[id].css'
    })
  ]
})

module.exports = config
