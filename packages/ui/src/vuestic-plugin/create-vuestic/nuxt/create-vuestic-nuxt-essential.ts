import { defineNuxtPlugin } from './types'
import { createVuesticEssential } from '../create-vuestic-essential'
import { ref } from 'vue'
import { getGlobalProperty } from '../../utils'

type Options = Parameters<typeof createVuesticEssential>[0]

export const createVuesticNuxtEssential = (options: Options) => {
  return defineNuxtPlugin(({ vueApp }) => {
    vueApp.use(createVuesticEssential(options))

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
