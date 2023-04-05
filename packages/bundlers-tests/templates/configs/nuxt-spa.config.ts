// https://v3.nuxtjs.org/api/configuration/nuxt.config
// @ts-ignore
export default defineNuxtConfig({
  ssr: false,
  modules: ['@vuestic/nuxt'],
  vuestic: {
    config: {},
    css: ['typography', 'reset']
  }
})
