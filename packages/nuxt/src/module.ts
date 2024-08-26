import { defineNuxtModule } from '@nuxt/kit'

import { useVuesticCSS } from './composables/use-css'
import { useVuesticPlugin } from './composables/use-plugin'
import { useVuesticComposables } from './composables/use-composables'
import { useVuesticComponents } from './composables/use-components'
import { useTranspile } from './composables/use-transpile'
import { useConfigFile } from './composables/use-config-file'

import type { VuesticOptions } from './types'

const VUESTIC_DEFAULT_CSS = ['smart-helpers', 'typography'] as VuesticOptions['css']

export default defineNuxtModule<VuesticOptions>({
  meta: {
    name: '@vuestic/nuxt',
    configKey: 'vuestic',
    compatibility: {
      nuxt: '>=3.3.0'
    }
  },

  defaults: {
    config: {},
    css: [],
    fonts: true,
    themeCookieKey: 'vuestic-theme'
  },

  setup (options) {
    if (Array.isArray(options.css) && options.css.length === 0) {
      options.css = VUESTIC_DEFAULT_CSS
    }
    useConfigFile()
    useVuesticCSS(options)
    useVuesticPlugin(options)
    useVuesticComponents()
    useVuesticComposables()
    useTranspile()
  }
})
