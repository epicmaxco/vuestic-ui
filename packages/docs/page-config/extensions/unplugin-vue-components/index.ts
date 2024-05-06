export default definePageConfig({
  blocks: [
    block.title('Unplugin Vue Components'),
    block.paragraph('[Unplugin Vue Components](https://github.com/unplugin/unplugin-vue-components) is a Vite/Webpack plugin that automatically imports Vue components from your dependencies.'),
    block.paragraph('You can use to import components from Vuestic UI without registering them globally or importing them in every file.'),

    block.tabs({
      'vite': [
        block.code('installation.vite')
      ],
      'webpack': [
        block.code('installation.webpack')
      ],
    }),

    block.paragraph('After installing the plugin, you can use components from Vuestic UI without importing them. But you need to prevent them from global registration. Use `createVuesticEssential` to register Vuestic without global components. Read more about tree-shaking [here](/getting-started/tree-shaking)'),

    block.code('vuestic-setup'),

    block.paragraph('When working with [Nuxt](/getting-started/nuxt) this feature is built-in.'),
  ]
})
