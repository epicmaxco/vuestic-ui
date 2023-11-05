import { defineNuxtModule, addImports } from '@nuxt/kit';
import { resolve } from 'pathe'

export default defineNuxtModule({
  meta: {
    name: 'vuestic:markdown',
  },

  setup() {
    addImports({
      name: 'useMarkdown',
      as: 'useMarkdown',
      from: resolve(__dirname, './runtime/useMarkdown'),
    })
  }
})