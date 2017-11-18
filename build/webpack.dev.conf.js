const merge = require('webpack-merge')
const webpackBaseConf = require('./webpack.base.conf')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const resolve = (dir) => {
  return path.join(__dirname, `../${dir}`)
}

module.exports = merge(webpackBaseConf, {
  entry: resolve('src/main.js'),
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: 'chunks/[id].[name].[chunkhash:8].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})