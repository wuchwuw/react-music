const { resolve } = require('./util')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = [
  {
    test: /\.(js|jsx)$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    options: {
      emitWarning: true, // eslint警告
      formatter: require('eslint-friendly-formatter')
    },
    exclude: /node_modules/
  },
  {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    include: [resolve('src')]
  },
  {
    test: /\.css/,
    use: [
      'style-loader',
      'css-loader'
    ]
  },
  {
    test: /\.styl$/,
    use: [{
        loader: "style-loader" // creates style nodes from JS strings
    }, {
        loader: "css-loader" // translates CSS into CommonJS
    }, {
        loader: "stylus-loader" // compiles Less to CSS
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
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      name: `images/[name].[hash].[ext]`,
      limit: 2000
    }
  }
]