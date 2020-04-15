export default {
  buildModules: ['@nuxt/typescript-build'],
  plugins: [
    { mode: 'server', src: '~/plugins/jsdom.ts'},
    { src: '~/plugins/colorHelper.ts'},
    { mode: 'client', src: '~/plugins/ui-plugin.ts' },
    { src: '~/plugins/context.ts' },
    { src: '~/plugins/externalVuetable.ts' },
  ],
  build: {
      transpile: ['vue-instantsearch', 'instantsearch.js/es'],
      extend (config, { isDev, isClient }) {
        if (isClient) {
          config.node = {
            fs: 'empty',
            child_process: 'empty',
            tls: 'empty',
            net: 'empty',
          }
        }
      }
  },
}
