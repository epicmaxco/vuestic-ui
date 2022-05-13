import { defineNuxtPlugin } from './types'
import { createVuestic } from '../create-vuestic'
import { ref } from 'vue'
import { getGlobalProperty } from '../../utils'

type Options = Parameters<typeof createVuestic>[0]

export const createVuesticNuxt = (options: Options) => {
  return defineNuxtPlugin(({ vueApp }) => {
    vueApp.use(createVuestic(options))

    /**
     * Nuxt uses @vueuse/head so we can inject css variales in head.
     * @see https://github.com/vueuse/head
     */
    const head = vueApp.config.globalProperties.$head

    if (!head) { return }

    head.addHeadObjs(ref({
      htmlAttrs: {
        style: getGlobalProperty(vueApp, '$vaColorConfig').renderCSSVarialbes(),
      },
    }))
  })
}
