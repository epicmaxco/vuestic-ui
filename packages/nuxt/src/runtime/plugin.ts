import type { VuesticOptions } from '../types'
import { createVuesticEssential, VaDropdownPlugin, VaToastPlugin, VaModalPlugin } from 'vuestic-ui'
import { ref } from 'vue'
import { defineNuxtPlugin } from 'nuxt/app'

function getGlobalProperty (app, key) {
  return app.config.globalProperties[key]
}

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp: app } = nuxtApp

  // It's important to use `, because TS will compile qoutes to " and JSON will not be parsed...
  const { config }: VuesticOptions = JSON.parse(`<%= options.value %>`)

  /** Use tree-shaking by default and do not register any component. Components will be registered by nuxt in use-components. */
  app.use(createVuesticEssential({ 
    config,
    // TODO: Would be nice to tree-shake plugins, but they're small so we don't cant for now.
    plugins: { VaDropdownPlugin, VaToastPlugin, VaModalPlugin },
    /** Do not import any components. Nuxt will import them automatically */
    components: {},
  }))

  /**
   * Nuxt uses @vueuse/head so we can inject css variales in head.
   * @see https://github.com/vueuse/head
   */
  const head = getGlobalProperty(app, '$head')

  if (head) {
    const colorConfig = getGlobalProperty(app, '$vaColorConfig')

    if (colorConfig) {
      // Add reactive CSS variables to head so they are taken from colorConfig
      head.addHeadObjs(ref({
        htmlAttrs: {
          style: colorConfig.renderCSSVariables()
        }
      }))
    }
  }
})
