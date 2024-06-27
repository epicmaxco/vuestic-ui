// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-components/webpack').default({
        resolvers: [
          (componentName) => {
            if (componentName.startsWith('Va'))
              return { name: componentName, from: 'vuestic-ui' }
          },
        ],
    }),
  ],
}
