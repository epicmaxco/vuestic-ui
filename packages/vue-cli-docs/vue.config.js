const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    entry: {
      app: resolve('./src/main.ts'),
    },
    resolve: {
      alias: {
        'vuestic-ui-dev': resolve('../ui'),
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
