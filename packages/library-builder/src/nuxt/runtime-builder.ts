import { readDirRecursive } from './../utils/read-dir-recursive';
import { defineViteConfig } from "../utils/define-vite-config";
import { replaceNext } from '../plugins/replace-next';
import { strictResolve } from '../utils/strict-resolve';

export const nuxtRuntimeDirViteConfig = (options: {
  entryDir: string,
  outDir: string
  external?: string[],
}) => {
  const nuxtDir = strictResolve(options.entryDir)

  if (!nuxtDir) {
    return
  }

  const inputs = readDirRecursive(nuxtDir)

  const { external = [], entryDir, outDir } = options

  return defineViteConfig({
    root: entryDir,

    build: {
      lib: {
        entry: inputs,
        formats: ['es'],
      },

      minify: false,

      rollupOptions: {
        // Resolve externals and actual lib name
        external(source, importer, isResolved) {
          // Resolve '#app' imports
          if (source.startsWith('#')) {
            return true
          }

          if (source.includes('node_modules')) {
            return true
          }

          console.log('external', source)
          if (external.includes(source)) {
            return true
          }

          if (source.startsWith('/') || source.startsWith('.')) {
            return false
          }
          return true
        },
      },

      outDir: outDir,
    },

    optimizeDeps: {
      disabled: true,
    },

    plugins: [
      replaceNext,
    ]
  })
}