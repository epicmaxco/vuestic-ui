import { locales, messages } from './locales'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "./modules/vuestic",
    "./modules/page-config",
    // "./modules/i18n",
    '@nuxtjs/i18n',
  ],

  i18n: {
    locales,

    vueI18n: {
      messages,
    },

    defaultLocale: 'en',
  }
});
