const path = require('path')
const webpack = require('webpack')

const resolve = (dir) => {
  return path.join(__dirname, `../${dir}`)
}

module.exports = {
  resolve: {
    modules: [
      path.join(__dirname, '../node_modules')
    ],
    extensions: ['.jsx', '.json', '.js'],
    alias: {
      'learn': resolve('src/learn'),
      'components': resolve('src/components'),
      'common': resolve('src/common'),
      'store': resolve('src/store'),
      'api': resolve('src/api'),
      'base': resolve('src/base')
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }],
        include: resolve('src'),
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: resolve('src')
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: 'fonts/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g|git|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: `images/[name].[hash].[ext]`,
          limit: 2000
        }
      }
    ]
  }
}