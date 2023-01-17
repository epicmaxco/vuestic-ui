import { locales, messages } from './locales'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "./modules/vuestic",
    "./modules/page-config",
    // "./modules/i18n",
    // TODO: remove after i18n is released https://github.com/nuxt-modules/i18n/pull/1712
    '@nuxtjs/i18n-edge',
  ],

  i18n: {
    locales,

    vueI18n: {
      messages,
    },

    defaultLocale: 'en',
  },
});
