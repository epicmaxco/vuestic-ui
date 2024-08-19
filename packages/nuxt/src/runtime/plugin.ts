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
import type { VuesticOptions } from '../types'
import { useHead, ReactiveHead, defineNuxtPlugin, useCookie } from '#imports'
import NuxtLink from '#app/components/nuxt-link'
import configFromFile from '#vuestic-config'
import { useRuntimeConfig } from '#app'

function getGlobalProperty (app, key) {
  return app.config.globalProperties[key]
}

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp: app } = nuxtApp

  // Ignore
  const moduleOptionsConfig: VuesticOptions['config'] = (useRuntimeConfig() as any).public['#vuestic-public-options-config']
  const moduleOptionsThemeCookieKey: VuesticOptions['themeCookieKey'] = (useRuntimeConfig() as any).public['#vuestic-public-options-theme-cookie-key']
  const themeCookie = useCookie(moduleOptionsThemeCookieKey)
  const userConfig = configFromFile || moduleOptionsConfig || {}
  const configWithColors: PartialGlobalConfig = {
    ...userConfig,
    colors: {
      currentPresetName: themeCookie.value || userConfig.colors?.currentPresetName || 'light',
      ...userConfig.colors
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
      ColorsClassesPlugin
    },
    /** Do not import any components. Nuxt will import them automatically */
    components: {}
  }))

  const colorConfig = getGlobalProperty(app, '$vaColorConfig')
  if (colorConfig) {
    useHead(computed(() => {
      return {
        style: [
          {
            innerHTML: colorConfig.renderCSSVariablesStyleContent()
          }
        ]
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
