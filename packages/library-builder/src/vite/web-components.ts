import vue from '@vitejs/plugin-vue'
import { join, resolve } from 'pathe'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import { removeSideEffectedChunks } from '../plugins/remove-side-effected-chunks'
import { webComponentsNestedStyles } from '../plugins/web-components-nested-styles'
import { readFileSync } from 'fs'
import { readPackage } from '../utils/read-package'
import { defineViteConfig } from '../utils/define-vite-config'
import { replaceNext } from '../plugins/replace-next'

/**
 * Build web components folder. It is a separated build of vuestic-ui for SPA-only (?: maybe for SPA-only).
 * We use vue customElement compiler option here, so all components will be compiled optimized for web components.
 * Then user need to use defineCustomElement, where vuestic component is a first argument.
 *
 * Vue makes all custom elements to be in its own isolated Shadow Dom, so we need to inject css into this shadow dom.
 * Vue makes it automatically, but not for child components, so we have web-components-nested-styles plugin here.
 */
export const createWebComponentsViteConfig = (options: {
  cwd: string,
  entry: string,
  outDir: string,
}) => {
  const { cwd, entry, outDir } = options
  const packageJson = readPackage(join(cwd, 'package.json'))

  const dependencies = [
    ...Object.keys(packageJson.dependencies || {}), 
    ...Object.keys(packageJson.peerDependencies || {})
  ]

  return defineViteConfig({
    build: {
      lib: {
        entry: join(cwd, entry),
        fileName: () => 'main.js',
        formats: ['es'],
      },

      sourcemap: true,

      cssCodeSplit: true,

      outDir: join(cwd, outDir, 'web-components'),

      rollupOptions: {
        external: dependencies,

        output: {
          sourcemap: true,
          format: 'es',
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          assetFileNames: '[name].[ext]',
        },
      },

      minify: false,
    },

    plugins: [
      replaceNext,
      vue({
        customElement: true,
      }),
      chunkSplitPlugin({ strategy: 'unbundle' }),
      removeSideEffectedChunks(),
      webComponentsNestedStyles(),
      // TODO: Make plugin to clean up empty generated files, for example `types.js`
    ],
  })
}
