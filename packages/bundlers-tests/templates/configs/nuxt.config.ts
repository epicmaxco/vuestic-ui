import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@vuestic/nuxt'],
  vuestic: {
    config: {
      // Config here
    },
    css: ['typography', 'reset']
  }
})
