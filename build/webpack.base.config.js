const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
  entry: {
    app: path.resolve(__dirname, '../src/client/client-entry.js')
  },
  module: {
    rules: [
      { test: /(\.js$)|(\.vue$)/, loader: 'eslint-loader', exclude: /node_modules/, enforce: 'pre' },
      { test: /(\.vue$)/, loader: 'vue-loader' },
      { test: /(\.scss$)/, use: [ 'vue-style-loader', 'css-loader', 'sass-loader' ] },
      { test: /(\.css$)/, use: [ 'vue-style-loader', 'css-loader' ] },
      { test: /(\.js$)/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  resolve: {
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'assets/js/[name].js'
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}

module.exports = config
