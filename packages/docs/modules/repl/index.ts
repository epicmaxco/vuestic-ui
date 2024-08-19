import vue from '@vitejs/plugin-vue'
import { resolve } from 'pathe';
import { defineNuxtModule } from '@nuxt/kit';
import { build } from 'vite'
import { readFile, writeFile, rm } from 'fs/promises'

const appendFileToTheEndOfFile = async (source: string, target: string) => {
  const sourceFile = await readFile(source, 'utf-8')
  const targetFile = await readFile(target, 'utf-8')
  const result = targetFile + '\n' + sourceFile
  await writeFile(target, result)
}

export default defineNuxtModule({
  meta: {
    name: '@vuestic/repl-builder',
    compatibility: {
      nuxt: '>=3.3.0'
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

    await build({
      logLevel: 'error',
      root: resolve(__dirname, '../../../ui/src'),

      build: {
        assetsDir: './',
        sourcemap: false,
        minify: 'esbuild',
        cssCodeSplit: false,
        outDir: resolve(__dirname, './../../public/vuestic-out/styles'),
        emptyOutDir: false,

        rollupOptions: {
          input: resolve(__dirname, '../../../ui/src/styles/index.scss'),

          output: {
            assetFileNames: '[name].[ext]',
          },
        },
      },
    })

    await appendFileToTheEndOfFile(resolve(__dirname, './../../public/vuestic-out/styles/style.css'), resolve(__dirname, './../../public/vuestic-out/style.css'))
    await rm(resolve(__dirname, './../../public/vuestic-out/styles'), { recursive: true })

    nuxt.options.alias['#vuestic-repl-build/js'] = resolve(__dirname, './../../public/vuestic-out/main.js')
    nuxt.options.alias['#vuestic-repl-build/style'] = resolve(__dirname, './output/styles.css')
  }
})
