module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts'
    }
  },
  outputDir: "dist/vue-cli",
  filenameHashing: false,
  configureWebpack: {
    mode: 'production',
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    // This thing turn on Tree Shaking
    optimization: {
      usedExports: true,
    },
    output: {
      chunkFilename: '[name].js',
    }
  },
}
