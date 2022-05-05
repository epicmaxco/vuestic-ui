import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  buildModules: ['@vuestic-ui/nuxt'],

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
