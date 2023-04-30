import { defineNuxtModule, addImports } from '@nuxt/kit';
import { resolve } from 'pathe'

export default defineNuxtModule({
  meta: {
    mame: 'vuestic:markdown',
  },

  setup(_, nuxt) {
    nuxt.options.plugins.push(resolve(__dirname, 'runtime/plugin.ts'))


    addImports({
      name: 'useMarkdownIt',
      as: 'useMarkdownIt',
      from: resolve(__dirname, './runtime/useMarkdownIt'),
    })
  }
})