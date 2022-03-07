import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  build: {
    transpile: ['vue-i18n']
  },
  buildModules: [
    '~/modules/i18n'
  ],
  vite: {
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_PROD_DEVTOOLS__: false
    },
  },
  alias: {
    'vuestic-ui/styles': '../ui/src/styles',
    'vuestic-ui': '../ui/src/main',
  }
})
