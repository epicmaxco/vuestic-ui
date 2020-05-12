import nuxtI18n from './nuxt-modules/nuxt-i18n'
import TerserPlugin from 'terser-webpack-plugin'

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
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined',
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
      },
    ],
    script: [
      {
        src: 'https://kit.fontawesome.com/5460c87b2a.js',
        crossorigin: 'anonymous',
      },
    ],
  },
  buildModules: ['@nuxt/typescript-build'],
  plugins: [
    { mode: 'server', src: '~/plugins/jsdom.ts' },
    { src: '~/plugins/colorHelper.ts' },
    { mode: 'client', src: '~/plugins/client-services.ts' },
    { src: '~/plugins/context.ts' },
    { src: '~/plugins/externalVuetable.ts' },
    { src: '~/plugins/localeRoute.ts' },
    { src: '~/plugins/vuestic.ts' },
  ],
  build: {
    transpile: ['vue-instantsearch', 'instantsearch.js/es', 'vuetable-2', 'vue-bulma-expanding', 'medium-editor', 'vue-toasted'],
    extend (config, { _isDev, isClient }) {
      Object.assign(config.optimization, {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            // We need this plugin to keep class names not minified to use it while managing vuetify plugin and API props
            parallel: true,
            terserOptions: {
              keep_fnames: true,
            },
          }),
        ],
      })
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
