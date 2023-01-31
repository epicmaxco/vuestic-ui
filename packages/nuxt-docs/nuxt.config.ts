import { locales, messages } from './locales'
import { VuesticConfig } from './config/vuestic-config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0' },
        {
          hid: 'description',
          name: 'description',
          content: 'Vuestic UI is a modern Vue.js UI framework designed to be simple and customizable for applications of any type and scale'
        }
      ]
    },
  },

  modules: [
    "./modules/banner",
    "./modules/vuestic",
    "./modules/page-config",
    // "./modules/i18n",
    // TODO: remove after i18n is released https://github.com/nuxt-modules/i18n/pull/1712
    '@nuxtjs/i18n-edge',
    '@nuxtjs/tailwindcss',
  ],

  vuestic: {
    css: ['typography']
  },

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        status: 'full',
        translationPath: 'translation.language.en',
        file: 'en.json',
      },
      {
        code: 'ru',
        name: 'Русский',
        status: 'full',
        translationPath: 'translation.language.ru',
        file: 'ru.json',
      },
      {
        code: 'zh-cn',
        name: '简体中文',
        status: 'part',
        translationPath: 'translation.language.zh-CN',
        file: 'zh-cn.json',
      },
      // GENERATOR_ADD - language
    ],

    defaultLocale: 'en',

    strategy: 'prefix_and_default',

    lazy: true,

    langDir: 'locales/',
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // // TODO: Have this in dev for now, but remove it later
  // ssr: false,

  // vite: {
  //   build: {
  //     minify: false,
  //   }
  // },
});
