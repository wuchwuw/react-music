const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isProd = process.env.NODE_ENV === 'production'

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"'+ process.env.NODE_ENV + '"',
    }
  })
  // new webpack.ProvidePlugin({
  //   mapActions: ['vuex', 'mapActions'],
  //   mapMutations: ['vuex', 'mapMutations'],
  //   mapGetters: ['vuex', 'mapGetters'],
  //   mapState: ['vuex', 'mapState']
  // })
]

if (isProd) {
  plugins = plugins.concat([
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: 'chunks/[name].[id].[hash:8].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      chunksSortMode: 'dependency',
      minify: {
        // https://github.com/kangax/html-minifier#options-quick-reference
        removeComments: true,
        collapseWhitespace: true
      },
      cnzz: true
    }),
  ])
} else {
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      // favicon: resolve('src/favicon.ico'),
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    })
  ])
}

if (process.env.analyze === 'true') {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = plugins