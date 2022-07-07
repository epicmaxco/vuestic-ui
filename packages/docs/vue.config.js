const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  parallel: !process.env.CIRCLECI, // Prevents breaking on circleci
  chainWebpack: (config) => {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.keep_fnames = true
      return args
    })
  },
  filenameHashing: true,
  configureWebpack: {
    node: {
      __dirname: true,
    },
    entry: {
      app: resolve('./src/main.ts'),
    },
    resolve: {
      alias: {
        'vuestic-ui': resolve('../ui'),
      },
    },
  },
}
