const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: (config) => {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.keep_classnames = true
      args[0].terserOptions.keep_fnames = true
      return args
    })
  },
  configureWebpack: {
    entry: {
      app: resolve('./src/main.ts'),
    },
    resolve: {
      alias: {
        'vuestic-ui': resolve('../ui'),
        assets: resolve('./src/assets'),
      },
    },
  },
  pluginOptions: {
    autoRouting: {
      chunkNamePrefix: 'page-',
    },
  },
}
