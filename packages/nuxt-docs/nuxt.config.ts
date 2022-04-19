import { defineNuxtConfig } from 'nuxt3'
import { resolve } from 'path'
import { optimizeLodashImports } from "@optimize-lodash/rollup-plugin";

const YARN_NODE_MODULES = '../../node_modules/'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    link: [
      { href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;1,700&display=swap', rel: 'stylesheet' },
      { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' },
      { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', rel: 'stylesheet' },
      { href: 'https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css', rel: 'stylesheet' },
    ],
    script: [
      { src: 'https://kit.fontawesome.com/5460c87b2a.js', crossorigin: 'anonymous' }
    ]
  },

  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins.push(optimizeLodashImports())
    },
  },

  buildModules: [
    '~/modules/i18n',
  ],

  vite: {
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_PROD_DEVTOOLS__: false
    },
    // resolve: {
    //   alias: [
    //     { find: /^(?:~\/|~)(.*).(css|scss)$/, replacement: '$1' },
    //   ],
    // },
  },

  alias: {
    // 'vuestic-ui/styles': resolve(__dirname, YARN_NODE_MODULES, 'vuestic-ui/src/styles'),
    // 'vuestic-ui/package.json': resolve(__dirname, YARN_NODE_MODULES, 'vuestic-ui/package.json'),
    // 'vuestic-ui/src': resolve(__dirname, YARN_NODE_MODULES, 'vuestic-ui/src/'),
    // 'vuestic-ui': resolve(__dirname, YARN_NODE_MODULES, 'vuestic-ui/src/main'),
    'vuestic-ui/styles': resolve(__dirname, '../ui/src/styles'),
    'vuestic-ui/package.json': resolve(__dirname, '../ui/package.json'),
    'vuestic-ui/src': resolve(__dirname, '../ui/src/'),
    'vuestic-ui': resolve(__dirname, '../ui/src/main'),
    '@vuestic/ag-grid-theme/': resolve(__dirname, '../extensions/ag-grid-theme/src/'),
    '~normalize.css/normalize.css': 'normalize.css/normalize.css',
    '~ag-grid-community/': 'ag-grid-community/',
    '~@ag-grid-community': '@ag-grid-community',
  }
})
