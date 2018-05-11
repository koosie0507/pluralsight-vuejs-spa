const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
  entry: {
    app: path.resolve(__dirname, '../src/client-entry.js')
  },
  module: {
    rules: [
      { test: /(\.js$)|(\.vue$)/, loader: 'eslint-loader', exclude: /node_modules/, enforce: 'pre' },
      { test: /(\.vue$)/, loader: 'vue-loader' },
      { test: /(\.scss$)/,
        use: [
          'vue-style-loader',
          { loader: 'css-loader', options: {modules: true} },
          'sass-loader'
        ]
      },
      { test: /(\.js$)/, loader: 'babel-loader', exclude: /node_modules/ },
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
