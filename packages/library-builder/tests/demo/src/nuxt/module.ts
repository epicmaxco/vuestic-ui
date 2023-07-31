import { defineNuxtModule, addPlugin, addComponent, addImports } from '@nuxt/kit'
import { dirname, resolve } from 'pathe'

export default defineNuxtModule({
  meta: {
    name: 'my-nuxt-module', // TODO: How about having a name from package.json?
  },

  setup(options) {
    addPlugin({
      // TODO: Make it easy to import from runtime dir with some util
      src: resolve(dirname(import.meta.url.replace('file:/', '')), './runtime/plugin.mjs'),
    })
  }
})
