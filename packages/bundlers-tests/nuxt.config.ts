import { defineNuxtConfig } from 'nuxt'
import { resolve } from 'pathe'
import { visualizer } from 'rollup-plugin-visualizer'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@vuestic/nuxt'],

  nitro: {
    output: {
      dir: resolve('./dist/nuxt')
    }
  },

  vuestic: {
    config: {
      // Config here
    },
  },

  rootDir: './src/',

  vite: {
    resolve: {
      alias: {
        // 'vuestic-ui/css': '../ui/css',
        'vuestic-ui': resolve(__dirname, '../../node_modules/vuestic-ui')
      }
    },
    plugins: [
      visualizer({
        filename: './dist/nuxt.stats.html',
        title: 'Vuestic Nuxt App',
        template: 'sunburst',
        sourcemap: true,
      })
    ]
  }
})
