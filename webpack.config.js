if (process.env.NODE_ENV === 'production') {
  module.exports = require('./build/webpack.prod.conf.js')
} else {
  module.exports = require('./build/webpack.dev.conf.js')
}

