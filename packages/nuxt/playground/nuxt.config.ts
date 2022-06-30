import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['@vuestic/nuxt'],

  vuestic: {
    withoutComponents: false,
    config: {
      components: {
        VaButton: {
          outline: true,
          rounded: false,
          size: 'small'
        }
      }
    }
  }
})
