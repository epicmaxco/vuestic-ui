import { defineNuxtModule } from '@nuxt/kit'

import { useVuesticCSS } from './composables/use-css'
import { useVuesticPlugin } from './composables/use-plugin'
import { useVuesticComposables } from './composables/use-composables'
import { useVuesticComponents } from './composables/use-components'
import { useTranspile } from './composables/use-transpile';
import { useConfigFile } from './composables/use-config-file'

import type { VuesticOptions } from './types'

export default defineNuxtModule<VuesticOptions>({
  meta: {
    name: '@vuestic/nuxt',
    configKey: 'vuestic',
    compatibility: {
      nuxt: '^3.0.0-rc.8'
    }
  },

  defaults: {
    config: {},
    css: ['smart-helpers', 'typography'],
    fonts: true,
  },

  setup (options) {
    useConfigFile()
    useVuesticCSS(options)
    useVuesticPlugin(options)
    useVuesticComponents()
    useVuesticComposables()
    useTranspile()
  }
})
