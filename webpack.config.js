var webpack = require('webpack')
var path = require('path')
var HTMLwebpackPlugin = require('html-webpack-plugin')
var env = process.env.Y_ENV
var outputFile

var plugins = [
  new HTMLwebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, 'app/index.html'),
    inject: true
  })
]

if (env === 'prod') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    })
  )
  outputFile = 'bundle.min.js'
} else {
  outputFile = 'bundle.js'
}

var config = {
  entry: ['./app/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader'],
        include: path.resolve(__dirname, 'app')
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'app'),
        options: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: plugins
}


module.exports = config
