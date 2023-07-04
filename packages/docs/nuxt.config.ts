// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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

  ssr: true,
  nitro: {
    compressPublicAssets: true,
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
  },

  modules: [
    './modules/google-analytics',
    './modules/banner',
    './modules/vuestic',
    './modules/page-config',
    '@nuxtjs/google-fonts',
    './modules/markdown',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@funken-studio/sitemap-nuxt-3'
  ],

  vuestic: {
    css: ['typography'],
    fonts: false,
  },

  googleFonts: {
    preload: true,
    prefetch: true,
    preconnect: true,
    display: 'swap',
    download: false,
    families: {
      'Source+Sans+Pro': {
        wght: [400, 600, 700],
      },
      'Source+Code+Pro': {
        wght: [400],
      },
      'Material+Icons': true,
      'Material+Icons+Outlined': true,
    },
  },

  tailwindcss: {
    viewer: false,
    config: {
      important: true,
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
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
    },
    optimizeDeps: { exclude: ["fsevents"] },
    resolve: {
      alias: [
        { find: '~@ag-grid-community', replacement: ('@ag-grid-community') }
      ]
    }
  },

  sitemap: {
    hostname: 'https://example.com',
  }
});
