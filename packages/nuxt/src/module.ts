import { useTranspile } from './composables/use-transpile';
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
    css: true
  },

  setup (options) {
    useVuesticCSS(options)
    useVuesticPlugin(options)
    useVuesticComponents()
    useVuesticComposables()
    useTranspile()
  }
})
