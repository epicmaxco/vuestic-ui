import { resolve } from 'pathe'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@vuestic/nuxt'],

  nitro: {
    output: {
      dir: resolve('./dist/nuxt')
    }
  },

  vuestic: {
    config: {
      // Config here
    },
    css: ['typography', 'reset']
  },

  rootDir: './src/',

  vite: {
    build: {
      sourcemap: false,
    },
  }
})
