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
    extensions: ['.js', '.vue', '.json'],
    alias: {},
  },
  module: {
    rules: [
      // {
      //   test: /\.vue|js$/,
      //   enforce: 'pre',
      //   include: resolve('src'),
      //   exclude: /node_modules/,
      //   use: [{
      //     loader: 'eslint-loader',
      //     options: {
      //       formatter: require('eslint-friendly-formatter')
      //     }
      //   }]
      // },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: resolve('src'),
        options: {
          presets: ['react', 'es2015']
        }
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
        loader: ['style-loader', 'css-loader', 'less-loader'],
        include: path.resolve(__dirname, 'src')
      }
    ]
  }
}