const { resolve } = require('./util')
const loaders = require('./loaders')
const plugins = require('./plugins')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const axios = require('axios')

const isProd = process.env.NODE_ENV === 'production'

const config = {
  mode: isProd ? 'production' : 'development',
  entry: {
    main: resolve('src/main.js')
  },
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[id].[hash:8].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'learn': resolve('src/learn'),
      'components': resolve('src/components'),
      'common': resolve('src/common'),
      'store': resolve('src/store'),
      'api': resolve('src/api'),
      'base': resolve('src/base')
    }
  },
  module: {
    rules: loaders
  },
  plugins,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: false,
            // 删除所有的 `console` 语句
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
          },
          // 去掉注释
          output: {
            comments: false
          }
        },
        sourceMap: true
      })
    ],
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      // chunks: "initial"，"async"和"all"分别是：初始块，按需块或所有块；
      chunks: 'all',
      // （默认值：30000）块的最小大小
      minSize: 30000,
      // （默认值：1）分割前共享模块的最小块数
      minChunks: 1,
      // （缺省值5）按需加载时的最大并行请求数
      maxAsyncRequests: 8,
      // （默认值3）入口点上的最大并行请求数
      maxInitialRequests: 8,
      // webpack 将使用块的起源和名称来生成名称: `vendors~main.js`,如项目与"~"冲突，则可通过此值修改，Eg: '-'
      automaticNameDelimiter: '~',
      // cacheGroups is an object where keys are the cache group names.
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
        // element: {
        //   name: 'element',
        //   test: /[\\/]node_modules[\\/]element-ui[\\/]/,
        //   chunks: 'all',
        //   // 默认组的优先级为负数，以允许任何自定义缓存组具有更高的优先级（默认值为0）
        //   priority: 1
        // }
      }
    }
  },
  devtool: isProd ? '#source-map' : 'cheap-module-eval-source-map'
}

if (isProd) {
  // ...
} else {
  config.devServer = {
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
  }
}
module.exports = config