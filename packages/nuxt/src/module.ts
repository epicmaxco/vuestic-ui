import type { Import } from 'unimport'
import type { GlobalConfig } from 'vuestic-ui'
import { defineNuxtModule } from '@nuxt/kit'
import { useVuesticCSS } from './composables/use-css'
import { useVuesticPlugin } from './composables/use-plugin'
import { useVuesticComposables } from './composables/use-composables'

export interface VuesticOptions {
  /** Removes global components registration */
  config?: GlobalConfig,

  /** 
   * Choose which CSS modules will be added to nuxt
   * 
   * If `true`, all CSS modules will be added. If `false`, no CSS modules will be added.
   * If an array, only CSS modules from this array will be added.
   * 
   * @default true
   */
  css?: Array<'typography' | 'grid' | 'reset'> | boolean,
}

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
  },

  hooks: {},

  setup (options, nuxt) {
    useVuesticCSS(options, nuxt)
    useVuesticPlugin(options)
    useVuesticComposables()
  }
})

/**
 * declaring options
 */
declare module '@nuxt/schema' {
  interface NuxtConfig {
    vuestic?: VuesticOptions
  }
}
