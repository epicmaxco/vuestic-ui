export default {
  head: {
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Code+Pro:400' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
    ],
  },
  buildModules: ['@nuxt/typescript-build'],
  plugins: [
    { mode: 'client', src: '~/plugins/ui-plugin.ts' },
    { src: '~/plugins/context.ts' }
  ],

  build: {
      transpile: ['vue-instantsearch', 'instantsearch.js/es'],
  },
}
