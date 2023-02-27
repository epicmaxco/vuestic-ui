import {
  createVuesticEssential,
  VaDropdownPlugin,
  VaToastPlugin,
  VaModalPlugin,
  ColorsClassesPlugin,
  BreakpointConfigPlugin,
} from 'vuestic-ui'
import { ref, watchEffect, markRaw } from 'vue'

import type { VuesticOptions } from '../types'
// @ts-ignore: nuxt import alias
import { defineNuxtPlugin } from '#app'
// @ts-ignore: direct nuxt-link import
import NuxtLink from '#app/components/nuxt-link'
// @ts-ignore: use-config-file import alias
import configFromFile from '#vuestic-config'

function getGlobalProperty (app, key) {
  return app.config.globalProperties[key]
}

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp: app } = nuxtApp

  // It's important to use `, because TS will compile qoutes to " and JSON will not be parsed...
  const { config }: VuesticOptions = JSON.parse(`<%= options.value %>`)
  const userConfig = configFromFile || config

  /** Use tree-shaking by default and do not register any component. Components will be registered by nuxt in use-components. */
  app.use(createVuesticEssential({
    config: { ...userConfig, routerComponent: markRaw(NuxtLink) },
    // TODO: Would be nice to tree-shake plugins, but they're small so we don't cant for now.
    // Should be synced with create-vuestic.ts
    plugins: {
      BreakpointConfigPlugin,
      VaDropdownPlugin,
      VaToastPlugin,
      VaModalPlugin,
      ColorsClassesPlugin,
    },
    /** Do not import any components. Nuxt will import them automatically */
    components: {}
  }))

  /**
   * Nuxt uses @vueuse/head so we can inject css variables in head.
   * @see https://github.com/vueuse/head
   */
  const head = getGlobalProperty(app, '$head')

  if (head) {
    watchEffect(() => {
      const colorConfig = getGlobalProperty(app, '$vaColorConfig')

      if (colorConfig) {
        const renderCSSVariables = colorConfig.renderCSSVariables

        // Add reactive CSS variables to head so they are taken from colorConfig
        head.addHeadObjs(ref({
          htmlAttrs: {
            style: renderCSSVariables()
          }
        }))
      }
    }, { flush: 'pre' })

    watchEffect(() => {
      const colorsClasses = getGlobalProperty(app, '$vaColorsClasses')
      if (colorsClasses) {
        head.addHeadObjs(ref({
          htmlAttrs: {
            style: colorsClasses.renderColorHelpers()
          }
        }))
      }
    }, { flush: 'pre' })
  }
})
