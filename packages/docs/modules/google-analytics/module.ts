import { defineNuxtModule, addPluginTemplate } from '@nuxt/kit';
import { resolve } from 'pathe'

/** Module used to add current file path to page-config */
export default defineNuxtModule<any>({
  meta: {
    name: 'googleAnalytics',
  },

  defaults: {
    enabled: false,
    id: null,
  },

  setup(options) {
    if (options.enabled) {
      return
    }

    if (!options.id) {
      throw new Error(`Google Analytics ID is not specified.`)
    }

    addPluginTemplate({
      src: resolve(__dirname, './runtime/plugin.ts'),

      options: {
        ID: options.id,
      }
    })
  }
})
