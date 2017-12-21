const merge = require('webpack-merge')
const webpackBaseConf = require('./webpack.base.conf')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const resolve = (dir) => {
  return path.join(__dirname, `../${dir}`)
}

module.exports = merge(webpackBaseConf, {
  entry: resolve('src/index.js'),
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: 'chunks/[id].[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      // {
      //   test: /\.less$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     //resolve-url-loader may be chained before sass-loader if necessary
      //     use: ['css-loader?{"minimize":true}', 'less-loader']
      //   })
      // }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: '../dist',
    hot: true,
    host: '0.0.0.0',
    inline: true,
    disableHostCheck: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new ExtractTextPlugin("styles.css")
  ]
})