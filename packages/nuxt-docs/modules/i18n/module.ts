import { defineNuxtModule } from '@nuxt/kit'
import { usePagePrefix } from './composables/use-page-prefix'
import { usePlugin } from './composables/use-plugin'

/** This module adds locale route prefix */
export default defineNuxtModule({
  setup(options, nuxt) {
    usePagePrefix()
    usePlugin()

    nuxt.options.vite.define = {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_PROD_DEVTOOLS__: false
    }
  }
})
