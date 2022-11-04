import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@vuestic/nuxt'],

  vuestic: {
    config: {
      components: {
        VaButton: {
          round: false,
          size: 'small'
        }
      }
    }
  }
})
