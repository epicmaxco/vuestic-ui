module.exports = {
  pages: {
    index: {
      entry: 'src/main.ts'
    }
  },
  outputDir: "dist/vue-cli",
  configureWebpack: {
    mode: 'production',
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    // This thing turn on Tree Shaking
    optimization: {
      usedExports: true,
    }
  }
}