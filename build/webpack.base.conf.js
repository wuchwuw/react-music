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
    extensions: ['.jsx', '.vue', '.json', '.js'],
    alias: {
      'components': resolve('src/components'),
      'store': resolve('src/store')
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
      }
    ]
  }
}