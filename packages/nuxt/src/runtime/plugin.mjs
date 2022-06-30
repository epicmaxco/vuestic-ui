import { createVuestic, createVuesticEssential } from 'vuestic-ui'
import { ref } from 'vue'

function getGlobalProperty (app, key) {
  return app.config.globalProperties[key]
}

// @ts-ignore: ts isn't working in proper way into plugin templates
export default (nuxtApp) => {
  const { vueApp: app } = nuxtApp

  const config = JSON.parse('<%= options.config %>')
  const withoutComponents = JSON.parse('<%= options.withoutComponents %>' || 'false')

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
          style: colorConfig.renderCSSVarialbes()
        }
      }))
    }
  }
}
