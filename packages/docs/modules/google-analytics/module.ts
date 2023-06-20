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
    if (!options.id) {
      console.warn('Google Analytics ID is not specified. Disabling module.')
      return
    }

    addPluginTemplate({
      src: resolve(__dirname, './runtime/plugin.ts'),

      options: {
        ID: options.id,
      }
    })
  }
})
