// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'stylesheet', href: "https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css" },
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;500;600;700&display=swap" },
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" },
        { rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
      ],

      script: [
        { crossorigin: 'anonymous', src: 'https://kit.fontawesome.com/5460c87b2a.js' },
        { type: 'module', src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js' },
      ],

      meta: [
        { charset: 'utf-8' },
        { name: 'theme-color', content: '#154EC1' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0' },
        {
          hid: 'description',
          name: 'description',
          content: 'Vuestic UI is a modern Vue.js UI framework designed to be simple and customizable for applications of any type and scale'
        },
        {
          vmid: 'keywords',
          name: 'keywords',
          content: 'vue, vue components, vuestic, vuestic-ui, component framework'
        },
        {
          vmid: 'og:description',
          property: "og:description",
          content: 'Vuestic UI is a modern Vue.js UI framework designed to be simple and customizable for applications of any type and scale'
        },
        {
          vmid: 'og:image',
          property: "og:image",
          content: 'https://raw.githubusercontent.com/epicmaxco/vuestic-ui/develop/.github/assets/vuestic-ui-social.png'
        },
        {
          vmid: 'og:site_name',
          property: "og:site_name",
          content: 'Vuestic UI'
        },
        {
          vmid: 'og:title',
          property: "og:title",
          content: 'Vuestic UI — Vue.js 3.0 UI Framework'
        },
        {
          vmid: 'og:type',
          property: "og:type",
          content: 'website'
        },
        {
          vmid: 'twitter:card',
          property: 'twitter:card',
          content: 'https://raw.githubusercontent.com/epicmaxco/vuestic-ui/develop/.github/assets/vuestic-ui-social.png'
        },
        {
          vmid: 'twitter:domain',
          property: 'twitter:domain',
          content: 'https://vuestic.dev/'
        },
        {
          vmid: 'twitter:site',
          property: 'twitter:site',
          content: 'Vuestic UI'
        },
      ]
    },
  },

  // TODO: hydration mismatch issues; tailwind doesn't work properly
  ssr: false,

  modules: [
    './modules/banner',
    './modules/vuestic',
    './modules/page-config',
    // "./modules/i18n",
    // TODO: remove after i18n is released https://github.com/nuxt-modules/i18n/pull/1712
    '@nuxtjs/i18n-edge',
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    '@nuxtjs/color-mode',
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

  css: [
    '@/assets/css/tailwind.css',
  ],

  vite: {
    resolve: {
      alias: [
        { find: '~@ag-grid-community', replacement: ('@ag-grid-community') }
      ]
    }
  },
});
