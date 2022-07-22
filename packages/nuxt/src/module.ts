import { VuesticOptions } from './types'
import { defineNuxtModule } from '@nuxt/kit'
import { useVuesticCSS } from './composables/use-css'
import { useVuesticPlugin } from './composables/use-plugin'
import { useVuesticComposables } from './composables/use-composables'
import { useVuesticComponents } from './composables/use-components'

export default defineNuxtModule<VuesticOptions>({
  meta: {
    name: '@vuestic/nuxt',
    configKey: 'vuestic',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },

  defaults: {
    config: {},
    css: true,
    components: undefined,
  },

  hooks: {},

  setup (options, nuxt) {
    useVuesticCSS(options, nuxt)
    useVuesticPlugin(options)
    useVuesticComponents(options)
    useVuesticComposables()
  }
})
