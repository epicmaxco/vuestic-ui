import nuxtI18n from './nuxt-modules/nuxt-i18n'

export default {
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Source+Code+Pro:400',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
      },
    ],
  },
  buildModules: ['@nuxt/typescript-build'],
  plugins: [
    { mode: 'server', src: '~/plugins/jsdom.ts' },
    { src: '~/plugins/colorHelper.ts' },
    { mode: 'client', src: '~/plugins/ui-plugin.ts' },
    { src: '~/plugins/context.ts' },
    { src: '~/plugins/externalVuetable.ts' },
    { src: '~/plugins/localeRoute.ts' },
  ],
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es'],
    extend (config, { _isDev, isClient }) {
      if (isClient) {
        config.node = {
          fs: 'empty',
          child_process: 'empty',
          tls: 'empty',
          net: 'empty',
        }
      }
    },
  },
  modules: [nuxtI18n],
}
