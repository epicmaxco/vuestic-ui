import { locales, messages } from './locales'
import { VuesticConfig } from './config/vuestic-config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css', rel: 'stylesheet' },
        { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', rel: 'stylesheet' },
      ],
      script: [
        { src: 'https://kit.fontawesome.com/5460c87b2a.js', crossorigin: 'anonymous' },
        { src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js', type: 'module' },
      ]
    }
  },

  modules: [
    "./modules/vuestic",
    "./modules/page-config",
    // "./modules/i18n",
    // TODO: remove after i18n is released https://github.com/nuxt-modules/i18n/pull/1712
    '@nuxtjs/i18n-edge',
  ],

  vuestic: {
    css: ['typography']
  },

  i18n: {
    locales,

    vueI18n: {
      messages,

      fallbackRoot: false,
    },

    defaultLocale: 'en',

    strategy: 'prefix_and_default',
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // TODO: Have this in dev for now, but remove it later
  ssr: false,

  vite: {
    build: {
      minify: false,
    }
  },
});
