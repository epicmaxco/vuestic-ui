const webpack = require('webpack')
const version = require('./package.json').version
const timeStamp = new Date().toUTCString()

const getLastCommitHash = () => {
  const hash = require('child_process').execSync('git rev-parse HEAD').toString()

  return hash.slice(0, 6)
}

module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      entry: 'src/vue-book/book-main.js',
      template: 'public/index.html',
    },
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(version),
        TIMESTAMP: JSON.stringify(timeStamp),
        COMMIT: JSON.stringify(getLastCommitHash()),
      }),
    ],
  },
}
