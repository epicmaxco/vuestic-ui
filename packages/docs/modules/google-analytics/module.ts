import { defineNuxtModule, addPluginTemplate } from '@nuxt/kit';
import { resolve } from 'pathe'

/** Module used to add current file path to page-config */
export default defineNuxtModule<any>({
  meta: {
    name: 'googleAnalytics',
  },

  defaults: {
    id: 0,
  },

  setup(options) {
    addPluginTemplate({
      src: resolve(__dirname, './runtime/plugin.ts'),

      options: {
        ID: options.id,
      }
    })
  }
})
