const merge = require('webpack-merge')
const webpackBaseConf = require('./webpack.base.conf')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const axios = require('axios')

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
    disableHostCheck: true,
    before(app) {
      app.get('/api/getDiscList', function (req, res) {
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      })
      app.get('/api/lyric', function (req, res) {
        const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          let ret = response.data
          if (typeof ret === 'string') {
            const reg = /^\w+\(({.+})\)$/
            const matches = ret.match(reg)
            if (matches) {
              ret = JSON.parse(matches[1])
            }
          }
          res.json(ret)
        }).catch((e) => {
          console.log(e)
        })
      })
    }
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