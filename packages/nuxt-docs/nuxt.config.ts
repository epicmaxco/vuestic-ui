import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['./modules/vuestic', './modules/define-page-config', './modules/i18n'],
})
