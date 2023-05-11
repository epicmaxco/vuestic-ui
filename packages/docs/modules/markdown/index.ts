import { defineNuxtModule, addImports } from '@nuxt/kit';
import { resolve } from 'pathe'

export default defineNuxtModule({
  meta: {
    mame: 'vuestic:markdown',
  },

  setup() {
    addImports({
      name: 'useMarkdownIt',
      as: 'useMarkdownIt',
      from: resolve(__dirname, './runtime/useMarkdownIt'),
    })
  }
})