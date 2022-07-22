import { createVuestic, createVuesticEssential } from 'vuestic-ui'
import { ref } from 'vue'
import { defineNuxtPlugin } from 'nuxt/app'
import type { VuesticOptions } from '../module'

function getGlobalProperty (app, key) {
  return app.config.globalProperties[key]
}

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp: app } = nuxtApp

  // It's important to use `, because TS will compile qoutes to " and JSON will not be parsed...
  const { config }: VuesticOptions = JSON.parse(`<%= options.value %>`)
  // TODO: Deal with tree-shaking later
  const withoutComponents = false

  app.use(withoutComponents ? createVuesticEssential({ config }) : createVuestic({ config }))

  /**
   * Nuxt uses @vueuse/head so we can inject css variales in head.
   * @see https://github.com/vueuse/head
   */
  const head = getGlobalProperty(app, '$head')

  if (head) {
    const colorConfig = getGlobalProperty(app, '$vaColorConfig')

    if (colorConfig) {
      // Add reactive CSS varialbes to head so they are taken from colorConfig
      head.addHeadObjs(ref({
        htmlAttrs: {
          style: colorConfig.renderCSSVariables()
        }
      }))
    }
  }
})
