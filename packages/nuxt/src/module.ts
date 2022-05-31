import {
  defineNuxtModule,
  addPluginTemplate,
  addAutoImport
} from '@nuxt/kit'
import { GlobalConfig } from 'vuestic-ui'
import { resolve } from 'pathe'
import { NuxtOptions } from '@nuxt/schema'
import { distDir } from './dirs'

export interface VuesticOptions {
  /** Removes global components registration */
  // withoutComponents?: boolean, //  TODO: Deal with tree-shanking in next version
  config?: GlobalConfig,
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
    // withoutComponents: false,
    config: {}
  },

  hooks: {},

  setup (options, nuxt) {
    /**
     * registering css
     */
    nuxt.options.css.push('vuestic-ui/dist/vuestic-ui.css')
    // nuxt 3 ssr
    nuxt.options.app = nuxt.options.app || {} as NuxtOptions['app']
    nuxt.options.app.head = nuxt.options.app.head || {}
    nuxt.options.app.head.link = nuxt.options.app.head.link || []
    nuxt.options.app.head.link.push(
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
    )

    /**
     * registering plugin as a template and passing vuestic ui options to it
     */
    addPluginTemplate({
      src: resolve(distDir, './runtime/plugin.mjs'),
      filename: 'plugin.mjs',

      // Use JSON.stringify() here, because it will be inserted in ejs template as string. Then we will JSON.parse it.
      options: { 
        config: JSON.stringify(options.config),
        // withoutComponents: JSON.stringify(options.withoutComponents)
      }
    })

    /**
     * registering composables globally
     */
    const composablesFrom = resolve(distDir, './runtime/composables.mjs')
    const composablesNamesList = [
      'useGlobalConfig',
      'getGlobalConfig',
      'setGlobalConfig',
      'mergeGlobalConfig',
      'useColors',
      'getColor',
      'getColors',
      'setColors',
      'useToast',
      'useModal',
    ]
    const autoImportsList = []
    for (const item of composablesNamesList) {
      autoImportsList.push({ name: item, as: item, from: composablesFrom })
    }
    addAutoImport(autoImportsList)
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
