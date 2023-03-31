// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,700&display=swap" },
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400&display=swap" },
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/icon?family=Material+Icons&display=swap" },
        { rel: 'stylesheet', href: "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined&display=swap" },
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
  // ssr: false,
  // nitro: {
  //   prerender: {
  //     routes: ['/'],
  //     ignore: ['/*']
  //   }
  // },

  modules: [
    // './modules/banner',
    './modules/vuestic',
    './modules/page-config',
    // "./modules/i18n",
    // TODO: remove after i18n is released https://github.com/nuxt-modules/i18n/pull/1712
    '@nuxtjs/i18n-edge',
    './modules/markdown',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  vuestic: {
    css: ['typography'],
    fonts: false,
  },

  tailwindcss: {
    config: {
      content: [
        "./components/**/*.{js,vue,ts}",
        "./page-config/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./modules/page-config/blocks/**/*.{js,ts}",
        "./app.vue",
      ]
    }
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
      // GENERATOR_ADD - language
    ],

    defaultLocale: 'en',

    strategy: 'prefix_and_default',

    detectBrowserLanguage: {
      redirectOn: 'all',
      alwaysRedirect: true,
      useCookie: true,
      cookieKey: 'i18n_locale',
    },

    lazy: true,

    langDir: 'locales/',

    vueI18n: {
      fallbackLocale: 'en',
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
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
