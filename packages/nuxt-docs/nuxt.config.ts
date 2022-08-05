import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  alias: {
    'vuestic-ui': '../ui/src/main',
    'vuestic-ui/css': '../ui/styles/vuestic-ui.scss',
  },
  modules: ['./modules/vuestic']
})
