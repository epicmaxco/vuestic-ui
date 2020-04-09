export default {
  buildModules: ['@nuxt/typescript-build'],
  plugins: [
    { mode: 'client', src: '~/plugins/ui-plugin.ts' },
    { src: '~/plugins/context.ts' }
  ],
}
