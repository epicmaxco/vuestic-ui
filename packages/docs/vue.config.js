const path = require('path')
const webpack = require('webpack')
const fs = require('fs')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const dirs = fs.readdirSync('../ui/src/components')
const someFileContents = dirs.map(dir => {
  const files = fs.readdirSync('../ui/src/components' + '/' + dir)
  return files.filter(file => !/vdemo/.test(file) && !/va-toast/.test(file) && /\.vue$/.test(file) && !/\.demo/.test(file)).map(file => ({
    dir,
    file,
  }))
}).flat()

console.log(someFileContents)
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
    node: {
      global: true,
      __dirname: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        somevar: JSON.stringify(someFileContents),
      }),
    ],
    entry: {
      // app: resolve('./src/main.ts'),
      json: resolve('./json.js'),
    },
    resolve: {
      alias: {
        'vuestic-ui': resolve('../ui'),
      },
    },
  },
}
