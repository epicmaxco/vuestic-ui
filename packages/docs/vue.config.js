const getLastCommitHash = () => {
  const hash = require('child_process').execSync('git rev-parse HEAD').toString()
  return hash.slice(0, 6)
}
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
  configureWebpack: {
    plugins: [
      new (require('webpack')).DefinePlugin({
        VERSION: JSON.stringify(require('../ui/package.json').version),
        TIMESTAMP: JSON.stringify(new Date().toUTCString()),
        COMMIT: JSON.stringify(getLastCommitHash()),
      }),
    ],
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
