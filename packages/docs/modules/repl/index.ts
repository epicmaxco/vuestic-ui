import vue from '@vitejs/plugin-vue'
import { resolve } from 'pathe';
import { defineNuxtModule } from '@nuxt/kit';
import { build } from 'vite'

export default defineNuxtModule({
  meta: {
    name: '@vuestic/repl-builder',
    compatibility: {
      nuxt: '^3.3.0'
    }
  },

  async setup (options, nuxt) {
    // Builds specific ESM build for REPL, which includes all the deps, expect vue and all styles

    await build({
      logLevel: 'error',
      root: resolve(__dirname, '../../../ui/src'),
      build: {
        lib: {
          entry: resolve(__dirname, '../../../ui/src/main.ts'),
          fileName: () => 'main.js',
          formats: ['es'],
        },
        sourcemap: false,
        minify: 'esbuild',
        cssCodeSplit: false,
        outDir: resolve(__dirname, './../../public/vuestic-out'),

        rollupOptions: {
          external: ['vue'],
        }
      },
      plugins: [vue()],
    })

    nuxt.options.alias['#vuestic-repl-build/js'] = resolve(__dirname, './../../public/vuestic-out/main.js')
    nuxt.options.alias['#vuestic-repl-build/style'] = resolve(__dirname, './output/styles.css')
  }
})
