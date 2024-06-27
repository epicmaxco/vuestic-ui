// https://v3.nuxtjs.org/api/configuration/nuxt.config
// @ts-ignore
export default defineNuxtConfig({
  modules: ['@vuestic/nuxt'],
  vuestic: {
    config: {},
    css: ['typography', 'reset']
  },

  vite: {
    define: {
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
    }
  }
})
