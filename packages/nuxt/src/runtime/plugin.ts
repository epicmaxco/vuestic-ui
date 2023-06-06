import {
  createVuesticEssential,
  VaDropdownPlugin,
  VaToastPlugin,
  VaModalPlugin,
  ColorsClassesPlugin,
  BreakpointConfigPlugin,
  type GlobalConfig,
  type PartialGlobalConfig
} from 'vuestic-ui'
import { markRaw, computed, watch, type Ref } from 'vue'

import { defineNuxtPlugin, useCookie } from '#app'
import { useHead, ReactiveHead } from '#imports'
import NuxtLink from '#app/components/nuxt-link'
import configFromFile from '#vuestic-config'

import type { VuesticOptions } from '../types'

function getGlobalProperty (app, key) {
  return app.config.globalProperties[key]
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const { vueApp: app } = nuxtApp

  // It's important to use `, because TS will compile qoutes to " and JSON will not be parsed...
  const moduleOptions: VuesticOptions = JSON.parse(`<%= options.value %>`)
  const themeCookie = useCookie(moduleOptions.themeCookieKey)
  const userConfig = configFromFile || moduleOptions.config || {}
  const configWithColors: PartialGlobalConfig = {
    ...userConfig,
    colors: {
      currentPresetName: themeCookie.value || userConfig.colors?.currentPresetName || 'light',
      ...userConfig.colors,
    }
  }

  /** Use tree-shaking by default and do not register any component. Components will be registered by nuxt in use-components. */
  app.use(createVuesticEssential({
    config: { ...configWithColors, routerComponent: markRaw(NuxtLink) },
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
      if (colorConfig.isStyleTag) {
        return {
          style: [
            {
              innerHTML: colorConfig.renderCSSVariablesStyleContent()
            }
          ]
        } satisfies ReactiveHead
      }

      return {
        htmlAttrs: {
          style: colorConfig.renderCSSVariables()
        }
      } satisfies ReactiveHead
    }))
  }

  const colorsClasses = getGlobalProperty(app, '$vaColorsClasses')
  if (colorsClasses) {
    useHead(computed(() => {
      return {
        style: [
          {
            innerHTML: colorsClasses.renderColorHelpers()
          }
        ]
      } satisfies ReactiveHead
    }))
  }

  // Watch for preset name change and update cookie
  const { globalConfig } = getGlobalProperty(app, '$vaConfig') as { globalConfig: Ref<GlobalConfig> }
  watch(() => globalConfig.value.colors.currentPresetName, (newTheme) => {
    themeCookie.value = newTheme
  }, { immediate: true })
})
