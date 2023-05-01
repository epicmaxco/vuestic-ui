import {
  createVuesticEssential,
  VaDropdownPlugin,
  VaToastPlugin,
  VaModalPlugin,
  ColorsClassesPlugin,
  BreakpointConfigPlugin,
} from 'vuestic-ui'
import { markRaw, computed } from 'vue'

import { defineNuxtPlugin } from '#app'
import { useHead } from '#imports'
import NuxtLink from '#app/components/nuxt-link'
import configFromFile from '#vuestic-config'

import type { VuesticOptions } from '../types'

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
    // TODO: Would be nice to tree-shake plugins, but they're small so we can let it be for now.
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

  const colorConfig = getGlobalProperty(app, '$vaColorConfig')
  if (colorConfig) {
    useHead(computed(() => {
      return {
        htmlAttrs: {
          style: colorConfig.renderCSSVariables()
        }
      }
    }))
  }

  const colorsClasses = getGlobalProperty(app, '$vaColorsClasses')
  if (colorsClasses) {
    useHead(computed(() => {
      return {
        htmlAttrs: {
          style: colorsClasses.renderColorHelpers()
        }
      }
    }))
  }
})
